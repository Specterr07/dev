import React, { useState, useEffect, useRef } from "react";

const tabs = [
  {
    id: 'code',
    label: 'Code',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    heading: 'Writing code that works — and lasts.',
    description: 'I write clean, efficient code across the full stack. From low-level IoT firmware to high-level web interfaces, I focus on logic that is readable, testable, and fast.',
    bullets: ['React, Node.js, Python, Flask', 'REST APIs & real-time data flows', 'Optimized for performance and edge'],
    snippet: [
      { tokens: [{ c: '#ff7b72', t: 'function' }, { c: '#e6edf3', t: ' buildSomething(' }, { c: '#79c0ff', t: 'idea' }, { c: '#e6edf3', t: ') {' }] },
      { tokens: [{ c: '#8b949e', t: '  // plan → code → ship' }] },
      { tokens: [{ c: '#ff7b72', t: '  const' }, { c: '#e6edf3', t: ' result = ' }, { c: '#79c0ff', t: 'idea' }, { c: '#e6edf3', t: '.execute();' }] },
      { tokens: [{ c: '#ff7b72', t: '  return' }, { c: '#56d364', t: ' result' }, { c: '#e6edf3', t: ';' }] },
      { tokens: [{ c: '#e6edf3', t: '}' }] },
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
    heading: 'Architecture first, implementation second.',
    description: 'Good software starts before a single line is written. I map data flows, define boundaries, and think through edge cases — so the build phase is smooth and the result is solid.',
    bullets: ['System design & data modelling', 'API contract definition', 'Dependency mapping & scoping'],
    snippet: [
      { tokens: [{ c: '#8b949e', t: '# System design checklist' }] },
      { tokens: [{ c: '#56d364', t: '✓' }, { c: '#e6edf3', t: ' Define data models' }] },
      { tokens: [{ c: '#56d364', t: '✓' }, { c: '#e6edf3', t: ' Map API contracts' }] },
      { tokens: [{ c: '#56d364', t: '✓' }, { c: '#e6edf3', t: ' Identify failure points' }] },
      { tokens: [{ c: '#ffd564', t: '→' }, { c: '#e6edf3', t: ' Now write the code' }] },
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
    heading: 'Code is better when built together.',
    description: 'I thrive in team environments — writing clear commit messages, documenting decisions, and building APIs that other developers can confidently consume without reading the source.',
    bullets: ['Git workflow & clean commit history', 'Readable code & inline docs', 'API design for other developers'],
    snippet: [
      { tokens: [{ c: '#bc8cff', t: 'git' }, { c: '#e6edf3', t: ' commit -m ' }, { c: '#a5d6ff', t: '"feat: add clipboard sync"' }] },
      { tokens: [{ c: '#bc8cff', t: 'git' }, { c: '#e6edf3', t: ' push origin ' }, { c: '#79c0ff', t: 'main' }] },
      { tokens: [{ c: '#8b949e', t: '# PR opened → reviewed → merged' }] },
      { tokens: [{ c: '#56d364', t: '✓' }, { c: '#e6edf3', t: ' CI passed · 2 approvals' }] },
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
    heading: 'If it runs twice, automate it.',
    description: "I build automation pipelines, IoT triggers, and CI/CD workflows that cut repetitive work. Whether it's hardware serial events or GitHub Actions, I wire things so they run themselves.",
    bullets: ['CI/CD pipelines & GitHub Actions', 'IoT event-driven triggers', 'Background job scheduling'],
    snippet: [
      { tokens: [{ c: '#8b949e', t: '# .github/workflows/deploy.yml' }] },
      { tokens: [{ c: '#ff7b72', t: 'on' }, { c: '#e6edf3', t: ': [' }, { c: '#a5d6ff', t: '"push"' }, { c: '#e6edf3', t: ']' }] },
      { tokens: [{ c: '#ff7b72', t: 'jobs' }, { c: '#e6edf3', t: ':' }] },
      { tokens: [{ c: '#e6edf3', t: '  deploy:' }] },
      { tokens: [{ c: '#e6edf3', t: '    runs-on: ' }, { c: '#a5d6ff', t: 'ubuntu-latest' }] },
      { tokens: [{ c: '#56d364', t: '    # → build, test, ship 🚀' }] },
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
    heading: 'Security baked in, not bolted on.',
    description: "I validate inputs, sanitize data, manage secrets properly, and think adversarially from the start. Security isn't a final checklist — it's a mindset applied at every layer.",
    bullets: ['Input validation & sanitization', 'Secrets management & env hygiene', 'Minimal attack surface by design'],
    snippet: [
      { tokens: [{ c: '#8b949e', t: '# Never trust input' }] },
      { tokens: [{ c: '#ff7b72', t: 'if not' }, { c: '#e6edf3', t: ' validate(data):' }] },
      { tokens: [{ c: '#ff7b72', t: '    raise' }, { c: '#f78166', t: ' ValueError' }, { c: '#e6edf3', t: '(...)' }] },
      { tokens: [{ c: '#8b949e', t: '' }] },
      { tokens: [{ c: '#8b949e', t: '# Secrets live in env, not code' }] },
      { tokens: [{ c: '#56d364', t: 'key' }, { c: '#e6edf3', t: ' = os.environ[' }, { c: '#a5d6ff', t: '"API_KEY"' }, { c: '#e6edf3', t: ']' }] },
    ],
  },
];

export default function Features() {
  const [active, setActive] = useState('code');
  const [contentKey, setContentKey] = useState(0);
  const current = tabs.find(t => t.id === active);

  function switchTab(id) {
    setActive(id);
    setContentKey(k => k + 1);
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="px-6">
        <div className="section-divider" />
      </div>

      <div className="text-center mt-20 mb-12">
        <div className="section-label mx-auto mb-4">How I work</div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#e6edf3', letterSpacing: '-0.02em' }}>My approach</h2>
        <p className="text-sm" style={{ color: '#6e7681' }}>The principles behind everything I build.</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #21262d' }}>

        {/* Tab bar */}
        <div
          className="flex items-center gap-1 px-4 py-2 overflow-x-auto"
          style={{ borderBottom: '1px solid #21262d', backgroundColor: '#161b22' }}
        >
          <div className="flex gap-1.5 mr-4 flex-shrink-0 py-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f' }} />
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className="relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all duration-200 flex-shrink-0"
              style={{
                color: active === tab.id ? '#e6edf3' : '#6e7681',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tab.icon}
              {tab.label}
              {/* Active underline */}
              {active === tab.id && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '8px',
                    right: '8px',
                    height: '2px',
                    borderRadius: '2px 2px 0 0',
                    backgroundColor: '#f78166',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content with fade transition */}
        <div key={contentKey} className="tab-content grid md:grid-cols-2" style={{ minHeight: '280px' }}>

          {/* Left: description */}
          <div className="p-8 md:p-10 flex flex-col justify-center" style={{ borderRight: '1px solid #21262d' }}>
            <h3 className="text-xl font-semibold mb-4 leading-snug" style={{ color: '#e6edf3', letterSpacing: '-0.01em' }}>
              {current.heading}
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8b949e' }}>
              {current.description}
            </p>
            <ul className="space-y-2.5">
              {current.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm" style={{ color: '#8b949e' }}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style={{ backgroundColor: 'rgba(63,185,80,0.12)', color: '#3fb950' }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: code */}
          <div className="p-8 md:p-10 flex flex-col justify-center" style={{ backgroundColor: 'rgba(10,13,18,0.5)' }}>
            <div className="rounded-lg p-5 font-mono text-sm leading-8" style={{ backgroundColor: '#161b22', border: '1px solid #21262d' }}>
              {current.snippet.map((line, i) => (
                <div key={i}>
                  {line.tokens.map((tok, j) => (
                    <span key={j} style={{ color: tok.c }}>{tok.t}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
