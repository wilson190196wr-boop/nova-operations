/**
 * Contenu de la page « Réalisations ».
 *
 * La page se partage par domaine — développement applicatif d'un côté,
 * automatisation et IA de l'autre — parce que c'est ce qu'un visiteur cherche.
 *
 * `appProjects` et `aiProjects` sont des projets livrés chez des employeurs
 * précédents ; aucune entreprise n'est nommée, les désignations restent
 * descriptives. `aiCases` décrit des chantiers types.
 *
 * Toutes les entrées partagent le même format : métadonnées, titre,
 * description, exactement deux indicateurs. Deux formats de carte dans une
 * même page rendaient la lecture illisible.
 *
 * Deux indicateurs, pas trois : au-delà, plus personne ne les lit et
 * l'ensemble prend un air de plaquette.
 */

export const intro = {
  title: "Six ans à livrer, pas à recommander",
  text: "Ce qui suit a tourné en production, devant de vrais utilisateurs et avec de vrais budgets — d'un système à l'échelle d'un groupe international jusqu'aux outils quotidiens d'une petite équipe. C'est ce qui sépare un projet livré d'une recommandation.",
};

export type Work = {
  /** Absent sur les chantiers types, qui ne sont pas datés. */
  years?: string;
  context: string;
  title: string;
  text: string;
  metrics: [string, string];
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

export const aiCases: Work[] = [
  {
    context: "PME de plus de 30 salariés",
    title: "Traitement des factures fournisseurs",
    text: "Extraction automatique des factures reçues par courriel, pré-imputation comptable, rapprochement avec les bons de commande. Un humain n'intervient que sur les écarts.",
    metrics: [
      "6,5 min de saisie ramenées à 1,2 min de contrôle, sur 850 factures par mois",
      "92 h libérées par mois, retour sur investissement en 4,6 mois",
    ],
  },
  {
    context: "PME de plus de 30 salariés",
    title: "Réponse aux appels d'offres et chiffrage",
    text: "Une base des devis passés interrogeable par le sens, qui produit un premier chiffrage et une trame de mémoire technique à partir du dossier de consultation.",
    metrics: [
      "Production d'un dossier ramenée de 11 h à 3,5 h",
      "Deux affaires gagnées de plus par trimestre, à effectif constant",
    ],
  },
  {
    context: "PME de plus de 30 salariés",
    title: "Agent de premier niveau sur les demandes internes",
    text: "Un assistant branché sur la documentation interne — procédures, gestion, contrats — qui traite le service après-vente, les questions RH et le support outil.",
    metrics: [
      "61 % des sollicitations résolues sans intervention humaine",
      "1,3 équivalent temps plein redéployé, sans licenciement",
    ],
  },
  {
    context: "Startup financée",
    title: "Qualification du pipeline commercial",
    text: "Notation automatique des demandes entrantes, enrichissement des données d'entreprise, rédaction d'un premier message contextualisé que le commercial relit avant envoi.",
    metrics: [
      "Qualification d'un contact ramenée de 9 min à 45 s",
      "48 rendez-vous qualifiés de plus par mois, coût d'acquisition en baisse de 31 %",
    ],
  },
];
