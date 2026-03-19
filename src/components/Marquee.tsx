export function Marquee() {
    return (
        <div className="w-[110vw] bg-[#00e936] border-y-[6px] border-black dark:border-white py-5 overflow-hidden relative z-20 shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_8px_0px_0px_rgba(255,255,255,1)] -ml-[5vw] -rotate-2 my-12 hidden sm:block pointer-events-none">
            <div className="flex animate-[marquee-x_20s_linear_infinite] w-[200%] p-2">
                <div className="flex w-1/2 justify-around items-center shrink-0">
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">CREATIVE DEVELOPER ✦</span>
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">UI DESIGNER ✦</span>
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">FREELANCER ✦</span>
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">FRONTEND ARCHITECT ✦</span>
                </div>
                <div className="flex w-1/2 justify-around items-center shrink-0">
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">CREATIVE DEVELOPER ✦</span>
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">UI DESIGNER ✦</span>
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">FREELANCER ✦</span>
                    <span className="text-black font-black uppercase text-3xl tracking-widest whitespace-nowrap">FRONTEND ARCHITECT ✦</span>
                </div>
            </div>
        </div>
    );
}
