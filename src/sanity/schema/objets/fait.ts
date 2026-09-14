import { defineField, defineType } from "sanity";

/**
 * Une ligne de chiffres clés, coiffée d'un filet.
 *
 * Le nombre de faits décide de la grille : trois faits donnent trois colonnes
 * sur grand écran, toute autre quantité en donne quatre. Ce n'est donc pas un
 * réglage libre, d'où l'avertissement posé sur les listes qui l'emploient.
 */
export const fait = defineType({
  name: "fait",
  title: "Chiffre clé",
  type: "object",
  fields: [
    defineField({
      name: "libelle",
      title: "Libellé",
      description:
        "Le mot au-dessus du filet, affiché en petites capitales. Saisissez-le en casse normale : la mise en capitales est faite à l'affichage.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "valeur",
      title: "Valeur",
      description: "La donnée elle-même, en gros. Quelques mots au plus.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "libelle", subtitle: "valeur" },
  },
});
