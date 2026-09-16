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
/**
 * Les icônes du site, déclarées explicitement plutôt que par la convention de
 * fichiers de Next.js.
 *
 * La convention impose les adresses `/favicon.ico`, `/icon.png` et
 * `/apple-icon.png`. Or ces trois adresses ont servi six semaines durant
 * l'icône du gabarit `create-next-app`, et les navigateurs conservent les
 * favicons dans une base à part, insensible aux en-têtes HTTP : ceux qui ont
 * visité le site pendant cette période gardent l'ancienne image, quoi que
 * réponde le serveur. Des adresses neuves n'ont, elles, aucune entrée en
 * cache nulle part.
 *
 * `public/favicon.ico` continue d'exister, mais n'est plus déclaré ici : il ne
 * sert qu'aux robots qui demandent ce chemin en dur sans lire le HTML.
 */
const ICONES = {
  icon: [
    { url: "/icones/keleria-32.png", sizes: "32x32", type: "image/png" },
    { url: "/icones/keleria-16.png", sizes: "16x16", type: "image/png" },
    { url: "/icones/keleria-256.png", sizes: "256x256", type: "image/png" },
  ],
  apple: [{ url: "/icones/keleria-180.png", sizes: "180x180", type: "image/png" }],
} satisfies Metadata["icons"];

/**
 * Le site est retiré des moteurs de recherche, à titre temporaire.
 *
 * Pour l'y remettre : passer les deux drapeaux à `true`, ou supprimer ce bloc
 * et la ligne `robots:` qui l'utilise. Rien d'autre n'est à défaire — en
 * particulier, `robots.txt` n'a volontairement pas été touché, pour la raison
 * expliquée ci-dessous.
 *
 * `robots.txt` interdit d'*explorer* ; cette balise interdit d'*indexer*. Les
 * deux se ressemblent et font le contraire l'une de l'autre : un `Disallow`
 * empêche le robot de charger la page, donc de lire la balise `noindex` qui
 * s'y trouve. Une page déjà indexée le resterait alors, faute pour le moteur
 * d'avoir jamais pu constater qu'elle demande à en sortir. Pour être
 * désindexé, il faut au contraire rester explorable.
 *
 * Le plan du site reste publié pour la même raison : il accélère le prochain
 * passage des robots, donc la prise en compte du retrait.
 */
const ROBOTS = { index: false, follow: false } satisfies Metadata["robots"];

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
    icons: ICONES,
    robots: ROBOTS,
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
