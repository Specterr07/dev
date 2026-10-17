# vpcodes.in — portfolio

A single-page portfolio built as a **static Next.js (App Router) export**,
deployed to GitHub Pages at [vpcodes.in](https://vpcodes.in).

Black-and-white space theme: a warp starfield hero with a hand-drawn intro,
then an about section with a playable voice note and two resume links. Works
in portrait and landscape, phone and desktop.

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

- `app/page.tsx` — hero → about → footer.
- `app/layout.tsx` — fonts (Gaegu + JetBrains Mono via `next/font`), nav,
  ambient sound.
- `app/icon.svg` — favicon (the glasses logo).
- `app/globals.css` — all styles; sections are commented.
- `components/UfoHero.tsx` — the hero: canvas starfield (warp on arrival, slow
  tinted drift, warp again on scroll), intro text that rises in, pinned with
  GSAP ScrollTrigger while the text warps away. Tuning knobs at the top.
- `components/AboutSection.tsx` — bio, voice note, and the two resume buttons
  (`RESUMES` holds the Google Docs links).
- `components/VoiceNote.tsx` — the voice-note player (waveform, seek, ducks the
  ambient loop while playing).
- `components/SiteNav.tsx` — glasses logo + the inline-expanding Contact menu.
- `components/AmbientSound.tsx` — opt-in ambient loop + speaker toggle.
- `components/SiteFooter.tsx`
- `public/audio/` — `ambience.mp3` and `voice-note.m4a` (see its README).
- `public/CNAME`, `public/.nojekyll` — GitHub Pages custom domain + config.

Legacy, no longer used by the site: `public/frames/` and
`scripts/prepare-frames.mjs` (the old 15-frame archer sequence).

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds the static export and
publishes it via GitHub Pages (Actions source). Pull requests into `main` run
`.github/workflows/ci.yml` (build check). The previous Vite portfolio is
preserved on the `vite-portfolio-archive` branch.
