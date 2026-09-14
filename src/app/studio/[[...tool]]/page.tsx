import { StudioClient } from "./studio-client";

/**
 * Le Studio, servi par le site lui-même.
 *
 * La route est attrape-tout et facultative (`[[...tool]]`) parce que le Studio
 * gère sa propre navigation : /studio, /studio/structure/page;page.accueil,
 * /studio/presentation… doivent tous rendre la même application.
 *
 * `force-static` évite de refabriquer une coquille identique à chaque visite :
 * la page ne contient qu'un point de montage, tout le reste est chargé par le
 * navigateur. L'accès, lui, n'est pas public pour autant — l'application exige
 * une connexion Sanity et n'affiche aucun contenu à qui n'a pas les droits sur
 * le projet.
 */
export const dynamic = "force-static";

export default function StudioPage() {
  return <StudioClient />;
}
