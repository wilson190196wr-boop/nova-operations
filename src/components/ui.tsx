import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/**
 * Les briques partagées de la charte.
 *
 * Chacune correspond à une classe de la maquette : `Container` à `.wrap`,
 * `Eyebrow` à `.eyebrow`, `SectionHead` à `.section-head`, et ainsi de suite.
 * Les pages n'ont donc pas à recopier les mêmes réglages de grille et de
 * typographie, et une correction se fait ici une seule fois.
 *
 * Une note sur les points de rupture : la maquette raisonne en `max-width`
 * (1024 et 640), Tailwind en `min-width` (`lg` à 1024, `sm` à 640). Les
 * bascules tombent donc un pixel plus tôt qu'en maquette, ce qui est
 * imperceptible et évite de redéfinir les seuils du framework.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-[1280px] px-gutter ${className}`}>{children}</div>;
}

/** Surtitre en monospace espacée — le seul emploi de Geist Mono dans la charte. */
export function Eyebrow({
  children,
  uppercase = false,
  className = "",
}: {
  children: ReactNode;
  uppercase?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-mono tracking-[0.1em] text-ink-55 ${
        uppercase ? "uppercase" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Titre de section avec son chapô à droite, sur une grille 7/4.
 *
 * Le chapô s'aligne sur la ligne de base du titre (`items-end`) ; sans cela le
 * déséquilibre de hauteur entre les deux colonnes se voit immédiatement.
 */
export function SectionHead({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <Reveal className="grid gap-[clamp(1.5rem,3vw,2.75rem)] lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-end">
      <div>
        {eyebrow ? <Eyebrow className="mb-4 block">{eyebrow}</Eyebrow> : null}
        <h2
          id={id}
          className="max-w-[26ch] text-h2 font-semibold leading-[1.02] tracking-[-0.045em]"
          style={{ textWrap: "pretty" }}
        >
          {title}
        </h2>
      </div>
      {intro ? <p className="text-body leading-[1.6] text-ink-70">{intro}</p> : null}
    </Reveal>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light";
  size?: "md" | "lg";
  className?: string;
};

/** Bouton en pilule. `light` est la variante posée sur les fonds navy. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-navy text-white hover:bg-[#0b1c3d] hover:text-white"
      : "bg-white text-navy hover:bg-[#eef1f7] hover:text-navy";
  // Hauteurs et rembourrages relevés sur la maquette (`.btn` et `.btn--lg`) :
  // les deux pixels d'écart sur chaque valeur se voyaient à la comparaison.
  const dims = size === "lg" ? "min-h-[52px] px-[28px] text-base" : "min-h-[44px] px-[22px] text-fine";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors ${dims} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

/**
 * Carte de contenu, sur le blanc cassé de la charte.
 *
 * Une variante de surface a été tentée puis retirée : teinter les cartes par
 * section rendait la palette bavarde. Le rythme vient de la structure — carte,
 * ligne à filet, bloc unique à filets internes, bandeau navy — et non de la
 * couleur.
 */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-card bg-paper p-[clamp(1.5rem,2.4vw,1.875rem)] ${className}`}>
      {children}
    </div>
  );
}

/**
 * Le déroulé numéroté, filet en haut de chaque colonne.
 *
 * Le nombre de colonnes suit le nombre d'étapes. La maquette réutilise sa
 * grille de quatre pour les trois étapes de la page Contact, ce qui y laisse
 * une colonne vide ; trois colonnes égales tiennent mieux la page.
 */
export function Steps({ items }: { items: { n: string; title: string; text: string }[] }) {
  const cols = items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol
      className={`mt-section grid gap-0 sm:mt-[calc(var(--section)+0.5rem)] sm:grid-cols-2 sm:gap-[clamp(1.5rem,3vw,2.75rem)] ${cols}`}
    >
      {items.map((item, i) => (
        <Reveal
          key={item.n}
          as="li"
          delay={i * 70}
          // Sur téléphone, le numéro occupe une colonne de gauche et s'étend
          // sur les deux lignes du texte : la lecture reste verticale et chaque
          // étape tient en une bande.
          //
          // Au-delà, l'étape devient un jalon : une pastille azur posée sur le
          // filet et un numéro à 24 px. C'est ce qui distingue cette rangée de
          // celles qui la suivent — sans elle, trois rangées de quatre blocs se
          // succédaient à l'identique.
          className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-t border-line py-5 last:border-b sm:relative sm:block sm:border-b-0 sm:py-0 sm:pt-[1.625rem] sm:before:absolute sm:before:left-0 sm:before:top-[-5px] sm:before:h-[9px] sm:before:w-[9px] sm:before:rounded-full sm:before:bg-azure sm:before:content-['']"
        >
          <p className="row-span-2 pt-[0.3rem] font-mono text-mono tracking-[0.06em] text-azure sm:mt-3 sm:pt-0 sm:text-2xl sm:leading-[1.6] sm:tracking-[0.02em]">
            <span className="sm:hidden">{item.n}</span>
            <span className="max-sm:hidden">[ {item.n} ]</span>
          </p>
          <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.03em] sm:mt-3.5 sm:text-[1.4375rem] sm:leading-[1.16]">
            {item.title}
          </h3>
          <p className="mt-1.5 text-fine leading-[1.55] text-ink-70 sm:mt-3 sm:leading-[1.56]">{item.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Rangée de chiffres clés, filet en haut de chaque colonne. */
export function Facts({
  items,
  className = "",
}: {
  items: { label: string; value: ReactNode }[];
  className?: string;
}) {
  const cols = items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <dl className={`mt-10 grid gap-[clamp(1rem,2.4vw,2rem)] sm:grid-cols-2 ${cols} ${className}`}>
      {items.map((item) => (
        <div key={item.label} className="border-t border-line pt-[1.125rem]">
          <dt>
            <Eyebrow uppercase>{item.label}</Eyebrow>
          </dt>
          <dd className="mt-2 text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.035em]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** En-tête des pages intérieures. */
export function PageHead({
  eyebrow,
  title,
  lead,
  children,
  id = "page-title",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <Container className="pt-[clamp(2.25rem,4.5vw,3.25rem)]">
      <Reveal>
        {eyebrow ? <Eyebrow className="mb-4 block">{eyebrow}</Eyebrow> : null}
        <h1
          id={id}
          className="max-w-[24ch] text-page font-semibold leading-none tracking-[-0.05em] max-sm:max-w-none"
          style={{ textWrap: "pretty" }}
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-[62ch] text-lead leading-[1.55] text-ink-70">{lead}</p>
        ) : null}
      </Reveal>
      {children}
    </Container>
  );
}

/**
 * Le bandeau de clôture, présent à l'identique sur trois pages.
 *
 * Seul le titre change d'une page à l'autre ; le texte, le libellé du bouton
 * et la note sont les mêmes partout, donc ils portent une valeur par défaut
 * plutôt qu'une recopie par page.
 */
export function Closing({
  title,
  text = "Quarante-cinq minutes pour décrire votre organisation et savoir s'il y a matière. Si aucune mission ne se justifie, je vous le dirai aussi.",
  cta = "Choisir un créneau",
  note = "Visio ou téléphone, sans engagement",
  id = "closing-title",
}: {
  title: ReactNode;
  text?: ReactNode;
  cta?: string;
  note?: string;
  id?: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className="closing-organic bleed mt-section rounded-panel px-gutter py-10 text-white sm:px-[clamp(1.5rem,3vw,2.75rem)] sm:py-[clamp(2.25rem,4.5vw,3.25rem)]"
    >
      <Reveal className="grid gap-[clamp(1.75rem,3.5vw,3rem)] lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <h2 id={id} className="text-h2-sm font-semibold leading-[1.05] tracking-[-0.045em]">
            {title}
          </h2>
          <p className="mt-4 text-lead leading-[1.55] text-on-navy sm:max-w-[44ch]">{text}</p>
        </div>
        {/* Sur téléphone le bouton prend toute la largeur et la note se centre
            sous lui : à cette taille, un appel à l'action calé à gauche dans
            un bandeau pleine largeur se remarque beaucoup moins. */}
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-0 sm:items-start">
          <Button href="/contact" variant="light" size="lg">
            {cta}
          </Button>
          {/* Même collision que l'étiquette des cartes : dans la maquette,
              `.closing p` l'emporte sur `.closing__note` et lui impose le
              corps du chapô. La note s'affiche donc en grand sur bureau, et
              reste petite sur téléphone, où elle est centrée sous le bouton. */}
          <p className="text-center font-mono text-mono tracking-[0.06em] text-white/70 sm:mt-4 sm:text-left sm:text-lead sm:leading-[1.55] sm:text-on-navy">
            {note}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
