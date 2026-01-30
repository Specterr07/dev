import React from "react";

export default function ProjectCard ({ emoji, title, description, tags }) {
    return (
        <div className="group border border-slate-200 rounded-2xl p-6 hover:border-orange-500 transition duration-300">
            <div className="h-48 bg-slate-50 rounded-xl mb-6 overflow-hidden relative border border-slate-100">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-mono text-4xl">
                {emoji}
                </div>
            </div>
        
            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition">
                {title}
            </h3>
            <p className="text-slate-600 mb-4 line-clamp-3">
                {description}
            </p>
        
            <div className="flex gap-2 flex-wrap">
                {tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                    {tag}
                </span>
                ))}
            </div>
        </div>
    );
};