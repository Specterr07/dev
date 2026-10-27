'use client';

import Link from 'next/link';

export default function ThemedCursorCard() {
  return (
    <div className="cursor-card">
      <p className="cursor-card__kicker">&gt; beam_transmission.sh</p>
      <h3 className="cursor-card__title">
        Ready to build something out of this world?
      </h3>
      <p className="cursor-card__desc">
        Have an ambitious product in mind, need full-stack engineering, or just want to chat systems? Let&apos;s connect.
      </p>

      <div className="cursor-card__actions">
        <Link
          href="mailto:patelvivek.v7@gmail.com"
          className="cursor-card__btn cursor-card__btn--primary"
        >
          Get in touch
        </Link>
        <a
          href="https://github.com/Specterr07"
          target="_blank"
          rel="noreferrer"
          className="cursor-card__btn cursor-card__btn--secondary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
}
