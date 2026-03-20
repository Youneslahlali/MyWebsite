"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function MusicPlayer() {
    const playlistId = "PL8DPzAQl0kztTJQ-yxUOYgsdici3upxec";
    const playerRef = useRef<any>(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    
    // Dynamic track info from YT
    const [trackTitle, setTrackTitle] = useState("AWAITING SIGNAL...");
    const [trackAuthor, setTrackAuthor] = useState("YOUTUBE SYSTEM");
    const [trackIndex, setTrackIndex] = useState(0);

    // Initialize YouTube API
    useEffect(() => {
        // Only load if not already loaded
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = "youtube-api-script";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.head.appendChild(tag);
            }

            window.onYouTubeIframeAPIReady = () => {
                initPlayer();
            };
        } else if (window.YT && window.YT.Player) {
            initPlayer();
        }

        function initPlayer() {
            if (playerRef.current) return;
            playerRef.current = new window.YT.Player("yt-invisible-player", {
                height: "16",
                width: "16",
                playerVars: {
                    listType: "playlist",
                    list: playlistId,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    playsinline: 1,
                    vq: "small" // Legacy flag, helps hint
                },
                events: {
                    onReady: (event: any) => {
                        setIsPlayerReady(true);
                        event.target.setVolume(50);
                        event.target.setPlaybackQuality("small"); // Force low res
                    },
                    onStateChange: (event: any) => {
                        // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
                        if (event.data === 1) { // PLAYING
                            setIsPlaying(true);
                            event.target.setPlaybackQuality("small"); // Explicitly re-force the lowest 144p/240p quality
                            const data = event.target.getVideoData();
                            if (data) {
                                setTrackTitle(data.title || "UNKNOWN VIDEO");
                                setTrackAuthor(data.author || "UNKNOWN CHANNEL");
                            }
                            setDuration(event.target.getDuration());
                            setTrackIndex(event.target.getPlaylistIndex());
                        } else if (event.data === 2 || event.data === 0) { // PAUSED OR ENDED
                            setIsPlaying(false);
                        } else if (event.data === 3) { // BUFFERING
                            setTrackTitle("BUFFERING DATA...");
                        }
                    },
                    onError: (event: any) => {
                        console.error("YouTube Player Error:", event.data);
                        setTrackTitle("ERROR: SKIPPING...");
                        // If embedding is restricted or video broken, auto skip
                        setTimeout(() => {
                            if (event.target && typeof event.target.nextVideo === "function") {
                                event.target.nextVideo();
                            }
                        }, 1000);
                    }
                }
            });
        }
        
        return () => {
            // Unmounting could destroy player, but this is a global layout component.
        };
    }, []);

    // Progress bar updater
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && playerRef.current && isPlayerReady) {
            interval = setInterval(() => {
                const time = playerRef.current.getCurrentTime();
                if (typeof time === "number") setProgress(time);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isPlaying, isPlayerReady]);

    // Handle Volume
    useEffect(() => {
        if (playerRef.current && isPlayerReady) {
            if (isMuted) {
                playerRef.current.setVolume(0);
            } else {
                playerRef.current.setVolume(volume);
            }
        }
    }, [volume, isMuted, isPlayerReady]);

    // Player Actions
    const togglePlay = () => {
        if (!isPlayerReady || !playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const nextTrack = () => {
        if (!isPlayerReady || !playerRef.current) return;
        const playlist = playerRef.current.getPlaylist();
        if (!playlist || playlist.length === 0) {
            playerRef.current.nextVideo();
            return;
        }
        const nextIdx = (trackIndex + 1) % playlist.length;
        setTrackIndex(nextIdx);
        setTrackTitle("LOADING TRACK...");
        setProgress(0);
        playerRef.current.playVideoAt(nextIdx);
    };

    const prevTrack = () => {
        if (!isPlayerReady || !playerRef.current) return;
        const playlist = playerRef.current.getPlaylist();
        if (!playlist || playlist.length === 0) {
            playerRef.current.previousVideo();
            return;
        }
        const prevIdx = trackIndex === 0 ? playlist.length - 1 : trackIndex - 1;
        setTrackIndex(prevIdx);
        setTrackTitle("LOADING TRACK...");
        setProgress(0);
        playerRef.current.playVideoAt(prevIdx);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (!isPlayerReady || !playerRef.current) return;
        playerRef.current.seekTo(time, true);
        setProgress(time);
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = Number(e.target.value);
        setVolume(vol);
        if (vol > 0 && isMuted) setIsMuted(false);
    };

    const formatTime = (time: number) => {
        if (isNaN(time) || !time) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    if (!isExpanded) {
        return (
            <button 
                onClick={() => setIsExpanded(true)}
                className="fixed bottom-6 left-6 z-[9999] bg-[#e9ff00] dark:bg-[#00e936] text-black border-[3px] border-black hover:-translate-y-1 transition-transform px-5 py-3 font-black uppercase tracking-widest text-sm shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] flex items-center gap-3"
            >
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-black'}`} />
                PLAYER
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-[9999] bg-white dark:bg-black border-t-[4px] border-black dark:border-white shadow-[0_-8px_0_0_rgba(0,0,0,1)] dark:shadow-[0_-8px_0_0_rgba(255,255,255,1)] flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-6 font-mono transition-transform duration-300">
            {/* Embedded invisible root acting as part of the visible UI to prevent viewport throttling. 
                Sized as 16x16 to heavily aggressively hint YouTube's Adaptive Bitrate into loading lowest quality! */}
            <div className="absolute left-0 top-0 w-4 h-4 overflow-hidden opacity-0 pointer-events-none -z-10">
                <div id="yt-invisible-player" className="w-full h-full" />
            </div>

            {/* Track Info */}
            <style>{`
                @keyframes eq {
                    0% { height: 4px; }
                    50% { height: 14px; }
                    100% { height: 4px; }
                }
            `}</style>
            <div className="flex items-center gap-4 flex-1 min-w-[200px] w-full sm:w-auto">
                <div className="bg-[#e9ff00] dark:bg-[#00e936] w-14 h-14 border-[3px] border-black flex items-center justify-center font-black text-black text-xl shrink-0 relative overflow-hidden group shadow-[4px_4px_0_0_#000]">
                    <div className={`absolute inset-0 bg-black translate-y-[100%] transition-transform duration-500 ${isPlaying ? 'translate-y-[80%]' : ''} opacity-20`} />
                    {!isPlaying ? (
                        <span>{(trackIndex + 1).toString().padStart(2, '0')}</span>
                    ) : (
                        <div className="flex items-end gap-[2px] h-4 z-10 bottom-4 relative">
                            <div className="w-[4px] bg-black" style={{ animation: 'eq 0.7s ease-in-out infinite', animationDelay: '0.1s' }} />
                            <div className="w-[4px] bg-black" style={{ animation: 'eq 0.5s ease-in-out infinite', animationDelay: '0.3s' }} />
                            <div className="w-[4px] bg-black" style={{ animation: 'eq 0.9s ease-in-out infinite', animationDelay: '0.0s' }} />
                            <div className="w-[4px] bg-black" style={{ animation: 'eq 0.6s ease-in-out infinite', animationDelay: '0.2s' }} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col truncate overflow-hidden whitespace-nowrap">
                    <span className="font-black text-black dark:text-white uppercase truncate tracking-widest text-sm sm:text-base">{trackTitle}</span>
                    <span className="text-black/60 dark:text-white/60 text-xs sm:text-sm font-bold uppercase truncate">{trackAuthor}</span>
                </div>
            </div>

            {/* Controls & Progress */}
            <div className="flex flex-col items-center flex-2 w-full max-w-2xl gap-3">
                <div className="flex items-center gap-6">
                    <button onClick={prevTrack} className="text-black dark:text-white hover:text-[#00e936] transition-colors"><SkipBack size={28} strokeWidth={3} /></button>
                    <button 
                        onClick={togglePlay} 
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#e9ff00] dark:hover:bg-[#00e936] border-[3px] border-black hover:text-black transition-colors w-12 h-12 flex items-center justify-center translate-y-[-2px] shadow-[6px_6px_0_0_#000] dark:shadow-[6px_6px_0_0_#fff] active:translate-y-0 active:shadow-none"
                    >
                        {isPlaying ? <Pause size={24} strokeWidth={4} className="fill-current" /> : <Play size={24} strokeWidth={4} className="fill-current ml-1" />}
                    </button>
                    <button onClick={nextTrack} className="text-black dark:text-white hover:text-[#e9ff00] dark:hover:text-[#00e936] transition-colors"><SkipForward size={28} strokeWidth={3} /></button>
                </div>
                <div className="flex items-center gap-4 w-full text-xs font-bold text-black dark:text-white">
                    <span className="w-10 text-right">{formatTime(progress)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={progress}
                        onChange={handleSeek}
                        className="flex-1 h-4 bg-gray-200 dark:bg-zinc-800 border-[3px] border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#00e936] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:shadow-[4px_4px_0_0_#000] dark:[&::-webkit-slider-thumb]:shadow-[4px_4px_0_0_#fff]"
                    />
                    <span className="w-10 text-left">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume & Close */}
            <div className="flex items-center gap-4 flex-1 justify-end hidden md:flex">
                <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-black dark:text-white hover:text-[#00e936]"
                >
                    {isMuted || volume === 0 ? <VolumeX size={24} strokeWidth={3} /> : <Volume2 size={24} strokeWidth={3} />}
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolume}
                    className="w-28 h-4 bg-gray-200 dark:bg-zinc-800 border-[3px] border-black appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#e9ff00] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-black"
                />
                <button 
                    onClick={() => setIsExpanded(false)}
                    className="ml-6 flex items-center justify-center p-2 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black border-[3px] border-transparent hover:border-black dark:hover:border-white transition-colors"
                    title="Minimize Player"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
