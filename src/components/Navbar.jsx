import React from 'react';

export default function Navbar () {
    return (
        <nav className="max-w-6xl mx-auto p-6 flex items-center justify-between">

            <a href="#" className="text-2xl font-bold flex items-center gap-2 ">
                <span className="text-orange-600">⚡</span> 
                Vivek <span className="hidden sm:inline">Patel</span>
            </a>

            <div className="flex gap-6 font-medium text-slate-600">
                <a href="#projects" className="hover:text-orange-600 transition">Projects</a>
                <a href="#about" className="hover:text-orange-600 transition">About</a>
                <a href="#contact" className="hover:text-orange-600 transition">Contact</a>
            </div>

        </nav>
    );
};

