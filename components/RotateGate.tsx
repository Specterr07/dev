'use client';

import { useEffect, useState } from 'react';

// Phones held upright get a "turn your device" screen: the cinematic frames are
// ~2.83:1 and only read properly in landscape. Cleared the moment the device is
// rotated; there's an escape hatch for anyone with rotation locked.
//
// Detection is done from actual dimensions + touch capability (not a single
// media query) so it still works when a mobile browser is in "desktop site"
// mode.
function isPhonePortrait(): boolean {
  if (typeof window === 'undefined') return false;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const portrait = h >= w;
  const touch =
    (navigator.maxTouchPoints ?? 0) > 0 ||
    window.matchMedia('(pointer: coarse)').matches;
  const phoneSized = Math.min(w, h) <= 820; // shortest side of a phone
  return portrait && touch && phoneSized;
}

export default function RotateGate() {
  const [portrait, setPortrait] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const check = () => {
      const p = isPhonePortrait();
      setPortrait(p);
      if (!p) setSkipped(false); // re-arm once we're back to landscape
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  const active = portrait && !skipped;

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="rotate-gate"
      role="dialog"
      aria-modal="true"
      aria-label="Rotate your device to landscape"
    >
      <div className="rotate-gate__phone" aria-hidden="true">
        <span />
      </div>
      <p className="rotate-gate__hint">Turn your device</p>
      <p className="rotate-gate__sub">This portfolio is made for landscape</p>
      <p className="rotate-gate__note">
        For the best experience, open it on a desktop
      </p>
      <button
        type="button"
        className="rotate-gate__skip"
        onClick={() => setSkipped(true)}
      >
        View in portrait anyway
      </button>
    </div>
  );
}
