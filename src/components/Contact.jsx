import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="mb-10">
        <div className="section-label mx-auto mb-4">Contact</div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#e6edf3' }}>Let's build something</h2>
        <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>
          Have a project in mind or want to talk engineering? Reach out — I'm always up for a good conversation.
        </p>
      </div>

      <a
        href="https://www.linkedin.com/in/vivek-patel-v7/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-semibold text-sm transition-all duration-200"
        style={{
          backgroundColor: 'rgba(10, 102, 194, 0.15)',
          border: '1px solid rgba(10, 102, 194, 0.5)',
          color: '#58a6ff',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.28)';
          e.currentTarget.style.borderColor = '#58a6ff';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(88,166,255,0.15)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.5)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/>
        </svg>
        Connect on LinkedIn
      </a>
    </section>
  );
}
