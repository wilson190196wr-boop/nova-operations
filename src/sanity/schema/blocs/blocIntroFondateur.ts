import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * L'ouverture de la page À propos : le portrait, la citation, la présentation.
 *
 * Le titre est saisi à part alors que la citation est ce qui domine à l'écran.
 * Ce n'est pas un doublon. Une citation est une phrase d'auteur : sortie de la
 * page — dans un résultat de recherche, dans la liste des titres qu'annonce un
 * lecteur d'écran — elle ne dirait ni qui parle ni de quoi il est question. Le
 * titre, lui, nomme la personne.
 */
export const blocIntroFondateur = defineType({
  name: "blocIntroFondateur",
  title: "Présentation du fondateur",
  type: "object",
  fields: [
    defineField({
      name: "portrait",
      title: "Portrait",
      description:
        "Cadrage buste, au format 4:5. Le point d'intérêt décide du recadrage sur les écrans étroits : posez-le sur le visage.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          description:
            "Décrivez ce qu'on voit, pas ce que la photo évoque : « Homme en chemise sombre, de trois quarts », et non « un regard déterminé ».",
          type: "string",
          validation: (Rule) =>
            Rule.custom((valeur, contexte) =>
              (contexte.parent as { asset?: unknown })?.asset && !valeur
                ? "Décrivez le portrait : il est lu par les lecteurs d'écran."
                : true,
            ),
        }),
      ],
      validation: (Rule) =>
        Rule.required().assetRequired().error("La page s'ouvre sur ce portrait."),
    }),
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      description: "La fonction, en quelques mots, affichée sous le nom.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "citation",
      title: "Citation",
      description:
        "La phrase mise en avant, en gras, au-dessus de la présentation. Une phrase : le gras d'un paragraphe entier ne met plus rien en avant.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titre",
      title: "Titre de la page",
      description:
        "Le titre principal de la page — il n'y en a qu'un. Il nomme la personne : hors contexte, la citation ne dirait ni qui parle ni de quoi la page traite.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "presentation",
      title: "Présentation",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "faits",
      title: "Chiffres clés",
      description: "Trois entrées, alignées sous la présentation.",
      type: "array",
      of: [defineArrayMember({ type: "fait" })],
      validation: (Rule) => [
        // `.min(1)` est indispensable : le validateur de présence de Sanity ne
        // teste que l'absence, et un tableau vide est une valeur définie.
        Rule.required()
          .min(1)
          .error("Sans chiffres clés, la rangée disparaît sous la présentation."),
        Rule.length(3).warning(
          "Trois chiffres clés : c'est le nombre sur lequel la grille est calée ; au-delà, elle passe à quatre colonnes.",
        ),
      ],
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Présentation du fondateur", masque, titre),
  },
});
