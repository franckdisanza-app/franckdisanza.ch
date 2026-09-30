# Photos du site

Trois emplacements, trois fichiers. Ils sont branchés dans `/data/fr.json`,
`/data/en.json` et `/data/de.json` (même `src` dans les trois fichiers).

| Fichier                | Où ça s'affiche             | Format servi     | Origine                        |
| ---------------------- | --------------------------- | ---------------- | ------------------------------ |
| `hero-offenburg.jpg`   | image plein écran, accueil  | 1000×667 (3:2)   | `IMG_0235.JPEG` — Offenburg    |
| `portrait.jpg`         | à droite du tableau Profil  | 1400×1867 (3:4)  | `DSC02417.JPEG` — Madrid 2025  |
| `partenaire.jpg`       | bloc « Devenir partenaire » | 1400×1750 (4:5)  | `IMG_2737.JPEG` — Offenburg    |
| `hero-nicosia.jpg`     | *inutilisé* — hero de rechange | 2400×1350 (16:9) | `CHA_5019.JPEG` — Nicosia 2025 |

`hero-offenburg.jpg` n'existe qu'en 1000 px de large : c'est la seule copie
disponible. Sur un grand écran, le navigateur l'agrandit et l'image perd un peu
de netteté. Si une version haute résolution est retrouvée, la déposer ici sous le
même nom — rien d'autre à changer. `hero-nicosia.jpg` est le hero précédent,
conservé comme repli : pour l'utiliser, remettre son chemin dans
`hero.image.src` des trois fichiers `/data/*.json`.

Les originaux pleine résolution sont dans `~/Downloads`. Les fichiers d'ici sont
des recadrages compressés — ne pas les remplacer par les originaux tels quels
(6000 px et plusieurs Mo par image).

## Remplacer une photo

1. déposer le nouveau fichier ici, au bon ratio (voir tableau) ;
2. mettre à jour `src` **et** `alt` dans `/data/fr.json`, `/data/en.json` et
   `/data/de.json` (le texte `alt` se traduit, le `src` reste le même).

Si `src` repasse à `null`, une zone grise « Photo à ajouter » s'affiche à la
place : le site ne montre jamais d'image générique.

## Cadrage

Le hero est recouvert d'un voile sombre, avec le nom en haut et le record en bas
à droite. Le point d'ancrage du recadrage est réglé à `38% 50%` dans
`components/Hero.tsx` pour garder l'athlète dans le cadre sur mobile, où la photo
est fortement rognée sur les côtés. À réajuster si la photo change.

## Recadrer depuis un original

```bash
python -c "from PIL import Image, ImageOps; im=ImageOps.exif_transpose(Image.open('SOURCE.jpg')).convert('RGB').crop((0,0,6000,3375)); im.resize((2400, round(im.height*2400/im.width))).save('hero.jpg', quality=84, optimize=True, progressive=True)"
```

Formats : JPG ou WebP. Éviter le PNG pour les photos.
