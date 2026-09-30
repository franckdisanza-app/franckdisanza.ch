import Link from 'next/link';

import Photo from '@/components/Photo';
import { getContent } from '@/lib/content';
import { localizeHref, type Locale } from '@/lib/i18n';

export default function HomeCta({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const h = c.homeCta;

  return (
    <section id="partenariat" className="scroll-mt-20 bg-noir text-blanc">
      <div className="wrap grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">{h.eyebrow}</p>
          <h2 className="mt-6 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[1.04]">
            {h.title}
          </h2>
          <div className="rule-accent mt-7" />
          <p className="mt-6 max-w-md text-[15px] text-gris-clair md:text-base">{h.text}</p>
          <Link href={localizeHref(locale, h.cta.href)} className="btn btn-primary mt-9">
            {h.cta.label}
          </Link>
        </div>

        <Photo
          image={h.image}
          className="aspect-[4/5] w-full"
          sizes="(min-width: 1024px) 45vw, 100vw"
          dark
        />
      </div>
    </section>
  );
}
