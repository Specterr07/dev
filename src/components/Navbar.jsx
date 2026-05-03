import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        backgroundColor: scrolled ? 'rgba(13, 17, 23, 0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid #21262d' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-lg" style={{ color: '#e6edf3' }}>
          <div
            className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0"
            style={{ background: '#161b22', border: '1px solid #30363d' }}
          >
            <img src="/vivek-face.png" alt="Vivek" className="w-full h-full object-cover" />
          </div>
          <span>Vivek<span className="hidden sm:inline" style={{ color: '#8b949e' }}>.dev</span></span>
        </a>

        <div className="flex items-center gap-1">
          {['Projects', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{ color: '#8b949e' }}
              onMouseEnter={e => { e.target.style.color = '#e6edf3'; e.target.style.backgroundColor = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.target.style.color = '#8b949e'; e.target.style.backgroundColor = 'transparent'; }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://github.com/Specterr07"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ backgroundColor: '#21262d', color: '#e6edf3', border: '1px solid #30363d' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#8b949e'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
