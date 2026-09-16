/**
 * Les textes qui étaient écrits directement dans le JSX des pages.
 *
 * Ce fichier n'existait pas avant la mise sous CMS : ces chaînes vivaient dans
 * `src/app/**\/page.tsx` et dans les valeurs par défaut de
 * `src/components/ui.tsx`, et non dans `src/lib/`. Un inventaire les a relevées
 * une à une — ce sont exactement celles qu'une migration oublie, puisqu'elles
 * ne ressemblent pas à des données.
 *
 * Elles sont recopiées ici au caractère près, entités JSX déjà résolues
 * (`&apos;` devient une apostrophe droite U+0027, qui est ce que le navigateur
 * affichait). Aucune n'a été corrigée ni reformulée.
 */

/* ------------------------------------------------------------ src/components/ui.tsx */

/** Valeurs par défaut du bandeau de clôture, partagées par quatre pages. */
export const clotureParDefaut = {
  texte:
    "Quarante-cinq minutes pour décrire votre organisation et savoir s'il y a matière. Si aucune mission ne se justifie, je vous le dirai aussi.",
  libelleBouton: "Choisir un créneau",
  note: "Visio ou téléphone, sans engagement",
};

/* ------------------------------------------------------- src/app/page.tsx (accueil) */

export const accueil = {
  titreAccessibleMarques: "Références",
  titreSituations: "Deux situations, la même absence d'interlocuteur.",
  titreOffres: "Quatre façons de travailler ensemble",
  chapeauOffres:
    "L'audit qualifie, le sprint prouve, l'accompagnement tient dans la durée. On ne les pose jamais toutes sur la table au premier rendez-vous.",
  titreAlternatives: "Ce que vous avez déjà essayé",
  titreCloture: "Quarante-cinq minutes.",
};

/* ------------------------------------------------ src/app/offres/page.tsx */

export const offres = {
  enTetesComparaison: {
    situation: "Votre situation",
    offre: "Offre recommandée",
    resultat: "Premier résultat",
  },
  lienParcours: { libelle: "Voir les projets de mon parcours", chemin: "/realisations" },
  titreCloture: "Par où commencer ?",
};

/* ------------------------------------------ src/app/realisations/page.tsx */

export const realisations = {
  ancreDeveloppement: "dev",
  ancreIa: "ia",
  titreCloture: "Lequel ressemble au vôtre ?",
};

/* ---------------------------------------------- src/app/a-propos/page.tsx */

export const aPropos = {
  titre: "Wilson Rault, fondateur de KELERIA",
  presentation:
    "Six ans à construire des logiciels, puis à diriger ceux qui les construisent. Dans un groupe américain, dans une agence digitale, puis chez un éditeur. KELERIA est né de ce que j'y ai vu manquer : une offre adaptée aux besoins des PME et des startups.",
  titreParcours: "Du code à la direction de projets",
  titrePrincipes: "Quatre règles qui ne se négocient pas",
  titreCloture: "Parlons de votre cas.",
};

/* ----------------------------------------------- src/app/contact/page.tsx */

export const contact = {
  surtitre: "Contact",
  titre: "Quarante-cinq minutes pour y voir clair.",
  chapeau:
    "Un échange cadré, sans slide de vente. Vous décrivez votre organisation, vos outils et ce qui vous freine. Je vous dis par où je commencerais, ce que ça suppose, et s'il y a matière à travailler ensemble.",
  libelleEmail: "Email",
  libelleTelephone: "Téléphone",
  libelleVille: "Localisation",
  /** Titre lu par les lecteurs d'écran seulement, pour ne pas casser la hiérarchie H1 → H2 → H3. */
  titreMasqueEchange: "Comment se déroule notre échange",
  /** Les trois temps de l'échange, définis dans la page et non dans src/lib/. */
  echange: [
    {
      n: "01",
      title: "Vous décrivez",
      text: "Votre activité, vos effectifs, les outils en place et ce qui vous freine aujourd'hui.",
    },
    {
      n: "02",
      title: "Je cadre",
      text: "Ce qui me paraît prioritaire, ce que ça suppose de votre côté, et ce que je laisserais de côté.",
    },
    {
      n: "03",
      title: "Vous décidez",
      text: "Un audit, un chantier précis, un simple conseil, ou rien du tout. Sans relance commerciale.",
    },
  ],
  surtitreFaq: "Avant de nous écrire",
  titreFaq: "Les réponses aux questions les plus fréquentes.",
};

/* ------------------------- src/components/contact-panel.tsx et cal-embed.tsx */

export const panneauContact = {
  ongletRendezVous: { libelle: "Réserver un créneau", mention: "45 min · visio ou téléphone" },
  ongletMessage: { libelle: "Écrire un message", mention: "Réponse sous 24 h ouvrées" },
  libelleLienCalendrier: "Ouvrir le calendrier sur Cal.com",
  repliCalendrier: {
    titre: "Le calendrier n'a pas pu se charger.",
    texte: "Écrivez-nous directement, nous vous proposerons trois créneaux dans la journée.",
  },
};

/* ------------------------------------- src/components/contact-form.tsx */

export const formulaire = {
  labelPrenom: "Prénom",
  labelNom: "Nom",
  labelEmail: "Email professionnel",
  labelEntreprise: "Entreprise (facultatif)",
  labelTelephone: "Téléphone (facultatif)",
  labelMessage: "Votre situation en quelques lignes",
  texteConsentement: "J'accepte d'être recontacté par KELERIA au sujet de ma demande.",
  /**
   * Découpée en trois : seul le milieu est un lien, et le point final est hors
   * du lien. C'est ce découpage qu'il faut reproduire, pas une phrase entière.
   */
  mentionLegale: {
    avant: "Pour savoir comment vos informations sont utilisées, consultez les",
    libelleLien: "mentions légales",
    apres: ".",
  },
  libelleEnvoi: "Envoyer ma demande",
  libelleEnvoiEnCours: "Envoi en cours…",
  succes: {
    titre: "Message bien reçu.",
    texte: "Je vous réponds sous 24 heures ouvrées. Si c'est urgent, appelez-moi.",
  },
};

/* --------------------------------- src/app/mentions-legales/page.tsx */

export const mentionsLegales = {
  titre: "Mentions légales",
  chapeau:
    "Les informations que la loi impose de publier, et ce qui arrive aux données que vous laissez sur ce site.",
  prefixeMiseAJour: "Dernière mise à jour :",
  motArticle: "Article",
};

/* ------------------------------------------ src/components/site-header.tsx et footer */

export const chassis = {
  libelleRendezVous: "Rendez-vous",
  navPiedDePage: [
    { label: "Rendez-vous", href: "/contact" },
    { label: "Mentions légales", href: "/mentions-legales" },
  ],
};

/* ---------------------------------------------------- ancien src/lib/seo.ts */

/** Les six couples titre / description, repris tels quels. */
export const seoParRoute: Record<string, { titre: string; description: string }> = {
  "/": {
    titre: "Conseil IA et projets applicatifs en PACA et Occitanie · KELERIA",
    description:
      "À Avignon, KELERIA accompagne les PME et startups en PACA et Occitanie : audit IA, développement applicatif et pilotage de projets. Parlons de votre besoin.",
  },
  "/offres": {
    titre: "Audit IA, sprints et CTO à temps partagé · KELERIA",
    description:
      "Audit IA, sprints, pilotage applicatif, accompagnement mensuel et formation liée au diagnostic. Découvrez les formats et les livrables adaptés à votre projet.",
  },
  "/realisations": {
    titre: "Projets applicatifs et IA : parcours et exemples · KELERIA",
    description:
      "CRM, ERP, applications mobiles et IA : les projets du parcours de Wilson Rault et des exemples de chantiers à évaluer pour votre entreprise.",
  },
  "/a-propos": {
    titre: "Wilson Rault, consultant IA et projets applicatifs · KELERIA",
    description:
      "Wilson Rault, fondateur de KELERIA à Avignon : ingénieur des Mines d'Alès, passé par Expedia Group, Glanum et Septeo. Conseil et pilotage de projets.",
  },
  "/contact": {
    titre: "Contact : réserver un échange de 45 minutes · KELERIA",
    description:
      "Parlez de votre projet IA ou applicatif avec Wilson Rault : rendez-vous de 45 minutes, formulaire ou téléphone. Basé à Avignon, pour les PME et startups.",
  },
  "/mentions-legales": {
    titre: "Mentions légales · KELERIA",
    description:
      "Éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles du site KELERIA.",
  },
};

/* ------------------------------ ancien src/lib/structured-data.ts */

export const donneesStructurees = {
  descriptionOrganisation:
    "Conseil, développement applicatif, intelligence artificielle et pilotage de projets pour les PME et les startups.",
  zonesDesservies: ["Provence-Alpes-Côte d'Azur", "Occitanie"],
  /** Le nom complet de chaque service, là où le nom d'offre seul serait trop vague. */
  nomsServices: {
    audit: "Audit IA et digital",
    sprints: "Sprints d'automatisation et d'IA",
    accompagnement: "Accompagnement à temps partagé",
    formation: "Formation liée au diagnostic",
  } as Record<string, string>,
  /** Le visuel de partage commun, déjà présent dans public/. */
  imagePartage: {
    fichier: "public/og-keleria.png",
    alt: "KELERIA, conseil IA et projets applicatifs",
  },
};
