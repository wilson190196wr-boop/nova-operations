/**
 * Les adresses que le code doit connaître.
 *
 * Elles ne sont pas éditoriales : ce sont des fichiers de l'App Router. La
 * page Offres sert les ancres des quatre offres, et l'aperçu de l'accueil ainsi
 * que le tableau comparatif y renvoient. Écrire `/offres` à trois endroits
 * garantissait qu'un jour l'un des trois ne suive pas.
 */
export const CHEMIN_OFFRES = "/offres";

/** La page vers laquelle pointent tous les appels à l'action du site. */
export const CHEMIN_CONTACT = "/contact";

/** La page des mentions légales, citée par le formulaire de contact. */
export const CHEMIN_MENTIONS_LEGALES = "/mentions-legales";

/**
 * Les six routes servies par le site, dans l'ordre de lecture.
 *
 * Elles vivent ici, dans un module sans dépendance, et non dans le schéma
 * Sanity : le plan du site en a besoin, et importer un fichier de schéma
 * depuis une route ferait entrer tout le paquet `sanity` dans le graphe
 * serveur — où certaines de ses dépendances ne se résolvent pas.
 *
 * La liste est fermée à dessein. Les adresses sont des fichiers de l'App
 * Router : en ajouter une dans le Studio ne créerait aucune URL.
 */
export const ROUTES = [
  { titre: "Accueil", valeur: "/" },
  { titre: "Offres", valeur: "/offres" },
  { titre: "Réalisations", valeur: "/realisations" },
  { titre: "À propos", valeur: "/a-propos" },
  { titre: "Contact", valeur: "/contact" },
  { titre: "Mentions légales", valeur: "/mentions-legales" },
] as const;

/**
 * L'identifiant stable d'une page, dérivé de son adresse.
 *
 * Il sert à trois endroits qui doivent s'accorder : l'arborescence du Studio,
 * la reprise des contenus et la résolution des liens de prévisualisation. Le
 * dériver plutôt que le saisir garantit qu'ils désignent le même document.
 */
export function identifiantPage(route: string): string {
  return route === "/" ? "page.accueil" : `page${route.replace(/\//g, ".")}`;
}
