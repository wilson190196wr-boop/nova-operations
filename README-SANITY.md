# Gérer les contenus du site

Le site est désormais alimenté par Sanity. Les textes, les images, les liens,
la navigation, le pied de page et les métadonnées de référencement se modifient
depuis une interface, sans toucher au code.

Ce qui reste dans le code : la mise en page, les couleurs, les animations, les
adresses des pages et les identifiants techniques. Ce sont des décisions de
conception, pas des contenus — et les rendre modifiables reviendrait à pouvoir
casser le site depuis un formulaire.

---

## 1. Ouvrir le Studio

L'administration est servie par le site lui-même, à l'adresse **`/studio`** :

- en local : <http://localhost:3000/studio>
- en production : <https://www.keleria.com/studio>

La connexion se fait avec votre compte Sanity. Sans droits sur le projet, la
page ne montre aucun contenu. Elle porte `noindex` : elle n'apparaîtra dans
aucun résultat de recherche.

## 2. Modifier un contenu

L'arborescence de gauche a trois entrées.

**Pages** — les six adresses du site. Chaque page est une suite de *sections*
que l'on peut réordonner par glisser-déposer, masquer, ou modifier. Masquer
vaut mieux que supprimer : la section disparaît du site mais garde son contenu,
et le retour en arrière est immédiat.

**Offres** et **Réalisations** — des contenus décrits une seule fois et repris à
plusieurs endroits. Une offre modifiée change partout : sur l'accueil, sur la
page Offres et dans les données transmises aux moteurs de recherche.

**Réglages du site** — ce qui est partagé par toutes les pages : le nom, les
coordonnées, le menu, le pied de page, le texte du bandeau de clôture et ceux
de la page introuvable. Les coordonnées servent aussi d'adresse de réception du
formulaire : les changer change l'endroit où arrivent les demandes.

Chaque champ porte une description qui dit où il s'affiche et ce qu'il
contraint. Les messages en orange sont des avertissements : on peut publier
malgré eux. Les messages en rouge bloquent la publication.

## 3. Prévisualiser avant de publier

Dans le Studio, l'onglet **Prévisualisation** affiche le site à côté du
formulaire.

- Cliquer un texte dans l'aperçu ouvre le champ qui le porte.
- Modifier le champ redessine l'aperçu, sans publier.
- Un bandeau bleu en bas de page rappelle que vous lisez des brouillons.
  Le bouton « Revenir au site publié » en sort.

Les visiteurs ne voient jamais les brouillons : le site public ne lit que le
contenu publié, et la prévisualisation tient à un cookie que seul le Studio
sait poser.

## 4. Publier

Le bouton **Publier** en bas du formulaire. Ensuite :

1. Sanity prévient le site (webhook).
2. Le site attend trois secondes — le temps que la modification se propage
   côté Sanity — puis marque les pages à refaire.
3. La visite suivante reconstruit la page et sert la nouvelle version.

**Délai attendu : environ cinq secondes entre « Publier » et « visible ».** La
toute première visite après une publication est un peu plus lente, le temps de
reconstruire la page ; les suivantes sont instantanées.

Sans le webhook, les pages publiées ne changeraient jamais d'elles-mêmes : le
site est entièrement pré-rendu. Sa configuration est décrite au point 8.

---

## 5. Ce qui reste dans le code, et pourquoi

| Élément | Raison |
| --- | --- |
| Les six adresses des pages | Ce sont des fichiers de l'application. En créer une depuis le Studio ne créerait aucune URL. |
| `https://www.keleria.com` | Donnée de déploiement. Une valeur modifiable permettrait de publier des adresses canoniques qui redirigent. |
| Les messages d'erreur du formulaire | Ils sont écrits au plus près des règles qui les produisent : « 20 caractères minimum » est la formulation d'une règle. Les séparer permettrait d'afficher une exigence fausse. |
| Les libellés d'accessibilité des commandes fixes | Le nom d'un bouton de menu n'est pas du contenu ; le vider serait une régression invisible. Le nom de la liste des marques, lui, est éditable : c'est une liste de contenu. |
| Classes, couleurs, largeurs, délais d'animation | Plusieurs sont des reproductions volontaires de la maquette, y compris des redondances qui n'en sont pas. |

## 5 bis. La page introuvable

C'est la page servie quand l'adresse demandée n'existe pas : lien périmé,
adresse mal recopiée, page supprimée. Elle porte l'en-tête, le pied de page et
la charte du site, et renvoie bien un code 404 aux moteurs de recherche.

Ses textes se modifient dans *Réglages du site → Page introuvable* : surtitre,
titre, texte, libellé du bouton, libellé de la liste de liens et titre d'onglet.
Les liens qu'elle propose sont ceux du menu et du pied de page — ils suivent la
navigation d'eux-mêmes, il n'y a pas de seconde liste à tenir à jour.

Elle ne figure pas dans « Pages » parce qu'elle ne correspond à aucune adresse :
elle répond à toutes celles qui n'en sont pas une. Pour la même raison, l'onglet
*Prévisualisation* ne sait pas l'ouvrir — il lui faudrait une adresse. Pour la
voir, demandez n'importe quelle adresse inexistante du site.

**Si les contenus ont déjà été repris avant l'ajout de cette page**, le champ
n'existe pas encore : la reprise n'écrit jamais dans un document déjà créé.
Remplissez-le dans le Studio et publiez. Tant qu'il est vide, la construction du
site échoue avec un message qui le dit — plutôt qu'une page 404 aux titres
vides, que personne n'aurait relue.

Une différence assumée : cette page s'affiche dans la police du système, et non
en Geist. Servie sans passer par aucune mise en page, elle devrait déclarer les
polices pour son propre compte ; or chaque déclaration produit sa feuille de
style, et les six autres pages se mettaient alors à en charger deux. Le reste de
la charte ne bouge pas : couleurs, tailles, graisses, filets et rythme sont les
mêmes.

## 6. Ce qui reste à faire, côté contenu

**Les mentions légales sont incomplètes.** Trois mentions obligatoires au sens
de l'article 6-III de la LCEN sont vides et s'affichent en rouge sur la page :

- l'adresse professionnelle publiable,
- le numéro SIRET,
- le téléphone de l'hébergeur.

Elles se renseignent dans *Pages → Mentions légales → la section Mentions
légales → Articles*. Tant qu'elles sont vides, la page n'est pas conforme.

**Les logos de marques** sont des marques déposées, reproduites à titre de
référence de parcours professionnel. Chaque fichier doit venir de la charte
officielle de la marque. Le logo ORTEC a un fond opaque : ne pas le poser sur
un aplat sombre.

---

## 7. Mettre en place (une seule fois)

### a. Créer le projet Sanity

```bash
npx sanity@latest login
npx sanity@latest projects create
```

Notez l'identifiant du projet. Créez un jeu de données `production` s'il
n'existe pas.

### b. Créer les jetons

Dans <https://sanity.io/manage>, onglet **API → Tokens** :

| Jeton | Droits | Où il va |
| --- | --- | --- |
| Lecture | Viewer | `SANITY_API_READ_TOKEN`, en local et chez l'hébergeur |
| Écriture | Editor | `SANITY_API_WRITE_TOKEN`, **en local uniquement** |

Le jeton d'écriture ne sert qu'au script de reprise. Le site n'écrit jamais
dans Sanity : un jeton d'écriture en production serait une surface d'attaque
sans contrepartie.

### c. Renseigner les variables

Copiez `.env.example` en `.env.local` et remplissez-le. Reportez les mêmes
valeurs chez l'hébergeur, **à l'exception de `SANITY_API_WRITE_TOKEN`**.

### d. Autoriser le Studio à parler à Sanity

Dans <https://sanity.io/manage>, **API → CORS origins**, ajoutez avec
« Allow credentials » :

- `http://localhost:3000`
- `https://www.keleria.com`

### e. Reprendre les contenus

```bash
npm run reprise              # simulation : rien n'est écrit
npm run reprise:appliquer    # écriture
```

Le script est rejouable sans créer de doublon et n'écrase jamais une
modification faite dans le Studio. Ouvrez ensuite `/studio`, relisez, publiez.

## 8. Configurer le webhook de publication

Dans <https://sanity.io/manage>, **API → Webhooks → Create webhook** :

| Champ | Valeur |
| --- | --- |
| URL | `https://www.keleria.com/api/revalider` |
| Dataset | `production` |
| Trigger on | Create, Update, Delete |
| Filter | `_type in ["page", "parametresSite", "offre", "realisation"]` |
| HTTP method | `POST` |
| API version | `v2026-09-14` |
| Secret | la valeur de `SANITY_REVALIDATE_SECRET` |

Sans secret, le site refuse l'appel : c'est ce qui empêche n'importe qui de
déclencher des reconstructions en boucle.

---

## 9. Vérifier

```bash
npm run typecheck   # typage
npm run lint        # style
npm run build       # construction
```

Deux vérifications propres au projet, qui ne demandent aucun accès à Sanity —
elles montent un jeu de données local et construisent le site contre lui :

```bash
npx tsx scripts/verifier-fidelite.ts <dossier-des-empreintes-html>
npx tsx scripts/verifier-edition.ts
```

La première compare le HTML produit à celui d'avant la mise sous CMS, page par
page. La seconde rejoue cinq gestes d'éditeur — masquer une section, réordonner
une liste, modifier un texte, modifier une image, modifier un texte des réglages
du site — et vérifie que chacun produit l'effet attendu.

## 10. Générer les types depuis le schéma (facultatif)

Les types de contenu sont aujourd'hui écrits à la main dans
`src/sanity/types.ts`. Une fois le projet connecté, ils peuvent être dérivés du
schéma réel :

```bash
npm run sanity:schema   # extrait le schéma
npm run sanity:types    # génère les types depuis le schéma et les requêtes
```

Il faudra alors retirer les types manuels et laisser `sanityFetch` les inférer.
C'est mieux — une requête et un composant ne pourront plus diverger — mais cela
demande un projet configuré, ce qui n'était pas le cas au moment de
l'intégration.
