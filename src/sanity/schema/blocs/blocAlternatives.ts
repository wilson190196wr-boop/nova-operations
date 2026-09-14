import { defineArrayMember, defineField, defineType } from "sanity";
import { apercuBloc, champMasque } from "../objets/champsBloc";

/** Ce que les validations du tableau ont besoin de lire dans chaque entrée. */
type EntreeAlternative = { detachee?: boolean };

/**
 * Les pistes déjà tentées par le visiteur, et celle qui rompt la série.
 *
 * Tout l'argument du bloc tient dans un contraste : plusieurs entrées du même
 * registre, puis une dernière qui s'en détache sur un encadré sombre. Deux
 * entrées détachées ne détachent plus rien — c'est une erreur, le bloc perdrait
 * son sens. Une entrée détachée placée ailleurs qu'en dernier casse seulement la
 * montée : avertissement, l'ordre restant un choix éditorial.
 */
export const blocAlternatives = defineType({
  name: "blocAlternatives",
  title: "Ce que vous avez déjà essayé",
  type: "object",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alternatives",
      title: "Alternatives",
      description:
        "Les pistes déjà tentées, dans l'ordre de lecture. Les premières posent le registre, la dernière en sort.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "alternative",
          fields: [
            defineField({
              name: "nom",
              title: "Nom",
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
            defineField({
              name: "detachee",
              title: "Détacher en encadré",
              description:
                "L'entrée sort du registre et se pose sur un encadré sombre. Tout l'argument du bloc repose sur ce contraste : une seule entrée doit être détachée, et ce doit être la dernière.",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "nom", detachee: "detachee" },
            prepare: ({ title, detachee }) => ({
              title,
              subtitle: detachee ? "Détachée" : undefined,
            }),
          },
        }),
      ],
      validation: (Rule) => [
        Rule.required()
          .min(2)
          .error("Deux entrées au minimum : avec une seule, il n'y a rien à quoi s'opposer."),
        Rule.custom<EntreeAlternative[]>((alternatives) => {
          const detachees = (alternatives ?? []).filter((entree) => entree.detachee === true);
          return detachees.length > 1
            ? "Une seule entrée détachée. Deux encadrés sombres se neutralisent : plus rien ne se détache."
            : true;
        }),
        Rule.custom<EntreeAlternative[]>((alternatives) => {
          const entrees = alternatives ?? [];
          const position = entrees.findIndex((entree) => entree.detachee === true);
          return position === -1 || position === entrees.length - 1
            ? true
            : "L'entrée détachée se lit en dernier : placée avant, elle coupe la montée au lieu de la clore.";
        }).warning(),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Ce que vous avez déjà essayé", masque, titre),
  },
});
