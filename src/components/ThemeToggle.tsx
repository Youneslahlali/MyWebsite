"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const [animating, setAnimating] = useState(false);
    const [displayTheme, setDisplayTheme] = useState(theme);

    useEffect(() => {
        if (!animating) setDisplayTheme(theme);
    }, [theme, animating]);

    const handleToggle = () => {
        setAnimating(true);
        toggle();
        setTimeout(() => setAnimating(false), 450);
    };

    const isDark = displayTheme === "dark";

    return (
        <button
            onClick={handleToggle}
            className="fixed bottom-6 right-6 z-50 w-[50px] h-[50px] rounded-full glass-strong hover:scale-110 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer overflow-hidden"
            aria-label="Toggle theme"
        >
            <div className="relative w-full h-full">
                {/* Sun icon */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        transform: isDark
                            ? "translateY(0px)"
                            : animating
                                ? "translateY(50px)"
                                : "translateY(50px)",
                        filter: isDark ? "blur(0px)" : "blur(4px)",
                        opacity: isDark ? 1 : 0,
                    }}
                >
                    <Sun size={22} fill="#fbbf24" color="#fbbf24" strokeWidth={2} />
                </div>

                {/* Moon icon */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                        transform: !isDark
                            ? "translateY(0px)"
                            : animating
                                ? "translateY(-50px)"
                                : "translateY(-50px)",
                        filter: !isDark ? "blur(0px)" : "blur(4px)",
                        opacity: !isDark ? 1 : 0,
                    }}
                >
                    <Moon size={22} fill="#9ca3af" color="#6b7280" strokeWidth={2} />
                </div>
            </div>
        </button>
    );
}
