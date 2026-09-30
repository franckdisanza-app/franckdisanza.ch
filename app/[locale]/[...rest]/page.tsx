import { notFound } from 'next/navigation';

// Toute adresse inconnue aboutit ici : la 404 s'affiche alors dans la langue de
// l'adresse, avec l'en-tête et le pied de page du site (voir `../not-found.tsx`).
export const dynamicParams = true;

export default function UnknownPage() {
  notFound();
}
