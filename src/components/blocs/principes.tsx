import { Reveal } from "@/components/reveal";
import { Card, SectionHead } from "@/components/ui";
import type { BlocPrincipes } from "@/sanity/types";

export function Principes({ bloc }: { bloc: BlocPrincipes }) {
  return (
    <section aria-labelledby="regles-title" className="mt-section">
      <SectionHead id="regles-title" title={bloc.titre} />
      <div className="rail mt-6 sm:mt-9 sm:grid sm:gap-card lg:grid-cols-2">
        {bloc.principes.map((principe, i) => (
          <Reveal key={principe._key} as="article" delay={(i % 2) * 90}>
            <Card className="h-full">
              <h3 className="text-h3 font-semibold leading-[1.14] tracking-[-0.035em]">
                {principe.titre}
              </h3>
              <p className="mt-3.5 text-body leading-[1.58] text-ink-70">{principe.texte}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
