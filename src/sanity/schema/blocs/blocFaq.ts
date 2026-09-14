import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Les questions fréquentes.
 *
 * Le bloc prend en charge les objections qui, sans réponse écrite, arrivent une
 * à une par courriel. Elles sont donc traitées ici comme du contenu de vente, et
 * non comme une annexe d'aide.
 *
 * D'où la règle portée par le tableau : une réponse est lue hors de tout
 * contexte de projet, par quelqu'un dont on ne sait rien. Un délai ou un chiffre
 * de résultat écrit là vaut promesse, sans que personne ne l'ait consenti.
 */
export const blocFaq = defineType({
  name: "blocFaq",
  title: "Questions fréquentes",
  type: "object",
  fields: [
    defineField({
      name: "surtitre",
      title: "Surtitre",
      description:
        "Le court mot posé au-dessus du titre. Facultatif : sans lui, le titre ouvre seul la section.",
      type: "string",
    }),
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "questions",
      title: "Questions",
      description:
        "Les réponses ne promettent ni délai ni chiffre de résultat : elles sont lues hors de tout contexte de projet, et vaudraient alors engagement. L'ordre est celui de l'affichage — les questions qui font renoncer se placent en premier.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "question",
          title: "Question",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              description:
                "Formulée dans les mots du visiteur, à la première personne s'il le faut, plutôt que dans ceux du métier.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reponse",
              title: "Réponse",
              description:
                "Un paragraphe suivi, sans lien ni liste : le rendu n'a aucun formatage en ligne et afficherait la ponctuation telle quelle.",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "reponse" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Questions fréquentes", masque, titre),
  },
});
