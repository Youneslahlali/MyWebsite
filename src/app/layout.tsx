import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

export const metadata: Metadata = {
    title: "Younes Lahlali | Creative Developer",
    description:
        "Portfolio of Younes Lahlali — a passionate developer building modern, performant web experiences with exceptional design.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body
                className={`${outfit.variable} ${firaCode.variable} font-sans antialiased bg-zinc-950 text-zinc-100`}
            >
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
