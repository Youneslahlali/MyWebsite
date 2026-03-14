import { Building2, Factory, Users } from "lucide-react";

export function SebnAbout({ dict }: { dict: any }) {
    return (
        <section id="about" className="py-32 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Text Side */}
                <div className="lg:col-span-8 space-y-8">
                    <h2 className="text-3xl font-bold text-[#330066] border-b-2 border-[#330066] pb-2 inline-block">
                        SEBN au Maroc
                    </h2>
                    <div className="space-y-4 text-slate-700 leading-relaxed text-base">
                        <p>{dict.about.content}</p>
                        <p>Nous sommes spécialisés dans la production de systèmes de câblage électrique pour les véhicules à moteur à combustion ainsi que les véhicules à propulsion électrique, y compris les faisceaux à haute tension.</p>
                        <h3 className="text-xl font-bold text-[#330066] mt-8 mb-4">Un succès grâce à une vision claire</h3>
                        <p>Notre succès repose sur une stratégie d&apos;entreprise dynamique ainsi que sur une politique de capital humain forte qui privilégie des valeurs telles que la responsabilité, le respect, la confiance et la coopération. SEBN-MA renforce sa position d&apos;acteur majeur dans le secteur de l&apos;automobile au Maroc.</p>
                    </div>
                </div>

                {/* Info Boxes Side */}
                <div className="lg:col-span-4 flex flex-col gap-6 mt-8 lg:mt-0">
                    <div className="group relative overflow-hidden bg-white p-8 border border-slate-200 rounded-3xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#330066]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-2xl bg-[#330066]/5 text-[#330066] group-hover:bg-[#330066] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                                <Building2 size={26} strokeWidth={1.5} />
                            </div>
                            <div className="text-4xl font-black text-slate-900 tracking-tight mb-2">2001</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Fondation</div>
                        </div>
                    </div>
                    
                    <div className="group relative overflow-hidden bg-white p-8 border border-slate-200 rounded-3xl text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#330066]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-2xl bg-[#330066]/5 text-[#330066] group-hover:bg-[#330066] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                                <Factory size={26} strokeWidth={1.5} />
                            </div>
                            <div className="text-4xl font-black text-slate-900 tracking-tight mb-2">2022</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Site Salé</div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-[#330066] p-8 border border-[#330066] rounded-3xl text-center shadow-[0_8px_30px_rgb(51,0,102,0.2)] hover:shadow-[0_15px_40px_rgb(51,0,102,0.4)] transition-all duration-500 hover:-translate-y-1">
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md">
                                <Users size={26} strokeWidth={1.5} />
                            </div>
                            <div className="text-4xl font-black text-white tracking-tight mb-2">+10K</div>
                            <div className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Employés</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
