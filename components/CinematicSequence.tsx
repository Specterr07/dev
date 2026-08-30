'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { FRAMES, frameSrc, frameSrcSet } from '@/lib/stages';
import SlideIndicator from '@/components/SlideIndicator';

// --- tuning knobs ---------------------------------------------------------
const N = FRAMES.length;
const SEG_VH = 0.8; // desktop: scroll budget per stage (× viewport height)
const HOLD = 0.62; // fraction of a segment the stage holds before the blink
const SLIDE_MS = 4800; // mobile autoplay: hold per stage
const BLINK_MS = 420; // mobile autoplay: fade-to-black-and-back
const SWIPE_PX = 45; // mobile: min horizontal drag to change slide
const RESUME_MS = 9000; // mobile: auto-resume autoplay after a manual nav
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

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function CinematicSequence() {
  const [coarse, setCoarse] = useState(false); // touch device -> swipe deck
  const [reduce, setReduce] = useState(false);
  const [index, setIndex] = useState(0);
  const [fill, setFill] = useState(0); // 0..1 progress within the current slide
  const [playing, setPlaying] = useState(true); // mobile autoplay only
  const [blinking, setBlinking] = useState(false); // mobile autoplay only
  const [inView, setInView] = useState(true); // mobile autoplay only

  const wrapRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const blinkTimers = useRef<number[]>([]);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // media queries
  useEffect(() => {
    const mqC = window.matchMedia('(pointer: coarse)');
    const mqR = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setCoarse(mqC.matches);
      setReduce(mqR.matches);
      if (mqR.matches) setPlaying(false);
    };
    sync();
    mqC.addEventListener('change', sync);
    mqR.addEventListener('change', sync);
    return () => {
      mqC.removeEventListener('change', sync);
      mqR.removeEventListener('change', sync);
    };
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

  const setOverlay = (o: number) => {
    if (overlayRef.current) overlayRef.current.style.opacity = String(o);
  };

  // ===== DESKTOP: scroll-to-animate =====================================
  useEffect(() => {
    if (coarse) return;
    setOverlay(0);

    const compute = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = -wrap.getBoundingClientRect().top;
      const p = clamp01(total > 0 ? scrolled / total : 0);
      const t = Math.min(p * N, N - 0.0001);
      const seg = Math.floor(t);
      const frac = t - seg;

      let showIndex: number;
      let f: number;
      let blink: number;
      if (frac < HOLD) {
        showIndex = seg;
        f = frac / HOLD;
        blink = 0;
      } else {
        const b = (frac - HOLD) / (1 - HOLD); // 0..1 across the blink
        if (reduce) {
          showIndex = b < 0.5 ? seg : Math.min(seg + 1, N - 1);
          f = b < 0.5 ? 1 : 0;
          blink = 0;
        } else {
          blink = 1 - Math.abs(b - 0.5) * 2;
          showIndex = b < 0.5 ? seg : Math.min(seg + 1, N - 1);
          f = b < 0.5 ? 1 : 0;
        }
      }

      setOverlay(blink);
      setFill(f);
      if (showIndex !== indexRef.current) {
        indexRef.current = showIndex;
        setIndex(showIndex);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        compute();
      });
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [coarse, reduce]);

  const scrollToSeg = useCallback((i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const top =
      wrap.getBoundingClientRect().top +
      window.scrollY +
      (clamp01((i + 0.3) / N)) * total;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  // ===== MOBILE: auto-playing swipe deck ================================
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
      setOverlay(1);
      blinkTimers.current.push(
        window.setTimeout(() => setIndex(next), BLINK_MS / 2),
        window.setTimeout(() => {
          setBlinking(false);
          setOverlay(0);
        }, BLINK_MS)
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
      if (coarse) {
        pauseThenResume();
        goTo(i);
      } else {
        scrollToSeg(i);
      }
    },
    [coarse, pauseThenResume, goTo, scrollToSeg]
  );

  const onManualStep = useCallback(
    (dir: 1 | -1) => {
      if (coarse) {
        pauseThenResume();
        step(dir);
      } else {
        scrollToSeg(indexRef.current + dir);
      }
    },
    [coarse, pauseThenResume, step, scrollToSeg]
  );

  const togglePlay = useCallback(() => {
    window.clearTimeout(resumeTimer.current);
    setPlaying((p) => !p);
  }, []);

  // mobile autoplay timer
  useEffect(() => {
    if (!coarse || !playing || blinking || !inView || reduce) return;
    const t = window.setTimeout(() => step(1), SLIDE_MS);
    return () => clearTimeout(t);
  }, [coarse, playing, blinking, inView, reduce, index, step]);

  // mobile: pause the timer while the hero is scrolled off-screen
  useEffect(() => {
    if (!coarse) return;
    const el = deckRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.35),
      { threshold: [0, 0.35, 0.7] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [coarse]);

  // ===== shared: keyboard + swipe ======================================
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

  useEffect(() => {
    if (!coarse) return; // swipe is a mobile affordance
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
  }, [coarse, onManualStep]);

  useEffect(
    () => () => {
      clearBlink();
      window.clearTimeout(resumeTimer.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [clearBlink]
  );

  return (
    <div
      ref={wrapRef}
      className="deck-wrap"
      style={
        coarse
          ? undefined
          : { height: `${Math.round(N * SEG_VH * 100)}svh` }
      }
    >
      <section
        ref={deckRef}
        className="deck"
        aria-roledescription="carousel"
        aria-label="Intro"
      >
        {/* single stage image; src swapped mid-blink. .stage-frame in
            globals.css letterboxes on landscape, cover-crops on portrait. */}
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
        <div ref={overlayRef} className="deck__blink" aria-hidden="true" />

        <SlideIndicator
          count={N}
          index={index}
          mode={coarse ? 'auto' : 'scrub'}
          showPlay={coarse}
          playing={playing && inView && !reduce}
          slideMs={SLIDE_MS}
          fill={fill}
          onDot={onDot}
          onTogglePlay={togglePlay}
        />
      </section>
    </div>
  );
}
