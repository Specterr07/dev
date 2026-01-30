import React from "react";

export default function Hero () {
    return (
        <main id="about" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
                Building digital experiences. <br />
                <span className="text-orange-600">Namastee,</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-lg">
                I am Vivek. A software developer based in Mumbai. I build practical tools and dive deep into architecture.
                </p>
                
                <div className="flex gap-4 pt-4">
                <a href="#projects" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition">
                    My Work
                </a>
                <a href="https://github.com/Specterr07" target="_blank" rel="noopener noreferrer" className="bg-slate-100 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition">
                    GitHub
                </a>
                </div>
            </div>

            {/* Hero Code Block */}
            <div className="bg-slate-900 rounded-xl shadow-2xl p-6 -rotate-1 hover:rotate-0 transition duration-500 border border-slate-800">
                <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <pre className="font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto">
                <code>
                    <span className="text-purple-400">const</span> portfolio = {'{'}
                    {'\n'}  name: <span className="text-green-400">'Vivek Patel'</span>,
                    {'\n'}  role: <span className="text-green-400">'Developer'</span>,
                    {'\n'}  location: <span className="text-green-400">'Mumbai'</span>,
                    {'\n'}  
                    {'\n'}  <span className="text-blue-400">buildAwesomeThings</span>: <span className="text-purple-400">function</span>() {'{'}
                    {'\n'}    <span className="text-purple-400">return</span> <span className="text-green-400">true</span>;
                    {'\n'}  {'}'}
                    {'\n'}{'};'}
                </code>
                </pre>
            </div>
        </main>
    );
};