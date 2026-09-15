import type { MetadataRoute } from "next";
import { urlAbsolue } from "@/lib/seo";
import { lireRoutes } from "@/sanity/lire";
import { ROUTES } from "@/sanity/routes";

/**
 * Les pages réellement publiées, dérivées du CMS.
 *
 * Ni `lastModified`, ni `priority`, ni `changefreq` : aucune date réelle de
 * modification éditoriale n'est suivie, et produire la date du jour à chaque
 * requête annoncerait un site modifié en permanence. Les deux autres champs
 * sont déclaratifs et n'engagent aucun moteur.
 *
 * L'ordre suit celui du site et non l'ordre alphabétique que rend la requête.
 * Aucun moteur n'y attache de sens, mais le plan du site se relit à l'œil, et
 * l'ordre des pages est ce qui le rend lisible.
 *
 * Les adresses viennent des documents, les URL absolues du code : une adresse
 * canonique ressaisie dans un CMS finit par désigner une page qui redirige.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publiees = new Set(await lireRoutes());
  const connues = ROUTES.map((route) => route.valeur as string);

  // Les routes connues d'abord, dans l'ordre du site ; puis, par sécurité,
  // toute adresse publiée que cette version du code ne connaîtrait pas encore.
  const ordonnees = [
    ...connues.filter((route) => publiees.has(route)),
    ...[...publiees].filter((route) => !connues.includes(route)).sort(),
  ];

  return ordonnees.map((route) => ({ url: urlAbsolue(route) }));
}
