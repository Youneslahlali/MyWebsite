import { Cpu, Zap, ShieldCheck } from "lucide-react";

const iconMap = {
    "Low Voltage Harnesses": Zap,
    "High Voltage Systems": ShieldCheck,
    "Control Units": Cpu,
    "Faisceaux Basse Tension": Zap,
    "Systèmes Haute Tension": ShieldCheck,
    "Unités de Contrôle": Cpu,
    "أسلاك الجهد المنخفض": Zap,
    "أنظمة الجهد العالي": ShieldCheck,
    "وحدات التحكم": Cpu
};

export function SebnProducts({ dict }: { dict: any }) {
    return (
        <section id="products" className="py-24 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{dict.products.title}</h2>
                    <p className="text-slate-400 max-w-2xl">{dict.products.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {dict.products.list.map((product: any, i: number) => {
                        const Icon = iconMap[product.name as keyof typeof iconMap] || Zap;
                        return (
                            <div 
                                key={i} 
                                className="group p-8 rounded-2xl bg-slate-950 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{product.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
