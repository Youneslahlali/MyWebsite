"use client";
import React, { useEffect, useState } from "react";

export function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    
    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;
        setIsDesktop(true);

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };
        
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if element is clickable
            const isClickable = 
                window.getComputedStyle(target).cursor === "pointer" || 
                target.tagName.toLowerCase() === "button" || 
                target.tagName.toLowerCase() === "a" || 
                target.tagName.toLowerCase() === "input" ||
                target.tagName.toLowerCase() === "select" ||
                target.closest("button") !== null || 
                target.closest("a") !== null;
                
            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", updatePosition, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        
        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible]);

    if (!isDesktop || !isVisible) return null;

    return (
        <div 
            className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center mix-blend-difference hidden sm:flex"
            style={{ 
                transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
            }}
        >
            <div 
                className={`transition-all duration-200 ease-out bg-white flex items-center justify-center ${
                    isHovering ? "w-10 h-10 rotate-45 opacity-100" : "w-4 h-4 rounded-full opacity-60"
                }`}
            >
                {isHovering && <div className="w-1.5 h-1.5 bg-black rotate-45" />}
            </div>
        </div>
    );
}
