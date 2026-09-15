import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Les offres dépliées une à une, au long de la page Offres.
 *
 * Le bloc ne contient aucun texte : tout est lu dans les documents `offre`,
 * qui servent aussi la carte de l'accueil et les données structurées. Une
 * durée ou un prix se corrige donc dans l'offre elle-même, et la correction
 * vaut partout d'un coup.
 *
 * Ce qui se décide ici est le choix des offres et leur ordre — deux choses que
 * l'on veut pouvoir changer sans toucher aux documents.
 */
export const blocOffresDetaillees = defineType({
  name: "blocOffresDetaillees",
  title: "Offres détaillées",
  type: "object",
  fields: [
    defineField({
      name: "offres",
      title: "Offres",
      description:
        "Chaque offre devient une section à part entière, adressable par son ancre. L'ordre est celui de l'affichage ; il décide aussi de l'alternance des fonds sur téléphone.",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "offre" }] })],
      validation: (Rule) => [
        Rule.required().min(1).error("Sans offre, la page n'aurait aucune section à déplier."),
        Rule.unique().error(
          "La même offre figure deux fois : elle produirait deux sections identiques et deux ancres concurrentes.",
        ),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", offres: "offres" },
    prepare: ({ masque, offres }) => {
      const nombre = Array.isArray(offres) ? offres.length : 0;
      return apercuBloc(
        "Offres détaillées",
        masque,
        nombre > 0 ? `${nombre} offre${nombre > 1 ? "s" : ""}` : undefined,
      );
    },
  },
});
