import Link from 'next/link';

// Case studies. Add a project here once its page exists under app/work/<slug>.
const WORK = [
  {
    slug: 'mr-plastic-repair',
    name: 'Mr. Plastic Repair',
    meta: 'phone-first site for a Toronto bumper welding shop',
    img: '/work/mr-plastic-repair/hero-desktop.webp',
  },
];

export default function WorkSection() {
  return (
    <section className="work" aria-labelledby="work-heading">
      <p className="about__kicker" id="work-heading">Selected work</p>
      <div className="work__grid">
        {WORK.map((w) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className="work-card">
            <span className="work-card__shot">
              <img src={w.img} width={1600} height={1000} alt="" loading="lazy" />
            </span>
            <span className="resume__tag">case study</span>
            <span className="work-card__name">{w.name}</span>
            <span className="resume__meta">{w.meta}</span>
            <svg className="resume__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M9 7H17V15" />
            </svg>
          </Link>
        ))}
        <div className="work-card work-card--soon">
          <span className="resume__tag">next up</span>
          <span className="work-card__name">Deccan Produce</span>
          <span className="resume__meta">case study coming soon</span>
        </div>
      </div>
    </section>
  );
}
