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

export default function Projects () {
    return (
        <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900">Featured Projects</h2>
                <p className="text-slate-600 mt-2">A selection of things I've built.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    );
};