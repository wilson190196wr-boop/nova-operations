import { defineArrayMember, defineField, defineType } from "sanity";
import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Les offres résumées en cartes, sur l'accueil.
 *
 * Rien du contenu des cartes ne se saisit ici : chaque offre porte déjà son
 * résumé d'accueil et le libellé de son lien. Le bloc ne décide que de celles
 * qui paraissent et de leur ordre — une offre corrigée l'est partout d'un coup,
 * y compris sur la page Offres et dans les données structurées.
 */
export const blocApercuOffres = defineType({
  name: "blocApercuOffres",
  title: "Aperçu des offres",
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
      description: "Le paragraphe posé sous le titre, avant la grille de cartes.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "offres",
      title: "Offres",
      description:
        "L'ordre du tableau est celui de l'affichage. Le texte des cartes vient des offres elles-mêmes : il ne se modifie pas depuis cette page.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "offre" }] })],
      validation: (Rule) => [
        Rule.required()
          .min(1)
          .error("Au moins une offre : sans référence, la section s'afficherait vide."),
        Rule.unique().error("La même offre deux fois donnerait deux cartes identiques."),
        Rule.custom((offres) => {
          // Tableau vide : la règle précédente le signale déjà.
          if (!offres || offres.length === 0) return true;
          return offres.length === 4
            ? true
            : "Quatre offres : c'est le compte pour lequel la grille de l'accueil est dessinée. En dehors, une cellule reste orpheline.";
        }).warning(),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Aperçu des offres", masque, titre),
  },
});
