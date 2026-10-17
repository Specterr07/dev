'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vivek-patel-v7/' },
  { label: 'GitHub', href: 'https://github.com/Specterr07' },
  { label: 'Mail', href: 'mailto:patelvivek.v7@gmail.com' },
];

export default function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // solidify once the hero has been scrolled through
      setSolid(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // close the expanded contacts on Escape / click-away
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`nav${solid ? ' nav--solid' : ''}`}>
      <a href="#top" className="nav__brand" onClick={toTop} aria-label="Vivek Patel, back to top">
        {/* outline of the glasses Vivek wears — traces in on load */}
        <svg viewBox="0 0 64 26" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="glasses__frame" pathLength={1} strokeWidth={1.8} d="M4.5 5.5C4.5 3.8 5.5 3 7.5 3H26C28 3 29 4 29 6V12C29 19 25.5 23 18.5 23H14.5C8.5 23 4.5 19 4.5 13Z" />
          <path className="glasses__frame" pathLength={1} strokeWidth={1.8} d="M59.5 5.5C59.5 3.8 58.5 3 56.5 3H38C36 3 35 4 35 6V12C35 19 38.5 23 45.5 23H49.5C55.5 23 59.5 19 59.5 13Z" />
          <path className="glasses__frame" pathLength={1} strokeWidth={2.2} d="M29 4.6H35M4.5 4.6L1.2 3.8M59.5 4.6L62.8 3.8" />
          <path className="glasses__glare" strokeWidth={1.2} d="M10 17L19 8M42 17L51 8" />
        </svg>
      </a>

      <div
        ref={contactRef}
        className={`nav__contact${open ? ' nav__contact--open' : ''}`}
      >
        {/* the three options unfurl leftward, inline in the bar */}
        <div className="nav__socials" aria-hidden={!open}>
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav__social"
              tabIndex={open ? 0 : -1}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="nav__contact-toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__caret" aria-hidden="true">
            ‹
          </span>
          <span>Contact</span>
        </button>
      </div>

    </header>
  );
}
