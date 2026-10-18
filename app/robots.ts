import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Built to /robots.txt. Everything is open to crawlers (search and AI alike);
// /llms.txt is the plain-text summary meant for LLMs.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
