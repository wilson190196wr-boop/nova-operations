/**
 * Le mot-symbole KELERIA : un seul mot, un seul poids, une seule couleur.
 *
 * Il était composé en deux morceaux, `kel` et `eria`, que distinguaient le
 * poids puis la couleur. Les deux marques étant tombées, les deux `span`
 * n'avaient plus rien à porter : le mot est redevenu un mot.
 *
 * Il reste du texte et non un tracé SVG : sélectionnable, lisible par un
 * lecteur d'écran, et il suit la police du site sans second chargement.
 */
export function Wordmark({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  return (
    <span
      className={`inline-block whitespace-nowrap font-bold leading-none tracking-[-0.05em] ${
        size === "lg" ? "text-[1.75rem]" : "text-[1.3125rem] sm:text-[1.4375rem]"
      } ${tone === "light" ? "text-white" : "text-navy"}`}
    >
      keleria
    </span>
  );
}
