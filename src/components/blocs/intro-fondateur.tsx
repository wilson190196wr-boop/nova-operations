import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Facts } from "@/components/ui";
import type { BlocIntroFondateur } from "@/sanity/types";

export function IntroFondateur({ bloc }: { bloc: BlocIntroFondateur }) {
  const portrait = bloc.portrait;

  return (
    <section
      aria-labelledby="a-propos-title"
      className="grid gap-[clamp(1.75rem,3.5vw,3rem)] pt-[clamp(2rem,4vw,3rem)] lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start"
    >
      <Reveal>
        <figure className="aspect-[4/5] overflow-hidden rounded-panel bg-clay max-lg:max-w-[360px]">
          {portrait.url && portrait.largeur && portrait.hauteur ? (
            <Image
              src={portrait.url}
              alt={portrait.alt}
              width={portrait.largeur}
              height={portrait.hauteur}
              priority
              // Pas de `placeholder="blur"`, bien que Sanity fournisse la
              // vignette : le site n'avait pas cette apparition en fondu, et
              // l'ajouter serait un changement d'animation, pas une migration.
              // La vignette reste projetée par la requête (`lqip`) : l'activer
              // tient en deux lignes le jour où ce sera une décision prise.
              // Sans `sizes`, le navigateur suppose la pleine largeur de la
              // fenêtre et téléchargeait la variante 1920 pour une figure qui
              // n'en occupe que 335 sur téléphone. Les paliers suivent la
              // figure : plafonnée à 360 px sous 1024, puis colonne 4/11.
              sizes="(max-width: 399px) calc(100vw - 40px), (max-width: 1023px) 360px, (max-width: 1279px) 34vw, 412px"
              className="h-full w-full object-cover"
            />
          ) : null}
        </figure>
        <p className="mt-5">
          <strong className="block text-[1.1875rem] font-semibold tracking-[-0.025em]">
            {bloc.nom}
          </strong>
          <span className="mt-1 block text-fine text-ink-55">{bloc.role}</span>
        </p>
      </Reveal>

      <Reveal delay={100}>
        {/* Le H1 nomme la personne. La citation le suivait en titre : hors
            contexte — résultat de recherche, partage, lecteur d'écran — elle
            ne disait ni qui parle ni de quoi traite la page. */}
        <h1
          id="a-propos-title"
          className="text-[clamp(1.875rem,3.6vw,2.875rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
          style={{ textWrap: "pretty" }}
        >
          {bloc.titre}
        </h1>
        <p className="mt-5 max-w-[46ch] text-lead font-medium leading-[1.4] text-ink">
          {bloc.citation}
        </p>
        <p className="mt-6 max-w-[60ch] text-lead leading-[1.55] text-ink-70">{bloc.presentation}</p>
        <Facts items={bloc.faits.map((fait) => ({ label: fait.libelle, value: fait.valeur }))} />
      </Reveal>
    </section>
  );
}
