import React from "react";

export default function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto px-6 py-10 mt-10 flex flex-col md:flex-row justify-between items-center gap-4"
      style={{ borderTop: '1px solid #21262d' }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', color: 'white' }}
        >
          VP
        </span>
        <span className="text-xs" style={{ color: '#6e7681' }}>
          © 2026 Vivek Patel — Built with React & Tailwind
        </span>
      </div>

      <div className="flex gap-5">
        {[
          { label: 'Twitter', href: 'https://x.com/_vivek_74' },
          { label: 'GitHub', href: 'https://github.com/Specterr07' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vivek-patel-v7/' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium transition-colors duration-200"
            style={{ color: '#6e7681' }}
            onMouseEnter={e => e.target.style.color = '#e6edf3'}
            onMouseLeave={e => e.target.style.color = '#6e7681'}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
