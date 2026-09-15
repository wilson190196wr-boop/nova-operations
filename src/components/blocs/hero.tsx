import { Container } from "@/components/ui";
import type { BlocHero } from "@/sanity/types";

/**
 * Le titre d'accueil.
 *
 * Une ligne par entrée : le découpage reste éditorial plutôt que laissé au
 * navigateur — c'est la composition voulue, et non le hasard de la largeur
 * disponible.
 *
 * L'espace ajouté en fin de ligne est textuel, pas décoratif : sans lui,
 * `textContent` recolle les blocs en « Votre partenaireIA et
 * développementapplicatif », ce que lisent les robots d'indexation et les
 * lecteurs d'écran. Il se réduit visuellement à rien, les spans étant en
 * `block`. C'est pour cette raison que la logique reste ici et ne remonte pas
 * dans le CMS : personne ne doit avoir à saisir un espace invisible.
 */
export function Hero({ bloc }: { bloc: BlocHero }) {
  return (
    <Container className="pt-7 sm:pt-[clamp(2.5rem,5vw,3.5rem)]">
      <h1
        className="text-display font-semibold leading-none tracking-[-0.045em] sm:max-w-[22ch] sm:leading-[0.98]"
        style={{ textWrap: "pretty" }}
      >
        {bloc.lignes.map((ligne, i) => (
          <span key={i} className="rise block" style={{ animationDelay: `${i * 70}ms` }}>
            {ligne}
            {i < bloc.lignes.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <p className="mt-5 text-lead leading-[1.55] text-ink-70 sm:mt-[1.625rem] sm:max-w-[46ch]">
        {bloc.chapeau}
      </p>
    </Container>
  );
}
