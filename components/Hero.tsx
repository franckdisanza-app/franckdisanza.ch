import Link from 'next/link';

import Photo from '@/components/Photo';
import { getContent } from '@/lib/content';

const c = getContent();

export default function Hero() {
  const h = c.hero;

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-noir text-blanc">
      {/* Photo plein cadre */}
      <div className="absolute inset-0 -z-10">
        <Photo
          image={h.image}
          className="h-full w-full"
          sizes="100vw"
          objectPosition="36% 30%"
          priority
          dark
        />
        {/* Voile : la photo est claire et chargée (public, banderoles), il faut
            deux couches pour que le texte et le chiffre restent lisibles. */}
        <div className="absolute inset-0 bg-noir/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/75 to-noir/20" />
      </div>

      <div className="wrap pb-14 pt-32 md:pb-20 md:pt-40">
        <h1 className="anim-fade-up font-display text-[clamp(2.75rem,10vw,7rem)] font-black uppercase leading-[0.92]">
          Franck
          <br />
          Di Sanza
        </h1>

        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="anim-fade-up max-w-md">
            <div className="rule-accent" />
            <p className="mt-5 text-base text-gris-clair md:text-lg">{h.discipline}</p>
            <p className="mt-3 text-sm text-gris-moyen">{h.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={h.ctaPrimary.href} className="btn btn-primary">
                {h.ctaPrimary.label}
              </Link>
              <Link href={h.ctaSecondary.href} className="btn btn-outline text-blanc">
                {h.ctaSecondary.label}
              </Link>
            </div>
          </div>

          {/* Chiffre héros */}
          <div className="anim-fade-up border-t border-blanc/15 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gris-moyen">
              {h.record.label}
            </p>
            <p className="num mt-3 text-[clamp(3.5rem,14vw,6.5rem)]">
              {h.record.value}
              <span className="ml-1 text-[0.42em] font-extrabold text-rouge">{h.record.unit}</span>
            </p>
            <p className="mt-3 text-xs text-gris-moyen">{h.record.meta}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
