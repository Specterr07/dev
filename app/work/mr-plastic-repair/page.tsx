import type { Metadata } from 'next';
import Link from 'next/link';
import { Anton } from 'next/font/google';
import SiteFooter from '@/components/SiteFooter';
import '../case-study.css';

// Anton is Mr. Plastic Repair's headline face; only this page loads it (type sample in Design).
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });

export const metadata: Metadata = {
  title: 'Mr. Plastic Repair - case study · Vivek Patel',
  description:
    'A phone-first website for a one-man bumper welding shop in Toronto: research, design and build.',
};

const IMG = '/work/mr-plastic-repair';

const INSIGHTS = [
  { title: 'Phone first', body: 'Most visitors arrive on a phone, right after the damage.' },
  { title: 'Quotes start with a photo', body: 'The old site hid that step behind everything else.' },
  { title: 'The copy was good', body: "Keep James's words. No new claims." },
  { title: 'Trust needs proof', body: 'Real before/after photos and real reviews.' },
];

const PALETTE = ['#DCE6FF', '#7C97F0', '#3E5BD0', '#1C2AA8', '#F7BE00', '#FFFFFF', '#000000'];

const STEPS = ['Upload photos', 'Name + phone', 'Send to James', 'WhatsApp opens', 'James replies'];

const STACK = [
  'React + Vite + TypeScript',
  'pre-rendered homepage',
  'Hono API',
  'Cloudflare Workers',
  'R2 · photos',
  'D1 · enquiries',
  'Access · /admin',
];

const SCREENS = [
  { src: 'halfday-phone.webp', label: 'how it works', alt: 'Half Day Bumper section with the four how-it-works steps' },
  { src: 'form-photo-phone.webp', label: 'quote form', alt: 'Quote form with one photo added and the Send to James button' },
  { src: 'done-phone.webp', label: 'one last tap', alt: 'One last tap screen showing the ready-made WhatsApp message to James' },
];

function Arrow() {
  return (
    <svg className="cs-flow__arrow" width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
      <path d="M1 7H26M20 2L26 7L20 12" />
    </svg>
  );
}

export default function MrPlasticRepairCaseStudy() {
  return (
    <main className={`cs ${anton.variable}`}>
      <span id="top" />

      {/* Hero */}
      <section className="cs-hero">
        <Link href="/#work" className="cs-back">&larr; all work</Link>
        <p className="cs-kicker">Case study</p>
        <h1 className="cs-title">Mr. Plastic Repair</h1>
        <p className="cs-lead">
          A <span className="cs-u">phone-first website</span> for a one-man bumper welding shop in Toronto.
        </p>
        <ul className="cs-chips" aria-label="Project details">
          <li>client · Mr. Plastic Repair</li>
          <li>role · design + development</li>
          <li>oct 2026</li>
        </ul>

        <div className="cs-devices">
          <div className="cs-laptop">
            <div className="cs-laptop__screen">
              <img src={`${IMG}/hero-desktop.webp`} width={1600} height={1000} alt="Mr. Plastic Repair homepage on desktop: giant wordmark over a blue ribbon with a Send a photo for a quote button" />
            </div>
            <div className="cs-laptop__base" />
          </div>
          <div className="cs-phone cs-phone--hero">
            <img src={`${IMG}/hero-phone.webp`} width={780} height={1688} alt="Mr. Plastic Repair homepage on a phone" />
          </div>
        </div>
      </section>

      {/* 01 Brief */}
      <section className="cs-section cs-section--narrow">
        <p className="cs-kicker">01 · The brief</p>
        <p className="cs-big">
          James runs Mr. Plastic Repair alone in Toronto, welding cracked bumpers back together instead of
          replacing them. His site had great copy, but it buried the one thing customers need to do:{' '}
          <span className="cs-u">send a photo of the damage.</span>
        </p>
        <figure className="cs-figure">
          <div className="cs-phone cs-phone--old">
            <img src={`${IMG}/old-hero-phone.webp`} width={393} height={851} loading="lazy" alt="The old homepage on a phone: centred text, with the phone number and email as plain text halfway down" />
          </div>
          <figcaption className="cs-caption">
            The old site on a phone: no button to start a quote. The phone number and email sit in plain text halfway down.
          </figcaption>
        </figure>
      </section>

      {/* 02 Research */}
      <section className="cs-section">
        <p className="cs-kicker">02 · Research</p>
        <h2 className="cs-h2">Who&apos;s actually on this page?</h2>
        <p className="cs-sub">
          A driver who just cracked a bumper, standing next to the car, on a phone, often just quoted for a full replacement.
        </p>
        <ol className="cs-insights">
          {INSIGHTS.map((it, i) => (
            <li key={it.title} className="cs-card">
              <span className="cs-card__num">0{i + 1}</span>
              <span className="cs-card__title">{it.title}</span>
              <span className="cs-card__body">{it.body}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 03 Design */}
      <section className="cs-section">
        <p className="cs-kicker">03 · Design</p>
        <h2 className="cs-h2">
          One page, one ask: <span className="cs-u">&ldquo;Send a photo for a quote.&rdquo;</span>
        </h2>
        <p className="cs-sub">Every section either builds trust for that ask or repeats it.</p>

        <div className="cs-panels">
          <div className="cs-panel">
            <p className="cs-panel__label">palette</p>
            <ul className="cs-swatches" aria-label="Colour palette">
              {PALETTE.map((c) => (
                <li key={c} style={{ background: c }} title={c}>
                  <span className="sr-only">{c}</span>
                </li>
              ))}
            </ul>
            <p className="cs-panel__note">#DCE6FF · #7C97F0 · #3E5BD0 · #1C2AA8 · #F7BE00</p>
            <p className="cs-panel__label cs-panel__label--gap">type</p>
            <p className="cs-anton">Half Day Bumper</p>
            <p className="cs-panel__note">Anton for headlines, outlined pills for buttons</p>
          </div>

          <div className="cs-panel">
            <p className="cs-panel__label">tried vs. chose</p>
            <div className="cs-tried">
              <div>
                <div className="cs-tried__old" aria-hidden="true"><span>photo + overlay text</span></div>
                <p className="cs-tried__label cs-tried__label--no">photo hero</p>
              </div>
              <div>
                <div className="cs-tried__new" aria-hidden="true">
                  <span className="cs-tried__word">Mr. Plastic<br />Repair</span>
                  <span className="cs-tried__sticker" />
                  <span className="cs-tried__pill">Send a photo</span>
                </div>
                <p className="cs-tried__label">big wordmark + stickers</p>
              </div>
            </div>
            <p className="cs-panel__body">A one-person shop needed to look like a confident local brand, not a stock-photo garage.</p>
          </div>
        </div>

        <div className="cs-panel cs-panel--wide">
          <div className="cs-panel__head">
            <p className="cs-panel__label">our work · old vs. new</p>
            <p className="cs-panel__label">swipe on phones · arrow keys on desktop</p>
          </div>
          <div className="cs-oldnew">
            <figure className="cs-oldnew__old">
              <img src={`${IMG}/old-grid-desktop.webp`} width={1400} height={529} loading="lazy" alt="The old Before and After section: a grid of mixed-size photos with no labels" />
              <figcaption className="cs-caption">old · one grid of mixed-size photos, no labels</figcaption>
            </figure>
            <figure className="cs-oldnew__new">
              <div className="cs-phone">
                <img src={`${IMG}/work-phone.webp`} width={780} height={2119} loading="lazy" alt="The new before and after viewer on a phone" />
              </div>
              <figcaption className="cs-caption cs-caption--bright">new · one labelled pair at a time</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 04 Build */}
      <section className="cs-section">
        <p className="cs-kicker">04 · Build</p>
        <h2 className="cs-h2">From cracked bumper to WhatsApp chat.</h2>
        <p className="cs-sub">
          The form saves the photos, then opens WhatsApp with a ready-made message to James. No paid messaging API,
          no fees, and James gets the customer&apos;s number automatically.
        </p>
        <ol className="cs-flow">
          {STEPS.map((s, i) => (
            <li key={s} className="cs-flow__item">
              <div className={`cs-step${i === STEPS.length - 1 ? ' cs-step--last' : ''}`}>
                <span className="cs-step__num">step {i + 1}</span>
                <span className="cs-step__title">{s}</span>
              </div>
              {i < STEPS.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>
        <p className="cs-kicker cs-kicker--gap">Built with</p>
        <ul className="cs-chips">
          {STACK.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* 05 Result */}
      <section className="cs-section">
        <p className="cs-kicker">05 · Final screens</p>
        <h2 className="cs-h2">The result</h2>
        <div className="cs-screens">
          {SCREENS.map((s) => (
            <figure key={s.src} className="cs-screen">
              <div className="cs-phone">
                <img src={`${IMG}/${s.src}`} width={780} height={1688} loading="lazy" alt={s.alt} />
              </div>
              <figcaption className="cs-caption">{s.label}</figcaption>
            </figure>
          ))}
        </div>
        <p className="cs-big cs-big--gap">
          A phone-first site where a customer goes from a cracked bumper to a WhatsApp chat with James in a few taps.
        </p>
        <div className="cs-stats">
          <div>
            <p className="cs-stat">$0 / mo</p>
            <p className="cs-stat__note">only the domain costs money</p>
          </div>
          <div>
            <p className="cs-stat">his name</p>
            <p className="cs-stat__note">every account is James&apos;s, so handover is just removing my access</p>
          </div>
        </div>
        <p className="cs-status">Status: working demo, going live once James is ready to launch.</p>
      </section>

      {/* Next */}
      <section className="cs-section cs-next">
        <p className="cs-kicker">Keep exploring</p>
        <div className="resumes">
          <div className="resume resume--soon" aria-label="Next project: Deccan Produce, case study coming soon">
            <span className="resume__tag">next project</span>
            <span className="resume__name">Deccan Produce</span>
            <span className="resume__meta">case study coming soon</span>
          </div>
          <a className="resume" href="mailto:patelvivek.v7@gmail.com">
            <span className="resume__tag">need a site like this?</span>
            <span className="resume__name">Say hi</span>
            <span className="resume__meta">patelvivek.v7@gmail.com</span>
            <svg className="resume__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7H17V15" />
            </svg>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
