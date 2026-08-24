import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import { getContent } from '@/lib/content';

const c = getContent();
const f = c.sponsor.form;

export const metadata: Metadata = {
  title: 'Devenir partenaire',
  description: f.text,
};

export default function SponsorPage() {
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
                E-mail
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

        <ContactForm />
      </div>
    </section>
  );
}
