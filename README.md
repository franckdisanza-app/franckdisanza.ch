# franckdisanza.ch

Site vitrine de Franck Di Sanza — athlète suisse, lanceur de javelot.
Next.js (App Router) · TypeScript · Tailwind CSS · 100 % statique, sans CMS ni base de données.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

| Commande            | Rôle                              |
| ------------------- | --------------------------------- |
| `npm run dev`       | serveur de développement          |
| `npm run build`     | build de production               |
| `npm run typecheck` | vérification TypeScript           |

## Structure

```
app/
  layout.tsx        en-tête, pied de page, polices, métadonnées
  page.tsx          accueil : hero · profil · performances · CTA partenaire
  sponsor/page.tsx  formulaire de contact partenariat
components/
  Hero.tsx          bandeau d'ouverture (nom, discipline, record)
  ...
data/
  fr.json           TOUT le contenu du site
  en.json           version anglaise (vide pour l'instant)
lib/
  content.ts        chargement du contenu et gestion des langues
public/images/      photos (voir le README du dossier)
```

## Modifier le contenu

Tout le texte vit dans **`data/fr.json`** — aucun texte n'est écrit en dur dans
les composants. Modifier ce fichier suffit à mettre le site à jour.

## Ajouter les photos

Déposer les fichiers dans `public/images/`, puis renseigner le champ `src` de
l'emplacement correspondant dans `data/fr.json`. Voir
[public/images/README.md](public/images/README.md).

Tant qu'un `src` vaut `null`, une zone grise « Photo à ajouter » est affichée :
aucune image générique n'est utilisée.

## Ajouter l'anglais plus tard

1. Copier `data/fr.json` vers `data/en.json` et traduire les valeurs.
2. Le repli automatique vers le français disparaît dès que `en.json` est rempli.
3. Ajouter le routage `/en` (segment `app/[locale]/`) si un site bilingue est souhaité.

## Formulaire de contact

Le formulaire envoie les messages via **Formspree** (`https://formspree.io/f/mdenraeq`).
L'identifiant du formulaire est public par nature — il vit dans
`components/ContactForm.tsx`, il n'y a rien à configurer sur Vercel.

Pour le remplacer sans toucher au code, définir `NEXT_PUBLIC_CONTACT_ENDPOINT`
(voir `.env.example`). Vider la variable fait retomber le formulaire sur un envoi
par client mail.

Le champ `email` sert d'adresse de réponse chez Formspree : répondre à la
notification écrit directement à l'expéditeur. Le champ caché `_gotcha` est un
piège à robots, filtré côté client et côté Formspree.

## Déploiement

Hébergement : **Vercel**. Domaine acheté chez **Infomaniak**.

1. pousser le dépôt sur GitHub ;
2. sur vercel.com, *Add New → Project*, importer le dépôt — Next.js est détecté,
   aucun réglage à changer ;
3. dans *Settings → Domains*, ajouter `franckdisanza.ch` et `www.franckdisanza.ch` ;
   Vercel affiche les enregistrements DNS à créer ;
4. dans le *Manager* Infomaniak → *Noms de domaine* → `franckdisanza.ch` → *DNS*,
   saisir ces enregistrements : un `A` sur `@` vers l'IP indiquée par Vercel, et un
   `CNAME` sur `www` vers `cname.vercel-dns.com.` ;
5. attendre la propagation (quelques minutes à quelques heures) — Vercel installe
   le certificat HTTPS tout seul.

Chaque `git push` sur la branche principale met le site en ligne.

Si le domaine change, mettre `site.url` à jour dans `data/fr.json` : il alimente
les métadonnées de partage, le sitemap et robots.txt.

### Image de partage et favicon

- `public/og.jpg` — vignette 1200×630 affichée sur WhatsApp, LinkedIn, iMessage…
- `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico` — monogramme « FD »

Les deux sont générés depuis les photos et les polices de la charte. Après une
mise à jour de `og.jpg`, les réseaux gardent l'ancienne vignette en cache :
forcer le rafraîchissement sur https://developers.facebook.com/tools/debug/ et
https://www.linkedin.com/post-inspector/.

### Hébergeur statique (alternative)

Décommenter `output: 'export'` et `images: { unoptimized: true }` dans
`next.config.mjs`, puis publier le dossier `out/`. L'optimisation automatique des
images est alors désactivée.
