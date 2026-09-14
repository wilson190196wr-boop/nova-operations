import { Reveal } from "@/components/reveal";
import type { BlocTournant } from "@/sanity/types";

export function Tournant({ bloc }: { bloc: BlocTournant }) {
  return (
    <section
      aria-labelledby="turn-title"
      className="panel-organic bleed mt-section rounded-panel px-gutter py-9 sm:px-[clamp(1.5rem,3vw,2.75rem)] sm:py-[clamp(2rem,4vw,3.5rem)]"
    >
      <Reveal>
        <h2
          id="turn-title"
          className="max-w-[30ch] text-h2 font-semibold leading-[1.02] tracking-[-0.045em]"
          style={{ textWrap: "pretty" }}
        >
          {bloc.titre}
        </h2>
        <div className="mt-8 grid max-w-[66ch] gap-[1.125rem]">
          {bloc.paragraphes.map((paragraphe, i) => (
            <p key={i} className="text-body leading-[1.65] text-ink-70">
              {paragraphe}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
