/**
 * Photos du site.
 *
 * Les fichiers livrés dans `public/photos/` sont des images d'attente
 * (dégradés générés). Pour mettre une vraie photo : remplacez le fichier en
 * gardant le même nom, ou changez `src` ci-dessous. Respectez le ratio indiqué,
 * le cadrage est calculé dessus.
 *
 * `alt` est lu par les lecteurs d'écran et par Google : décrivez ce qu'on voit,
 * pas ce que ça évoque. Mettez-le à jour en même temps que la photo.
 */

export type Photo = {
  src: string;
  alt: string;
  /** Légende affichée sous ou sur la photo. Optionnelle. */
  caption?: string;
  width: number;
  height: number;
  /** Vrai tant que l'image est un dégradé d'attente, pas une vraie photo. */
  placeholder?: boolean;
};

/** Accueil — section « Sur le terrain ». Ratio 4:3 pour la principale, 4:5 pour les deux autres. */
export const terrainPhotos: { lead: Photo; secondary: [Photo, Photo] } = {
  lead: {
    src: "/photos/terrain-atelier.png",
    alt: "Atelier de production : un opérateur devant son poste de travail",
    caption: "Le diagnostic commence au poste de travail, pas en salle de réunion.",
    width: 1600,
    height: 1200,
    placeholder: true,
  },
  secondary: [
    {
      src: "/photos/terrain-chantier.png",
      alt: "Conducteur de travaux consultant un planning sur chantier",
      caption: "Sur chantier",
      width: 900,
      height: 1125,
      placeholder: true,
    },
    {
      src: "/photos/terrain-pilotage.png",
      alt: "Comité de pilotage autour d'un tableau d'indicateurs",
      caption: "En comité de pilotage",
      width: 900,
      height: 1125,
      placeholder: true,
    },
  ],
};

/** À propos — portrait du fondateur. Ratio 4:5, cadrage buste. */
export const founderPhoto: Photo = {
  src: "/photos/portrait-fondateur.png",
  alt: "Portrait de Wilson Rault, fondateur de NOVA Operations",
  width: 1000,
  height: 1250,
  placeholder: true,
};

export const founder = {
  name: "Wilson Rault",
  role: "Fondateur · Fractional COO",
  quote:
    "J'ai passé quinze ans à l'intérieur des opérations, pas en face d'elles. Ce que je vends aujourd'hui, ce n'est pas un rapport : c'est quelqu'un qui reste jusqu'à ce que les chiffres bougent.",
  bio: [
    "Après des années en direction industrielle et en systèmes d'information, j'ai vu le même scénario se rejouer : un diagnostic juste, une recommandation raisonnable, et personne pour la porter six mois plus tard.",
    "NOVA est né de ce constat. Nous auditons vite, nous chiffrons tout, puis nous restons au comité de direction jusqu'à ce que le gain soit visible dans le compte de résultat.",
  ],
};
