import React from "react";

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Specterr07',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/_vivek_74',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="section-divider mb-20" />

      <div className="mb-10">
        <div className="section-label mx-auto mb-4">Contact</div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#e6edf3', letterSpacing: '-0.02em' }}>Let's build something</h2>
        <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>
          Have a project in mind or want to talk engineering?<br />Reach out — I'm always up for a good conversation.
        </p>
      </div>

      {/* LinkedIn primary CTA */}
      <a
        href="https://www.linkedin.com/in/vivek-patel-v7/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 px-10 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 mb-8"
        style={{
          backgroundColor: 'rgba(10, 102, 194, 0.12)',
          border: '1px solid rgba(10, 102, 194, 0.4)',
          color: '#58a6ff',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.22)';
          e.currentTarget.style.borderColor = 'rgba(88,166,255,0.6)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(88,166,255,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.4)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
        Connect on LinkedIn
      </a>

      {/* Secondary social links */}
      <div className="flex items-center justify-center gap-3">
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#8b949e' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b949e'; e.currentTarget.style.color = '#e6edf3'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; e.currentTarget.style.color = '#8b949e'; }}
          >
            {icon}
          </a>
        ))}
      </div>
    </section>
  );
}
