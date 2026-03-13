import { ShieldCheck, Users, HeartHandshake, Rocket } from "lucide-react";

export function SebnValues({ dict }: { dict: any }) {
    const iconMap = [Rocket, HeartHandshake, ShieldCheck, Users];

    return (
        <section className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{dict.values.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dict.values.list.map((value: any, i: number) => {
                        const Icon = iconMap[i];
                        return (
                            <div key={i} className="text-center p-6 border border-white/5 rounded-2xl bg-slate-900/50 hover:border-blue-500/30 transition-all">
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mx-auto mb-6">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.name}</h3>
                                <p className="text-slate-400 text-sm">{value.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
