import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * La page des mentions légales, article par article.
 *
 * Aucune numérotation n'est stockée : « Article 1 », « 7.2 » sont calculés
 * depuis l'ordre des tableaux. Un numéro saisi dans un titre en ferait
 * apparaître deux au premier déplacement, et le document se mettrait à se
 * contredire lui-même.
 *
 * La contrepartie est que l'ordre porte du sens : des paragraphes citent
 * « l'article 1 » en toutes lettres, et un réordonnancement rend ces renvois
 * faux sans qu'aucune validation ne puisse le voir.
 *
 * Une ligne d'identité laissée sans valeur s'affiche en manque, bien visible :
 * ces mentions sont obligatoires, et un blanc ne doit pas pouvoir se faire
 * passer pour un choix éditorial.
 */
export const blocMentionsLegales = defineType({
  name: "blocMentionsLegales",
  title: "Mentions légales",
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
      description:
        "Le paragraphe d'ouverture, sous le titre. C'est l'endroit pour dire à quoi sert la page et à qui elle s'adresse ; l'obligation légale, elle, se tient dans les articles.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prefixeMiseAJour",
      title: "Libellé de la mise à jour",
      description:
        "Introduit la date, juste avant elle. Il en est séparé pour que la date puisse changer seule, à chaque révision.",
      type: "string",
      initialValue: "Dernière mise à jour :",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dateMiseAJour",
      title: "Date de mise à jour",
      description:
        "Écrite en toutes lettres, telle qu'elle doit s'afficher : « 10 septembre 2026 ». Elle n'est pas calculée — elle marque la dernière révision du texte, pas la dernière sauvegarde du document.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "motArticle",
      title: "Mot « Article »",
      description:
        "Le mot qui précède le numéro, au-dessus de chaque titre d'article. Les numéros, eux, sont calculés depuis l'ordre des articles et ne se saisissent pas.",
      type: "string",
      initialValue: "Article",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "articles",
      title: "Articles",
      description:
        "Les numéros d'articles sont calculés depuis l'ordre de ce tableau. Attention : plusieurs paragraphes citent « l'article 1 » en toutes lettres — réordonner les articles rendrait ces renvois faux.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "articleLegal",
          title: "Article",
          fields: [
            defineField({
              name: "titre",
              title: "Titre",
              description: "Le titre seul, sans son numéro.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "paragraphes",
              title: "Paragraphes",
              description:
                "Un paragraphe par entrée. Laissez vide pour un article qui ne porte que des lignes d'identité ou des sous-articles.",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
            defineField({
              name: "lignes",
              title: "Lignes d'identité",
              description:
                "Les couples libellé / valeur des mentions d'identification : raison sociale, immatriculation, hébergeur. Réservez-les aux données factuelles ; ce qui s'explique va dans les paragraphes.",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "ligneIdentite",
                  title: "Ligne",
                  fields: [
                    defineField({
                      name: "libelle",
                      title: "Libellé",
                      description:
                        "Affiché en petites capitales ; saisissez-le en casse normale.",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "valeur",
                      title: "Valeur",
                      description:
                        "Laissez vide tant que la valeur n'est pas connue : la mention manquante s'affiche alors en rouge sur la page, parce qu'elle est obligatoire et qu'un oubli doit se voir plutôt que disparaître.",
                      type: "string",
                    }),
                    defineField({
                      name: "lien",
                      title: "Rendre la valeur cliquable",
                      description:
                        "Décide si la valeur devient cliquable. C'est un choix explicite et non une devinette faite sur le contenu : un numéro SIRET compte quatorze chiffres et se retrouverait sinon affiché comme un téléphone appelable.",
                      type: "string",
                      initialValue: "aucun",
                      options: {
                        list: [
                          { title: "Texte simple", value: "aucun" },
                          { title: "Adresse électronique", value: "courriel" },
                          { title: "Numéro de téléphone", value: "telephone" },
                          { title: "Adresse de site", value: "site" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "libelle", subtitle: "valeur" },
                  },
                }),
              ],
            }),
            defineField({
              name: "sousArticles",
              title: "Sous-articles",
              description:
                "Découpe l'article en sections numérotées (7.1, 7.2…), dans l'ordre du tableau. Réservez-les aux articles longs : un sous-article unique se lit plus mal qu'un article simple.",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "sousArticle",
                  title: "Sous-article",
                  fields: [
                    defineField({
                      name: "titre",
                      title: "Titre",
                      description:
                        "Le numéro (7.1, 7.2…) est calculé depuis l'ordre ; ne le saisissez pas dans le titre.",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "paragraphes",
                      title: "Paragraphes",
                      description: "Un paragraphe par entrée.",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                      validation: (Rule) => Rule.required().min(1),
                    }),
                  ],
                  preview: {
                    select: { title: "titre" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "titre" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Mentions légales", masque, titre),
  },
});
