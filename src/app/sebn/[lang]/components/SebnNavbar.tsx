"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export function SebnNavbar({ lang, dict }: { lang: string; dict: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const languages = [
        { code: "en", label: "EN" },
        { code: "fr", label: "FR" },
        { code: "ar", label: "AR" },
    ];

    const isRtl = lang === "ar";

    return (
        <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href={`/sebn/${lang}`} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">S</div>
                    <span className="font-bold text-xl tracking-tighter">SEBN-MA</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {Object.entries(dict.navigation).map(([key, label]: [string, any]) => (
                        <Link 
                            key={key} 
                            href={`#${key}`}
                            className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-2 bg-slate-900 rounded-full px-3 py-1.5 border border-white/5">
                        <Globe size={14} className="text-slate-500" />
                        {languages.map((l) => (
                            <Link
                                key={l.code}
                                href={pathname.replace(`/${lang}`, `/${l.code}`)}
                                className={`text-xs font-bold transition-colors ${
                                    lang === l.code ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
                                }`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-slate-400"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-white/10 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4">
                    {Object.entries(dict.navigation).map(([key, label]: [string, any]) => (
                        <Link 
                            key={key} 
                            href={`#${key}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-medium text-slate-300"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
