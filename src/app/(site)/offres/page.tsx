import type { Metadata } from "next";
import { Sections } from "@/components/blocs/registre";
import { DonneesStructurees } from "@/components/structured-data";
import { metadonnees } from "@/lib/seo";
import { grapheOffres } from "@/lib/structured-data";
import { lireOffresPubliees, lirePage, lireParametres } from "@/sanity/lire";

const ROUTE = "/offres";

export function generateMetadata(): Promise<Metadata> {
  return metadonnees(ROUTE);
}

export default async function Offres() {
  const [page, parametres, offres] = await Promise.all([
    lirePage(ROUTE),
    lireParametres(),
    lireOffresPubliees(),
  ]);

  return (
    <>
      <DonneesStructurees noeuds={grapheOffres(offres)} />
      <Sections blocs={page.blocs} parametres={parametres} />
    </>
  );
}
