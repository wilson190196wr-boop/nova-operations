/**
 * Contenu de la page « Réalisations ».
 *
 * La page se partage par domaine — développement applicatif d'un côté,
 * automatisation et IA de l'autre — parce que c'est ce qu'un visiteur cherche.
 *
 * `appProjects` et `aiProjects` sont des projets livrés chez des employeurs
 * précédents ; aucune entreprise n'est nommée, les désignations restent
 * descriptives. `aiCases` ne décrit rien de livré : ce sont des pistes à
 * évaluer, portées par le drapeau `illustrative`.
 *
 * Ce drapeau est explicite et non déduit de l'absence de date : une entrée
 * réelle pourrait un jour arriver sans millésime, et la déduction en ferait
 * silencieusement un exemple. La distinction porte une promesse commerciale,
 * elle ne doit pas dépendre d'un champ facultatif.
 *
 * Toutes les entrées partagent le même format : métadonnées, titre,
 * description, exactement deux indicateurs. Deux formats de carte dans une
 * même page rendaient la lecture illisible.
 *
 * Deux indicateurs, pas trois : au-delà, plus personne ne les lit et
 * l'ensemble prend un air de plaquette.
 */

export const intro = {
  title: "Projets applicatifs et IA : parcours et exemples",
  text: "Voici des projets issus de mon parcours en développement et en pilotage, ainsi que des exemples de chantiers à étudier pour votre entreprise. Les exemples sont signalés comme tels et ne constituent pas des résultats clients.",
};

export type Work = {
  /** Absent sur les exemples, qui ne sont pas datés. */
  years?: string;
  context: string;
  title: string;
  text: string;
  metrics: [string, string];
  /**
   * Marque une piste à évaluer et non un projet mené. Posé explicitement :
   * l'absence de date ne suffit pas à qualifier une carte d'exemple.
   */
  illustrative?: true;
};

export const appDev = {
  title: "Développement applicatif",
};

export const appProjects: Work[] = [
  {
    years: "2023",
    context: "Grand compte de l'industrie",
    title: "Un CRM à la place de onze fichiers de suivi",
    text: "Le pipeline commercial vivait dans des tableurs, un par agence, sans consolidation possible. Reprise de l'historique, référentiel unique d'affaires, connexion à l'outil de gestion.",
    metrics: [
      "Onze fichiers de suivi ramenés à un référentiel unique",
      "Chiffrage et facturation saisis une fois au lieu de trois",
    ],
  },
  {
    years: "2023 — 2024",
    context: "Industriel, deux sites de production",
    title: "Un ERP déployé sans arrêter la production",
    text: "Cadrage mené avec les équipes atelier et l'administration des ventes, reprise des données, déploiement par lots. Interfaces avec la comptabilité existante plutôt que remplacement intégral.",
    metrics: [
      "Deux sites basculés en six mois, aucune semaine de production perdue",
      "Comptabilité conservée et interfacée, au lieu d'être remplacée",
    ],
  },
  {
    years: "2022 — 2023",
    context: "Grand compte de l'industrie",
    title: "Une plateforme de commerce en ligne connectée au stock réel",
    text: "Catalogue, tunnel de commande et paiement, mais surtout la synchronisation avec la gestion. Recette menée avec le service client, qui absorbait jusque-là les écarts de stock.",
    metrics: [
      "Stock synchronisé toutes les quinze minutes avec la gestion",
      "Commandes annulées pour rupture divisées par cinq",
    ],
  },
  {
    years: "2023",
    context: "PME du monde du notariat",
    title: "Un extranet qui a remplacé six cents courriels par mois",
    text: "Suivi des commandes, documents contractuels et demandes d'intervention réunis dans un espace client. Les échanges qui transitaient par des boîtes mail personnelles sont devenus traçables.",
    metrics: [
      "Six cents courriels par mois remplacés par un espace traçable",
      "Relances sur l'état d'une commande en baisse de 80 %",
    ],
  },
  {
    years: "2024",
    context: "Réseau de points de vente",
    title: "Des tableaux de bord branchés sur la gestion, plus sur un tableur",
    text: "Consolidation automatique des chiffres de vente et de stock, actualisée chaque nuit. La direction lisait ses résultats le 15 du mois suivant ; elle les lit désormais le lendemain.",
    metrics: [
      "Résultats disponibles à J+1 au lieu du 15 du mois suivant",
      "Deux jours de production de reporting économisés chaque mois",
    ],
  },
  {
    years: "2024",
    context: "Réseau d'interventions terrain",
    title: "Une application mobile pour les équipes en déplacement",
    text: "Saisie des interventions hors connexion, photos et signatures sur place, synchronisation au retour du réseau.",
    metrics: [
      "Compte rendu transmis le jour même au lieu du vendredi",
      "Ressaisie au retour de tournée entièrement supprimée",
    ],
  },
];

export const ai = {
  title: "Automatisation et intelligence artificielle",
};

export const aiProjects: Work[] = [
  {
    years: "2020 — 2022",
    context: "Grand groupe américain du voyage en ligne",
    title: "Du machine learning en production, vingt millions de dollars par an",
    text: "Développement et maintenance d'un modèle en production, des pipelines de données jusqu'aux interfaces qui l'exposaient. Chaque évolution était rapportée à ce qu'elle produisait.",
    metrics: [
      "Vingt millions de dollars de revenu annuel portés par le modèle",
      "Deux ans de maintien en production, des pipelines à l'interface",
    ],
  },
  {
    years: "2026",
    context: "Éditeur de logiciels français",
    title: "L'intelligence artificielle installée dans le quotidien d'une équipe",
    text: "Développement piloté par les spécifications avec assistance IA, automatisation du suivi et des synthèses de management, bases de connaissances augmentées pour capitaliser le savoir de l'équipe.",
    metrics: [
      "Sept personnes équipées, du cadrage à la mise en production",
      "Suivi et synthèses de management produits automatiquement",
    ],
  },
];

/** Les quatre pistes à évaluer, affichées sous leur propre titre. */
export const aiExamples = {
  title: "Exemples de chantiers IA à évaluer",
};

export const aiCases: Work[] = [
  {
    context: "PME de plus de 30 salariés",
    title: "Traitement des factures fournisseurs",
    text: "Une piste à évaluer : extraire les données des factures, préparer l'imputation comptable et rapprocher les bons de commande. Les contrôles et le traitement des écarts sont à définir avec votre équipe.",
    metrics: [
      "Temps de traitement et de contrôle par facture",
      "Volume traité, taux d'erreur et coût de fonctionnement",
    ],
    illustrative: true,
  },
  {
    context: "PME de plus de 30 salariés",
    title: "Réponse aux appels d'offres et chiffrage",
    text: "Une piste à évaluer : retrouver les devis pertinents dans votre historique pour préparer un chiffrage et une trame de mémoire technique. Votre équipe vérifie les hypothèses et le document avant envoi.",
    metrics: [
      "Temps de préparation et de relecture par dossier",
      "Qualité des réponses et taux de transformation suivi dans le temps",
    ],
    illustrative: true,
  },
  {
    context: "PME de plus de 30 salariés",
    title: "Agent de premier niveau sur les demandes internes",
    text: "Une piste à évaluer : un assistant qui recherche dans votre documentation pour préparer des réponses aux questions RH et aux demandes de support outil. Les droits d'accès, les sources et le relais humain sont à cadrer.",
    metrics: [
      "Temps de réponse et qualité des réponses vérifiées",
      "Part des demandes nécessitant un relais humain",
    ],
    illustrative: true,
  },
  {
    context: "Startup financée",
    title: "Qualification du pipeline commercial",
    text: "Une piste à évaluer : préparer la qualification des demandes entrantes et proposer un premier message contextualisé. Le commercial vérifie les informations et relit le message avant envoi.",
    metrics: [
      "Temps de qualification et qualité des informations",
      "Rendez-vous qualifiés et coût de fonctionnement",
    ],
    illustrative: true,
  },
];
