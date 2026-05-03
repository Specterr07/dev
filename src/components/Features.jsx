import React from "react";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: '#f78166',
    bg: 'rgba(247, 129, 102, 0.1)',
    border: 'rgba(247, 129, 102, 0.2)',
    title: 'High Performance',
    description: 'I write code that runs fast — optimizing for the edge, low-latency environments, and efficient data flow.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: '#58a6ff',
    bg: 'rgba(88, 166, 255, 0.1)',
    border: 'rgba(88, 166, 255, 0.2)',
    title: 'Modern Stack',
    description: 'Specialized in React, Tailwind, Node.js, and Python. Building scalable full-stack apps end to end.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: '#3fb950',
    bg: 'rgba(63, 185, 80, 0.1)',
    border: 'rgba(63, 185, 80, 0.2)',
    title: 'Clean Architecture',
    description: "It's not just about working code — it's about maintainable, clean, and solid systems that stand the test of time.",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">What I bring</div>
        <h2 className="text-3xl font-bold" style={{ color: '#e6edf3' }}>Built for quality</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {features.map(({ icon, color, bg, border, title, description }) => (
          <div
            key={title}
            className="card-hover rounded-xl p-6 group"
            style={{
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
              style={{ backgroundColor: bg, border: `1px solid ${border}`, color }}
            >
              {icon}
            </div>
            <h3 className="font-semibold text-lg mb-3" style={{ color: '#e6edf3' }}>{title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
