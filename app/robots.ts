import type { MetadataRoute } from 'next';

import { getContent } from '@/lib/content';

const c = getContent();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${c.site.url}/sitemap.xml`,
  };
}
