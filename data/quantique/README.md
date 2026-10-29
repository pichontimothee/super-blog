# Veille Numérique quantique — contenu dynamique des axes

Ce dossier pilote le **contenu dynamique des axes** de `quantique-v2.html`
(l'original `quantique.html` garde, lui, ses axes écrits en dur = backup).

## Fichiers

- **`veille.json`** — fichier **maître** lu par la page. Décrit les axes
  (titre, objectif, sous-sections). Champ `derniereMaj` horodaté.
- **`archives/veille-AAAA-MM-JJ.json`** — **snapshots figés**. Un fichier par mise à
  jour (manuelle ou via n8n). Historique immuable (ne jamais les modifier).

## Structure

```json
{
  "derniereMaj": "2026-10-02T10:00:00+02:00",
  "axes": [
    {
      "id": "axe1",
      "numero": "Axe 1",
      "titre": "Titre de l'axe",
      "objectif": "texte de l'objectif (HTML simple autorisé : <em>…</em>)",
      "horodatage": "2026-10-02T10:00:00+02:00",
      "blocs": [ /* voir types ci-dessous */ ]
    }
  ]
}
```

### Types de blocs (`blocs[]`)

| type        | champs                              | rendu                                  |
|-------------|-------------------------------------|----------------------------------------|
| `section`   | `sousTitre`, `texte` (HTML)         | titre `h3` + contenu (le plus courant) |
| `split`     | `sousTitre`, `texte` (HTML), `image`| texte à gauche, image à droite         |
| `image`     | `src`, `alt`, `petit` (bool)        | image seule (`petit` = plus petite)    |
| `focus`     | `tag`, `titre`, `texte` (HTML)      | encadré « Focus entreprise »           |

Le `texte` accepte du HTML simple : `<p>`, `<ul><li>`, `<strong>`, `<em>`, `<sup>`.

## Procédure de mise à jour (manuelle ou n8n)

1. Modifier / ajouter le contenu dans `veille.json`.
   Pour l'automatisation, le cas courant est d'**ajouter un bloc `section`** à un axe.
2. Mettre à jour `derniereMaj` (et le `horodatage` de l'axe modifié).
3. Écrire une copie complète dans `archives/veille-<date-du-jour>.json`.
4. Commit + push.

### Convention n8n
- Le workflow dépose son résultat **validé** dans `veille.json`
  **et** écrit le snapshot daté dans `archives/`.
- Toujours garder une trace de la source réelle (anti-hallucination).

## Important
- La page **lit ce JSON via `fetch`** : elle doit être servie en **HTTP**
  (site en ligne ou serveur local). En double-clic `file://`, le navigateur bloque
  la lecture du JSON et un message d'erreur s'affiche à la place des axes.
