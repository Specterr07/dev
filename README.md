# vpcodes.in — portfolio

A single-page portfolio built as a **static Next.js (App Router) export**,
deployed to GitHub Pages at [vpcodes.in](https://vpcodes.in).

Black-and-white space theme: a warp starfield hero with a hand-drawn intro,
an about section with a playable voice note and two resume links, then a
**Work** section linking to case study pages. Works in portrait and landscape,
phone and desktop. See `CHANGELOG.md` for what changed and when.

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

- `app/page.tsx` — hero → about → work → footer (`#top`, `#about`, `#work`
  anchors).
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
- `components/SiteNav.tsx` — glasses logo, a **Work** link, and the
  inline-expanding Contact menu.
- `components/WorkSection.tsx` — "Selected work" cards. `WORK` lists the case
  studies; add an entry once its page exists.
- `app/work/<slug>/page.tsx` — one case study page each (`mr-plastic-repair`,
  `deccan-produce`), sharing `app/work/case-study.css`. Each loads its own
  client fonts. Screenshots live in `public/work/<slug>/`.
- `components/AmbientSound.tsx` — opt-in ambient loop + speaker toggle.
- `lib/seo.ts` — link previews: `socialMeta()` builds each page's Open Graph,
  Twitter card and canonical URL; `OG_IMAGE` points at `public/og.png`.
- `app/robots.ts` → `/robots.txt`, `app/sitemap.ts` → `/sitemap.xml` (add new
  case study pages to `PAGES` there).
- `public/llms.txt` — Markdown summary of the portfolio for LLMs
  ([llmstxt.org](https://llmstxt.org)). Update it when the site's content changes.
- `public/og.png` — the 1200×630 link-preview image; its source is
  `scripts/og/og-image.html`.
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
