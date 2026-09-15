"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/logo";
import type { LienNavigation } from "@/sanity/types";

/**
 * Le bloc navy de clôture, arrondi sur ses deux coins supérieurs.
 *
 * Composant client uniquement pour marquer la page courante : c'est la seule
 * information dynamique du pied de page.
 */
export function SiteFooter({
  nom,
  accroche,
  navigation,
}: {
  nom: string;
  accroche: string;
  navigation: LienNavigation[];
}) {
  const pathname = usePathname();

  return (
    <footer className="mt-section bg-navy py-9 text-white sm:rounded-t-panel sm:pb-10 sm:pt-[clamp(2.5rem,4vw,3.25rem)]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-7 px-gutter sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-8">
        <div>
          <Wordmark tone="light" size="lg" />
          <p className="mt-4 max-w-[34ch] text-fine leading-[1.55] text-on-navy">
            {nom} — {accroche}
          </p>
        </div>
        <nav
          aria-label="Navigation de pied de page"
          className="grid grid-cols-2 gap-x-4 gap-y-2 text-fine text-on-navy sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3"
        >
          {navigation.map((item) => (
            <Link
              key={item._key}
              href={item.chemin}
              aria-current={pathname === item.chemin ? "page" : undefined}
              // Les liens ne faisaient que 25 px de haut, trop petits au doigt.
              // La hauteur minimale ne s'applique qu'en dessous de `lg`, où le
              // pied de page se lit au pouce ; sur grand écran la rangée garde
              // sa compacité d'origine.
              className="flex min-h-[44px] items-center transition-colors hover:text-azure-light sm:inline-flex sm:min-h-0 aria-[current=page]:underline aria-[current=page]:decoration-azure aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[5px]"
            >
              {item.libelle}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
