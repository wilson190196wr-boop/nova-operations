import type { ImageSanity } from "./types";

/**
 * Les images du site viennent du CDN de Sanity, qui accepte ses paramètres de
 * transformation directement dans l'adresse.
 *
 * Pas de constructeur d'URL ici, et c'est délibéré. Deux des trois emplois
 * n'ont aucun recadrage à faire : les logos de marques sont posés en
 * `object-contain` sous un plafond de hauteur, et le portrait est recadré par
 * la CSS dans un cadre 4:5, exactement comme avant la mise sous CMS. Le seul
 * cas qui demande des dimensions imposées est le visuel de partage, et il tient
 * en trois paramètres.
 *
 * C'est aussi pour cela qu'aucun schéma n'active le point d'intérêt
 * (« hotspot ») : il ne serait honoré nulle part, et un réglage qui ne change
 * rien est pire qu'un réglage absent.
 */

/** Vrai si le fichier est un vecteur, que l'optimiseur d'images doit laisser passer tel quel. */
export function estVectoriel(url: string | null | undefined): boolean {
  return typeof url === "string" && new URL(url, "https://cdn.sanity.io").pathname.endsWith(".svg");
}

/**
 * L'adresse du visuel de partage, aux dimensions exigées par les réseaux.
 *
 * Le recadrage est imposé plutôt que supposé : un visuel déposé dans un autre
 * format serait sinon rogné arbitrairement par chaque plateforme, chacune à sa
 * façon.
 */
export function urlPartage(image: ImageSanity | null | undefined): string | null {
  if (!image?.url) return null;
  const url = new URL(image.url);
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("auto", "format");
  return url.toString();
}

/** Les dimensions du visuel de partage, annoncées aux réseaux sociaux. */
export const DIMENSIONS_PARTAGE = { width: 1200, height: 630 } as const;
