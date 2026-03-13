import { ArrowUpRight } from "lucide-react";

export function SebnCareers({ dict }: { dict: any }) {
    return (
        <section id="careers" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 grayscale opacity-10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold">{dict.careers.title}</h2>
                    <p className="text-xl text-slate-400">
                        {dict.careers.subtitle}
                    </p>
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                        {dict.careers.cta}
                        <ArrowUpRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
