import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionHead } from "@/components/ui";
import { CHEMIN_OFFRES } from "@/sanity/routes";
import type { BlocComparaison } from "@/sanity/types";

/**
 * Le tableau « quelle offre pour quelle situation ».
 *
 * Chaque ligne porte l'ancre de l'offre qu'elle nomme : le tableau servait de
 * conclusion sans sortie, le lecteur devait remonter chercher le bloc. Le nom
 * affiché et l'ancre viennent tous deux de l'offre référencée — il n'y a donc
 * aucun moyen de nommer une offre et de pointer vers une autre.
 */
export function Comparaison({ bloc }: { bloc: BlocComparaison }) {
  const enTetes = [bloc.enTetes.situation, bloc.enTetes.offre, bloc.enTetes.resultat];

  return (
    <section aria-labelledby="quelle-title" className="mt-section">
      <SectionHead id="quelle-title" title={bloc.titre} intro={bloc.chapeau} />

      {/* Trois colonnes ne tiennent pas sur un écran de téléphone : le tableau
          demandait 620 px et défilait horizontalement. Sous `lg`, les mêmes
          lignes sont donc empilées en blocs étiquetés — une seule source de
          données, deux présentations, et plus aucun défilement latéral. */}
      <Reveal className="mt-9 grid gap-3 lg:hidden">
        {bloc.lignes.map((ligne) => (
          <div key={ligne._key} className="rounded-card bg-paper p-5">
            <p className="text-fine leading-[1.5]">{ligne.situation}</p>
            <dl className="mt-4 grid gap-3 border-t border-line-soft pt-4">
              <div>
                <dt>
                  <Eyebrow uppercase>{bloc.enTetes.offre}</Eyebrow>
                </dt>
                <dd className="mt-1 text-fine font-semibold">
                  {ligne.offre ? (
                    <Link
                      href={`${CHEMIN_OFFRES}#${ligne.offre.ancre}`}
                      className="underline underline-offset-4 hover:text-azure"
                    >
                      {ligne.offre.nom}
                    </Link>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt>
                  <Eyebrow uppercase>{bloc.enTetes.resultat}</Eyebrow>
                </dt>
                <dd className="mt-1 text-fine leading-[1.5] text-ink-70">{ligne.resultat}</dd>
              </div>
            </dl>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-9 hidden rounded-card bg-paper lg:block">
        <table className="w-full border-collapse text-fine">
          <thead>
            <tr>
              {enTetes.map((entete) => (
                <th
                  key={entete}
                  scope="col"
                  className="whitespace-nowrap border-b border-line-soft px-5 py-[1.125rem] text-left font-mono text-mono font-normal uppercase tracking-[0.08em] text-ink-55"
                >
                  {entete}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloc.lignes.map((ligne, i) => (
              <tr key={ligne._key}>
                <th
                  scope="row"
                  className={`px-5 py-[1.125rem] text-left align-top font-normal leading-[1.5] ${
                    i === bloc.lignes.length - 1 ? "" : "border-b border-line-soft"
                  }`}
                >
                  {ligne.situation}
                </th>
                <td
                  className={`whitespace-nowrap px-5 py-[1.125rem] align-top font-semibold leading-[1.5] ${
                    i === bloc.lignes.length - 1 ? "" : "border-b border-line-soft"
                  }`}
                >
                  {ligne.offre ? (
                    <Link
                      href={`${CHEMIN_OFFRES}#${ligne.offre.ancre}`}
                      className="underline underline-offset-4 hover:text-azure"
                    >
                      {ligne.offre.nom}
                    </Link>
                  ) : null}
                </td>
                <td
                  className={`px-5 py-[1.125rem] align-top leading-[1.5] ${
                    i === bloc.lignes.length - 1 ? "" : "border-b border-line-soft"
                  }`}
                >
                  {ligne.resultat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
