import type { Metadata } from "next";
import { Sections } from "@/components/blocs/registre";
import { DonneesStructurees } from "@/components/structured-data";
import { metadonnees } from "@/lib/seo";
import { grapheAccueil } from "@/lib/structured-data";
import { lirePage, lireParametres } from "@/sanity/lire";

const ROUTE = "/";

export function generateMetadata(): Promise<Metadata> {
  return metadonnees(ROUTE);
}

export default async function Accueil() {
  const [page, parametres] = await Promise.all([lirePage(ROUTE), lireParametres()]);

  return (
    <>
      <DonneesStructurees noeuds={grapheAccueil(parametres)} />
      <Sections blocs={page.blocs} parametres={parametres} />
    </>
  );
}
