import { defineField, defineType } from "sanity";

/**
 * Une étape du déroulé numéroté.
 *
 * Le numéro est saisi et non calculé : il s'affiche tel quel sur téléphone, et
 * entre crochets au-delà. Les deux chiffres de « 01 » comptent — un « 1 » seul
 * casserait l'alignement de la colonne monospace.
 */
export const etape = defineType({
  name: "etape",
  title: "Étape",
  type: "object",
  fields: [
    defineField({
      name: "numero",
      title: "Numéro",
      description: "Sur deux chiffres : 01, 02, 03… Les crochets du grand écran sont ajoutés à l'affichage.",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^\d{2}$/, {
          name: "deux chiffres",
          invert: false,
        }).error("Deux chiffres exactement, par exemple 01."),
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
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { numero: "numero", titre: "titre", subtitle: "texte" },
    prepare: ({ numero, titre, subtitle }) => ({
      title: `${numero ?? "??"} — ${titre ?? "Sans titre"}`,
      subtitle,
    }),
  },
});
