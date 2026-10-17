# Audio

Two files live here:

## `voice-note.m4a`: the voice note in the about section

A short spoken hello (about 10 s) that points visitors to the resumes. Played by
`components/VoiceNote.tsx`.

- AAC in `.m4a` plays in every current browser; keep it short and small
  (the current file is about 90 KB).
- Only its metadata loads with the page; the audio loads when someone presses play.
- The waveform is **not** read from the file at runtime. It's the `PEAKS` array
  in `VoiceNote.tsx` (48 loudness values, 0–1). If you replace the clip,
  re-measure it, for example:

  ```bash
  ffmpeg -v error -i public/audio/voice-note.m4a -ac 1 -ar 8000 -f s16le - | python3 -c "
  import sys,struct,math
  d=sys.stdin.buffer.read(); n=len(d)//2; a=struct.unpack('<%dh'%n,d)
  B=48; s=n//B; v=[math.sqrt(sum(x*x for x in a[i*s:(i+1)*s])/s) for i in range(B)]
  m=max(v); print([round(max(0.08,x/m),2) for x in v])"
  ```

## `ambience.mp3`: the optional background loop

Played by `components/AmbientSound.tsx`. (For an `.ogg` fallback, switch its
`<audio>` from `src=` to `<source>` tags.)

Guidelines:

- A seamless loop, roughly 30–90 s. Atmosphere, not a tune.
- Keep it quiet and un-melodic. It plays under everything at ~18 % volume,
  eases in over ~2.8 s when turned on, and fades out over ~0.7 s when muted
  (tune `VOLUME` / `FADE_IN_MS` / `FADE_OUT_MS` in `components/AmbientSound.tsx`).
- Mono or stereo, 128–192 kbps mp3 is plenty.

Behaviour:

- The site works with **no file here**; the speaker toggle (bottom-left)
  won't appear until `ambience.mp3` is present.
- Sound always starts **off**. The visitor turns it on with the toggle; the
  choice is remembered (`localStorage`) and re-armed for the next visit's first
  interaction (browsers block audio autoplay).
- It drops to about 12 % of its volume while the voice note plays, then comes back.
- Audio pauses when the tab is hidden.
