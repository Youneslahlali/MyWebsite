import { Briefcase, FolderCheck, Heart } from "lucide-react";

const stats = [
    { icon: Briefcase, value: "3+", label: "Years Experience" },
    { icon: FolderCheck, value: "50+", label: "Projects Completed" },
    { icon: Heart, value: "100%", label: "Client Satisfaction" },
];

export function About() {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16">
                    About <span className="text-indigo-400">Me</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div className="space-y-6">
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            I am a developer who focuses on writing clean, elegant, and
                            efficient code. I believe that a website should not only look good
                            but also perform flawlessly.
                        </p>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            With a background in modern web technologies, I love translating
                            complex requirements into user-friendly interfaces. My journey
                            involves constant learning and adapting to the ever-evolving tech
                            landscape.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="glass rounded-2xl p-6 text-center hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <stat.icon className="w-6 h-6 text-indigo-400 mx-auto mb-3" />
                                <div className="text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
