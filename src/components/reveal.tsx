"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Enveloppe d'apparition au défilement.
 *
 * Le contenu est visible par défaut, en CSS, sans condition. C'est le point
 * important : la version précédente posait `opacity:0` puis attendait un
 * `IntersectionObserver` pour révéler le bloc. Sans JavaScript — robot
 * d'indexation, script en échec, navigateur restrictif — la page restait
 * lisible dans le HTML mais invisible à l'écran, mentions légales comprises.
 *
 * L'effet devient donc un enrichissement : on n'anime que ce qui se trouve
 * hors de la fenêtre au montage, et par `node.animate`, qui ne laisse aucun
 * style derrière lui. Un bloc déjà à l'écran — titre, appel à l'action — n'est
 * jamais touché et n'attend rien.
 *
 * Tout échec (pas d'`IntersectionObserver`, pas d'API d'animation, exception à
 * l'initialisation) abandonne l'effet et laisse le contenu visible : la
 * dégradation ne peut pas masquer la page.
 */
export function Reveal({ children, className = "", delay = 0, as, id }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Le mouvement réduit est un réglage système : on ne l'anime pas du tout.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined" || typeof node.animate !== "function") return;

    let animation: Animation | null = null;
    let observer: IntersectionObserver | null = null;

    try {
      // Un élément déjà visible au montage est laissé tel quel : l'animer
      // reviendrait à le faire disparaître puis réapparaître sous les yeux du
      // visiteur, ce que l'ancienne version faisait pour le haut de page.
      const rect = node.getBoundingClientRect();
      const dejaVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (dejaVisible) return;

      observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            obs.unobserve(entry.target);
            try {
              animation = (entry.target as HTMLElement).animate(
                [
                  { opacity: 0, transform: "translate3d(0, 24px, 0)" },
                  { opacity: 1, transform: "none" },
                ],
                {
                  duration: 900,
                  delay,
                  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                  // `fill` reste à sa valeur par défaut : aucun style ne
                  // persiste après la fin, donc rien ne peut rester masqué.
                },
              );
            } catch {
              /* l'effet est facultatif */
            }
          }
        },
        // Seuil à 0 : un seuil en pourcentage ne se déclenche jamais sur un
        // bloc plus haut que la fenêtre (embed Cal.com, longs articles…).
        { rootMargin: "0px 0px -80px 0px", threshold: 0 },
      );

      observer.observe(node);
    } catch {
      return;
    }

    return () => {
      observer?.disconnect();
      animation?.cancel();
    };
  }, [delay]);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
