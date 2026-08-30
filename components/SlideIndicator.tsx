'use client';

import { memo } from 'react';

interface Props {
  count: number;
  index: number;
  mode: 'auto' | 'scrub';
  /** auto mode: is the timer running (drives the CSS fill animation) */
  playing?: boolean;
  /** scrub mode: 0..1 progress within the current slide */
  fill?: number;
  showPlay?: boolean;
  slideMs: number;
  onDot: (i: number) => void;
  onTogglePlay?: () => void;
}

/**
 * Apple-OS-page style progress indicator: ticks, the active one elongates and
 * fills, plus (mobile only) a play/pause button. Vertical on the right on
 * desktop, horizontal at the bottom on touch — pure CSS.
 *
 * - "auto" mode (mobile): fill is a CSS animation synced to the autoplay timer.
 * - "scrub" mode (desktop): fill tracks scroll progress via `fill` (0..1).
 */
function SlideIndicator({
  count,
  index,
  mode,
  playing,
  fill = 0,
  showPlay,
  slideMs,
  onDot,
  onTogglePlay,
}: Props) {
  return (
    <div className={`slides slides--${mode}`} role="group" aria-label="Slide progress">
      <ol className="slides__ticks">
        {Array.from({ length: count }, (_, i) => {
          const active = i === index;
          return (
            <li key={i} className={`slides__tick${active ? ' is-active' : ''}`}>
              <button
                type="button"
                className="slides__dot"
                aria-label={`Go to slide ${i + 1} of ${count}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => onDot(i)}
              >
                {active &&
                  (mode === 'auto' ? (
                    <span
                      key={index}
                      className={`slides__fill${playing ? ' is-playing' : ''}`}
                      style={{ ['--dur' as string]: `${slideMs}ms` }}
                    />
                  ) : (
                    <span
                      className="slides__fill slides__fill--scrub"
                      style={{ transform: `scaleY(${Math.min(1, Math.max(0, fill))})` }}
                    />
                  ))}
              </button>
            </li>
          );
        })}
      </ol>

      {showPlay && onTogglePlay && (
        <button
          type="button"
          className="slides__play"
          aria-label={playing ? 'Pause' : 'Play'}
          aria-pressed={playing}
          onClick={onTogglePlay}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
              <path d="M8 5l11 7-11 7z" fill="currentColor" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default memo(SlideIndicator);
