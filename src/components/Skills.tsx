import { Code2, Server, Wrench } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend",
        icon: Code2,
        color: "indigo",
        skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Vue.js", "Tailwind"],
    },
    {
        title: "Backend",
        icon: Server,
        color: "purple",
        skills: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB"],
    },
    {
        title: "Tools & Design",
        icon: Wrench,
        color: "pink",
        skills: ["Git", "Figma", "Docker", "VS Code", "Jest"],
    },
];

const colorMap: Record<string, { border: string; tag: string; tagText: string; gradient: string; iconBg: string }> = {
    indigo: {
        border: "hover:border-indigo-500/30",
        tag: "bg-indigo-500/10 border-indigo-500/20",
        tagText: "text-indigo-300",
        gradient: "from-indigo-500 to-blue-500",
        iconBg: "bg-indigo-500/10",
    },
    purple: {
        border: "hover:border-purple-500/30",
        tag: "bg-purple-500/10 border-purple-500/20",
        tagText: "text-purple-300",
        gradient: "from-purple-500 to-indigo-500",
        iconBg: "bg-purple-500/10",
    },
    pink: {
        border: "hover:border-pink-500/30",
        tag: "bg-pink-500/10 border-pink-500/20",
        tagText: "text-pink-300",
        gradient: "from-pink-500 to-purple-500",
        iconBg: "bg-pink-500/10",
    },
};

export function Skills() {
    return (
        <section id="skills" className="py-28 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-indigo-300 mb-4">
                        <Code2 className="w-3.5 h-3.5 inline mr-1.5" />
                        What I Work With
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Technical <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((cat) => {
                        const colors = colorMap[cat.color];
                        const Icon = cat.icon;
                        return (
                            <div
                                key={cat.title}
                                className={`glass glass-hover rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${colors.border}`}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors.gradient} p-2.5 shadow-lg`}>
                                        <Icon className="w-full h-full text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">
                                        {cat.title}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105 ${colors.tag} ${colors.tagText}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
