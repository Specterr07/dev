'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProfessionalStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in the bio
      gsap.from('.story-bio', {
        scrollTrigger: {
          trigger: '.story-bio',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      });

      // Fade in each story item as they scroll into view
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="story-section" ref={containerRef}>
      <p className="story-bio">
        A Software Developer who genuinely loves building things from full-stack
        web apps to self-hosted infrastructure and hardware connected side projects.
        I enjoy the entire lifecycle of a build: designing the system, shipping
        it, and then figuring out how to deploy and run it myself.
      </p>

      <div className="story-grid">
        {/* Item 1: MS Cube Systems */}
        <div
          className="story-item story-item--left"
          ref={(el) => { itemsRef.current[0] = el; }}
        >
          <div className="story-date">May 2026 – Aug 2026</div>
          <h3 className="story-title">Software Developer</h3>
          <div className="story-subtitle">MS Cube Systems · Mumbai, Maharashtra</div>
          <p className="story-desc">
            Design, develop, and maintain high-quality, scalable software solutions
            aligned with project requirements. Architect scalable full-stack web
            applications, selecting and implementing optimal client-server communication
            protocols (WebSockets, Server-Sent Events, Long Polling) tailored to
            real-time data delivery requirements. Enforce code quality, maintainability,
            and scalable architectural patterns through rigorous code reviews and
            cross-functional technical collaboration.
          </p>
        </div>

        {/* Item 2: Immich (Project) */}
        <div
          className="story-item story-item--right"
          ref={(el) => { itemsRef.current[1] = el; }}
        >
          <div className="story-date">Selected Work</div>
          <h3 className="story-title">Self-Hosted Photo Backup Server (Immich)</h3>
          <p className="story-desc">
            A private photo backup service self-hosted on Oracle Cloud's Always
            Free ARM tier as a cost-free alternative to paid iCloud storage.
          </p>
          <p className="story-desc" style={{ marginTop: '1rem' }}>
            <strong style={{ color: '#fff', letterSpacing: '0.1em' }}>My contribution:</strong> Self-hosted Immich, deployed and orchestrated the application stack with Docker Compose, reserved a static public IP, configured a DuckDNS subdomain with a Caddy reverse proxy to serve the app over HTTPS, and set up the mobile app for end-to-end photo sync.
          </p>
          <p className="story-desc" style={{ marginTop: '1rem' }}>
            <strong style={{ color: '#fff', letterSpacing: '0.1em' }}>The outcome:</strong> A cost-free alternative to paid iCloud storage with a stable, persistent endpoint and HTTPS photo syncing.
          </p>
          <div className="story-tags">
            <span className="story-tag">Docker</span>
            <span className="story-tag">Docker Compose</span>
            <span className="story-tag">Oracle Cloud</span>
            <span className="story-tag">Caddy</span>
            <span className="story-tag">DuckDNS</span>
          </div>
        </div>

        {/* Item 3: Brand World */}
        <div
          className="story-item story-item--left"
          ref={(el) => { itemsRef.current[2] = el; }}
        >
          <div className="story-date">Feb 2026 – May 2026</div>
          <h3 className="story-title">Executive: Software Developer</h3>
          <div className="story-subtitle">Brand World · Mumbai, Maharashtra</div>
          <p className="story-desc">
            Developed scalable full-stack architectures using React.js, utilizing State
            Management for complex UI logic and parsing JSON payloads to ensure
            seamless Node.js/Express integration. Engineered robust frontend
            architectures in React, utilizing Context API, Redux, and React Query
            for efficient global state management, asynchronous data fetching, and
            cache invalidation. Leveraged AI-augmented coding workflows to accelerate
            feature implementation, reducing boilerplate coding time by ~40%.
          </p>
        </div>

        {/* Item 4: Sheev (Project) */}
        <div
          className="story-item story-item--right"
          ref={(el) => { itemsRef.current[3] = el; }}
        >
          <div className="story-date">Selected Work</div>
          <h3 className="story-title">Sheev: Multi-Channel Personal Assistant</h3>
          <p className="story-desc">
            A multi-channel personal assistant that takes input from 3 channels
            (Apple Watch Shortcut, Telegram bot and a React/TypeScript web app)
            into one Flask backend with 14 REST API endpoints, documented in an OpenAPI 3 spec.
          </p>
          <p className="story-desc" style={{ marginTop: '1rem' }}>
            <strong style={{ color: '#fff', letterSpacing: '0.1em' }}>My contribution:</strong> Designed the assistant, built an AI voice-notes pipeline using OpenAI's Whisper model (large-v3-turbo via Groq), compressed audio with ffmpeg, configured S3-compatible storage behind 1-hour presigned URLs, made the Telegram integration production-safe with secret-token webhook verification, idempotent handling of retried updates and single-use pairing codes, and shipped it with a multi-stage Docker build on Fly.io and a GitHub Actions pipeline.
          </p>
          <p className="story-desc" style={{ marginTop: '1rem' }}>
            <strong style={{ color: '#fff', letterSpacing: '0.1em' }}>The outcome:</strong> A GitHub Actions pipeline that runs 76 automated tests, including contract tests for the Apple Watch API, and deploys only when they pass.
          </p>
          <div className="story-tags">
            <span className="story-tag">Python</span>
            <span className="story-tag">Flask</span>
            <span className="story-tag">React</span>
            <span className="story-tag">TypeScript</span>
            <span className="story-tag">Whisper (Groq)</span>
            <span className="story-tag">Telegram Bot API</span>
            <span className="story-tag">Docker</span>
          </div>
        </div>

        {/* Item 5: Asynk */}
        <div
          className="story-item story-item--left"
          ref={(el) => { itemsRef.current[4] = el; }}
        >
          <div className="story-date">Oct 2025 – Feb 2026</div>
          <h3 className="story-title">Full Stack Web Developer Intern</h3>
          <div className="story-subtitle">Asynk</div>
          <p className="story-desc">
            Solidified foundational expertise in the MERN stack by developing and
            integrating React frontends with Node.js/Express backends, utilizing
            MongoDB for data modeling and AWS for cloud deployment.
          </p>
        </div>
      </div>
    </section>
  );
}
