import { ArrowUpRight } from "lucide-react";

export function SebnCareers({ dict }: { dict: any }) {
    return (
        <section id="careers" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Démarrez maintenant demain !</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#330066]">
                    La prochaine étape de votre carrière : SEBN-MA !
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-sm">
                    Rejoignez plus de 10 000 professionnels façonnant l'avenir de l'industrie automobile. Nous collaborons avec les universités locales pour développer les talents de demain.
                </p>
                <div className="flex justify-center">
                    <button className="px-10 py-3 bg-[#330066] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#452b86] transition-all shadow-lg active:scale-95">
                        Postulez !
                    </button>
                </div>
                <div className="pt-8 text-[11px] uppercase tracking-widest text-[#330066] font-bold">
                    Carrières chez SEBN-MA Maroc
                </div>
            </div>
        </section>
    );
}
