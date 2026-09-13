/**
 * Contenu de la page d'accueil — positionnement du 4 septembre 2026.
 *
 * Porte aussi l'identité du site, désormais seule : `content.ts` en gardait une
 * seconde copie pour les pages de juillet, avec une accroche périmée. Deux
 * objets `site` cohabitaient donc, et ce que le visiteur lisait dépendait de la
 * page où il se trouvait.
 */

/**
 * L'identité du site, source unique. Les coordonnées valent aussi pour les
 * mentions légales et pour l'adresse de réception du formulaire : les changer
 * ici les change partout.
 */
export const site = {
  name: "KELERIA",
  /** Accroche affichée à côté du mot-symbole et en pied de page. */
  baseline: "Le digital et l'IA, là où ils rapportent.",
  email: "wilson@keleria.com",
  phone: "+33 6 62 90 92 59",
  address: "Avignon",
};

export const mainNav = [
  { href: "/offres", label: "Offres" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/a-propos", label: "À propos" },
];

/**
 * Le titre d'accueil : une ligne par élément.
 *
 * Le découpage reste manuel plutôt que laissé au navigateur — c'est la
 * composition voulue, et non le hasard de la largeur disponible.
 *
 * La charte ne colore pas ce titre. L'azur y portait auparavant les deux
 * compétences ; il marque désormais les numéros, les surtitres et les puces,
 * où il signale une hiérarchie au lieu de se disputer l'attention avec le
 * titre lui-même.
 */
export const heroLines = ["Votre partenaire", "IA et développement", "applicatif"];

export const heroTail =
  "En trois semaines, vous saurez où l'IA vous fait gagner de l'argent — et où elle n'en fait pas. Puis on construit, et je reste jusqu'au résultat mesuré.";

/**
 * Bandeau de marques : employeurs et clients rencontrés en agence.
 *
 * `logo` pointe un fichier de `public/logos/`. Tant qu'il vaut null, le nom est
 * composé typographiquement — le bandeau reste lisible pendant que les visuels
 * arrivent. Les SVG locaux passent automatiquement en `unoptimized` dans
 * next/image, aucune configuration à ajouter.
 *
 * Chaque logo doit venir de la charte officielle de la marque, pas d'une
 * banque d'images : ce sont des marques déposées, leurs conditions d'usage
 * priment.
 */
export const brands: {
  name: string;
  /**
   * `scale` corrige l'équilibre optique : chaque logo a ses propres marges
   * internes, donc à hauteur égale ils ne pèsent pas pareil. Réglé à l'œil,
   * 1 étant la hauteur de référence de la rangée.
   */
  logo: { src: string; width: number; height: number; scale?: number } | null;
}[] = [
  {
    name: "Expedia Group",
    // Wikimedia Commons, domaine public (logo purement typographique).
    logo: { src: "/logos/expedia-group.svg", width: 836, height: 664, scale: 0.92 },
  },
  {
    name: "Septeo",
    // Wikipédia francophone, sous « marque déposée » — aplat de fond retiré.
    logo: { src: "/logos/septeo.svg", width: 2688, height: 1099 },
  },
  {
    name: "Colas",
    // Wikipédia francophone, sous « marque déposée ». Fond transparent.
    logo: { src: "/logos/colas.png", width: 800, height: 333, scale: 1.15 },
  },
  {
    name: "ORTEC",
    // Wikimedia Commons. Attention : fond opaque, à ne pas poser sur du sombre.
    logo: { src: "/logos/ortec.png", width: 610, height: 236, scale: 1.1 },
  },
  {
    name: "Hermès",
    // Wikipédia francophone, sous « marque déposée ». Vecteur monochrome.
    logo: { src: "/logos/hermes.svg", width: 750, height: 435, scale: 1.3 },
  },
];


export const audiences = [
  {
    who: "Les PME de plus de 30 salariés",
    headline: "Personne ne vient vous dire par où commencer.",
    // En prose plutôt qu'en puces : une liste à trois points fait diapositive.
    text: "Les agences et les ESN ne se déplacent pas pour vous — trop petit, pas assez de jours à vendre. Les cabinets produisent une recommandation, puis s'arrêtent au document. Et vous n'avez pas de DSI : la décision repose sur vous seul.",
  },
  {
    who: "Les startups sans équipe technique",
    headline: "Aller vite sans porter un CTO à temps plein.",
    text: "Quatre à six mois de recrutement pour un profil introuvable en région, puis un poste lourd à tenir. En attendant, les décisions techniques se prennent sans personne pour les porter.",
  },
];


/** Une vraie séquence : la numérotation est justifiée. */
export const steps = [
  {
    n: "01",
    title: "J'analyse",
    text: "Entretiens avec le dirigeant et le terrain, observation des postes, extraction des données réelles. Une méthode pour mettre en lumière vos réels besoins.",
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
  {
    n: "04",
    title: "Je pilote",
    text: "Je choisis les prestataires ou je constitue une équipe. Je pilote les projets jusqu'à la livraison et la mesure du ROI.",
  },
];

/**
 * Les prix ne figurent pas sur l'accueil : ils vivent sur la page Offres.
 *
 * Les quatre cartes partagent désormais la même surface claire. Elles
 * portaient un dégradé de quatre bleus nuit, qui hiérarchisait quatre offres
 * de rang égal — la charte les remet sur un pied d'égalité.
 */
export const offers = [
  {
    name: "Audit",
    text: "Ciblé sur un processus en deux semaines, ou complet sur toutes les fonctions en trois à quatre. Cartographie, score de maturité, feuille de route chiffrée.",
  },
  {
    name: "Sprints",
    text: "Nous mettons en place des quick wins mesurables : solutions sélectionnées sur le marché, automatisation IA, agent IA. Deux semaines maximum par sujet. Au-delà, ce n'est plus un sprint mais un projet.",
  },
  {
    name: "Accompagnement",
    text: "Comité mensuel avec le dirigeant, pilotage des chantiers et des prestataires, maintenance de ce qui tourne, score remis à jour chaque trimestre.",
  },
  {
    name: "Formation",
    text: "Vos équipes formées sur vos cas réels, aux outils qu'elles vont vraiment utiliser. Jamais vendue seule : elle suit le diagnostic.",
  },
];


/**
 * Une phrase par alternative plutôt qu'un tableau à trois colonnes : « ce que
 * ça fait » et « sa faille » séparés faisaient une taxonomie, pas un argument.
 */
export const alternatives = [
  {
    name: "Une agence ou une ESN",
    text: "Elle exécute un cahier des charges — celui que vous n'avez pas su écrire.",
    highlight: false,
  },
  {
    name: "Un cabinet de conseil",
    text: "Il produit une recommandation, puis s'arrête au document. Rien n'est livré, rien n'est mesuré, et l'exécution reste entièrement à votre charge.",
    highlight: false,
  },
  {
    name: "Recruter un directeur technique",
    text: "Une compétence permanente pour un besoin qui ne l'est pas, quatre à six mois avant qu'elle arrive, et un profil introuvable en région.",
    highlight: false,
  },
  {
    name: "Ne rien faire",
    text: "C'est l'alternative la plus fréquente, et donc mon vrai concurrent. Elle ne coûte rien aujourd'hui et se paie sur toutes les années suivantes.",
    highlight: true,
  },
];

