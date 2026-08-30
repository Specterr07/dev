'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/pengepengepopular/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vivek-patel-v7/' },
  { label: 'Mail', href: 'mailto:patelvivek.v7@gmail.com' },
];

export default function SiteNav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // solidify once you've scrolled off the hero toward the footer
      setSolid(window.scrollY > window.innerHeight * 0.5);
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
      <a href="#top" className="nav__brand" onClick={toTop}>
        <span className="nav__mark" aria-hidden="true">
          ▲
        </span>
        <span>Vivek Patel</span>
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
