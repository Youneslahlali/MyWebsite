import type { Metadata, Viewport } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Outfit, Fira_Code, Cairo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
});

const firaCode = Fira_Code({
    variable: "--font-fira-code",
    subsets: ["latin"],
    weight: ["400", "500"],
});

const cairo = Cairo({
    variable: "--font-cairo",
    subsets: ["arabic"],
    weight: ["400", "600", "700"],
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#000000" },
    ],
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "Younes Lahlali | Creative Developer",
        template: "%s | Younes Lahlali"
    },
    description: "Portfolio of Younes Lahlali — a passionate developer building modern, performant web experiences with aggressive Neo-Brutalist design.",
    keywords: ["Younes Lahlali", "Creative Developer", "Frontend Engineer", "Next.js", "React", "Neo-Brutalism", "Portfolio"],
    authors: [{ name: "Younes Lahlali" }],
    creator: "Younes Lahlali",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://youneslahlali.dev",
        title: "Younes Lahlali | Creative Developer",
        description: "Portfolio of Younes Lahlali — building modern, performant web experiences.",
        siteName: "Younes Lahlali Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Younes Lahlali | Creative Developer",
        description: "Portfolio of Younes Lahlali — building modern, performant web experiences.",
        creator: "@youneslahlali",
    },
};

import { CustomCursor } from "@/components/CustomCursor";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${outfit.variable} ${firaCode.variable} ${cairo.variable} font-sans antialiased bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 overflow-x-hidden`}
            >
                <ThemeProvider>
                    <CustomCursor />
                    <ScrollToTop />
                    <MusicPlayer />
                    <main className="relative z-10 pb-40">{children}</main>
                    <ThemeToggle />
                </ThemeProvider>
            </body>
        </html>
    );
}
