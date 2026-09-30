/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Le projet vit dans un dossier du répertoire utilisateur : on borne
  // explicitement la racine pour que Turbopack n'aille pas chercher plus haut.
  turbopack: { root: import.meta.dirname },

  // Le site est 100 % statique (aucune route dynamique, aucune base de données).
  // Sur Vercel, `next build` génère déjà des pages statiques ET conserve
  // l'optimisation d'images de next/image.
  //
  // Pour un export purement statique (hébergement type Infomaniak / S3 / GitHub Pages),
  // décommenter les deux lignes ci-dessous et supprimer `proxy.ts` (voir README,
  // « Hébergeur statique ») :
  //
  // output: 'export',
  // images: { unoptimized: true },
};

export default nextConfig;
