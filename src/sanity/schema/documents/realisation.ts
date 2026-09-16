import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Un projet livré ou un chantier type.
 *
 * Deux règles viennent de l'ancien fichier de contenu et sont conservées ici
 * comme validations, parce qu'elles portent le sens de la page.
 *
 * Exactement deux indicateurs : au-delà, plus personne ne les lit et
 * l'ensemble prend un air de plaquette. En dessous, la carte se déséquilibre —
 * les indicateurs sont collés en bas pour s'aligner d'une carte à l'autre.
 *
 * Aucune entreprise nommée : les projets livrés chez des employeurs
 * précédents restent désignés par une description de secteur. C'est une
 * contrainte de confidentialité, pas une imprécision à corriger.
 */
export const realisation = defineType({
  name: "realisation",
  title: "Réalisation",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contexte",
      title: "Contexte",
      description:
        "Le secteur et la taille, sans nommer l'entreprise : « Grand compte de l'industrie », « PME de plus de 30 salariés ».",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "annees",
      title: "Années",
      description:
        "« 2023 » ou « 2023-2024 ». Laissez vide pour un chantier type : la pastille de date disparaît alors entièrement.",
      type: "string",
    }),
    defineField({
      name: "texte",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "indicateurs",
      title: "Indicateurs",
      description:
        "Exactement deux. C'est une règle de la page : au-delà, plus personne ne les lit ; en dessous, les cartes ne s'alignent plus entre elles.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      // Deux règles distinctes et non une chaîne : une instance de Rule ne
      // porte qu'un message, et le second `.error()` écraserait le premier.
      validation: (Rule) => [
        Rule.required().length(2).error("Exactement deux indicateurs."),
        Rule.unique().error("Les deux indicateurs doivent différer."),
      ],
    }),
  ],
  preview: {
    select: { title: "titre", contexte: "contexte", annees: "annees" },
    prepare: ({ title, contexte, annees }) => ({
      title,
      subtitle: [annees, contexte].filter(Boolean).join(" · "),
    }),
  },
});
