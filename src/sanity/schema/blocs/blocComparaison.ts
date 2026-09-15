import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le tableau qui envoie chaque situation vers l'offre qui lui répond.
 *
 * Le même contenu se rend de deux façons : en colonnes sur grand écran, en
 * blocs empilés sur téléphone, où les en-têtes deviennent les étiquettes de
 * chaque valeur. D'où une seule saisie pour les deux — deux jeux de libellés
 * finiraient par diverger, et le rendu téléphone est celui qu'on relit le
 * moins.
 *
 * L'offre est une référence et non un nom recopié : le libellé affiché et le
 * lien vers sa section suivent ainsi l'offre, y compris si elle est renommée.
 */
export const blocComparaison = defineType({
  name: "blocComparaison",
  title: "Tableau comparatif",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chapeau",
      title: "Chapeau",
      description: "Le paragraphe d'introduction, entre le titre et le tableau.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "enTetes",
      title: "En-têtes",
      description:
        "Ces trois libellés coiffent les colonnes sur grand écran et servent d'étiquettes aux blocs empilés sur téléphone. Une seule saisie pour les deux rendus, qui ne peuvent donc pas se contredire.",
      type: "object",
      fields: [
        defineField({
          name: "situation",
          title: "Colonne des situations",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "offre",
          title: "Colonne des offres",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "resultat",
          title: "Colonne des résultats",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lignes",
      title: "Lignes",
      description: "Une ligne par situation ; l'ordre du tableau est celui de l'affichage.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "ligne",
          fields: [
            defineField({
              name: "situation",
              title: "Situation",
              description:
                "La phrase entre guillemets : elle est formulée comme la personne la dirait elle-même, pas comme on la résumerait.",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "offre",
              title: "Offre",
              description:
                "Le nom affiché et le lien vers la section correspondante en sont tous deux tirés : ils suivent l'offre si elle change de nom ou d'ancre.",
              type: "reference",
              to: [{ type: "offre" }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "resultat",
              title: "Résultat",
              description: "Ce que la situation devient, en une ligne.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "situation" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error("Un tableau sans ligne n'affiche que ses en-têtes."),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Tableau comparatif", masque, titre),
  },
});
