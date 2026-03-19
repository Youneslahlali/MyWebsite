import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

const projects = [
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
                                <div className="absolute top-0 left-0 w-full h-[15px] bg-[#00e936] border-b-[4px] border-black dark:border-white group-hover:bg-[#e9ff00] transition-colors"></div>
                                
                                <div className="p-8 pt-12 space-y-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start gap-4 border-b-[4px] border-black dark:border-white pb-4 pointer-events-none">
                                        <h3 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight leading-none group-hover:underline decoration-4 underline-offset-4">
                                            {project.title}
                                        </h3>
                                        <div
                                            className="bg-white dark:bg-black border-[3px] border-black dark:border-white p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-black dark:text-white group-hover:bg-black group-hover:dark:bg-white group-hover:text-[#e9ff00] group-hover:dark:text-black transition-colors flex-shrink-0"
                                            aria-hidden="true"
                                        >
                                            <ExternalLink size={24} strokeWidth={3} />
                                        </div>
                                    </div>

                                    <p className="text-black dark:text-gray-300 text-lg font-bold leading-relaxed flex-1 pointer-events-none">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-2 flex-wrap pt-4 pointer-events-none">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="px-3 py-1 border-[3px] border-black dark:border-white text-xs font-black uppercase tracking-wide text-black dark:text-white bg-white dark:bg-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        );

                        const baseClasses = "group block border-[4px] border-black dark:border-white bg-[#f0f0f0] dark:bg-[#222] transition-all duration-200 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:dark:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] hover:translate-y-3 hover:translate-x-3 relative flex flex-col cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-black dark:focus-visible:ring-white";

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
