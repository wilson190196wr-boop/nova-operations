import { createClient } from "next-sanity";
import { apiHost, apiVersion, dataset, projectId, studioUrl } from "./env";

/**
 * Le client de lecture du site public.
 *
 * `perspective: "published"` est le réglage qui protège les visiteurs : quelle
 * que soit la requête, un brouillon ne peut pas sortir par cette porte. La
 * prévisualisation passe par un autre chemin — `sanityFetch` de `live.ts`, qui
 * ne change de perspective que si le mode brouillon est actif et qu'un jeton
 * serveur est présent.
 *
 * `stega.studioUrl` n'active pas l'encodage : il indique seulement où pointer
 * quand il est activé, c'est-à-dire dans l'outil Presentation. Sans cette
 * valeur, cliquer un texte dans la prévisualisation n'ouvrirait aucun champ.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl },
  /**
   * Hors production standard, l'hôte peut être redirigé. `useProjectHostname`
   * doit alors passer à faux : sans cela le client viserait
   * `<projet>.<hôte>` au lieu de l'hôte tel quel.
   */
  ...(apiHost ? { apiHost, useProjectHostname: false } : {}),
});
