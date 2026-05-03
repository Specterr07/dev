import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <div className="section-label mx-auto mb-4">Contact</div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#e6edf3' }}>Let's build something</h2>
        <p className="text-sm leading-relaxed" style={{ color: '#8b949e' }}>
          I'm currently open to full-time opportunities and freelance work. Let's connect.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-10">
        <a
          href="https://www.linkedin.com/in/vivek-patel-v7/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
          style={{ backgroundColor: 'rgba(10, 102, 194, 0.15)', border: '1px solid rgba(10, 102, 194, 0.4)', color: '#58a6ff' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(10, 102, 194, 0.15)'; }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.542V1.729C24 .774 23.2 0 22.225 0z"/>
          </svg>
          LinkedIn
        </a>

        <a
          href="Vivek_Patel_Software_Developer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
          style={{ backgroundColor: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b949e'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#30363d'; }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Resume
        </a>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-grow h-px" style={{ backgroundColor: '#21262d' }} />
        <span className="text-xs font-medium tracking-widest" style={{ color: '#6e7681' }}>OR SEND A MESSAGE</span>
        <div className="flex-grow h-px" style={{ backgroundColor: '#21262d' }} />
      </div>

      <form action="https://formspree.io/f/xwvpoveq" method="POST" className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: '#8b949e' }}>Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                color: '#e6edf3',
              }}
              onFocus={e => { e.target.style.borderColor = '#58a6ff'; e.target.style.boxShadow = '0 0 0 3px rgba(88,166,255,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#30363d'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: '#8b949e' }}>Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                color: '#e6edf3',
              }}
              onFocus={e => { e.target.style.borderColor = '#58a6ff'; e.target.style.boxShadow = '0 0 0 3px rgba(88,166,255,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#30363d'; e.target.style.boxShadow = 'none'; }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium" style={{ color: '#8b949e' }}>Message</label>
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Tell me about your project..."
            className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none"
            style={{
              backgroundColor: '#0d1117',
              border: '1px solid #30363d',
              color: '#e6edf3',
            }}
            onFocus={e => { e.target.style.borderColor = '#58a6ff'; e.target.style.boxShadow = '0 0 0 3px rgba(88,166,255,0.1)'; }}
            onBlur={e => { e.target.style.borderColor = '#30363d'; e.target.style.boxShadow = 'none'; }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-200"
          style={{ backgroundColor: '#238636', color: '#ffffff', border: '1px solid #2ea043' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#2ea043'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#238636'; }}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
