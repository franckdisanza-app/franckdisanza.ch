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
  [locale]/
    layout.tsx        en-tête, pied de page, polices, métadonnées
    page.tsx          accueil : hero · profil · performances · CTA partenaire
    sponsor/page.tsx  formulaire de contact partenariat
    not-found.tsx     page 404, dans la langue de l'adresse
  sitemap.ts, robots.ts
components/
  Hero.tsx            bandeau d'ouverture (nom, discipline, record)
  LanguageSwitcher.tsx  bouton de choix de la langue (en-tête)
  ...
data/
  fr.json             TOUT le contenu du site, en français (référence)
  en.json             version anglaise
  de.json             version allemande
lib/
  content.ts          chargement du contenu
  i18n.ts             liste des langues, liens par langue
proxy.ts              sert le français sans préfixe d'URL
public/images/        photos (voir le README du dossier)
```

## Langues

Le site existe en **français** (langue par défaut), **anglais** et **allemand** :

| Page        | Français   | Anglais       | Allemand      |
| ----------- | ---------- | ------------- | ------------- |
| Accueil     | `/`        | `/en`         | `/de`         |
| Partenariat | `/sponsor` | `/en/sponsor` | `/de/sponsor` |

Le bouton de langue de l'en-tête (🌐 FR) mène à la même page dans l'autre
langue. Un visiteur arrive toujours en français, sans redirection automatique
selon la langue du navigateur. Chaque page annonce ses équivalents aux moteurs
de recherche (balises `hreflang` et sitemap).

`proxy.ts` sert les pages françaises sans préfixe : `/sponsor` affiche en interne
`/fr/sponsor`, et `/fr/...` redirige vers l'adresse sans préfixe.

L'allemand suit l'usage suisse : « ss » à la place de « ß » (« schliessen »).

## Modifier le contenu

Tout le texte vit dans **`data/fr.json`**, **`data/en.json`** et **`data/de.json`**.
Aucun texte n'est écrit en dur dans les composants.

Les trois fichiers ont **exactement la même structure**. Une modification doit
donc être reportée dans les trois langues. `npm run typecheck` signale toute clé
présente en français mais absente en anglais ou en allemand.

Certaines valeurs ne sont pas du texte mais doivent aussi être identiques dans
les trois fichiers : `src` des photos, `contact`, `site.url`.

Pour ajouter une langue (l'italien par exemple) : créer `data/it.json` sur le
modèle de `fr.json`, puis ajouter `'it'` dans `LOCALES` et `LANGUAGES`
(`lib/i18n.ts`) et dans `dictionaries` (`lib/content.ts`).

## Ajouter les photos

Déposer les fichiers dans `public/images/`, puis renseigner le champ `src` de
l'emplacement correspondant dans les trois fichiers `data/*.json`. Voir
[public/images/README.md](public/images/README.md).

Tant qu'un `src` vaut `null`, une zone grise « Photo à ajouter » est affichée :
aucune image générique n'est utilisée.

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

Si le domaine change, mettre `site.url` à jour dans les trois fichiers `data/*.json` : il alimente
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
`next.config.mjs`, supprimer `proxy.ts`, puis publier le dossier `out/`.
L'optimisation automatique des images est alors désactivée.

Sans `proxy.ts`, les pages françaises sont générées sous `out/fr/`. Il faut alors
une règle de réécriture chez l'hébergeur (`.htaccess` sur Infomaniak) pour que
`/` et `/sponsor` servent `/fr/` et `/fr/sponsor/`.
