import React from "react";

export default function Footer() {
    return (
        <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 mt-20 flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="text-slate-500 text-sm font-medium">
                © 2026 Vivek Patel. All rights reserved.
            </div>

            <div className="flex gap-6">
                <a href="https://x.com/_vivek_74" target="_blank" className="text-slate-400 hover:text-orange-600 transition font-medium">Twitter</a>
                <a href="https://github.com/Specterr07" target="_blank" className="text-slate-400 hover:text-orange-600 transition font-medium">GitHub</a>
                <a href="https://www.linkedin.com/in/vivek-patel-v7/" target="_blank" className="text-slate-400 hover:text-orange-600 transition font-medium">LinkedIn</a>
            </div>

        </footer>
    )
}