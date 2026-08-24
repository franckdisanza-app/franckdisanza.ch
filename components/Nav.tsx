'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getContent } from '@/lib/content';

const c = getContent();

export default function Nav() {
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-noir/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-blanc"
        >
          Franck Di Sanza
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navigation principale">
          {c.nav.links.map((l) => (
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

        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-10 w-10 items-center justify-center"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? c.nav.menuClose : c.nav.menuOpen}
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
        className="border-t border-blanc/10 bg-noir px-5 pb-8 pt-6 md:hidden"
      >
        <nav className="flex flex-col gap-5" aria-label="Navigation mobile">
          {c.nav.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-display text-2xl font-extrabold uppercase tracking-tight text-blanc"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={c.nav.cta.href}
            className="font-display text-2xl font-extrabold uppercase tracking-tight text-rouge"
          >
            {c.nav.cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
