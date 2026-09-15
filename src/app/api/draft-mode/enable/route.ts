import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";
import { readToken } from "@/sanity/env";

/**
 * L'entrée en prévisualisation, appelée par l'outil Presentation du Studio.
 *
 * Elle n'est pas protégée par un secret partagé mais par le mécanisme officiel
 * de Sanity : le Studio crée un secret à usage unique et de courte durée dans
 * le jeu de données, l'ajoute à l'adresse, et cette route le vérifie avant de
 * poser le cookie. Rien à faire tourner à la main, rien à recopier dans deux
 * environnements — et un lien de prévisualisation qui fuite expire de lui-même.
 *
 * Le jeton de lecture est vérifié à l'appel et non au chargement du module :
 * le site public n'a pas besoin de ce jeton, et le faire manquer ne doit pas
 * empêcher la construction. Seule la prévisualisation s'arrête, avec un
 * message qui dit quoi faire.
 */
const activer = readToken
  ? defineEnableDraftMode({ client: client.withConfig({ token: readToken }) })
  : null;

export async function GET(request: Request): Promise<Response> {
  if (!activer) {
    return new Response(
      "SANITY_API_READ_TOKEN manquant : la prévisualisation des brouillons ne peut pas fonctionner. " +
        "Créez un jeton en lecture seule dans sanity.io/manage, puis renseignez-le dans .env.local et chez l'hébergeur.",
      { status: 500 },
    );
  }
  return activer.GET(request);
}
