"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send, CheckCircle } from "lucide-react";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [senderName, setSenderName] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const formData = new FormData(form);
        setSenderName((formData.get("name") as string) || "Friend");

        try {
            const res = await fetch("https://formsubmit.co/ajax/youneslh1@proton.me", {
                method: "POST",
                body: formData,
            });
            await res.json();
            setStatus("sent");
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <section id="contact" className="py-24 bg-zinc-900/30">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    Get In <span className="text-indigo-400">Touch</span>
                </h2>
                <p className="text-zinc-400 mb-12 text-lg">
                    Have a project in mind or want to say hi? Fill out the form
                    below and I&apos;ll get back to you as soon as possible.
                </p>

                {status === "sent" ? (
                    <div className="glass rounded-2xl p-12 space-y-4 animate-fade-in-up">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                        <p className="text-zinc-400">
                            Thanks for reaching out, {senderName}! I&apos;ll get back to you
                            soon.
                        </p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-colors border border-white/10"
                        >
                            Send Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <input type="hidden" name="_subject" value="New Submission from Portfolio!" />
                        <input type="hidden" name="_captcha" value="false" />

                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                        </div>
                        <div>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows={5}
                                required
                                className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                        >
                            {status === "sending" ? (
                                "Sending..."
                            ) : status === "error" ? (
                                "Error! Try again."
                            ) : (
                                <>
                                    <Send size={18} />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Social Links */}
                <div className="flex items-center justify-center gap-6 mt-12">
                    <a
                        href="https://github.com/Youneslahlali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all hover:-translate-y-1 border border-white/5"
                    >
                        <Github size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/younes28l/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all hover:-translate-y-1 border border-white/5"
                    >
                        <Linkedin size={20} />
                    </a>
                    <a
                        href="mailto:youneslh1@proton.me"
                        className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all hover:-translate-y-1 border border-white/5"
                    >
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
}
