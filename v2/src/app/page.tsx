"use client";
import { Mail, Linkedin, Github } from "lucide-react";
import { CodeCard } from "@/components/CodeCard";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-outfit)]">

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-2xl font-bold text-white tracking-wide">
            YL<span className="text-indigo-500">.</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-gray-300">
            {['About', 'Work', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-indigo-400 transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:inline-flex px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/10">
            Let's Talk
          </a>
        </div>
      </header>

      <main className="pt-20">

        {/* --- HERO SECTION --- */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="container px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

            {/* Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-medium border border-indigo-500/20">
                Hello, I'm Younes Lahlali
              </span>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Crafting <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Digital Magic</span> <br />
                with Code.
              </h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
                I build exceptional, pixel-perfect web applications that blend clean code with stunning performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <a href="#work" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-indigo-500/25">
                  View My Work
                </a>
                <a href="#contact" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-semibold transition-all backdrop-blur-sm">
                  Contact Me
                </a>
              </div>
            </div>

            {/* Interactive Visual */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full filter blur-3xl -z-10 transform scale-110"></div>
              <CodeCard />
            </div>

          </div>
        </section>

        {/* --- WORK SECTION --- */}
        <section id="work" className="py-24 bg-black/40">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">
              Selected <span className="text-indigo-400">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Project Card : Barcode Gen */}
              <div className="group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300">
                <div className="aspect-video bg-indigo-900/20 flex items-center justify-center p-8 group-hover:bg-indigo-900/30 transition-colors">
                  {/* Placeholder Icon */}
                  <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-3xl">🏁</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                      Barcode Generator
                    </h3>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    A high-performance tool to generate custom QR codes and Barcodes instantly. No server required.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {['React', 'Canvas API', 'Tailwind'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-indigo-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Placeholder Project 2 */}
              <div className="group relative bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300">
                <div className="aspect-video bg-pink-900/20 flex items-center justify-center p-8 group-hover:bg-pink-900/30 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <span className="text-3xl">🎨</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      Design System
                    </h3>
                    <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Complete UI kit with atomic components, documentation, and accessible patterns.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {['Figma', 'Storybook', 'TypeScript'].map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-pink-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 bg-black border-t border-white/10 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Younes Lahlali. Built with Next.js & Tailwind.</p>
      </footer>

    </div>
  );
}
