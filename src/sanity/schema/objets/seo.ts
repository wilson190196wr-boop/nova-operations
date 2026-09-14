import { defineField, defineType } from "sanity";

/**
 * Les métadonnées d'une page.
 *
 * Le titre est écrit en entier, suffixe « · KELERIA » compris, et n'est pas
 * composé depuis un gabarit. C'est une décision prise avant la mise sous CMS :
 * un gabarit ne s'applique pas au titre par défaut de la racine, et mélanger
 * les deux mécanismes produisait un suffixe tantôt absent, tantôt doublé.
 *
 * L'adresse canonique, l'URL Open Graph et l'entrée de sitemap dérivent toutes
 * de la route — aucune n'est saisie ici. Une URL ressaisie finit par désigner
 * une page qui n'existe plus.
 */
export const seo = defineType({
  name: "seo",
  title: "Référencement",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "titre",
      title: "Titre de la page",
      description:
        "Affiché dans l'onglet du navigateur et en première ligne d'un résultat Google. Écrivez-le en entier, suffixe « · KELERIA » compris. Entre 50 et 60 caractères se lit sans être coupé.",
      type: "string",
      validation: (Rule) => [
        Rule.required().error("Sans titre, la page apparaît sans nom dans les résultats de recherche."),
        Rule.max(70).warning("Au-delà de 70 caractères, Google coupe généralement le titre."),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "Le paragraphe affiché sous le titre dans les résultats de recherche. Entre 140 et 160 caractères. Ce n'est pas un facteur de classement, mais c'est ce qui décide du clic.",
      type: "text",
      rows: 3,
      validation: (Rule) => [
        Rule.required().error("Sans description, Google en compose une lui-même, à partir de bouts de page."),
        Rule.max(200).warning("Au-delà de 200 caractères, la fin de la description est coupée."),
      ],
    }),
    defineField({
      name: "imagePartage",
      title: "Visuel de partage (facultatif)",
      description:
        "Remplace le visuel commun du site pour cette page seulement. Format attendu : 1200 × 630 pixels. Laissez vide pour garder le visuel défini dans les réglages du site.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) =>
            Rule.custom((valeur, contexte) =>
              (contexte.parent as { asset?: unknown })?.asset && !valeur
                ? "Décrivez le visuel : il est lu par les lecteurs d'écran."
                : true,
            ),
        }),
      ],
    }),
  ],
});
