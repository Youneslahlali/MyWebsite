"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-wide text-white">
                    YL<span className="text-indigo-500">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-lg shadow-indigo-500/20"
                    >
                        Let&apos;s Talk
                    </a>
                </nav>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Fullscreen Menu */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-[100] bg-zinc-950 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 h-20">
                        <Link href="/" className="text-2xl font-bold tracking-wide text-white">
                            YL<span className="text-indigo-500">.</span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-zinc-400 hover:text-white transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-8">
                        {navLinks.map((link, i) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-semibold text-zinc-300 hover:text-white transition-all duration-200 py-4 w-full text-center border-b border-white/5"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-6 w-full py-4 text-center bg-indigo-600 hover:bg-indigo-500 text-white text-lg font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            Let&apos;s Talk
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
