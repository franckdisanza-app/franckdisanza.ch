import Image from 'next/image';

import type { ImageSlot } from '@/lib/content';

type Props = {
  image: ImageSlot;
  /** Classes du conteneur — c'est lui qui porte le ratio (ex: `aspect-[3/4]`). */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Point d'ancrage du recadrage, ex. `38% 50%`. */
  objectPosition?: string;
  /** Variante sombre du placeholder, pour les sections noires. */
  dark?: boolean;
};

/**
 * Emplacement photo.
 *
 * Tant que `image.src` est `null` dans `/data/*.json`, une zone grise
 * explicitement identifiée est affichée. Aucune image générique n'est utilisée.
 * Pour publier une vraie photo : la déposer dans `/public/images/` puis
 * renseigner `"src": "/images/mon-fichier.jpg"` dans les fichiers de contenu.
 */
export default function Photo({
  image,
  className = '',
  sizes,
  priority,
  objectPosition,
  dark,
}: Props) {
  const base = `relative overflow-hidden ${className}`;

  if (!image.src) {
    return (
      <div
        className={`${base} ${dark ? 'bg-anthracite' : 'bg-gris-clair'} flex items-center justify-center`}
        role="img"
        aria-label={image.alt}
      >
        <div className="px-6 text-center">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-rouge">
            Photo à ajouter
          </span>
          <span className="mt-2 block max-w-[22ch] text-xs text-gris-moyen">{image.placeholder}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={base}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes ?? '(min-width: 1024px) 50vw, 100vw'}
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
