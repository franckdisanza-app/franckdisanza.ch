import type { MetadataRoute } from 'next';

import { getContent } from '@/lib/content';
import { DEFAULT_LOCALE } from '@/lib/i18n';

const c = getContent(DEFAULT_LOCALE);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${c.site.url}/sitemap.xml`,
  };
}
