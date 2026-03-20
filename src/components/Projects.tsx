import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const projects = [
    {
        title: "NO INTERNET DINO",
        description: "A clone of the classic Chrome offline dinosaur game. Built purely with React, HTML5 Canvas, and custom physics loop.",
        tech: ["Next.js", "Canvas API", "Physics"],
        link: "/dino",
        isInternal: true,
    },
    {
        title: "CODE GENERATOR SUITE",
        description:
            "A professional tool to generate high-quality QR codes, barcodes, and bulk barcodes. Features live preview, multiple formats, and camera scanning.",
        tech: ["Next.js", "TypeScript", "Tailwind"],
        link: "/generator",
        isInternal: true,
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-28 px-4 md:px-6 bg-white dark:bg-[#111] border-b-[4px] border-black dark:border-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 relative">
                    <h2 className="text-[3rem] sm:text-[4.5rem] font-black uppercase tracking-tighter leading-none text-black relative z-10 inline-block bg-[#e9ff00] dark:bg-[#00e936] px-6 py-3 border-[4px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] -rotate-1">
                        FEATURED PROJECTS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {projects.map((project) => {
                        const content = (
                            <>
                                {/* Browser Top Bar */}
                                <div className="w-full h-12 bg-[#f0f0f0] dark:bg-[#222] border-b-[4px] border-black dark:border-white flex items-center px-4 gap-3 z-20 relative">
                                    <div className="w-4 h-4 rounded-full border-[3px] border-black dark:border-white bg-[#ff5f56] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"></div>
                                    <div className="w-4 h-4 rounded-full border-[3px] border-black dark:border-white bg-[#ffbd2e] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"></div>
                                    <div className="w-4 h-4 rounded-full border-[3px] border-black dark:border-white bg-[#27c93f] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"></div>
                                    <div className="ml-auto w-[60%] h-6 bg-white dark:bg-black border-[3px] border-black dark:border-white text-[10px] sm:text-xs flex items-center justify-center font-bold font-mono text-black dark:text-white truncate px-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                                        9eleven.site{project.link}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8 pt-10 space-y-6 flex-1 flex flex-col relative overflow-hidden group/body bg-white dark:bg-black">
                                    {/* Dynamic background effect on hover */}
                                    <div className="absolute inset-0 bg-[#e9ff00] dark:bg-[#00e936] translate-y-full group-hover/body:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                                    
                                    <div className="relative z-10 flex justify-between items-start gap-4 border-b-[4px] border-black dark:border-white pb-4 pointer-events-none">
                                        <h3 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight leading-none group-hover/body:text-black transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <div
                                            className="bg-white dark:bg-black border-[3px] border-black dark:border-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-black dark:text-white group-hover/body:bg-black group-hover/body:text-[#e9ff00] transition-colors flex-shrink-0"
                                            aria-hidden="true"
                                        >
                                            <ExternalLink size={24} strokeWidth={3} />
                                        </div>
                                    </div>

                                    <p className="relative z-10 text-black dark:text-gray-300 text-lg font-bold leading-relaxed flex-1 pointer-events-none group-hover/body:text-black transition-colors duration-300">
                                        {project.description}
                                    </p>

                                    <div className="relative z-10 flex gap-2 flex-wrap pt-4 pointer-events-none">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 border-[3px] border-black dark:border-white text-xs font-black uppercase tracking-wide text-black dark:text-white bg-white dark:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] group-hover/body:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] group-hover/body:translate-x-[2px] group-hover/body:translate-y-[2px] group-hover/body:bg-black group-hover/body:text-white transition-all duration-200"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        );

                        const baseClasses = "group block border-[4px] border-black dark:border-white transition-all duration-200 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:dark:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] hover:translate-y-3 hover:translate-x-3 relative flex flex-col cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white overflow-hidden";

                        if (project.isInternal) {
                            return (
                                <Link href={project.link} key={project.title} className={baseClasses}>
                                    {content}
                                </Link>
                            );
                        }

                        return (
                            <a href={project.link} key={project.title} target="_blank" rel="noopener noreferrer" className={baseClasses}>
                                {content}
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
