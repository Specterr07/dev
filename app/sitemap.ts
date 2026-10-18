import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Built to /sitemap.xml. Add a line here for every new page under app/work/.
export const dynamic = 'force-static';

const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/work/mr-plastic-repair', priority: 0.8 },
  { path: '/work/deccan-produce', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === '/' ? '' : p.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: p.priority,
  }));
}
