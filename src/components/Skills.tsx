import { Code2, Server, Wrench } from "lucide-react";

const skillCategories = [
    {
        title: "FRONTEND",
        icon: Code2,
        skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Vue.js", "Tailwind", "Next.js"],
    },
    {
        title: "BACKEND",
        icon: Server,
        skills: ["Node.js", "Python", "Express", "PostgreSQL", "MongoDB"],
    },
    {
        title: "TOOLS",
        icon: Wrench,
        skills: ["Git", "Figma", "Docker", "VS Code", "Jest", "Vercel"],
    },
];

export function Skills() {
    return (
        <section id="skills" className="py-28 px-4 md:px-6 bg-[#00e936] dark:bg-[#e9ff00] border-b-[4px] border-black dark:border-white relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-[3rem] sm:text-[4.5rem] font-black uppercase tracking-tighter leading-none text-black inline-block bg-white px-6 py-3 border-[4px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
                        TECHNICAL SKILLS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {skillCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <div
                                key={cat.title}
                                className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 md:p-10 transition-all duration-200 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-2 hover:-translate-x-2 flex flex-col h-full"
                            >
                                <div className="flex flex-col items-start gap-6 mb-10 border-b-[4px] border-black dark:border-white pb-6">
                                    <div className="bg-[#e9ff00] dark:bg-[#00e936] p-4 border-[4px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] inline-block">
                                        <Icon size={48} strokeWidth={2.5} className="text-black" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                                        {cat.title}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-auto">
                                    {cat.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-5 py-3 border-[3px] border-black dark:border-white text-md font-black uppercase tracking-wider text-black dark:text-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:dark:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-black dark:hover:bg-white hover:text-[#e9ff00] dark:hover:text-black transition-all cursor-default"
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
