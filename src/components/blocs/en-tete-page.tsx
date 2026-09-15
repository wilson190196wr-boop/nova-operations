import { Eyebrow, Facts, PageHead } from "@/components/ui";
import type { BlocEnTetePage, ParametresSite } from "@/sanity/types";

export function EnTetePage({
  bloc,
  parametres,
}: {
  bloc: BlocEnTetePage;
  parametres: ParametresSite;
}) {
  return (
    <PageHead
      eyebrow={bloc.surtitre ?? undefined}
      title={bloc.titre}
      lead={bloc.chapeau ?? undefined}
    >
      {bloc.faits.length ? (
        <Facts items={bloc.faits.map((fait) => ({ label: fait.libelle, value: fait.valeur }))} />
      ) : null}
      {bloc.afficherCoordonnees ? <Coordonnees parametres={parametres} /> : null}
    </PageHead>
  );
}

/**
 * Les coordonnées, en une seule ligne compacte sur une carte claire.
 *
 * Elles occupaient auparavant trois colonnes coiffées d'un filet — le même
 * traitement que la rangée des étapes qui suit immédiatement, ce qui donnait
 * deux bandeaux jumeaux et rendait la hiérarchie illisible. Ramenées sur une
 * carte, elles se lisent comme un encart de contact et non comme une section.
 *
 * Les valeurs viennent des réglages du site et non de cette page : la même
 * adresse et le même numéro servent au pied de page, aux mentions légales et à
 * la réception du formulaire. Une seconde saisie finirait par diverger.
 */
function Coordonnees({ parametres }: { parametres: ParametresSite }) {
  const lignes = [
    {
      libelle: parametres.coordonnees.libelleEmail,
      valeur: parametres.email,
      href: `mailto:${parametres.email}`,
    },
    // `tel:` n'accepte ni espace ni signe de ponctuation : le numéro affiché
    // reste lisible, celui composé est nettoyé.
    {
      libelle: parametres.coordonnees.libelleTelephone,
      valeur: parametres.telephone,
      href: `tel:${parametres.telephone.replace(/\s/g, "")}`,
    },
    { libelle: parametres.coordonnees.libelleVille, valeur: parametres.ville, href: null },
  ];

  return (
    <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 rounded-tier bg-paper px-5 py-4 sm:mt-9 sm:inline-flex sm:flex-wrap sm:gap-x-10 sm:px-6 sm:py-5">
      {lignes.map((ligne) => (
        <div key={ligne.libelle} className="flex flex-col gap-1">
          <dt>
            <Eyebrow uppercase>{ligne.libelle}</Eyebrow>
          </dt>
          <dd className="text-[1.0625rem] font-medium leading-none">
            {/* Padding vertical compensé par une marge négative : la zone
                tappable passe de 22 à 45 px sans déplacer le texte d'un pixel.
                3.5 et non 3, parce que `leading-none` réduit la boîte de ligne
                à 17 px — 24 px de padding ne suffisaient pas à atteindre 44. */}
            {ligne.href ? (
              <a href={ligne.href} className="-my-3.5 inline-block py-3.5">
                {ligne.valeur}
              </a>
            ) : (
              ligne.valeur
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
