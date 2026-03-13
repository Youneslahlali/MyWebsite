export function SebnAbout({ dict }: { dict: any }) {
    return (
        <section id="about" className="py-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
                    <img 
                        src="https://images.unsplash.com/photo-1565608411388-e932463e6962?auto=format&fit=crop&q=80&w=1000" 
                        alt="Factory Production" 
                        className="rounded-2xl border border-white/10 shadow-xl"
                    />
                    <div className="absolute -bottom-6 -right-6 p-6 bg-blue-600 rounded-2xl shadow-xl hidden md:block">
                        <div className="text-3xl font-bold text-white">20+</div>
                        <div className="text-sm text-blue-100">Years of Excellence</div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold">{dict.about.title}</h2>
                    <p className="text-slate-400 text-lg leading-relaxed italic border-l-4 border-blue-600 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-6">
                        {dict.about.content}
                    </p>
                    <div className="pt-8">
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="w-12 h-[1px] bg-blue-500" />
                            <span className="uppercase tracking-widest text-xs font-bold">Sumitomo Electric Bordnetze</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
