import { MapPin } from "lucide-react";

export function SebnLocations({ dict }: { dict: any }) {
    return (
        <section id="locations" className="py-24 bg-slate-900/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{dict.locations.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl bg-slate-950 border border-white/5 flex items-start gap-6 hover:border-blue-500/30 transition-all">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{dict.locations.tangier.name}</h3>
                            <p className="text-slate-200 text-sm font-medium mb-1">{dict.locations.tangier.specialty}</p>
                            <p className="text-slate-500 text-xs">{dict.locations.tangier.address}</p>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-slate-950 border border-white/5 flex items-start gap-6 hover:border-blue-500/30 transition-all">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">{dict.locations.sale.name}</h3>
                            <p className="text-slate-200 text-sm font-medium mb-1">{dict.locations.sale.specialty}</p>
                            <p className="text-slate-500 text-xs">{dict.locations.sale.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
