import Image from "next/image";

export function SebnHero({ dict }: { dict: any }) {
    return (
        <section className="relative min-h-[600px] lg:min-h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-[#330066]">
            {/* High-quality corporate background image */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/sebn_hero_bg_1773415538150.png" 
                    alt="SEBN Manufacturing Facility" 
                    fill
                    priority
                    className="object-cover opacity-60 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#330066]/80 via-[#330066]/50 to-white" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex justify-center">
                {/* Glassmorphic content card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 md:p-16 rounded-3xl shadow-2xl text-center text-white max-w-3xl transform translate-y-8 animate-fade-in-up">
                    <nav className="mb-6 text-sm font-bold opacity-90 tracking-widest uppercase">
                        <span className="hover:text-amber-400 transition-colors cursor-pointer">Accueil</span> <span className="mx-2">/</span> <span>SEBN MA</span>
                    </nav>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        {dict.hero?.title || "SEBN MA"}
                    </h1>
                    <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed max-w-2xl mx-auto mb-10">
                        {dict.hero?.subtitle || "Global leader in automotive wiring harness systems, driving innovation from the heart of Morocco."}
                    </p>
                    <button className="px-8 py-4 bg-white text-[#330066] font-bold uppercase tracking-widest rounded-full hover:bg-slate-100 hover:scale-105 transition-all shadow-xl active:scale-95">
                        {dict.hero?.cta || "Explore Solutions"}
                    </button>
                </div>
            </div>
            
            {/* Bottom transition gradient to match the next section */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-10" />
        </section>
    );
}
