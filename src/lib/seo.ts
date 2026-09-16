import type { Metadata } from "next";

/**
 * Source unique des URL et des métadonnées du site.
 *
 * Deux raisons de centraliser. D'abord l'hôte : les redirections publiques
 * envoient tout sur `www`, mais `metadataBase` pointait sur le domaine nu ;
 * chaque URL absolue dérivée désignait donc une adresse qui redirige. Ensuite
 * le sitemap et les canonical doivent énumérer exactement les mêmes six
 * adresses — deux listes séparées divergent au premier ajout de page.
 */
export const siteUrl = "https://www.keleria.com";

/** Les six routes servies. Le sitemap et les canonical en dérivent tous deux. */
export const routes = [
  "/",
  "/offres",
  "/realisations",
  "/a-propos",
  "/contact",
  "/mentions-legales",
] as const;

export type Route = (typeof routes)[number];

/**
 * Construit une URL absolue sans paramètre ni fragment, et sans slash final
 * sur les routes internes — la forme exacte que servent les six pages.
 */
export function urlAbsolue(route: Route): string {
  return route === "/" ? siteUrl : `${siteUrl}${route}`;
}

/** Visuel de partage unique ; les textes, eux, restent propres à chaque page. */
export const imagePartage = {
  url: `${siteUrl}/og-keleria.png`,
  width: 1200,
  height: 630,
  alt: "KELERIA, conseil IA et projets applicatifs",
};

type Page = { title: string; description: string };

/**
 * Titres et descriptions retenus, page par page.
 *
 * Le titre est écrit en entier plutôt que passé au gabarit `%s · KELERIA` :
 * le gabarit ne s'applique pas au titre par défaut de la racine, et mélanger
 * les deux mécanismes produisait un suffixe tantôt absent, tantôt doublé.
 */
export const pages: Record<Route, Page> = {
  "/": {
    title: "Conseil IA et projets applicatifs en PACA et Occitanie · KELERIA",
    description:
      "À Avignon, KELERIA accompagne les PME et startups en PACA et Occitanie : audit IA, développement applicatif et pilotage de projets. Parlons de votre besoin.",
  },
  "/offres": {
    title: "Audit IA, sprints et CTO à temps partagé · KELERIA",
    description:
      "Audit IA, sprints, pilotage applicatif, accompagnement mensuel et formation liée au diagnostic. Découvrez les formats et les livrables adaptés à votre projet.",
  },
  "/realisations": {
    title: "Projets applicatifs et IA : parcours et exemples · KELERIA",
    description:
      "CRM, ERP, applications mobiles et IA : les projets du parcours de Wilson Rault et des exemples de chantiers à évaluer pour votre entreprise.",
  },
  "/a-propos": {
    title: "Wilson Rault, consultant IA et projets applicatifs · KELERIA",
    description:
      "Wilson Rault, fondateur de KELERIA à Avignon : ingénieur des Mines d'Alès, passé par Expedia Group, Glanum et Septeo. Conseil et pilotage de projets.",
  },
  "/contact": {
    title: "Contact : réserver un échange de 45 minutes · KELERIA",
    description:
      "Parlez de votre projet IA ou applicatif avec Wilson Rault : rendez-vous de 45 minutes, formulaire ou téléphone. Basé à Avignon, pour les PME et startups.",
  },
  "/mentions-legales": {
    title: "Mentions légales · KELERIA",
    description:
      "Éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles du site KELERIA.",
  },
};

/**
 * Métadonnées complètes d'une route : canonical absolue, titre, description,
 * Open Graph et Twitter. L'URL Open Graph est la canonical elle-même, pour
 * qu'un partage ne désigne jamais une autre adresse que celle indexée.
 */
export function metadonnees(route: Route): Metadata {
  const { title, description } = pages[route];
  const url = urlAbsolue(route);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "KELERIA",
      locale: "fr_FR",
      type: "website",
      images: [imagePartage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePartage.url],
    },
  };
}
