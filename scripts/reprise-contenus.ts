/**
 * Reprise des contenus du site dans Sanity.
 *
 * Le script compose les documents à partir de `scripts/contenus-initiaux/` —
 * le contenu du site avant sa mise sous CMS, déplacé sans être modifié — puis
 * les écrit dans le jeu de données.
 *
 * Quatre garanties le gouvernent.
 *
 * Il est rejouable. Chaque document porte un identifiant stable et dérivé, et
 * l'écriture se fait en `createIfNotExists` : relancer le script ne crée aucun
 * doublon et n'écrase aucune modification éditoriale. Un document déjà présent
 * est laissé exactement tel qu'il est, même s'il a divergé de la source.
 *
 * Il ne détruit rien : aucune suppression, aucun remplacement, aucune
 * opération sur le jeu de données lui-même.
 *
 * Il simule par défaut. Sans `--appliquer`, rien n'est écrit : le script
 * énumère ce qu'il ferait, y compris les images qu'il téléverserait.
 *
 * Il signale ce qui demande une reprise humaine plutôt que de la masquer.
 *
 *   npm run reprise              # simulation
 *   npm run reprise:appliquer    # écriture
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { createClient } from "@sanity/client";
import { composer, type Document, type ReferenceImage } from "./contenus-initiaux/composer";

/* ------------------------------------------------------ Environnement */

for (const fichier of [".env.local", ".env"]) {
  if (existsSync(fichier)) {
    try {
      process.loadEnvFile(fichier);
    } catch {
      /* fichier illisible : les variables du shell prennent le relais */
    }
  }
}

const APPLIQUER = process.argv.includes("--appliquer");

function echouer(message: string): never {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function obligatoire(nom: string): string {
  const valeur = process.env[nom]?.trim();
  if (!valeur) echouer(`Variable d'environnement manquante : ${nom}. Voir .env.example.`);
  return valeur;
}

const projectId = obligatoire("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = obligatoire("NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-14";
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

if (APPLIQUER && !token) {
  echouer(
    "SANITY_API_WRITE_TOKEN manquant.\n" +
      "Créez un jeton « Editor » dans sanity.io/manage, puis ajoutez-le à .env.local.\n" +
      "Ce jeton reste local : il ne doit jamais partir dans le navigateur ni être déclaré chez l'hébergeur.",
  );
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

/* ---------------------------------------------------------- Journal */

type Etat = "cree" | "existant" | "simule";
const journal: { id: string; type: string; etat: Etat }[] = [];
const medias: { chemin: string; etat: "reutilise" | "televerse" | "simule" | "absent" }[] = [];
const alertes: string[] = [];

/* ------------------------------------------------------------ Images */

/**
 * Téléverse une image, ou réutilise celle qui porte déjà le même contenu.
 *
 * Sanity identifie un asset par l'empreinte de son fichier : deux
 * téléversements du même octet à octet aboutissent au même document. On
 * interroge donc l'empreinte avant d'écrire — ce qui rend l'opération
 * idempotente, et permet en simulation de dire exactement ce qui serait créé.
 */
async function televerser(cheminRelatif: string): Promise<ReferenceImage | null> {
  const chemin = resolve(process.cwd(), cheminRelatif);
  if (!existsSync(chemin)) {
    medias.push({ chemin: cheminRelatif, etat: "absent" });
    alertes.push(`Image introuvable : ${cheminRelatif}. La section correspondante sera incomplète.`);
    return null;
  }

  const contenu = readFileSync(chemin);
  const empreinte = createHash("sha1").update(contenu).digest("hex");

  const existant = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && sha1hash == $empreinte][0]._id`,
    { empreinte },
  );

  if (existant) {
    medias.push({ chemin: cheminRelatif, etat: "reutilise" });
    return { _type: "image", asset: { _type: "reference", _ref: existant } };
  }

  if (!APPLIQUER) {
    medias.push({ chemin: cheminRelatif, etat: "simule" });
    // En simulation, la référence rendue n'est jamais écrite : rien ne l'est.
    return { _type: "image", asset: { _type: "reference", _ref: `simulation-${empreinte}` } };
  }

  const asset = await client.assets.upload("image", contenu, { filename: basename(chemin) });
  medias.push({ chemin: cheminRelatif, etat: "televerse" });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

/* ------------------------------------------------------------ Écriture */

async function creerSiAbsent(documents: Document[]): Promise<void> {
  if (documents.length === 0) return;

  const ids = documents.map((doc) => doc._id);
  const deja = new Set(await client.fetch<string[]>(`*[_id in $ids]._id`, { ids }));

  for (const doc of documents) {
    journal.push({
      id: doc._id,
      type: doc._type,
      etat: deja.has(doc._id) ? "existant" : APPLIQUER ? "cree" : "simule",
    });
  }

  if (!APPLIQUER) return;

  // Une seule transaction : soit tout le lot passe, soit rien. Un lot à moitié
  // écrit laisserait des pages pointant vers des offres inexistantes.
  const transaction = documents.reduce((tx, doc) => tx.createIfNotExists(doc), client.transaction());
  await transaction.commit({ visibility: "async" });
}

/* ---------------------------------------------------------- Exécution */

async function principal() {
  console.log(
    `\n${APPLIQUER ? "▶ Reprise des contenus" : "▷ Simulation (aucune écriture)"} — projet ${projectId}, jeu de données ${dataset}\n`,
  );

  const { references, pages, aReprendre } = await composer(televerser);

  // Deux lots : les documents référencés d'abord, les pages ensuite. Une page
  // écrite avant les offres qu'elle cite pointerait un instant dans le vide.
  await creerSiAbsent(references);
  await creerSiAbsent(pages);

  rapport([...alertes, ...aReprendre]);
}

function rapport(aReprendre: string[]) {
  const compter = (etat: Etat) => journal.filter((entree) => entree.etat === etat).length;

  console.log("── Documents ──");
  for (const entree of journal) {
    const marque = entree.etat === "existant" ? "=" : APPLIQUER ? "+" : "·";
    const mot =
      entree.etat === "existant"
        ? "déjà présent, laissé intact"
        : APPLIQUER
          ? "créé"
          : "serait créé";
    console.log(`  ${marque} ${entree.id}  (${entree.type}) — ${mot}`);
  }

  console.log("\n── Images ──");
  if (medias.length === 0) console.log("  aucune");
  for (const media of medias) {
    const mot = {
      reutilise: "déjà dans Sanity, réutilisée",
      televerse: "téléversée",
      simule: "serait téléversée",
      absent: "INTROUVABLE sur le disque",
    }[media.etat];
    console.log(`  ${media.etat === "absent" ? "✖" : "·"} ${media.chemin} — ${mot}`);
  }

  if (aReprendre.length) {
    console.log("\n── À reprendre à la main ──");
    for (const note of aReprendre) console.log(`  ! ${note}`);
  }

  console.log(
    `\n${compter("cree")} créé(s), ${compter("existant")} déjà présent(s), ${compter("simule")} simulé(s).`,
  );
  console.log(
    APPLIQUER
      ? "\nTerminé. Ouvrez /studio pour relire, puis publiez.\n"
      : "\nRien n'a été écrit. Relancez avec --appliquer pour appliquer.\n",
  );
}

principal().catch((erreur) => {
  console.error("\n✖ La reprise a échoué :", erreur instanceof Error ? erreur.message : erreur);
  process.exit(1);
});
