/**
 * Diagnostic de la liaison entre le site et Sanity.
 *
 * Répond à la question « pourquoi cette page est-elle vide ? » en interrogeant
 * Sanity exactement comme le fait le site, puis exactement comme le fait un
 * visiteur anonyme. La différence entre les deux est la panne la plus fréquente
 * et la plus silencieuse : un document qu'un éditeur connecté voit très bien,
 * mais que le site public ne peut pas lire.
 *
 *   npx tsx scripts/diagnostic-sanity.ts
 */

import { existsSync } from "node:fs";
import { createClient } from "@sanity/client";
import { REQUETE_PAGE, REQUETE_PARAMETRES } from "../src/sanity/queries";
import { ROUTES } from "../src/sanity/routes";

for (const fichier of [".env.local", ".env"]) {
  if (existsSync(fichier)) {
    try {
      process.loadEnvFile(fichier);
    } catch {
      /* les variables du shell prennent le relais */
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-14";

if (!projectId || !dataset) {
  console.error("\n✖ NEXT_PUBLIC_SANITY_PROJECT_ID ou NEXT_PUBLIC_SANITY_DATASET manquante. Voir .env.example.\n");
  process.exit(1);
}

const base = { projectId, dataset, apiVersion, perspective: "published" as const };

async function principal() {
  console.log(`\n▷ Diagnostic — projet ${projectId}, jeu de données ${dataset}\n`);

  let probleme = false;

  for (const useCdn of [false, true]) {
    const client = createClient({ ...base, useCdn });
    console.log(useCdn ? "── via le CDN (ce que lit le site) ──" : "── via l'API directe ──");

    const parametres = await client.fetch(REQUETE_PARAMETRES).catch(() => null);
    console.log(`  Réglages du site      ${parametres ? "✓ lisibles" : "✖ ABSENTS"}`);
    if (!parametres) probleme = true;

    for (const route of ROUTES) {
      let etat: string;
      try {
        const page = await client.fetch(REQUETE_PAGE, { route: route.valeur });
        if (page) {
          etat = `✓ ${String(page.blocs?.length ?? 0).padStart(2)} sections`;
        } else {
          etat = "✖ INTROUVABLE";
          probleme = true;
        }
      } catch (erreur) {
        etat = `✖ ERREUR ${(erreur as Error).message.slice(0, 80)}`;
        probleme = true;
      }
      console.log(`  ${route.valeur.padEnd(20)}  ${etat}`);
    }
    console.log();
  }

  // La lecture anonyme : c'est elle qui décide de ce que voit un visiteur.
  const anonyme = createClient({ ...base, useCdn: false });
  const comptes = await anonyme.fetch<Record<string, number>>(`{
    "pages": count(*[_type == "page"]),
    "offres": count(*[_type == "offre"]),
    "realisations": count(*[_type == "realisation"]),
    "reglages": count(*[_type == "parametresSite"]),
    "identifiantsImbriques": count(*[_type in ["page","offre","realisation","parametresSite"] && _id match "*.*"])
  }`);

  console.log("── ce qu'un visiteur anonyme peut lire ──");
  console.log(`  pages ${comptes.pages} · offres ${comptes.offres} · réalisations ${comptes.realisations} · réglages ${comptes.reglages}`);

  if (comptes.identifiantsImbriques > 0) {
    probleme = true;
    console.error(
      `\n✖ ${comptes.identifiantsImbriques} document(s) ont un point dans leur identifiant.\n` +
        '  Sanity y voit un chemin imbriqué, hors du droit de lecture publique « _id in path("*") ».\n' +
        "  Le Studio les affiche normalement ; le site public les voit comme absents.\n" +
        '  N\'élargissez pas ce droit à path("**") : cela exposerait aussi les brouillons.\n' +
        "  Corrigez les identifiants et relancez la reprise.",
    );
  }

  console.log(
    probleme
      ? "\n✖ Au moins un point bloque la lecture. Voir ci-dessus.\n"
      : "\n✓ Le site lit tout ce dont il a besoin, via le CDN comme en direct.\n",
  );
  process.exit(probleme ? 1 : 0);
}

principal().catch((erreur) => {
  console.error("\n✖ Diagnostic interrompu :", erreur);
  process.exit(1);
});
