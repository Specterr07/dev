import UfoHero from '@/components/UfoHero';
import AboutSection from '@/components/AboutSection';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <main>
      <span id="top" />
      <UfoHero />
      <span id="about" />
      <AboutSection />
      <SiteFooter />
    </main>
  );
}
