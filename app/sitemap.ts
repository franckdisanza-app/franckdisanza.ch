import type { MetadataRoute } from 'next';

import { getContent } from '@/lib/content';
import { DEFAULT_LOCALE, LOCALES, alternates } from '@/lib/i18n';

const c = getContent(DEFAULT_LOCALE);

const PAGES = [
  { path: '/', priority: 1 },
  { path: '/partners', priority: 0.8 },
  { path: '/sponsor', priority: 0.8 },
];

// Une entrée par page et par langue, chacune listant ses équivalents.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    LOCALES.map((locale) => {
      const { canonical, languages } = alternates(locale, path);
      return {
        url: absolute(canonical),
        changeFrequency: 'monthly' as const,
        priority,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languages).map(([lang, href]) => [lang, absolute(href)]),
          ),
        },
      };
    }),
  );
}

function absolute(path: string) {
  return new URL(path, c.site.url).href.replace(/\/$/, '');
}
