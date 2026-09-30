'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import type { Content } from '@/lib/content';
import { localizeHref, type Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  nav: Content['nav'];
};

export default function Nav({ locale, nav }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = nav.links.map((l) => ({ ...l, href: localizeHref(locale, l.href) }));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-noir/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href={localizeHref(locale, '/')}
          className="whitespace-nowrap font-display text-sm font-extrabold uppercase tracking-[0.12em] text-blanc"
        >
          Franck Di Sanza
        </Link>

        <div className="flex items-center gap-1 md:gap-8">
          <nav className="hidden items-center gap-10 md:flex" aria-label={nav.mainLabel}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href ? 'text-blanc' : 'text-gris-clair/70 hover:text-blanc'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="md:-mr-2 md:border-l md:border-blanc/15 md:pl-6">
            <LanguageSwitcher locale={locale} label={nav.languageLabel} onOpen={() => setOpen(false)} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? nav.menuClose : nav.menuOpen}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-blanc transition-transform duration-200 ${
                  open ? 'top-[5px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-6 bg-blanc transition-transform duration-200 ${
                  open ? 'top-[5px] -rotate-45' : 'top-[10px]'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-blanc/10 bg-noir px-5 pb-8 pt-6 md:hidden"
      >
        <nav className="flex flex-col gap-5" aria-label={nav.mobileLabel}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl font-extrabold uppercase tracking-tight text-blanc"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={localizeHref(locale, nav.cta.href)}
            onClick={() => setOpen(false)}
            className="font-display text-2xl font-extrabold uppercase tracking-tight text-rouge"
          >
            {nav.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
