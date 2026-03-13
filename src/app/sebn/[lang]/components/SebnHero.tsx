export function SebnHero({ dict }: { dict: any }) {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-950 z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center grayscale opacity-30" />
                
                {/* Animated Lines (representing wiring) */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute top-1/4 left-0 w-full h-[1px] bg-blue-500 animate-pulse" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/50" />
                    <div className="absolute top-3/4 left-0 w-full h-[1px] bg-blue-500 animate-pulse delay-75" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
                        Sumitomo Electric Group
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        {dict.hero.title}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
                        {dict.hero.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                            {dict.hero.cta}
                        </button>
                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all">
                            {dict.navigation.about}
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
                        <div>
                            <div className="text-2xl font-bold text-blue-500">{dict.stats.employees.split(' ')[0]}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">{dict.stats.employees.split(' ')[1]}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-500">{dict.stats.years.split(' ')[0]}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Experience</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-blue-500">VW/Audi</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Premium Partners</div>
                        </div>
                    </div>
                </div>

                <div className="relative group hidden lg:block">
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700" />
                    <img 
                        src="/sebn-hero.png" 
                        alt="Wiring Harness Tech"
                        className="relative rounded-2xl border border-white/10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </div>
        </section>
    );
}
