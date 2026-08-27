# vpcodes.in — cinematic portfolio

A scroll-driven, single-page portfolio built as a **static Next.js (App Router)
export**, deployed to GitHub Pages at [vpcodes.in](https://vpcodes.in).

The hero is a 15-frame cinematic sequence (an archer, grayscale forest) that the
visitor scrolls through; each stage holds, then a fade-to-black "blink" swaps to
the next. Landscape only — phones get a "turn your device" screen.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # static export -> ./out  (next.config.js: output: 'export')
```

## Structure

- `components/CinematicSequence.tsx` — the pinned scroll sequence: one `<img>`
  whose `src` is swapped mid-blink, driven by a GSAP ScrollTrigger timeline.
  Reduced-motion → plain vertical scroll through the frames.
- `components/SiteNav.tsx` — nav + the inline-expanding Contact.
- `components/RotateGate.tsx` — portrait-phone "rotate to landscape" screen.
- `components/AmbientSound.tsx` — opt-in ambient loop + speaker toggle.
- `components/SiteFooter.tsx`
- `lib/stages.ts` — frame play order + `public/frames/manifest.json`.
- `scripts/prepare-frames.mjs` — regenerates `public/frames/*.webp` (responsive
  crops) from the raw Figma exports in `art-source/` (gitignored, kept locally).
- `public/frames/` — the shipped WebP frame set (3 widths each).
- `public/audio/ambience.mp3` — the ambient loop (see `public/audio/README.md`).
- `public/CNAME`, `public/.nojekyll` — GitHub Pages custom domain + config.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds the static export and
publishes it via GitHub Pages (Actions source). Domain and HTTPS are already
configured. The previous Vite portfolio is preserved on the
`vite-portfolio-archive` branch.
