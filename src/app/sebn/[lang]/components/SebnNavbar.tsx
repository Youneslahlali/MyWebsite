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
        <nav className="fixed top-0 w-full z-[100] bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo approximation of Sumitomo */}
                <Link href={`/sebn/${lang}`} className="flex items-center gap-2">
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#330066]">Sumitomo Electric</span>
                        <span className="text-xl font-black tracking-tighter text-[#330066]">BORDNETZE</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8">
                    {Object.entries(dict.navigation).map(([key, label]: [string, any]) => (
                        <Link 
                            key={key} 
                            href={`#${key}`}
                            className="text-[13px] uppercase tracking-wider font-bold text-slate-600 hover:text-[#330066] transition-colors"
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex items-center gap-3">
                        {languages.map((l) => (
                            <Link
                                key={l.code}
                                href={pathname.replace(`/${lang}`, `/${l.code}`)}
                                className={`text-xs font-bold transition-colors ${
                                    lang === l.code ? "text-[#330066]" : "text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-slate-600"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 p-6 space-y-4 shadow-xl">
                    {Object.entries(dict.navigation).map(([key, label]: [string, any]) => (
                        <Link 
                            key={key} 
                            href={`#${key}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-lg font-bold text-slate-700"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
