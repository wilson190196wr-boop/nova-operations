import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le parcours, jalon par jalon.
 *
 * L'ordre du tableau est restitué tel quel : aucun tri n'est appliqué à
 * l'affichage. Les périodes sont du texte libre — « 2020 — 2022 », un
 * millésime seul, parfois deux jalons qui se chevauchent — et trier là-dessus
 * produirait un ordre faux plutôt qu'un ordre absent. Le rangement est donc
 * éditorial : c'est en déplaçant les entrées qu'on change la chronologie lue.
 */
export const blocParcours = defineType({
  name: "blocParcours",
  title: "Parcours",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jalons",
      title: "Jalons",
      description:
        "L'ordre chronologique du tableau est restitué tel quel : aucun tri n'est appliqué à l'affichage, c'est votre rangement qui fait foi.",
      type: "array",
      of: [
        defineArrayMember({
          name: "jalon",
          title: "Jalon",
          type: "object",
          fields: [
            defineField({
              name: "periode",
              title: "Période",
              description:
                "« 2020 — 2022 », ou un millésime seul quand la date de fin n'apporte rien.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "lieu",
              title: "Lieu",
              description: "L'entreprise, l'école ou la ville où s'est déroulé le jalon.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Rôle",
              description: "La fonction occupée. C'est elle qui titre le jalon, la période et le lieu la coiffent.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "texte",
              title: "Texte",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { role: "role", periode: "periode", lieu: "lieu" },
            prepare: ({ role, periode, lieu }) => ({
              title: role ?? "Sans rôle",
              subtitle: [periode, lieu].filter(Boolean).join(" · "),
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Un parcours sans jalon n'affiche que son titre."),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Parcours", masque, titre),
  },
});
