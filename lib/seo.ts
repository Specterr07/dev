import type { Metadata } from 'next';

// Shared link-preview (Open Graph / Twitter card) settings. Next merges metadata
// shallowly, so a page that sets `openGraph` or `twitter` replaces the layout's
// whole object — every page builds both from here to keep the image and site name.

export const SITE_URL = 'https://vpcodes.in';
export const SITE_NAME = 'Vivek Patel';

// public/og.png — 1200×630. Re-render it if the case studies change (see CHANGELOG).
export const OG_IMAGE = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Vivek Patel, software engineer in Mumbai. Case studies: Mr. Plastic Repair and Deccan Produce.',
};

export function socialMeta({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
}): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_IN',
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
