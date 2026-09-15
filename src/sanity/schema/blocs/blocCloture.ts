import { defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le bandeau sombre qui termine l'accueil, les offres, les réalisations et la
 * page À propos.
 *
 * Un seul champ ici, et c'est voulu : le texte, le libellé du bouton et la
 * note vivent dans les réglages du site. Quatre pages affichent le même
 * bandeau ; le recopier page par page garantirait qu'un jour l'une d'elles
 * diverge sans que personne ne s'en aperçoive.
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
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Bandeau de clôture", masque, titre),
  },
});
