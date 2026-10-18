'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { renderPlanet, makeAsteroid, drawAsteroid, type Planet, type Asteroid } from './space';

// --- tuning knobs ---------------------------------------------------------
// Scroll distance (in viewport heights) the hero stays pinned while the text
// warps away.
const PIN_VH = 1.1;
// Star counts. Phones get fewer to save battery.
const STARS_DESKTOP = 420;
const STARS_MOBILE = 200;
// Cruise speed of the star drift after the arrival warp.
const CRUISE = 0.12;
// Repeat visitors get the intro this many times faster.
const REPEAT_RATE = 4;
// Floating asteroids around the name.
const ROCKS_DESKTOP = 7;
const ROCKS_MOBILE = 4;
// How far (css px) the planet and nearest rocks shift with the mouse.
const PARALLAX = 22;
// -----------------------------------------------------------------------

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const out3 = (x: number) => 1 - Math.pow(1 - x, 3);
const io = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const in2 = (x: number) => x * x;

interface Star { x: number; y: number; z: number; px: number | null; py: number; rgb: string }

// Star colors: mostly white, some ice-blue and rose streaks (kept pale so the
// black-and-white look still holds). Weights must sum to 1.
const STAR_COLORS: { rgb: [number, number, number]; weight: number }[] = [
  { rgb: [255, 255, 255], weight: 0.66 },
  { rgb: [150, 195, 255], weight: 0.22 },
  { rgb: [255, 150, 185], weight: 0.12 },
];
function pickStarColor(): string {
  let r = Math.random();
  let c = STAR_COLORS[0].rgb;
  for (const sc of STAR_COLORS) {
    if (r < sc.weight) { c = sc.rgb; break; }
    r -= sc.weight;
  }
  const dim = 0.6 + Math.random() * 0.4; // vary brightness per star
  return c.map((v) => Math.round(v * dim)).join(',');
}

export default function UfoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<HTMLCanvasElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);
  const ulineRef = useRef<HTMLSpanElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);

  const scrollP = useRef(0); // 0..1 progress through the pinned scroll

  // Pin the hero for PIN_VH screens; scroll progress drives the take-away.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => '+=' + Math.round((window.innerHeight || document.documentElement.clientHeight || 800) * PIN_VH),
      pin: stageRef.current,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        scrollP.current = self.progress;
      },
    });
    const refresh = () => ScrollTrigger.refresh();
    const timers = [setTimeout(refresh, 300), setTimeout(refresh, 1500)];
    window.addEventListener('orientationchange', refresh);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('orientationchange', refresh);
      st.kill();
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    const scene = sceneRef.current!;
    const sctx = scene.getContext('2d');
    if (!ctx || !sctx) return;
    let planet: Planet | null = null;
    let rocks: Asteroid[] = [];
    let dpr = 1;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let seen = false;
    try {
      seen = window.localStorage.getItem('vp_seen') === '1';
      window.localStorage.setItem('vp_seen', '1');
    } catch {
      /* private mode etc. — treat as a first visit */
    }
    const rate = seen ? REPEAT_RATE : 1;

    // --- sizing ---
    let w = 0, h = 0;
    const fit = () => {
      w = stage.offsetWidth;
      h = stage.offsetHeight;
      const d = Math.min(window.devicePixelRatio || 1, w < 600 ? 1.5 : 2);
      canvas.width = Math.round(w * d);
      canvas.height = Math.round(h * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      scene.width = canvas.width;
      scene.height = canvas.height;
      sctx.setTransform(d, 0, 0, d, 0, 0);
      const mob = w < 600;
      // rebuild when size class or pixel density changes (not on every resize)
      if (!planet || d !== dpr || mob !== (rocks.length === ROCKS_MOBILE)) {
        rocks = Array.from({ length: mob ? ROCKS_MOBILE : ROCKS_DESKTOP }, () => makeAsteroid(d, mob));
      }
      dpr = d;
      planet = renderPlanet(w, h, d);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);

    // --- stars ---
    const stars: Star[] = [];
    const spawn = (s: Partial<Star>, far: boolean): Star => {
      let x: number, y: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
      } while (Math.abs(x) < 0.04 && Math.abs(y) < 0.04);
      Object.assign(s, { x, y, z: far ? 1 : Math.random() * 0.95 + 0.05, px: null, py: 0, rgb: pickStarColor() });
      return s as Star;
    };

    // --- pause when the hero is off screen or the tab is hidden ---
    // --- mouse parallax (desktop pointers only) ---
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tmx = (e.clientX / window.innerWidth) * 2 - 1;
      tmy = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    const io_ = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io_.observe(sectionRef.current!);

    const t0 = performance.now();
    let last = t0;
    let p = 0;
    let raf = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || !visible) { last = now; return; }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const Tw = (now - t0) / 1000;
      const T = reduce ? 20 : Tw * rate;
      p += (scrollP.current - p) * Math.min(1, dt * 9);
      const mobile = w < 600;

      // Text: rises in on load; on scroll it shrinks toward the centre and
      // fades as the stars jump to warp (first in, last out).
      const list = items.current;
      for (let i = 0; i < list.length; i++) {
        const it = list[i];
        if (!it) continue;
        const di = out3(seg(T, 0.6 + 0.22 * i, 1.4 + 0.22 * i));
        const j = list.length - 1 - i;
        const ti = io(seg(p, 0.05 + 0.12 * j, 0.5 + 0.12 * j));
        const r0 = it.offsetTop + it.offsetHeight / 2;
        const y = (1 - di) * 22 + ti * (h / 2 - r0) * 0.6;
        const s = (0.96 + 0.04 * di) * (1 - 0.75 * ti);
        it.style.transform = `translate(0px,${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
        it.style.opacity = (di * (1 - ti)).toFixed(3);
      }
      if (ulineRef.current) ulineRef.current.style.transform = `scaleX(${io(seg(T, 1.9, 2.7)).toFixed(3)})`;

      if (cueRef.current) cueRef.current.style.opacity = (seg(T, 2.4, 3.0) * (1 - seg(p, 0.02, 0.12))).toFixed(3);

      // Stars: warp on arrival, then a slow drift
      const n = mobile ? STARS_MOBILE : STARS_DESKTOP;
      while (stars.length < n) stars.push(spawn({}, false));
      if (stars.length > n) stars.length = n;
      const k = seg(T, 0, 1.6);
      const speed = CRUISE * (1 + 9 * Math.pow(1 - k, 3)) * (reduce ? 0.2 : 1) + (reduce ? 0 : in2(p) * 1.6);
      const cx = w / 2, cy = h / 2, f = Math.max(w, h) * 0.3;
      ctx.fillStyle = `rgba(0,0,0,${0.18 + 0.4 * k})`;
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = 'round';
      for (const s of stars) {
        s.z -= speed * dt;
        if (s.z <= 0.02) { spawn(s, true); continue; }
        const sx = cx + (s.x / s.z) * f, sy = cy + (s.y / s.z) * f;
        if (sx < -40 || sx > w + 40 || sy < -40 || sy > h + 40) { spawn(s, true); continue; }
        if (s.px != null) {
          const al = Math.min(1, (1 - s.z) * 1.4);
          ctx.strokeStyle = `rgba(${s.rgb},${al.toFixed(3)})`;
          ctx.lineWidth = 0.4 + (1 - s.z) * 1.8;
          ctx.beginPath();
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }
        s.px = sx;
        s.py = sy;
      }

      // Planet + asteroids. Planet rises in with the arrival, sinks on scroll;
      // rocks fade in, then fly outward past the camera as the warp kicks in.
      mx += (tmx - mx) * Math.min(1, dt * 3);
      my += (tmy - my) * Math.min(1, dt * 3);
      sctx.clearRect(0, 0, w, h);
      if (planet) {
        const rise = 1 - out3(seg(T, 0.15, 2.2));
        const sink = io(p);
        const py = rise * h * 0.35 + sink * h * 0.75 - my * PARALLAX * 0.3;
        const px = -mx * PARALLAX * 0.3;
        // stays opaque while it sinks so stars never show through the body
        sctx.globalAlpha = seg(T, 0.15, 1.2);
        sctx.drawImage(planet.img, px - planet.pad, py - planet.pad, w + planet.pad * 2, h + planet.pad * 2);
        sctx.globalAlpha = 1;
      }
      const fadeIn = out3(seg(T, 1.0, 2.6));
      const blast = in2(p);
      const drift = reduce ? 0.1 : 1;
      for (const k of rocks) {
        k.x += k.vx * dt * drift;
        k.y += k.vy * dt * drift;
        k.a += k.va * dt * drift;
        // wrap around once fully off screen
        const m = (k.r * 1.5) / Math.max(1, w);
        if (k.x < -m) k.x = 1 + m; else if (k.x > 1 + m) k.x = -m;
        const mY = (k.r * 1.5) / Math.max(1, h);
        if (k.y < -mY) k.y = 1 + mY; else if (k.y > 1 + mY) k.y = -mY;
        const bob = reduce ? 0 : Math.sin(Tw * 0.6 + k.bob) * 6 * k.z;
        let sx = k.x * w - mx * PARALLAX * k.z;
        let sy = k.y * h + bob - my * PARALLAX * k.z;
        // scroll: push outward from the centre and grow, nearer rocks faster
        const push = 1 + blast * (1.5 + 2.5 * k.z);
        sx = w / 2 + (sx - w / 2) * push;
        sy = h / 2 + (sy - h / 2) * push;
        const sc = (0.85 + 0.15 * fadeIn) * (1 + blast * 2 * k.z);
        const al = fadeIn * (1 - seg(p, 0.55, 0.95));
        drawAsteroid(sctx, k, sx, sy, sc, al);
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io_.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  const toWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const setItem = (i: number) => (el: HTMLElement | null) => { items.current[i] = el; };

  return (
    // No fixed height: GSAP inserts its pin-spacer here and it must be free to grow.
    <div ref={sectionRef} style={{ position: 'relative' }}>
      <div ref={stageRef} className="ufo-hero__stage">
        <canvas ref={canvasRef} className="ufo-hero__canvas" aria-hidden="true" />
        <canvas ref={sceneRef} className="ufo-hero__canvas" aria-hidden="true" />

        <div className="ufo-hero__content">
          <p ref={setItem(0)} className="ufo-hero__item ufo-hero__greet">&gt; greetings, earthling.</p>
          <h1 ref={setItem(1)} className="ufo-hero__item ufo-hero__name">
            <span className="ufo-hero__name-a">Hi, I&apos;m</span> Vivek Patel
          </h1>
          <p ref={setItem(2)} className="ufo-hero__item ufo-hero__role">
            a{' '}
            <span className="ufo-hero__u">
              software engineer
              <span ref={ulineRef} className="ufo-hero__uline" aria-hidden="true" />
            </span>
            , beamed down to Mumbai.
          </p>
        </div>

        <a ref={cueRef} href="#about" className="ufo-hero__cue" onClick={toWork}>
          <span>about me</span>
          <span className="ufo-hero__chev" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
