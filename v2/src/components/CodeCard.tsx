"use client";

import { useState, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";

export function CodeCard() {
    const [flipped, setFlipped] = useState(false);

    // Logic to prevent mobile tilt/flip if needed, but here we'll keep it simple & robust
    // Flip toggles on click

    return (
        <div
            className="relative w-full max-w-[500px] h-[350px] perspective-1000 group cursor-pointer"
            onClick={() => setFlipped(!flipped)}
        >
            <div
                className={`relative w-full h-full duration-700 preserve-3d transition-transform ${flipped ? "rotate-y-180" : ""}`}
            >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl flex flex-col justify-center">
                    {/* Header Dots */}
                    <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>

                    {/* Code Content */}
                    <pre className="font-mono text-sm sm:text-base text-gray-300 overflow-x-auto">
                        <code>
                            <span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {"{\n"}
                            {"  "}<span className="text-purple-400">name</span>: <span className="text-yellow-300">'Younes'</span>,{"\n"}
                            {"  "}<span className="text-purple-400">role</span>: <span className="text-yellow-300">'Full Stack Dev'</span>,{"\n"}
                            {"  "}<span className="text-purple-400">skills</span>: [<span className="text-yellow-300">'React'</span>, <span className="text-yellow-300">'Next.js'</span>, <span className="text-yellow-300">'Node'</span>],{"\n"}
                            {"  "}<span className="text-green-400">build</span>: <span className="text-pink-400">function</span>() {"{\n"}
                            {"    "}<span className="text-pink-400">return</span> <span className="text-yellow-300">'High Quality Code'</span>;{"\n"}
                            {"  "}{"}\n"}
                            {"};"}
                        </code>
                    </pre>

                    <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                        Click to flip
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden rotate-y-180 bg-zinc-900 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4"
                >
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-2">
                        <Check className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Let's Build Together!</h3>
                    <p className="text-gray-400">
                        I'm currently open for new opportunities and collaborations.
                    </p>
                    <a
                        href="#contact"
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-semibold"
                        onClick={(e) => { e.stopPropagation(); }} // Prevent card flip when clicking button
                    >
                        Get In Touch
                    </a>
                </div>
            </div>
        </div>
    );
}
