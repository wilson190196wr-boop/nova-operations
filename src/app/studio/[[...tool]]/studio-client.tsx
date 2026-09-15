"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * La frontière client du Studio.
 *
 * Elle existe pour une raison technique précise. `sanity.config.ts` importe le
 * paquet `sanity` en entier ; importé depuis un composant serveur, il est
 * résolu sous la condition `react-server`, où certaines de ses dépendances
 * n'exposent pas les mêmes exports — la construction échoue alors sur un
 * `import useSWR from "swr"` qui n'a pas de cible.
 *
 * Marquer la frontière ici sort toute l'application d'administration du graphe
 * serveur. Ce n'est pas une perte : le Studio est une application de
 * navigateur, et son schéma doit de toute façon y être chargé pour composer
 * les formulaires.
 */
export function StudioClient() {
  return <NextStudio config={config} />;
}
