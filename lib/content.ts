import { notFound } from 'next/navigation';

import de from '@/data/de.json';
import en from '@/data/en.json';
import fr from '@/data/fr.json';
import partners from '@/data/partners.json';
import { isLocale, type Locale } from '@/lib/i18n';

/**
 * Contenu du site.
 *
 * Toute la copie vit dans `/data/<langue>.json` — aucun texte n'est écrit en dur
 * dans les composants. Les trois fichiers ont exactement la même structure :
 * le français fait référence, et `npm run typecheck` signale toute clé manquante
 * dans `en.json` ou `de.json`.
 *
 * À n'importer que depuis des composants serveur : les composants client
 * reçoivent le morceau de contenu dont ils ont besoin en props.
 */

export type Content = typeof fr;

const dictionaries: Record<Locale, Content> = { fr, en, de };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

/** Valide le paramètre `[locale]` d'une route ; 404 s'il est inconnu. */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

/**
 * Partenaires.
 *
 * Ils vivent dans `/data/partners.json` et non dans les fichiers de langue : un
 * partenaire s'ajoute à un seul endroit, ses textes dans les trois langues côte
 * à côte. `npm run typecheck` signale une traduction manquante.
 */
type Localized = Record<Locale, string>;

type PartnerEntry = {
  name: string;
  /** Logo dans `/public` (SVG ou PNG). `null` : le nom s'affiche à la place. */
  logo: string | null;
  /** Site du partenaire, dans chaque langue. */
  url: Localized | null;
  category: Localized;
  text: Localized;
};

const partnerEntries: PartnerEntry[] = partners;

export type Partner = {
  name: string;
  logo: string | null;
  url: string | null;
  category: string;
  text: string;
};

export function getPartners(locale: Locale): Partner[] {
  return partnerEntries.map((p) => ({
    name: p.name,
    logo: p.logo,
    url: p.url?.[locale] ?? null,
    category: p.category[locale],
    text: p.text[locale],
  }));
}

export type Link = { label: string; href: string };
export type ImageSlot = { src: string | null; alt: string; placeholder: string };
