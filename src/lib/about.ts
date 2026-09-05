/**
 * Contenu de la page « Qui sommes-nous ».
 *
 * Tous les faits de cette page proviennent du CV de septembre 2026 : dates,
 * employeurs, tailles d'équipe, formation. Ne rien ajouter ici qui ne soit
 * vérifiable — c'est la page qu'un prospect recoupera sur LinkedIn.
 */

export const founder = {
  name: "Wilson Rault",
  role: "Fondateur de NOVA",
  quote:
    "J'ai écrit le code, puis dirigé ceux qui l'écrivent. Une PME n'a accès ni à l'un, ni à l'autre.",
};

export const facts = [
  { label: "Formation", value: "IMT Mines Alès" },
  { label: "Parcours", value: "Expedia, Glanum, Septeo" },
  { label: "Basé à", value: "Montpellier" },
];

/** Le récit, dans l'ordre : du code à la direction, puis retour au terrain. */
export const story = [
  {
    period: "2020 — 2022",
    place: "Expedia Group, Genève",
    role: "Ingénieur en développement logiciel",
    text: "J'ai passé deux ans sur un projet de machine learning qui générait vingt millions de dollars par an. C'est là que j'ai appris ce que veut dire une valeur mesurée : chaque fonctionnalité était rapportée à ce qu'elle produisait, ou elle ne partait pas en production.",
  },
  {
    period: "2022 — 2024",
    place: "Agence Glanum, Avignon",
    role: "Chef de projet",
    text: "Une dizaine de projets menés de front — sites, e-commerce, ERP, big data, intelligence artificielle. J'y ai mis en place la méthode agile et les indicateurs de suivi, et j'ai découvert l'écart entre ce qu'un client demande et ce dont il a besoin.",
  },
  {
    period: "2024 — 2026",
    place: "Agence Glanum, Avignon",
    role: "Directeur de production",
    text: "Douze personnes à diriger, des grands comptes à servir, des sous-traitants à piloter. J'ai vu l'agence de l'intérieur, donc je sais pourquoi elle ne se déplace pas pour une PME de quarante personnes : le modèle vend des jours, et une petite structure n'en achète pas assez.",
  },
  {
    period: "2026",
    place: "Septeo, Montpellier",
    role: "Engineering Manager",
    text: "Six développeurs et un testeur, et surtout l'occasion d'industrialiser l'IA sur mes propres processus : développement piloté par les spécifications, reporting et synthèses automatisés, bases de connaissances augmentées pour l'équipe. Je ne vends pas une technologie que je n'ai pas pratiquée.",
  },
];

export const turn = {
  title: "Puis j'ai regardé qui n'était servi par personne.",
  paragraphs: [
    "Les PME entendent parler d'intelligence artificielle tous les jours. Elles ont le budget, elles ont le besoin, et aucune offre calibrée en face : les agences et les ESN ne se déplacent pas, les cabinets s'arrêtent au document, et recruter un directeur technique n'a aucun sens à leur échelle.",
    "Les startups dont le métier n'est pas la tech vivent le même problème par l'autre bout : elles doivent aller vite sans pouvoir porter un poste à temps plein.",
    "NOVA existe pour ces deux situations. Le même métier, à temps partagé : je diagnostique de l'intérieur, je chiffre, puis je construis ce qui va vite ou je pilote ceux qui construisent le reste.",
  ],
};

export const principles = [
  {
    title: "Le diagnostic avant la proposition",
    text: "Rien n'est proposé avant d'avoir regardé les processus, les outils et la maturité réelle. Le diagnostic n'est pas une phase commerciale déguisée : c'est ce qui rend le reste défendable.",
  },
  {
    title: "Supprimer avant d'automatiser",
    text: "Automatiser une tâche inutile la rend seulement plus rapidement inutile, et fige dans un outil une organisation qu'il fallait revoir. On élimine d'abord, on outille ensuite.",
  },
  {
    title: "Aucune commission éditeur",
    text: "Je ne revends aucune licence et je ne touche rien sur les outils que je recommande — y compris quand je recommande celui que vous payez déjà.",
  },
  {
    title: "L'engagement porte sur le résultat",
    text: "Heures récupérées, euros économisés. Mesurés avant, mesurés après. Un chantier sans indicateur avant et après ne rentre pas dans la feuille de route.",
  },
];
