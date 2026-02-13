"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function Hero() {
    const [flipped, setFlipped] = useState(false);

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
            {/* Background Blobs */}
            <div className="absolute top-20 -left-32 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
            <div className="absolute top-40 -right-32 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-violet-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                {/* Text */}
                <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-medium border border-indigo-500/20">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                        Hello, I&apos;m Younes Lahlali
                    </span>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                        Creative Developer
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            &amp; UI Enthusiast
                        </span>
                    </h1>

                    <p className="text-lg text-zinc-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Building digital experiences that blend performance with exceptional
                        design. I transform ideas into pixel-perfect, high-performance
                        applications.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                        <a
                            href="#projects"
                            className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* Code Card */}
                <div className="flex justify-center lg:justify-end animate-fade-in-up animate-delay-200">
                    <div
                        className="relative w-full max-w-[480px] h-[340px] perspective-1000 cursor-pointer group"
                        onClick={() => setFlipped(!flipped)}
                    >
                        <div
                            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flipped ? "rotate-y-180" : ""
                                }`}
                        >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden glass rounded-2xl p-6 flex flex-col shadow-2xl shadow-black/40">
                                <div className="flex gap-2 mb-5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <pre className="font-mono text-sm sm:text-base text-zinc-300 leading-relaxed flex-1">
                                    <code>{`const developer = {
  name: 'Younes',
  passion: 'Building awesome apps',
  skills: ['Frontend', 'Backend', 'Design'],
  work: function() {
    return 'High Quality Code';
  }
};`}</code>
                                </pre>
                                <div className="text-right text-xs text-zinc-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to flip →
                                </div>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-zinc-900 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 shadow-2xl shadow-black/40">
                                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <Check className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">
                                    Let&apos;s Build Together!
                                </h3>
                                <p className="text-zinc-400">
                                    I&apos;m currently open for new opportunities and collaborations.
                                </p>
                                <a
                                    href="#contact"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-colors"
                                >
                                    Get In Touch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
