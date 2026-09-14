import { Steps } from "@/components/ui";
import type { BlocEtapes } from "@/sanity/types";

/**
 * Le déroulé numéroté.
 *
 * Le titre masqué n'est pas décoratif : quand la rangée suit directement le
 * titre de la page, ses sous-titres sont des H3 qui viendraient après un H1
 * sans H2 intermédiaire. Le titre rétablit la hiérarchie du document sans rien
 * ajouter à l'écran. Laissé vide, la rangée est rendue nue, exactement comme
 * sur l'accueil.
 */
export function Etapes({ bloc }: { bloc: BlocEtapes }) {
  const items = bloc.etapes.map((etape) => ({
    n: etape.numero,
    title: etape.titre,
    text: etape.texte,
  }));

  if (!bloc.titreMasque) return <Steps items={items} />;

  return (
    <section aria-labelledby="echange-title">
      <h2 id="echange-title" className="sr-only">
        {bloc.titreMasque}
      </h2>
      <Steps items={items} />
    </section>
  );
}
