import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Card, SectionHead } from "@/components/ui";
import type { BlocDeuxVitesses } from "@/sanity/types";

export function DeuxVitesses({ bloc }: { bloc: BlocDeuxVitesses }) {
  return (
    <section aria-labelledby="vitesses-title" className="mt-section">
      <SectionHead id="vitesses-title" title={bloc.titre} intro={bloc.chapeau} />
      <div className="mt-9 grid gap-4 lg:grid-cols-2">
        {bloc.modes.map((mode, i) => (
          <Reveal key={mode._key} as="article" delay={i * 90}>
            <Card className="h-full">
              <h3 className="text-h3 font-semibold leading-[1.14] tracking-[-0.035em]">
                {mode.nom}
              </h3>
              <p className="mt-3.5 text-body leading-[1.58] text-ink-70">{mode.texte}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 max-w-[70ch] text-fine leading-[1.6] text-ink-55">{bloc.note}</p>
      {bloc.lien ? (
        <p className="mt-4">
          <Link
            href={bloc.lien.chemin}
            className="text-fine font-medium underline underline-offset-4 hover:text-azure"
          >
            {bloc.lien.libelle}
          </Link>
        </p>
      ) : null}
    </section>
  );
}
