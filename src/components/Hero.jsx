import React from "react";

const floatingEmojis = [
  { emoji: '🚀', top: '-52px', left: '18%', delay: '0s',   duration: '3.8s', size: '2rem' },
  { emoji: '💻', top: '-70px', left: '44%', delay: '0.6s', duration: '4.4s', size: '2.4rem' },
  { emoji: '⚡', top: '-44px', left: '72%', delay: '1.2s', duration: '3.5s', size: '1.8rem' },
];

export default function Hero() {
  return (
    <main
      id="about"
      className="relative flex flex-col items-center overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="hero-glow" />

      {/* Text content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-36 pb-14 flex flex-col items-center">
        <div className="section-label mb-8">
          <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
          Available for opportunities
        </div>

        <h1
          className="font-bold tracking-tight mb-5 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#ffffff' }}
        >
          Building digital<br />experiences.
        </h1>

        <p
          className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: '#8b949e' }}
        >
          Hey, I'm <span style={{ color: '#e6edf3', fontWeight: 600 }}>Vivek Patel</span> — a software developer based in{' '}
          <span style={{ color: '#e6edf3', fontWeight: 600 }}>Mumbai</span>. I build practical tools
          and dive deep into architecture and systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="glow-green px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{ backgroundColor: '#238636', color: '#ffffff', border: '1px solid #2ea043' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ea043'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#238636'; }}
          >
            View my work
          </a>
          <a
            href="https://www.linkedin.com/in/vivek-patel-v7/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2"
            style={{ backgroundColor: 'transparent', color: '#e6edf3', border: '1px solid #30363d' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b949e'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
            Connect on LinkedIn
          </a>
        </div>
      </div>

      {/* Screen + floating emojis */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-0">

        {/* Floating emojis above screen */}
        <div className="relative h-20">
          {floatingEmojis.map(({ emoji, top, left, delay, duration, size }) => (
            <span
              key={emoji}
              style={{
                position: 'absolute',
                top,
                left,
                fontSize: size,
                animationName: 'floatEmoji',
                animationDuration: duration,
                animationDelay: delay,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                filter: 'drop-shadow(0 4px 16px rgba(124,58,237,0.35))',
                zIndex: 20,
              }}
            >
              {emoji}
            </span>
          ))}

          {/* Glow behind emojis */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '120px',
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.28) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Screen frame */}
        <div
          style={{
            borderRadius: '16px 16px 0 0',
            border: '1px solid rgba(255,255,255,0.12)',
            borderBottom: 'none',
            background: 'linear-gradient(180deg, rgba(22,27,34,0.95) 0%, rgba(13,17,23,0.98) 100%)',
            boxShadow: '0 -8px 60px rgba(124,58,237,0.12), 0 0 0 1px rgba(255,255,255,0.04) inset',
            overflow: 'hidden',
          }}
        >
          {/* Screen titlebar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(13,17,23,0.6)' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56', opacity: 0.8 }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e', opacity: 0.8 }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f', opacity: 0.8 }} />
            <span className="ml-2 text-xs" style={{ color: 'rgba(139,148,158,0.7)' }}>portfolio.js</span>
          </div>

          {/* Code content */}
          <pre
            className="px-8 py-7 font-mono text-sm leading-7 overflow-x-auto"
            style={{ color: '#e6edf3', margin: 0 }}
          >
            <code>
              <span style={{ color: '#ff7b72' }}>const</span>{' '}
              <span style={{ color: '#79c0ff' }}>vivek</span>{' '}
              <span style={{ color: '#ff7b72' }}>=</span>{' '}{'{\n'}
              {'  '}<span style={{ color: '#79c0ff' }}>name</span>:{' '}
              <span style={{ color: '#a5d6ff' }}>"Vivek Patel"</span>,{'\n'}
              {'  '}<span style={{ color: '#79c0ff' }}>role</span>:{' '}
              <span style={{ color: '#a5d6ff' }}>"Software Developer"</span>,{'\n'}
              {'  '}<span style={{ color: '#79c0ff' }}>location</span>:{' '}
              <span style={{ color: '#a5d6ff' }}>"Mumbai, India"</span>,{'\n'}
              {'  '}<span style={{ color: '#79c0ff' }}>skills</span>:{' '}[
              <span style={{ color: '#a5d6ff' }}>"React"</span>,{' '}
              <span style={{ color: '#a5d6ff' }}>"Node.js"</span>,{' '}
              <span style={{ color: '#a5d6ff' }}>"Python"</span>],{'\n'}
              {'  '}<span style={{ color: '#79c0ff' }}>available</span>:{' '}
              <span style={{ color: '#56d364' }}>true</span>,{'\n'}
              {'}'}
              <span className="cursor-blink" style={{ color: '#58a6ff' }}>|</span>
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
}
