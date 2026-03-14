import { Cpu, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";

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

const imageMap = [
    "/sebn_product_low_voltage_1773415552973.png",
    "/sebn_product_high_voltage_1773415567748.png",
    "/sebn_product_control_units_1773415581048.png"
];

export function SebnProducts({ dict }: { dict: any }) {
    return (
        <section id="products" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#330066]">{dict.products.title}</h2>
                    <p className="text-slate-600 max-w-2xl text-lg">{dict.products.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {dict.products.list.map((product: any, i: number) => {
                        const Icon = iconMap[product.name as keyof typeof iconMap] || Zap;
                        const imgSrc = imageMap[i] || imageMap[0];
                        return (
                            <div 
                                key={i} 
                                className="group flex flex-col rounded-3xl bg-slate-50 border border-slate-200 hover:border-[#330066]/30 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                            >
                                <div className="relative h-64 w-full overflow-hidden bg-white">
                                    <Image 
                                        src={imgSrc} 
                                        alt={product.name} 
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    {/* Subtly darkened bottom to make icon stand out if we move it */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-8 relative flex-1 flex flex-col">
                                    {/* Icon overlapping the image slightly */}
                                    <div className="absolute -top-10 left-8 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#330066] group-hover:bg-[#330066] group-hover:text-white transition-colors duration-500">
                                        <Icon size={26} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 mt-6 text-slate-900 group-hover:text-[#330066] transition-colors">{product.name}</h3>
                                    <p className="text-slate-600 text-base leading-relaxed flex-1">{product.desc}</p>
                                    
                                    <div className="mt-8 flex items-center text-[#330066] font-bold text-sm tracking-widest uppercase cursor-pointer opacity-80 hover:opacity-100">
                                        <span className="mr-2">Explore</span>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
