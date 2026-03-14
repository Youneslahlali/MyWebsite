export function SebnFooter({ dict }: { dict: any }) {
    return (
        <footer className="py-12 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-sm text-slate-600 font-medium">
                    {dict.footer.copyright}
                </div>
                <div className="flex gap-8 text-[11px] uppercase tracking-widest font-bold text-[#330066]">
                    <a 
                        href={dict.footer.links.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                    >
                        LinkedIn
                    </a>
                    <a 
                        href={dict.footer.links.parent} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                    >
                        SEBN Global
                    </a>
                    <a href="https://sumitomo-electric.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Sumitomo Group</a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-200 text-center text-xs text-slate-500 uppercase tracking-widest font-medium">
                Sumitomo Electric Bordnetze Morocco - SEBN MA
            </div>
        </footer>
    );
}
