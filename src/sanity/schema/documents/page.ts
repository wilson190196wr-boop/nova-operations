import { defineArrayMember, defineField, defineType } from "sanity";
import { ROUTES } from "../../routes";


/** Les types de sections qu'une page peut recevoir, dans l'ordre du menu d'ajout. */
export const TYPES_DE_BLOCS = [
  "blocHero",
  "blocEnTetePage",
  "blocMarques",
  "blocSituations",
  "blocEtapes",
  "blocApercuOffres",
  "blocAlternatives",
  "blocOffresDetaillees",
  "blocDeuxVitesses",
  "blocComparaison",
  "blocGroupeRealisations",
  "blocIntroFondateur",
  "blocParcours",
  "blocTournant",
  "blocPrincipes",
  "blocPanneauContact",
  "blocFaq",
  "blocMentionsLegales",
  "blocCloture",
] as const;

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "contenu", title: "Sections", default: true },
    { name: "referencement", title: "Référencement" },
  ],
  fields: [
    defineField({
      name: "titre",
      title: "Nom de la page",
      description: "Sert à repérer la page dans le Studio. Il n'est affiché nulle part sur le site.",
      type: "string",
      group: "contenu",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "route",
      title: "Adresse",
      description:
        "L'URL servie par cette page. La liste est fermée : chaque adresse correspond à une route existante du site.",
      type: "string",
      group: "contenu",
      options: {
        list: ROUTES.map((r) => ({ title: `${r.titre} — ${r.valeur}`, value: r.valeur })),
        layout: "dropdown",
      },
      validation: (Rule) =>
        Rule.required().custom(async (valeur, contexte) => {
          if (!valeur) return "Choisissez l'adresse servie par cette page.";
          const client = contexte.getClient({ apiVersion: "2026-09-14" });
          // `drafts.` est retiré des deux côtés : un brouillon et sa version
          // publiée sont le même document, pas deux pages concurrentes.
          const idNu = contexte.document?._id.replace(/^drafts\./, "");
          const doublon = await client.fetch<string | null>(
            `*[_type == "page" && route == $route && !(_id in [$id, "drafts." + $id])][0]._id`,
            { route: valeur, id: idNu },
          );
          return doublon
            ? "Une autre page occupe déjà cette adresse. Deux pages ne peuvent pas servir la même URL."
            : true;
        }),
    }),
    defineField({
      name: "seo",
      title: "Référencement",
      type: "seo",
      group: "referencement",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blocs",
      title: "Sections",
      description:
        "Les sections de la page, dans l'ordre d'affichage. Glissez-les pour les réordonner. Chaque section peut être masquée sans être supprimée.",
      type: "array",
      group: "contenu",
      of: TYPES_DE_BLOCS.map((type) => defineArrayMember({ type })),
      validation: (Rule) => Rule.required().min(1).error("Une page sans section s'afficherait vide."),
    }),
  ],
  preview: {
    select: { title: "titre", subtitle: "route" },
  },
});
