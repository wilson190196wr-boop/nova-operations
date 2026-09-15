import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui";
import { CHEMIN_OFFRES } from "@/sanity/routes";
import type { BlocApercuOffres, Offre } from "@/sanity/types";

export function ApercuOffres({ bloc }: { bloc: BlocApercuOffres }) {
  return (
    <section aria-labelledby="offres-title" className="mt-section">
      <SectionHead id="offres-title" title={bloc.titre} intro={bloc.chapeau} />
      {/* Deux colonnes et non quatre : les cartes deviennent assez larges pour
          que leur texte se lise en pleine phrase, et la rangée cesse de répéter
          la forme du déroulé qui la précède. */}
      <div className="rail mt-7 sm:grid sm:grid-cols-2 sm:gap-card">
        {bloc.offres.map((offre, i) => (
          <Reveal key={offre.id} as="article" delay={i * 70}>
            <CarteOffre offre={offre} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CarteOffre({ offre }: { offre: Offre }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-paper p-6 sm:p-[clamp(1.75rem,2.6vw,2.25rem)]">
      {/* `sm:leading-[1.2]` répète l'interligne posé juste avant : `sm:text-2xl`
          embarque le sien, et un utilitaire préfixé passe après celui qui ne
          l'est pas. Sans cette reprise, la carte grandit de quatre pixels. */}
      <h3 className="text-h4 font-semibold leading-[1.2] tracking-[-0.03em] sm:text-2xl sm:leading-[1.2] sm:tracking-[-0.035em]">
        {offre.nom}
      </h3>
      {/* La colonne de 52 caractères vaut plus que la largeur disponible : sans
          elle, le texte d'une carte de 585 px court sur toute sa laisse. */}
      <p className="mt-2.5 text-fine leading-[1.58] text-ink-70 sm:mt-3.5 sm:max-w-[52ch] sm:text-body">
        {offre.resumeAccueil}
      </p>
      {/* `mt-auto` colle le lien en bas : dans une rangée de cartes inégales,
          les quatre liens restent alignés. */}
      <Link
        href={`${CHEMIN_OFFRES}#${offre.ancre}`}
        className="mt-auto pt-5 text-fine font-medium underline underline-offset-4 hover:text-azure"
      >
        {offre.libelleLienAccueil}
      </Link>
    </div>
  );
}
