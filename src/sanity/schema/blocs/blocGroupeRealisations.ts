import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Une famille de réalisations, rassemblée sous son propre titre.
 *
 * La page empile plusieurs groupes, et chacun porte son ancre : c'est elle qui
 * permet d'envoyer quelqu'un droit sur les projets d'IA plutôt que sur le haut
 * de la page. Une ancre se partage par courriel et se retrouve dans des liens
 * qu'on ne contrôle plus — elle se fige donc une fois publiée.
 *
 * Les réalisations sont référencées et non recopiées : la même réalisation
 * peut figurer dans deux groupes, et sa correction se propage partout.
 */
export const blocGroupeRealisations = defineType({
  name: "blocGroupeRealisations",
  title: "Groupe de réalisations",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ancre",
      title: "Ancre",
      description:
        "L'identifiant de la section dans l'adresse : #dev, #ia. Il est visé depuis l'extérieur — le modifier casse les liens déjà partagés.",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((valeur) => {
          if (typeof valeur !== "string") return "Une ancre est nécessaire.";
          return /^[a-z0-9-]+$/.test(valeur)
            ? true
            : "Minuscules, chiffres et tirets uniquement : l'ancre part dans une URL.";
        }),
    }),
    defineField({
      name: "realisations",
      title: "Réalisations",
      description:
        "L'ordre du tableau est celui de l'affichage ; il règle aussi le décalage d'apparition d'une colonne à l'autre.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "realisation" }] })],
      validation: (Rule) => [
        Rule.required().min(1).error("Un groupe vide n'affiche que son titre."),
        Rule.unique().error("La même réalisation est citée deux fois dans ce groupe."),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Groupe de réalisations", masque, titre),
  },
});
