'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const VOL_KEY = 'vp:vol';
const DEFAULT_VOL = 0.15; // starts quiet; the visitor takes it from here
const FADE_IN_MS = 2600;

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const started = useRef(false);
  const volRef = useRef(DEFAULT_VOL);

  const [ready, setReady] = useState(false);
  const [vol, setVol] = useState(DEFAULT_VOL);
  const [open, setOpen] = useState(false);
  const [coarse, setCoarse] = useState(false);

  const fadeTo = useCallback((target: number, ms: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = a.volume;
    const t0 = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      a.volume = from + (target - from) * e;
      if (k < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // init: read persisted volume + pointer type, prep the element
  useEffect(() => {
    setCoarse(window.matchMedia('(pointer: coarse)').matches);
    try {
      const v = parseFloat(localStorage.getItem(VOL_KEY) ?? '');
      if (!Number.isNaN(v)) {
        const clamped = Math.min(1, Math.max(0, v));
        setVol(clamped);
        volRef.current = clamped;
      }
    } catch {
      /* private mode */
    }

    const a = audioRef.current;
    if (!a) return;
    a.volume = 0;
    const ok = () => setReady(true);
    a.addEventListener('loadedmetadata', ok);
    a.addEventListener('canplay', ok);
    a.addEventListener('error', () => setReady(false));
    a.load();
    if (a.readyState >= 1) ok();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // browsers block autoplay: start on the first interaction anywhere, then
  // ease up to the visitor's volume.
  useEffect(() => {
    const start = () => {
      if (started.current) return;
      started.current = true;
      const a = audioRef.current;
      if (!a) return;
      a.play()
        .then(() => fadeTo(volRef.current, FADE_IN_MS))
        .catch(() => {
          started.current = false;
        });
    };
    const evs = ['pointerdown', 'keydown', 'touchstart', 'wheel'] as const;
    evs.forEach((e) =>
      window.addEventListener(e, start, { passive: true })
    );
    return () => evs.forEach((e) => window.removeEventListener(e, start));
  }, [fadeTo]);

  // slider changes -> live volume + persist
  useEffect(() => {
    volRef.current = vol;
    try {
      localStorage.setItem(VOL_KEY, String(vol));
    } catch {
      /* ignore */
    }
    if (started.current) fadeTo(vol, 240);
  }, [vol, fadeTo]);

  // pause into a hidden tab
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current;
      if (!a || !started.current) return;
      if (document.hidden) a.pause();
      else a.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // click-away closes the slider (mobile)
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  }, [open]);

  const openNow = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 200);
  };

  const pct = Math.round(vol * 100);
  const muted = vol <= 0.001;

  return (
    <>
      <audio ref={audioRef} src="/audio/ambience.mp3" loop preload="metadata" hidden />

      {ready && (
        <div
          ref={wrapRef}
          className={`sound${open ? ' sound--open' : ''}`}
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
        >
          <button
            type="button"
            className={`sound__btn${muted ? ' is-muted' : ''}`}
            aria-label="Ambient sound volume"
            aria-expanded={open}
            onClick={() => setOpen((o) => (coarse ? !o : true))}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
              {muted ? (
                <path
                  d="M16 9.5l6 5M22 9.5l-6 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path
                    className="sound__wave"
                    d="M15.5 8.6a4.6 4.6 0 0 1 0 6.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    className="sound__wave"
                    d="M18.2 6a8.4 8.4 0 0 1 0 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>

          <div className="sound__slider">
            <input
              type="range"
              min={0}
              max={100}
              value={pct}
              aria-label="Ambient volume"
              onChange={(e) => setVol(Number(e.target.value) / 100)}
              style={{
                background: `linear-gradient(90deg, #fff ${pct}%, rgba(255,255,255,0.22) ${pct}%)`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
