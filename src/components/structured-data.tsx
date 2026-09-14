import { serialiser } from "@/lib/structured-data";

/**
 * Injecte un graphe JSON-LD. Composant serveur : le balisage doit être présent
 * dans le HTML initial, c'est tout son intérêt.
 */
export function DonneesStructurees({ noeuds }: { noeuds: unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialiser(noeuds) }}
    />
  );
}
