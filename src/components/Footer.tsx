import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-zinc-500 text-sm flex items-center justify-center gap-1.5">
                    Made with <Heart size={14} className="text-red-500 fill-red-500" /> by
                    Younes Lahlali
                </p>
                <p className="text-zinc-600 text-xs mt-2">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </p>
            </div>
        </footer>
    );
}
