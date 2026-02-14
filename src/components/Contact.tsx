"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send, CheckCircle, MessageSquare } from "lucide-react";

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
        <section id="contact" className="py-28 bg-zinc-900/30">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <span className="inline-block px-4 py-1.5 glass rounded-full text-sm font-medium text-indigo-300 mb-4">
                    <MessageSquare className="w-3.5 h-3.5 inline mr-1.5" />
                    Contact
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Get In <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
                </h2>
                <p className="text-zinc-400 mb-12 text-lg">
                    Have a project in mind or want to say hi? Fill out the form
                    below and I&apos;ll get back to you as soon as possible.
                </p>

                {status === "sent" ? (
                    <div className="glass rounded-2xl p-12 space-y-4 animate-fade-in-up shimmer-border">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center ring-1 ring-green-500/20">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                        <p className="text-zinc-400">
                            Thanks for reaching out, {senderName}! I&apos;ll get back to you
                            soon.
                        </p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="px-6 py-2.5 glass glass-hover text-white rounded-xl font-medium transition-all"
                        >
                            Send Another
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4 text-left">
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
                            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
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
                <div className="flex items-center justify-center gap-4 mt-12">
                    {[
                        { href: "https://github.com/Youneslahlali", icon: Github, label: "GitHub" },
                        { href: "https://www.linkedin.com/in/younes28l/", icon: Linkedin, label: "LinkedIn" },
                        { href: "mailto:youneslh1@proton.me", icon: Mail, label: "Email" },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target={social.href.startsWith("mailto") ? undefined : "_blank"}
                            rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                            className="p-3 glass glass-hover rounded-full text-zinc-400 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10"
                            aria-label={social.label}
                        >
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
