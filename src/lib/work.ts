/**
 * Contenu de la page « Réalisations ».
 *
 * La page a deux régimes qu'il ne faut jamais mélanger :
 *
 * - `delivered` : des projets réellement livrés chez des employeurs
 *   précédents, pas sous NOVA. Aucune entreprise n'est nommée, les
 *   désignations restent descriptives.
 * - `useCases` : des scénarios types dont l'économie est modélisée. Ce ne sont
 *   pas des résultats obtenus chez un client, et l'introduction de la section
 *   le dit explicitement. Les présenter autrement reviendrait à fabriquer des
 *   preuves.
 */

export const intro = {
  title: "Six ans à livrer, pas à recommander",
  text: "Ce qui suit a tourné en production, devant de vrais utilisateurs et avec de vrais budgets — d'un système à l'échelle d'un groupe international jusqu'aux outils quotidiens d'une équipe de sept. C'est ce qui sépare un projet livré d'une recommandation.",
};

export const delivered = [
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

export const useCasesIntro = {
  title: "Ce que je mets en place aujourd'hui",
  text: "Cinq chantiers types, avec l'économie qu'ils produisent sur un périmètre représentatif. Les chiffres sont des ordres de grandeur modélisés à partir de situations réelles, pas des résultats obtenus chez un client : le vôtre sortira du diagnostic.",
};

export const useCases = [
  {
    audience: "PME de plus de 30 salariés",
    title: "Traitement des factures fournisseurs et rapprochement",
    text: "Extraction automatique des factures reçues par courriel, pré-imputation comptable, rapprochement avec les bons de commande. Un humain n'intervient que sur les écarts.",
    metrics: [
      "850 factures par mois, 6,5 min de saisie manuelle ramenées à 1,2 min de contrôle",
      "92 h par mois libérées, soit environ 2 900 € de charge administrative",
      "12 k€ de construction puis 350 € par mois, retour sur investissement en 4,6 mois",
      "Taux d'erreur de saisie ramené de 3,1 % à 0,4 %",
    ],
  },
  {
    audience: "PME de plus de 30 salariés",
    title: "Réponse aux appels d'offres et chiffrage",
    text: "Une base des devis passés interrogeable par le sens, qui produit un premier chiffrage et une trame de mémoire technique à partir du dossier de consultation.",
    metrics: [
      "Production d'un dossier ramenée de 11 h à 3,5 h",
      "18 dossiers par mois, soit 40 % de dossiers traités en plus à effectif constant",
      "Taux de réponse aux consultations porté de 55 % à 78 %",
      "Deux affaires gagnées de plus par trimestre, à 45 k€ de chiffre d'affaires moyen",
    ],
  },
  {
    audience: "PME de plus de 30 salariés",
    title: "Agent de premier niveau sur les demandes internes et clients",
    text: "Un assistant branché sur la documentation interne — procédures, gestion, contrats — qui traite le service après-vente, les questions RH et le support outil.",
    metrics: [
      "640 sollicitations par mois, 61 % résolues sans intervention humaine",
      "Temps de réponse moyen ramené de 4 h 20 à 6 min",
      "1,3 équivalent temps plein redéployé, soit environ 52 k€ par an",
      "Aucun licenciement : c'est ce qui fait passer le projet en interne",
    ],
  },
  {
    audience: "Startup financée",
    title: "Qualification et enrichissement du pipeline commercial",
    text: "Notation automatique des demandes entrantes, enrichissement des données d'entreprise, rédaction d'un premier message contextualisé que le commercial relit avant envoi.",
    metrics: [
      "1 400 contacts par mois, qualification ramenée de 9 min à 45 s",
      "Taux de prise de rendez-vous porté de 4,2 % à 7,6 %",
      "48 rendez-vous qualifiés de plus par mois, pour 1 100 € par mois d'infrastructure",
      "Coût d'acquisition client en baisse de 31 %",
    ],
  },
  {
    audience: "Startup financée",
    title: "Support produit et boucle de retour utilisateur",
    text: "Déviation des tickets par un agent branché sur la documentation, et regroupement automatique des verbatims vers le backlog produit.",
    metrics: [
      "310 tickets par semaine, dont 44 % traités sans intervention",
      "Coût par ticket ramené de 4,80 € à 1,90 €",
      "Délai entre un signal utilisateur et son arrivée au backlog : trois semaines à 48 h",
      "18 k€ économisés par an, et surtout neuf mois de croissance sans recruter au support",
    ],
  },
];
