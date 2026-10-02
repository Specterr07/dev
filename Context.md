# Project Context: vpcodes.in - Cinematic Portfolio

## Project Overview
This project is a scroll-driven, single-page portfolio for Vivek Patel. It is built as a **static Next.js (App Router)** export and deployed to GitHub Pages. It leverages **GSAP (GreenSock Animation Platform)** to create a cinematic, frame-by-frame animation sequence that responds to user scrolling.

The website is designed primarily for landscape orientation. It acts as an interactive storytelling medium, using 15 hand-drawn style frames in a grayscale forest setting featuring an archer to introduce Vivek and his skills.

### Tech Stack
- **Framework:** Next.js (App Router, Static Export)
- **Library:** React 18, TypeScript
- **Animation:** GSAP (ScrollTrigger)
- **Styling:** CSS (Globals), Tailwind (if present, though mostly custom CSS/GSAP)

## File Structure & Architecture
- `app/page.tsx`: The main entry point rendering the sequence and footer.
- `components/CinematicSequence.tsx`: The core component driving the scroll animation (explained below).
- `lib/stages.ts`: Manages the playback order of the frames and defines responsive image `srcSet` generation.
- `public/frames/`: Contains the static `.webp` image assets exported at different widths for responsive loading, along with `manifest.json`.
- `public/audio/`: Contains ambient sounds played in the background.

## How the Animation Works
The "animated website" feel is achieved without using actual video files. Instead, it relies on a **15-frame image sequence** manipulated via scroll events using `GSAP ScrollTrigger`.

### Animation Mechanism
Inside `components/CinematicSequence.tsx`, the scroll behavior is orchestrated as follows:
1. **Pinned Section:** As the user scrolls down, the viewport is "pinned" (fixed in place) using GSAP's `ScrollTrigger`.
2. **Scroll Budgeting:** A scroll distance is budgeted to each stage based on the viewport height (e.g., `0.85 * 100vh` per frame on desktop).
3. **The "Blink" Transition:** Instead of directly swapping images (which would feel like a choppy slideshow), the component overlays a black `div` (`overlayRef`). Between each frame, the screen fades to black (opacity 1) and back to transparent (opacity 0). 
4. **Image Swapping:** At the exact midpoint of the blink (when the screen is completely black, `SWAP_OFFSET`), the `src` of the single `<img>` tag is swapped to the next frame. When the black overlay fades out, the new frame is revealed.
5. **Preloading:** Frames are preloaded to ensure instantaneous swapping when the blink occurs, preventing layout shifts or blank screens.
6. **Accessibility:** If the user's system prefers reduced motion, the pinning and blinking are disabled, and the frames are simply stacked vertically as standard scrollable panels.

## The Slide Sequence in Detail
There are 15 distinct frames. The playback order defined in `lib/stages.ts` does not follow the numerical IDs of the files. It is sequenced in two phases: the "Intro" (Frames 11-15) followed by the "Action/Skills" sequence (Frames 1-10).

Here is what each slide explicitly says and depicts as the user scrolls:

### Phase 1: The Introduction
The archer stands in the forest as text progressively appears on screen.
- **Slide 1 (Frame 11):** `NAMASTE !`
- **Slide 2 (Frame 12):** `NAMASTE, I AM VIVEK PATEL.`
- **Slide 3 (Frame 13):** `NAMASTE, I AM VIVEK PATEL. A SOFTWARE DEVELOPER.`
- **Slide 4 (Frame 14):** `NAMASTE, I AM VIVEK PATEL. A SOFTWARE DEVELOPER. AN ENGINEER.`
- **Slide 5 (Frame 15):** `NAMASTE, I AM VIVEK PATEL. A SOFTWARE DEVELOPER. AN ENGINEER. WITH A CREATIVE HEAD.`

### Phase 2: Action & Skills
The archer begins to draw his bow and shoot arrows, answering the question of what he can do.
- **Slide 6 (Frame 01):** `WHAT CAN I DO?` (The archer holds his bow, looking forward).
- **Slide 7 (Frame 02):** *(No text)*. (The archer is seen preparing to draw his bow).
- **Slide 8 (Frame 03):** *(No text)*. (The archer reaches full draw).
- **Slide 9 (Frame 04):** `CODE?` (The archer holds the drawn arrow).
- **Slide 10 (Frame 05):** `CODE.` (The arrow is released and flying).
- **Slide 11 (Frame 06):** `MAKE VIDEOS?` (The archer is drawing a second arrow).
- **Slide 12 (Frame 07):** `MAKE VIDEOS. CODE.` (The second arrow is released).
- **Slide 13 (Frame 08):** `BE CREATIVE?` (The archer is drawing a third arrow).
- **Slide 14 (Frame 09):** `BE CREATIVE. MAKE VIDEOS. CODE.` (The third arrow is released).
- **Slide 15 (Frame 10):** `“I CAN DO THEM ALL”` (The archer is standing relaxed, having demonstrated his capabilities).
