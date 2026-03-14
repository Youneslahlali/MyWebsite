import { MapPin } from "lucide-react";

export function SebnLocations({ dict }: { dict: any }) {
    return (
        <section id="locations" className="py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Addresses */}
                <div className="space-y-12">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-2 block">Nos Implantations</span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#330066] tracking-tight">
                        Tanger et Salé
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#330066]/30 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#330066] transition-colors">SE Sumitomo Electric S.A. (AWSM)</h3>
                            <div className="flex gap-3 text-base text-slate-600">
                                <div className="p-2 rounded-full bg-slate-50 group-hover:bg-[#330066]/10 transition-colors">
                                    <MapPin size={20} className="text-[#330066] shrink-0" />
                                </div>
                                <p className="mt-1">Zone Franche Tanger, Lot 32, MA 90 000</p>
                            </div>
                        </div>

                        <div className="group p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#330066]/30 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#330066] transition-colors">SE Bordnetze Salé S.A.R.L. (SEBN MA)</h3>
                            <div className="flex gap-3 text-base text-slate-600">
                                <div className="p-2 rounded-full bg-slate-50 group-hover:bg-[#330066]/10 transition-colors">
                                    <MapPin size={20} className="text-[#330066] shrink-0" />
                                </div>
                                <p className="mt-1">Zone d&apos;accélération industrielle, Lot 20, MA-Sale 11052, Salé</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Map Illustration */}
                <div className="relative flex justify-center py-10">
                    <div className="absolute inset-0 bg-gradient-radial from-[#330066]/5 to-transparent blur-3xl rounded-full" />
                    <img 
                        src="https://www.worldatlas.com/upload/61/89/3f/ma-01.png" 
                        alt="Morocco Map" 
                        loading="lazy"
                        decoding="async"
                        className="max-h-[500px] grayscale opacity-30 w-auto h-auto mix-blend-multiply relative z-10 hover:opacity-40 transition-opacity duration-700"
                    />
                    {/* Markers */}
                    <div className="absolute top-[15%] left-[45%] group cursor-pointer z-20">
                        <div className="w-4 h-4 bg-[#330066] rounded-full animate-ping absolute" />
                        <div className="w-4 h-4 bg-[#330066] rounded-full relative shadow-[0_0_15px_rgba(51,0,102,0.5)]" />
                        <span className="absolute left-6 top-0 bg-white border border-slate-200 px-3 py-1.5 shadow-xl text-[11px] font-bold text-[#330066] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity rounded-md">Tanger (AWSM)</span>
                    </div>
                    <div className="absolute top-[32%] left-[42%] group cursor-pointer z-20">
                        <div className="w-4 h-4 bg-[#330066] rounded-full animate-ping absolute" />
                        <div className="w-4 h-4 bg-[#330066] rounded-full relative shadow-[0_0_15px_rgba(51,0,102,0.5)]" />
                        <span className="absolute left-6 top-0 bg-white border border-slate-200 px-3 py-1.5 shadow-xl text-[11px] font-bold text-[#330066] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity rounded-md">Salé (SEBN)</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
