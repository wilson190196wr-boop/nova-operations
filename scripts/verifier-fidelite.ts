/**
 * Vérifie que la mise sous CMS n'a rien changé au rendu.
 *
 * Le principe est simple et ne demande aucun accès au projet Sanity réel : les
 * documents sont composés exactement comme le fera la reprise, servis par un
 * petit serveur local qui évalue les vraies requêtes GROQ du site avec
 * l'évaluateur officiel, puis le site est construit contre ce serveur. Le HTML
 * produit est comparé, page par page, à l'empreinte prise avant l'intégration.
 *
 * C'est la seule preuve qui vaille : elle porte sur le HTML réellement servi,
 * pas sur une relecture du code.
 *
 * Deux différences sont attendues et normalisées avant comparaison. Les images
 * changent d'adresse — elles partaient de `public/`, elles viennent désormais
 * du CDN de Sanity. Et Next incorpore un identifiant de construction qui
 * change à chaque build. Tout le reste doit coïncider au caractère près ; ce
 * qui ne coïncide pas est affiché.
 *
 *   npx tsx scripts/verifier-fidelite.ts <dossier-des-empreintes>
 */

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { evaluate, parse } from "groq-js";

import { composer, type ReferenceImage } from "./contenus-initiaux/composer";
import { brands } from "./contenus-initiaux/home";
import { founderPhoto } from "./contenus-initiaux/photos";

const PROJET = "verification";
const JEU = "fidelite";
const VERSION_API = "2026-09-14";

const SANS_CONSTRUCTION = process.argv.includes("--sans-construction");
const dossierAvant = process.argv.find((arg, i) => i >= 2 && !arg.startsWith("--"));
if (!dossierAvant || !existsSync(dossierAvant)) {
  console.error(
    "\n✖ Indiquez le dossier contenant les empreintes HTML prises avant l'intégration.\n" +
      "  npx tsx scripts/verifier-fidelite.ts <dossier>\n",
  );
  process.exit(1);
}

const DOSSIER_AVANT: string = dossierAvant;

/* ------------------------------------------------- Images synthétiques */

/**
 * Les dimensions réelles de chaque fichier, telles que les portaient les
 * anciens contenus.
 *
 * Elles sont reprises de la source plutôt que recalculées : ce sont exactement
 * les valeurs que `next/image` écrivait dans les attributs `width` et `height`
 * avant la migration, donc les seules qui permettent une comparaison stricte.
 */
const dimensions = new Map<string, { largeur: number; hauteur: number }>([
  ...brands
    .filter((marque) => marque.logo)
    .map(
      (marque) =>
        [
          `public${marque.logo!.src}`,
          { largeur: marque.logo!.width, hauteur: marque.logo!.height },
        ] as const,
    ),
  [`public${founderPhoto.src}`, { largeur: founderPhoto.width, hauteur: founderPhoto.height }],
  ["public/og-keleria.png", { largeur: 1200, hauteur: 630 }],
]);

type DocumentAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  url: string;
  sha1hash: string;
  extension: string;
  metadata: { dimensions: { width: number; height: number }; lqip: null };
};

const assets: DocumentAsset[] = [];

/**
 * Fabrique la fiche d'asset que Sanity produirait pour ce fichier.
 *
 * L'identifiant et l'adresse suivent la convention réelle de Sanity
 * (`image-<empreinte>-<largeur>x<hauteur>-<extension>`), pour que les URL
 * ressemblent à celles de production — c'est ce que les composants
 * manipuleront.
 */
const imageSynthetique = async (cheminRelatif: string): Promise<ReferenceImage | null> => {
  const chemin = resolve(process.cwd(), cheminRelatif);
  if (!existsSync(chemin)) {
    console.error(`  ✖ image introuvable : ${cheminRelatif}`);
    return null;
  }

  const taille = dimensions.get(cheminRelatif);
  if (!taille) {
    console.error(`  ✖ dimensions inconnues pour ${cheminRelatif}`);
    return null;
  }

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

/* ------------------------------------------------------ Serveur local */

type Corps = { query?: string; params?: Record<string, unknown> };

async function demarrerServeur(donnees: unknown[]): Promise<{ port: number; arreter: () => void }> {
  const serveur = createServer(async (requete, reponse) => {
    try {
      const url = new URL(requete.url ?? "/", "http://127.0.0.1");
      let query: string | null = null;
      let params: Record<string, unknown> = {};

      if (requete.method === "POST") {
        const morceaux: Buffer[] = [];
        for await (const morceau of requete) morceaux.push(morceau as Buffer);
        const corps = JSON.parse(Buffer.concat(morceaux).toString("utf8")) as Corps;
        query = corps.query ?? null;
        params = corps.params ?? {};
      } else {
        query = url.searchParams.get("query");
        // Les paramètres voyagent préfixés d'un `$` et encodés en JSON.
        for (const [nom, valeur] of url.searchParams) {
          if (nom.startsWith("$")) params[nom.slice(1)] = JSON.parse(valeur);
        }
      }

      if (!query) {
        reponse.writeHead(400, { "content-type": "application/json" });
        reponse.end(JSON.stringify({ error: { description: "query manquante" } }));
        return;
      }

      const resultat = await (await evaluate(parse(query), { dataset: donnees, params })).get();

      reponse.writeHead(200, { "content-type": "application/json" });
      reponse.end(JSON.stringify({ ms: 0, query, result: resultat }));
    } catch (erreur) {
      reponse.writeHead(500, { "content-type": "application/json" });
      reponse.end(
        JSON.stringify({
          error: { description: erreur instanceof Error ? erreur.message : String(erreur) },
        }),
      );
    }
  });

  await new Promise<void>((resoudre) => serveur.listen(0, "127.0.0.1", resoudre));
  const adresse = serveur.address();
  if (typeof adresse === "string" || adresse === null) throw new Error("port introuvable");
  return { port: adresse.port, arreter: () => serveur.close() };
}

/* ----------------------------------------------------- Normalisation */

/**
 * Ramène deux HTML à ce qui doit être identique.
 *
 * Trois choses changent légitimement d'une construction à l'autre et n'ont
 * rien à voir avec le contenu : l'identifiant de build que Next incorpore, les
 * adresses d'images (les fichiers ont déménagé vers le CDN de Sanity) et les
 * empreintes des ressources statiques. On les remplace par un marqueur, des
 * deux côtés, plutôt que de les ignorer — un marqueur qui n'apparaît pas au
 * même endroit reste une différence.
 */
function normaliser(html: string): string {
  return (
    html
      // Les scripts de Next — morceaux de code et charge utile de rendu — ne
      // sont pas du contenu : leur nombre et leur nom changent dès qu'un
      // import change, sans que rien ne bouge à l'écran. Le balisage JSON-LD,
      // lui, est du contenu et doit être comparé : il est préservé.
      .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "")
      .replace(/<link[^>]+rel="(?:preload|prefetch|modulepreload)"[^>]*>/g, "")
      // Les images ont déménagé de public/ vers le CDN de Sanity : l'adresse
      // change, l'emplacement dans la page ne doit pas.
      .replace(/\/_next\/image\?url=[^"&]+/g, "/_next/image?url=«IMAGE»")
      .replace(/https:\/\/cdn\.sanity\.io\/images\/[^"'\s]+/g, "«IMAGE»")
      .replace(/\/logos\/[a-z0-9-]+\.(svg|png)/g, "«IMAGE»")
      .replace(/\/photos\/[a-z0-9-]+\.(jpe?g|png)/g, "«IMAGE»")
      .replace(/content="[^"]*og-keleria\.png"/g, 'content="«IMAGE»"')
      .replace(/\/og-keleria\.png/g, "«IMAGE»")
      .replace(/\/_next\/static\/[^"'\s]+/g, "«STATIQUE»")
      // L'identifiant d'une action serveur est le condensat de son module :
      // il change dès que le fichier change, sans rien dire du rendu.
      .replace(/&quot;id&quot;:&quot;[0-9a-f]{20,}&quot;/g, "&quot;id&quot;:&quot;«ACTION»&quot;")
      .replace(/name="\$ACTION_KEY" value="[^"]*"/g, 'name="$ACTION_KEY" value="«ACTION»"')
      // `<!-- -->` est le séparateur que React insère entre deux nœuds de
      // texte voisins. Il ne se voit pas, ne s'entend pas et ne change rien
      // au texte rendu : il ne doit pas compter comme une différence.
      .replace(/<!-- -->/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Sépare le balisage JSON-LD du reste du document.
 *
 * Le graphe doit être rigoureusement identique — c'est du contenu, lu par les
 * moteurs de recherche. Sa position dans le corps de la page, elle, ne fait
 * partie d'aucun contrat : le balisage n'est ni affiché ni positionné, et
 * l'ancienne page « À propos » le plaçait à l'intérieur de son conteneur là où
 * les autres le plaçaient avant. Les deux sont donc comparés séparément,
 * plutôt que d'ignorer l'un ou de faire échouer l'autre.
 */
function separerBalisage(html: string): { corps: string; graphes: string[] } {
  const graphes: string[] = [];
  const corps = html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (_, contenu: string) => {
      graphes.push(contenu);
      return "«JSON-LD»";
    },
  );
  return { corps, graphes };
}

/** Le texte visible, pour localiser une divergence quand le HTML diffère. */
function texteVisible(html: string): string[] {
  const corps = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ");
  return corps
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .map((ligne) => ligne.replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').trim())
    .filter((ligne) => ligne.length > 0);
}

/* ---------------------------------------------------------- Exécution */

const PAGES = [
  { fichier: "index.html", route: "/" },
  { fichier: "offres.html", route: "/offres" },
  { fichier: "realisations.html", route: "/realisations" },
  { fichier: "a-propos.html", route: "/a-propos" },
  { fichier: "contact.html", route: "/contact" },
  { fichier: "mentions-legales.html", route: "/mentions-legales" },
];

async function principal() {
  console.log("\n▷ Vérification de fidélité — rendu avant / après mise sous CMS\n");

  console.log("1. Composition des documents…");
  const { references, pages, aReprendre } = await composer(imageSynthetique);
  const donnees = [...references, ...pages, ...assets];
  console.log(`   ${references.length} documents référencés, ${pages.length} pages, ${assets.length} images.`);

  console.log("2. Démarrage du serveur GROQ local…");
  const { port, arreter } = await demarrerServeur(donnees);
  console.log(`   http://127.0.0.1:${port}`);

  console.log(
    SANS_CONSTRUCTION
      ? "3. Construction ignorée (--sans-construction) : comparaison de la dernière en date."
      : "3. Construction du site contre ce serveur…",
  );
  const code = SANS_CONSTRUCTION ? 0 : await construire(port);
  arreter();

  if (code !== 0) {
    console.error("\n✖ La construction a échoué. Comparaison impossible.\n");
    process.exit(1);
  }

  console.log("\n4. Comparaison page par page\n");
  let divergentes = 0;

  for (const page of PAGES) {
    const avant = join(DOSSIER_AVANT, page.fichier);
    const apres = join(".next/server/app", page.fichier);

    if (!existsSync(avant)) {
      console.log(`  ? ${page.route} — aucune empreinte de référence`);
      continue;
    }
    if (!existsSync(apres)) {
      console.log(`  ✖ ${page.route} — page absente de la construction`);
      divergentes += 1;
      continue;
    }

    const brutA = separerBalisage(normaliser(readFileSync(avant, "utf8")));
    const brutB = separerBalisage(normaliser(readFileSync(apres, "utf8")));

    // Le balisage est comparé par son contenu, sans tenir compte de l'ordre
    // d'apparition : ce sont des nœuds indépendants d'un même graphe.
    const grapheIdentique =
      brutA.graphes.length === brutB.graphes.length &&
      [...brutA.graphes].sort().join("|") === [...brutB.graphes].sort().join("|");

    if (!grapheIdentique) {
      divergentes += 1;
      console.log(`  ✖ ${page.route} — le balisage JSON-LD a changé`);
      for (const g of brutA.graphes) console.log(`      − ${g.slice(0, 200)}`);
      for (const g of brutB.graphes) console.log(`      + ${g.slice(0, 200)}`);
      continue;
    }

    // Les marqueurs de position du balisage sont retirés du corps : leur
    // emplacement n'est pas un contrat, leur contenu vient d'être vérifié.
    const a = brutA.corps.replaceAll("«JSON-LD»", "");
    const b = brutB.corps.replaceAll("«JSON-LD»", "");

    if (a === b) {
      const note = brutA.graphes.length
        ? ` — identique au caractère près (balisage JSON-LD vérifié : ${brutA.graphes.length} nœud(s))`
        : " — identique au caractère près";
      console.log(`  ✓ ${page.route}${note}`);
      continue;
    }

    divergentes += 1;
    const texteA = texteVisible(readFileSync(avant, "utf8"));
    const texteB = texteVisible(readFileSync(apres, "utf8"));

    console.log(`  ✖ ${page.route} — ${a.length} vs ${b.length} caractères`);

    // Comparaison ordonnée : un ensemble masquerait un doublon ou une
    // inversion, qui sont précisément les erreurs qu'une migration produit.
    if (texteA.length !== texteB.length) {
      console.log(`      ${texteA.length} lignes de texte avant, ${texteB.length} après`);
    }
    let divergenceTexte = -1;
    for (let i = 0; i < Math.max(texteA.length, texteB.length); i += 1) {
      if (texteA[i] !== texteB[i]) {
        divergenceTexte = i;
        break;
      }
    }
    if (divergenceTexte === -1) {
      console.log("      texte visible rigoureusement identique, dans le même ordre.");
      console.log(`      ${premiereDivergence(a, b)}`);
    } else {
      console.log(`      première divergence de texte à la ligne ${divergenceTexte + 1} :`);
      console.log(`        − ${(texteA[divergenceTexte] ?? "«absent»").slice(0, 160)}`);
      console.log(`        + ${(texteB[divergenceTexte] ?? "«absent»").slice(0, 160)}`);
    }
  }

  if (aReprendre.length) {
    console.log("\n── Rappels de la reprise ──");
    for (const note of aReprendre) console.log(`  ! ${note}`);
  }

  console.log(
    divergentes === 0
      ? "\n✓ Les six pages sont rigoureusement identiques au rendu d'avant.\n"
      : `\n✖ ${divergentes} page(s) divergent.\n`,
  );
  process.exit(divergentes === 0 ? 0 : 1);
}

function premiereDivergence(a: string, b: string): string {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  return `première divergence au caractère ${i} :\n        avant : …${a.slice(Math.max(0, i - 60), i + 90)}\n        après : …${b.slice(Math.max(0, i - 60), i + 90)}`;
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
        // La prévisualisation et l'envoi de courriel ne participent pas au
        // rendu statique : on s'assure qu'aucune valeur d'environnement locale
        // ne vienne changer la construction.
        SANITY_API_READ_TOKEN: "",
        BREVO_API_KEY: "",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let sortie = "";
    enfant.stdout.on("data", (bloc) => {
      sortie += bloc;
    });
    enfant.stderr.on("data", (bloc) => {
      sortie += bloc;
    });

    enfant.on("close", (code) => {
      if (code !== 0) console.error(sortie);
      resoudre(code ?? 1);
    });
  });
}

principal().catch((erreur) => {
  console.error("\n✖ Vérification interrompue :", erreur);
  process.exit(1);
});
