export function SebnPartners({ dict }: { dict: any }) {
    return (
        <section className="py-20 bg-slate-900/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-slate-300 mb-2">{dict.partners.title}</h2>
                    <p className="text-slate-500 text-sm">{dict.partners.subtitle}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {dict.partners.brands.map((brand: string) => (
                        <div key={brand} className="text-2xl md:text-3xl font-black tracking-tighter text-slate-400 hover:text-white transition-colors cursor-default">
                            {brand.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
