import { siteUrl, urlAbsolue } from "./seo";
import { site } from "./home";
import { offers } from "./offers";

/**
 * Le graphe de données structurées du site.
 *
 * Deux règles le gouvernent. D'abord il ne dit que ce que les pages montrent :
 * un balisage plus affirmatif que le contenu visible est le principal risque
 * de cet exercice, et il se retourne contre le site. Ensuite chaque entité a
 * un identifiant stable et unique, réutilisé partout — deux nœuds décrivant
 * la même organisation sous deux identités valent moins que pas de balisage.
 *
 * Volontairement absents : `LocalBusiness`, qui exigerait une adresse postale
 * complète que le site ne publie pas encore ; le SIRET, en attente ; notes,
 * avis et `sameAs`, faute de profils vérifiés. Ils seront ajoutés lorsque les
 * faits correspondants seront publiés.
 */
export const ID_ORGANISATION = `${siteUrl}/#organization`;
export const ID_PERSONNE = `${urlAbsolue("/a-propos")}#person`;

const organisation = {
  "@type": "Organization",
  "@id": ID_ORGANISATION,
  name: site.name,
  url: siteUrl,
  email: site.email,
  telephone: site.phone,
  description:
    "Conseil, développement applicatif, intelligence artificielle et pilotage de projets pour les PME et les startups.",
  founder: { "@id": ID_PERSONNE },
  // Deux régions nommées, comme le disent le chapeau d'accueil et la FAQ.
  areaServed: [
    { "@type": "AdministrativeArea", name: "Provence-Alpes-Côte d'Azur" },
    { "@type": "AdministrativeArea", name: "Occitanie" },
  ],
};

const personne = {
  "@type": "Person",
  "@id": ID_PERSONNE,
  name: "Wilson Rault",
  url: urlAbsolue("/a-propos"),
  jobTitle: "Fondateur de KELERIA",
  worksFor: { "@id": ID_ORGANISATION },
};

/** Les quatre offres, rattachées aux ancres réelles de la page Offres. */
const nomsServices: Record<string, string> = {
  audit: "Audit IA et digital",
  sprints: "Sprints d'automatisation et d'IA",
  accompagnement: "Accompagnement à temps partagé",
  formation: "Formation liée au diagnostic",
};

const services = offers.map((offre) => ({
  "@type": "Service",
  "@id": `${urlAbsolue("/offres")}#${offre.slug}`,
  name: nomsServices[offre.slug] ?? offre.name,
  description: offre.description,
  provider: { "@id": ID_ORGANISATION },
}));

export const grapheAccueil = [organisation];
export const grapheAPropos = [personne];
export const grapheOffres = services;

/**
 * Sérialise un graphe pour injection dans un `<script type="application/ld+json">`.
 *
 * `<` est échappé : une chaîne contenant `</script>` fermerait la balise et
 * ferait sortir le reste du JSON dans le document.
 */
export function serialiser(noeuds: unknown[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": noeuds }).replace(
    /</g,
    "\\u003c",
  );
}
