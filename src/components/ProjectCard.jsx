import React from "react";

const tagColors = [
  { bg: 'rgba(88, 166, 255, 0.1)', border: 'rgba(88, 166, 255, 0.3)', color: '#58a6ff' },
  { bg: 'rgba(188, 140, 255, 0.1)', border: 'rgba(188, 140, 255, 0.3)', color: '#bc8cff' },
  { bg: 'rgba(63, 185, 80, 0.1)', border: 'rgba(63, 185, 80, 0.3)', color: '#3fb950' },
  { bg: 'rgba(247, 129, 102, 0.1)', border: 'rgba(247, 129, 102, 0.3)', color: '#f78166' },
  { bg: 'rgba(255, 213, 100, 0.1)', border: 'rgba(255, 213, 100, 0.3)', color: '#ffd564' },
];

export default function ProjectCard({ emoji, title, description, tags }) {
  return (
    <div
      className="card-hover rounded-xl p-6 flex flex-col group"
      style={{
        backgroundColor: '#161b22',
        border: '1px solid #30363d',
      }}
    >
      <div
        className="h-36 rounded-lg mb-5 flex items-center justify-center text-5xl relative overflow-hidden"
        style={{ backgroundColor: '#0d1117', border: '1px solid #21262d' }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle at center, rgba(88,166,255,0.06) 0%, transparent 70%)' }}
        />
        {emoji}
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-base group-hover:transition-colors duration-200" style={{ color: '#58a6ff' }}>
          {title}
        </h3>
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#58a6ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#8b949e' }}>
        {description}
      </p>

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => {
          const c = tagColors[index % tagColors.length];
          return (
            <span
              key={index}
              className="tag-pill"
              style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.color }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
