import Link from 'next/link';
import { locale as rootLocale } from 'next/root-params';

import { getContent } from '@/lib/content';
import { DEFAULT_LOCALE, isLocale, localizeHref } from '@/lib/i18n';

export default async function NotFound() {
  const param = await rootLocale();
  const locale = isLocale(param) ? param : DEFAULT_LOCALE;
  const n = getContent(locale).notFound;

  return (
    <section className="bg-noir text-blanc">
      <div className="wrap flex min-h-[80svh] flex-col justify-center pb-20 pt-32 md:pt-44">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[1.04]">
          {n.title}
        </h1>
        <div className="rule-accent mt-7" />
        <p className="mt-6 max-w-md text-[15px] text-gris-clair md:text-base">{n.text}</p>
        <Link href={localizeHref(locale, '/')} className="btn btn-primary mt-9 self-start">
          {n.cta}
        </Link>
      </div>
    </section>
  );
}
