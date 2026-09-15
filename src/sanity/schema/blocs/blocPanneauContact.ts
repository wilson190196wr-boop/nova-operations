import { defineField, defineType } from "sanity";

import { apercuBloc, champMasque } from "../objets/champsBloc";

/**
 * Le panneau de prise de contact : deux onglets, un lien de calendrier, un
 * formulaire.
 *
 * C'est le seul endroit du site où le visiteur écrit, et le dernier avant qu'il
 * renonce. Chaque mot y est saisi plutôt que codé en dur : ces libellés se
 * retouchent au vu des demandes reçues, sans attendre une mise en ligne.
 *
 * Le lien vers le calendrier hébergé est délibérément posé hors des onglets. Le
 * basculement d'un onglet à l'autre et le calendrier intégré demandent tous deux
 * JavaScript ; ce lien, lui, reste un lien. C'est le chemin qui tient quand le
 * reste tombe.
 */
export const blocPanneauContact = defineType({
  name: "blocPanneauContact",
  title: "Prise de contact",
  type: "object",
  fields: [
    defineField({
      name: "ongletRendezVous",
      title: "Onglet « Rendez-vous »",
      description:
        "L'onglet ouvert à l'arrivée sur la page : c'est le rendez-vous qui est proposé en premier, le message venant en second recours.",
      type: "object",
      fields: [
        defineField({
          name: "libelle",
          title: "Libellé",
          description:
            "Le texte de l'onglet. Deux ou trois mots : les deux onglets se partagent une seule ligne.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "mention",
          title: "Mention",
          description:
            "La courte phrase affichée à droite quand cet onglet est actif : durée, gratuité, ce qui attend le visiteur avant qu'il n'engage quoi que ce soit.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ongletMessage",
      title: "Onglet « Message »",
      description:
        "L'onglet secondaire, celui de l'écrit. Il s'adresse à qui ne veut pas encore poser un créneau dans son agenda.",
      type: "object",
      fields: [
        defineField({
          name: "libelle",
          title: "Libellé",
          description:
            "Le texte de l'onglet. Deux ou trois mots : les deux onglets se partagent une seule ligne.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "mention",
          title: "Mention",
          description:
            "La courte phrase affichée à droite quand cet onglet est actif : délai de réponse, ou ce à quoi le visiteur s'engage en écrivant.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "libelleLienCalendrier",
      title: "Libellé du lien vers le calendrier",
      description:
        "Le lien vers le calendrier hébergé, affiché sous les deux onglets. C'est la seule façon de réserver qui ne dépende pas de JavaScript, et elle reste visible quel que soit l'onglet actif : ne la formulez pas comme si elle appartenait au seul onglet « Rendez-vous ».",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "repliCalendrier",
      title: "Repli du calendrier",
      description:
        "Affiché à la place du calendrier quand celui-ci ne peut pas se charger : scripts bloqués, service indisponible. Le visiteur ne doit pas rester devant un cadre vide — dites-lui quoi faire à la place.",
      type: "object",
      fields: [
        defineField({
          name: "titre",
          title: "Titre",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "texte",
          title: "Texte",
          description:
            "Deux phrases au plus, qui renvoient vers l'autre onglet ou vers le lien du calendrier.",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formulaire",
      title: "Formulaire",
      description:
        "Tous les mots du formulaire, du libellé des champs jusqu'à l'écran de confirmation.",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "labelPrenom",
          title: "Libellé du prénom",
          description: "Le libellé affiché au-dessus du champ.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "labelNom",
          title: "Libellé du nom",
          description: "Le libellé affiché au-dessus du champ.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "labelEmail",
          title: "Libellé de l'adresse électronique",
          description: "Le libellé affiché au-dessus du champ.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "labelEntreprise",
          title: "Libellé de l'entreprise",
          description:
            "Le libellé affiché au-dessus du champ. Avec le téléphone, c'est l'un des deux seuls champs que le visiteur peut laisser vides : écrivez « (facultatif) » dans le libellé, rien d'autre ne le signale.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "labelTelephone",
          title: "Libellé du téléphone",
          description:
            "Le libellé affiché au-dessus du champ. Facultatif comme l'entreprise : la mention « (facultatif) » se porte dans le libellé.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "labelMessage",
          title: "Libellé du message",
          description:
            "Le libellé au-dessus de la zone de texte. C'est lui qui oriente ce que l'on reçoit : une question posée obtient des demandes exploitables, un simple « Message » obtient « Bonjour ».",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "texteConsentement",
          title: "Texte de consentement",
          description:
            "La phrase posée à côté de la case à cocher. Elle ne porte que sur le fait d'être recontacté : tout ce qui concerne l'usage des données se dit dans la mention légale ci-dessous, en dehors de la case.",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "mentionLegale",
          title: "Mention légale",
          description:
            "La phrase qui renvoie aux mentions légales, découpée en trois pour que seul le milieu soit un lien. Elle est séparée de la case à cocher à dessein : l'information sur l'usage des données ne doit pas être incluse dans ce que l'on coche.",
          type: "object",
          fields: [
            defineField({
              name: "avant",
              title: "Avant le lien",
              description: "Le début de la phrase, jusqu'au lien.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "libelleLien",
              title: "Libellé du lien",
              description:
                "Le seul segment cliquable. Nommez la page d'arrivée plutôt que le geste : « mentions légales », et non « ici ».",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "apres",
              title: "Après le lien",
              description: "La fin de la phrase, qui peut se réduire à sa ponctuation.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "libelleEnvoi",
          title: "Libellé du bouton d'envoi",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "libelleEnvoiEnCours",
          title: "Libellé pendant l'envoi",
          description:
            "Remplace le libellé du bouton tant que la demande part, le bouton étant alors inactif. Sur une connexion lente, c'est le seul signe que quelque chose se passe.",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "succes",
          title: "Confirmation d'envoi",
          description:
            "L'écran qui remplace le formulaire une fois la demande partie. Le formulaire disparaît : ce texte porte seul la confirmation et doit dire ce qui se passe ensuite.",
          type: "object",
          fields: [
            defineField({
              name: "titre",
              title: "Titre",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "texte",
              title: "Texte",
              description: "Ce qui va suivre, et sous quel délai.",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    champMasque,
  ],
  preview: {
    select: { masque: "masque", titre: "ongletRendezVous.libelle" },
    prepare: ({ masque, titre }) => apercuBloc("Prise de contact", masque, titre),
  },
});
