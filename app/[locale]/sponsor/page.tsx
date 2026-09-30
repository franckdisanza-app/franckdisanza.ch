import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import { getContent, resolveLocale } from '@/lib/content';
import { alternates } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = getContent(locale);

  return {
    title: c.nav.cta.label,
    description: c.sponsor.form.text,
    alternates: alternates(locale, '/sponsor'),
  };
}

export default async function SponsorPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const c = getContent(locale);
  const f = c.sponsor.form;

  return (
    <section id="contact" className="bg-noir text-blanc">
      <div className="wrap grid gap-12 pb-20 pt-32 md:pb-28 md:pt-44 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div>
          {/* « Contact » porte le titre de la page : discret à l'œil, h1 pour le
              référencement et les lecteurs d'écran. */}
          <h1 className="eyebrow font-sans">{f.eyebrow}</h1>
          <div className="rule-accent mt-5" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-gris-clair">{f.text}</p>

          <div className="mt-10 space-y-4 border-t border-blanc/15 pt-8 text-sm">
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-gris-moyen">
                {f.fields.email.label}
              </span>
              <a
                href={`mailto:${c.contact.email}`}
                className="selectable mt-1 inline-block transition-colors hover:text-rouge"
              >
                {c.contact.email}
              </a>
            </p>
            <p>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-gris-moyen">
                Instagram
              </span>
              <a
                href={c.contact.instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="selectable mt-1 inline-block transition-colors hover:text-rouge"
              >
                {c.contact.instagram.handle}
              </a>
            </p>
          </div>
        </div>

        <ContactForm form={f} email={c.contact.email} />
      </div>
    </section>
  );
}
