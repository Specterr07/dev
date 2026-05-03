import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    emoji: "🛎️",
    title: "Butler: Messaging System",
    description: "IoT hotel automation system integrating ESP32 and Telegram. Sends automated service requests (cleaning, food) to staff and displays live status updates on a local LCD.",
    tags: ["Flask", "ESP32 / IoT", "Telegram API"]
  },
  {
    emoji: "📋",
    title: "Local Network Clipboard",
    description: "A lightweight web application to share text and files seamlessly between devices on a local network. Features a REST API for low-latency communication.",
    tags: ["Node.js", "Express.js", "REST API"]
  },
  {
    emoji: "✋",
    title: "Gesture Control System",
    description: "Real-time hand gesture recognition system using OpenCV. Enables hands-free desktop controls with high-accuracy detection and an intuitive calibration GUI.",
    tags: ["Python", "OpenCV", "MediaPipe"]
  },
  {
    emoji: "🎵",
    title: "Things of Spotify",
    description: "IoT backend using Flask to control Spotify playback via external hardware. Parses serial data to trigger play/pause commands with less than 200ms latency.",
    tags: ["Flask", "IoT / ESP32", "Spotify API"]
  },
  {
    emoji: "⚡",
    title: "Portfolio Website",
    description: "The site you are looking at right now. Built with React and Tailwind CSS v4 for maximum performance and deployed via GitHub Pages.",
    tags: ["React", "Tailwind v4", "CI/CD"]
  }
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="section-label mb-4">Work</div>
          <h2 className="text-3xl font-bold" style={{ color: '#e6edf3' }}>Featured Projects</h2>
          <p className="mt-2 text-sm" style={{ color: '#8b949e' }}>A selection of things I've built.</p>
        </div>
        <a
          href="https://github.com/Specterr07"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm font-medium transition-colors duration-200"
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
