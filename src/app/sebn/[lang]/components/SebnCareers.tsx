import { ArrowUpRight } from "lucide-react";

export function SebnCareers({ dict }: { dict: any }) {
    return (
        <section id="careers" className="py-32 bg-white px-6">
            <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-[#330066] text-white shadow-2xl">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 py-24 px-8 md:px-20 text-center flex flex-col items-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] uppercase tracking-[0.3em] font-bold text-white/90 mb-8 backdrop-blur-sm">
                        Démarrez maintenant demain !
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight max-w-3xl">
                        La prochaine étape de votre carrière : SEBN-MA !
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                        Rejoignez plus de 10 000 professionnels façonnant l'avenir de l'industrie automobile. Nous collaborons avec les universités locales pour développer les talents de demain.
                    </p>
                    <button className="group relative inline-flex items-center justify-center px-10 py-4 bg-white text-[#330066] font-bold text-sm uppercase tracking-widest overflow-hidden rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95">
                        <span className="relative z-10 flex items-center gap-2">
                            Postulez !
                            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                    </button>
                    <div className="mt-12 text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold opacity-80 backdrop-blur-sm">
                        Carrières chez SEBN-MA Maroc
                    </div>
                </div>
            </div>
        </section>
    );
}
