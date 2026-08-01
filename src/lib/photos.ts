/**
 * Photos du site.
 *
 * Pour ajouter une photo : déposez le fichier dans `public/photos/`, décrivez-le
 * ici, puis affichez-le avec `<PhotoFrame>` — le composant gère le cadrage, les
 * coins arrondis et le voile dégradé pour les légendes en incrustation.
 *
 * `alt` est lu par les lecteurs d'écran et indexé par Google : décrivez ce
 * qu'on voit, pas ce que ça évoque. Mettez-le à jour avec la photo.
 */

export type Photo = {
  src: string;
  alt: string;
  /** Légende affichée sur ou sous la photo. Optionnelle. */
  caption?: string;
  width: number;
  height: number;
  /** Vrai tant que l'image est un dégradé d'attente, pas une vraie photo. */
  placeholder?: boolean;
};

/** À propos — portrait du fondateur. Ratio 4:5, cadrage buste. */
export const founderPhoto: Photo = {
  src: "/photos/portrait-fondateur.jpg",
  alt: "Portrait de Wilson Rault, fondateur de NOVA Operations",
  width: 1600,
  height: 2000,
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
