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
      <div className="text-center mb-14">
        <div className="section-label mx-auto mb-4">Work</div>
        <h2 className="text-3xl font-bold mb-3" style={{ color: '#e6edf3' }}>Featured Projects</h2>
        <p className="text-sm" style={{ color: '#8b949e' }}>A selection of things I've built.</p>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #21262d' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          {projects.map((project, index) => {
            const isLastRow = index >= 3;
            const isRightEdge = (index + 1) % 3 === 0;
            return (
              <div
                key={index}
                className="group p-8 transition-all duration-300 cursor-default"
                style={{
                  borderRight: !isRightEdge && index < projects.length - 1 ? '1px solid #21262d' : 'none',
                  borderBottom: !isLastRow ? '1px solid #21262d' : 'none',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#161b22'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div className="mb-6">
                  <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: '#6e7681' }}>
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold mb-1 transition-colors duration-200" style={{ color: '#e6edf3' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#8b949e' }}>{project.subtitle}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: '#21262d',
                        color: '#8b949e',
                        border: '1px solid #30363d',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://github.com/Specterr07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
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
    </section>
  );
}
