import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le grand titre de la page d'accueil et le paragraphe qui le suit.
 *
 * Le titre est saisi ligne par ligne parce que sa coupe est une décision
 * d'écriture et non une conséquence de la place disponible : c'est le rythme
 * de lecture qui la dicte, et il doit rester le même d'un écran à l'autre.
 */
export const blocHero = defineType({
  name: "blocHero",
  title: "Titre d'accueil",
  type: "object",
  fields: [
    defineField({
      name: "lignes",
      title: "Lignes du titre",
      description:
        "Une entrée par ligne affichée. La coupe est manuelle et voulue : elle ne suit pas la largeur de l'écran, elle ne change donc pas entre le téléphone et le grand écran.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => [
        Rule.required().min(1).error("Le titre d'accueil a besoin d'au moins une ligne."),
        Rule.max(4).warning("Au-delà de quatre lignes, le titre cesse d'en être un."),
      ],
    }),
    defineField({
      name: "chapeau",
      title: "Chapeau",
      description:
        "Le paragraphe placé sous le titre. C'est lui qui explique : le titre au-dessus n'est qu'une accroche et ne se suffit pas.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", lignes: "lignes" },
    prepare: ({ masque, lignes }) =>
      apercuBloc("Titre d'accueil", masque, (lignes ?? []).filter(Boolean).join(" ")),
  },
});
