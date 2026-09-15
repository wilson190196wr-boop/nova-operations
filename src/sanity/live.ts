import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { readToken } from "./env";

/**
 * La lecture des contenus, et le canal de mise à jour de la prévisualisation.
 *
 * `sanityFetch` fait deux choses utiles ici. Il étiquette chaque réponse avec
 * les identifiants des documents qui la composent (`sanity:…`), ce qui permet
 * d'invalider exactement les pages concernées depuis le webhook de
 * publication. Et il bascule seul sur les brouillons quand le mode brouillon
 * est actif — sans jamais le faire pour un visiteur ordinaire, puisque ce mode
 * tient à un cookie que seul le Studio sait poser.
 *
 * Lire `draftMode().isEnabled` ne rend pas la page dynamique : Next ne compte
 * comme accès dynamique que `enable()` et `disable()`. Les six pages restent
 * donc pré-rendues, exactement comme avant la mise sous CMS.
 *
 * `browserToken: false` est un choix délibéré. Un jeton confié au navigateur
 * permettrait de prévisualiser les brouillons hors du Studio ; il serait aussi
 * lisible par quiconque ouvre les sources. La prévisualisation passe donc
 * uniquement par l'outil Presentation, qui fournit lui-même ses droits. C'est
 * le principe du moindre privilège, et cela évite un secret de plus à faire
 * tourner.
 */
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: readToken || false,
  browserToken: false,
});
