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
  /**
   * La page « introuvable » du site, servie sur toute adresse inconnue.
   *
   * Le drapeau est nécessaire parce que l'application a deux racines de mise
   * en page — `(site)` et `studio` — et aucun `app/layout.tsx` au-dessus
   * d'elles. C'est exactement le cas que la documentation de Next désigne :
   * sans racine unique, il n'y a aucune mise en page à partir de laquelle
   * composer un 404 global, et `app/global-not-found.tsx` prend le relais.
   *
   * Les deux autres emplacements possibles ont été essayés et écartés, mesure
   * à l'appui. Un `not-found.tsx` dans le groupe `(site)` n'est jamais servi
   * sur une adresse inconnue : Next continuait de rendre sa page intégrée.
   * Un `not-found.tsx` à la racine de `app/` est bien servi, mais sans racine
   * de mise en page au-dessus de lui : Next l'enveloppe alors dans un `<html>`
   * nu, sans `lang="fr"`, sans les polices et sans `globals.css`.
   *
   * `globalNotFound` est marqué expérimental depuis Next 15.4. La contrepartie
   * est assumée : la seule autre façon d'obtenir une page 404 aux couleurs du
   * site serait de réintroduire une mise en page racine commune au site et au
   * Studio — ce que l'intégration Sanity a précisément défait.
   */
  experimental: { globalNotFound: true },
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
