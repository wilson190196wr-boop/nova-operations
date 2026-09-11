/**
 * Contenu de la page « Mentions légales ».
 *
 * Cadre appliqué : entrepreneur individuel, activité libérale (BNC), franchise
 * en base de TVA. D'où l'absence de capital social et de numéro RCS — ils ne
 * concernent que les sociétés et les activités commerciales.
 *
 * La page est écrite comme un document juridique, en articles numérotés. La
 * numérotation se calcule depuis l'ordre du tableau : insérer un article ne
 * demande pas de renuméroter les suivants à la main.
 *
 * Les valeurs marquées À_COMPLÉTER sont des mentions obligatoires au sens de
 * l'article 6-III de la LCEN : la page n'est pas conforme tant qu'elles ne sont
 * pas renseignées. Elles s'affichent en rouge pour qu'un oubli se voie.
 */

/** Marqueur visible, volontairement impossible à confondre avec une vraie valeur. */
export const A_COMPLETER = "À compléter avant la mise en ligne";

export const lastUpdated = "10 septembre 2026";

export type Article = {
  title: string;
  /** Lignes d'identification, pour les articles qui en portent. */
  rows?: { label: string; value: string }[];
  paragraphs?: string[];
  /** Sous-articles numérotés 7.1, 7.2… */
  subsections?: { title: string; paragraphs: string[] }[];
  /** Un seul article passe sur fond bleu nuit : celui qui compte le plus. */
  emphasis?: boolean;
};

export const articles: Article[] = [
  {
    title: "L'éditeur",
    rows: [
      { label: "Éditeur", value: "Wilson Rault, entrepreneur individuel" },
      { label: "Nom commercial", value: "NOVA" },
      { label: "Adresse", value: A_COMPLETER },
      { label: "SIRET", value: A_COMPLETER },
      { label: "TVA", value: "TVA non applicable, article 293 B du Code général des impôts" },
      { label: "Courriel", value: A_COMPLETER },
      { label: "Téléphone", value: A_COMPLETER },
      { label: "Directeur de la publication", value: "Wilson Rault" },
    ],
    paragraphs: [
      "L'activité étant exercée sous le régime de l'entreprise individuelle en profession libérale, elle ne donne lieu ni à capital social, ni à immatriculation au registre du commerce et des sociétés.",
    ],
  },
  {
    title: "L'hébergeur",
    rows: [
      { label: "Hébergeur", value: "Vercel Inc." },
      { label: "Adresse", value: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis" },
      { label: "Téléphone", value: A_COMPLETER },
      { label: "Site", value: "vercel.com" },
    ],
  },
  {
    title: "L'accès au site",
    paragraphs: [
      "Le site est accessible en tout lieu, sept jours sur sept et vingt-quatre heures sur vingt-quatre, sauf cas de force majeure ou interruption, programmée ou non, tenant à une nécessité de maintenance.",
      "L'éditeur ne saurait être tenu responsable d'une modification, d'une suspension ou d'une interruption du service, ni des conséquences qui pourraient en découler pour l'utilisateur.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    paragraphs: [
      "L'ensemble des textes, de la charte graphique et du code de ce site est la propriété de Wilson Rault, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      "Les marques et logos des entreprises citées appartiennent à leurs titulaires respectifs. Ils sont reproduits à titre de référence de parcours professionnel et ne valent ni partenariat, ni recommandation de leur part.",
    ],
  },
  {
    title: "Responsabilité",
    paragraphs: [
      "Les informations publiées sur ce site sont fournies à titre indicatif. Elles ne constituent ni un conseil personnalisé, ni un engagement contractuel : seule une proposition écrite et signée engage les parties.",
      "Les liens vers des sites tiers sont proposés pour votre commodité. Leur contenu n'engage que leurs éditeurs.",
    ],
  },
  {
    /**
     * Décrit l'état réel du site, vérifié dans le navigateur : aucun cookie
     * propre en production, aucune mesure d'audience, des polices servies
     * depuis le domaine. Le seul tiers est le calendrier de la page
     * Rendez-vous.
     *
     * À reprendre le jour où ce calendrier ne se chargera plus qu'au clic : le
     * second paragraphe n'aura alors plus lieu d'être.
     */
    title: "Cookies et traceurs",
    paragraphs: [
      "Ce site ne dépose aucun cookie de mesure d'audience, de publicité ou de réseau social. Il n'utilise ni Google Analytics, ni pixel de suivi. Les polices de caractères sont servies depuis ce domaine et n'appellent aucun service extérieur.",
      "La page Rendez-vous intègre un calendrier fourni par Cal.com, Inc. Son affichage établit une connexion avec ce prestataire, qui est susceptible de déposer ses propres traceurs sur votre terminal et applique sa propre politique de confidentialité. Le reste du site n'appelle aucun service tiers.",
    ],
  },
  {
    /**
     * Base légale retenue : l'article 6.1.b, les mesures précontractuelles
     * prises à la demande de la personne. C'est le fondement naturel d'un
     * formulaire que le visiteur remplit lui-même pour être recontacté — le
     * consentement n'est pas nécessaire pour répondre à quelqu'un qui vous
     * écrit.
     */
    title: "Données à caractère personnel",
    emphasis: true,
    paragraphs: [
      "Ce site ne collecte de données que par son formulaire de contact, et uniquement celles que vous y écrivez.",
    ],
    subsections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          "Wilson Rault, entrepreneur individuel, aux coordonnées indiquées à l'article 1. Aucun délégué à la protection des données n'a été désigné : la nature et le volume des traitements ne l'imposent pas.",
        ],
      },
      {
        title: "Données collectées",
        paragraphs: [
          "Vos prénom, nom, adresse électronique professionnelle, le nom et l'effectif de votre entreprise, le sujet de votre demande et le contenu de votre message.",
          "Aucune information n'est collectée au-delà de ce qui permet de vous répondre. Aucun profilage ni décision automatisée n'est appliqué.",
        ],
      },
      {
        title: "Finalité et base légale",
        paragraphs: [
          "Ces données servent uniquement à traiter votre demande et, le cas échéant, à établir une proposition commerciale. Le traitement repose sur l'exécution de mesures précontractuelles prises à votre demande, au sens de l'article 6.1.b du règlement général sur la protection des données.",
        ],
      },
      {
        title: "Durée de conservation",
        paragraphs: [
          "Les demandes sont conservées trois ans à compter du dernier contact, puis supprimées. Si une mission est engagée, les documents contractuels suivent les durées légales propres à la comptabilité.",
        ],
      },
      {
        title: "Destinataires",
        paragraphs: [
          "Wilson Rault est le seul destinataire de vos messages. Aucune donnée n'est vendue, louée ni transmise à des tiers à des fins de prospection.",
          "L'acheminement des courriels transite par un prestataire technique agissant comme sous-traitant, sur la base d'un accord de traitement des données et d'un hébergement en Union européenne.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité sur les données vous concernant. Ces droits s'exercent par courriel à l'adresse indiquée à l'article 1 ; une réponse vous sera apportée dans un délai d'un mois.",
          "Si la réponse ne vous satisfait pas, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou sur cnil.fr.",
        ],
      },
    ],
  },
  {
    title: "Droit applicable et juridiction",
    paragraphs: [
      "Les présentes mentions légales sont régies par le droit français. Toute utilisation du site vaut acceptation de leurs termes.",
      "En cas de différend, les parties rechercheront une solution amiable avant toute action contentieuse. À défaut d'accord, le litige sera porté devant les juridictions françaises compétentes.",
    ],
  },
];
