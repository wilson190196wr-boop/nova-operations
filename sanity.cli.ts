import { defineCliConfig } from "sanity/cli";

/**
 * Configuration de la ligne de commande Sanity.
 *
 * Elle sert aux commandes utilitaires — extraction du schéma, génération des
 * types, gestion du jeu de données — et lit le projet depuis les mêmes
 * variables d'environnement que le site. Aucune valeur n'est écrite en dur
 * ici : deux sources d'identifiants finiraient par désigner deux projets.
 *
 * Le Studio, lui, n'est pas déployé par la CLI : il est servi par le site sur
 * /studio.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  },
});
