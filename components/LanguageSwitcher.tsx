'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { LANGUAGES, LOCALES, localizeHref, stripLocale, type Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  /** Libellé accessible du bouton (« Changer de langue »). */
  label: string;
  /** Appelé à l'ouverture : la navigation en profite pour fermer le menu mobile. */
  onOpen?: () => void;
};

/**
 * Sélecteur de langue : un bouton qui déroule la liste des langues.
 * Chaque entrée mène à la même page dans l'autre langue (`/sponsor` →
 * `/en/sponsor`), sans remonter en haut de la page.
 */
export default function LanguageSwitcher({ locale, label, onOpen }: Props) {
  const pathname = usePathname();
  const path = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => setOpen(false), [pathname]);

  // Fermeture : clic ou focus en dehors, touche Échap.
  useEffect(() => {
    if (!open) return;

    const onOutside = (event: Event) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };

    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function toggle() {
    if (!open) onOpen?.();
    setOpen(!open);
  }

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label} — ${LANGUAGES[locale].name}`}
        className="flex h-10 items-center gap-1.5 px-2 text-blanc/80 transition-colors hover:text-blanc aria-expanded:text-blanc"
      >
        {/* Globe masqué sur les tout petits écrans (< 360 px), où l'en-tête est à l'étroit. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="hidden h-4 w-4 min-[360px]:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <circle cx="8" cy="8" r="6.5" />
          <path d="M1.5 8h13M8 1.5c1.8 1.8 2.7 4 2.7 6.5S9.8 12.7 8 14.5M8 1.5C6.2 3.3 5.3 5.5 5.3 8s.9 4.7 2.7 6.5" />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-[0.14em]">{locale}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={`h-1.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute right-0 top-full mt-2 min-w-44 border border-blanc/10 bg-noir py-2 shadow-2xl shadow-noir/60"
      >
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              <Link
                href={localizeHref(l, path)}
                hrefLang={l}
                lang={l}
                scroll={false}
                aria-current={active ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-4 px-4 py-3 text-sm transition-colors hover:bg-blanc/5"
              >
                <span
                  className={`w-5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] ${
                    active ? 'text-rouge' : 'text-gris-moyen group-hover:text-blanc'
                  }`}
                >
                  {l}
                </span>
                <span className={active ? 'text-blanc' : 'text-gris-clair/70 group-hover:text-blanc'}>
                  {LANGUAGES[l].name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
