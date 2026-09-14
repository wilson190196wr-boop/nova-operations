import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * Aucune règle de blocage : les quatre anciennes routes ont été supprimées et
 * répondent déjà 404, il n'y a rien à masquer. Un `Disallow` posé « au cas
 * où » est le seul moyen simple de désindexer tout un site par accident.
 *
 * Pas de directive pour les robots d'IA non plus : restreindre l'usage des
 * contenus est une décision commerciale, pas un réglage technique.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
