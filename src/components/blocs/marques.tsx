import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";
import { estVectoriel } from "@/sanity/image";
import type { BlocMarques } from "@/sanity/types";

type Marque = BlocMarques["marques"][number];

/**
 * Les marques, en grille sur grand écran et en bandeau défilant en dessous.
 *
 * Cinq logos ne se répartissent pas dans une grille de deux ou trois colonnes :
 * il reste toujours une cellule orpheline. Le bandeau supprime la question —
 * le nombre de marques n'a plus d'incidence sur la mise en page.
 *
 * La grille de cinq est conservée à partir de `lg`, où les cinq cellules
 * tombent juste et où la charte la prévoit ainsi.
 */
export function BandeauMarques({ bloc }: { bloc: BlocMarques }) {
  return (
    <div className="mt-8 sm:mt-section">
      <Container className="max-lg:hidden">
        <ul aria-label={bloc.titreAccessible} className="grid grid-cols-5 gap-3">
          {bloc.marques.map((marque) => (
            <CelluleMarque key={marque._key} marque={marque} />
          ))}
        </ul>
      </Container>

      {/* Pleine largeur, hors du conteneur : un bandeau qui s'arrête aux
          gouttières se lit comme une liste tronquée, pas comme un défilé. */}
      <div className="mask-fade-x overflow-hidden lg:hidden">
        <ul aria-label={bloc.titreAccessible} className="marquee-track flex w-max gap-3">
          {/* Deux copies : la première est lue par les lecteurs d'écran, la
              seconde n'existe que pour boucler sans raccord. La duplication est
              faite ici et jamais côté contenu — une marque saisie deux fois
              serait annoncée deux fois. */}
          {[...bloc.marques, ...bloc.marques].map((marque, i) => (
            <CelluleMarque
              key={`${marque._key}-${i}`}
              marque={marque}
              aria-hidden={i >= bloc.marques.length}
              largeurFixe
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function CelluleMarque({
  marque,
  largeurFixe = false,
  ...reste
}: {
  marque: Marque;
  largeurFixe?: boolean;
  "aria-hidden"?: boolean;
}) {
  const logo = marque.logo;
  // Le plafond de 30 px vient de la charte ; l'échelle corrige ensuite les
  // marges internes propres à chaque logo.
  const hauteur = 30 * (marque.echelle ?? 1);

  return (
    <li
      {...reste}
      className={`flex min-h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-paper px-[18px] text-center sm:min-h-[76px] sm:whitespace-normal sm:rounded-[20px] sm:py-3 ${
        largeurFixe ? "w-[168px] shrink-0" : ""
      }`}
    >
      {logo?.url && logo.largeur && logo.hauteur ? (
        <Image
          src={logo.url}
          alt={logo.alt}
          width={logo.largeur}
          height={logo.hauteur}
          style={{ maxHeight: `${hauteur}px` }}
          // La largeur affichée se déduit du ratio intrinsèque et de cette
          // hauteur plafonnée. Sans elle, le navigateur choisissait des
          // variantes de 640 à 828 px pour des logos rendus sous 90.
          sizes={`${Math.ceil((logo.largeur / logo.hauteur) * hauteur)}px`}
          // Un vecteur n'a rien à gagner à passer par l'optimiseur, qui le
          // refuserait de toute façon sans autorisation explicite.
          unoptimized={estVectoriel(logo.url)}
          className="w-auto object-contain"
        />
      ) : (
        <Eyebrow uppercase>{marque.nom}</Eyebrow>
      )}
    </li>
  );
}
