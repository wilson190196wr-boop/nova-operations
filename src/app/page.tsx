import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import { DonneesStructurees } from "@/components/structured-data";
import { grapheAccueil } from "@/lib/structured-data";
import { Card, Closing, Container, Eyebrow, SectionHead, Steps } from "@/components/ui";
import { alternatives, audiences, brands, heroLines, heroTail, offers, steps } from "@/lib/home";

export default function Home() {
  return (
    <>
      <DonneesStructurees noeuds={grapheAccueil} />
      <Hero />
      <BrandBand />
      <Container>
        <Situation />
        <Steps items={steps} />
        <Offers />
        <Alternatives />
        <Closing title="Quarante-cinq minutes." />
      </Container>
    </>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <Container className="pt-7 sm:pt-[clamp(2.5rem,5vw,3.5rem)]">
      <h1
        className="text-display font-semibold leading-none tracking-[-0.045em] sm:max-w-[22ch] sm:leading-[0.98]"
        style={{ textWrap: "pretty" }}
      >
        {/* L'espace en fin de ligne est textuel, pas décoratif : sans lui,
            `textContent` recolle les trois blocs en « Votre partenaireIA et
            développementapplicatif ». Il se réduit visuellement à rien, les
            spans étant en `block`. */}
        {heroLines.map((line, i) => (
          <span key={line} className="rise block" style={{ animationDelay: `${i * 70}ms` }}>
            {line}
            {i < heroLines.length - 1 ? " " : ""}
          </span>
        ))}
      </h1>
      <p className="mt-5 text-lead leading-[1.55] text-ink-70 sm:mt-[1.625rem] sm:max-w-[46ch]">{heroTail}</p>
    </Container>
  );
}

/* ------------------------------------------------------------ Brand band */

/**
 * Les marques, en grille sur grand écran et en bandeau défilant en dessous.
 *
 * Cinq logos ne se répartissent pas dans une grille de deux ou trois colonnes :
 * il reste toujours une cellule orpheline. Le bandeau supprime la question —
 * le nombre de marques n'a plus d'incidence sur la mise en page.
 *
 * La grille de cinq est conservée à partir de `lg`, où les cinq cellules
 * tombent juste et où la charte la prévoit ainsi.
 */
function BrandBand() {
  return (
    <div className="mt-8 sm:mt-section">
      <Container className="max-lg:hidden">
        <ul aria-label="Références" className="grid grid-cols-5 gap-3">
          {brands.map((brand) => (
            <BrandCell key={brand.name} brand={brand} />
          ))}
        </ul>
      </Container>

      {/* Pleine largeur, hors du conteneur : un bandeau qui s'arrête aux
          gouttières se lit comme une liste tronquée, pas comme un défilé. */}
      <div className="mask-fade-x overflow-hidden lg:hidden">
        <ul aria-label="Références" className="marquee-track flex w-max gap-3">
          {/* Deux copies : la première est lue par les lecteurs d'écran, la
              seconde n'existe que pour boucler sans raccord. */}
          {[...brands, ...brands].map((brand, i) => (
            <BrandCell
              key={`${brand.name}-${i}`}
              brand={brand}
              aria-hidden={i >= brands.length}
              fixedWidth
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function BrandCell({
  brand,
  fixedWidth = false,
  ...rest
}: {
  brand: (typeof brands)[number];
  fixedWidth?: boolean;
  "aria-hidden"?: boolean;
}) {
  return (
    <li
      {...rest}
      className={`flex min-h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-paper px-[18px] text-center sm:min-h-[76px] sm:whitespace-normal sm:rounded-[20px] sm:py-3 ${
        fixedWidth ? "w-[168px] shrink-0" : ""
      }`}
    >
      {brand.logo ? (
        <Image
          src={brand.logo.src}
          alt={brand.name}
          width={brand.logo.width}
          height={brand.logo.height}
          // Le plafond de 30 px vient de la charte ; `scale` corrige ensuite
          // les marges internes propres à chaque logo.
          style={{ maxHeight: `${30 * (brand.logo.scale ?? 1)}px` }}
          // La largeur affichée se déduit du ratio intrinsèque et de cette
          // hauteur plafonnée — environ 83 px pour Colas, 86 pour ORTEC. Sans
          // elle, le navigateur choisissait des variantes de 640 à 828 px
          // pour des logos rendus sous 90.
          sizes={`${Math.ceil((brand.logo.width / brand.logo.height) * 30 * (brand.logo.scale ?? 1))}px`}
          className="w-auto object-contain"
        />
      ) : (
        <Eyebrow uppercase>{brand.name}</Eyebrow>
      )}
    </li>
  );
}

/* ------------------------------------------------------------- Situation */

function Situation() {
  return (
    <section
      aria-labelledby="situations-title"
      className="panel-organic bleed mt-section rounded-panel px-gutter py-9 sm:px-[clamp(1.5rem,3vw,2.75rem)] sm:py-[clamp(2rem,4vw,3.5rem)]"
    >
      <Reveal>
        <h2
          id="situations-title"
          className="max-w-[30ch] text-h2 font-semibold leading-[1.02] tracking-[-0.045em] sm:leading-[1.03]"
          style={{ textWrap: "pretty" }}
        >
          Deux situations, la même absence d&apos;interlocuteur.
        </h2>
      </Reveal>

      <div className="rail mt-7 sm:grid sm:gap-card lg:grid-cols-2">
        {audiences.map((audience, i) => (
          <Reveal key={audience.who} delay={i * 90}>
            <Card className="h-full">
              {/* Sur grand écran, cette ligne n'est pas la petite étiquette azur
                  qu'annonce son nom : dans la maquette, la règle `.card p` qui
                  la suit est plus spécifique que `.card__over` et lui reprend
                  sa taille et sa couleur. Seules la graisse monospace et la
                  capitale survivent. C'est le rendu validé — reproduit tel
                  quel, borné au bureau pour ne pas toucher au téléphone. */}
              <p className="font-mono text-mono uppercase tracking-[0.08em] text-azure sm:mt-3 sm:text-body sm:leading-[1.58] sm:text-ink-70">
                {audience.who}
              </p>
              <h3
                className="mt-3.5 text-h3 font-semibold leading-[1.14] tracking-[-0.035em] sm:mt-3 sm:leading-[1.16]"
                style={{ textWrap: "pretty" }}
              >
                {audience.headline}
              </h3>
              <p className="mt-3.5 text-body leading-[1.58] text-ink-70 sm:mt-3">{audience.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Offers */

function Offers() {
  return (
    <section aria-labelledby="offres-title" className="mt-section">
      <SectionHead
        id="offres-title"
        title="Quatre façons de travailler ensemble"
        intro="L'audit qualifie, le sprint prouve, l'accompagnement tient dans la durée. On ne les pose jamais toutes sur la table au premier rendez-vous."
      />
      {/* Deux colonnes et non quatre : les cartes deviennent assez larges pour
          que leur texte se lise en pleine phrase, et la rangée cesse de répéter
          la forme du déroulé qui la précède. */}
      <div className="rail mt-7 sm:grid sm:grid-cols-2 sm:gap-card">
        {offers.map((offer, i) => (
          <Reveal key={offer.name} as="article" delay={i * 70}>
            <OfferCard offer={offer} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OfferCard({ offer }: { offer: (typeof offers)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-card bg-paper p-6 sm:p-[clamp(1.75rem,2.6vw,2.25rem)]">
      {/* `sm:leading-[1.2]` répète l'interligne posé juste avant : `sm:text-2xl`
          embarque le sien, et un utilitaire préfixé passe après celui qui ne
          l'est pas. Sans cette reprise, la carte grandit de quatre pixels. */}
      <h3 className="text-h4 font-semibold leading-[1.2] tracking-[-0.03em] sm:text-2xl sm:leading-[1.2] sm:tracking-[-0.035em]">
        {offer.name}
      </h3>
      {/* La colonne de 52 caractères vaut plus que la largeur disponible : sans
          elle, le texte d'une carte de 585 px court sur toute sa laisse. */}
      <p className="mt-2.5 text-fine leading-[1.58] text-ink-70 sm:mt-3.5 sm:max-w-[52ch] sm:text-body">
        {offer.text}
      </p>
      {/* `mt-auto` colle le lien en bas : dans une rangée de cartes inégales,
          les quatre liens restent alignés. */}
      <Link
        href={offer.href}
        className="mt-auto pt-5 text-fine font-medium underline underline-offset-4 hover:text-azure"
      >
        {offer.lien}
      </Link>
    </div>
  );
}

/* ---------------------------------------------------------- Alternatives */

/**
 * « Ce que vous avez déjà essayé » — un registre, pas une rangée de cartes.
 *
 * Les trois premières alternatives sont des lignes séparées par un filet ; la
 * quatrième, « Ne rien faire », se détache en carte navy. Le contraste entre
 * les deux registres porte tout l'argument : les trois options courantes
 * s'alignent comme un constat, le vrai concurrent seul prend une surface.
 *
 * Le registre vaut à toutes les largeurs. Sur grand écran il se pose sur une
 * bande argile, seul aplat coloré de la page : c'est lui qui sépare cette
 * section des deux rangées de cartes qui la précèdent.
 *
 * `--band-pad` est déclarée ici plutôt que recopiée dans les classes parce que
 * deux règles doivent en donner exactement la même valeur : le rembourrage de
 * la bande, et la marge négative par laquelle « Ne rien faire » la déborde. Ce
 * débordement est ce qui fait tomber ses deux colonnes sur celles des lignes
 * du dessus ; une valeur approchée se verrait.
 *
 * L'argile ne reçoit que de l'encre. L'azur y tombe à 3,86:1, sous le seuil de
 * 4,5:1 — le bleu clair du titre de « Ne rien faire » reste donc sur le navy.
 */
function Alternatives() {
  return (
    <section
      aria-labelledby="essaye-title"
      style={{ "--band-pad": "clamp(1.75rem,3vw,2.75rem)" } as CSSProperties}
      className="mt-section sm:rounded-panel sm:bg-clay sm:px-[var(--band-pad)] sm:py-[clamp(2.25rem,3.6vw,3rem)]"
    >
      <SectionHead id="essaye-title" title="Ce que vous avez déjà essayé" />
      <div className="mt-7 grid sm:mt-8">
        {alternatives.map((row, i) => (
          <Reveal
            key={row.name}
            as="article"
            delay={i * 70}
            className={`sm:grid sm:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] sm:items-baseline sm:gap-[clamp(1.5rem,3vw,2.5rem)] ${
              row.highlight
                ? "mt-5 rounded-card bg-navy p-6 text-white sm:mx-[calc(var(--band-pad)*-1)] sm:px-[var(--band-pad)] sm:py-[clamp(1.5rem,2.4vw,1.875rem)]"
                : "border-t border-line py-5 sm:border-[rgba(8,9,12,0.16)] sm:py-6"
            }`}
          >
            <h3
              className={`text-[1.125rem] font-semibold leading-[1.25] tracking-[-0.025em] sm:text-[1.3125rem] sm:tracking-[-0.03em] ${
                row.highlight ? "text-azure-light" : ""
              }`}
            >
              {row.name}
            </h3>
            <p
              className={`mt-2 text-fine leading-[1.58] sm:mt-0 sm:max-w-[64ch] sm:text-body ${
                row.highlight ? "text-on-navy" : "text-ink-70 sm:text-[#4a4034]"
              }`}
            >
              {row.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
