import { NextResponse, type NextRequest } from 'next/server';

import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n';

/**
 * Routage des langues.
 *
 * Toutes les pages vivent sous `app/[locale]/`. Le français, langue par défaut,
 * est servi sans préfixe : `/sponsor` affiche en interne `/fr/sponsor`, sans
 * changer l'adresse dans le navigateur. `/fr/...` redirige vers l'adresse sans
 * préfixe, pour qu'une page n'ait qu'une seule URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split('/');

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Tout sauf les fichiers internes de Next.js et les fichiers statiques
  // (images, favicon, robots.txt, sitemap.xml… : tout ce qui contient un point).
  matcher: ['/((?!_next|.*\\..*).*)'],
};
