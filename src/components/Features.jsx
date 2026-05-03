import React, { useState } from "react";

const tabs = [
  {
    id: 'code',
    label: 'Code',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    project: 'Local Network Clipboard',
    description: 'A lightweight web app to share text and files between devices on a local network — built with a low-latency REST API and a clean browser interface.',
    tags: ['Node.js', 'Express.js', 'REST API'],
    preview: [
      { color: '#ff7b72', text: 'POST' },
      { color: '#56d364', text: '/api/clipboard' },
      { color: '#8b949e', text: '→ Share instantly across devices' },
    ],
  },
  {
    id: 'plan',
    label: 'Plan',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    project: 'Butler: Messaging System',
    description: 'IoT hotel automation system — planned around an ESP32 + Telegram integration that sends automated service requests and displays live status on a local LCD.',
    tags: ['Flask', 'ESP32 / IoT', 'Telegram API'],
    preview: [
      { color: '#bc8cff', text: 'TRIGGER' },
      { color: '#79c0ff', text: 'room.request("cleaning")' },
      { color: '#8b949e', text: '→ Staff notified via Telegram' },
    ],
  },
  {
    id: 'collaborate',
    label: 'Collaborate',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    project: 'Things of Spotify',
    description: 'IoT backend that lets external hardware control Spotify playback. Serial data is parsed and routed to Spotify API commands with sub-200ms latency.',
    tags: ['Flask', 'IoT / ESP32', 'Spotify API'],
    preview: [
      { color: '#56d364', text: 'SERIAL' },
      { color: '#a5d6ff', text: 'spotify.play()' },
      { color: '#8b949e', text: '→ Playback triggered in <200ms' },
    ],
  },
  {
    id: 'automate',
    label: 'Automate',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    project: 'Gesture Control System',
    description: 'Real-time hand gesture recognition using OpenCV and MediaPipe. Enables hands-free desktop controls with high-accuracy detection and a calibration GUI.',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
    preview: [
      { color: '#ffd564', text: 'DETECT' },
      { color: '#79c0ff', text: 'gesture.recognize(frame)' },
      { color: '#8b949e', text: '→ Desktop action executed' },
    ],
  },
  {
    id: 'secure',
    label: 'Secure',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    project: 'Portfolio Website',
    description: 'This very site — built with React and Tailwind CSS v4. Deployed via GitHub Pages with CI/CD, zero backend, and near-instant load times.',
    tags: ['React', 'Tailwind v4', 'CI/CD'],
    preview: [
      { color: '#3fb950', text: 'BUILD' },
      { color: '#a5d6ff', text: 'vite build --mode production' },
      { color: '#8b949e', text: '→ Deployed to GitHub Pages' },
    ],
  },
];

export default function Features() {
  const [active, setActive] = useState('code');
  const current = tabs.find(t => t.id === active);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">Projects</div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#e6edf3' }}>What I've built</h2>
        <p className="text-sm" style={{ color: '#8b949e' }}>Explore my work by category.</p>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid #30363d', backgroundColor: '#0d1117' }}
      >
        <div
          className="flex items-center gap-1 px-4 py-3 overflow-x-auto"
          style={{ borderBottom: '1px solid #21262d', backgroundColor: '#161b22' }}
        >
          <div className="flex gap-1.5 mr-4 flex-shrink-0">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f' }} />
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{
                backgroundColor: active === tab.id ? '#0d1117' : 'transparent',
                color: active === tab.id ? '#e6edf3' : '#8b949e',
                border: active === tab.id ? '1px solid #30363d' : '1px solid transparent',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-10 flex flex-col justify-center" style={{ borderRight: '1px solid #21262d' }}>
            <div className="flex gap-2 flex-wrap mb-6">
              {current.tags.map((tag, i) => {
                const colors = [
                  { bg: 'rgba(88,166,255,0.1)', border: 'rgba(88,166,255,0.3)', color: '#58a6ff' },
                  { bg: 'rgba(188,140,255,0.1)', border: 'rgba(188,140,255,0.3)', color: '#bc8cff' },
                  { bg: 'rgba(63,185,80,0.1)', border: 'rgba(63,185,80,0.3)', color: '#3fb950' },
                ];
                const c = colors[i % colors.length];
                return (
                  <span key={tag} className="tag-pill" style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.color }}>
                    {tag}
                  </span>
                );
              })}
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#e6edf3' }}>{current.project}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>{current.description}</p>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center" style={{ backgroundColor: '#0a0d12' }}>
            <div
              className="rounded-lg p-5 font-mono text-sm leading-8"
              style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}
            >
              {current.preview.map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-widest" style={{ color: line.color, minWidth: '60px' }}>{line.text}</span>
                  {i === 1 && <span style={{ color: '#e6edf3' }}>{line.text}</span>}
                  {i !== 1 && <span style={{ color: line.color }}>{line.text}</span>}
                </div>
              ))}
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid #21262d' }}>
                <span style={{ color: '#6e7681' }} className="text-xs">// {current.preview[2].text.replace('→ ', '')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
