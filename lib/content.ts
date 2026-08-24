import fr from '@/data/fr.json';
import en from '@/data/en.json';

/**
 * Contenu du site.
 *
 * Toute la copie vit dans `/data/<locale>.json` — aucun texte n'est écrit en dur
 * dans les composants. Pour ajouter l'anglais : remplir `/data/en.json` en
 * reprenant exactement la structure de `/data/fr.json`, rien d'autre à changer.
 */

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

/** La forme du contenu est dérivée du français, qui fait référence. */
export type Content = typeof fr;

const dictionaries: Record<Locale, unknown> = { fr, en };

function isComplete(dict: unknown): dict is Content {
  return typeof dict === 'object' && dict !== null && Object.keys(dict).length > 0;
}

/** Renvoie le contenu de la locale demandée, avec repli sur le français. */
export function getContent(locale: Locale = DEFAULT_LOCALE): Content {
  const dict = dictionaries[locale];
  return isComplete(dict) ? dict : (fr as Content);
}

export type Link = { label: string; href: string };
export type ImageSlot = { src: string | null; alt: string; placeholder: string };
