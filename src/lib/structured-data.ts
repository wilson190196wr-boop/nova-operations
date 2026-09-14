import type { OffrePubliee, ParametresSite } from "@/sanity/types";
import { siteUrl, urlAbsolue } from "./seo";

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
 * avis et `sameAs`, faute de profils vérifiés. Ce sont des décisions, pas des
 * trous à combler — et c'est pour cela que les identifiants restent dans le
 * code : une faute de frappe y casse le chaînage sans rien changer de visible.
 */
export const ID_ORGANISATION = `${siteUrl}/#organization`;
export const ID_PERSONNE = `${urlAbsolue("/a-propos")}#person`;

export function grapheAccueil(parametres: ParametresSite) {
  return [
    {
      "@type": "Organization",
      "@id": ID_ORGANISATION,
      name: parametres.nom,
      url: siteUrl,
      email: parametres.email,
      telephone: parametres.telephone,
      description: parametres.descriptionOrganisation,
      founder: { "@id": ID_PERSONNE },
      // Les régions nommées, comme le disent le chapeau d'accueil et la FAQ.
      areaServed: parametres.zonesDesservies.map((zone) => ({
        "@type": "AdministrativeArea",
        name: zone,
      })),
    },
  ];
}

/**
 * La personne, décrite à partir de ce que la page « À propos » affiche
 * réellement — et non d'une seconde saisie qui pourrait la contredire.
 */
export function graphePersonne({ nom, role }: { nom: string; role: string }) {
  return [
    {
      "@type": "Person",
      "@id": ID_PERSONNE,
      name: nom,
      url: urlAbsolue("/a-propos"),
      jobTitle: role,
      worksFor: { "@id": ID_ORGANISATION },
    },
  ];
}

/** Les offres, rattachées aux ancres réelles de la page Offres. */
export function grapheOffres(offres: OffrePubliee[]) {
  return offres.map((offre) => ({
    "@type": "Service",
    "@id": `${urlAbsolue("/offres")}#${offre.ancre}`,
    name: offre.nomSchemaOrg || offre.nom,
    description: offre.description,
    provider: { "@id": ID_ORGANISATION },
  }));
}

/**
 * Sérialise un graphe pour injection dans un `<script type="application/ld+json">`.
 *
 * `<` est échappé : une chaîne contenant `</script>` fermerait la balise et
 * ferait sortir le reste du JSON dans le document. Le contenu vient désormais
 * d'un CMS, ce qui rend cette précaution plus nécessaire encore.
 */
export function serialiser(noeuds: unknown[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": noeuds }).replace(
    /</g,
    "\\u003c",
  );
}
