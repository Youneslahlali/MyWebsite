"use client";

import { useState } from "react";
import {
    Download,
    Search,
    Video,
    Music,
    Clipboard,
    Loader2,
    AlertCircle,
    Clock,
    Eye,
    User,
    ArrowLeft,
    CheckCircle2,
    Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ─── Types ─────────────────────────────────────── */

interface VideoInfo {
    title: string;
    thumbnail: string;
    duration: string;
    channel: string;
    views: string;
    videoId: string;
    formats: FormatOption[];
}

interface FormatOption {
    itag: number;
    quality: string;
    type: "video" | "audio";
    container: string;
    size?: string;
}

/* ─── API Base ──────────────────────────────────── */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/* ─── Constants ─────────────────────────────────── */

const videoQualities = [
    { label: "1080p", value: "1080p", desc: "Full HD" },
    { label: "720p", value: "720p", desc: "HD" },
    { label: "480p", value: "480p", desc: "SD" },
    { label: "360p", value: "360p", desc: "Basic" },
];

const audioQualities = [
    { label: "320kbps", value: "320", desc: "Best" },
    { label: "192kbps", value: "192", desc: "High" },
    { label: "128kbps", value: "128", desc: "Standard" },
];

/* ─── Main Component ───────────────────────────── */

export default function DownloaderPage() {
    const [url, setUrl] = useState("");
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState<"video" | "audio">("video");
    const [selectedQuality, setSelectedQuality] = useState("720p");
    const [downloading, setDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);

    /* ── Paste from clipboard ──────────────────── */
    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setUrl(text);
        } catch {
            /* clipboard not available */
        }
    };

    /* ── Fetch video info ──────────────────────── */
    const fetchInfo = async () => {
        if (!url.trim()) return;
        setError("");
        setVideoInfo(null);
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/info?url=${encodeURIComponent(url)}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to fetch video info");
            }
            const data: VideoInfo = await res.json();
            setVideoInfo(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Check the URL and try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ── Download ──────────────────────────────── */
    const handleDownload = async () => {
        if (!videoInfo) return;
        setDownloading(true);
        setDownloadProgress(0);

        try {
            const quality = mode === "video" ? selectedQuality : selectedQuality;
            const downloadUrl = `${API_BASE}/api/download?url=${encodeURIComponent(url)}&type=${mode}&quality=${quality}`;

            // Simulate progress for UX (actual download progress would need SSE/websocket)
            const progressInterval = setInterval(() => {
                setDownloadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + Math.random() * 15;
                });
            }, 500);

            const res = await fetch(downloadUrl);
            clearInterval(progressInterval);

            if (!res.ok) throw new Error("Download failed");

            const blob = await res.blob();
            const ext = mode === "video" ? "mp4" : "mp3";
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `${videoInfo.title.replace(/[^a-zA-Z0-9 ]/g, "")}.${ext}`;
            a.click();
            URL.revokeObjectURL(a.href);

            setDownloadProgress(100);
            setTimeout(() => {
                setDownloading(false);
                setDownloadProgress(0);
            }, 2000);
        } catch {
            setError("Download failed. Please try again.");
            setDownloading(false);
            setDownloadProgress(0);
        }
    };

    const qualities = mode === "video" ? videoQualities : audioQualities;

    /* ── Render ─────────────────────────────────── */
    return (
        <section className="min-h-screen pt-28 pb-20 relative">
            <div className="max-w-3xl mx-auto px-6">
                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    Back to Portfolio
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm font-medium text-red-300 mb-4">
                        <Youtube className="w-4 h-4" />
                        YouTube Downloader
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Download{" "}
                        <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                            YouTube Videos
                        </span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Paste a YouTube link and download in your preferred format and quality.
                        Fast, simple, and free.
                    </p>
                </div>

                {/* URL Input */}
                <div className="glass rounded-2xl p-2 mb-6 flex items-center gap-2">
                    <button
                        onClick={handlePaste}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all shrink-0"
                        title="Paste from clipboard"
                    >
                        <Clipboard size={18} />
                    </button>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchInfo()}
                        placeholder="Paste YouTube URL here..."
                        className="flex-1 bg-transparent text-white placeholder-zinc-500 px-2 py-3 focus:outline-none text-base"
                    />
                    <button
                        onClick={fetchInfo}
                        disabled={loading || !url.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 shrink-0 shadow-lg shadow-red-500/20"
                    >
                        {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Search size={18} />
                        )}
                        {loading ? "Fetching..." : "Fetch"}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="glass rounded-xl p-4 mb-6 flex items-center gap-3 border border-red-500/20 bg-red-500/5">
                        <AlertCircle className="text-red-400 shrink-0" size={20} />
                        <p className="text-red-300 text-sm">{error}</p>
                    </div>
                )}

                {/* Loading Skeleton */}
                {loading && (
                    <div className="glass rounded-2xl p-6 mb-6 animate-pulse">
                        <div className="flex gap-5">
                            <div className="w-48 h-28 bg-white/5 rounded-xl shrink-0" />
                            <div className="flex-1 space-y-3 py-1">
                                <div className="h-5 bg-white/5 rounded-lg w-3/4" />
                                <div className="h-4 bg-white/5 rounded-lg w-1/2" />
                                <div className="flex gap-4 mt-3">
                                    <div className="h-4 bg-white/5 rounded-lg w-20" />
                                    <div className="h-4 bg-white/5 rounded-lg w-24" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Video Info Card */}
                {videoInfo && !loading && (
                    <div className="glass rounded-2xl p-6 mb-6 animate-fade-in-up">
                        <div className="flex flex-col sm:flex-row gap-5">
                            {/* Thumbnail */}
                            <div className="relative w-full sm:w-56 aspect-video sm:aspect-auto sm:h-32 rounded-xl overflow-hidden shrink-0">
                                <Image
                                    src={videoInfo.thumbnail}
                                    alt={videoInfo.title}
                                    fill
                                    className="object-cover"
                                    sizes="224px"
                                    unoptimized
                                />
                                <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 bg-black/80 rounded-md text-xs font-medium text-white">
                                    {videoInfo.duration}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white text-lg leading-snug line-clamp-2 mb-2">
                                    {videoInfo.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                                    <span className="flex items-center gap-1.5">
                                        <User size={14} />
                                        {videoInfo.channel}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Eye size={14} />
                                        {videoInfo.views} views
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        {videoInfo.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Format & Quality Selection */}
                {videoInfo && !loading && (
                    <div className="glass rounded-2xl p-6 mb-6 space-y-6 animate-fade-in-up animate-delay-100">
                        {/* Mode Toggle */}
                        <div>
                            <label className="text-sm font-medium text-zinc-400 mb-3 block">Format</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setMode("video");
                                        setSelectedQuality("720p");
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200 ${mode === "video"
                                        ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/20"
                                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Video size={18} />
                                    Video (MP4)
                                </button>
                                <button
                                    onClick={() => {
                                        setMode("audio");
                                        setSelectedQuality("192");
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all duration-200 ${mode === "audio"
                                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
                                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                        }`}
                                >
                                    <Music size={18} />
                                    Audio (MP3)
                                </button>
                            </div>
                        </div>

                        {/* Quality Grid */}
                        <div>
                            <label className="text-sm font-medium text-zinc-400 mb-3 block">Quality</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {qualities.map((q) => (
                                    <button
                                        key={q.value}
                                        onClick={() => setSelectedQuality(q.value)}
                                        className={`py-3 px-2 rounded-xl text-center transition-all duration-200 ${selectedQuality === q.value
                                            ? mode === "video"
                                                ? "bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/40 text-white ring-1 ring-red-500/20"
                                                : "bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/40 text-white ring-1 ring-purple-500/20"
                                            : "bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <div className="font-bold text-sm">{q.label}</div>
                                        <div className="text-xs text-zinc-500 mt-0.5">{q.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={handleDownload}
                            disabled={downloading}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${downloading
                                ? "bg-white/10 text-zinc-400 cursor-wait"
                                : mode === "video"
                                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-0.5"
                                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
                                }`}
                        >
                            {/* Progress bar */}
                            {downloading && (
                                <div
                                    className={`absolute left-0 top-0 h-full transition-all duration-300 ${mode === "video"
                                        ? "bg-gradient-to-r from-red-600/30 to-pink-600/30"
                                        : "bg-gradient-to-r from-purple-600/30 to-indigo-600/30"
                                        }`}
                                    style={{ width: `${downloadProgress}%` }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {downloading ? (
                                    downloadProgress >= 100 ? (
                                        <>
                                            <CheckCircle2 size={20} />
                                            Done!
                                        </>
                                    ) : (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Downloading... {Math.round(downloadProgress)}%
                                        </>
                                    )
                                ) : (
                                    <>
                                        <Download size={20} />
                                        Download {mode === "video" ? "Video" : "Audio"}
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!videoInfo && !loading && !error && (
                    <div className="glass rounded-2xl p-12 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center ring-1 ring-red-500/10">
                            <Youtube className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Ready to Download</h3>
                        <p className="text-zinc-400 max-w-sm mx-auto">
                            Paste a YouTube video URL above and click Fetch to get started.
                            Supports any public YouTube video.
                        </p>
                    </div>
                )}

                {/* Footer note */}
                <p className="text-center text-xs text-zinc-600 mt-8">
                    For personal use only. Respect content creators and copyright laws.
                </p>
            </div>
        </section>
    );
}
