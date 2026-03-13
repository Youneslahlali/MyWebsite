import { MapPin } from "lucide-react";

export function SebnLocations({ dict }: { dict: any }) {
    return (
        <section id="locations" className="py-20 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Addresses */}
                <div className="space-y-12">
                    <h2 className="text-3xl font-bold text-[#330066] border-b-2 border-[#330066] pb-2 inline-block">
                        Tanger et Salé
                    </h2>
                    
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">SE Sumitomo Electric S.A. (AWSM)</h3>
                            <div className="flex gap-2 text-sm text-slate-600">
                                <MapPin size={16} className="text-[#330066] mt-1 shrink-0" />
                                <p>Zone Franche Tanger, Lot 32, MA 90 000</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">SE Bordnetze Salé S.A.R.L. (SEBN MA)</h3>
                            <div className="flex gap-2 text-sm text-slate-600">
                                <MapPin size={16} className="text-[#330066] mt-1 shrink-0" />
                                <p>Zone d&apos;accélération industrielle, Lot 20, MA-Sale 11052, Salé</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Map Illustration */}
                <div className="relative flex justify-center">
                    <img 
                        src="https://www.worldatlas.com/upload/61/89/3f/ma-01.png" 
                        alt="Morocco Map" 
                        className="max-h-[400px] grayscale opacity-40"
                    />
                    {/* Markers */}
                    <div className="absolute top-[10%] left-[45%] group">
                        <div className="w-3 h-3 bg-[#330066] rounded-full animate-ping absolute" />
                        <div className="w-3 h-3 bg-[#330066] rounded-full relative" />
                        <span className="absolute left-4 top-0 bg-white px-2 py-1 shadow-md text-[10px] font-bold text-[#330066] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Tanger (AWSM)</span>
                    </div>
                    <div className="absolute top-[28%] left-[42%] group">
                        <div className="w-3 h-3 bg-[#330066] rounded-full animate-ping absolute" />
                        <div className="w-3 h-3 bg-[#330066] rounded-full relative" />
                        <span className="absolute left-4 top-0 bg-white px-2 py-1 shadow-md text-[10px] font-bold text-[#330066] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Salé (SEBN)</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
