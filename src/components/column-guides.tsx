/**
 * Filets de colonnes affichés en fond.
 *
 * Ce ne sont pas des lignes décoratives : ce sont les douze colonnes réelles
 * sur lesquelles chaque section est composée, avec la même largeur maximale,
 * les mêmes marges et la même gouttière. Le fond montre donc la structure.
 *
 * Posé une seule fois derrière `main`, qui isole son contexte d'empilement :
 * sans `isolate` et `-z-10`, un élément positionné se peindrait au-dessus des
 * sections statiques et les filets traverseraient les bandes bleu nuit.
 *
 * Les sections claires n'ont pas de fond, les filets les traversent ; les
 * sections bleu nuit sont opaques et les masquent.
 *
 * Masqué en dessous de 1024 px, où la grille de douze colonnes ne s'applique
 * plus.
 */
export function ColumnGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      <div className="mx-auto grid h-full w-full max-w-[1440px] grid-cols-12 gap-6 px-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-l border-line/70 last:border-r" />
        ))}
      </div>
    </div>
  );
}
