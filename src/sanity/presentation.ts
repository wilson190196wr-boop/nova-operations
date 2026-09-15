import { defineLocations, type DocumentLocationResolvers } from "sanity/presentation";

/**
 * Où va-t-on voir ce document sur le site ?
 *
 * C'est ce que l'outil Presentation demande pour chaque document ouvert, afin
 * de proposer les pages concernées. Sans cette résolution, éditer une offre
 * n'ouvrirait aucune prévisualisation : le document n'est lui-même adressable
 * nulle part, il n'apparaît qu'à l'intérieur de pages.
 *
 * Les offres et les réalisations sont donc résolues par les pages qui les
 * citent, et non par une adresse propre. La requête part de la page et
 * remonte : c'est ce qui rend la réponse juste même si l'offre est déplacée
 * d'une page à l'autre.
 */
export const locations: DocumentLocationResolvers = {
  page: defineLocations({
    select: { titre: "titre", route: "route" },
    resolve: (doc) =>
      doc?.route
        ? { locations: [{ title: doc.titre || doc.route, href: doc.route }] }
        : { message: "Cette page n'a pas encore d'adresse.", tone: "caution" },
  }),

  offre: defineLocations({
    select: { nom: "nom", ancre: "slug.current" },
    resolve: (doc) =>
      doc?.ancre
        ? {
            locations: [
              { title: `Page Offres — ${doc.nom ?? ""}`.trim(), href: `/offres#${doc.ancre}` },
              { title: "Accueil", href: "/" },
            ],
          }
        : { message: "Cette offre n'a pas encore d'ancre.", tone: "caution" },
  }),

  realisation: defineLocations({
    select: { titre: "titre" },
    resolve: (doc) => ({
      locations: [{ title: doc?.titre ? `Réalisations — ${doc.titre}` : "Réalisations", href: "/realisations" }],
    }),
  }),

  parametresSite: defineLocations({
    select: { nom: "nom" },
    resolve: () => ({
      locations: [{ title: "Accueil", href: "/" }],
      message: "Les réglages sont repris sur toutes les pages du site.",
    }),
  }),
};
