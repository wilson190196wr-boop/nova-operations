import type { Metadata } from "next";
import { DIMENSIONS_PARTAGE, urlPartage } from "@/sanity/image";
import { lirePage, lireParametres } from "@/sanity/lire";

/**
 * L'adresse publique du site, et les métadonnées qui en dérivent.
 *
 * `siteUrl` reste dans le code, et c'est délibéré : ce n'est pas un contenu
 * mais une donnée de déploiement. Les redirections publiques envoient tout sur
 * `www` ; une valeur éditable ici permettrait de publier des adresses
 * canoniques qui redirigent, ou pointent sur un autre domaine, sans que rien
 * ne se voie sur le site.
 *
 * Tout le reste — titre, description, visuel de partage — vient de Sanity.
 * L'adresse canonique, l'URL Open Graph et l'entrée de plan de site dérivent
 * de la route et ne sont jamais saisies : trois copies d'une même adresse
 * finissent par désigner trois pages différentes.
 */
export const siteUrl = "https://www.keleria.com";

/**
 * Construit une URL absolue sans paramètre ni fragment, et sans slash final
 * sur les routes internes — la forme exacte que servent les pages.
 */
export function urlAbsolue(route: string): string {
  return route === "/" ? siteUrl : `${siteUrl}${route}`;
}

/**
 * Métadonnées complètes d'une route : canonique absolue, titre, description,
 * Open Graph et Twitter.
 *
 * L'URL Open Graph est la canonique elle-même, pour qu'un partage ne désigne
 * jamais une autre adresse que celle indexée. Le titre est publié tel quel,
 * suffixe compris, sans passer par un gabarit : le gabarit ne s'applique pas
 * au titre par défaut de la racine, et mélanger les deux mécanismes produisait
 * un suffixe tantôt absent, tantôt doublé.
 */
export async function metadonnees(route: string): Promise<Metadata> {
  const [page, parametres] = await Promise.all([lirePage(route), lireParametres()]);

  const { titre, description } = page.seo;
  const url = urlAbsolue(route);

  // Le visuel propre à la page l'emporte ; à défaut, celui du site.
  const visuel = page.seo.imagePartage?.url ? page.seo.imagePartage : parametres.imagePartage;
  const adresseVisuel = urlPartage(visuel);

  const images = adresseVisuel
    ? [{ url: adresseVisuel, ...DIMENSIONS_PARTAGE, alt: visuel.alt }]
    : undefined;

  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: titre,
      description,
      url,
      siteName: parametres.nom,
      locale: "fr_FR",
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: titre,
      description,
      images: adresseVisuel ? [adresseVisuel] : undefined,
    },
  };
}
