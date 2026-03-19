import { Briefcase, FolderCheck, Heart } from "lucide-react";

const stats = [
    { icon: Briefcase, value: "3+", label: "YEARS EXPERIENCE" },
    { icon: FolderCheck, value: "50+", label: "PROJECTS COMPLETED" },
    { icon: Heart, value: "100%", label: "CLIENT SATISFACTION" },
];

export function About() {
    return (
        <section id="about" className="py-28 px-4 md:px-6 bg-[#f0f0f0] dark:bg-[#111] border-b-[4px] border-black dark:border-white relative transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24 relative">
                    <h2 className="text-[3rem] sm:text-[5rem] font-black uppercase tracking-tighter leading-none text-black relative z-10 inline-block bg-[#e9ff00] dark:bg-[#00e936] px-8 py-4 border-[4px] border-black dark:border-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] rotate-2">
                        ABOUT ME
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 bg-white dark:bg-black p-8 md:p-12 border-[4px] border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                        <p className="text-xl md:text-3xl font-bold leading-relaxed tracking-tight text-black dark:text-white border-l-[8px] border-[#00e936] dark:border-[#e9ff00] pl-6 bg-[#00e936]/10 dark:bg-[#e9ff00]/10 px-4 py-4">
                            I am a developer who focuses on writing clean, elegant, and efficient code. I believe that a website should not only look good but also perform flawlessly.
                        </p>
                        <p className="text-xl md:text-3xl font-bold leading-relaxed tracking-tight text-black dark:text-white border-l-[8px] border-[#00e936] dark:border-[#e9ff00] pl-6 bg-[#00e936]/10 dark:bg-[#e9ff00]/10 px-4 py-4">
                            With a background in modern web technologies, I love translating complex requirements into user-friendly interfaces. My journey involves constant learning and adapting to the ever-evolving tech landscape.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8 w-full">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="group cursor-default border-[4px] border-black dark:border-white p-6 md:p-8 flex flex-row items-center justify-between gap-6 bg-white dark:bg-black hover:bg-[#e9ff00] dark:hover:bg-[#e9ff00] transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[8px] hover:translate-x-[8px]"
                            >
                                <div className="flex flex-col items-start w-full">
                                    <div className="text-5xl md:text-6xl lg:text-7xl font-black text-black dark:text-white group-hover:dark:text-black leading-none mb-3">
                                        {stat.value}
                                    </div>
                                    <div className="text-lg md:text-xl font-black uppercase tracking-widest text-[#00e936] dark:text-[#e9ff00] group-hover:text-black group-hover:dark:text-black selection:bg-black selection:text-white">
                                        {stat.label}
                                    </div>
                                </div>
                                <div className="p-4 md:p-6 border-[4px] border-black dark:border-white bg-white dark:bg-black group-hover:bg-black group-hover:dark:bg-white group-hover:text-white group-hover:dark:text-black transition-colors duration-200 rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] group-hover:dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-rotate-6">
                                    <stat.icon size={56} strokeWidth={2.5} className="text-black dark:text-white group-hover:text-white group-hover:dark:text-black" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
