import { Reveal } from "@/components/reveal";
import { Button, Eyebrow } from "@/components/ui";
import { CHEMIN_CONTACT } from "@/sanity/routes";
import type { BlocOffresDetaillees, Offre } from "@/sanity/types";

/**
 * Les paliers d'offre, rendus en fragment et non dans un conteneur.
 *
 * C'est volontaire : `first:mt-section` s'applique au premier enfant de son
 * parent. Une enveloppe supplémentaire déplacerait la règle d'un cran et
 * changerait la marge haute de la première offre sur téléphone.
 */
export function OffresDetaillees({ bloc }: { bloc: BlocOffresDetaillees }) {
  return (
    <>
      {bloc.offres.map((offre, i) => (
        <BlocOffre key={offre.id} offre={offre} rang={i} />
      ))}
    </>
  );
}

/**
 * Un palier d'offre.
 *
 * Sur téléphone les blocs se suivent en bandes pleine largeur qui alternent
 * blanc cassé et sable : sans marge entre eux, c'est le changement de fond qui
 * marque la séparation, et la page se lit comme une succession de registres
 * plutôt que comme des cartes identiques. Au-delà, chaque bloc redevient un
 * panneau arrondi détaché du fond.
 */
function BlocOffre({ offre, rang }: { offre: Offre; rang: number }) {
  const pair = rang % 2 === 1;
  return (
    <section
      aria-labelledby={offre.ancre}
      className={`bleed border-t border-line-soft px-gutter py-9 first:mt-section sm:mt-section sm:rounded-panel sm:border-0 sm:bg-paper sm:p-[clamp(1.75rem,3.2vw,3rem)] ${
        pair ? "bg-sand-2" : "bg-paper"
      }`}
    >
      <Reveal>
        <p className="font-mono text-mono tracking-[0.12em] text-azure">[ {offre.numero} ]</p>
        <h2
          id={offre.ancre}
          className="ancre-section mt-2.5 text-h2-sm font-semibold leading-[1.05] tracking-[-0.045em] sm:mt-3.5"
        >
          {offre.nom}
        </h2>
        <p className="mt-3.5 text-lead font-medium leading-[1.4] sm:mt-4 sm:max-w-[34ch]">
          {offre.accroche}
        </p>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:mt-7 sm:gap-[clamp(1.75rem,3.5vw,3rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
        <Reveal>
          <p className="text-fine leading-[1.6] text-ink-70 sm:max-w-[62ch] sm:text-body">
            {offre.description}
          </p>
          {/* Grille à deux colonnes à toutes les tailles, et non `flex-wrap` :
              en flux, le couple passait à la ligne dès que les valeurs
              s'allongeaient. « Sur devis, à partir de la feuille de route »
              suffisait à empiler les sprints pendant que les trois autres
              offres gardaient leurs deux libellés côte à côte. */}
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:mt-7 sm:gap-7">
            <div>
              <dt>
                <Eyebrow uppercase>Durée</Eyebrow>
              </dt>
              <dd className="mt-1.5 text-[1.0625rem] font-medium">{offre.duree}</dd>
            </div>
            <div>
              <dt>
                <Eyebrow uppercase>Investissement</Eyebrow>
              </dt>
              <dd className="mt-1.5 text-[1.0625rem] font-medium">{offre.prix}</dd>
            </div>
          </dl>
          <Button href={CHEMIN_CONTACT} className="mt-6 w-full sm:mt-7 sm:w-auto">
            {offre.libelleBouton}
          </Button>
        </Reveal>

        <Reveal delay={90}>
          <div className="border-t border-line pt-5 sm:border-0 sm:pt-0">
            <Eyebrow uppercase className="block">
              Ce que vous obtenez
            </Eyebrow>
            <ul className="mt-4 grid gap-[0.6875rem]">
              {offre.livrables.map((item) => (
                <li
                  key={item}
                  className="relative pl-[1.375rem] text-fine leading-[1.55] text-ink-70 before:absolute before:left-0 before:top-[0.55em] before:h-[7px] before:w-[7px] before:rounded-full before:bg-azure before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
            {/* Les livrables listés valent pour l'offre entière ; quand elle a
                des paliers, ce qui est réellement inclus dépend du palier
                retenu. La note l'indique là où la liste pourrait laisser
                croire que tout est compris au premier prix. */}
            {offre.variantes.length ? (
              <p className="mt-4 text-finer leading-[1.55] text-ink-55">
                Le périmètre dépend du format retenu : les encadrés ci-dessous précisent ce qui
                distingue chacun.
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>

      {/* Les paliers en bandeau, sous les deux colonnes, et non dans celle de
          droite. Empilés à droite, ils y concentraient toute la variabilité du
          bloc : la colonne passait de 165 px sans palier à 763 px avec quatre,
          pendant que celle de gauche restait autour de 320. Le bas des deux
          colonnes ne tombait jamais ensemble, et l'écart se lisait comme un
          défaut d'alignement. En bandeau, ils forment une rangée de tarifs —
          ce qu'ils sont — et les deux colonnes reviennent à des hauteurs
          comparables.

          Le nombre de colonnes suit le nombre de paliers, que le schéma limite
          à deux ou quatre : quatre encadrés dans une grille de deux feraient
          deux rangées inégales, deux dans une grille de quatre laisseraient
          deux cellules vides. */}
      {offre.variantes.length ? (
        <Reveal delay={140}>
          <div
            className={`mt-6 grid gap-3 sm:mt-[clamp(1.75rem,3.5vw,3rem)] sm:grid-cols-2 ${
              offre.variantes.length === 4 ? "lg:grid-cols-4" : ""
            }`}
          >
            {offre.variantes.map((variante) => (
              <div
                key={variante._key}
                className={`rounded-tier px-[1.0625rem] py-[0.9375rem] sm:px-5 sm:py-[1.125rem] ${
                  pair ? "bg-paper sm:bg-sand" : "bg-sand"
                }`}
              >
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
                  {variante.nom}
                </h3>
                <p className="mt-1 text-[1.0625rem] font-semibold tracking-[-0.02em] text-azure">
                  {variante.prix}
                </p>
                <p className="mt-2 text-finer leading-[1.5] text-ink-70">{variante.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
