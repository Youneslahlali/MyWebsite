const express = require("express");
const cors = require("cors");
const youtubedl = require("youtube-dl-exec");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ─── Check if ffmpeg is available ──────────────── */
function hasFFmpeg() {
    try {
        execSync("ffmpeg -version", { stdio: "ignore" });
        return true;
    } catch {
        return false;
    }
}

const FFMPEG_AVAILABLE = hasFFmpeg();
console.log(`ffmpeg: ${FFMPEG_AVAILABLE ? "✅ found" : "❌ not found (quality selection limited)"}`);

/* ─── Temp dir for downloads ────────────────────── */
const TEMP_DIR = path.join(os.tmpdir(), "yt-downloads");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

/* ─── Health Check ──────────────────────────────── */
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", ffmpeg: FFMPEG_AVAILABLE });
});

/* ─── Video Info ────────────────────────────────── */
app.get("/api/info", async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    try {
        const info = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
        });

        // Format duration
        const totalSec = Math.round(info.duration || 0);
        const hrs = Math.floor(totalSec / 3600);
        const min = Math.floor((totalSec % 3600) / 60);
        const sec = totalSec % 60;
        const duration = hrs > 0
            ? `${hrs}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`
            : `${min}:${sec.toString().padStart(2, "0")}`;

        // Format views
        const views = info.view_count || 0;
        const formattedViews =
            views >= 1_000_000
                ? `${(views / 1_000_000).toFixed(1)}M`
                : views >= 1_000
                    ? `${(views / 1_000).toFixed(1)}K`
                    : views.toString();

        res.json({
            title: info.title || "Unknown",
            thumbnail: info.thumbnail || "",
            duration,
            channel: info.uploader || info.channel || "Unknown",
            views: formattedViews,
            videoId: info.id || "",
        });
    } catch (err) {
        console.error("Info error:", err.message || err);
        res.status(500).json({
            error: "Failed to fetch video info. Check the URL and try again.",
        });
    }
});

/* ─── Download ──────────────────────────────────── */
app.get("/api/download", async (req, res) => {
    const { url, type, quality } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    const fileId = `yt-${Date.now()}`;
    const tempFile = path.join(TEMP_DIR, fileId);

    try {
        // Get video title for filename
        const info = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
        });
        const safeTitle = (info.title || "video").replace(/[^a-zA-Z0-9 _-]/g, "").substring(0, 100);

        if (type === "audio") {
            await downloadAudio(url, tempFile, quality);
            const actualFile = findOutputFile(tempFile, [".m4a", ".mp3", ".webm", ".ogg", ".opus"]);
            if (!actualFile) throw new Error("Download output not found");

            const ext = path.extname(actualFile).slice(1);
            const stat = fs.statSync(actualFile);
            const dlExt = FFMPEG_AVAILABLE ? "mp3" : ext;
            res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}.${dlExt}"`);
            res.setHeader("Content-Type", dlExt === "mp3" ? "audio/mpeg" : "audio/mp4");
            res.setHeader("Content-Length", stat.size);
            const stream = fs.createReadStream(actualFile);
            stream.pipe(res);
            stream.on("end", () => cleanupFile(actualFile));
        } else {
            await downloadVideo(url, tempFile, quality);
            const actualFile = findOutputFile(tempFile, [".mp4", ".webm", ".mkv"]);
            if (!actualFile) throw new Error("Download output not found");

            const stat = fs.statSync(actualFile);
            res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}.mp4"`);
            res.setHeader("Content-Type", "video/mp4");
            res.setHeader("Content-Length", stat.size);
            const stream = fs.createReadStream(actualFile);
            stream.pipe(res);
            stream.on("end", () => cleanupFile(actualFile));
        }
    } catch (err) {
        console.error("Download error:", err.message || err);
        cleanupFiles(tempFile);
        if (!res.headersSent) {
            res.status(500).json({ error: "Download failed. Please try again." });
        }
    }
});

/* ─── Download Functions ────────────────────────── */

async function downloadVideo(url, tempFile, quality) {
    const heightMap = { "1080p": 1080, "720p": 720, "480p": 480, "360p": 360 };
    const height = heightMap[quality] || 720;

    if (FFMPEG_AVAILABLE) {
        // With ffmpeg: merge best video + best audio → real quality selection
        await youtubedl(url, {
            format: `bestvideo[height<=${height}]+bestaudio/best[height<=${height}]/best`,
            mergeOutputFormat: "mp4",
            output: `${tempFile}.mp4`,
            noCheckCertificates: true,
            noWarnings: true,
        });
    } else {
        // Without ffmpeg: use pre-muxed formats (video+audio in one stream)
        await youtubedl(url, {
            format: `best[height<=${height}][vcodec!=none][acodec!=none]/best[vcodec!=none][acodec!=none]/best`,
            output: `${tempFile}.%(ext)s`,
            noCheckCertificates: true,
            noWarnings: true,
        });
    }
}

async function downloadAudio(url, tempFile, quality) {
    if (FFMPEG_AVAILABLE) {
        // With ffmpeg: extract and convert to mp3
        const qualityMap = { "320": 0, "192": 2, "128": 5 };
        await youtubedl(url, {
            extractAudio: true,
            audioFormat: "mp3",
            audioQuality: qualityMap[quality] || 2,
            output: `${tempFile}.%(ext)s`,
            noCheckCertificates: true,
            noWarnings: true,
        });
    } else {
        // Without ffmpeg: download best audio stream directly
        await youtubedl(url, {
            format: "bestaudio[ext=m4a]/bestaudio",
            output: `${tempFile}.%(ext)s`,
            noCheckCertificates: true,
            noWarnings: true,
        });
    }
}

/* ─── Helpers ───────────────────────────────────── */

function findOutputFile(basePath, extensions) {
    for (const ext of extensions) {
        const filePath = basePath + ext;
        if (fs.existsSync(filePath)) return filePath;
    }
    const dir = path.dirname(basePath);
    const prefix = path.basename(basePath);
    try {
        const files = fs.readdirSync(dir);
        const match = files.find((f) => f.startsWith(prefix));
        if (match) return path.join(dir, match);
    } catch { /* ignore */ }
    return null;
}

function cleanupFile(filePath) {
    try {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch { /* ignore */ }
}

function cleanupFiles(basePath) {
    [".mp4", ".mp3", ".m4a", ".webm", ".mkv", ".ogg", ".opus"].forEach((ext) => {
        cleanupFile(basePath + ext);
    });
}

/* ─── Start Server ──────────────────────────────── */
app.listen(PORT, () => {
    console.log(`\n🚀 YouTube Downloader API running on http://localhost:${PORT}\n`);
});
