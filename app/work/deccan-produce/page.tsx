import type { Metadata } from 'next';
import Link from 'next/link';
import { Barlow_Condensed, Fraunces } from 'next/font/google';
import SiteFooter from '@/components/SiteFooter';
import '../case-study.css';

// Deccan Produce's own faces: Fraunces for statements, Barlow Condensed for signs.
// Only this page loads them (type samples in Design).
const fraunces = Fraunces({ subsets: ['latin'], weight: '600', variable: '--font-fraunces', display: 'swap' });
const barlow = Barlow_Condensed({ subsets: ['latin'], weight: '700', variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  title: 'Deccan Produce - case study · Vivek Patel',
  description:
    'A mobile-first website for an Indian exporter of fresh fruit, fruit pulps and agri commodities: research, design and build.',
};

const IMG = '/work/deccan-produce';

const INSIGHTS = [
  { title: 'Buyers check details', body: 'Range, specs, seasons, certificates and packing. Then they ask for prices.' },
  { title: 'Show the produce', body: "The old site didn't show the fruit well." },
  { title: 'Their words', body: "Keep the site's own content and labels. No invented facts." },
  { title: 'Staff keep it current', body: "Deccan's team must add events and update certificates without a developer." },
];

const PALETTE = ['#B9D4F8', '#1F5BE6', '#0A2FB8', '#005F37', '#DDF247', '#F2F6F5'];

const STEPS = ['Scroll down', 'Field rises', 'Tap a sign', 'It grows into a card', 'Product page'];

const STACK = [
  'Next.js 15 + TypeScript',
  'static pages',
  'CSS Modules + design tokens',
  'self-hosted fonts',
  'typed content files',
  'Vercel',
  'GitHub Actions · checks',
];

const SCREENS = [
  { src: 'card-phone.webp', label: 'sign card', alt: 'A grapes plot sign opened into a product card on a phone' },
  { src: 'product-phone.webp', label: 'product page', alt: 'The grapes product page on a phone, with painted grapes and the page title' },
  { src: 'markets-phone.webp', label: 'dispatch board', alt: 'The dispatch board listing Europe, CIS, Middle East and Far East on a phone' },
];

function Arrow() {
  return (
    <svg className="cs-flow__arrow" width="28" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
      <path d="M1 7H26M20 2L26 7L20 12" />
    </svg>
  );
}

export default function DeccanProduceCaseStudy() {
  return (
    <main className={`cs ${fraunces.variable} ${barlow.variable}`}>
      <span id="top" />

      {/* Hero */}
      <section className="cs-hero">
        <Link href="/#work" className="cs-back">&larr; all work</Link>
        <p className="cs-kicker">Case study</p>
        <h1 className="cs-title">Deccan Produce</h1>
        <p className="cs-lead">
          A <span className="cs-u">mobile-first website</span> for an Indian exporter of fresh fruit, fruit pulps and agri commodities.
        </p>
        <ul className="cs-chips" aria-label="Project details">
          <li>client · Deccan Produce</li>
          <li>role · design + development</li>
          <li>oct 2026</li>
        </ul>

        <div className="cs-devices">
          <div className="cs-laptop">
            <div className="cs-laptop__screen">
              <img src={`${IMG}/hero-desktop.webp`} width={1600} height={1000} alt="Deccan Produce home page on desktop: the title with a painted grape vine over a blue sky, and a farm field with plot signs below" />
            </div>
            <div className="cs-laptop__base" />
          </div>
          <div className="cs-phone cs-phone--hero">
            <img src={`${IMG}/hero-phone.webp`} width={780} height={1688} alt="Deccan Produce home page on a phone" />
          </div>
        </div>
      </section>

      {/* 01 Brief */}
      <section className="cs-section cs-section--narrow">
        <p className="cs-kicker">01 · The brief</p>
        <p className="cs-big">
          Deccan Produce has exported fruit from India since 1997. Their site was hard to use on a phone, hard to
          update, and still listed expired certificates. Importers checking a supplier got{' '}
          <span className="cs-u">a weak first impression.</span>
        </p>
        <figure className="cs-figure">
          <div className="cs-shot">
            <img src={`${IMG}/old-desktop.webp`} width={1400} height={733} loading="lazy" alt="The old Deccan Produce home page: a green menu bar, a mango pulp slider and event posters" />
          </div>
          <figcaption className="cs-caption">The old site: a slider, event posters, and news that stops at 2023.</figcaption>
        </figure>
      </section>

      {/* 02 Research */}
      <section className="cs-section">
        <p className="cs-kicker">02 · Research</p>
        <h2 className="cs-h2">Who visits an exporter&apos;s website?</h2>
        <p className="cs-sub">
          An importer in Europe, the CIS, the Middle East or the Far East, checking a supplier before asking for prices.
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
          A farm you can scroll: <span className="cs-u">sky, field and plot signs.</span>
        </h2>
        <p className="cs-sub">Every product stands in the field as a plot sign, like a demonstration farm.</p>

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
            <p className="cs-panel__note">sky #0A2FB8 · #1F5BE6 · #B9D4F8 · green #005F37 · lime #DDF247</p>
            <p className="cs-panel__label cs-panel__label--gap">type</p>
            <p className="cs-sample cs-sample--fraunces">Deccan Produce</p>
            <p className="cs-sample cs-sample--barlow">Plot 04 · Grapes</p>
            <p className="cs-panel__note">Fraunces for statements, Barlow Condensed for signs, Figtree for reading</p>
          </div>

          <div className="cs-panel">
            <p className="cs-panel__label">tried vs. chose</p>
            <div className="cs-tried">
              <div>
                <div className="cs-tried__old" aria-hidden="true"><span>framed farm photo</span></div>
                <p className="cs-tried__label cs-tried__label--no">framed photo hero</p>
              </div>
              <div>
                <div className="cs-tried__shot">
                  <img src={`${IMG}/field-desktop.webp`} width={1600} height={1000} loading="lazy" alt="The chosen hero: blue sky over a farm field with a Welcome sign and plot signs" />
                </div>
                <p className="cs-tried__label">sky + field + signs</p>
              </div>
            </div>
            <p className="cs-panel__body">A cool, sky-first scene instead of a warm photo, so the products could live inside it.</p>
          </div>
        </div>
      </section>

      {/* 04 Build */}
      <section className="cs-section">
        <p className="cs-kicker">04 · Build</p>
        <h2 className="cs-h2">From a field of signs to a product page.</h2>
        <p className="cs-sub">
          Designed as HTML prototypes first, then built in Next.js. The hero is one scroll, and every sign opens into its product.
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
          A phone-first site where an importer goes from a field of signs to specs, seasons and certificates in a few taps.
        </p>
        <div className="cs-stats">
          <div>
            <p className="cs-stat">11 products</p>
            <p className="cs-stat__note">one product template, filled from Deccan&apos;s own site</p>
          </div>
          <div>
            <p className="cs-stat">8 certificates</p>
            <p className="cs-stat__note">each linked to Deccan&apos;s own PDF</p>
          </div>
        </div>
        <p className="cs-status">
          Status: live preview, kept out of search until launch. The CMS comes next, then the move to deccanproduce.com.
        </p>
      </section>

      {/* Next */}
      <section className="cs-section cs-next">
        <p className="cs-kicker">Keep exploring</p>
        <div className="resumes">
          <Link className="resume" href="/work/mr-plastic-repair">
            <span className="resume__tag">next project</span>
            <span className="resume__name">Mr. Plastic Repair</span>
            <span className="resume__meta">phone-first site for a Toronto bumper welding shop</span>
            <svg className="resume__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7H17V15" />
            </svg>
          </Link>
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
