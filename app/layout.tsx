import type { Metadata, Viewport } from 'next';
import { Gaegu, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SiteNav from '@/components/SiteNav';
import AmbientSound from '@/components/AmbientSound';
import SiteCursor from '@/components/SiteCursor';
import { SITE_URL, socialMeta } from '@/lib/seo';

// Gaegu: hand-drawn display face for the name and headings.
const gaegu = Gaegu({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-gaegu',
  display: 'swap',
});

// JetBrains Mono: everything else — the "engineer" voice.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const TITLE = 'Vivek Patel - software developer.';
const DESCRIPTION =
  'Software developer, engineer, with a creative head. Beamed down to Mumbai.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  ...socialMeta({ title: TITLE, description: DESCRIPTION, path: '/' }),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // let content go under the notch / home indicator; CSS uses env(safe-area-*)
  viewportFit: 'cover',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${gaegu.variable} ${mono.variable}`}>
      <body>
        <SiteCursor />
        <SiteNav />
        <AmbientSound />
        {children}
      </body>
    </html>
  );
}
