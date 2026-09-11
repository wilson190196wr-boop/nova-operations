/**
 * Configuration de la prise de rendez-vous Cal.com.
 *
 * Le lien réel est la valeur par défaut : ce n'est pas un secret, et le coder
 * ici évite l'oubli classique — une variable `NEXT_PUBLIC_` est figée dans le
 * bundle au moment de la compilation, donc l'oublier sur l'hébergeur casse la
 * prise de rendez-vous sans erreur visible.
 *
 * NEXT_PUBLIC_CAL_LINK reste disponible pour pointer un autre type
 * d'événement, par exemple sur un environnement de test.
 *
 * Une variable déclarée mais laissée vide vaut ici « non renseignée » : `??` ne
 * rattrape que `undefined`, et une chaîne vide traversait jusqu'à l'embed, qui
 * lève « calLink is required » — au build, pas à l'exécution. Un hébergeur où
 * l'on crée la variable avant d'en connaître la valeur cassait donc le
 * déploiement entier.
 */
export const calLink = process.env.NEXT_PUBLIC_CAL_LINK?.trim() || "wilson-rault-vclkvp/45min";

/** Namespace de l'embed : isole cette instance si plusieurs embeds cohabitent. */
export const calNamespace = "diagnostic";

/** Couleur de marque appliquée à l'intérieur de l'iframe Cal.com. */
export const calBrandColor = "#2f5cff";
