'use client';

import { useEffect, useRef, useState } from 'react';

// Loudness of /audio/voice-note.m4a in 48 slices (0..1), measured from the
// actual file so the waveform matches the voice. Re-measure if the clip changes.
const PEAKS = [
  0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.86, 0.92, 0.46, 0.38, 1.0, 0.7, 0.35, 0.08, 0.08, 0.08,
  0.08, 0.49, 0.93, 0.46, 0.3, 0.43, 0.92, 0.72, 0.35, 0.36, 0.5, 0.11, 0.75, 0.39, 0.85, 0.45,
  0.38, 0.38, 0.51, 0.36, 0.58, 0.36, 0.37, 0.13, 0.16, 0.27, 0.4, 0.43, 0.25, 0.08, 0.08, 0.08,
];

const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

/** Tell the ambient soundtrack to duck while the voice note plays. */
const announce = (playing: boolean) =>
  window.dispatchEvent(new CustomEvent('voice-note', { detail: { playing } }));

export default function VoiceNote({ src = '/audio/voice-note.m4a' }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(10.5);
  const [played, setPlayed] = useState(false);

  // smooth playhead while playing (timeupdate only fires ~4×/s)
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => {
      const a = audioRef.current;
      if (a) setTime(a.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onMeta = () => Number.isFinite(a.duration) && setDuration(a.duration);
    const onEnd = () => {
      setPlaying(false);
      setTime(0);
      a.currentTime = 0;
      announce(false);
    };
    const onPause = () => { setPlaying(false); announce(false); };
    const onPlay = () => { setPlaying(true); setPlayed(true); announce(true); };
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('ended', onEnd);
    a.addEventListener('pause', onPause);
    a.addEventListener('play', onPlay);
    if (a.readyState >= 1) onMeta();
    return () => {
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('ended', onEnd);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('play', onPlay);
      announce(false);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = v;
    setTime(v);
  };

  const progress = duration > 0 ? time / duration : 0;
  const head = Math.floor(progress * PEAKS.length);

  return (
    <div className={`vnote${playing ? ' vnote--playing' : ''}`}>
      <p className={`vnote__hint${played ? ' vnote__hint--gone' : ''}`} aria-hidden="true">
        psst… press play
        <svg viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6C18 4 34 10 30 22C27 31 16 30 18 23C20 16 36 18 44 32" />
          <path d="M38 31L44 33L45 26" />
        </svg>
      </p>

      <div className="vnote__card">
        <button
          type="button"
          className="vnote__play"
          onClick={toggle}
          aria-label={playing ? 'Pause voice note' : 'Play voice note from Vivek'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {playing ? (
              <path d="M8.5 6.5V17.5M15.5 6.5V17.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
            ) : (
              <path d="M9 6.8L17.2 12L9 17.2Z" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" />
            )}
          </svg>
        </button>

        <div className="vnote__wave">
          {PEAKS.map((pk, i) => (
            <span
              key={i}
              className={`vnote__bar${i < head ? ' vnote__bar--on' : ''}${playing && i === head ? ' vnote__bar--head' : ''}`}
              style={{ height: `${Math.round(18 + pk * 82)}%`, animationDelay: `${(i % 6) * 60}ms` }}
            />
          ))}
          <input
            className="vnote__seek"
            type="range"
            min={0}
            max={duration}
            step={0.1}
            value={time}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek voice note"
            aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
          />
        </div>

        <span className="vnote__time">
          {fmt(time)}<span aria-hidden="true"> / </span><span className="vnote__dur">{fmt(duration)}</span>
        </span>
      </div>

      <p className="vnote__caption">a {Math.round(duration)}-second hello. promise.</p>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}
