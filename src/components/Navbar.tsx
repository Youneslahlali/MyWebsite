"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(true);

    return (
        <header className="w-full relative z-50 bg-white dark:bg-black transition-colors duration-300 selection:bg-[#eaff00] selection:text-black border-b-[4px] border-black dark:border-white">
            {showBanner && (
                <div className="w-full bg-[#bcffb1] dark:bg-[#e9ff00] py-2 px-4 flex justify-center items-center text-black text-xs md:text-sm font-bold relative border-b-[4px] border-black dark:border-white">
                    <p className="tracking-tight text-center max-w-[90%]">
                        Explore my latest projects and frontend development work <strong><Link href="#projects">HERE.</Link></strong>
                    </p>
                    <button
                        onClick={() => setShowBanner(false)}
                        className="absolute right-4 text-black hover:opacity-70 transition-opacity p-2"
                        aria-label="Close banner"
                    >
                        ✕
                    </button>
                </div>
            )}
            <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">
                <Link href="/" className="border-[4px] border-black dark:border-white py-2 px-6 flex items-baseline font-black text-4xl md:text-5xl tracking-tighter text-black dark:text-white select-none w-max shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] transition-all outline-none focus-visible:ring-4 focus-visible:ring-[#e9ff00] rotate-1 hover:rotate-0">
                    <span>YL</span>
                    <span className="text-[#00e936] dark:text-[#e9ff00]">.</span>
                </Link>
                <nav className="hidden md:flex items-center gap-2 lg:gap-4 font-bold text-black dark:text-white uppercase tracking-wide text-xs lg:text-sm">
                    <Link href="#home" className="px-4 py-3 hover:bg-[#e9ff00] hover:text-black border-[3px] border-transparent hover:border-black dark:hover:border-white transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] outline-none focus-visible:bg-[#e9ff00]">HOME</Link>
                    <Link href="#about" className="px-4 py-3 hover:bg-[#e9ff00] hover:text-black border-[3px] border-transparent hover:border-black dark:hover:border-white transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] outline-none focus-visible:bg-[#e9ff00]">ABOUT</Link>
                    <Link href="#skills" className="px-4 py-3 hover:bg-[#e9ff00] hover:text-black border-[3px] border-transparent hover:border-black dark:hover:border-white transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] outline-none focus-visible:bg-[#e9ff00]">SKILLS</Link>
                    <Link href="#projects" className="px-4 py-3 hover:bg-[#e9ff00] hover:text-black border-[3px] border-transparent hover:border-black dark:hover:border-white transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] outline-none focus-visible:bg-[#e9ff00]">WORK</Link>
                    <Link href="#contact" className="px-4 py-3 hover:bg-[#e9ff00] hover:text-black border-[3px] border-transparent hover:border-black dark:hover:border-white transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] outline-none focus-visible:bg-[#e9ff00] text-[#00e936] dark:text-[#e9ff00]">CONTACT</Link>
                </nav>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-4 bg-white dark:bg-black text-black dark:text-white border-[3px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all hover:shadow-none hover:translate-y-1 hover:translate-x-1 outline-none"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={28} strokeWidth={3} /> : <Menu size={28} strokeWidth={3} />}
                </button>
            </div>
            {/* Mobile Nav Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#f0f0f0] dark:bg-[#111] border-b-[4px] border-black dark:border-white border-t-[4px] flex flex-col items-center py-8 gap-4 z-[100] shadow-[0px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_12px_0px_0px_rgba(255,255,255,1)] px-6">
                    <Link onClick={() => setIsOpen(false)} href="#home" className="w-full text-center py-4 bg-white dark:bg-black text-black dark:text-white border-[3px] border-black dark:border-white font-black text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">HOME</Link>
                    <Link onClick={() => setIsOpen(false)} href="#about" className="w-full text-center py-4 bg-white dark:bg-black text-black dark:text-white border-[3px] border-black dark:border-white font-black text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">ABOUT</Link>
                    <Link onClick={() => setIsOpen(false)} href="#skills" className="w-full text-center py-4 bg-white dark:bg-black text-black dark:text-white border-[3px] border-black dark:border-white font-black text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">SKILLS</Link>
                    <Link onClick={() => setIsOpen(false)} href="#projects" className="w-full text-center py-4 bg-white dark:bg-black text-black dark:text-white border-[3px] border-black dark:border-white font-black text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">WORK</Link>
                    <Link onClick={() => setIsOpen(false)} href="#contact" className="w-full text-center py-4 bg-[#e9ff00] text-black border-[3px] border-black dark:border-white font-black text-xl uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">CONTACT</Link>
                </div>
            )}
        </header>
    );
}
