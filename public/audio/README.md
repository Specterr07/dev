# Ambient sound

Drop your background loop here as `ambience.mp3`.

(If you ever want an `.ogg` fallback for older Firefox, switch the `<audio>` in
`components/AmbientSound.tsx` from `src=` to `<source>` tags.)

Guidelines:

- A seamless loop, roughly 30–90 s. Forest / wind / air — atmosphere, not a tune.
- Keep it quiet and un-melodic. It plays under everything at ~18 % volume,
  eases in over ~2.8 s when turned on, and fades out over ~0.7 s when muted
  (tune `VOLUME` / `FADE_IN_MS` / `FADE_OUT_MS` in `components/AmbientSound.tsx`).
- Mono or stereo, 128–192 kbps mp3 is plenty.

Behaviour:

- The site works with **no file here** — the speaker toggle (bottom-left) simply
  won't appear until `ambience.mp3` is present.
- Sound always starts **off**. The visitor turns it on with the toggle; the
  choice is remembered (`localStorage`) and re-armed for the next visit's first
  interaction (browsers block audio autoplay).
- Audio pauses when the tab is hidden.
