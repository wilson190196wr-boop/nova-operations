import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Les deux situations dans lesquelles le visiteur doit se reconnaître.
 *
 * Le bloc ne vend rien : il trie. Chaque colonne nomme d'abord sa cible, pour
 * que le lecteur sache en une ligne laquelle des deux le concerne — et que
 * l'autre ne lui coûte rien.
 */
export const blocSituations = defineType({
  name: "blocSituations",
  title: "Deux situations",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      description:
        "Le titre de la section. Le champ est haut de deux lignes parce qu'il attend une phrase, pas une étiquette.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profils",
      title: "Profils",
      description: "L'ordre du tableau est celui des colonnes, de gauche à droite.",
      type: "array",
      of: [
        defineArrayMember({
          name: "profil",
          title: "Profil",
          type: "object",
          fields: [
            defineField({
              name: "cible",
              title: "Cible",
              description:
                "À qui s'adresse la colonne. C'est le mot que le lecteur cherche pour savoir si la suite le concerne : nommez-le, ne le suggérez pas.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "titre",
              title: "Titre",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "texte",
              title: "Texte",
              description:
                "En prose plutôt qu'en puces : une liste à trois points fait diapositive.",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "titre", subtitle: "cible" },
          },
        }),
      ],
      validation: (Rule) => [
        Rule.required().min(1).error("Au moins un profil."),
        Rule.length(2).warning(
          "La grille est en deux colonnes : avec un autre nombre, la rangée reste bancale.",
        ),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Deux situations", masque, titre),
  },
});
