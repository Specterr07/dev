import React from "react";

export default function Features() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-8 rounded-2xl bg-orange-50 border border-orange-100 hover:shadow-lg transition">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-xl mb-2 text-slate-900">High Performance</h3>
                <p className="text-slate-600">
                    I write code that runs fast. Optimizing for the edge and low-latency environments.
                </p>
                </div>

                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="font-bold text-xl mb-2 text-slate-900">Modern Stack</h3>
                <p className="text-slate-600">
                    Specialized in React, Tailwind, and Node.js. Building scalable full-stack apps.
                </p>
                </div>

                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition">
                <div className="text-4xl mb-4">📐</div>
                <h3 className="font-bold text-xl mb-2 text-slate-900">Clean Architecture</h3>
                <p className="text-slate-600">
                    It's not just about "working" code. It's about maintainable, clean, and solid code.
                </p>
                </div>
            </div>
        </section>
    );
};