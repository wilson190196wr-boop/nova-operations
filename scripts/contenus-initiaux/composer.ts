/**
 * Compose les documents Sanity à partir des contenus d'origine.
 *
 * Ce module ne parle à personne : ni réseau, ni jeton, ni système de fichiers.
 * Il transforme les contenus de `scripts/contenus-initiaux/` en documents, et
 * délègue la résolution des images à une fonction qu'on lui passe.
 *
 * Cette séparation a un but précis. La reprise réelle lui donne un résolveur
 * qui téléverse dans Sanity ; la vérification de fidélité lui en donne un qui
 * fabrique des références synthétiques, sans réseau. Les deux composent donc
 * exactement les mêmes documents — sans quoi la vérification ne prouverait
 * rien sur ce que la reprise écrit vraiment.
 */

// L'identifiant de page vient du site lui-même : deux définitions finiraient
// par désigner deux documents, et la reprise créerait une seconde série.
import { identifiantPage } from "../../src/sanity/routes";
import { facts, founder, principles, story, turn } from "./about";
import { faq } from "./faq";
import {
  alternatives,
  audiences,
  brands,
  heroLines,
  heroTail,
  mainNav,
  offers as offresAccueil,
  site,
  steps,
} from "./home";
import { A_COMPLETER, articles, lastUpdated } from "./legal";
import { comparison, hero as heroOffres, offers, speeds } from "./offers";
import { founderPhoto } from "./photos";
import * as jsx from "./textes-jsx";
import {
  ai,
  aiCases,
  aiProjects,
  appDev,
  appProjects,
  intro as introRealisations,
} from "./work";

export type ReferenceImage = { _type: "image"; asset: { _type: "reference"; _ref: string } };

/** Résout un chemin de fichier local en référence d'image Sanity, ou `null`. */
export type ResolveurImage = (cheminRelatif: string) => Promise<ReferenceImage | null>;

export type Document = { _id: string; _type: string; [champ: string]: unknown };

export type Composition = {
  /** Les documents référencés : réglages, offres, réalisations. À écrire en premier. */
  references: Document[];
  /** Les six pages, qui citent les précédents. */
  pages: Document[];
  /** Ce qu'aucun script ne peut reprendre à la place d'un humain. */
  aReprendre: string[];
};

/* ------------------------------------------------------ Identifiants */

/**
 * Un identifiant lisible et stable, dérivé du texte qu'il désigne.
 *
 * Stable est le mot important : c'est lui qui rend la reprise rejouable. Deux
 * exécutions doivent viser exactement les mêmes documents, sans quoi la seconde
 * en créerait une deuxième série.
 */
export function jeton(texte: string): string {
  return texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export const idPage = identifiantPage;
export const idOffre = (slug: string) => plat(`offre-${slug}`);
export const idRealisation = (titre: string) => plat(`realisation-${jeton(titre)}`);

/**
 * Refuse tout identifiant contenant un point.
 *
 * Dans Sanity, le point marque un chemin imbriqué : c'est ce qui sépare
 * `drafts.article` de `article`. Le droit de lecture publique posé par défaut
 * est `_id in path("*")` et ne couvre qu'un segment, si bien qu'un document
 * dont l'identifiant contient un point est invisible au public — le site rend
 * alors une page vide, sans la moindre erreur pour l'expliquer.
 *
 * La vérification est ici plutôt qu'en commentaire parce que la panne est
 * silencieuse : elle ne se voit ni à la compilation, ni à l'écriture, ni dans
 * le Studio, mais seulement sur le site en production.
 */
function plat(id: string): string {
  if (id.includes(".")) {
    throw new Error(
      `Identifiant invalide : « ${id} ». Un point y marque un chemin imbriqué, ` +
        "ce qui place le document hors du droit de lecture publique de Sanity.",
    );
  }
  return id;
}

const cle = (prefixe: string, i: number) => `${prefixe}-${i}`;
const ref = (id: string, k: string) => ({ _type: "reference" as const, _ref: id, _key: k });

/* ------------------------------------------------------- Composition */

export async function composer(image: ResolveurImage): Promise<Composition> {
  const aReprendre: string[] = [];

  /* --- Réglages du site ------------------------------------------- */
  const visuelPartage = await image(jsx.donneesStructurees.imagePartage.fichier);

  const parametres: Document = {
    _id: "parametresSite",
    _type: "parametresSite",
    nom: site.name,
    accroche: site.baseline,
    email: site.email,
    telephone: site.phone,
    ville: site.address,
    coordonnees: {
      libelleEmail: jsx.contact.libelleEmail,
      libelleTelephone: jsx.contact.libelleTelephone,
      libelleVille: jsx.contact.libelleVille,
    },
    navPrincipale: mainNav.map((entree, i) => ({
      _key: cle("nav", i),
      libelle: entree.label,
      chemin: entree.href,
    })),
    navPiedDePage: jsx.chassis.navPiedDePage.map((entree, i) => ({
      _key: cle("pied", i),
      libelle: entree.label,
      chemin: entree.href,
    })),
    libelleRendezVous: jsx.chassis.libelleRendezVous,
    cloture: jsx.clotureParDefaut,
    ...(visuelPartage
      ? { imagePartage: { ...visuelPartage, alt: jsx.donneesStructurees.imagePartage.alt } }
      : {}),
    descriptionOrganisation: jsx.donneesStructurees.descriptionOrganisation,
    zonesDesservies: jsx.donneesStructurees.zonesDesservies,
  };

  /* --- Offres ------------------------------------------------------ */
  const documentsOffres: Document[] = offers.map((offre) => {
    const surAccueil = offresAccueil.find((carte) => carte.href.endsWith(`#${offre.slug}`));
    if (!surAccueil) {
      aReprendre.push(
        `L'offre « ${offre.name} » n'a pas de carte d'accueil correspondante : son résumé et son libellé de lien restent à écrire dans le Studio.`,
      );
    }
    return {
      _id: idOffre(offre.slug),
      _type: "offre",
      nom: offre.name,
      slug: { _type: "slug", current: offre.slug },
      numero: offre.step,
      nomSchemaOrg: jsx.donneesStructurees.nomsServices[offre.slug] ?? offre.name,
      accroche: offre.tagline,
      description: offre.description,
      duree: offre.duration,
      prix: offre.price,
      libelleBouton: offre.cta,
      variantes: (offre.variants ?? []).map((variante, i) => ({
        _key: cle("variante", i),
        nom: variante.name,
        prix: variante.price,
        detail: variante.detail,
      })),
      livrables: offre.deliverables,
      resumeAccueil: surAccueil?.text ?? "",
      libelleLienAccueil: surAccueil?.lien ?? "",
    };
  });

  /* --- Réalisations ------------------------------------------------ */
  const documentsRealisations: Document[] = [...appProjects, ...aiProjects, ...aiCases].map(
    (item) => ({
      _id: idRealisation(item.title),
      _type: "realisation",
      titre: item.title,
      contexte: item.context,
      // Le champ reste réellement absent pour un chantier type : une chaîne
      // vide ajouterait une pastille de date vide dans la carte.
      ...(item.years ? { annees: item.years } : {}),
      texte: item.text,
      indicateurs: item.metrics,
    }),
  );

  /* --- Accueil ----------------------------------------------------- */
  const marques = [];
  for (const [i, marque] of brands.entries()) {
    const logo = marque.logo ? await image(`public${marque.logo.src}`) : null;
    marques.push({
      _key: cle("marque", i),
      nom: marque.name,
      ...(logo ? { logo } : {}),
      ...(marque.logo?.scale ? { echelle: marque.logo.scale } : {}),
    });
  }

  aReprendre.push(
    "Logos de marques : ce sont des marques déposées, reproduites à titre de référence de parcours. " +
      "Vérifiez que chaque fichier vient bien de la charte officielle de la marque et non d'une banque d'images. " +
      "Le logo ORTEC a un fond opaque : ne pas le poser sur un aplat sombre.",
  );

  const accueil: Document = {
    _id: idPage("/"),
    _type: "page",
    titre: "Accueil",
    route: "/",
    seo: seo("/"),
    blocs: [
      { _key: "hero", _type: "blocHero", lignes: heroLines, chapeau: heroTail },
      {
        _key: "marques",
        _type: "blocMarques",
        titreAccessible: jsx.accueil.titreAccessibleMarques,
        marques,
      },
      {
        _key: "situations",
        _type: "blocSituations",
        titre: jsx.accueil.titreSituations,
        profils: audiences.map((profil, i) => ({
          _key: cle("profil", i),
          cible: profil.who,
          titre: profil.headline,
          texte: profil.text,
        })),
      },
      {
        _key: "etapes",
        _type: "blocEtapes",
        etapes: steps.map((etape, i) => ({
          _key: cle("etape", i),
          numero: etape.n,
          titre: etape.title,
          texte: etape.text,
        })),
      },
      {
        _key: "apercu-offres",
        _type: "blocApercuOffres",
        titre: jsx.accueil.titreOffres,
        chapeau: jsx.accueil.chapeauOffres,
        offres: offers.map((offre, i) => ref(idOffre(offre.slug), cle("offre", i))),
      },
      {
        _key: "alternatives",
        _type: "blocAlternatives",
        titre: jsx.accueil.titreAlternatives,
        alternatives: alternatives.map((ligne, i) => ({
          _key: cle("alternative", i),
          nom: ligne.name,
          texte: ligne.text,
          detachee: ligne.highlight,
        })),
      },
      { _key: "cloture", _type: "blocCloture", titre: jsx.accueil.titreCloture },
    ],
  };

  /* --- Offres ------------------------------------------------------ */
  const pageOffres: Document = {
    _id: idPage("/offres"),
    _type: "page",
    titre: "Offres",
    route: "/offres",
    seo: seo("/offres"),
    blocs: [
      {
        _key: "en-tete",
        _type: "blocEnTetePage",
        titre: heroOffres.title,
        chapeau: heroOffres.intro,
        faits: heroOffres.meta.map((fait, i) => ({
          _key: cle("fait", i),
          libelle: fait.label,
          valeur: fait.value,
        })),
        afficherCoordonnees: false,
      },
      {
        _key: "offres-detaillees",
        _type: "blocOffresDetaillees",
        offres: offers.map((offre, i) => ref(idOffre(offre.slug), cle("offre", i))),
      },
      {
        _key: "deux-vitesses",
        _type: "blocDeuxVitesses",
        titre: speeds.title,
        chapeau: speeds.text,
        modes: speeds.modes.map((mode, i) => ({
          _key: cle("mode", i),
          nom: mode.name,
          texte: mode.text,
        })),
        note: speeds.note,
        lien: jsx.offres.lienParcours,
      },
      {
        _key: "comparaison",
        _type: "blocComparaison",
        titre: comparison.title,
        chapeau: comparison.intro,
        enTetes: jsx.offres.enTetesComparaison,
        lignes: comparison.rows.map((ligne, i) => ({
          _key: cle("ligne", i),
          situation: ligne.situation,
          offre: { _type: "reference", _ref: idOffre(ligne.href.split("#")[1]) },
          resultat: ligne.result,
        })),
      },
      { _key: "cloture", _type: "blocCloture", titre: jsx.offres.titreCloture },
    ],
  };

  /* --- Réalisations ------------------------------------------------ */
  const pageRealisations: Document = {
    _id: idPage("/realisations"),
    _type: "page",
    titre: "Réalisations",
    route: "/realisations",
    seo: seo("/realisations"),
    blocs: [
      {
        _key: "en-tete",
        _type: "blocEnTetePage",
        titre: introRealisations.title,
        chapeau: introRealisations.text,
        faits: [],
        afficherCoordonnees: false,
      },
      {
        _key: "groupe-dev",
        _type: "blocGroupeRealisations",
        titre: appDev.title,
        ancre: jsx.realisations.ancreDeveloppement,
        realisations: appProjects.map((item, i) => ref(idRealisation(item.title), cle("dev", i))),
      },
      {
        _key: "groupe-ia",
        _type: "blocGroupeRealisations",
        titre: ai.title,
        ancre: jsx.realisations.ancreIa,
        // L'ordre de concaténation est celui du site : les projets datés
        // d'abord, les chantiers types ensuite. Un tri par date les
        // intervertirait, les seconds n'étant pas datés.
        realisations: [...aiProjects, ...aiCases].map((item, i) =>
          ref(idRealisation(item.title), cle("ia", i)),
        ),
      },
      { _key: "cloture", _type: "blocCloture", titre: jsx.realisations.titreCloture },
    ],
  };

  /* --- À propos ---------------------------------------------------- */
  const portrait = await image(`public${founderPhoto.src}`);

  const pageAPropos: Document = {
    _id: idPage("/a-propos"),
    _type: "page",
    titre: "À propos",
    route: "/a-propos",
    seo: seo("/a-propos"),
    blocs: [
      {
        _key: "intro-fondateur",
        _type: "blocIntroFondateur",
        ...(portrait ? { portrait: { ...portrait, alt: founderPhoto.alt } } : {}),
        nom: founder.name,
        role: founder.role,
        citation: founder.quote,
        titre: jsx.aPropos.titre,
        presentation: jsx.aPropos.presentation,
        faits: facts.map((fait, i) => ({
          _key: cle("fait", i),
          libelle: fait.label,
          valeur: fait.value,
        })),
      },
      {
        _key: "parcours",
        _type: "blocParcours",
        titre: jsx.aPropos.titreParcours,
        jalons: story.map((jalon, i) => ({
          _key: cle("jalon", i),
          periode: jalon.period,
          lieu: jalon.place,
          role: jalon.role,
          texte: jalon.text,
        })),
      },
      { _key: "tournant", _type: "blocTournant", titre: turn.title, paragraphes: turn.paragraphs },
      {
        _key: "principes",
        _type: "blocPrincipes",
        titre: jsx.aPropos.titrePrincipes,
        principes: principles.map((principe, i) => ({
          _key: cle("principe", i),
          titre: principe.title,
          texte: principe.text,
        })),
      },
      { _key: "cloture", _type: "blocCloture", titre: jsx.aPropos.titreCloture },
    ],
  };

  /* --- Contact ----------------------------------------------------- */
  const pageContact: Document = {
    _id: idPage("/contact"),
    _type: "page",
    titre: "Contact",
    route: "/contact",
    seo: seo("/contact"),
    blocs: [
      {
        _key: "en-tete",
        _type: "blocEnTetePage",
        surtitre: jsx.contact.surtitre,
        titre: jsx.contact.titre,
        chapeau: jsx.contact.chapeau,
        faits: [],
        afficherCoordonnees: true,
      },
      {
        _key: "etapes",
        _type: "blocEtapes",
        titreMasque: jsx.contact.titreMasqueEchange,
        etapes: jsx.contact.echange.map((etape, i) => ({
          _key: cle("etape", i),
          numero: etape.n,
          titre: etape.title,
          texte: etape.text,
        })),
      },
      {
        _key: "panneau-contact",
        _type: "blocPanneauContact",
        ongletRendezVous: jsx.panneauContact.ongletRendezVous,
        ongletMessage: jsx.panneauContact.ongletMessage,
        libelleLienCalendrier: jsx.panneauContact.libelleLienCalendrier,
        repliCalendrier: jsx.panneauContact.repliCalendrier,
        formulaire: jsx.formulaire,
      },
      {
        _key: "faq",
        _type: "blocFaq",
        surtitre: jsx.contact.surtitreFaq,
        titre: jsx.contact.titreFaq,
        questions: faq.map((item, i) => ({
          _key: cle("question", i),
          question: item.q,
          reponse: item.a,
        })),
      },
    ],
  };

  /* --- Mentions légales -------------------------------------------- */
  let manquantes = 0;

  const articlesRepris = articles.map((article, i) => ({
    _key: cle("article", i),
    titre: article.title,
    paragraphes: article.paragraphs ?? [],
    lignes: (article.rows ?? []).map((ligne, j) => {
      const vide = ligne.value === A_COMPLETER;
      if (vide) manquantes += 1;
      return {
        _key: cle("ligne", j),
        libelle: ligne.label,
        // Une mention non renseignée est stockée vide, pas avec la phrase
        // marqueur : c'est le rendu qui affiche « À compléter », en rouge.
        // Stocker la phrase aurait permis d'en publier une variante, et une
        // variante ne se repère plus comme un trou.
        ...(vide ? {} : { valeur: ligne.value }),
        lien: vide ? "aucun" : typeDeLien(ligne.label),
      };
    }),
    sousArticles: (article.subsections ?? []).map((sous, j) => ({
      _key: cle("sous", j),
      titre: sous.title,
      paragraphes: sous.paragraphs,
    })),
  }));

  if (manquantes > 0) {
    aReprendre.push(
      `Mentions légales : ${manquantes} mention(s) obligatoire(s) restent vides (adresse professionnelle, SIRET, téléphone de l'hébergeur). ` +
        "Elles s'affichent en rouge sur la page tant qu'elles ne sont pas renseignées dans le Studio. " +
        "Au sens de l'article 6-III de la LCEN, la page n'est pas conforme sans elles.",
    );
  }

  const pageMentionsLegales: Document = {
    _id: idPage("/mentions-legales"),
    _type: "page",
    titre: "Mentions légales",
    route: "/mentions-legales",
    seo: seo("/mentions-legales"),
    blocs: [
      {
        _key: "mentions",
        _type: "blocMentionsLegales",
        titre: jsx.mentionsLegales.titre,
        chapeau: jsx.mentionsLegales.chapeau,
        prefixeMiseAJour: jsx.mentionsLegales.prefixeMiseAJour,
        dateMiseAJour: lastUpdated,
        motArticle: jsx.mentionsLegales.motArticle,
        articles: articlesRepris,
      },
    ],
  };

  return {
    references: [parametres, ...documentsOffres, ...documentsRealisations],
    pages: [accueil, pageOffres, pageRealisations, pageAPropos, pageContact, pageMentionsLegales],
    aReprendre,
  };
}

function seo(route: string) {
  const valeurs = jsx.seoParRoute[route];
  if (!valeurs) throw new Error(`Aucune métadonnée connue pour la route ${route}.`);
  return { titre: valeurs.titre, description: valeurs.description };
}

/**
 * Le type de lien d'une ligne d'identification, déduit une seule fois ici.
 *
 * Sur le site, ce n'est plus le libellé qui décide : c'est un champ à part
 * entière. La déduction n'a donc lieu qu'à la reprise, à partir des libellés
 * d'origine, et devient ensuite un choix explicite que renommer une ligne
 * n'altère plus.
 */
function typeDeLien(libelle: string): "aucun" | "courriel" | "telephone" | "site" {
  if (libelle === "Courriel") return "courriel";
  if (libelle === "Téléphone") return "telephone";
  if (libelle === "Site") return "site";
  return "aucun";
}
