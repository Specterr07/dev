import React from "react";

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #21262d', backgroundColor: '#010409' }}>
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: '1px solid #30363d' }}
          >
            <img src="/vivek-face.png" alt="Vivek" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#e6edf3' }}>Vivek Patel</p>
            <p className="text-xs" style={{ color: '#6e7681' }}>Software Developer · Mumbai</p>
          </div>
        </div>

        <p
          className="text-sm font-medium text-center"
          style={{ color: '#8b949e' }}
        >
          Thank you for visiting 🙏
        </p>

        <p className="text-xs" style={{ color: '#6e7681' }}>
          © 2026 Vivek Patel
        </p>
      </div>
    </footer>
  );
}
