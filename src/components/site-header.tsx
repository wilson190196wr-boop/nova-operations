"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "@/components/logo";
import { CHEMIN_CONTACT } from "@/sanity/routes";
import type { LienNavigation } from "@/sanity/types";

/**
 * La barre de navigation : une pilule posée sur le fond sable, collée en haut
 * au défilement.
 *
 * Le lien de la page courante porte `aria-current="page"`, comme dans la
 * maquette, et c'est cet attribut — pas une classe — qui déclenche le
 * soulignement azur. Un seul état à maintenir au lieu de deux.
 *
 * Ce soulignement tient à une égalité exacte de chemins : c'est pourquoi le
 * schéma valide les adresses de navigation (début par /, pas de slash final).
 * Un chemin approximatif éteindrait le repère sans la moindre erreur visible.
 */
export function SiteHeader({
  nom,
  navigation,
  libelleRendezVous,
}: {
  nom: string;
  navigation: LienNavigation[];
  libelleRendezVous: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  const underline =
    "aria-[current=page]:underline aria-[current=page]:decoration-azure aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[5px]";

  return (
    <header className="sticky top-0 z-20 bg-sand py-2.5 lg:py-3.5">
      <div className="mx-auto w-full max-w-[1280px] px-gutter">
        <div className="flex items-center justify-between gap-3 rounded-full border border-line-soft bg-paper py-2 pl-[18px] pr-2 lg:gap-4 lg:py-2.5 lg:pl-6 lg:pr-3">
          {/* `min-h-[44px]` sur le lien lui-même : sa boîte ne faisait que 26 px
              de haut, soit une cible tactile sous le seuil recommandé. La
              pilule est plus haute que cela, le rendu ne change pas. */}
          <Link
            href="/"
            aria-label={`${nom}, retour à l'accueil`}
            className="flex min-h-[44px] items-center"
          >
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-[1.625rem] text-fine text-ink-70 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item._key}
                href={item.chemin}
                aria-current={current(item.chemin)}
                className={underline}
              >
                {item.libelle}
              </Link>
            ))}
          </nav>

          <Link
            href={CHEMIN_CONTACT}
            className="hidden min-h-[44px] items-center justify-center rounded-full bg-navy px-6 text-fine font-medium text-white transition-colors hover:bg-[#0b1c3d] hover:text-white lg:inline-flex"
          >
            {libelleRendezVous}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className="block h-0.5 w-[22px] rounded-sm bg-navy" />
            <span className="block h-0.5 w-[22px] rounded-sm bg-navy" />
            <span className="block h-0.5 w-[22px] rounded-sm bg-navy" />
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Navigation principale"
            className="mt-2 flex flex-col gap-0.5 rounded-card border border-line-soft bg-paper p-2.5 lg:hidden"
          >
            {navigation.map((item) => (
              <Link
                key={item._key}
                href={item.chemin}
                aria-current={current(item.chemin)}
                onClick={() => setOpen(false)}
                className={`flex min-h-[48px] items-center rounded-[14px] px-3 text-[1.0625rem] hover:bg-sand-2 hover:text-navy ${underline}`}
              >
                {item.libelle}
              </Link>
            ))}
            <Link
              href={CHEMIN_CONTACT}
              onClick={() => setOpen(false)}
              className="mt-1.5 flex min-h-[44px] items-center justify-center rounded-full bg-navy px-6 text-fine font-medium text-white hover:bg-[#0b1c3d] hover:text-white"
            >
              {libelleRendezVous}
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
