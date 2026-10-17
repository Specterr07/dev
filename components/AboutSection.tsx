'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VoiceNote from '@/components/VoiceNote';

// Google Docs, so the resumes stay current whenever they're edited.
// Both docs must be shared as "Anyone with the link: Viewer".
const RESUMES = [
  {
    name: 'Frontend',
    meta: 'react · next.js · react native',
    href: 'https://docs.google.com/document/d/1nvy0rS18mge6-sDyVwGDvYvfSGULP7Ha5IAmTkDnRv8/view',
  },
  {
    name: 'Full-stack',
    meta: 'mern · docker · ci/cd',
    href: 'https://docs.google.com/document/d/1cmbfsnNkiaZUKv4jy_zNQe3KUJzWz-QNqmA_YEPGtNA/view',
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" ref={ref} aria-labelledby="about-heading">
      <p className="about__kicker about-reveal" id="about-heading">&gt; cat about.txt</p>
      <p className="about__bio about-reveal">
        A Software Developer who genuinely loves building things from full-stack
        web apps to self-hosted infrastructure and hardware connected side projects.
        I enjoy the entire lifecycle of a build: designing the system, shipping
        it, and then figuring out how to deploy and run it myself.
      </p>

      <div className="about-reveal">
        <VoiceNote />
      </div>

      <p className="about__kicker about__kicker--resumes about-reveal">&gt; ls ./resumes</p>
      <div className="resumes about-reveal">
        {RESUMES.map((r) => (
          <a key={r.name} className="resume" href={r.href} target="_blank" rel="noreferrer">
            <span className="resume__tag">resume</span>
            <span className="resume__name">{r.name}</span>
            <span className="resume__meta">{r.meta}</span>
            <svg className="resume__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7H17V15" />
            </svg>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </section>
  );
}
