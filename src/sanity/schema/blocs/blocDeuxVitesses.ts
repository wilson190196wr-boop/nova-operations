import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Deux façons d'avancer, posées côte à côte, puis une réserve et un lien.
 *
 * Les deux cartes se lisent l'une contre l'autre : c'est la comparaison qui
 * porte le propos, pas chaque carte prise seule. Une troisième romprait le
 * face-à-face autant que la grille.
 *
 * La note recueille ce que les cartes ne peuvent pas dire sans s'alourdir. Le
 * lien qui la suit est facultatif, mais pas à moitié : un libellé sans chemin
 * n'irait nulle part, un chemin sans libellé ne s'afficherait pas.
 */
export const blocDeuxVitesses = defineType({
  name: "blocDeuxVitesses",
  title: "Deux vitesses",
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
      description: "Le paragraphe d'introduction, entre le titre et les deux cartes.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "modes",
      title: "Modes",
      description:
        "Deux, pas davantage : la grille du grand écran a deux colonnes, et l'intérêt du bloc tient au face-à-face.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "mode",
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
          ],
          preview: { select: { title: "nom", subtitle: "texte" } },
        }),
      ],
      validation: (Rule) => [
        // `.min(1)` est indispensable : le validateur de présence de Sanity ne
        // teste que l'absence, et un tableau vide est une valeur définie.
        Rule.required().min(1).error("Le bloc ne veut rien dire sans ses deux modes."),
        Rule.custom((modes) => {
          if (modes === undefined) return true;
          const nombre = Array.isArray(modes) ? modes.length : 0;
          if (nombre === 2) return true;
          return "Deux modes remplissent la rangée ; un autre nombre laisse la grille en deux colonnes incomplète.";
        }).warning(),
      ],
    }),
    defineField({
      name: "note",
      title: "Note",
      description:
        "La phrase en gris sous les deux cartes. Elle porte la réserve ou la précision que les cartes ne peuvent pas accueillir sans perdre leur tranchant.",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lien",
      title: "Lien",
      description:
        "Le lien souligné sous la note. Facultatif : laissez les deux champs vides pour ne rien afficher. Si vous en remplissez un, remplissez l'autre — seuls, ils ne produisent rien.",
      type: "object",
      fields: [
        defineField({
          name: "libelle",
          title: "Libellé",
          description:
            "Écrit en toutes lettres : hors contexte, un lecteur d'écran annonce le libellé seul, et « En savoir plus » ne dit pas où l'on va.",
          type: "string",
        }),
        defineField({
          name: "chemin",
          title: "Chemin",
          description: "Une adresse interne, commençant par / et sans slash final : /offres, /contact.",
          type: "string",
        }),
      ],
      validation: (Rule) =>
        Rule.custom((lien) => {
          const libelleBrut = lien?.libelle;
          const cheminBrut = lien?.chemin;
          const libelle = typeof libelleBrut === "string" ? libelleBrut.trim() : "";
          const chemin = typeof cheminBrut === "string" ? cheminBrut.trim() : "";
          if (!libelle && !chemin) return true;
          if (!libelle) return "Il manque le libellé : sans texte, le lien n'apparaît pas.";
          if (!chemin) return "Il manque le chemin : le libellé ne mènerait nulle part.";
          if (!chemin.startsWith("/")) return "Le chemin doit commencer par / : c'est une adresse du site.";
          if (chemin !== "/" && chemin.endsWith("/")) return "Retirez le slash final.";
          return true;
        }),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Deux vitesses", masque, titre),
  },
});
