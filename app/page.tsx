import UfoHero from '@/components/UfoHero';
import AboutSection from '@/components/AboutSection';
import WorkSection from '@/components/WorkSection';
import ThemedCursorCard from '@/components/ThemedCursorCard';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <main>
      <span id="top" />
      <UfoHero />
      <span id="about" />
      <AboutSection />
      <span id="work" />
      <WorkSection />
      <section style={{ padding: '0 clamp(1.1rem, 5vw, 3rem) 7rem' }}>
        <ThemedCursorCard />
      </section>
      <SiteFooter />
    </main>
  );
}
