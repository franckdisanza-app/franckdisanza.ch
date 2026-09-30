import type { Metadata } from 'next';

import About from '@/components/About';
import Hero from '@/components/Hero';
import HomeCta from '@/components/HomeCta';
import Stats from '@/components/Stats';
import { resolveLocale } from '@/lib/content';
import { alternates } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return { alternates: alternates(locale, '/') };
}

export default async function HomePage({ params }: Props) {
  const locale = await resolveLocale(params);

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <Stats locale={locale} />
      <HomeCta locale={locale} />
    </>
  );
}
