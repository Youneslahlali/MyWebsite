import { ExternalLink, Layers } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "Code Generator Suite",
        description:
            "A professional tool to generate high-quality QR codes, barcodes, and bulk barcodes. Features live preview, multiple formats, and camera scanning.",
        tech: ["Next.js", "TypeScript", "Tailwind"],
        color: "indigo",
        link: "/generator",
        isInternal: true,
    },
];

const colorMap: Record<string, { bg: string; hoverBg: string; hoverBorder: string; hoverText: string; tag: string; tagText: string; gradient: string }> = {
    indigo: {
        bg: "bg-indigo-900/20",
        hoverBg: "group-hover:bg-indigo-900/30",
        hoverBorder: "hover:border-indigo-500/50",
        hoverText: "group-hover:text-indigo-400",
        tag: "bg-indigo-500/10 border-indigo-500/20",
        tagText: "text-indigo-300",
        gradient: "from-indigo-500 to-purple-500",
    },
    pink: {
        bg: "bg-pink-900/20",
        hoverBg: "group-hover:bg-pink-900/30",
        hoverBorder: "hover:border-pink-500/50",
        hoverText: "group-hover:text-pink-400",
        tag: "bg-pink-500/10 border-pink-500/20",
        tagText: "text-pink-300",
        gradient: "from-pink-500 to-purple-500",
    },
};

export function Projects() {
    return (
        <section id="projects" className="py-28">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-indigo-300 mb-4">
                        <Layers className="w-3.5 h-3.5 inline mr-1.5" />
                        Portfolio
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Featured <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => {
                        const colors = colorMap[project.color];
                        const Wrapper = project.isInternal ? Link : "a";
                        const wrapperProps = project.isInternal
                            ? { href: project.link }
                            : { href: project.link, target: "_blank" as const, rel: "noopener noreferrer" };

                        return (
                            <div
                                key={project.title}
                                className={`group relative glass glass-hover rounded-2xl overflow-hidden transition-all duration-300 ${colors.hoverBorder} hover:-translate-y-1`}
                            >
                                {/* Gradient accent bar */}
                                <div className={`h-1 w-full bg-gradient-to-r ${colors.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3
                                            className={`text-xl font-bold text-white transition-colors ${colors.hoverText}`}
                                        >
                                            {project.title}
                                        </h3>
                                        <Wrapper
                                            {...wrapperProps}
                                            className="p-2 glass rounded-full text-zinc-400 hover:text-white transition-all hover:scale-110"
                                        >
                                            <ExternalLink size={16} />
                                        </Wrapper>
                                    </div>

                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex gap-2 flex-wrap">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all hover:scale-105 ${colors.tag} ${colors.tagText}`}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
