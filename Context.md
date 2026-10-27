# Project Context: vpcodes.in — Portfolio

## Overview
A single-page portfolio for Vivek Patel, built as a **static Next.js (App
Router)** export and deployed to GitHub Pages. The look is black and white,
outline-only drawings, with a space theme. Type is **Gaegu** (hand-drawn,
for the name, bio and headings) and **JetBrains Mono** (everything else,
the "engineer" voice).

The home page has three sections:

1. **Hero** (`components/UfoHero.tsx` + `components/space.ts`): a warp
   starfield, a dark planet with a glowing rim behind the name, and floating
   asteroids.
2. **About** (`components/AboutSection.tsx`): bio, a voice note, and two
   resume buttons.
3. **Work** (`components/WorkSection.tsx`): "Selected work" cards that link to
   case study pages under `/work/<slug>`.

Anchors on the home page: `#top`, `#about`, `#work` (empty spans in
`app/page.tsx`, placed just before each section).

### Tech stack
- Next.js (App Router, static export), React 18, TypeScript
- GSAP ScrollTrigger (pinning and scroll-in reveals)
- Canvas 2D (starfield), inline SVG (logo, icons)
- Plain CSS in `app/globals.css` (no Tailwind)

## Hero

The intro copy:

- `> greetings, earthling.`
- **Hi, I'm Vivek Patel** (two lines on phones)
- `a software engineer, beamed down to Mumbai.` (only "software engineer" is
  underlined; the underline draws in)

How it moves:

1. **Arrival:** stars start in a fast warp and ease into a slow drift over about
   1.6 s. The three lines rise in one after another, then the underline draws
   and the "about me" cue fades in.
2. **Scroll:** the hero is pinned for about 1.1 screens (`PIN_VH`). Scroll
   progress speeds the stars back up into a warp while the text shrinks toward
   the centre and fades, bottom line first. Scrolling back up reverses it.
3. **Stars:** drawn on a `<canvas>` as streaks from a central vanishing point.
   Mostly white, with some pale ice-blue and rose (`STAR_COLORS` in
   `UfoHero.tsx`).

4. **Planet + asteroids** (`components/space.ts`, drawn on a second canvas
   above the stars and below the text, cleared every frame):
   - The planet is pre-rendered once per resize (`renderPlanet`): near-black
     body, thin warm rim and blue haze, brightest on the left. It rises in with
     the arrival and sinks on scroll (it stays opaque so stars never show
     through it).
   - Asteroids (`ROCKS_DESKTOP` 7 / `ROCKS_MOBILE` 4) are random lumpy rocks
     with craters, spawned away from the name. They drift, bob and tumble;
     lighting stays fixed to the upper left while they rotate. On scroll they
     fly outward and grow as the warp kicks in.
   - Mouse parallax (`PARALLAX`, desktop pointers only): nearer rocks shift
     more than far ones; the planet shifts a little.

Performance and accessibility:
- Only `transform`/`opacity` are animated on DOM elements; the canvas draws at
  most 2× device pixel ratio (1.5× on phones) and about 200 stars on phones
  versus 420 on desktop.
- The animation loop pauses when the hero is off screen or the tab is hidden.
- Repeat visitors (`localStorage` key `vp_seen`) get the intro 4× faster.
- `prefers-reduced-motion`: the text appears already in place and the stars
  barely move.
- The component and CSS class names still say "UFO" (`UfoHero`, `.ufo-hero__*`)
  from an earlier version that had one; there's no UFO now.

## About section

- `> cat about.txt` then the bio in Gaegu.
- **Voice note** (`components/VoiceNote.tsx`): a ~10 s clip
  (`public/audio/voice-note.m4a`) telling visitors to check out the resumes.
  Round play/pause button, a 48-bar waveform measured from the actual clip
  (`PEAKS`; re-measure if the clip changes), click or drag to seek, keyboard
  accessible through a hidden range input. A "psst… press play" hint disappears
  after the first play. While it plays it fires a `voice-note` window event and
  `AmbientSound` lowers the ambient loop, then brings it back.
- `> ls ./resumes`, then two tilted outline cards that straighten and fill white
  on hover:
  - **Frontend** → the Frontend Developer resume (Google Doc)
  - **Full-stack** → the Software Developer resume (Google Doc)
  The links live in `RESUMES` in `AboutSection.tsx`. Both docs must be shared as
  "Anyone with the link: Viewer".

## Work and case studies

- `WORK` in `WorkSection.tsx` lists the case studies (slug, name, one-line
  meta, cover image). Add an entry only once `app/work/<slug>/page.tsx` exists.
- Cards reuse the resume-card look (tilt, straighten and fill white on hover)
  with a screenshot on top.
- Case studies so far:
  - **Mr. Plastic Repair** (`/work/mr-plastic-repair`): phone-first site for a
    Toronto bumper welding shop. Loads Anton on this page only.
  - **Deccan Produce** (`/work/deccan-produce`): mobile-first site for an
    Indian fruit exporter. Loads Fraunces and Barlow Condensed on this page
    only.
- Each page runs: brief, research, design, build, final screens, then a "Keep
  exploring" link to the other case study. Shared styles are in
  `app/work/case-study.css` (`cs-*` classes); images are in
  `public/work/<slug>/`.

## Nav and branding
- The logo is an outline of Vivek's glasses (traces itself in on load, with a
  lens glare every few seconds). The same drawing is the favicon
  (`app/icon.svg`).
- Right side of the bar: **Work**, then **Contact** (both in the `.nav__links`
  wrapper).
- **Work** (`.nav__link`) matches the Contact button's type. On the home page
  it smooth-scrolls to `#work`, stopping 80px above it so the fixed 64px nav
  doesn't cover the heading. On a case study page it is a plain link to
  `/#work`; on arrival the nav redoes the jump (at 100 ms and 600 ms) because
  the hero's GSAP pin spacer is added after hydration and the browser's own
  anchor jump can land short.
- The Contact menu expands inline to LinkedIn, GitHub and Mail (on phones, a
  small panel drops below it).
- The logo goes home from a case study page and scrolls to the top on the
  home page.
- The nav turns solid (blurred, with a thin border) after the hero.

## SEO, link previews and LLMs

- **Link previews:** every page gets Open Graph and Twitter-card tags plus a
  canonical URL from `socialMeta()` in `lib/seo.ts`. Next merges metadata
  shallowly, so a page that sets its own `openGraph`/`twitter` must set all of
  it; that's why every page calls `socialMeta()` instead of relying on the
  layout. Home is `og:type website`, case studies are `article`.
- **Preview image:** `public/og.png` (1200×630), shared by every page. It's
  "Option D": name, role and vpcodes.in on the left, two tilted case study
  cards (Mr. Plastic Repair outline, Deccan Produce filled white) on the
  right, under `> ls ./work`. Source: `scripts/og/og-image.html`. Re-render
  it when the case studies change.
- **Crawlers:** `app/robots.ts` builds `/robots.txt` (everything allowed,
  points at the sitemap); `app/sitemap.ts` builds `/sitemap.xml` from its
  `PAGES` list. Both use `dynamic = 'force-static'` for the static export.
- **LLMs:** `public/llms.txt` is a Markdown summary (bio, stack, both case
  studies, resumes, links) following the llmstxt.org format. It only states
  what the site itself says.

## Custom Cursor (HextaUI adaptation)

- Adapted from HextaUI custom cursor pattern to match the black-and-white space & engineer aesthetic.
- Components in `components/ui/cursor.tsx`:
  - `MouseTrackerProvider` (`CursorProvider`): manages mouse coordinates and visibility state across a container or globally (`global={true}`).
  - `Pointer` (`Cursor`): instantaneous tracking pointer element. Includes `ThemedPointerIcon` (monochrome outline pointer SVG with drop shadow).
  - `PointerFollower` (`CursorFollow`): smooth trailing follower powered by `requestAnimationFrame` and lerp easing. Supports alignments (`bottom-right`, `bottom-left`, `top-right`, `top-left`, `center`).
- `SiteCursor` (`components/SiteCursor.tsx`): global site-wide custom cursor mounted in `app/layout.tsx`. Shows the themed pointer with a `> vpcodes` badge follower.
- `ThemedCursorCard` (`components/ThemedCursorCard.tsx`): an interactive tilted outline card demonstrating the themed copy and cursor actions.
- Styles in `app/globals.css`:
  - `.cursor-card`: tilted outline card matching resumes and work cards.
  - `.cursor-tag`: monospace badge (`rgba(12, 14, 18, 0.95)`, 1px border, white glowing dot).
  - `.hide-native-cursor`: hides standard OS cursor when custom cursor is active.
- Accessibility & mobile:
  - Disables on touch-only devices (`(hover: none) and (pointer: coarse)`).
  - Position snaps immediately on initial mouse entry to prevent flying in from (0, 0).
- Future improvements to explore:
  - Dynamic hover states for links/buttons (e.g. tag changes to `[open]` or `[view]` on case study cards).
  - Custom trail or magnetic snap effect on interactive elements.

## History
The site used to be a 15-frame scroll sequence of an archer in a grayscale
forest ("Namaste, I am Vivek Patel…" then "What can I do?"), landscape only,
with a rotate-your-phone screen and a Professional Story timeline. That was
replaced by the current hero and about section. The frame images in
`public/frames/` and `scripts/prepare-frames.mjs` are left over from it and are
not used.
