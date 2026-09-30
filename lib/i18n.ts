/**
 * Langues du site.
 *
 * Ce module ne contient aucun texte du site : il peut être importé partout,
 * y compris dans les composants client et dans `proxy.ts`, sans embarquer les
 * fichiers de contenu dans le JavaScript envoyé au navigateur.
 *
 * Le français, langue par défaut, vit à la racine (`/`, `/sponsor`) ; les autres
 * langues sont préfixées (`/en`, `/de/sponsor`).
 */

export const LOCALES = ['fr', 'en', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

/** Nom de chaque langue, écrit dans cette langue, et locale Open Graph. */
export const LANGUAGES: Record<Locale, { name: string; ogLocale: string }> = {
  fr: { name: 'Français', ogLocale: 'fr_CH' },
  en: { name: 'English', ogLocale: 'en_GB' },
  de: { name: 'Deutsch', ogLocale: 'de_CH' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Adapte un lien interne à la langue : `/sponsor` → `/en/sponsor`.
 * Les ancres (`#performances`) et les liens externes sont rendus tels quels.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/') || locale === DEFAULT_LOCALE) return href;
  return href === '/' ? `/${locale}` : `/${locale}${href}`;
}

/** Retire le préfixe de langue d'un chemin : `/en/sponsor` → `/sponsor`. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  return isLocale(first) ? `/${rest.join('/')}` : pathname;
}

/** URL canonique et équivalents dans les autres langues (balises hreflang). */
export function alternates(locale: Locale, path: string) {
  return {
    canonical: localizeHref(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localizeHref(l, path)])),
      'x-default': path,
    },
  };
}
