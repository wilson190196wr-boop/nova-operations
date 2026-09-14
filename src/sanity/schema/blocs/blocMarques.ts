import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le bandeau de logos.
 *
 * Le bandeau se lit d'un coup d'œil : un intertitre visible l'alourdirait pour
 * ne rien apprendre. Il garde pourtant un nom de liste, sans quoi la suite de
 * logos arriverait sans être annoncée aux lecteurs d'écran.
 *
 * Un logo reste facultatif : mieux vaut un nom composé typographiquement qu'une
 * image de mauvaise qualité au milieu de la rangée.
 */
export const blocMarques = defineType({
  name: "blocMarques",
  title: "Bandeau de marques",
  type: "object",
  fields: [
    defineField({
      name: "titreAccessible",
      title: "Titre accessible",
      description:
        "Le nom de la liste annoncé par les lecteurs d'écran. Il n'apparaît nulle part à l'écran.",
      type: "string",
      initialValue: "Références",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "marques",
      title: "Marques",
      description: "L'ordre du tableau est celui de la rangée.",
      type: "array",
      of: [
        defineArrayMember({
          name: "marque",
          title: "Marque",
          type: "object",
          fields: [
            defineField({
              name: "nom",
              title: "Nom",
              description:
                "Sert aussi de texte alternatif au logo : écrivez-le comme la marque l'écrit elle-même.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              description:
                "Facultatif : sans logo, le nom s'affiche composé typographiquement. Aucun texte alternatif à saisir, c'est le nom ci-dessus qui le fournit.",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "echelle",
              title: "Échelle",
              description:
                "Corrige l'équilibre optique : chaque logo porte ses propres marges internes et paraît plus gros ou plus petit que son voisin à hauteur égale. 1 est la hauteur de référence ; laissez vide tant que rien ne cloche.",
              type: "number",
              validation: (Rule) =>
                Rule.min(0.5)
                  .max(2)
                  .warning(
                    "Au-delà de la plage 0,5 – 2, ce n'est plus une correction optique : le logo prend le pas sur ses voisins.",
                  ),
            }),
          ],
          preview: {
            select: { title: "nom", media: "logo" },
          },
        }),
      ],
      validation: (Rule) => [
        Rule.required().min(1).error("Au moins une marque, sinon le bandeau n'a rien à montrer."),
        Rule.length(5).warning(
          "La grille du grand écran a cinq colonnes : un autre nombre laisse une rangée incomplète.",
        ),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", marques: "marques" },
    prepare: ({ masque, marques }) =>
      apercuBloc(
        "Bandeau de marques",
        masque,
        (marques ?? [])
          .map((marque: { nom?: string }) => marque?.nom)
          .filter(Boolean)
          .join(" · "),
      ),
  },
});
