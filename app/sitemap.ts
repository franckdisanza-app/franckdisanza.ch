import type { MetadataRoute } from 'next';

import { getContent } from '@/lib/content';

const c = getContent();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: c.site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${c.site.url}/sponsor`, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
