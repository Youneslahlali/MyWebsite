"use client";

import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [senderName, setSenderName] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const formData = new FormData(form);
        setSenderName((formData.get("name") as string) || "FRIEND");

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
        <section id="contact" className="py-28 px-4 md:px-6 bg-white dark:bg-[#111] text-black dark:text-white transition-colors duration-300">
            <div className="max-w-3xl mx-auto flex flex-col items-center">
                <h2 className="text-[3.5rem] sm:text-[4.5rem] md:text-[5rem] font-black uppercase tracking-tighter leading-none mb-4 text-black dark:text-white">
                    GET IN <span className="text-[#e9ff00]">TOUCH</span>
                </h2>
                
                <div className="flex w-full max-w-lg mb-12">
                    <p className="border-l-[4px] border-[#00e936] pl-4 text-left font-bold text-sm md:text-md tracking-tight">
                        Have a project in mind or want to say hi? Fill out<br />
                        the form below to drop me a message.
                    </p>
                </div>

                {status === "sent" ? (
                    <div className="bg-[#e9ff00] p-12 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] border-[4px] border-black text-black">
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">MESSAGE SENT!</h3>
                        <p className="text-lg font-bold">
                            Thanks for reaching out, {senderName.toUpperCase()}!
                        </p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-8 px-6 py-4 bg-black text-[#e9ff00] hover:bg-white hover:text-black font-black uppercase transition-colors flex gap-2 items-center"
                        >
                            SEND ANOTHER
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#e9ff00] p-8 md:p-10 space-y-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] border-[4px] border-black">
                        <input type="hidden" name="_subject" value="New Submission!" />
                        <input type="hidden" name="_captcha" value="false" />

                        <div className="space-y-8">
                            <div className="relative group">
                                <label className="block text-black font-black uppercase text-sm mb-3 tracking-widest">NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="JOHN DOE"
                                    required
                                    className="w-full px-5 py-4 bg-white border-[3px] border-black text-black font-bold text-lg placeholder-black/40 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase hover:-translate-y-0.5"
                                />
                            </div>
                            <div className="relative group">
                                <label className="block text-black font-black uppercase text-sm mb-3 tracking-widest">EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="HELLO@EXAMPLE.COM"
                                    required
                                    className="w-full px-5 py-4 bg-white border-[3px] border-black text-black font-bold text-lg placeholder-black/40 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase hover:-translate-y-0.5"
                                />
                            </div>
                            <div className="relative group">
                                <label className="block text-black font-black uppercase text-sm mb-3 tracking-widest">MESSAGE</label>
                                <textarea
                                    name="message"
                                    placeholder="LET'S BUILD SOMETHING AWESOME..."
                                    rows={4}
                                    required
                                    className="w-full px-5 py-4 bg-white border-[3px] border-black text-black font-bold text-lg placeholder-black/40 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all resize-none uppercase hover:-translate-y-0.5"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full py-5 bg-black hover:bg-white text-[#e9ff00] hover:text-black border-[3px] border-black disabled:opacity-60 font-black text-2xl uppercase transition-all shadow-[6px_6px_0px_0px_#00e936] hover:shadow-[0px_0px_0px_0px_transparent] hover:translate-y-[6px] hover:translate-x-[6px] flex items-center justify-center gap-3 mt-8"
                        >
                            {status === "sending" ? "SENDING..." : <> <Send size={24} strokeWidth={3} /> SEND IT </>}
                        </button>
                    </form>
                )}

                {/* Social Links */}
                <div className="flex items-center justify-center gap-4 mt-12 pb-12">
                    {[
                        { href: "https://github.com/Youneslahlali", icon: Github },
                        { href: "https://www.linkedin.com/in/younes28l/", icon: Linkedin },
                        { href: "mailto:youneslh1@proton.me", icon: Mail },
                    ].map((social, i) => (
                        <a
                            key={i}
                            href={social.href}
                            target={social.href.startsWith("mailto") ? undefined : "_blank"}
                            rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                            className="p-3 bg-black border-[3px] border-transparent text-white dark:text-[#e9ff00] hover:text-[#e9ff00] dark:hover:text-white transition-colors shadow-[4px_4px_0px_0px_#e9ff00] hover:shadow-[4px_4px_0px_0px_transparent] hover:translate-y-1 hover:translate-x-1"
                        >
                            <social.icon size={28} strokeWidth={2} />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
