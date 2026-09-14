import type { NextConfig } from "next";

/**
 * L'identifiant du projet Sanity sert à restreindre l'optimiseur d'images.
 *
 * Il est lu ici directement plutôt que via `src/sanity/env.ts` : ce module
 * lève une erreur quand la variable manque, ce qui est le bon comportement
 * pour le site mais empêcherait `next lint` de tourner sur une machine non
 * configurée. La liste blanche se contente donc du dossier `/images` de
 * Sanity tant que le projet n'est pas connu — c'est un garde-fou de sécurité,
 * pas une source de contenu.
 */
const projet = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

const nextConfig: NextConfig = {
  images: {
    /**
     * Les visuels viennent désormais du CDN de Sanity. Sans cette entrée,
     * `next/image` répond 400 sur toute URL distante.
     *
     * `search` est volontairement omis : les URL construites par
     * `@sanity/image-url` portent une chaîne de requête (`auto`, `fit`, `w`),
     * et déclarer `search: ""` les rejetterait toutes.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: projet ? `/images/${projet}/**` : "/images/**",
      },
    ],
    /**
     * Obligatoire depuis Next 16 : sans liste, n'importe qui peut demander
     * autant de qualités que voulu et faire travailler l'optimiseur. 75 est la
     * valeur par défaut de `next/image`, et la seule employée ici.
     */
    qualities: [75],
  },
};

export default nextConfig;
