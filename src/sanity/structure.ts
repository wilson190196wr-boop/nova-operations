import type { StructureResolver } from "sanity/structure";
import { identifiantPage, ROUTES } from "./routes";

/**
 * L'arborescence du Studio.
 *
 * Deux décisions la gouvernent.
 *
 * Les pages sont listées une par une, à leur adresse, plutôt qu'en liste
 * ouverte : le site sert six routes, et « créer une page » depuis le Studio ne
 * créerait aucune URL — seulement un document que personne ne verrait. Chaque
 * entrée pointe un identifiant fixe, ce qui rend aussi la reprise des contenus
 * rejouable sans produire de doublon.
 *
 * Les réglages du site sont un document unique, ouvert directement sur son
 * formulaire. Sans cela, le Studio proposerait d'en créer un second, et le site
 * lirait le plus ancien des deux sans que rien ne l'indique.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              ROUTES.map((route) =>
                S.listItem()
                  .title(route.titre)
                  .id(identifiantPage(route.valeur))
                  .child(
                    S.document()
                      .schemaType("page")
                      .documentId(identifiantPage(route.valeur))
                      .title(route.titre),
                  ),
              ),
            ),
        ),

      S.divider(),

      S.documentTypeListItem("offre").title("Offres"),
      S.documentTypeListItem("realisation").title("Réalisations"),

      S.divider(),

      S.listItem()
        .title("Réglages du site")
        .id("parametresSite")
        .child(
          S.document()
            .schemaType("parametresSite")
            .documentId("parametresSite")
            .title("Réglages du site"),
        ),
    ]);
