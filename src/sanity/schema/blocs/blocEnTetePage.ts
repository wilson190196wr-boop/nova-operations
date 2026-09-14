import { defineArrayMember, defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * L'ouverture d'une page intérieure : surtitre, titre, chapeau, chiffres clés.
 *
 * C'est ce bloc qui porte le titre principal de la page, et lui seul. Une page
 * n'en reçoit donc qu'un, placé en tête : deux chapeaux donneraient deux
 * titres de premier niveau, et la hiérarchie que suivent les lecteurs d'écran
 * comme les moteurs n'aurait plus de sommet unique.
 *
 * Les coordonnées ne se saisissent pas ici. La case les fait venir des
 * réglages du site, pour qu'un numéro qui change soit corrigé à un seul
 * endroit plutôt que sur chacune des pages qui l'affichent.
 */
export const blocEnTetePage = defineType({
  name: "blocEnTetePage",
  title: "Chapeau de page",
  type: "object",
  fields: [
    defineField({
      name: "surtitre",
      title: "Surtitre",
      description:
        "Le petit mot en monospace posé au-dessus du titre. Il situe la page en deux ou trois mots ; laissez vide quand le titre se suffit à lui-même.",
      type: "string",
    }),
    defineField({
      name: "titre",
      title: "Titre",
      description:
        "Le titre principal de la page — il n'y en a qu'un. C'est le premier niveau de la hiérarchie des titres : tout le reste de la page se range dessous.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chapeau",
      title: "Chapeau",
      description:
        "Le paragraphe d'introduction, sous le titre. Facultatif : une page qui entre directement dans le vif s'en passe.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "faits",
      title: "Chiffres clés",
      description:
        "Trois ou quatre. La grille du grand écran compte trois colonnes pour trois faits, et quatre à partir du quatrième : toute autre quantité laisse une cellule vide en bout de rangée. Laissez la liste vide pour n'afficher aucun chiffre.",
      type: "array",
      of: [defineArrayMember({ type: "fait" })],
      validation: (Rule) =>
        Rule.custom((faits) => {
          const nombre = Array.isArray(faits) ? faits.length : 0;
          if (nombre === 0 || nombre === 3 || nombre === 4) return true;
          return "Trois ou quatre chiffres clés remplissent la rangée sans cellule orpheline.";
        }).warning(),
    }),
    defineField({
      name: "afficherCoordonnees",
      title: "Afficher les coordonnées",
      description:
        "Ajoute sous le chapeau la carte reprenant l'adresse électronique, le téléphone et la ville. Ces trois valeurs viennent des réglages du site : elles ne se saisissent pas ici et restent identiques partout où la carte apparaît.",
      type: "boolean",
      initialValue: false,
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "titre" },
    prepare: ({ masque, titre }) => apercuBloc("Chapeau de page", masque, titre),
  },
});
