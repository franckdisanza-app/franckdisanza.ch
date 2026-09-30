import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getContent, getPartners, resolveLocale, type Partner } from '@/lib/content';
import { alternates, localizeHref } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const p = getContent(locale).partners;

  return {
    title: p.eyebrow,
    description: p.text,
    alternates: alternates(locale, '/partners'),
  };
}

export default async function PartnersPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const p = getContent(locale).partners;
  const partners = getPartners(locale);

  return (
    <>
      <section className="bg-noir text-blanc">
        <div className="wrap pb-16 pt-32 md:pb-24 md:pt-44">
          <p className="eyebrow">{p.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold uppercase leading-[1.04]">
            {p.title}
          </h1>
          <div className="rule-accent mt-7" />
          <p className="mt-6 max-w-xl text-[15px] text-gris-clair md:text-base">{p.text}</p>
        </div>
      </section>

      {/* Une ligne par partenaire. Mobile : tout empilé. Tablette : logo à
          gauche, nom et lien à droite. Ordinateur : logo · nom · lien sur une
          ligne. La page tient avec un seul partenaire comme avec dix. */}
      <section className="bg-blanc py-16 md:py-24">
        <ul className="wrap">
          {partners.map((partner) => (
            <li
              key={partner.name}
              className="grid gap-6 border-b border-gris-clair py-10 first:border-t md:grid-cols-[16rem_minmax(0,1fr)] md:items-center md:gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-16"
            >
              <PartnerLogo partner={partner} />

              <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                <div className="min-w-0">
                  <p className="eyebrow hyphens-auto wrap-break-word">{partner.category}</p>
                  <h2 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold uppercase leading-[1.05]">
                    {partner.name}
                  </h2>
                </div>

                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-dark shrink-0"
                  >
                    {p.visit}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-anthracite text-blanc">
        <div className="wrap flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold uppercase leading-[1.05]">
              {p.cta.title}
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-gris-clair">{p.cta.text}</p>
          </div>
          <Link href={localizeHref(locale, p.cta.href)} className="btn btn-primary shrink-0">
            {p.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}

/** Logo sur fond clair ; tant qu'il manque, le nom du partenaire en tient lieu. */
function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="relative flex aspect-[3/2] items-center justify-center bg-gris-clair/60">
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="(min-width: 1024px) 20rem, (min-width: 768px) 16rem, 100vw"
          className="object-contain p-10 md:p-7 lg:p-8"
        />
      ) : (
        <span
          aria-hidden="true"
          className="px-6 text-center font-display text-3xl font-black tracking-tight text-noir md:text-4xl"
        >
          {partner.name}
        </span>
      )}
    </div>
  );
}
