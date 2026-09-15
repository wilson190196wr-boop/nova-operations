import type { QueryParams } from "next-sanity";
import { sanityFetch } from "./live";
import { REQUETE_OFFRES_PUBLIEES, REQUETE_PAGE, REQUETE_PARAMETRES, REQUETE_ROUTES } from "./queries";
import type { OffrePubliee, Page, ParametresSite } from "./types";

/**
 * L'étiquette posée sur toutes les lectures de contenu.
 *
 * Le webhook de publication l'invalide, et les six pages se régénèrent. Une
 * étiquette par document serait plus chirurgicale ; sur six pages statiques,
 * elle serait surtout une mécanique de plus à maintenir juste. Régénérer six
 * pages coûte moins cher que se tromper de page à régénérer.
 */
export const ETIQUETTE_CONTENU = "contenu";

/**
 * Lecture typée.
 *
 * `sanityFetch` renvoie `unknown` tant que les types ne sont pas générés
 * depuis le schéma : la conversion est donc explicite ici, en un seul endroit,
 * plutôt que dispersée dans chaque page.
 */
async function lire<T>(query: string, params: QueryParams = {}): Promise<T> {
  const { data } = await sanityFetch({ query, params, tags: [ETIQUETTE_CONTENU] });
  return data as T;
}

/**
 * Signale une donnée absente au lieu de la contourner.
 *
 * Un repli silencieux vers un contenu de secours donnerait un site qui a l'air
 * de fonctionner pendant que le CMS est mal branché ou mal rempli. La panne ne
 * se verrait qu'au moment où quelqu'un publierait une modification sans effet.
 */
function exigee<T>(valeur: T | null | undefined, quoi: string): T {
  if (valeur === null || valeur === undefined) {
    throw new Error(
      `Contenu introuvable dans Sanity : ${quoi}. ` +
        "Si le jeu de données vient d'être créé, lancez la reprise des contenus : " +
        "`npx tsx scripts/reprise-contenus.ts --appliquer`.",
    );
  }
  return valeur;
}

/** Une page et ses sections, par son adresse. */
export async function lirePage(route: string): Promise<Page> {
  const page = await lire<Page | null>(REQUETE_PAGE, { route });
  return exigee(page, `aucune page ne porte l'adresse « ${route} »`);
}

/** Les réglages partagés par tout le site. */
export async function lireParametres(): Promise<ParametresSite> {
  const parametres = await lire<ParametresSite | null>(REQUETE_PARAMETRES);
  return exigee(parametres, "le document « Réglages du site » est absent");
}

/** Les offres publiées, pour le balisage Schema.org. */
export async function lireOffresPubliees(): Promise<OffrePubliee[]> {
  return lire<OffrePubliee[]>(REQUETE_OFFRES_PUBLIEES);
}

/**
 * Les adresses réellement publiées, pour le plan du site.
 *
 * Une page dépubliée sort du plan du site sans qu'on ait à y penser. À
 * l'inverse, une liste vide n'est jamais servie : un plan de site sans URL se
 * lit, côté moteur de recherche, comme un site qui n'a plus aucune page. Mieux
 * vaut faire échouer la construction que désindexer le site en silence.
 */
export async function lireRoutes(): Promise<string[]> {
  const routes = await lire<string[] | null>(REQUETE_ROUTES);
  if (!routes?.length) {
    throw new Error(
      "Aucune page publiée dans Sanity : le plan du site serait vide, ce qui reviendrait " +
        "à annoncer aux moteurs de recherche un site sans aucune page. " +
        "Lancez la reprise des contenus : `npx tsx scripts/reprise-contenus.ts --appliquer`.",
    );
  }
  return routes;
}
