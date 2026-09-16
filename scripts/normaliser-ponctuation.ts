/**
 * Retire les tirets cadratins des contenus déjà publiés dans Sanity.
 *
 * Les fichiers de reprise ont été corrigés, mais la reprise s'écrit en
 * `createIfNotExists` : elle n'écrase jamais un document existant, et ne
 * corrigera donc pas ce qui est déjà dans le jeu de données. D'où ce script.
 *
 * Il ne remplace que des fragments connus, mot pour mot. Un texte retouché
 * depuis dans le Studio ne correspond plus au fragment attendu : il est laissé
 * intact et signalé, plutôt que ramené de force à une version antérieure.
 *
 *   npx tsx scripts/normaliser-ponctuation.ts              essai à blanc
 *   npx tsx scripts/normaliser-ponctuation.ts --appliquer  écriture réelle
 */

import { existsSync } from "node:fs";
import { createClient } from "@sanity/client";

for (const fichier of [".env.local", ".env"]) {
  if (existsSync(fichier)) {
    try {
      process.loadEnvFile(fichier);
    } catch {
      /* les variables du shell prennent le relais */
    }
  }
}

const APPLIQUER = process.argv.includes("--appliquer");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-14";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (!projectId || !dataset) {
  console.error("\n✖ NEXT_PUBLIC_SANITY_PROJECT_ID ou NEXT_PUBLIC_SANITY_DATASET manquante.\n");
  process.exit(1);
}
if (APPLIQUER && !token) {
  console.error("\n✖ SANITY_API_WRITE_TOKEN manquante : l'écriture demande un jeton.\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

/** La ponctuation seule change ; les mots sont repris à l'identique. */
const REGLES: [string, string][] = [
  ["2020 — 2022", "2020-2022"],
  ["2022 — 2024", "2022-2024"],
  ["2024 — 2026", "2024-2026"],
  ["2023 — 2024", "2023-2024"],
  ["2022 — 2023", "2022-2023"],
  ["Avignon — PACA et Occitanie", "Avignon : PACA et Occitanie"],
  ["et des libertés — 3 place de Fontenoy", "et des libertés : 3 place de Fontenoy"],
  ["Contact — réserver un échange", "Contact : réserver un échange"],
  ["que je recommande — y compris quand", "que je recommande, y compris quand"],
  ["gagner de l'argent — et où elle n'en fait pas", "gagner de l'argent, et où elle n'en fait pas"],
  ["de vrais budgets — d'un système à l'échelle", "de vrais budgets, d'un système à l'échelle"],
  ["KELERIA — Conseil IA et projets applicatifs", "KELERIA, conseil IA et projets applicatifs"],
  [
    "tels qu'ils tournent — pas ceux du manuel — pour chiffrer",
    "tels qu'ils tournent, pas ceux du manuel, pour chiffrer",
  ],
  [
    "dès l'audit — temps passé, délais, marge, qualité — selon ce que",
    "dès l'audit (temps passé, délais, marge, qualité), selon ce que",
  ],
  [
    "documentation interne — procédures, gestion, contrats — qui traite",
    "documentation interne (procédures, gestion, contrats) qui traite",
  ],
];

type Valeur = unknown;
const estObjet = (v: Valeur): v is Record<string, Valeur> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Réécrit récursivement les chaînes d'un document, en notant chaque chemin touché. */
function reecrire(valeur: Valeur, chemin: string, touches: string[]): Valeur {
  if (typeof valeur === "string") {
    let sortie = valeur;
    for (const [avant, apres] of REGLES) if (sortie.includes(avant)) sortie = sortie.split(avant).join(apres);
    if (sortie !== valeur) touches.push(chemin);
    return sortie;
  }
  if (Array.isArray(valeur)) return valeur.map((v, i) => reecrire(v, `${chemin}[${i}]`, touches));
  if (estObjet(valeur)) {
    const sortie: Record<string, Valeur> = {};
    for (const [cle, v] of Object.entries(valeur)) {
      // Les champs système ne sont ni du contenu ni modifiables.
      sortie[cle] = cle.startsWith("_") ? v : reecrire(v, chemin ? `${chemin}.${cle}` : cle, touches);
    }
    return sortie;
  }
  return valeur;
}

async function principal() {
  console.log(`\n▷ Normalisation de la ponctuation — projet ${projectId}, jeu « ${dataset} »`);
  console.log(APPLIQUER ? "   Mode : écriture réelle\n" : "   Mode : essai à blanc (aucune écriture)\n");

  const documents: Record<string, Valeur>[] = await client.fetch(
    '*[!(_id in path("_.**")) && _type in ["page","offre","realisation","parametresSite"]]',
  );
  console.log(`${documents.length} documents lus.\n`);

  let transaction = client.transaction();
  let nombre = 0;
  const restants: string[] = [];

  for (const doc of documents) {
    const touches: string[] = [];
    const reecrit = reecrire(doc, "", touches) as Record<string, Valeur>;
    if (touches.length) {
      nombre += 1;
      console.log(`  ${doc._id as string}`);
      for (const chemin of touches) console.log(`      ${chemin}`);
      const { _id, _type, _rev, _createdAt, _updatedAt, ...champs } = reecrit;
      void _type; void _rev; void _createdAt; void _updatedAt;
      transaction = transaction.patch(_id as string, (p) => p.set(champs));
    }
    // Un tiret qu'aucune règle ne reconnaît : texte retouché depuis, ou
    // passage que la reprise n'a pas prévu. Il est signalé, jamais deviné.
    const reste = JSON.stringify(reecrit);
    if (reste.includes("—")) restants.push(doc._id as string);
  }

  console.log(`\n${nombre} document(s) à corriger.`);

  if (restants.length) {
    console.log("\n! Tirets subsistants, non couverts par une règle :");
    for (const id of [...new Set(restants)]) console.log(`    ${id}`);
    console.log("  Corrigez-les dans le Studio : les réécrire à l'aveugle risquerait d'écraser une retouche.");
  }

  if (!APPLIQUER) {
    console.log("\nEssai à blanc terminé. Relancez avec --appliquer pour écrire.\n");
    return;
  }
  if (nombre === 0) {
    console.log("\nRien à écrire.\n");
    return;
  }
  await transaction.commit({ visibility: "sync" });
  console.log("\n✓ Écrit et visible.\n");
}

principal().catch((erreur) => {
  console.error("\n✖ Interrompu :", erreur instanceof Error ? erreur.message : erreur);
  process.exit(1);
});
