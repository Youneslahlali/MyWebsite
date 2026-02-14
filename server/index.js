const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ─── Health Check ──────────────────────────────── */
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
});

/* ─── Video Info ────────────────────────────────── */
app.get("/api/info", async (req, res) => {
    const { url } = req.query;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    try {
        const info = await ytdl.getInfo(url);
        const details = info.videoDetails;

        // Format duration
        const totalSec = parseInt(details.lengthSeconds, 10);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        const duration = `${min}:${sec.toString().padStart(2, "0")}`;

        // Format views
        const views = parseInt(details.viewCount, 10);
        const formattedViews =
            views >= 1_000_000
                ? `${(views / 1_000_000).toFixed(1)}M`
                : views >= 1_000
                    ? `${(views / 1_000).toFixed(1)}K`
                    : views.toString();

        res.json({
            title: details.title,
            thumbnail: details.thumbnails[details.thumbnails.length - 1]?.url || "",
            duration,
            channel: details.author.name,
            views: formattedViews,
            videoId: details.videoId,
        });
    } catch (err) {
        console.error("Info error:", err.message);
        res.status(500).json({ error: "Failed to fetch video info. The video may be unavailable or restricted." });
    }
});

/* ─── Download ──────────────────────────────────── */
app.get("/api/download", async (req, res) => {
    const { url, type, quality } = req.query;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
    }

    try {
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, "");

        if (type === "audio") {
            res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);
            res.setHeader("Content-Type", "audio/mpeg");

            ytdl(url, {
                filter: "audioonly",
                quality: "highestaudio",
            }).pipe(res);
        } else {
            // Video – pick the best matching quality
            const qualityMap = {
                "1080p": "137",  // 1080p video
                "720p": "136",   // 720p video
                "480p": "135",   // 480p video
                "360p": "134",   // 360p video
            };

            res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
            res.setHeader("Content-Type", "video/mp4");

            // Try to get the specific quality, fall back to highest available
            const itag = qualityMap[quality];
            const format = itag
                ? info.formats.find((f) => f.itag === parseInt(itag, 10))
                : null;

            if (format) {
                ytdl(url, { format }).pipe(res);
            } else {
                // Fallback: get best quality with both audio+video
                ytdl(url, {
                    quality: "highest",
                    filter: "videoandaudio",
                }).pipe(res);
            }
        }
    } catch (err) {
        console.error("Download error:", err.message);
        if (!res.headersSent) {
            res.status(500).json({ error: "Download failed. Please try again." });
        }
    }
});

/* ─── Start Server ──────────────────────────────── */
app.listen(PORT, () => {
    console.log(`\n🚀 YouTube Downloader API running on http://localhost:${PORT}\n`);
});
