import { defineField, defineType } from "sanity";

/**
 * Une entrée de menu.
 *
 * Le chemin est validé strictement, et ce n'est pas du zèle : le soulignement
 * azur de la page courante repose sur une égalité exacte entre le chemin du
 * lien et l'adresse affichée. Un slash final, ou une adresse qui ne
 * correspond à aucune page, éteint ce repère sans la moindre erreur visible.
 */
export const lienNavigation = defineType({
  name: "lienNavigation",
  title: "Lien de navigation",
  type: "object",
  fields: [
    defineField({
      name: "libelle",
      title: "Libellé",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chemin",
      title: "Chemin",
      description:
        "Une adresse interne, commençant par / et sans slash final : /offres, /a-propos, /contact. C'est cette égalité exacte qui souligne l'entrée de la page en cours.",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((valeur) => {
          if (typeof valeur !== "string") return "Chemin requis.";
          if (!valeur.startsWith("/")) return "Le chemin doit commencer par /.";
          if (valeur !== "/" && valeur.endsWith("/")) return "Retirez le slash final.";
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "libelle", subtitle: "chemin" },
  },
});
