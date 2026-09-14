import type { MetadataRoute } from "next";
import { routes, urlAbsolue } from "@/lib/seo";

/**
 * Les six pages servies, dérivées de la même liste que les canonical.
 *
 * Ni `lastModified`, ni `priority`, ni `changefreq` : aucune date réelle de
 * modification éditoriale n'est suivie, et produire la date du jour à chaque
 * requête annoncerait un site modifié en permanence. Les deux autres champs
 * sont déclaratifs et n'engagent aucun moteur.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: urlAbsolue(route) }));
}
