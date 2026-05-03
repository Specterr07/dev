import React from "react";

const projects = [
  {
    category: 'IoT · Messaging',
    title: 'Butler',
    subtitle: 'Hotel Messaging System',
    tags: ['Flask', 'ESP32', 'Telegram API'],
  },
  {
    category: 'Networking · Tools',
    title: 'Clipboard',
    subtitle: 'Local Network Clipboard',
    tags: ['Node.js', 'Express.js', 'REST API'],
  },
  {
    category: 'Computer Vision',
    title: 'GestureCtrl',
    subtitle: 'Gesture Control System',
    tags: ['Python', 'OpenCV', 'MediaPipe'],
  },
  {
    category: 'IoT · Music',
    title: 'SpotifyHW',
    subtitle: 'Hardware Spotify Control',
    tags: ['Flask', 'ESP32', 'Spotify API'],
  },
  {
    category: 'Web · React',
    title: 'Portfolio',
    subtitle: 'This website',
    tags: ['React', 'Tailwind v4', 'CI/CD'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <div className="px-0">
        <div className="section-divider mb-20" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="section-label mb-4">Work</div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#e6edf3', letterSpacing: '-0.02em' }}>Featured Projects</h2>
          <p className="text-sm" style={{ color: '#6e7681' }}>A selection of things I've built.</p>
        </div>
        <a
          href="https://github.com/Specterr07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap"
          style={{ color: '#58a6ff' }}
          onMouseEnter={e => e.currentTarget.style.color = '#79c0ff'}
          onMouseLeave={e => e.currentTarget.style.color = '#58a6ff'}
        >
          View all on GitHub
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #21262d' }}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {projects.map((project, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            const totalRows = Math.ceil(projects.length / 3);
            const isLastRow = row === totalRows - 1;
            const isRightCol = col === 2;

            return (
              <div
                key={index}
                className="group p-8 transition-all duration-300 cursor-default relative overflow-hidden"
                style={{
                  borderRight: !isRightCol ? '1px solid #21262d' : 'none',
                  borderBottom: !isLastRow ? '1px solid #21262d' : 'none',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d1117'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, #388bfd 50%, transparent)' }}
                />

                <div className="mb-5">
                  <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#484f58' }}>
                    {project.category}
                  </p>
                  <h3
                    className="text-xl font-bold mb-1 transition-colors duration-200 group-hover:text-blue-400"
                    style={{ color: '#e6edf3', letterSpacing: '-0.01em' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#8b949e' }}>{project.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium transition-colors duration-200"
                      style={{ backgroundColor: '#161b22', color: '#8b949e', border: '1px solid #30363d' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow hint */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#388bfd' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            );
          })}

          {/* 6th fill cell */}
          <div
            className="group p-8 flex flex-col items-start justify-center cursor-pointer transition-all duration-300"
            style={{ backgroundColor: 'transparent', borderTop: '0' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0d1117'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            onClick={() => window.open('https://github.com/Specterr07', '_blank')}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#484f58' }}>More</p>
            <p className="text-base font-semibold mb-1 transition-colors duration-200 group-hover:text-blue-400" style={{ color: '#6e7681' }}>
              See all projects
            </p>
            <p className="text-sm" style={{ color: '#484f58' }}>github.com/Specterr07</p>
            <div className="mt-4 opacity-40 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#8b949e' }}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
