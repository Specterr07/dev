// Planet + asteroid layer for the hero. Drawn on its own canvas above the
// starfield (which leaves trails) and below the text, cleared every frame.

const TAU = Math.PI * 2;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Light comes from the upper left (same side as the planet's lit rim).
const LIGHT = { x: -0.62, y: -0.78 };

// --- planet ----------------------------------------------------------------

export interface Planet {
  img: HTMLCanvasElement; // pre-rendered, viewport-sized + PAD on every side
  pad: number;
}
export const PLANET_PAD = 48;

/**
 * Renders a huge dark planet whose limb crosses the left edge at yL and the
 * right edge at yR (fractions of h). Center sits far below so only a gentle
 * arc of it shows, like the horizon of a world you're orbiting.
 */
export function renderPlanet(w: number, h: number, d: number): Planet {
  const pad = PLANET_PAD;
  const mobile = w < 600;
  const R = Math.max(w, h) * (mobile ? 1.9 : 1.35);
  const yL = (mobile ? 0.66 : 0.52) * h;
  const yR = (mobile ? 0.86 : 0.97) * h;

  // circle through (0,yL) and (w,yR), center below the chord
  const dx = w, dy = yR - yL;
  const L = Math.hypot(dx, dy);
  const dist = Math.sqrt(Math.max(0, R * R - (L / 2) * (L / 2)));
  const cx = w / 2 + (-dy / L) * dist + pad;
  const cy = (yL + yR) / 2 + (dx / L) * dist + pad;

  const W = w + pad * 2, H = h + pad * 2;
  const c = document.createElement('canvas');
  c.width = Math.round(W * d);
  c.height = Math.round(H * d);
  const g = c.getContext('2d')!;
  g.setTransform(d, 0, 0, d, 0, 0);

  // "how lit" across the screen: bright on the left, fading to the right
  const litMask = (ctx: CanvasRenderingContext2D, lo: number) => {
    const m = ctx.createLinearGradient(pad, 0, W - pad, 0);
    m.addColorStop(0, 'rgba(0,0,0,1)');
    m.addColorStop(0.45, `rgba(0,0,0,${(0.35 + lo).toFixed(2)})`);
    m.addColorStop(1, `rgba(0,0,0,${lo.toFixed(2)})`);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = m;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
  };

  // 1) atmosphere glow + rim, on a scratch canvas so it can be masked
  const a = document.createElement('canvas');
  a.width = c.width; a.height = c.height;
  const ag = a.getContext('2d')!;
  ag.setTransform(d, 0, 0, d, 0, 0);
  const haze = ag.createRadialGradient(cx, cy, R * 0.985, cx, cy, R + Math.min(w, h) * 0.22);
  haze.addColorStop(0, 'rgba(150,190,255,0.0)');
  haze.addColorStop(0.06, 'rgba(170,205,255,0.32)');
  haze.addColorStop(0.25, 'rgba(120,160,255,0.10)');
  haze.addColorStop(1, 'rgba(80,120,255,0)');
  ag.fillStyle = haze;
  ag.beginPath(); ag.arc(cx, cy, R + Math.min(w, h) * 0.22, 0, TAU); ag.fill();
  // soft wide rim
  ag.shadowColor = 'rgba(255,240,220,0.9)';
  ag.shadowBlur = 18;
  ag.strokeStyle = 'rgba(255,236,210,0.55)';
  ag.lineWidth = 3;
  ag.beginPath(); ag.arc(cx, cy, R - 1, 0, TAU); ag.stroke();
  // crisp thin rim
  ag.shadowBlur = 4;
  ag.strokeStyle = 'rgba(255,250,240,1)';
  ag.lineWidth = 1.2;
  ag.beginPath(); ag.arc(cx, cy, R - 0.5, 0, TAU); ag.stroke();
  ag.shadowBlur = 0;
  ag.setTransform(1, 0, 0, 1, 0, 0);
  ag.scale(d, d);
  litMask(ag, 0.12);

  // 2) the planet body: near-black, a touch lighter just inside the lit limb
  g.save();
  g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.clip();
  g.fillStyle = '#030406';
  g.fillRect(0, 0, W, H);
  // faint surface mottling near the limb
  for (let i = 0; i < 60; i++) {
    const ang = rand(-Math.PI, 0);
    const rr = R * rand(0.93, 0.995);
    const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
    const s = rand(20, 120);
    const blob = g.createRadialGradient(x, y, 0, x, y, s);
    blob.addColorStop(0, `rgba(120,130,150,${rand(0.02, 0.06).toFixed(3)})`);
    blob.addColorStop(1, 'rgba(120,130,150,0)');
    g.fillStyle = blob;
    g.fillRect(x - s, y - s, s * 2, s * 2);
  }
  // inner limb light goes on a scratch so it can follow the lit side too
  const b = document.createElement('canvas');
  b.width = c.width; b.height = c.height;
  const bg = b.getContext('2d')!;
  bg.setTransform(d, 0, 0, d, 0, 0);
  const inner = bg.createRadialGradient(cx, cy, R * 0.9, cx, cy, R);
  inner.addColorStop(0, 'rgba(40,50,70,0)');
  inner.addColorStop(0.85, 'rgba(60,72,95,0.18)');
  inner.addColorStop(1, 'rgba(150,170,210,0.35)');
  bg.fillStyle = inner;
  bg.beginPath(); bg.arc(cx, cy, R, 0, TAU); bg.fill();
  bg.setTransform(d, 0, 0, d, 0, 0);
  litMask(bg, 0.05);
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.drawImage(b, 0, 0);
  g.restore();

  // 3) glow on top
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'lighter';
  g.drawImage(a, 0, 0);
  g.globalCompositeOperation = 'source-over';

  return { img: c, pad };
}

// --- asteroids -------------------------------------------------------------

export interface Asteroid {
  tex: HTMLCanvasElement; // unlit-ish rock texture, square, centered
  path: Path2D;           // outline in local units (radius = r)
  r: number;              // radius in css px at z = 1
  z: number;              // depth 0.35..1 (1 = nearest)
  x: number; y: number;   // position, fractions of the viewport
  vx: number; vy: number; // drift, fractions per second
  a: number; va: number;  // rotation and spin (rad/s)
  bob: number;            // phase for the gentle float
}

const ROCK_TINTS: [number, number, number][] = [
  [118, 114, 110], // grey
  [104, 100, 98],  // darker grey
  [112, 94, 82],   // dusty brown
];

function rockPath(r: number): Path2D {
  const n = 9 + Math.floor(Math.random() * 4);
  const pts: [number, number][] = [];
  const squash = rand(0.62, 0.9);
  // low-frequency wobble + a few chipped facets so it reads as a broken rock
  const k1 = rand(0, TAU), k2 = rand(0, TAU), k3 = rand(0, TAU);
  for (let i = 0; i < n; i++) {
    const t = (i / n) * TAU + rand(-0.15, 0.15);
    const rr = r * (0.8 + 0.13 * Math.sin(t * 2 + k1) + 0.08 * Math.sin(t * 3 + k2) + 0.05 * Math.sin(t * 5 + k3) + rand(-0.08, 0.08));
    pts.push([Math.cos(t) * rr, Math.sin(t) * rr * squash]);
  }
  const p = new Path2D();
  const mid = (i: number) => {
    const A = pts[i % n], B = pts[(i + 1) % n];
    return [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  };
  const m0 = mid(n - 1);
  p.moveTo(m0[0], m0[1]);
  for (let i = 0; i < n; i++) {
    const m = mid(i);
    if (Math.random() < 0.35) { p.lineTo(pts[i][0], pts[i][1]); p.lineTo(m[0], m[1]); } // chipped corner
    else p.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1]);
  }
  p.closePath();
  return p;
}

function rockTexture(r: number, path: Path2D, d: number): HTMLCanvasElement {
  const size = Math.ceil(r * 2.4);
  const c = document.createElement('canvas');
  c.width = Math.round(size * d);
  c.height = Math.round(size * d);
  const g = c.getContext('2d')!;
  g.setTransform(d, 0, 0, d, size / 2 * d, size / 2 * d);
  g.save();
  g.clip(path);
  const [cr, cg, cb] = ROCK_TINTS[Math.floor(Math.random() * ROCK_TINTS.length)];
  g.fillStyle = `rgb(${cr},${cg},${cb})`;
  g.fillRect(-size, -size, size * 2, size * 2);
  // grain
  const grains = Math.round(r * r * 0.5);
  for (let i = 0; i < grains; i++) {
    const v = Math.random() < 0.5 ? 0 : 255;
    g.fillStyle = `rgba(${v},${v},${v},${rand(0.04, 0.14).toFixed(3)})`;
    const s = rand(0.6, 1.8);
    g.fillRect(rand(-r, r), rand(-r, r), s, s);
  }
  // craters: dark bowl + a lit lip on the side away from the light
  const craters = 3 + Math.floor(Math.random() * 5);
  for (let i = 0; i < craters; i++) {
    const cr2 = r * rand(0.08, 0.26);
    const x = rand(-r * 0.6, r * 0.6), y = rand(-r * 0.5, r * 0.5);
    const bowl = g.createRadialGradient(x - cr2 * 0.25, y - cr2 * 0.25, 0, x, y, cr2);
    bowl.addColorStop(0, `rgba(0,0,0,${rand(0.25, 0.45).toFixed(2)})`);
    bowl.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = bowl;
    g.beginPath(); g.ellipse(x, y, cr2, cr2 * rand(0.6, 0.9), rand(0, TAU), 0, TAU); g.fill();
    g.strokeStyle = `rgba(255,255,255,${rand(0.06, 0.14).toFixed(2)})`;
    g.lineWidth = Math.max(0.6, cr2 * 0.12);
    g.beginPath(); g.ellipse(x, y, cr2 * 0.9, cr2 * 0.7, 0, 0.15 * Math.PI, 0.8 * Math.PI); g.stroke();
  }
  // large soft patches of lighter/darker mineral so the surface isn't flat
  for (let i = 0; i < 5; i++) {
    const x = rand(-r, r), y = rand(-r, r), s2 = r * rand(0.3, 0.7);
    const v = Math.random() < 0.5 ? '0,0,0' : '255,240,225';
    const pg = g.createRadialGradient(x, y, 0, x, y, s2);
    pg.addColorStop(0, `rgba(${v},${rand(0.08, 0.18).toFixed(2)})`);
    pg.addColorStop(1, `rgba(${v},0)`);
    g.fillStyle = pg;
    g.fillRect(x - s2, y - s2, s2 * 2, s2 * 2);
  }
  g.restore();
  return c;
}

export function makeAsteroid(d: number, mobile: boolean): Asteroid {
  const z = rand(0.35, 1);
  const r = (mobile ? rand(14, 30) : rand(18, 46)) * (0.55 + 0.45 * z);
  const path = rockPath(r);
  // keep them out of the middle, where the name sits
  let x = 0, y = 0;
  do {
    x = rand(0.03, 0.97);
    y = rand(0.08, 0.9);
  } while (Math.abs(x - 0.5) < (mobile ? 0.3 : 0.26) && Math.abs(y - 0.48) < (mobile ? 0.2 : 0.16));
  const ang = rand(0, TAU);
  const sp = rand(0.004, 0.012) * (0.5 + 0.5 * z);
  return {
    tex: rockTexture(r, path, d),
    path, r, z, x, y,
    vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp * 0.5,
    a: rand(0, TAU), va: rand(0.04, 0.18) * (Math.random() < 0.5 ? -1 : 1),
    bob: rand(0, TAU),
  };
}

/**
 * Draw one asteroid at (sx, sy) css px, scaled by `s`, with lighting that stays
 * fixed to the upper-left while the rock tumbles.
 */
export function drawAsteroid(ctx: CanvasRenderingContext2D, k: Asteroid, sx: number, sy: number, s: number, alpha: number) {
  if (alpha <= 0.002) return;
  const r = k.r;
  const size = r * 2.4;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(sx, sy);
  ctx.scale(s, s);
  ctx.rotate(k.a);
  ctx.clip(k.path);
  ctx.drawImage(k.tex, -size / 2, -size / 2, size, size);
  ctx.rotate(-k.a);
  // shading: bright toward the light, deep shadow on the far side
  const lx = LIGHT.x * r * 0.7, ly = LIGHT.y * r * 0.7;
  const sh = ctx.createRadialGradient(lx, ly, r * 0.05, lx * 0.2, ly * 0.2, r * 1.55);
  sh.addColorStop(0, 'rgba(255,248,235,0.42)');
  sh.addColorStop(0.35, 'rgba(255,248,235,0.06)');
  sh.addColorStop(0.62, 'rgba(0,0,0,0.35)');
  sh.addColorStop(1, 'rgba(0,0,0,0.92)');
  ctx.fillStyle = sh;
  ctx.fillRect(-r * 1.3, -r * 1.3, r * 2.6, r * 2.6);
  // far rocks sink into the dark
  const fog = (1 - k.z) * 0.55;
  if (fog > 0) {
    ctx.fillStyle = `rgba(0,0,0,${fog.toFixed(3)})`;
    ctx.fillRect(-r * 1.3, -r * 1.3, r * 2.6, r * 2.6);
  }
  ctx.restore();
}
