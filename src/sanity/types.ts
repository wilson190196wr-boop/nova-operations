/**
 * La forme exacte que renvoient les requêtes de `queries.ts`.
 *
 * Ces types sont écrits à la main plutôt que générés. C'est un choix
 * provisoire et assumé : `sanity typegen` produit des types dérivés du schéma
 * réel, ce qui est mieux, mais demande d'extraire le schéma depuis un projet
 * configuré. Tant que le projet n'est pas connecté, un type écrit à la main
 * vaut mieux qu'un `any` — il documente la projection et fait échouer la
 * compilation quand une requête et un composant divergent.
 *
 * La marche à suivre pour passer à la génération figure dans README-SANITY.md.
 */

/** Une image projetée par `queries.ts`, dimensions comprises. */
export type ImageSanity = {
  url: string | null;
  alt: string;
  largeur: number | null;
  hauteur: number | null;
  lqip: string | null;
};

export type Fait = { _key: string; libelle: string; valeur: string };
export type Etape = { _key: string; numero: string; titre: string; texte: string };

export type Offre = {
  id: string;
  nom: string;
  ancre: string;
  numero: string;
  nomSchemaOrg: string;
  accroche: string;
  description: string;
  duree: string;
  prix: string;
  libelleBouton: string;
  variantes: { _key: string; nom: string; prix: string; detail: string }[];
  livrables: string[];
  resumeAccueil: string;
  libelleLienAccueil: string;
};

export type Realisation = {
  id: string;
  titre: string;
  contexte: string;
  /** Absent sur les chantiers types, qui ne sont pas datés. */
  annees: string | null;
  texte: string;
  indicateurs: string[];
};

/* ------------------------------------------------------------------ Blocs */

type Base<T extends string> = { _key: string; _type: T };

export type BlocHero = Base<"blocHero"> & { lignes: string[]; chapeau: string };

export type BlocEnTetePage = Base<"blocEnTetePage"> & {
  surtitre: string | null;
  titre: string;
  chapeau: string | null;
  faits: Fait[];
  afficherCoordonnees: boolean;
};

export type BlocMarques = Base<"blocMarques"> & {
  titreAccessible: string;
  marques: {
    _key: string;
    nom: string;
    echelle: number | null;
    /** `null` quand aucun fichier n'est déposé : le nom est alors composé typographiquement. */
    logo: ImageSanity | null;
  }[];
};

export type BlocSituations = Base<"blocSituations"> & {
  titre: string;
  profils: { _key: string; cible: string; titre: string; texte: string }[];
};

export type BlocEtapes = Base<"blocEtapes"> & {
  /** Titre lu par les lecteurs d'écran seulement. `null` quand la rangée n'en a pas besoin. */
  titreMasque: string | null;
  etapes: Etape[];
};

export type BlocApercuOffres = Base<"blocApercuOffres"> & {
  titre: string;
  chapeau: string;
  offres: Offre[];
};

export type BlocAlternatives = Base<"blocAlternatives"> & {
  titre: string;
  alternatives: { _key: string; nom: string; texte: string; detachee: boolean }[];
};

export type BlocOffresDetaillees = Base<"blocOffresDetaillees"> & { offres: Offre[] };

export type BlocDeuxVitesses = Base<"blocDeuxVitesses"> & {
  titre: string;
  chapeau: string;
  modes: { _key: string; nom: string; texte: string }[];
  note: string;
  lien: { libelle: string; chemin: string } | null;
};

export type BlocComparaison = Base<"blocComparaison"> & {
  titre: string;
  chapeau: string;
  enTetes: { situation: string; offre: string; resultat: string };
  lignes: {
    _key: string;
    situation: string;
    resultat: string;
    offre: { nom: string; ancre: string } | null;
  }[];
};

export type BlocGroupeRealisations = Base<"blocGroupeRealisations"> & {
  titre: string;
  ancre: string;
  realisations: Realisation[];
};

export type BlocIntroFondateur = Base<"blocIntroFondateur"> & {
  portrait: ImageSanity;
  nom: string;
  role: string;
  citation: string;
  titre: string;
  presentation: string;
  faits: Fait[];
};

export type BlocParcours = Base<"blocParcours"> & {
  titre: string;
  jalons: { _key: string; periode: string; lieu: string; role: string; texte: string }[];
};

export type BlocTournant = Base<"blocTournant"> & { titre: string; paragraphes: string[] };

export type BlocPrincipes = Base<"blocPrincipes"> & {
  titre: string;
  principes: { _key: string; titre: string; texte: string }[];
};

export type BlocPanneauContact = Base<"blocPanneauContact"> & {
  ongletRendezVous: { libelle: string; mention: string };
  ongletMessage: { libelle: string; mention: string };
  libelleLienCalendrier: string;
  repliCalendrier: { titre: string; texte: string };
  formulaire: TextesFormulaire;
};

/** Les libellés du formulaire, séparés pour traverser la frontière serveur/client. */
export type TextesFormulaire = {
  labelPrenom: string;
  labelNom: string;
  labelEmail: string;
  labelEntreprise: string;
  labelTelephone: string;
  labelMessage: string;
  texteConsentement: string;
  mentionLegale: { avant: string; libelleLien: string; apres: string };
  libelleEnvoi: string;
  libelleEnvoiEnCours: string;
  succes: { titre: string; texte: string };
};

export type BlocFaq = Base<"blocFaq"> & {
  surtitre: string | null;
  titre: string;
  questions: { _key: string; question: string; reponse: string }[];
};

/** Comment une ligne d'identification devient — ou non — un lien. */
export type TypeDeLien = "aucun" | "courriel" | "telephone" | "site";

export type BlocMentionsLegales = Base<"blocMentionsLegales"> & {
  titre: string;
  chapeau: string;
  prefixeMiseAJour: string;
  dateMiseAJour: string;
  motArticle: string;
  articles: {
    _key: string;
    titre: string;
    paragraphes: string[];
    lignes: { _key: string; libelle: string; valeur: string | null; lien: TypeDeLien }[];
    sousArticles: { _key: string; titre: string; paragraphes: string[] }[];
  }[];
};

export type BlocCloture = Base<"blocCloture"> & { titre: string };

/** Toute section qu'une page peut porter. */
export type Bloc =
  | BlocHero
  | BlocEnTetePage
  | BlocMarques
  | BlocSituations
  | BlocEtapes
  | BlocApercuOffres
  | BlocAlternatives
  | BlocOffresDetaillees
  | BlocDeuxVitesses
  | BlocComparaison
  | BlocGroupeRealisations
  | BlocIntroFondateur
  | BlocParcours
  | BlocTournant
  | BlocPrincipes
  | BlocPanneauContact
  | BlocFaq
  | BlocMentionsLegales
  | BlocCloture;

/* ------------------------------------------------------------- Documents */

export type Page = {
  route: string;
  seo: { titre: string; description: string; imagePartage: ImageSanity | null };
  blocs: Bloc[];
};

export type LienNavigation = { _key: string; libelle: string; chemin: string };

/** Les textes de la page servie sur une adresse inconnue. */
export type TextesPageIntrouvable = {
  surtitre: string;
  titre: string;
  texte: string;
  libelleRetour: string;
  titreLiens: string;
  titreOnglet: string;
};

export type ParametresSite = {
  nom: string;
  accroche: string;
  email: string;
  telephone: string;
  ville: string;
  coordonnees: { libelleEmail: string; libelleTelephone: string; libelleVille: string };
  navPrincipale: LienNavigation[];
  navPiedDePage: LienNavigation[];
  libelleRendezVous: string;
  cloture: { texte: string; libelleBouton: string; note: string };
  /**
   * `null` sur un jeu de données rempli avant l'ajout de la page introuvable :
   * la reprise des contenus n'écrase jamais un document existant, donc le
   * champ n'y apparaît qu'une fois saisi dans le Studio. Le type le dit, pour
   * que la page qui l'affiche soit obligée de traiter le cas.
   */
  pageIntrouvable: TextesPageIntrouvable | null;
  imagePartage: ImageSanity;
  descriptionOrganisation: string;
  zonesDesservies: string[];
};

export type OffrePubliee = {
  ancre: string;
  nom: string;
  nomSchemaOrg: string;
  description: string;
};
