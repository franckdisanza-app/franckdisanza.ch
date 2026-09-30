import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/i18n';

export default function Stats({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const p = c.performance;

  return (
    <section id="performances" className="scroll-mt-20 bg-anthracite py-20 text-blanc md:py-28">
      <div className="wrap">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-xs font-extrabold text-rouge">{p.num}</span>
          <p className="eyebrow">{p.eyebrow}</p>
        </div>

        <h2 className="mt-6 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold uppercase leading-[1.05]">
          {p.statsTitle}
        </h2>

        <dl className="mt-10 grid grid-cols-2 gap-px border border-blanc/10 bg-blanc/10 md:mt-14 lg:grid-cols-3">
          {p.stats.map((s) => (
            <div key={s.label} className="bg-anthracite px-3 py-8 text-center sm:px-5 md:px-6 md:py-12">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="num block text-[clamp(2rem,7vw,3.25rem)]">{s.value}</span>
                <span className="mt-3 block hyphens-auto text-[10px] uppercase tracking-[0.1em] text-gris-moyen wrap-break-word md:text-[11px]">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
