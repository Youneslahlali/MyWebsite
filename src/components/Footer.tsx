"use client";

import { useState } from "react";
import { Heart, X } from "lucide-react";
import Image from "next/image";

const crew = [
    { name: "IMAD", image: "/easter-egg/imad.jpg" },
    { name: "AZEDDINE", image: "/easter-egg/azeddine.jpg" },
    { name: "ADIL", image: "/easter-egg/adil.jpg" },
    { name: "ZINEB", image: "/easter-egg/zineb.jpg" },
];

export function Footer() {
    const [showList, setShowList] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

    const selected = crew.find((p) => p.name === selectedPerson);

    return (
        <>
            <footer className="relative z-10 py-8 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-zinc-500 text-sm flex items-center justify-center gap-1.5">
                        Made with{" "}
                        <button
                            onClick={() => setShowList(!showList)}
                            className="cursor-pointer hover:scale-125 transition-transform duration-200 focus:outline-none"
                            title="❤"
                        >
                            <Heart
                                size={14}
                                className="text-red-500 fill-red-500 hover:animate-pulse"
                            />
                        </button>{" "}
                        by Younes Lahlali
                    </p>
                    <p className="text-zinc-600 text-xs mt-2">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </footer>

            {/* Easter Egg: Name List Popup */}
            {showList && !selectedPerson && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
                    onClick={() => setShowList(false)}
                >
                    <div
                        className="glass-strong rounded-2xl p-8 max-w-xs w-full mx-4 space-y-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-bold text-lg">The Crew 🤝</h3>
                            <button
                                onClick={() => setShowList(false)}
                                className="p-1 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        {crew.map((person) => (
                            <button
                                key={person.name}
                                onClick={() => setSelectedPerson(person.name)}
                                className="w-full text-left px-5 py-3.5 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 text-zinc-300 hover:text-white font-semibold tracking-wide transition-all duration-200 hover:translate-x-1"
                            >
                                {person.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Easter Egg: Person Photo Modal */}
            {selectedPerson && selected && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-md"
                    onClick={() => {
                        setSelectedPerson(null);
                        setShowList(false);
                    }}
                >
                    <div
                        className="glass-strong rounded-2xl p-4 max-w-md w-full mx-4 space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold text-xl">
                                {selected.name}
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedPerson(null);
                                    setShowList(false);
                                }}
                                className="p-1 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
                            <Image
                                src={selected.image}
                                alt={selected.name}
                                fill
                                className="object-cover rounded-xl"
                                sizes="(max-width: 448px) 100vw, 448px"
                            />
                        </div>
                        <button
                            onClick={() => setSelectedPerson(null)}
                            className="w-full py-2.5 text-center text-sm text-zinc-400 hover:text-white transition-colors"
                        >
                            ← Back to list
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
