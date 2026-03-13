export function SebnFooter({ dict }: { dict: any }) {
    return (
        <footer className="py-12 border-t border-white/5 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">S</div>
                    <span className="font-bold text-lg tracking-tighter">SEBN-MA</span>
                </div>
                <div className="text-slate-500 text-sm text-center">
                    {dict.footer.copyright}
                </div>
                <div className="flex gap-6 text-sm text-slate-400">
                    <a 
                        href={dict.footer.links.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-blue-500 transition-colors flex items-center gap-1"
                    >
                        LinkedIn
                    </a>
                    <a 
                        href={dict.footer.links.parent} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-blue-500 transition-colors"
                    >
                        SEBN Global
                    </a>
                    <a href="https://sumitomoelectric.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Sumitomo</a>
                </div>
            </div>
        </footer>
    );
}
