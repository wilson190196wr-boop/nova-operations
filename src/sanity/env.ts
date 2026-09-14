/**
 * Les identifiants du projet Sanity, lus une seule fois et validés à la source.
 *
 * Deux principes gouvernent ce fichier.
 *
 * D'abord, une configuration absente doit s'entendre. Un repli silencieux vers
 * les anciens contenus écrits en dur donnerait un site qui a l'air de marcher
 * alors que le CMS n'est pas branché : la panne ne se verrait qu'au moment où
 * quelqu'un publierait une modification sans effet. `obligatoire()` lève donc
 * une erreur nommée, au build comme à l'exécution.
 *
 * Ensuite, `NEXT_PUBLIC_` est figé dans le bundle au moment de la compilation.
 * Les variables sont donc lues par leur nom complet et littéral — `process.env`
 * n'est pas un objet à l'exécution côté client, c'est une substitution de
 * texte : `process.env[nom]` ne serait jamais remplacé.
 */
function obligatoire(valeur: string | undefined, nom: string): string {
  const propre = valeur?.trim();
  if (!propre) {
    throw new Error(
      `Variable d'environnement manquante : ${nom}. ` +
        "Renseignez-la dans .env.local en développement et chez l'hébergeur en production. " +
        "Le modèle complet se trouve dans .env.example.",
    );
  }
  return propre;
}

export const projectId = obligatoire(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const dataset = obligatoire(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "NEXT_PUBLIC_SANITY_DATASET",
);

/**
 * La version de l'API Sanity, figée à une date.
 *
 * C'est un contrat : l'API se comporte comme au jour indiqué, donc une
 * évolution côté Sanity ne peut pas changer le rendu du site sans qu'on
 * décide de relever cette date. Ne la remplacez jamais par une date calculée.
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-09-14";

/**
 * L'adresse du Studio, utilisée par deux mécanismes distincts :
 * l'encodage stega, qui relie un texte affiché au champ qui le porte, et
 * l'outil Presentation, qui ouvre le bon document depuis la prévisualisation.
 *
 * Valeur relative par défaut : le Studio est servi par ce même site, sur
 * /studio. Une URL absolue n'est nécessaire que si le Studio est déployé
 * séparément.
 */
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || "/studio";

/**
 * L'hôte de l'API Sanity.
 *
 * Vide en temps normal : le client vise api.sanity.io. Le renseigner fait
 * pointer toutes les lectures ailleurs — vers un mandataire d'entreprise, ou
 * vers le serveur local que `scripts/verifier-fidelite.ts` met en place pour
 * comparer le rendu avant et après la mise sous CMS, sans toucher au projet
 * réel. `apiHost` est une option officielle de `@sanity/client`.
 */
export const apiHost = process.env.NEXT_PUBLIC_SANITY_API_HOST?.trim() || "";

/**
 * Jeton de lecture, serveur uniquement.
 *
 * Il n'est requis que pour lire les brouillons — donc pour la prévisualisation
 * et pour l'outil Presentation. Le site public n'en a pas besoin : il ne lit
 * que le contenu publié. Volontairement non validé ici, pour que le site
 * public puisse tourner sans ce jeton du tout.
 *
 * Le nom ne porte pas `NEXT_PUBLIC_` : il ne doit jamais atteindre le
 * navigateur.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN?.trim() || "";
