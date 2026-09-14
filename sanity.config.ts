import { frFRLocale } from "@sanity/locale-fr-fr";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/env";
import { locations } from "@/sanity/presentation";
import { types } from "@/sanity/schema";
import { structure } from "@/sanity/structure";

/**
 * La configuration du Studio, servi par le site lui-même sur /studio.
 *
 * L'outil Presentation est la raison d'être de cette configuration : il affiche
 * le site dans un cadre, à côté du formulaire, et relie chaque texte au champ
 * qui le porte. Cliquer un titre dans l'aperçu ouvre son champ ; modifier le
 * champ redessine l'aperçu. Il ouvre le site en mode brouillon en appelant
 * `/api/draft-mode/enable`, qui pose le cookie et ne se laisse appeler que par
 * le Studio.
 *
 * L'outil Vision est installé en dernier : il exécute des requêtes GROQ à la
 * main, ce qui sert à comprendre ce que le site lit vraiment quand une page ne
 * montre pas ce qu'on attend.
 */
export default defineConfig({
  name: "keleria",
  title: "KELERIA",
  basePath: studioUrl.startsWith("/") ? studioUrl : "/studio",

  projectId,
  dataset,

  schema: { types },

  plugins: [
    // L'interface du Studio en français, pour que les libellés du schéma ne
    // soient pas le seul français au milieu d'une application anglaise.
    frFRLocale(),
    structureTool({ structure }),
    presentationTool({
      title: "Prévisualisation",
      previewUrl: {
        initial: "/",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
      resolve: { locations },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  document: {
    /**
     * Les deux documents uniques ne se créent pas depuis le menu « Créer ».
     *
     * Un second document « Réglages du site » serait silencieusement ignoré —
     * le site lit le plus ancien — et une page créée à la main ne
     * correspondrait à aucune route servie. Les uns et les autres s'ouvrent
     * depuis l'arborescence, à leur identifiant fixe.
     */
    newDocumentOptions: (precedents, { creationContext }) =>
      creationContext.type === "global"
        ? precedents.filter(
            (modele) => modele.templateId !== "parametresSite" && modele.templateId !== "page",
          )
        : precedents,
  },
});
