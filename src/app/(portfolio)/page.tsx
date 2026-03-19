import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
    return (
        <main>
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}
