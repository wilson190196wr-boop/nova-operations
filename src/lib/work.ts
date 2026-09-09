/**
 * Contenu de la page « Réalisations ».
 *
 * La page se partage par domaine — développement applicatif d'un côté,
 * automatisation et IA de l'autre — parce que c'est ce qu'un visiteur cherche.
 *
 * Deux régimes coexistent malgré tout et ne doivent jamais se confondre :
 * `appProjects` et `aiProjects` sont des projets réellement livrés chez des
 * employeurs précédents, aucune entreprise n'étant nommée ; `aiCases` décrit
 * des scénarios types dont l'économie est modélisée. La note qui les précède
 * le dit explicitement — sans elle, ce serait fabriquer des preuves.
 *
 * Deux indicateurs par scénario, pas davantage : au-delà, plus personne ne les
 * lit et l'ensemble prend un air de plaquette.
 */

export const intro = {
  title: "Six ans à livrer, pas à recommander",
  text: "Ce qui suit a tourné en production, devant de vrais utilisateurs et avec de vrais budgets — d'un système à l'échelle d'un groupe international jusqu'aux outils quotidiens d'une équipe de sept. C'est ce qui sépare un projet livré d'une recommandation.",
};

export const appDev = {
  title: "Développement applicatif",
  text: "Des outils de gestion mis en production dans des entreprises qui tournaient jusque-là sur des tableurs et des ressaisies.",
};

export const appProjects = [
  {
    years: "2023",
    context: "Grand compte du BTP",
    title: "Un CRM à la place de onze fichiers de suivi",
    text: "Le pipeline commercial vivait dans des tableurs, un par agence, sans consolidation possible. Reprise de l'historique, référentiel unique d'affaires, connexion à l'outil de gestion pour que le chiffrage et la facturation cessent d'être ressaisis.",
  },
  {
    years: "2023 — 2024",
    context: "Industriel, deux sites de production",
    title: "Un ERP déployé sans arrêter la production",
    text: "Cadrage mené avec les équipes atelier et l'administration des ventes, reprise des données, déploiement par lots pour qu'aucune semaine de production ne soit perdue. Interfaces avec la comptabilité existante plutôt que remplacement intégral.",
  },
  {
    years: "2022 — 2023",
    context: "Marque de distribution",
    title: "Une plateforme de commerce en ligne connectée au stock réel",
    text: "Catalogue, tunnel de commande et paiement, mais surtout la synchronisation avec la gestion : plus de commandes acceptées sur des produits indisponibles. Recette menée avec le service client, qui absorbait jusque-là les écarts de stock.",
  },
  {
    years: "2024",
    context: "Réseau d'interventions terrain",
    title: "Une application mobile pour les équipes en déplacement",
    text: "Saisie des interventions hors connexion, photos et signatures sur place, synchronisation au retour du réseau. Le compte rendu partait le jour même au lieu d'attendre le retour au bureau le vendredi.",
  },
];

export const ai = {
  title: "Automatisation et intelligence artificielle",
  text: "Deux systèmes passés en production, puis les chantiers que je mets en place aujourd'hui chez les PME et les startups.",
};

export const aiProjects = [
  {
    years: "2020 — 2022",
    context: "Grand groupe américain du voyage en ligne",
    title: "Du machine learning en production, vingt millions de dollars par an",
    text: "Développement et maintenance d'un modèle en production, des pipelines de données jusqu'aux interfaces qui l'exposaient. Chaque évolution était rapportée à ce qu'elle produisait : c'est là que j'ai pris l'habitude de ne défendre que ce qui se mesure.",
  },
  {
    years: "2026",
    context: "Éditeur de logiciels français",
    title: "L'intelligence artificielle installée dans le quotidien d'une équipe",
    text: "Développement piloté par les spécifications avec assistance IA, automatisation du suivi et des synthèses de management, bases de connaissances augmentées pour capitaliser le savoir de l'équipe. Des gains sur le travail réel, pas une démonstration.",
  },
];

export const aiCasesNote =
  "Les chantiers ci-dessous sont des scénarios types. Les chiffres sont des ordres de grandeur modélisés à partir de situations réelles, pas des résultats obtenus chez un client : le vôtre sortira du diagnostic.";

export const aiCases = [
  {
    audience: "PME de plus de 30 salariés",
    title: "Traitement des factures fournisseurs",
    text: "Extraction automatique des factures reçues par courriel, pré-imputation comptable, rapprochement avec les bons de commande. Un humain n'intervient que sur les écarts.",
    metrics: [
      "6,5 min de saisie ramenées à 1,2 min de contrôle, sur 850 factures par mois",
      "92 h libérées par mois, retour sur investissement en 4,6 mois",
    ],
  },
  {
    audience: "PME de plus de 30 salariés",
    title: "Réponse aux appels d'offres et chiffrage",
    text: "Une base des devis passés interrogeable par le sens, qui produit un premier chiffrage et une trame de mémoire technique à partir du dossier de consultation.",
    metrics: [
      "Production d'un dossier ramenée de 11 h à 3,5 h",
      "Deux affaires gagnées de plus par trimestre, à effectif constant",
    ],
  },
  {
    audience: "PME de plus de 30 salariés",
    title: "Agent de premier niveau sur les demandes internes",
    text: "Un assistant branché sur la documentation interne — procédures, gestion, contrats — qui traite le service après-vente, les questions RH et le support outil.",
    metrics: [
      "61 % des sollicitations résolues sans intervention humaine",
      "1,3 équivalent temps plein redéployé, sans licenciement",
    ],
  },
  {
    audience: "Startup financée",
    title: "Qualification du pipeline commercial",
    text: "Notation automatique des demandes entrantes, enrichissement des données d'entreprise, rédaction d'un premier message contextualisé que le commercial relit avant envoi.",
    metrics: [
      "Qualification d'un contact ramenée de 9 min à 45 s",
      "48 rendez-vous qualifiés de plus par mois, coût d'acquisition en baisse de 31 %",
    ],
  },
  {
    audience: "Startup financée",
    title: "Support produit et boucle de retour utilisateur",
    text: "Déviation des tickets par un agent branché sur la documentation, et regroupement automatique des verbatims vers le backlog produit.",
    metrics: [
      "44 % des tickets traités sans intervention, coût unitaire de 4,80 € à 1,90 €",
      "Neuf mois de croissance absorbés sans recruter au support",
    ],
  },
];
