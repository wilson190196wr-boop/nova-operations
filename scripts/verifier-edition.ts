/**
 * Vérifie que l'édition produit bien les effets attendus.
 *
 * La vérification de fidélité prouve que rien n'a changé ; celle-ci prouve que
 * quelque chose *peut* changer, et que le changement est exactement celui
 * qu'on attend. Les deux sont nécessaires : un site qui ignorerait le CMS
 * passerait la première haut la main.
 *
 * Cinq gestes d'éditeur sont rejoués en une seule construction : masquer une
 * section, réordonner une liste, modifier un texte, modifier le texte
 * alternatif d'une image, et modifier un texte des réglages du site — celui de
 * la page introuvable, qui n'appartient à aucune des six pages. Chaque effet
 * est ensuite cherché dans le HTML produit.
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

/* ------------------------------------------------------- Les cinq gestes */

const TEXTE_MODIFIE = "Titre modifié par la vérification d'édition";
const ALT_MODIFIE = "Texte alternatif modifié par la vérification d'édition";
/**
 * Sans apostrophe, à dessein : React échappe `'` en `&#x27;` dans le texte
 * rendu, et ce titre est cherché tel quel dans le HTML de la page 404.
 */
const TITRE_404_MODIFIE = "Titre de page introuvable, posé par la vérification";

type Bloc = { _type: string; [champ: string]: unknown };

function appliquerLesGestes(pages: Document[], references: Document[]) {
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

  /**
   * L'ordre est relevé en ancres, et non en identifiants.
   *
   * L'ancre rendue dans la page est le slug de l'offre ; l'identifiant du
   * document est composé à partir de ce slug, mais reste une affaire de
   * stockage. Cette vérification les déduisait l'un de l'autre en retirant un
   * préfixe `offre.` — elle est devenue silencieusement fausse le jour où les
   * identifiants sont passés au tiret, et cherchait une ancre qui n'existait
   * nulle part. Le slug est donc lu sur le document lui-même, à la source.
   */
  const ancreParId = new Map(
    references
      .filter((doc) => doc._type === "offre")
      .map((doc) => [doc._id, (doc.slug as { current: string } | undefined)?.current]),
  );
  const ordreInitial = detaillees.offres.map((offre) => {
    const ancre = ancreParId.get(offre._ref);
    if (!ancre) throw new Error(`Aucune offre nommée « ${offre._ref} » dans la composition.`);
    return ancre;
  });

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

  // 5. Modifier un texte des réglages du site : le titre de la page
  //    introuvable. Il ne vit dans aucune des six pages — cette page répond aux
  //    adresses qui n'en sont pas — et c'est justement ce que ce geste vérifie.
  const reglages = references.find((doc) => doc._type === "parametresSite") as
    | (Document & { pageIntrouvable?: { titre: string } })
    | undefined;
  if (!reglages?.pageIntrouvable) throw new Error("Textes de la page introuvable introuvables.");
  const titre404Initial = reglages.pageIntrouvable.titre;
  reglages.pageIntrouvable.titre = TITRE_404_MODIFIE;

  return { ordreInitial, titreInitial, altInitial, titre404Initial };
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
  const attendu = appliquerLesGestes(pages, references);

  const { port, arreter } = await demarrerServeur([...references, ...pages, ...assets]);
  console.log("Construction du site avec les cinq modifications…");
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
  const positions = attendu.ordreInitial.map((ancre) => ({
    ancre,
    position: offres.indexOf(`id="${ancre}"`),
  }));
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

  // 5. Modifier un texte des réglages du site
  const introuvable = lire("_not-found.html");
  verifier(
    "Modifier un texte des réglages change la page introuvable",
    introuvable.includes(TITRE_404_MODIFIE) && !introuvable.includes(attendu.titre404Initial),
    "le nouveau titre est absent de la page 404, ou l'ancien subsiste",
  );

  // 6. Les pages non touchées ne bougent pas
  const contact = lire("contact.html");
  verifier(
    "Une page non modifiée reste inchangée",
    contact.includes("Quarante-cinq minutes pour y voir clair.") && !contact.includes(TEXTE_MODIFIE),
    "la page Contact a changé alors qu'aucun de ses documents n'a été touché",
  );

  console.log(
    echecs === 0
      ? "\n✓ Les six vérifications passent : le contenu du CMS pilote bien le rendu.\n"
      : `\n✖ ${echecs} vérification(s) en échec.\n`,
  );
  process.exit(echecs === 0 ? 0 : 1);
}

principal().catch((erreur) => {
  console.error("\n✖ Vérification interrompue :", erreur);
  process.exit(1);
});
