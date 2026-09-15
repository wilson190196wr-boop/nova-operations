import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Les règles de travail, posées en grille de deux colonnes.
 *
 * La grille se remplit par rangées de deux : un nombre impair laisse une
 * cellule vide au bout de la dernière rangée, qui se lit comme un oubli. Le
 * garde-fou est un avertissement et non une erreur — une règle de plus vaut
 * parfois une cellule dépareillée, et c'est à l'éditeur d'en décider.
 */
export const blocPrincipes = defineType({
  name: "blocPrincipes",
  title: "Règles",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "principes",
      title: "Règles",
      description:
        "Affichées deux par rangée sur grand écran, dans l'ordre de saisie. Un nombre pair remplit la grille sans trou.",
      type: "array",
      of: [
        defineArrayMember({
          name: "principe",
          title: "Règle",
          type: "object",
          fields: [
            defineField({
              name: "titre",
              title: "Titre",
              description: "L'énoncé de la règle, tenu en une ligne : c'est ce qui se retient.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "texte",
              title: "Texte",
              description: "Ce que la règle implique concrètement, une fois qu'on l'applique.",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "titre", subtitle: "texte" },
          },
        }),
      ],
      validation: (Rule) => [
        Rule.required().min(1),
        Rule.custom((principes) => {
          if (!Array.isArray(principes) || principes.length % 2 === 0) return true;
          return "Nombre impair : la dernière rangée n'aura qu'une cellule sur deux.";
        }).warning(),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Règles", masque, titre),
  },
});
