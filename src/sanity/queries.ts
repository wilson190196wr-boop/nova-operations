import { defineQuery } from "next-sanity";

/**
 * Les requêtes GROQ du site.
 *
 * Une seule requête sert toutes les pages : la route est un paramètre, et la
 * projection conditionnelle `_type == "x" => { … }` ne descend que les champs
 * du type de bloc réellement rencontré. Écrire une requête par page aurait
 * multiplié par six les endroits à modifier à chaque nouveau bloc.
 *
 * Deux règles tiennent ces projections.
 *
 * Les blocs masqués sont écartés côté serveur (`blocs[masque != true]`). Un
 * bloc masqué ne descend donc jamais jusqu'au navigateur, pas même en
 * prévisualisation — « masqué » doit vouloir dire la même chose partout.
 *
 * Les images sont aplaties ici plutôt que dans les composants : `next/image`
 * a besoin des dimensions réelles pour réserver la place avant le chargement,
 * et les lire depuis les métadonnées de l'asset évite qu'une valeur ressaisie
 * finisse par mentir sur le fichier.
 */

/** Projection d'une image, texte alternatif porté par un sous-champ `alt`. */
function image(champ: string): string {
  return `"${champ}": {
    "url": ${champ}.asset->url,
    "alt": coalesce(${champ}.alt, ""),
    "largeur": ${champ}.asset->metadata.dimensions.width,
    "hauteur": ${champ}.asset->metadata.dimensions.height,
    "lqip": ${champ}.asset->metadata.lqip
  }`;
}

/**
 * Projection d'un logo de marque : le texte alternatif est le nom de la
 * marque, jamais une seconde saisie. Deux champs finiraient par diverger, et
 * c'est le lecteur d'écran qui entendrait la version périmée.
 */
const LOGO_MARQUE = `"logo": select(
  defined(logo.asset) => {
    "url": logo.asset->url,
    "alt": nom,
    "largeur": logo.asset->metadata.dimensions.width,
    "hauteur": logo.asset->metadata.dimensions.height,
    "lqip": logo.asset->metadata.lqip
  },
  null
)`;

/** Tout ce qu'une offre expose, quelle que soit la page qui la lit. */
const OFFRE = `{
  "id": _id,
  nom,
  "ancre": slug.current,
  numero,
  nomSchemaOrg,
  accroche,
  description,
  duree,
  prix,
  libelleBouton,
  "variantes": coalesce(variantes[]{ _key, nom, prix, detail }, []),
  "livrables": coalesce(livrables, []),
  resumeAccueil,
  libelleLienAccueil
}`;

const REALISATION = `{
  "id": _id,
  titre,
  contexte,
  annees,
  texte,
  "indicateurs": coalesce(indicateurs, [])
}`;

/** Les sections, projetées selon leur type. */
const BLOCS = `"blocs": coalesce(blocs[masque != true]{
  _key,
  _type,

  _type == "blocHero" => {
    "lignes": coalesce(lignes, []),
    chapeau
  },

  _type == "blocEnTetePage" => {
    surtitre,
    titre,
    chapeau,
    "faits": coalesce(faits[]{ _key, libelle, valeur }, []),
    "afficherCoordonnees": coalesce(afficherCoordonnees, false)
  },

  _type == "blocMarques" => {
    titreAccessible,
    "marques": coalesce(marques[]{ _key, nom, echelle, ${LOGO_MARQUE} }, [])
  },

  _type == "blocSituations" => {
    titre,
    "profils": coalesce(profils[]{ _key, cible, titre, texte }, [])
  },

  _type == "blocEtapes" => {
    titreMasque,
    "etapes": coalesce(etapes[]{ _key, numero, titre, texte }, [])
  },

  _type == "blocApercuOffres" => {
    titre,
    chapeau,
    "offres": coalesce(offres[]->${OFFRE}, [])
  },

  _type == "blocAlternatives" => {
    titre,
    "alternatives": coalesce(alternatives[]{ _key, nom, texte, "detachee": coalesce(detachee, false) }, [])
  },

  _type == "blocOffresDetaillees" => {
    "offres": coalesce(offres[]->${OFFRE}, [])
  },

  _type == "blocDeuxVitesses" => {
    titre,
    chapeau,
    "modes": coalesce(modes[]{ _key, nom, texte }, []),
    note,
    "lien": select(
      defined(lien.libelle) && defined(lien.chemin) => { "libelle": lien.libelle, "chemin": lien.chemin },
      null
    )
  },

  _type == "blocComparaison" => {
    titre,
    chapeau,
    "enTetes": enTetes{ situation, offre, resultat },
    "lignes": coalesce(lignes[]{
      _key,
      situation,
      resultat,
      "offre": offre->{ nom, "ancre": slug.current }
    }, [])
  },

  _type == "blocGroupeRealisations" => {
    titre,
    ancre,
    "realisations": coalesce(realisations[]->${REALISATION}, [])
  },

  _type == "blocIntroFondateur" => {
    ${image("portrait")},
    nom,
    role,
    citation,
    titre,
    presentation,
    "faits": coalesce(faits[]{ _key, libelle, valeur }, [])
  },

  _type == "blocParcours" => {
    titre,
    "jalons": coalesce(jalons[]{ _key, periode, lieu, role, texte }, [])
  },

  _type == "blocTournant" => {
    titre,
    "paragraphes": coalesce(paragraphes, [])
  },

  _type == "blocPrincipes" => {
    titre,
    "principes": coalesce(principes[]{ _key, titre, texte }, [])
  },

  _type == "blocPanneauContact" => {
    "ongletRendezVous": ongletRendezVous{ libelle, mention },
    "ongletMessage": ongletMessage{ libelle, mention },
    libelleLienCalendrier,
    "repliCalendrier": repliCalendrier{ titre, texte },
    "formulaire": formulaire{
      labelPrenom, labelNom, labelEmail, labelEntreprise, labelTelephone, labelMessage,
      texteConsentement,
      "mentionLegale": mentionLegale{ avant, libelleLien, apres },
      libelleEnvoi,
      libelleEnvoiEnCours,
      "succes": succes{ titre, texte }
    }
  },

  _type == "blocFaq" => {
    surtitre,
    titre,
    "questions": coalesce(questions[]{ _key, question, reponse }, [])
  },

  _type == "blocMentionsLegales" => {
    titre,
    chapeau,
    prefixeMiseAJour,
    dateMiseAJour,
    motArticle,
    "articles": coalesce(articles[]{
      _key,
      titre,
      "paragraphes": coalesce(paragraphes, []),
      "lignes": coalesce(lignes[]{ _key, libelle, valeur, "lien": coalesce(lien, "aucun") }, []),
      "sousArticles": coalesce(sousArticles[]{ _key, titre, "paragraphes": coalesce(paragraphes, []) }, [])
    }, [])
  },

  _type == "blocCloture" => {
    titre
  }
}, [])`;

/** Une page et toutes ses sections, par son adresse. */
export const REQUETE_PAGE = defineQuery(`*[_type == "page" && route == $route][0]{
  "route": route,
  "seo": seo{
    titre,
    description,
    ${image("imagePartage")}
  },
  ${BLOCS}
}`);

/** Les réglages partagés. Un seul document : le plus ancien fait foi. */
export const REQUETE_PARAMETRES = defineQuery(`*[_type == "parametresSite"] | order(_createdAt asc)[0]{
  nom,
  accroche,
  email,
  telephone,
  ville,
  "coordonnees": coordonnees{ libelleEmail, libelleTelephone, libelleVille },
  "navPrincipale": coalesce(navPrincipale[]{ _key, libelle, chemin }, []),
  "navPiedDePage": coalesce(navPiedDePage[]{ _key, libelle, chemin }, []),
  libelleRendezVous,
  "cloture": cloture{ texte, libelleBouton, note },
  ${image("imagePartage")},
  descriptionOrganisation,
  "zonesDesservies": coalesce(zonesDesservies, [])
}`);

/**
 * Les offres publiées, pour le balisage Schema.org de la page Offres.
 *
 * Lues à part plutôt que déduites des blocs : le balisage doit décrire les
 * services, pas la mise en page qui se trouve les présenter ce jour-là.
 */
export const REQUETE_OFFRES_PUBLIEES = defineQuery(`*[_type == "offre"] | order(numero asc){
  "ancre": slug.current,
  nom,
  nomSchemaOrg,
  description
}`);

/**
 * Les adresses servies, pour le plan du site.
 *
 * Dérivées des pages réellement publiées : une page dépubliée sort du plan du
 * site sans qu'on ait à y penser.
 */
export const REQUETE_ROUTES = defineQuery(`*[_type == "page" && defined(route)] | order(route asc).route`);
