import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Les réglages partagés par tout le site : un seul document, jamais deux.
 *
 * Ce qui vit ici plutôt que dans une page obéit à une règle simple : tout ce
 * qui est affiché à plusieurs endroits. Les coordonnées apparaissent sur la
 * page Contact, dans les mentions légales et dans le pied de page ; le texte
 * du bandeau de clôture est identique sur quatre routes. Les recopier page par
 * page garantirait qu'un jour ils divergent.
 */
export const parametresSite = defineType({
  name: "parametresSite",
  title: "Réglages du site",
  type: "document",
  groups: [
    { name: "identite", title: "Identité", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "cloture", title: "Bandeau de clôture" },
    { name: "introuvable", title: "Page introuvable" },
    { name: "partage", title: "Partage et moteurs" },
  ],
  fields: [
    /* --- Identité ---------------------------------------------------- */
    defineField({
      name: "nom",
      title: "Nom du site",
      description:
        "Le nom de la marque, tel qu'il apparaît en toutes lettres. Il n'alimente pas le mot-symbole du logo, dont la coupe « kel / eria » est dessinée dans le code.",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accroche",
      title: "Accroche",
      description: "La phrase qui suit le nom au pied de page.",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Adresse électronique",
      description:
        "Affichée sur la page Contact et dans les mentions légales. Elle sert aussi d'adresse de repli pour la réception du formulaire : la changer ici change l'endroit où arrivent les demandes.",
      type: "string",
      group: "identite",
      validation: (Rule) =>
        Rule.required().email().error("Une adresse électronique valide est attendue."),
    }),
    defineField({
      name: "telephone",
      title: "Téléphone",
      description:
        "Au format lisible, espaces compris : +33 6 62 90 92 59. Le numéro composé au clic est nettoyé automatiquement.",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ville",
      title: "Localisation",
      description: "La ville affichée sur la page Contact.",
      type: "string",
      group: "identite",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coordonnees",
      title: "Libellés de la carte de coordonnées",
      description:
        "Les trois mots qui coiffent l'adresse, le numéro et la ville sur la page Contact. Saisissez-les en casse normale : la mise en petites capitales est faite à l'affichage.",
      type: "object",
      group: "identite",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "libelleEmail",
          title: "Libellé de l'adresse électronique",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "libelleTelephone",
          title: "Libellé du téléphone",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "libelleVille",
          title: "Libellé de la localisation",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    /* --- Navigation --------------------------------------------------- */
    defineField({
      name: "navPrincipale",
      title: "Menu principal",
      description:
        "Les entrées du menu, en-tête et pied de page. Trois entrées tiennent la barre sans la serrer.",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "lienNavigation" })],
      validation: (Rule) => [
        Rule.required().min(1),
        Rule.max(5).warning("Au-delà de cinq entrées, la barre se resserre sur les écrans moyens."),
      ],
    }),
    defineField({
      name: "navPiedDePage",
      title: "Entrées supplémentaires du pied de page",
      description:
        "Ajoutées après le menu principal, en bas de page seulement. Les mentions légales doivent y figurer : c'est une obligation d'affichage.",
      type: "array",
      group: "navigation",
      of: [defineArrayMember({ type: "lienNavigation" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "libelleRendezVous",
      title: "Libellé du bouton de rendez-vous",
      description:
        "Le bouton sombre de l'en-tête, repris à l'identique dans le menu du téléphone.",
      type: "string",
      group: "navigation",
      validation: (Rule) => Rule.required(),
    }),

    /* --- Bandeau de clôture ------------------------------------------- */
    defineField({
      name: "cloture",
      title: "Textes communs du bandeau de clôture",
      description:
        "Le bandeau sombre qui termine l'accueil, les offres, les réalisations et la page À propos. Seul son titre change d'une page à l'autre ; ces trois textes sont partagés.",
      type: "object",
      group: "cloture",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "texte",
          title: "Texte",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "libelleBouton",
          title: "Libellé du bouton",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "note",
          title: "Note sous le bouton",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    /* --- Page introuvable --------------------------------------------- */
    defineField({
      name: "pageIntrouvable",
      title: "Textes de la page introuvable",
      description:
        "La page servie sur une adresse qui n'existe pas : lien périmé, adresse mal recopiée, page supprimée. Elle vit ici et non dans « Pages » parce qu'elle ne correspond à aucune adresse : elle répond à toutes celles qui n'en sont pas une. Les liens qu'elle propose sont ceux du menu et du pied de page — ils suivent la navigation d'eux-mêmes, sans seconde liste à tenir à jour.",
      type: "object",
      group: "introuvable",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "surtitre",
          title: "Surtitre",
          description: "Le petit texte en capitales au-dessus du titre.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titre",
          title: "Titre",
          description: "Le titre de la page. Il doit dire ce qui s'est passé, pas s'excuser.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "texte",
          title: "Texte",
          description:
            "Une phrase, deux au plus : ce qui a pu se passer et où reprendre. Le visiteur cherchait autre chose, il ne restera pas lire.",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "libelleRetour",
          title: "Libellé du bouton",
          description: "Le bouton sombre, qui ramène à l'accueil.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titreLiens",
          title: "Libellé de la liste de liens",
          description:
            "Le mot qui coiffe les liens, sous le bouton. Saisissez-le en casse normale : la mise en petites capitales est faite à l'affichage.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "titreOnglet",
          title: "Titre dans l'onglet du navigateur",
          description:
            "Écrit en entier, suffixe compris — comme les titres des six pages. La page porte « noindex » : ce titre n'apparaîtra dans aucun résultat de recherche.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    /* --- Partage et moteurs ------------------------------------------- */
    defineField({
      name: "imagePartage",
      title: "Visuel de partage par défaut",
      description:
        "L'image montrée quand un lien du site est partagé. 1200 × 630 pixels. Chaque page peut la remplacer par la sienne.",
      type: "image",
      group: "partage",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionOrganisation",
      title: "Description de l'activité",
      description:
        "Une phrase reprise telle quelle dans les données structurées lues par les moteurs. Elle ne doit rien affirmer que les pages ne montrent pas.",
      type: "text",
      rows: 2,
      group: "partage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zonesDesservies",
      title: "Zones d'intervention",
      description:
        "Les régions nommées aux moteurs de recherche. Elles doivent correspondre à ce que disent les pages — pas davantage.",
      type: "array",
      group: "partage",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Réglages du site" }),
  },
});
