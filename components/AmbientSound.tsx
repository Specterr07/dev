'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'vp:sound';
// Kept low on purpose — it's a bed under everything, not a feature.
const VOLUME = 0.18;
// Long, gentle ramp when it starts; quicker when muted.
const FADE_IN_MS = 2800;
const FADE_OUT_MS = 700;

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number | null>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [on, setOn] = useState(false);

  const fadeTo = useCallback(
    (target: number, ms: number, done?: () => void) => {
      const a = audioRef.current;
      if (!a) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const from = a.volume;
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms);
        // ease-in-out so the start doesn't feel like a linear ramp
        const eased = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        a.volume = from + (target - from) * eased;
        if (k < 1) rafRef.current = requestAnimationFrame(step);
        else {
          rafRef.current = null;
          done?.();
        }
      };
      rafRef.current = requestAnimationFrame(step);
    },
    []
  );

  // init: start silent; show the toggle once the file is confirmed loadable
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    const ok = () => setCanPlay(true);
    const fail = () => setCanPlay(false);
    // metadata resolving means the source is valid & supported; canplay means
    // it's buffered enough to start. Either is enough to reveal the control.
    a.addEventListener('loadedmetadata', ok);
    a.addEventListener('canplay', ok);
    a.addEventListener('error', fail);
    a.load(); // hidden <audio preload> can otherwise sit idle until interaction
    if (a.readyState >= 1) ok();
    return () => {
      a.removeEventListener('loadedmetadata', ok);
      a.removeEventListener('canplay', ok);
      a.removeEventListener('error', fail);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // restore preference; browsers won't autoplay, so if it was "on" we arm
  // playback for the first user gesture anywhere on the page
  useEffect(() => {
    let pref: string | null = null;
    try {
      pref = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private mode */
    }
    if (pref !== 'on') return;
    const start = () => setOn(true);
    const evs = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const;
    evs.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => evs.forEach((e) => window.removeEventListener(e, start));
  }, []);

  // apply on/off
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    if (on) {
      a.play()
        .then(() => fadeTo(VOLUME, FADE_IN_MS))
        .catch(() => setOn(false)); // needs a gesture, or no file
    } else {
      fadeTo(0, FADE_OUT_MS, () => a.pause());
    }
  }, [on, fadeTo]);

  // don't play into a hidden tab
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.hidden) a.pause();
      else if (on) a.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [on]);

  return (
    <>
      {/* metadata-only: the 4 MB file isn't fetched until the visitor actually
          turns sound on */}
      <audio
        ref={audioRef}
        src="/audio/ambience.mp3"
        loop
        preload="metadata"
        hidden
      />
      {/* If you also have an .ogg, use <source> tags instead of the src above. */}

      {canPlay && (
        <button
          type="button"
          className={`sound-toggle${on ? ' sound-toggle--on' : ''}`}
          aria-pressed={on}
          aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
          onClick={() => setOn((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              className="sound-toggle__wave"
              d="M15.5 8.6a4.6 4.6 0 0 1 0 6.8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              className="sound-toggle__wave"
              d="M18.2 6a8.4 8.4 0 0 1 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}
