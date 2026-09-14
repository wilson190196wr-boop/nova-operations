import type { Metadata } from "next";
import { Sections } from "@/components/blocs/registre";
import { metadonnees } from "@/lib/seo";
import { lirePage, lireParametres } from "@/sanity/lire";

const ROUTE = "/contact";

export function generateMetadata(): Promise<Metadata> {
  return metadonnees(ROUTE);
}

export default async function Contact() {
  const [page, parametres] = await Promise.all([lirePage(ROUTE), lireParametres()]);

  return <Sections blocs={page.blocs} parametres={parametres} />;
}
