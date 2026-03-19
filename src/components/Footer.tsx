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
            <footer className="relative z-10 py-12 border-t-4 border-black dark:border-white bg-[#e9ff00] dark:bg-[#00e936] transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-black font-black uppercase text-lg flex items-center justify-center gap-2">
                        MADE WITH{" "}
                        <button
                            onClick={() => setShowList(!showList)}
                            className="text-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black"
                            title="❤"
                        >
                            <Heart
                                size={24}
                                strokeWidth={3}
                                className="fill-current"
                            />
                        </button>{" "}
                        BY YOUNES LAHLALI
                    </p>
                    <p className="text-black font-bold uppercase mt-2">
                        &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.
                    </p>
                </div>
            </footer>

            {/* Easter Egg: Name List Popup */}
            {showList && !selectedPerson && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
                    onClick={() => setShowList(false)}
                >
                    <div
                        className="bg-white border-[4px] border-black p-8 max-w-xs w-full space-y-4 shadow-[8px_8px_0px_0px_#e9ff00] dark:shadow-[8px_8px_0px_0px_#00e936]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6 pb-4 border-b-[4px] border-black">
                            <h3 className="text-black font-black text-2xl uppercase">THE CREW 🤝</h3>
                            <button
                                onClick={() => setShowList(false)}
                                className="text-black hover:scale-110 transition-transform"
                            >
                                <X size={28} strokeWidth={3} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {crew.map((person) => (
                                <button
                                    key={person.name}
                                    onClick={() => setSelectedPerson(person.name)}
                                    className="w-full text-center px-4 py-3 bg-[#e9ff00] dark:bg-[#00e936] hover:bg-black hover:text-[#e9ff00] dark:hover:text-[#00e936] border-[3px] border-black text-black font-black text-xl uppercase transition-colors"
                                >
                                    {person.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Easter Egg: Person Photo Modal */}
            {selectedPerson && selected && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
                    onClick={() => {
                        setSelectedPerson(null);
                        setShowList(false);
                    }}
                >
                    <div
                        className="bg-white border-[4px] border-black p-6 max-w-md w-full space-y-6 shadow-[8px_8px_0px_0px_#00e936] dark:shadow-[8px_8px_0px_0px_#e9ff00]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b-[4px] border-black pb-4">
                            <h3 className="text-black font-black text-3xl uppercase">
                                {selected.name}
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedPerson(null);
                                    setShowList(false);
                                }}
                                className="text-black hover:scale-110 transition-transform"
                            >
                                <X size={32} strokeWidth={3} />
                            </button>
                        </div>
                        <div className="relative w-full aspect-[3/4] border-[4px] border-black overflow-hidden bg-zinc-200">
                            <Image
                                src={selected.image}
                                alt={selected.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 448px) 100vw, 448px"
                            />
                        </div>
                        <button
                            onClick={() => setSelectedPerson(null)}
                            className="w-full py-4 text-center bg-black text-white hover:bg-[#e9ff00] dark:hover:bg-[#00e936] hover:text-black border-[4px] border-black font-black text-xl uppercase transition-colors"
                        >
                            ← BACK TO LIST
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
