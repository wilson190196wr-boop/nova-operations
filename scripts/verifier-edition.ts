/**
 * Vérifie que l'édition produit bien les effets attendus.
 *
 * La vérification de fidélité prouve que rien n'a changé ; celle-ci prouve que
 * quelque chose *peut* changer, et que le changement est exactement celui
 * qu'on attend. Les deux sont nécessaires : un site qui ignorerait le CMS
 * passerait la première haut la main.
 *
 * Quatre gestes d'éditeur sont rejoués sur quatre pages différentes, en une
 * seule construction : masquer une section, réordonner une liste, modifier un
 * texte, modifier le texte alternatif d'une image. Chaque effet est ensuite
 * cherché dans le HTML produit.
 *
 *   npx tsx scripts/verifier-edition.ts
 */

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { evaluate, parse } from "groq-js";

import { composer, type Document, type ReferenceImage } from "./contenus-initiaux/composer";
import { brands } from "./contenus-initiaux/home";
import { founderPhoto } from "./contenus-initiaux/photos";

const PROJET = "verification";
const JEU = "edition";
const VERSION_API = "2026-09-14";

/* ------------------------------------------------- Images synthétiques */

const dimensions = new Map<string, { largeur: number; hauteur: number }>([
  ...brands
    .filter((m) => m.logo)
    .map((m) => [`public${m.logo!.src}`, { largeur: m.logo!.width, hauteur: m.logo!.height }] as const),
  [`public${founderPhoto.src}`, { largeur: founderPhoto.width, hauteur: founderPhoto.height }],
  ["public/og-keleria.png", { largeur: 1200, hauteur: 630 }],
]);

const assets: unknown[] = [];

const imageSynthetique = async (cheminRelatif: string): Promise<ReferenceImage | null> => {
  const chemin = resolve(process.cwd(), cheminRelatif);
  const taille = dimensions.get(cheminRelatif);
  if (!existsSync(chemin) || !taille) return null;
  const empreinte = createHash("sha1").update(readFileSync(chemin)).digest("hex");
  const ext = extname(chemin).slice(1).toLowerCase();
  const id = `image-${empreinte}-${taille.largeur}x${taille.hauteur}-${ext}`;
  assets.push({
    _id: id,
    _type: "sanity.imageAsset",
    url: `https://cdn.sanity.io/images/${PROJET}/${JEU}/${empreinte}-${taille.largeur}x${taille.hauteur}.${ext}`,
    sha1hash: empreinte,
    extension: ext,
    metadata: { dimensions: { width: taille.largeur, height: taille.hauteur }, lqip: null },
  });
  return { _type: "image", asset: { _type: "reference", _ref: id } };
};

/* ------------------------------------------------------ Les quatre gestes */

const TEXTE_MODIFIE = "Titre modifié par la vérification d'édition";
const ALT_MODIFIE = "Texte alternatif modifié par la vérification d'édition";

type Bloc = { _type: string; [champ: string]: unknown };

function appliquerLesGestes(pages: Document[]) {
  const page = (route: string) => {
    const doc = pages.find((p) => p.route === route);
    if (!doc) throw new Error(`Page ${route} absente de la composition.`);
    return doc as Document & { blocs: Bloc[] };
  };

  // 1. Masquer une section : le bandeau de marques de l'accueil.
  const accueil = page("/");
  const marques = accueil.blocs.find((b) => b._type === "blocMarques");
  if (!marques) throw new Error("Bloc de marques introuvable.");
  marques.masque = true;

  // 2. Réordonner une liste : les quatre offres de la page Offres, inversées.
  const offres = page("/offres");
  const detaillees = offres.blocs.find((b) => b._type === "blocOffresDetaillees") as
    | (Bloc & { offres: { _ref: string }[] })
    | undefined;
  if (!detaillees) throw new Error("Bloc des offres détaillées introuvable.");
  const ordreInitial = detaillees.offres.map((o) => o._ref);
  detaillees.offres = [...detaillees.offres].reverse();

  // 3. Modifier un texte : le titre de la page Réalisations.
  const realisations = page("/realisations");
  const enTete = realisations.blocs.find((b) => b._type === "blocEnTetePage");
  if (!enTete) throw new Error("Chapeau de la page Réalisations introuvable.");
  const titreInitial = enTete.titre as string;
  enTete.titre = TEXTE_MODIFIE;

  // 4. Modifier une image : le texte alternatif du portrait.
  const aPropos = page("/a-propos");
  const intro = aPropos.blocs.find((b) => b._type === "blocIntroFondateur") as
    | (Bloc & { portrait?: { alt?: string } })
    | undefined;
  if (!intro?.portrait) throw new Error("Portrait introuvable.");
  const altInitial = intro.portrait.alt;
  intro.portrait.alt = ALT_MODIFIE;

  return { ordreInitial, titreInitial, altInitial };
}

/* ------------------------------------------------------ Serveur local */

async function demarrerServeur(donnees: unknown[]) {
  const serveur = createServer(async (requete, reponse) => {
    try {
      const url = new URL(requete.url ?? "/", "http://127.0.0.1");
      let query: string | null = null;
      let params: Record<string, unknown> = {};

      if (requete.method === "POST") {
        const morceaux: Buffer[] = [];
        for await (const morceau of requete) morceaux.push(morceau as Buffer);
        const corps = JSON.parse(Buffer.concat(morceaux).toString("utf8"));
        query = corps.query ?? null;
        params = corps.params ?? {};
      } else {
        query = url.searchParams.get("query");
        for (const [nom, valeur] of url.searchParams) {
          if (nom.startsWith("$")) params[nom.slice(1)] = JSON.parse(valeur);
        }
      }

      if (!query) {
        reponse.writeHead(400).end("{}");
        return;
      }
      const resultat = await (await evaluate(parse(query), { dataset: donnees, params })).get();
      reponse.writeHead(200, { "content-type": "application/json" });
      reponse.end(JSON.stringify({ ms: 0, query, result: resultat }));
    } catch (erreur) {
      reponse.writeHead(500, { "content-type": "application/json" });
      reponse.end(JSON.stringify({ error: { description: String(erreur) } }));
    }
  });

  await new Promise<void>((r) => serveur.listen(0, "127.0.0.1", r));
  const adresse = serveur.address();
  if (typeof adresse === "string" || adresse === null) throw new Error("port introuvable");
  return { port: adresse.port, arreter: () => serveur.close() };
}

function construire(port: number): Promise<number> {
  return new Promise((resoudre) => {
    const enfant = spawn("npx", ["next", "build"], {
      env: {
        ...process.env,
        NEXT_PUBLIC_SANITY_PROJECT_ID: PROJET,
        NEXT_PUBLIC_SANITY_DATASET: JEU,
        NEXT_PUBLIC_SANITY_API_VERSION: VERSION_API,
        NEXT_PUBLIC_SANITY_API_HOST: `http://127.0.0.1:${port}`,
        SANITY_API_READ_TOKEN: "",
        BREVO_API_KEY: "",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let sortie = "";
    enfant.stdout.on("data", (b) => (sortie += b));
    enfant.stderr.on("data", (b) => (sortie += b));
    enfant.on("close", (code) => {
      if (code !== 0) console.error(sortie);
      resoudre(code ?? 1);
    });
  });
}

/* ---------------------------------------------------------- Exécution */

const lire = (fichier: string) => readFileSync(`.next/server/app/${fichier}`, "utf8");

let echecs = 0;
function verifier(intitule: string, condition: boolean, detail?: string) {
  console.log(`  ${condition ? "✓" : "✖"} ${intitule}`);
  if (!condition) {
    echecs += 1;
    if (detail) console.log(`      ${detail}`);
  }
}

async function principal() {
  console.log("\n▷ Vérification des gestes d'édition\n");

  const { references, pages } = await composer(imageSynthetique);
  const attendu = appliquerLesGestes(pages);

  const { port, arreter } = await demarrerServeur([...references, ...pages, ...assets]);
  console.log("Construction du site avec les quatre modifications…");
  const code = await construire(port);
  arreter();

  if (code !== 0) {
    console.error("\n✖ La construction a échoué.\n");
    process.exit(1);
  }

  console.log("\nRésultats\n");

  // 1. Masquer
  const accueil = lire("index.html");
  verifier(
    "Masquer une section retire son contenu du HTML",
    !accueil.includes("marquee-track") && !accueil.includes('aria-label="Références"'),
    "le bandeau de marques est encore présent",
  );

  // 2. Réordonner
  const offres = lire("offres.html");
  const positions = attendu.ordreInitial.map((id) => {
    const ancre = id.replace(/^offre\./, "");
    return { ancre, position: offres.indexOf(`id="${ancre}"`) };
  });
  const toutesTrouvees = positions.every((p) => p.position >= 0);
  const inverse =
    toutesTrouvees &&
    positions.every((p, i) => i === 0 || positions[i - 1].position > p.position);
  verifier(
    "Réordonner une liste change l'ordre rendu",
    inverse,
    `positions relevées : ${positions.map((p) => `${p.ancre}@${p.position}`).join(", ")}`,
  );

  // 3. Modifier un texte
  const realisations = lire("realisations.html");
  verifier(
    "Modifier un texte remplace l'ancien",
    realisations.includes(TEXTE_MODIFIE) && !realisations.includes(attendu.titreInitial),
    "le nouveau titre est absent, ou l'ancien subsiste",
  );

  // 4. Modifier une image
  const aPropos = lire("a-propos.html");
  verifier(
    "Modifier le texte alternatif d'une image le remplace",
    aPropos.includes(ALT_MODIFIE) && !aPropos.includes(String(attendu.altInitial)),
    "le nouveau texte alternatif est absent, ou l'ancien subsiste",
  );

  // 5. Les pages non touchées ne bougent pas
  const contact = lire("contact.html");
  verifier(
    "Une page non modifiée reste inchangée",
    contact.includes("Quarante-cinq minutes pour y voir clair.") && !contact.includes(TEXTE_MODIFIE),
    "la page Contact a changé alors qu'aucun de ses documents n'a été touché",
  );

  console.log(
    echecs === 0
      ? "\n✓ Les cinq vérifications passent : le contenu du CMS pilote bien le rendu.\n"
      : `\n✖ ${echecs} vérification(s) en échec.\n`,
  );
  process.exit(echecs === 0 ? 0 : 1);
}

principal().catch((erreur) => {
  console.error("\n✖ Vérification interrompue :", erreur);
  process.exit(1);
});
