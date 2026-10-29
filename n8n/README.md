# Workflow n8n — Veille Quantique (Phase 1 : génération)

Objectif : apprendre n8n en construisant un robot qui **collecte** des actus,
les fait **rédiger par une IA (Gemini)**, génère une **image (Pollinations)** et
produit le **`veille.json`** de la page `quantique-v2.html`.

> Tout est **gratuit** : Google News RSS (sans clé), Gemini (palier gratuit),
> Pollinations (sans clé).

---

## 0. Installer n8n

Deux options :
- **n8n Cloud** (le plus simple) : compte gratuit sur https://n8n.io → espace en ligne.
- **n8n local** (recommandé pour écrire dans le blog en Phase 2) :
  ```bash
  npx n8n
  ```
  puis ouvrir http://localhost:5678

> ⚠️ Pour que n8n puisse **écrire directement dans `E:\blog`** (Phase 2),
> il faut la version **locale**. En Cloud, la publication passera par l'API GitHub.

## 1. Obtenir une clé Gemini (gratuite)

1. Aller sur https://aistudio.google.com/apikey (compte Google).
2. *Create API key* → copier la clé.

## 2. Importer le workflow

Dans n8n : menu **⋮ → Import from File** → choisir `veille-quantique.json`.

## 3. Mettre ta clé

Ouvre le node **« Gemini — rédaction »** → dans les *Headers*, remplace
`VOTRE_CLE_GEMINI_ICI` par ta clé.
*(Mieux : créer une credential « Header Auth » pour ne pas écrire la clé en clair — on verra ça ensemble.)*

## 4. Lancer

Clique **Test workflow** (en bas). Les nodes passent au vert un par un.
Clique sur chaque node pour voir ce qui en sort : c'est la meilleure façon d'apprendre.

---

## Ce que fait chaque node (le parcours des données)

| # | Node | Rôle |
|---|------|------|
| 1 | **Déclencheur manuel** | Lance le workflow à la main (plus tard : un *Schedule* hebdo) |
| 2 | **RSS — actus quantique** | Récupère les dernières actus (Google News, requête « informatique quantique ») |
| 3 | **Préparer le prompt** | *Code node* : agrège les 6 premières actus et fabrique le prompt + le corps de requête |
| 4 | **Gemini — rédaction** | *HTTP Request* : envoie le prompt à Gemini, qui renvoie des blocs JSON classés par axe |
| 5 | **Parser les blocs** | *Code node* : lit la réponse de Gemini et sort 1 bloc = 1 item n8n |
| 6 | **Image — Pollinations** | *HTTP Request* : génère une illustration IA par bloc (branche de test) |
| 7 | **Assembler veille.json** | *Code node* : range les blocs dans les 3 axes et bâtit le `veille.json` final |
| 8 | **Résultat (à publier)** | Point de sortie : ici on branchera la **Phase 2** (publication) |

### Notions n8n que tu apprends ici
- **Trigger** : ce qui démarre un workflow.
- **Item** : chaque « ligne » de données qui circule (1 actu, puis 1 bloc).
- **Expression** `{{ ... }}` : insérer une valeur dynamique (ex. l'URL Pollinations).
- **Code node** : du JavaScript quand les nodes ne suffisent pas.
- **HTTP Request** : appeler n'importe quelle API (Gemini, Pollinations…).
- **Branche** : le node 5 envoie ses données à **deux** nodes en parallèle (7 et 6).

---

## Phase 2 (prochaine étape) — Publier dans le blog

Après le node *Résultat*, on ajoutera, selon ton hébergement :

- **n8n local** → node **« Read/Write Files from Disk »** pour écrire
  `E:\blog\data\quantique\veille.json` + le snapshot `archives/veille-<date>.json`,
  puis un commit git.
- **n8n Cloud** → node **GitHub** (*Create/Update file*) pour committer directement
  via l'API (nécessite un *token* GitHub).

On ajoutera aussi, avant la publication, une **étape de validation** (Telegram ou mail)
pour que rien ne parte sans ton feu vert.

---

## Dépannage rapide
- **Gemini renvoie une erreur 400/403** → clé manquante/invalide dans les Headers.
- **« JSON invalide renvoyé par Gemini »** → le modèle a ajouté du texte autour ;
  relancer, ou baisser la `temperature`. Le prompt force déjà `responseMimeType: application/json`.
- **RSS vide** → l'URL Google News a changé de langue/pays ; vérifier les paramètres `hl/gl/ceid`.
- **Pollinations lent** → normal, la génération d'image prend quelques secondes.
