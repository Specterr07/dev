import React from "react";

export default function Hero() {
  return (
    <main id="about" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">

      <div className="hero-glow" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-24 flex flex-col items-center">

        <div className="section-label mb-8">
          <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
          Available for opportunities
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-none">
          <span className="gradient-text">Building digital</span>
          <br />
          <span style={{ color: '#e6edf3' }}>experiences.</span>
        </h1>

        <p className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed" style={{ color: '#8b949e' }}>
          Hey, I'm <span style={{ color: '#e6edf3', fontWeight: 600 }}>Vivek Patel</span> — a software developer based in{' '}
          <span style={{ color: '#e6edf3', fontWeight: 600 }}>Mumbai</span>. I build practical tools
          and dive deep into architecture and systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <a
            href="#projects"
            className="glow-green px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
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
            className="px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center gap-2"
            style={{ backgroundColor: 'transparent', color: '#e6edf3', border: '1px solid #30363d' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b949e'; e.currentTarget.style.backgroundColor = '#161b22'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/>
            </svg>
            Connect on LinkedIn
          </a>
        </div>

        <div
          className="float-anim w-full max-w-2xl rounded-xl overflow-hidden text-left"
          style={{
            backgroundColor: '#161b22',
            border: '1px solid #30363d',
            boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
          }}
        >
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid #21262d', backgroundColor: '#0d1117' }}>
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
            <span className="ml-2 text-xs" style={{ color: '#6e7681' }}>portfolio.js</span>
          </div>
          <pre className="p-6 font-mono text-sm leading-7 overflow-x-auto" style={{ color: '#e6edf3' }}>
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

        <div className="flex items-center gap-8 mt-16" style={{ color: '#6e7681' }}>
          {[
            { num: '2+', label: 'Years Coding' },
            { num: '∞', label: 'Lines of Code' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#e6edf3' }}>{num}</div>
              <div className="text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
