/**
 * Contenu de la page « Offres ».
 *
 * Source : le positionnement du 4 septembre 2026.
 *
 * Une règle de ce document est appliquée ici : le tarif journalier ne sort
 * jamais. Les paliers d'accompagnement affichent donc leur prix mensuel et ce
 * qu'ils ajoutent, mais pas le nombre de jours — publier « 2 jours, 1 600 € »
 * revient à publier le tarif journalier.
 *
 * Ce qui n'est pas compris dans un forfait relève du contrat, pas du site.
 */

export const intro = {
  title: "Quatre offres, un seul enchaînement",
  text: "L'audit qualifie, le sprint prouve, l'accompagnement tient dans la durée. On ne les pose jamais toutes sur la table au premier rendez-vous : on commence par regarder, et la suite se décide sur ce qu'on trouve.",
};

export const path = [
  {
    n: "01",
    title: "L'audit qualifie",
    text: "Il produit la cartographie, le score de maturité et la feuille de route chiffrée — donc la liste des chantiers qui valent la peine, et celle de ceux qui n'en valent pas.",
  },
  {
    n: "02",
    title: "Le sprint prouve",
    text: "Il transforme un chantier de la feuille de route en gain constaté. C'est lui qui produit le chiffre : heures récupérées, euros économisés, mesurés avant et après.",
  },
  {
    n: "03",
    title: "L'accompagnement tient",
    text: "Il maintient ce qui tourne, pilote les chantiers suivants et repère les gains que le diagnostic initial n'avait pas vus. C'est là que la transformation cesse d'être un projet.",
  },
];

export const audit = {
  title: "Audit",
  text: "Trois à quatre semaines pour savoir où l'intelligence artificielle et le digital vous font gagner de l'argent, et où ils n'en font pas. Deux formats, distingués par le périmètre — pas par la profondeur.",
  note: "Le format court n'est pas un audit complet moins cher : c'est un autre périmètre. Un processus regardé, un gain trouvé, et la suite se décide ensuite.",
  formats: [
    {
      name: "Diagnostic ciblé",
      price: "2 500 € HT",
      duration: "2 semaines",
      scope: "Un seul processus",
      items: [
        "Cartographie du processus tel qu'il tourne réellement",
        "Relevé des temps et des points de rupture",
        "Chiffrage de ce que coûtent les frictions",
        "Trois actions priorisées, avec le gain estimé",
      ],
    },
    {
      name: "Audit complet",
      price: "7 500 € HT",
      duration: "3 à 4 semaines",
      scope: "Toutes les fonctions",
      items: [
        "Cartographie de l'ensemble des processus",
        "Score de maturité sur les six piliers",
        "Analyse du parc applicatif et des doublons",
        "Feuille de route priorisée sur douze mois",
        "Retour sur investissement estimé par chantier",
      ],
    },
  ],
};

export const sprint = {
  title: "Sprints",
  text: "Les gains rapides, construits en direct. Automatisations, connexion d'outils, tableaux de bord, assistants branchés sur vos données — livrés en semaines, pas en trimestres.",
  price: "Sur devis, à partir de la feuille de route",
  rules: [
    {
      title: "Cinq jours maximum par automatisation",
      text: "Au-delà, ce n'est plus un sprint mais un projet : il repasse en pilotage, avec un prestataire sourcé et suivi par moi.",
    },
    {
      title: "Rien qui ne puisse être transmis",
      text: "Documentation et formation de vos équipes comprises dans le forfait, systématiquement. Vous n'achetez pas une dépendance.",
    },
    {
      title: "Un seul interlocuteur, même quand je ne construis pas",
      text: "Quand un développement dépasse le cadre, je sélectionne et je pilote le prestataire. Vous gardez un contact, un planning, un budget.",
    },
  ],
};

export const support = {
  title: "Accompagnement",
  text: "Un directeur technique à temps partagé, présent chaque mois. C'est ce qui distingue une transformation qui tient d'un projet qui retombe six mois après sa livraison.",
  levels: [
    {
      name: "Suivi",
      price: "1 600 € / mois",
      adds:
        "Comité mensuel avec le dirigeant, feuille de route tenue à jour, maintenance de ce qui a été livré. Pas de construction.",
    },
    {
      name: "Actif",
      price: "3 200 € / mois",
      adds:
        "Tout le niveau Suivi, plus le pilotage des chantiers et des prestataires, et les petites évolutions au fil de l'eau.",
    },
    {
      name: "Intensif",
      price: "6 000 € / mois",
      adds:
        "Tout le niveau Actif, plus la construction active, une présence hebdomadaire et la participation au comité de direction. Sur une phase de trois à six mois, puis retour en Actif.",
    },
    {
      name: "Sur mesure",
      price: "Sur devis",
      adds:
        "Plusieurs entités, plusieurs sites, direction d'un programme. Se construit avec vous, ne se choisit pas dans une grille.",
    },
  ],
  included: [
    "Un comité mensuel avec le dirigeant : avancement, arbitrages, mise à jour de la feuille de route",
    "Le pilotage des chantiers en cours et des prestataires — c'est moi qui les tiens, pas vous",
    "La maintenance des automatisations déjà livrées",
    "Un accès direct entre les rendez-vous, par courriel ou téléphone, réponse sous 48 h ouvrées",
    "La mise à jour trimestrielle du score de maturité, pour mesurer le chemin parcouru",
  ],
  commitment:
    "Trois mois pour commencer, puis reconduction tacite avec un mois de préavis. Les jours non consommés se reportent sur le mois suivant, jamais au-delà.",
};

export const training = {
  title: "Formation",
  text: "Vos équipes formées aux outils qu'elles vont réellement utiliser, sur vos cas à vous — pas sur des exemples de catalogue.",
  price: "Sur devis",
  note: "Jamais vendue seule : elle suit le diagnostic, sinon on forme des gens à des outils qui ne résolvent pas leur problème.",
};
