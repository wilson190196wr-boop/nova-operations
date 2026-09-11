export const site = {
  name: "KELERIA",
  tagline: "Fractional COO · Performance Partner",
  baseline: "Nous trouvons les heures perdues de votre entreprise.",
  email: "wilson@keleria.com",
  phone: "+33 6 62 90 92 59",
  address: "Avignon",
};

export const nav = [
  { href: "/methode", label: "Méthode" },
  { href: "/offres", label: "Offres" },
  { href: "/secteurs", label: "Secteurs" },
  { href: "/cas-clients", label: "Cas clients" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
];

export const offers = [
  {
    slug: "audit",
    name: "KELERIA Audit™",
    step: "01",
    duration: "3 à 4 semaines",
    price: "À partir de 8 900 €",
    tagline: "Diagnostic complet des opérations.",
    description:
      "Nous cartographions vos processus réels — pas ceux du manuel qualité — pour chiffrer précisément où partent les heures et la marge.",
    deliverables: [
      "Cartographie des processus clés",
      "Analyse du parc outils et des doublons",
      "Identification des irritants terrain",
      "Quick Wins activables sous 30 jours",
      "Opportunités d'automatisation & IA",
      "Roadmap priorisée à 12 mois",
      "Estimation du ROI par chantier",
    ],
  },
  {
    slug: "sprint",
    name: "KELERIA Sprint™",
    step: "02",
    duration: "6 à 10 semaines",
    price: "À partir de 14 500 €",
    tagline: "Déploiement des améliorations prioritaires.",
    description:
      "On exécute. Cycles courts, périmètre verrouillé, résultat mesuré en fin de sprint — et une équipe qui sait faire tourner la machine sans nous.",
    deliverables: [
      "Automatisation des tâches répétitives",
      "Simplification des workflows",
      "Intégration et connexion des outils",
      "Tableaux de bord de pilotage",
      "Assistants IA métiers",
      "Formation et passation aux équipes",
    ],
  },
  {
    slug: "partner",
    name: "KELERIA Partner™",
    step: "03",
    duration: "Engagement 6 à 12 mois",
    price: "À partir de 3 200 € / mois",
    tagline: "Votre Fractional COO, chaque mois.",
    description:
      "Un directeur des opérations à temps partagé, au comité de direction, qui tient la feuille de route et les indicateurs dans la durée.",
    deliverables: [
      "Participation aux comités de direction",
      "Suivi des indicateurs de performance",
      "Pilotage des projets d'amélioration",
      "Challenge continu des processus",
      "Identification de nouveaux gains",
      "Coordination des prestataires",
    ],
  },
  {
    slug: "studio",
    name: "KELERIA Studio™",
    step: "04",
    duration: "Au projet",
    price: "Sur devis",
    tagline: "Un interlocuteur unique côté technique.",
    description:
      "Quand un développement ou une intégration s'impose, nous pilotons les partenaires techniques. Vous gardez un seul contact, un seul budget, un seul planning.",
    deliverables: [
      "Cadrage fonctionnel et technique",
      "Sélection et pilotage des partenaires",
      "Recette et mise en production",
      "Suivi budgétaire et planning",
      "Garantie de résultat sur le périmètre",
    ],
  },
];

export const pillars = [
  {
    id: "processus",
    name: "Processus",
    score: 62,
    description:
      "Cartographier les flux réels, éliminer les doubles saisies, fiabiliser les points de rupture.",
  },
  {
    id: "organisation",
    name: "Organisation",
    score: 66,
    description:
      "Clarifier qui décide, qui exécute, qui contrôle. Supprimer les zones grises coûteuses.",
  },
  {
    id: "pilotage",
    name: "Pilotage",
    score: 71,
    description:
      "Des indicateurs peu nombreux, justes et suivis. Un rituel de décision qui tient dans le temps.",
  },
  {
    id: "digital",
    name: "Digital",
    score: 45,
    description:
      "Exploiter ce que vous payez déjà avant d'acheter. Connecter l'existant, retirer le superflu.",
  },
  {
    id: "automatisation",
    name: "Automatisation",
    score: 18,
    description:
      "Industrialiser les tâches répétitives à faible valeur : relances, saisies, reportings, contrôles.",
  },
  {
    id: "ia",
    name: "Intelligence Artificielle",
    score: 12,
    description:
      "Des cas d'usage ciblés et mesurables, branchés sur vos données. Jamais l'IA pour l'IA.",
  },
];

export const promises = [
  { value: "−31 %", label: "de tâches sans valeur ajoutée", note: "moyenne constatée après un Sprint" },
  { value: "×2,4", label: "de vitesse sur les flux critiques", note: "devis, facturation, planification" },
  { value: "+4,1 pts", label: "de marge opérationnelle", note: "sur 12 mois d'accompagnement" },
  { value: "11 j", label: "avant le premier Quick Win", note: "en moyenne après le kick-off" },
];

export const sectors = [
  {
    name: "Industrie",
    stat: "18 h/sem.",
    statLabel: "récupérées en ordonnancement",
    points: [
      "Ordonnancement et suivi de production",
      "Traçabilité et non-qualité",
      "Interface ERP / atelier",
    ],
  },
  {
    name: "BTP",
    stat: "−40 %",
    statLabel: "de temps sur les situations de travaux",
    points: [
      "Chiffrage et devis",
      "Suivi de chantier et pointages",
      "Situations, avenants, facturation",
    ],
  },
  {
    name: "Fabrication",
    stat: "×3",
    statLabel: "de réactivité sur les demandes de prix",
    points: [
      "Configuration produit et devis",
      "Approvisionnements et stocks",
      "Coûts de revient réels",
    ],
  },
  {
    name: "Cabinets de services",
    stat: "+22 %",
    statLabel: "de temps facturable",
    points: [
      "Production et revue de dossiers",
      "Temps passés et rentabilité mission",
      "Collecte client et relances",
    ],
  },
  {
    name: "Logistique",
    stat: "−27 %",
    statLabel: "d'erreurs de préparation",
    points: [
      "Réception, préparation, expédition",
      "Pilotage transporteurs",
      "Litiges et service client",
    ],
  },
];

export const cases = [
  {
    slug: "menuiserie-industrielle",
    sector: "Industrie · 140 salariés",
    title: "Du devis au planning atelier en 48 h au lieu de 12 jours",
    context:
      "Un fabricant de menuiseries techniques perdait ses affaires sur les délais de réponse, faute de circuit clair entre commerce, bureau d'études et production.",
    metrics: [
      { value: "−82 %", label: "délai de réponse" },
      { value: "+9 %", label: "taux de transformation" },
      { value: "6 mois", label: "retour sur investissement" },
    ],
    program: ["KELERIA Audit™", "KELERIA Sprint™"],
  },
  {
    slug: "groupe-btp-regional",
    sector: "BTP · 210 salariés",
    title: "16 000 heures administratives rendues aux conducteurs de travaux",
    context:
      "Trois filiales, trois façons de saisir les heures, une consolidation mensuelle faite à la main sur tableur par deux personnes à temps plein.",
    metrics: [
      { value: "16 000 h", label: "récupérées par an" },
      { value: "1 seul", label: "référentiel de données" },
      { value: "+3,4 pts", label: "de marge chantier" },
    ],
    program: ["KELERIA Audit™", "KELERIA Sprint™", "KELERIA Partner™"],
  },
  {
    slug: "cabinet-ingenierie",
    sector: "Ingénierie · 55 salariés",
    title: "Un pilotage de la rentabilité mission enfin fiable",
    context:
      "Le dirigeant découvrait la rentabilité de ses missions six semaines après leur clôture. Les dérives n'étaient plus rattrapables.",
    metrics: [
      { value: "J+1", label: "fraîcheur des indicateurs" },
      { value: "+22 %", label: "de temps facturable" },
      { value: "4", label: "outils supprimés" },
    ],
    program: ["KELERIA Audit™", "KELERIA Partner™"],
  },
  {
    slug: "logistique-sous-traitance",
    sector: "Logistique · 90 salariés",
    title: "La préparation de commandes sans papier ni ressaisie",
    context:
      "Chaque commande était imprimée, annotée, puis ressaisie deux fois. Le taux de litige plafonnait à 4,8 %.",
    metrics: [
      { value: "−27 %", label: "d'erreurs de préparation" },
      { value: "0", label: "ressaisie manuelle" },
      { value: "11 j", label: "avant le premier gain" },
    ],
    program: ["KELERIA Sprint™", "KELERIA Studio™"],
  },
];

export const articles = [
  {
    slug: "heures-perdues-pme",
    category: "Performance opérationnelle",
    date: "18 juillet 2026",
    readingTime: "7 min",
    title: "Les 7 endroits où une PME perd 30 heures par semaine",
    excerpt:
      "Ce ne sont jamais les grands projets qui coûtent cher. Ce sont les micro-frictions répétées 400 fois par mois, invisibles dans les comptes mais bien réelles dans les plannings.",
  },
  {
    slug: "fractional-coo",
    category: "Fractional COO",
    date: "4 juillet 2026",
    readingTime: "6 min",
    title: "Fractional COO : pourquoi les PME arrêtent de recruter un DirOp",
    excerpt:
      "Un directeur des opérations expérimenté coûte 120 k€ chargés. À temps partagé, vous achetez l'expertise sans la structure de coûts — et sans les 9 mois de recrutement.",
  },
  {
    slug: "ia-avant-automatisation",
    category: "IA & automatisation",
    date: "21 juin 2026",
    readingTime: "8 min",
    title: "Non, votre problème n'est pas un problème d'IA",
    excerpt:
      "Dans 80 % des audits, les gains les plus rapides viennent d'un processus supprimé, pas d'un modèle branché. L'IA arrive après — et elle rend alors beaucoup plus.",
  },
  {
    slug: "roi-transformation",
    category: "ROI",
    date: "6 juin 2026",
    readingTime: "5 min",
    title: "Comment chiffrer le ROI d'un chantier d'organisation",
    excerpt:
      "Heures récupérées, coût horaire chargé, taux de réutilisation, effet marge. La méthode de calcul que nous présentons en comité de direction, étape par étape.",
  },
  {
    slug: "audit-30-jours",
    category: "Méthode",
    date: "23 mai 2026",
    readingTime: "6 min",
    title: "Ce qu'on regarde vraiment pendant les 30 premiers jours",
    excerpt:
      "Les entretiens terrain valent mieux que n'importe quel questionnaire. Voici la trame que nous utilisons, et les trois questions qui font tout basculer.",
  },
  {
    slug: "outils-doublons",
    category: "Digital",
    date: "9 mai 2026",
    readingTime: "4 min",
    title: "Vous payez en moyenne 4 outils qui font la même chose",
    excerpt:
      "Le parc applicatif d'une PME de 100 salariés dépasse souvent 30 abonnements. Un tiers est redondant, un autre tiers n'est plus utilisé.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Immersion",
    duration: "Semaine 1",
    text: "Entretiens dirigeants et terrain, observation des postes, extraction des données réelles d'activité.",
  },
  {
    n: "02",
    title: "Diagnostic",
    duration: "Semaines 2 – 3",
    text: "Cartographie des processus, scoring KELERIA OS™ sur les six piliers, chiffrage des pertes.",
  },
  {
    n: "03",
    title: "Roadmap",
    duration: "Semaine 4",
    text: "Chantiers priorisés par ratio gain / effort, ROI estimé, séquencement sur 12 mois.",
  },
  {
    n: "04",
    title: "Exécution",
    duration: "Mois 2 – 4",
    text: "Sprints de déploiement, périmètre verrouillé, résultat mesuré à chaque fin de cycle.",
  },
  {
    n: "05",
    title: "Pilotage",
    duration: "En continu",
    text: "Fractional COO au comité de direction, indicateurs suivis, nouveaux gains identifiés.",
  },
];

export const differentiators = [
  {
    them: "Un cabinet de conseil livre une recommandation.",
    us: "Nous auditons, puis nous restons jusqu'au résultat mesuré.",
  },
  {
    them: "Une ESN vend des jours de développement.",
    us: "Nous supprimons d'abord le processus. On développe seulement si c'est justifié.",
  },
  {
    them: "Un intégrateur défend son outil.",
    us: "Nous sommes indépendants de tout éditeur. Aucune commission, aucun parti pris.",
  },
  {
    them: "Un freelance IA branche un modèle.",
    us: "Nous coordonnons les partenaires et vous restez avec un interlocuteur unique.",
  },
];

export const faq = [
  {
    q: "Combien de temps avant les premiers résultats ?",
    a: "Ça dépend de ce que le diagnostic révèle. Un chantier simple peut produire un effet en quelques semaines, un sujet plus lourd demande davantage. Je vous donne un ordre de grandeur une fois vos processus regardés, pas avant.",
  },
  {
    q: "Faut-il changer nos outils actuels ?",
    a: "Rarement. Dans la majorité des missions, les gains viennent d'une meilleure exploitation de l'existant et de la suppression des doublons.",
  },
  {
    q: "Vos interventions perturbent-elles notre activité ?",
    a: "Je travaille par périmètres courts et réversibles, avec les équipes concernées. L'activité continue de tourner pendant la mission, quel que soit le métier.",
  },
  {
    q: "Comment mesurez-vous le retour sur investissement ?",
    a: "Sur des indicateurs choisis avec vous dès l'audit — temps passé, délais, marge, qualité — selon ce que le chantier vise. Mesurés avant, mesurés après, et revus en comité.",
  },
  {
    q: "Où intervenez-vous ?",
    a: "Je suis basé à Avignon et j'interviens sur tout le territoire. Les phases de terrain se font sur place, le pilotage à distance.",
  },
];
