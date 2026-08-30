'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FRAMES, frameSrc, frameSrcSet } from '@/lib/stages';
import SlideIndicator from '@/components/SlideIndicator';

// --- tuning knobs ---------------------------------------------------------
const N = FRAMES.length;
const SLIDE_MS = 4800; // how long each stage holds before auto-advancing
const BLINK_MS = 420; // fade-to-black-and-back on every change
const SWIPE_PX = 45; // min horizontal drag (px) to change slide
const RESUME_MS = 9000; // auto-resume autoplay this long after a manual nav
// -----------------------------------------------------------------------

function preloadAll() {
  const c = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  const light = c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? '');
  (light ? FRAMES.slice(0, 2) : FRAMES).forEach((f) => {
    const im = new Image();
    im.srcset = frameSrcSet(f.id);
    im.src = frameSrc(f.id);
  });
}

export default function CinematicSequence() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [blinking, setBlinking] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduce, setReduce] = useState(false);

  const deckRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const indexRef = useRef(index);
  const blinkTimers = useRef<number[]>([]);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // respect reduced motion: no autoplay, instant cuts
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setReduce(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    preloadAll();
  }, []);

  // swap the single <img> when the slide changes (hidden under the blink)
  useEffect(() => {
    const im = imgRef.current;
    if (!im) return;
    im.srcset = frameSrcSet(FRAMES[index].id);
    im.src = frameSrc(FRAMES[index].id);
    im.alt = FRAMES[index].name;
  }, [index]);

  // don't run the timer while the hero is scrolled off-screen
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.35),
      { threshold: [0, 0.35, 0.7] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const clearBlink = useCallback(() => {
    blinkTimers.current.forEach(clearTimeout);
    blinkTimers.current = [];
  }, []);

  const goTo = useCallback(
    (target: number) => {
      const cur = indexRef.current;
      const next = ((target % N) + N) % N;
      if (next === cur) return;
      clearBlink();
      if (reduce) {
        setIndex(next);
        return;
      }
      setBlinking(true);
      blinkTimers.current.push(
        window.setTimeout(() => setIndex(next), BLINK_MS / 2),
        window.setTimeout(() => setBlinking(false), BLINK_MS)
      );
    },
    [reduce, clearBlink]
  );

  const step = useCallback(
    (dir: 1 | -1) => goTo(indexRef.current + dir),
    [goTo]
  );

  const pauseThenResume = useCallback(() => {
    setPlaying(false);
    window.clearTimeout(resumeTimer.current);
    if (!reduce) {
      resumeTimer.current = window.setTimeout(
        () => setPlaying(true),
        RESUME_MS
      );
    }
  }, [reduce]);

  const onDot = useCallback(
    (i: number) => {
      pauseThenResume();
      goTo(i);
    },
    [pauseThenResume, goTo]
  );

  const onManualStep = useCallback(
    (dir: 1 | -1) => {
      pauseThenResume();
      step(dir);
    },
    [pauseThenResume, step]
  );

  const togglePlay = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    setPlaying((p) => !p);
  }, []);

  // autoplay: one timeout per settled slide
  useEffect(() => {
    if (!playing || blinking || !inView || reduce) return;
    const t = window.setTimeout(() => step(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [playing, blinking, inView, reduce, index, step]);

  // keyboard: Left / Right = prev / next
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.isContentEditable)) return;
      if (e.key === 'ArrowRight') onManualStep(1);
      else if (e.key === 'ArrowLeft') onManualStep(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onManualStep]);

  // pointer swipe (horizontal); vertical passes through to page scroll
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    let sx = 0;
    let sy = 0;
    let tracking = false;
    let horiz = false;

    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      sx = e.clientX;
      sy = e.clientY;
      tracking = true;
      horiz = false;
    };
    const move = (e: PointerEvent) => {
      if (!tracking) return;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (!horiz && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) horiz = true;
    };
    const up = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (horiz && Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
        onManualStep(dx < 0 ? 1 : -1);
      }
    };
    const cancel = () => {
      tracking = false;
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', cancel);
    };
  }, [onManualStep]);

  useEffect(
    () => () => {
      clearBlink();
      window.clearTimeout(resumeTimer.current);
    },
    [clearBlink]
  );

  return (
    <section
      ref={deckRef}
      className="deck"
      aria-roledescription="carousel"
      aria-label="Intro"
    >
      {/* single stage image; src swapped mid-blink. .stage-frame in globals.css
          letterboxes it on landscape, cover-crops on portrait phones. */}
      <img
        ref={imgRef}
        className="stage-frame"
        src={frameSrc(FRAMES[0].id)}
        srcSet={frameSrcSet(FRAMES[0].id)}
        sizes="100vw"
        alt={FRAMES[0].name}
        draggable={false}
        fetchPriority="high"
      />

      <div className="deck__vignette" aria-hidden="true" />
      <div
        className={`deck__blink${blinking ? ' is-on' : ''}`}
        aria-hidden="true"
      />

      <SlideIndicator
        count={N}
        index={index}
        playing={playing && inView && !reduce}
        slideMs={SLIDE_MS}
        onDot={onDot}
        onTogglePlay={togglePlay}
      />
    </section>
  );
}
