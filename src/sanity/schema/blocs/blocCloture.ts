import { defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le bandeau sombre qui termine l'accueil, les offres, les réalisations et la
 * page À propos.
 *
 * Le libellé du bouton et la note restent dans les réglages du site : ils sont
 * identiques sur les quatre pages, et les recopier garantirait qu'un jour
 * l'une d'elles diverge sans que personne ne s'en aperçoive.
 *
 * Le texte, lui, peut différer. Il reste commun par défaut — champ laissé
 * vide — et ne devient propre à une page que lorsqu'on l'y écrit. Une page
 * qu'on n'a pas touchée suit donc toujours la formulation commune.
 */
export const blocCloture = defineType({
  name: "blocCloture",
  title: "Bandeau de clôture",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      description:
        "La seule chose qui change d'une page à l'autre : elle reprend le fil de la page qu'on vient de lire. Le texte, le libellé du bouton et la note sont communs aux quatre pages et se modifient dans les réglages du site.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "texte",
      title: "Texte",
      description:
        "Facultatif. Laissez vide pour reprendre le texte commun aux quatre pages, défini dans les réglages du site. Ne le remplissez que si cette page doit dire autre chose.",
      type: "text",
      rows: 3,
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre", texte: "texte" },
    prepare: ({ masque, titre, texte }) =>
      apercuBloc("Bandeau de clôture", masque, texte ? `${titre} — texte propre` : titre),
  },
});
