"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4 md:px-6 py-20 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.1] pointer-events-none dark:invert" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            {/* Memphis Floating Elements */}
            <div className="absolute top-[15%] left-[10%] animate-[spin_10s_linear_infinite] z-0 hidden md:block pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,1)]">
                    <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" fill="#00e936" stroke="currentColor" className="text-black dark:text-white" strokeWidth="4" />
                </svg>
            </div>
            
            <div className="absolute bottom-[20%] right-[10%] animate-[bounce_5s_ease-in-out_infinite] z-0 hidden md:block pointer-events-none">
                <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:drop-shadow-[6px_6px_0px_rgba(255,255,255,1)]">
                    <circle cx="50" cy="50" r="40" fill="#e9ff00" stroke="currentColor" className="text-black dark:text-white" strokeWidth="4" />
                </svg>
            </div>
            
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div className="inline-block border-[3px] border-black dark:border-white bg-[#e9ff00] dark:bg-[#00e936] px-5 py-2 font-bold uppercase tracking-widest text-sm mb-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] -rotate-3 text-black">
                    AVAILABLE FOR HIRE
                </div>

                <h1 
                    className="text-[4rem] sm:text-[5.5rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-black dark:text-white mb-8 md:mb-12 uppercase mx-auto select-none"
                    style={{ fontFamily: "Arial, sans-serif" }}
                >
                    CREATIVE<br />
                    DEVELOPER
                </h1>
                
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-12 md:mb-16 max-w-3xl mx-auto text-black dark:text-white tracking-tight leading-snug">
                    Building digital experiences that blend performance with exceptional design. I transform ideas into pixel-perfect applications.
                </p>
                
                <Link 
                    href="#projects" 
                    className="flex items-center gap-4 bg-[#e9ff00] text-black font-black text-xl sm:text-2xl md:text-3xl py-6 px-12 md:py-8 md:px-20 uppercase tracking-tighter transition-all duration-200 select-none border-[4px] border-black dark:border-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[14px_14px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] active:translate-y-2 active:translate-x-2 active:bg-[#00e936] dark:active:bg-[#00e936] outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white group"
                >
                    VIEW MY WORK <ArrowDown size={36} strokeWidth={3} className="group-hover:animate-bounce" />
                </Link>
            </div>
        </section>
    );
}
