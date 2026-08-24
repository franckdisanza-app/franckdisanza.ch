import Link from 'next/link';

import { getContent } from '@/lib/content';

const c = getContent();

export default function Footer() {
  return (
    <footer className="border-t border-blanc/10 bg-noir text-blanc">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3 md:py-20">
        <div>
          <p className="font-display text-lg font-extrabold uppercase tracking-[0.08em]">
            {c.site.name}
          </p>
          <p className="mt-2 text-sm text-gris-moyen">{c.footer.tagline}</p>
          <p className="text-sm text-gris-moyen">{c.footer.location}</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gris-moyen">
            {c.footer.contactTitle}
          </p>
          <a
            href={`mailto:${c.contact.email}`}
            className="selectable mt-3 inline-block text-sm text-blanc transition-colors hover:text-rouge"
          >
            {c.contact.email}
          </a>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gris-moyen">
            {c.footer.followTitle}
          </p>
          <a
            href={c.contact.instagram.url}
            target="_blank"
            rel="noreferrer noopener"
            className="selectable mt-3 inline-block text-sm text-blanc transition-colors hover:text-rouge"
          >
            Instagram {c.contact.instagram.handle}
          </a>
        </div>
      </div>

      <div className="wrap flex flex-col gap-3 border-t border-blanc/10 py-6 text-xs text-gris-moyen sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {c.site.name}. {c.footer.rights}
        </p>
        <Link href={c.nav.cta.href} className="transition-colors hover:text-blanc">
          {c.nav.cta.label}
        </Link>
      </div>
    </footer>
  );
}
