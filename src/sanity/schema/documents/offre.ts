import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Une offre, décrite une seule fois et lue à trois endroits : la carte de
 * l'accueil, le bloc détaillé de la page Offres, et les données structurées.
 *
 * Le `slug` mérite un mot. Il produit à lui seul l'ancre publique
 * `/offres#audit`, l'identifiant du titre, la cible `aria-labelledby` de la
 * section et l'identité de l'offre dans le balisage Schema.org. Le modifier
 * casse donc quatre choses d'un coup, dont des liens déjà partagés — d'où
 * l'avertissement porté par le champ.
 */
export const offre = defineType({
  name: "offre",
  title: "Offre",
  type: "document",
  groups: [
    { name: "identite", title: "Identité", default: true },
    { name: "detail", title: "Page Offres" },
    { name: "accueil", title: "Carte d'accueil" },
  ],
  fields: [
    defineField({
      name: "nom",
      title: "Nom",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Ancre",
      description:
        "Produit l'adresse publique /offres#ancre. Attention : la modifier casse les liens déjà partagés, les renvois du tableau comparatif et l'identité de l'offre auprès des moteurs.",
      type: "slug",
      group: "identite",
      options: { source: "nom", maxLength: 40 },
      validation: (Rule) =>
        Rule.required().custom((valeur) => {
          const courant = valeur?.current;
          if (!courant) return "Une ancre est nécessaire.";
          return /^[a-z0-9-]+$/.test(courant)
            ? true
            : "Minuscules, chiffres et tirets uniquement : l'ancre part dans une URL.";
        }),
    }),
    defineField({
      name: "numero",
      title: "Numéro",
      description: "Sur deux chiffres, affiché entre crochets au-dessus du titre : 01, 02…",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required().regex(/^\d{2}$/).error("Deux chiffres exactement."),
    }),
    defineField({
      name: "nomSchemaOrg",
      title: "Nom pour les moteurs de recherche",
      description:
        "Le nom complet du service dans les données structurées, là où « Audit » seul serait trop vague : « Audit IA et digital ». Invisible sur le site.",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required(),
    }),

    /* --- Bloc détaillé de la page Offres ------------------------------- */
    defineField({
      name: "accroche",
      title: "Accroche",
      description: "La phrase en gras sous le titre, sur la page Offres.",
      type: "text",
      rows: 2,
      group: "detail",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "Le paragraphe de présentation sur la page Offres. Il est aussi repris tel quel dans les données structurées : n'y affirmez rien que la page ne montre.",
      type: "text",
      rows: 4,
      group: "detail",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duree",
      title: "Durée",
      type: "string",
      group: "detail",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prix",
      title: "Investissement",
      type: "string",
      group: "detail",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "libelleBouton",
      title: "Libellé du bouton",
      description:
        "Écrit à la main plutôt que composé : « Parler de l'audit », « Parler des sprints » — l'élision change à chaque offre.",
      type: "string",
      group: "detail",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variantes",
      title: "Formats ou paliers",
      description:
        "Laissez vide si l'offre n'en propose pas : la colonne de droite affiche alors directement les livrables, sans encadré vide. Deux ou quatre paliers tombent juste dans la grille.",
      type: "array",
      group: "detail",
      of: [
        defineArrayMember({
          type: "object",
          name: "variante",
          fields: [
            defineField({ name: "nom", title: "Nom", type: "string", validation: (R) => R.required() }),
            defineField({ name: "prix", title: "Prix", type: "string", validation: (R) => R.required() }),
            defineField({
              name: "detail",
              title: "Détail",
              description: "Une ligne. Les paliers cumulatifs commencent par « + ».",
              type: "string",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "nom", subtitle: "prix" } },
        }),
      ],
      // `.warning()` est porté par la règle, pas par la valeur renvoyée : en
      // Sanity 6, une clé `level` dans l'objet de retour est ignorée et
      // l'avertissement remonterait en erreur bloquante.
      validation: (Rule) =>
        Rule.custom((valeur) =>
          !valeur || valeur.length === 0 || valeur.length === 2 || valeur.length === 4
            ? true
            : "Deux ou quatre paliers remplissent la grille sans cellule orpheline.",
        ).warning(),
    }),
    defineField({
      name: "livrables",
      title: "Ce que vous obtenez",
      description: "Une ligne par livrable, à puce azur.",
      type: "array",
      group: "detail",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1).unique(),
    }),

    /* --- Carte de l'accueil -------------------------------------------- */
    defineField({
      name: "resumeAccueil",
      title: "Résumé sur l'accueil",
      description:
        "Un texte distinct de la description : sur l'accueil, l'offre se présente en quelques lignes, sans reprendre la page Offres mot pour mot.",
      type: "text",
      rows: 3,
      group: "accueil",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "libelleLienAccueil",
      title: "Libellé du lien sur l'accueil",
      description:
        "Le lien souligné en bas de la carte. Écrit en toutes lettres plutôt que « En savoir plus » : hors contexte, un lecteur d'écran ne saurait pas où il mène.",
      type: "string",
      group: "accueil",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      name: "parNumero",
      title: "Par numéro",
      by: [{ field: "numero", direction: "asc" }],
    },
  ],
  preview: {
    select: { numero: "numero", nom: "nom", subtitle: "accroche" },
    prepare: ({ numero, nom, subtitle }) => ({
      title: `${numero ?? "??"} — ${nom ?? "Sans nom"}`,
      subtitle,
    }),
  },
});
