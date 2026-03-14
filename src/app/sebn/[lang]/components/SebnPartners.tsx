export function SebnPartners({ dict }: { dict: any }) {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-4 block">Confiance Globale</span>
                    <h2 className="text-3xl font-black text-[#330066] mb-4">{dict.partners.title}</h2>
                    <p className="text-slate-500 text-base max-w-2xl mx-auto">{dict.partners.subtitle}</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                    {dict.partners.brands.map((brand: string) => (
                        <div key={brand} className="text-2xl md:text-4xl font-black tracking-tighter text-slate-800 hover:text-[#330066] transition-colors cursor-default hover:scale-105 transform duration-300">
                            {brand.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>
    );
}
