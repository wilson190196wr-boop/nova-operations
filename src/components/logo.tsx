/**
 * Le mot-symbole KELERIA — variante retenue dans la maquette : une coupe en
 * deux poids, `kel` en gras et `eria` en régulier, bas de casse.
 *
 * Le mot est découpé en deux `span` et non dessiné en SVG : il reste ainsi du
 * texte sélectionnable, lisible par un lecteur d'écran, et il suit la police
 * du site sans second chargement.
 */
export function Wordmark({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "md" | "lg";
}) {
  const light = tone === "light";
  return (
    <span
      className={`inline-block whitespace-nowrap leading-none tracking-[-0.05em] ${
        size === "lg" ? "text-[1.75rem]" : "text-[1.3125rem] sm:text-[1.4375rem]"
      } ${light ? "text-white" : "text-navy"}`}
    >
      <span className="font-bold">kel</span>
      <span className={`font-normal ${light ? "text-[#8f9bb5]" : "text-ink-70"}`}>eria</span>
    </span>
  );
}
