import { Closing } from "@/components/ui";
import type { BlocCloture, ParametresSite } from "@/sanity/types";

/**
 * Le bandeau de clôture, présent à l'identique sur quatre pages.
 *
 * Le libellé du bouton et la note viennent des réglages du site : identiques
 * partout, les recopier aurait produit, au premier changement, quatre versions
 * légèrement différentes de la même phrase.
 *
 * Le texte suit la même règle par défaut, et n'en sort que si la page en
 * déclare un. Le repli n'est donc pas un cache-misère : c'est la formulation
 * commune, et c'est elle qu'on veut tant que personne n'a écrit mieux.
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
      text={bloc.texte ?? parametres.cloture.texte}
      cta={parametres.cloture.libelleBouton}
      note={parametres.cloture.note}
    />
  );
}
