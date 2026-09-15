import { NextStudioLayout } from "next-sanity/studio";

/**
 * La racine du Studio, distincte de celle du site.
 *
 * C'est la raison pour laquelle les pages publiques vivent dans le groupe
 * `(site)` : le Studio ne doit hériter ni de `globals.css`, dont les règles de
 * base réécrivent la couleur des liens, la sélection de texte et le
 * défilement, ni de l'en-tête et du pied de page. Deux racines, deux mises en
 * page ; passer de l'une à l'autre provoque un rechargement complet, ce qui est
 * sans conséquence entre un site et son administration.
 *
 * `metadata` pose `robots: noindex` : le Studio ne doit apparaître dans aucun
 * résultat de recherche.
 */
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>
        <NextStudioLayout>{children}</NextStudioLayout>
      </body>
    </html>
  );
}
