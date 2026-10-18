import UfoHero from '@/components/UfoHero';
import AboutSection from '@/components/AboutSection';
import WorkSection from '@/components/WorkSection';
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
      <SiteFooter />
    </main>
  );
}
