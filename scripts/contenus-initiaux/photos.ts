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
  alt: "Portrait de Wilson Rault, fondateur de KELERIA",
  width: 1600,
  height: 2000,
};
