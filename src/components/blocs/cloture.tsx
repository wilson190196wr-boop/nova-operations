import { Closing } from "@/components/ui";
import type { BlocCloture, ParametresSite } from "@/sanity/types";

/**
 * Le bandeau de clôture, présent à l'identique sur quatre pages.
 *
 * Seul le titre change ; le texte, le libellé du bouton et la note viennent des
 * réglages du site. Les recopier page par page aurait produit, au premier
 * changement, quatre versions légèrement différentes de la même phrase.
 */
export function Cloture({
  bloc,
  parametres,
}: {
  bloc: BlocCloture;
  parametres: ParametresSite;
}) {
  return (
    <Closing
      title={bloc.titre}
      text={parametres.cloture.texte}
      cta={parametres.cloture.libelleBouton}
      note={parametres.cloture.note}
    />
  );
}
