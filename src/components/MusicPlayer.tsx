"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";

// Dummy playlist (You can replace src with local /track1.mp3 files later)
const playlist = [
    {
        title: "NEON DREAMS",
        artist: "Younes Mix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
        title: "BRUTAL BASS",
        artist: "Lofi Beats",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
        title: "GRIDLOCK SYNTH",
        artist: "Cyberpunk",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    }
];

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Audio play failed, requires interaction:", e));
        }
    }, [currentTrackIndex, isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Need interaction to play", e));
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const prevTrack = () => {
        setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setProgress(time);
        }
    };

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = Number(e.target.value);
        setVolume(vol);
        if (vol > 0 && isMuted) setIsMuted(false);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
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
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={nextTrack}
                onLoadedMetadata={handleTimeUpdate}
            />

            {/* Track Info */}
            <div className="flex items-center gap-4 flex-1 min-w-[200px] w-full sm:w-auto">
                <div className="bg-[#e9ff00] dark:bg-[#00e936] w-14 h-14 border-[3px] border-black flex items-center justify-center font-black text-black text-xl shrink-0 relative overflow-hidden group shadow-[4px_4px_0_0_#000]">
                    <div className={`absolute inset-0 bg-black translate-y-[100%] transition-transform duration-500 ${isPlaying ? 'translate-y-[80%]' : ''} opacity-20`} />
                    {isPlaying ? <span className="animate-pulse">▶</span> : <span>II</span>}
                </div>
                <div className="flex flex-col truncate overflow-hidden whitespace-nowrap">
                    <span className="font-black text-black dark:text-white uppercase truncate tracking-widest text-sm sm:text-base">{currentTrack.title}</span>
                    <span className="text-black/60 dark:text-white/60 text-xs sm:text-sm font-bold uppercase truncate">{currentTrack.artist}</span>
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
                    max={1}
                    step={0.01}
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
