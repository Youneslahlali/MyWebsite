import { Briefcase, FolderCheck, Heart, TrendingUp } from "lucide-react";

const stats = [
    { icon: Briefcase, value: "3+", label: "Years Experience", gradient: "from-indigo-500 to-blue-500" },
    { icon: FolderCheck, value: "50+", label: "Projects Completed", gradient: "from-purple-500 to-indigo-500" },
    { icon: Heart, value: "100%", label: "Client Satisfaction", gradient: "from-pink-500 to-purple-500" },
];

export function About() {
    return (
        <section id="about" className="py-28 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-indigo-300 mb-4">
                        <TrendingUp className="w-3.5 h-3.5 inline mr-1.5" />
                        Background
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        About <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Me</span>
                    </h2>
                </div>

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
                                className="glass glass-hover rounded-2xl p-6 text-center hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`w-10 h-10 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} p-2.5 shadow-lg`}>
                                    <stat.icon className="w-full h-full text-white" />
                                </div>
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
