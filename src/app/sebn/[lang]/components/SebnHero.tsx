export function SebnHero({ dict }: { dict: any }) {
    return (
        <section className="relative h-[400px] flex flex-col justify-center items-center overflow-hidden bg-[#330066]">
            {/* Background Pattern - Simplified World Map approximation */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-map.png')] bg-center bg-repeat" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
                <nav className="mb-4 text-xs opacity-70">
                    <span className="hover:underline cursor-pointer">Accueil</span> / <span>SEBN MA</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    SEBN MA
                </h1>
            </div>
            
            {/* White overlay at the bottom for transition */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
