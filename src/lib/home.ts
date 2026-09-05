/**
 * Contenu de la page d'accueil — positionnement du 4 septembre 2026.
 *
 * Volontairement séparé de `content.ts`, qui porte encore les textes des briefs
 * de juillet utilisés par les autres pages. Les deux fusionneront quand chaque
 * page aura été reprise.
 */

export const site = {
  name: "NOVA",
  /** Accroche affichée à côté du mot-symbole et en pied de page. */
  baseline: "L'IA et le développement applicatif au service de la rentabilité",
};

export const mainNav = [
  { href: "/offres", label: "Offres" },
  { href: "/a-propos", label: "Qui sommes-nous" },
];

/** Le titre-image : une ligne par élément, la dernière est mise en couleur. */
export const heroLines = ["Où l'IA", "vous fait", "gagner", "de l'argent"];

export const heroTail =
  "Et où elle n'en fait pas. Vous le saurez en trois semaines, chiffres à l'appui, sortis de vos propres processus.";

/**
 * Bandeau de marques. Remplacer chaque entrée par le nom exact, et `logo` par le
 * chemin du fichier dans `public/logos/` quand les visuels seront disponibles.
 */
export const brands = [
  { name: "[MARQUE 1]", logo: null },
  { name: "[MARQUE 2]", logo: null },
  { name: "[MARQUE 3]", logo: null },
  { name: "[MARQUE 4]", logo: null },
  { name: "[MARQUE 5]", logo: null },
  { name: "[MARQUE 6]", logo: null },
];

export const audiences = [
  {
    who: "PME à partir de 30 salariés",
    headline: "Personne ne vient vous dire par où commencer.",
    points: [
      "Les agences et les ESN ne se déplacent pas pour vous.",
      "Les cabinets s'arrêtent au document.",
      "Pas de DSI, et la décision repose sur vous seul.",
    ],
  },
  {
    who: "Startups sans équipe technique",
    headline: "Aller vite sans porter un CTO à temps plein.",
    points: [
      "Quatre à six mois de recrutement, profil introuvable.",
      "Les décisions techniques se prennent sans personne pour les tenir.",
      "Je cadre, je construis, je pilote les prestataires.",
    ],
  },
];

/** Une vraie séquence : la numérotation est justifiée. */
export const steps = [
  {
    n: "01",
    title: "J'observe",
    text: "Entretiens dirigeant et terrain, observation des postes, extraction des données réelles. Aucun questionnaire.",
  },
  {
    n: "02",
    title: "Je chiffre",
    text: "Combien de fois cette information est-elle saisie, par combien de personnes. Le coût sort de vos chiffres.",
  },
  {
    n: "03",
    title: "Vous décidez",
    text: "Feuille de route priorisée, ROI estimé par chantier, et la liste de ce qui ne vaut pas la peine.",
  },
];

export const offers = [
  {
    name: "Audit",
    price: "2 500 / 7 500 €",
    tone: "dark" as const,
    text: "Ciblé sur un processus en deux semaines, ou complet sur toutes les fonctions en trois à quatre. Cartographie, score de maturité, feuille de route chiffrée.",
  },
  {
    name: "Accompagnement",
    price: "dès 1 600 €",
    tone: "accent" as const,
    text: "Comité mensuel avec le dirigeant, pilotage des chantiers et des prestataires, maintenance de ce qui tourne, score remis à jour chaque trimestre.",
  },
  {
    name: "Formation",
    price: null,
    tone: "quiet" as const,
    text: "Vos équipes formées sur vos cas réels, aux outils qu'elles vont vraiment utiliser. Jamais vendue seule : elle suit le diagnostic.",
  },
  {
    name: "Sprints",
    price: null,
    tone: "quiet" as const,
    text: "Les gains rapides construits en direct. Cinq jours maximum par automatisation — au-delà, ce n'est plus un sprint mais un projet.",
  },
];

export const alternatives = [
  {
    name: "Agence ou ESN",
    does: "Exécute un cahier des charges",
    flaw: "Suppose que vous savez déjà ce que vous voulez. Vend des jours, pas des résultats.",
    highlight: false,
  },
  {
    name: "Cabinet de conseil",
    does: "Produit une recommandation",
    flaw: "S'arrête au document. Rien n'est livré, rien n'est mesuré.",
    highlight: false,
  },
  {
    name: "Recruter un CTO",
    does: "Compétence interne permanente",
    flaw: "Poste lourd à porter, quatre à six mois de recrutement, profil introuvable en région.",
    highlight: false,
  },
  {
    name: "Ne rien faire",
    does: "—",
    flaw: "L'alternative la plus fréquente, et le vrai concurrent.",
    highlight: true,
  },
];
