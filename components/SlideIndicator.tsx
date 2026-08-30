'use client';

import { memo } from 'react';

interface Props {
  count: number;
  index: number;
  /** true only while the timer is actually running (drives the fill animation) */
  playing: boolean;
  slideMs: number;
  onDot: (i: number) => void;
  onTogglePlay: () => void;
}

/**
 * Apple-OS-page style progress indicator: a row/column of ticks, the active one
 * elongates and fills over the slide's duration, plus a play/pause button.
 * Orientation (vertical on the right / horizontal at the bottom) is pure CSS.
 */
function SlideIndicator({
  count,
  index,
  playing,
  slideMs,
  onDot,
  onTogglePlay,
}: Props) {
  return (
    <div className="slides" role="group" aria-label="Slide progress">
      <ol className="slides__ticks">
        {Array.from({ length: count }, (_, i) => {
          const active = i === index;
          return (
            <li
              key={i}
              className={`slides__tick${active ? ' is-active' : ''}`}
            >
              <button
                type="button"
                className="slides__dot"
                aria-label={`Go to slide ${i + 1} of ${count}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => onDot(i)}
              >
                {active && (
                  <span
                    // remount on slide change so the fill animation restarts
                    key={index}
                    className={`slides__fill${playing ? ' is-playing' : ''}`}
                    style={{ ['--dur' as string]: `${slideMs}ms` }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

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
    </div>
  );
}

export default memo(SlideIndicator);
