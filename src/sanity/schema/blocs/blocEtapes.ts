import { defineArrayMember, defineField, defineType } from "sanity";
import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * La rangée numérotée qui raconte le déroulé d'une mission.
 *
 * Le bloc n'affiche aucun titre : les étapes se suffisent, et un titre de plus
 * alourdirait la page. Reste le cas des lecteurs d'écran, quand la rangée suit
 * immédiatement le titre de la page — d'où le titre masqué, facultatif.
 *
 * Trois ou quatre étapes : c'est la largeur pour laquelle la rangée est
 * dessinée. La contrainte reste un avertissement, parce qu'elle relève de la
 * mise en page et non du sens — un brouillon doit pouvoir passer outre.
 */
export const blocEtapes = defineType({
  name: "blocEtapes",
  title: "Le déroulé en étapes",
  type: "object",
  fields: [
    defineField({
      name: "titreMasque",
      title: "Titre pour les lecteurs d'écran",
      description:
        "Lu par les lecteurs d'écran, jamais affiché. Nécessaire quand la rangée suit directement le titre de la page : sans lui, la hiérarchie des titres saute un niveau. Laissez vide pour n'ajouter aucun titre.",
      type: "string",
    }),
    defineField({
      name: "etapes",
      title: "Étapes",
      description:
        "Trois ou quatre : au-delà de quatre la rangée déborde, en dessous de trois elle se disloque.",
      type: "array",
      of: [defineArrayMember({ type: "etape" })],
      validation: (Rule) => [
        Rule.required()
          .min(2)
          .error("Deux étapes au minimum : en dessous, il n'y a plus de déroulé à lire."),
        Rule.custom((etapes) => {
          // Tableau vide : c'est la règle précédente qui parle, inutile d'ajouter une seconde plainte.
          if (!etapes || etapes.length === 0) return true;
          return etapes.length === 3 || etapes.length === 4
            ? true
            : "Trois ou quatre étapes : au-delà la rangée déborde, en dessous elle se disloque.";
        }).warning(),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", etapes: "etapes" },
    prepare: ({ masque, etapes }) => {
      const nombre = Array.isArray(etapes) ? etapes.length : 0;
      return apercuBloc("Le déroulé en étapes", masque, `${nombre} étape${nombre > 1 ? "s" : ""}`);
    },
  },
});
