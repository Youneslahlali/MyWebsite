import { ExternalLink, QrCode } from "lucide-react";
import Link from "next/link";

const projects = [
    {
        title: "Code Generator Suite",
        description:
            "A professional tool to generate high-quality QR codes, barcodes, and bulk PDFs. Features live preview, multiple formats, and camera scanning.",
        tech: ["Next.js", "TypeScript", "Tailwind"],
        color: "indigo",
        emoji: "🏁",
        link: "/generator",
        isInternal: true,
    },
    {
        title: "Design System",
        description:
            "Complete UI kit with atomic components, documentation, and accessible patterns for rapid development.",
        tech: ["Figma", "Storybook", "TypeScript"],
        color: "pink",
        emoji: "🎨",
        link: "#",
        isInternal: false,
    },
];

const colorMap: Record<string, { bg: string; hoverBg: string; hoverBorder: string; hoverText: string; tag: string; tagText: string }> = {
    indigo: {
        bg: "bg-indigo-900/20",
        hoverBg: "group-hover:bg-indigo-900/30",
        hoverBorder: "hover:border-indigo-500/50",
        hoverText: "group-hover:text-indigo-400",
        tag: "bg-indigo-500/10 border-indigo-500/20",
        tagText: "text-indigo-300",
    },
    pink: {
        bg: "bg-pink-900/20",
        hoverBg: "group-hover:bg-pink-900/30",
        hoverBorder: "hover:border-pink-500/50",
        hoverText: "group-hover:text-pink-400",
        tag: "bg-pink-500/10 border-pink-500/20",
        tagText: "text-pink-300",
    },
};

export function Projects() {
    return (
        <section id="projects" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16">
                    Featured <span className="text-indigo-400">Projects</span>
                </h2>

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
                                className={`group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${colors.hoverBorder} hover:-translate-y-1`}
                            >
                                <div
                                    className={`aspect-video ${colors.bg} ${colors.hoverBg} flex items-center justify-center p-8 transition-colors`}
                                >
                                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-3xl">
                                        {project.emoji}
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3
                                            className={`text-xl font-bold text-white transition-colors ${colors.hoverText}`}
                                        >
                                            {project.title}
                                        </h3>
                                        <Wrapper
                                            {...wrapperProps}
                                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
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
                                                className={`px-2.5 py-1 rounded text-xs font-medium border ${colors.tag} ${colors.tagText}`}
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
