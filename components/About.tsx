import Photo from '@/components/Photo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

export default function About({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const a = c.about;

  return (
    <section id="parcours" className="scroll-mt-20 bg-blanc py-20 md:py-28">
      <div className="wrap">
        <div className="flex items-baseline gap-4 border-b border-gris-clair pb-5">
          <span className="font-display text-xs font-extrabold text-rouge">{a.num}</span>
          <h2 className="eyebrow font-sans text-noir">{a.eyebrow}</h2>
        </div>

        {/* La fiche s'étire sur la hauteur de la photo : les lignes se
            répartissent d'elles-mêmes, sans vide sous le tableau. */}
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1fr_0.72fr] lg:gap-20">
          <dl className="flex flex-col border-b border-gris-clair">
            {a.facts.map((f) => (
              <div
                key={f.label}
                className="flex flex-1 flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-gris-clair py-4"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gris-moyen">
                  {f.label}
                </dt>
                <dd className="text-right">
                  <span className="font-display text-base font-bold tracking-tight md:text-lg">
                    {f.value}
                  </span>
                  {f.note && (
                    <span className="mt-0.5 block text-xs text-gris-moyen">{f.note}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <Photo
            image={a.image}
            className="aspect-[3/4] w-full"
            sizes="(min-width: 1024px) 34vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
