export function SebnAbout({ dict }: { dict: any }) {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Text Side */}
                <div className="lg:col-span-8 space-y-8">
                    <h2 className="text-3xl font-bold text-[#330066] border-b-2 border-[#330066] pb-2 inline-block">
                        SEBN au Maroc
                    </h2>
                    <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
                        <p>{dict.about.content}</p>
                        <p>Nous sommes spécialisés dans la production de systèmes de câblage électrique pour les véhicules à moteur à combustion ainsi que les véhicules à propulsion électrique, y compris les faisceaux à haute tension.</p>
                        <h3 className="text-lg font-bold text-[#330066] mt-6">Un succès grâce à une vision claire</h3>
                        <p>Notre succès repose sur une stratégie d&apos;entreprise dynamique ainsi que sur une politique de capital humain forte qui privilégie des valeurs telles que la responsabilité, le respect, la confiance et la coopération. SEBN-MA renforce sa position d&apos;acteur majeur dans le secteur de l&apos;automobile au Maroc.</p>
                    </div>
                </div>

                {/* Info Boxes Side */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="bg-[#330066] p-8 text-center text-white flex flex-col items-center justify-center">
                        <div className="w-10 h-10 mb-2 border-2 border-white flex items-center justify-center">
                            <i className="lucide-building-2" />
                        </div>
                        <div className="text-3xl font-bold">2001</div>
                        <div className="text-xs uppercase tracking-widest opacity-70">Fondation</div>
                    </div>
                    <div className="bg-[#330066] p-8 text-center text-white flex flex-col items-center justify-center">
                        <div className="w-10 h-10 mb-2 border-2 border-white flex items-center justify-center">
                            <i className="lucide-factory" />
                        </div>
                        <div className="text-3xl font-bold">2022</div>
                        <div className="text-xs uppercase tracking-widest opacity-70">Site Salé</div>
                    </div>
                    <div className="bg-[#330066] p-8 text-center text-white flex flex-col items-center justify-center">
                        <div className="w-10 h-10 mb-2 border-2 border-white flex items-center justify-center text-xl">
                            🤝
                        </div>
                        <div className="text-3xl font-bold">+10K</div>
                        <div className="text-xs uppercase tracking-widest opacity-70">Employés</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
