"use client";

import { useState } from "react";
import {
    Code2,
    Server,
    Wrench,
    Atom,
    Zap,
    FileCode2,
    Braces,
    Hexagon,
    Wind,
    TerminalSquare,
    Database,
    Leaf,
    GitBranch,
    Figma,
    Box,
    CheckCircle2,
    Triangle,
} from "lucide-react";

// Skill definitions with Lucide icons
const skillCategories = [
    {
        title: "FRONTEND",
        icon: Code2,
        skills: [
            { name: "HTML5", icon: FileCode2 },
            { name: "CSS3", icon: FileCode2 },
            { name: "JavaScript", icon: Braces },
            { name: "React", icon: Atom },
            { name: "Vue.js", icon: Hexagon },
            { name: "Tailwind", icon: Wind },
            { name: "Next.js", icon: Triangle },
        ],
    },
    {
        title: "BACKEND",
        icon: Server,
        skills: [
            { name: "Node.js", icon: Server },
            { name: "Python", icon: TerminalSquare },
            { name: "Express", icon: Zap },
            { name: "PostgreSQL", icon: Database },
            { name: "MongoDB", icon: Leaf },
        ],
    },
    {
        title: "TOOLS",
        icon: Wrench,
        skills: [
            { name: "Git", icon: GitBranch },
            { name: "Figma", icon: Figma },
            { name: "Docker", icon: Box },
            { name: "VS Code", icon: Code2 },
            { name: "Jest", icon: CheckCircle2 },
            { name: "Vercel", icon: Triangle },
        ],
    },
];

const TiltCard = ({ category }: { category: any }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate rotation: max 15 degrees
        const rotateXVal = ((mouseY - height / 2) / height) * -15; 
        const rotateYVal = ((mouseX - width / 2) / width) * 15;
        
        setRotate({ x: rotateXVal, y: rotateYVal });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    const Icon = category.icon;

    return (
        <div
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white dark:bg-black border-[4px] border-black dark:border-white p-8 md:p-10 transition-transform duration-200 ease-out shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col h-full relative"
        >
            <div 
                style={{ transform: "translateZ(50px)" }}
                className="flex flex-col items-start gap-6 mb-10 border-b-[4px] border-black dark:border-white pb-6 transition-transform duration-200"
            >
                <div className="bg-[#e9ff00] dark:bg-[#00e936] p-4 border-[4px] border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] inline-block">
                    <Icon size={48} strokeWidth={2.5} className="text-black" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-black dark:text-white uppercase tracking-tighter leading-none">
                    {category.title}
                </h3>
            </div>
            <div 
                style={{ transform: "translateZ(40px)" }}
                className="flex flex-wrap gap-4 mt-auto transition-transform duration-200"
            >
                {category.skills.map((skill: any) => {
                    const SkillIcon = skill.icon;
                    return (
                        <span
                            key={skill.name}
                            className="flex items-center gap-2 px-4 py-2 border-[3px] border-black dark:border-white text-sm md:text-md font-black uppercase tracking-wider text-black dark:text-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:dark:shadow-[0px_0px_0px_0px_rgba(255,255,255,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:bg-black dark:hover:bg-white hover:text-[#e9ff00] dark:hover:text-black transition-all cursor-default"
                        >
                            <SkillIcon size={18} strokeWidth={2.5} />
                            {skill.name}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export function Skills() {
    return (
        <section id="skills" className="py-28 px-4 md:px-6 bg-[#00e936] dark:bg-[#e9ff00] border-b-[4px] border-black dark:border-white relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto relative z-10" style={{ perspective: "1000px" }}>
                <div className="text-center mb-20">
                    <h2 className="text-[3rem] sm:text-[4.5rem] font-black uppercase tracking-tighter leading-none text-black inline-block bg-white px-6 py-3 border-[4px] border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
                        TECHNICAL SKILLS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {skillCategories.map((cat) => (
                        <TiltCard key={cat.title} category={cat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
