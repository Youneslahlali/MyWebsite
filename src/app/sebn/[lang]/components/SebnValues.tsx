import { ShieldCheck, Users, HeartHandshake, Rocket } from "lucide-react";

export function SebnValues({ dict }: { dict: any }) {
    const iconMap = [Rocket, HeartHandshake, ShieldCheck, Users];

    return (
        <section className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Notre ADN</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#330066] tracking-tight">{dict.values.title}</h2>
                    <div className="w-24 h-1 bg-[#330066]/20 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dict.values.list.map((value: any, i: number) => {
                        const Icon = iconMap[i];
                        return (
                            <div key={i} className="group relative text-center p-10 border border-slate-200 rounded-3xl bg-white hover:border-[#330066] hover:border-opacity-30 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 cursor-default">
                                {/* Subtle gradient glow in the background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#330066]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-50 group-hover:bg-[#330066] group-hover:shadow-lg flex items-center justify-center text-[#330066] group-hover:text-white mb-8 transition-all duration-500 group-hover:scale-110 -rotate-3 group-hover:rotate-0">
                                        <Icon size={34} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-slate-900">{value.name}</h3>
                                    <p className="text-slate-600 text-base leading-relaxed">{value.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
