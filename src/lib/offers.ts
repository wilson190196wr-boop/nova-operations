/**
 * Contenu de la page « Offres ».
 *
 * Source : le positionnement du 4 septembre 2026.
 *
 * Une règle de ce document est appliquée ici : le tarif journalier ne sort
 * jamais. Les paliers d'accompagnement affichent leur prix mensuel et ce
 * qu'ils ajoutent, mais pas le nombre de jours — publier « 2 jours, 1 600 € »
 * revient à publier le tarif journalier.
 *
 * Ce qui n'est pas compris dans un forfait relève du contrat, pas du site.
 */

export const hero = {
  title: "Comprendre. Exécuter. Piloter.",
  intro:
    "Quatre offres qui s'enchaînent ou s'activent séparément. On commence presque toujours par un audit, et la suite se décide sur ce qu'il révèle — jamais avant.",
  meta: [
    { label: "Premier livrable", value: "2 semaines" },
    { label: "Audit", value: "2 500 ou 7 500 € HT" },
    { label: "Accompagnement", value: "dès 1 600 € / mois" },
  ],
};

export type Offer = {
  slug: string;
  step: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  price: string;
  /** Formats ou paliers, quand l'offre en propose plusieurs. */
  variants?: { name: string; price: string; detail: string }[];
  deliverables: string[];
};

export const offers: Offer[] = [
  {
    slug: "audit",
    step: "01",
    name: "Audit",
    tagline: "Savoir où l'IA rapporte, et où elle ne rapporte rien.",
    description:
      "Je regarde vos processus tels qu'ils tournent — pas ceux du manuel — pour chiffrer où partent les heures et la marge. Deux formats, distingués par le périmètre et non par la profondeur.",
    duration: "2 à 4 semaines",
    price: "2 500 ou 7 500 € HT",
    variants: [
      {
        name: "Diagnostic ciblé",
        price: "2 500 € HT",
        detail: "Un seul processus, deux semaines",
      },
      {
        name: "Audit complet",
        price: "7 500 € HT",
        detail: "Toutes les fonctions, trois à quatre semaines",
      },
    ],
    deliverables: [
      "Cartographie des processus tels qu'ils tournent réellement",
      "Relevé des temps et des points de rupture",
      "Score de maturité sur les six piliers",
      "Analyse du parc applicatif et des doublons",
      "Feuille de route priorisée sur douze mois",
      "Retour sur investissement estimé, chantier par chantier",
    ],
  },
  {
    slug: "sprints",
    step: "02",
    name: "Sprints",
    tagline: "Les gains rapides, construits en direct.",
    description:
      "Les chantiers de la feuille de route qui se règlent en semaines. Cinq jours maximum par automatisation : au-delà, ce n'est plus un sprint mais un projet, et il repasse en pilotage avec un prestataire que je sélectionne et que je tiens.",
    duration: "2 à 10 semaines",
    price: "Sur devis, à partir de la feuille de route",
    deliverables: [
      "Automatisations construites et mises en production",
      "Connexion de vos outils entre eux, sans ressaisie",
      "Tableaux de bord branchés sur vos données réelles",
      "Assistants sur votre documentation interne",
      "Documentation et formation des équipes comprises",
      "Un seul interlocuteur, même quand je ne construis pas moi-même",
    ],
  },
  {
    slug: "accompagnement",
    step: "03",
    name: "Accompagnement",
    tagline: "Un directeur technique à temps partagé, chaque mois.",
    description:
      "C'est ce qui distingue une transformation qui tient d'un projet qui retombe six mois après sa livraison. Trois mois pour commencer, puis reconduction tacite avec un mois de préavis.",
    duration: "3 mois, puis tacite",
    price: "dès 1 600 € / mois",
    variants: [
      { name: "Suivi", price: "1 600 € / mois", detail: "Comité mensuel et maintenance" },
      { name: "Actif", price: "3 200 € / mois", detail: "+ pilotage des chantiers et prestataires" },
      { name: "Intensif", price: "6 000 € / mois", detail: "+ construction et présence hebdomadaire" },
      { name: "Sur mesure", price: "Sur devis", detail: "Plusieurs entités, direction de programme" },
    ],
    deliverables: [
      "Un comité mensuel avec le dirigeant : avancement, arbitrages, feuille de route",
      "Le pilotage des chantiers en cours et des prestataires",
      "La maintenance des automatisations déjà livrées",
      "Un accès direct entre les rendez-vous, réponse sous 48 h ouvrées",
      "La mise à jour trimestrielle du score de maturité",
    ],
  },
  {
    slug: "formation",
    step: "04",
    name: "Formation",
    tagline: "Vos équipes formées sur vos cas, pas sur des exemples.",
    description:
      "Jamais vendue seule : elle suit le diagnostic. Sinon on forme des gens à des outils qui ne résolvent pas leur problème, et l'usage retombe au bout de trois semaines.",
    duration: "À la session",
    price: "Sur devis",
    deliverables: [
      "Formation aux outils réellement déployés chez vous",
      "Exercices construits sur vos propres dossiers",
      "Documentation remise et conservée par vos équipes",
      "Une session de reprise à distance après quelques semaines d'usage",
    ],
  },
];

export const comparison = {
  title: "Quelle offre pour quelle situation ?",
  intro:
    "En cas de doute, l'audit reste le point d'entrée le plus rentable : c'est le moins cher, et il évite d'investir au mauvais endroit.",
  rows: [
    {
      situation: "« Je sens qu'on perd du temps, mais je ne sais pas où »",
      offer: "Audit",
      result: "Feuille de route chiffrée en deux à quatre semaines",
    },
    {
      situation: "« Je sais quoi faire, personne n'a le temps de le faire »",
      offer: "Sprints",
      result: "Chantier livré et gain mesuré",
    },
    {
      situation: "« On a déployé des outils que personne n'utilise »",
      offer: "Formation",
      result: "Équipes autonomes sur leurs propres cas",
    },
    {
      situation: "« Il me faudrait un directeur technique, pas à plein temps »",
      offer: "Accompagnement",
      result: "Comité de pilotage dès le premier mois",
    },
  ],
};
