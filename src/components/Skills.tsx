const skillCategories = [
    {
        title: "Frontend",
        color: "indigo",
        skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Vue.js", "Tailwind"],
    },
    {
        title: "Backend",
        color: "purple",
        skills: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB"],
    },
    {
        title: "Tools & Design",
        color: "pink",
        skills: ["Git", "Figma", "Docker", "VS Code", "Jest"],
    },
];

const colorMap: Record<string, { border: string; tag: string; tagText: string }> = {
    indigo: {
        border: "hover:border-indigo-500/30",
        tag: "bg-indigo-500/10 border-indigo-500/20",
        tagText: "text-indigo-300",
    },
    purple: {
        border: "hover:border-purple-500/30",
        tag: "bg-purple-500/10 border-purple-500/20",
        tagText: "text-purple-300",
    },
    pink: {
        border: "hover:border-pink-500/30",
        tag: "bg-pink-500/10 border-pink-500/20",
        tagText: "text-pink-300",
    },
};

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16">
                    Technical <span className="text-indigo-400">Skills</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((cat) => {
                        const colors = colorMap[cat.color];
                        return (
                            <div
                                key={cat.title}
                                className={`glass rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${colors.border}`}
                            >
                                <h3 className="text-xl font-bold text-white mb-6">
                                    {cat.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${colors.tag} ${colors.tagText}`}
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
