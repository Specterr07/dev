import type { Metadata, Viewport } from 'next';
import { Aboreto } from 'next/font/google';
import './globals.css';
import SiteNav from '@/components/SiteNav';
import RotateGate from '@/components/RotateGate';
import AmbientSound from '@/components/AmbientSound';

// Aboreto only ships a single 400 weight — that's all we need.
const aboreto = Aboreto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-aboreto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vpcodes.in'),
  title: 'Namaste! - VP',
  description:
    'Software developer, engineer, with a creative head. A scroll-driven cinematic portfolio.',
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
    <html lang="en" className={aboreto.variable}>
      <body>
        <RotateGate />
        <SiteNav />
        <AmbientSound />
        {children}
      </body>
    </html>
  );
}
