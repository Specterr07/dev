import React from "react";

const floatingEmojis = [
  { emoji: '🚀', top: '-56px', left: '16%',  delay: '0s',   duration: '3.8s', size: '2rem'   },
  { emoji: '🔮', top: '-72px', left: '46%',  delay: '0.7s', duration: '4.5s', size: '2.2rem' },
  { emoji: '⚡', top: '-48px', left: '74%',  delay: '1.3s', duration: '3.4s', size: '1.8rem' },
];

export default function Hero() {
  return (
    <main id="about" className="relative flex flex-col items-center overflow-hidden" style={{ minHeight: '100vh' }}>

      <div className="hero-glow" />

      {/* Text block */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 pt-40 pb-12 flex flex-col items-center">

        <h1
          className="font-bold tracking-tight mb-5 leading-tight fade-in"
          style={{ fontSize: 'clamp(2.1rem, 5.5vw, 3.4rem)', color: '#ffffff', letterSpacing: '-0.02em' }}
        >
          Building digital<br />experiences.
        </h1>

        <p
          className="text-base md:text-lg max-w-xl mb-10 leading-relaxed fade-in fade-in-delay-1"
          style={{ color: '#8b949e' }}
        >
          Hey, I'm <span style={{ color: '#e6edf3', fontWeight: 600 }}>Vivek Patel</span> — a software developer based in{' '}
          <span style={{ color: '#e6edf3', fontWeight: 600 }}>Mumbai</span>. I build practical tools
          and dive deep into architecture and systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 fade-in fade-in-delay-2">
          <a
            href="#projects"
            className="glow-green px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
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
            className="px-7 py-3 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2 justify-center"
            style={{ backgroundColor: 'transparent', color: '#e6edf3', border: '1px solid #30363d' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b949e'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
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
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">

        {/* Emoji row */}
        <div className="relative h-24">
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
                filter: 'drop-shadow(0 6px 18px rgba(124,58,237,0.4))',
                zIndex: 20,
              }}
            >
              {emoji}
            </span>
          ))}
          {/* Bloom behind emojis */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '320px',
            height: '130px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Glass screen frame */}
        <div style={{
          borderRadius: '14px 14px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          background: 'linear-gradient(180deg, rgba(22,27,34,0.96) 0%, rgba(13,17,23,0.99) 100%)',
          boxShadow: '0 -12px 70px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}>
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,13,18,0.5)' }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56', opacity: 0.85 }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e', opacity: 0.85 }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f', opacity: 0.85 }} />
            <span className="ml-3 text-xs font-mono" style={{ color: 'rgba(110,118,129,0.8)' }}>portfolio.js</span>
          </div>

          {/* Code */}
          <pre className="px-8 py-7 font-mono text-sm leading-7 overflow-x-auto" style={{ color: '#e6edf3', margin: 0 }}>
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
              {'  '}<span style={{ color: '#79c0ff' }}>skills</span>:{' '}[{' '}
              <span style={{ color: '#a5d6ff' }}>"React"</span>,{' '}
              <span style={{ color: '#a5d6ff' }}>"Node.js"</span>,{' '}
              <span style={{ color: '#a5d6ff' }}>"Python"</span>{' '}],{'\n'}
              {'  '}<span style={{ color: '#79c0ff' }}>available</span>:{' '}
              <span style={{ color: '#56d364' }}>true</span>,{'\n'}
              {'}'}
              <span className="cursor-blink" style={{ color: '#58a6ff' }}>|</span>
            </code>
          </pre>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-hint flex flex-col items-center gap-1">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#484f58' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </main>
  );
}
