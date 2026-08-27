'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRAMES, frameSrc, frameSrcSet } from '@/lib/stages';

// --- tuning knobs ---------------------------------------------------------
// Scroll distance budgeted to each stage, as a multiple of the viewport
// height. Bigger = more scrolling between blinks. Mobile gets a shorter budget
// so the whole sequence isn't an endless thumb-swipe.
const SEGMENT_FACTOR_DESKTOP = 0.85;
const SEGMENT_FACTOR_MOBILE = 0.55;
// Fraction of a segment the stage sits still before the blink starts; the rest
// is the fade-to-black-and-back.
const HOLD = 0.6;
// -----------------------------------------------------------------------

const BLINK = 1 - HOLD;
const LAST = FRAMES.length - 1;
// The frame swap happens here inside each segment — mid-blink, screen fully
// black — so you never see a hard cut, only the blink.
const SWAP_OFFSET = HOLD + BLINK / 2;

const segmentFactor = () =>
  window.matchMedia('(pointer: coarse), (max-width: 768px)').matches
    ? SEGMENT_FACTOR_MOBILE
    : SEGMENT_FACTOR_DESKTOP;

function preloadFrame(i: number) {
  if (i < 0 || i > LAST) return;
  const im = new Image();
  im.srcset = frameSrcSet(FRAMES[i].id);
  im.src = frameSrc(FRAMES[i].id);
}

// Warm the browser cache so every blink can swap to an already-decoded frame.
// Skipped on Save-Data / 2G — those fall back to just-in-time next-frame
// preloading in showFrame().
function preloadAll() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? '')) return;
  FRAMES.forEach((_, i) => preloadFrame(i));
}

export default function CinematicSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Don't refresh (and jump the pin) when a mobile browser shows/hides its
    // address bar — that's a height change we want to ignore.
    ScrollTrigger.config({ ignoreMobileResize: true });
    let cancelled = false;
    let shown = 0;
    preloadAll();

    const showFrame = (i: number) => {
      const clamped = Math.max(0, Math.min(LAST, i));
      if (clamped === shown || !imgRef.current) return;
      shown = clamped;
      const f = FRAMES[clamped];
      imgRef.current.srcset = frameSrcSet(f.id);
      imgRef.current.src = frameSrc(f.id);
      imgRef.current.alt = f.name;
      preloadFrame(clamped + 1); // keep the next blink instant on Save-Data too
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduce) return; // handled below, outside the timeline

      gsap.set(overlayRef.current, { opacity: 0 });

      let tl: gsap.core.Timeline;
      tl = gsap.timeline({
        defaults: { ease: 'none' },
        // Drive the visible frame straight off the timeline playhead (in the
        // same "1 unit == 1 stage" time space the tweens are placed in), so it
        // stays correct whether the timeline is moved by scroll or by hand.
        onUpdate: () => {
          showFrame(Math.floor(tl.time() - SWAP_OFFSET) + 1);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          // Scroll distance is derived from the *measured* viewport, not from a
          // `vh`-sized element — keeps the pin range and the section in sync
          // even when the browser mis-reports layout during load.
          end: () => {
            // guard against a transient innerHeight of 0 during mobile load
            const vh =
              window.innerHeight ||
              document.documentElement.clientHeight ||
              800;
            return '+=' + Math.round(FRAMES.length * segmentFactor() * vh);
          },
          scrub: 1,
          pin: stageRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // scroll hint fades on first movement
      tl.to(hintRef.current, { opacity: 0, duration: HOLD * 0.4 }, 0.05);

      // one blink per gap between stages
      for (let i = 0; i < LAST; i++) {
        const blinkStart = i + HOLD;
        const mid = blinkStart + BLINK * 0.5;
        tl.to(overlayRef.current, { opacity: 1, duration: BLINK * 0.5, ease: 'power2.in' }, blinkStart);
        tl.to(overlayRef.current, { opacity: 0, duration: BLINK * 0.5, ease: 'power2.out' }, mid);
      }

      // keep the last stage resting on screen for one more hold's worth of scroll
      tl.to({}, { duration: HOLD }, LAST);

      // dev helper: scrub the whole sequence by hand from the console with
      // `__tl.progress(0..1)` without needing to scroll.
      if (process.env.NODE_ENV !== 'production') {
        (window as unknown as { __tl?: gsap.core.Timeline }).__tl = tl;
      }

      requestAnimationFrame(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }, sectionRef);

    // Reduced motion: no pin, no blinks. Turn the stage into a normal stack of
    // full-height panels the visitor scrolls through. IMPORTANT: the stage
    // element itself is styled (in JSX) as a clipped 100svh box for the pinned
    // mode — undo that here or only the first panel would show.
    if (reduce && stageRef.current) {
      const s = stageRef.current.style;
      s.position = 'static';
      s.height = 'auto';
      s.minHeight = '0';
      s.overflow = 'visible';
      s.display = 'block';
      s.width = '100%';
      const frag = document.createDocumentFragment();
      FRAMES.forEach((f) => {
        const panel = document.createElement('div');
        panel.style.cssText =
          'height:100svh;display:flex;align-items:center;justify-content:center;background:#000';
        const im = document.createElement('img');
        im.srcset = frameSrcSet(f.id);
        im.src = frameSrc(f.id);
        im.alt = f.name;
        im.style.cssText = 'max-width:100%;max-height:100%;display:block';
        panel.appendChild(im);
        frag.appendChild(panel);
      });
      stageRef.current.replaceChildren(frag);
      if (sectionRef.current) sectionRef.current.style.height = 'auto';
    }

    // Mobile browsers frequently mis-report layout during load (innerHeight 0,
    // address-bar settling, a rotate-gate that was covering the page). Re-measure
    // the pin a few times as things settle, and whenever the app asks us to.
    const refresh = () => !cancelled && ScrollTrigger.refresh();
    const onOrient = () => setTimeout(refresh, 300);
    const timers = [
      setTimeout(refresh, 200),
      setTimeout(refresh, 800),
      setTimeout(refresh, 2000),
    ];
    if (document.readyState !== 'complete') window.addEventListener('load', refresh);
    (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready.then(
      refresh
    );
    window.addEventListener('orientationchange', onOrient);
    window.addEventListener('app:remeasure', refresh);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener('load', refresh);
      window.removeEventListener('orientationchange', onOrient);
      window.removeEventListener('app:remeasure', refresh);
      ctx.revert();
    };
  }, []);

  return (
    // No fixed height here: GSAP inserts its pin-spacer as a child of this
    // element, and it must be free to grow to that spacer's height so the
    // page (and the footer after it) sits below the pinned sequence.
    <div ref={sectionRef} style={{ position: 'relative' }}>
      <div
        ref={stageRef}
        style={{
          position: 'relative',
          width: '100vw',
          // svh: the *small* viewport height (as if the mobile address bar is
          // showing). It never changes as the bar hides/shows, so the pinned
          // stage — and ScrollTrigger's measurements — stay stable.
          height: '100svh',
          overflow: 'hidden',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* the single stage image; src is swapped during each blink.
            Sizing rules live in .stage-frame (globals.css): letterboxed on
            landscape so nothing clips, cover-cropped toward the archer on
            portrait phones so the scene isn't a tiny band. */}
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

        {/* cinematic vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 22vw 6vw rgba(0,0,0,0.5)',
          }}
        />

        {/* blink-to-black overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* scroll hint: animated mouse wheel above the label */}
        <div ref={hintRef} className="scroll-hint" aria-hidden="true">
          <span className="scroll-hint__mouse">
            <span className="scroll-hint__wheel" />
          </span>
          <span className="scroll-hint__label">Scroll</span>
        </div>
      </div>
    </div>
  );
}
