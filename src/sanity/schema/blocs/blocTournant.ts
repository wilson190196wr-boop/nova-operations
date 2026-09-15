import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le récit du moment où la manière de travailler a changé.
 *
 * Les paragraphes sont des entrées distinctes plutôt qu'un seul champ texte,
 * parce que le site n'a aucun formatage en ligne : rien ne relirait les sauts
 * de ligne saisis dans un bloc de texte. Une entrée par paragraphe est la
 * seule façon d'obtenir une respiration entre deux idées.
 */
export const blocTournant = defineType({
  name: "blocTournant",
  title: "Le tournant",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "paragraphes",
      title: "Paragraphes",
      description:
        "Un paragraphe par entrée : la coupe est faite ici, pas à la saisie. L'ordre du tableau est celui de la lecture.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => [
        Rule.required().min(1).error("La section ne dit rien sans au moins un paragraphe."),
        Rule.unique().error("Deux paragraphes identiques : c'est un copier-coller resté en place."),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Le tournant", masque, titre),
  },
});
