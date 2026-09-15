import { Fragment } from "react";
import { Container } from "@/components/ui";
import type { Bloc, ParametresSite } from "@/sanity/types";
import { Alternatives } from "./alternatives";
import { ApercuOffres } from "./apercu-offres";
import { BandeauMarques } from "./marques";
import { Cloture } from "./cloture";
import { Comparaison } from "./comparaison";
import { DeuxVitesses } from "./deux-vitesses";
import { EnTetePage } from "./en-tete-page";
import { Etapes } from "./etapes";
import { Faq } from "./faq";
import { GroupeRealisations } from "./groupe-realisations";
import { Hero } from "./hero";
import { IntroFondateur } from "./intro-fondateur";
import { MentionsLegales } from "./mentions-legales";
import { OffresDetaillees } from "./offres-detaillees";
import { PanneauContact } from "./panneau-contact";
import { Parcours } from "./parcours";
import { Principes } from "./principes";
import { Situations } from "./situations";
import { Tournant } from "./tournant";

/**
 * Les sections qui posent elles-mêmes leur enveloppe de largeur.
 *
 * Le reste vit à l'intérieur du conteneur de page. Ce n'est pas un détail de
 * mise en forme : deux conteneurs imbriqués ajouteraient deux fois la
 * gouttière, et une section par conteneur produirait autant de `div` frères là
 * où le site n'en a qu'un. Plusieurs règles en dépendent, à commencer par
 * `first:mt-section` sur le premier bloc d'offre, qui vise le premier enfant
 * de son parent.
 */
const POSE_SON_ENVELOPPE = new Set<Bloc["_type"]>([
  "blocHero",
  "blocEnTetePage",
  "blocMarques",
  "blocMentionsLegales",
]);

/**
 * Rend les sections d'une page en respectant leur enveloppe.
 *
 * Les sections qui vivent dans le conteneur de page sont regroupées par suites
 * consécutives : une suite, un conteneur. C'est ce qui reproduit exactement la
 * structure qu'avaient les pages avant la mise sous CMS.
 */
export function Sections({
  blocs,
  parametres,
}: {
  blocs: Bloc[];
  parametres: ParametresSite;
}) {
  const groupes: { enveloppe: boolean; blocs: Bloc[] }[] = [];

  for (const bloc of blocs) {
    const enveloppe = !POSE_SON_ENVELOPPE.has(bloc._type);
    const dernier = groupes[groupes.length - 1];
    if (dernier && dernier.enveloppe === enveloppe) dernier.blocs.push(bloc);
    else groupes.push({ enveloppe, blocs: [bloc] });
  }

  return (
    <>
      {groupes.map((groupe, i) => {
        const contenu = groupe.blocs.map((bloc) => (
          <Section key={bloc._key} bloc={bloc} parametres={parametres} />
        ));
        return groupe.enveloppe ? (
          <Container key={i}>{contenu}</Container>
        ) : (
          <Fragment key={i}>{contenu}</Fragment>
        );
      })}
    </>
  );
}

/**
 * Un bloc, vers son composant.
 *
 * Un type inconnu lève une erreur au lieu d'être ignoré. C'est volontaire :
 * les six pages sont pré-rendues, donc l'erreur tombe à la construction, là où
 * on la voit. Et si elle survenait plus tard, lors d'une régénération après
 * publication, Next conserve la page précédente — une section perdue en
 * silence aurait été bien pire qu'une régénération qui échoue bruyamment.
 */
function Section({ bloc, parametres }: { bloc: Bloc; parametres: ParametresSite }) {
  switch (bloc._type) {
    case "blocHero":
      return <Hero bloc={bloc} />;
    case "blocEnTetePage":
      return <EnTetePage bloc={bloc} parametres={parametres} />;
    case "blocMarques":
      return <BandeauMarques bloc={bloc} />;
    case "blocSituations":
      return <Situations bloc={bloc} />;
    case "blocEtapes":
      return <Etapes bloc={bloc} />;
    case "blocApercuOffres":
      return <ApercuOffres bloc={bloc} />;
    case "blocAlternatives":
      return <Alternatives bloc={bloc} />;
    case "blocOffresDetaillees":
      return <OffresDetaillees bloc={bloc} />;
    case "blocDeuxVitesses":
      return <DeuxVitesses bloc={bloc} />;
    case "blocComparaison":
      return <Comparaison bloc={bloc} />;
    case "blocGroupeRealisations":
      return <GroupeRealisations bloc={bloc} />;
    case "blocIntroFondateur":
      return <IntroFondateur bloc={bloc} />;
    case "blocParcours":
      return <Parcours bloc={bloc} />;
    case "blocTournant":
      return <Tournant bloc={bloc} />;
    case "blocPrincipes":
      return <Principes bloc={bloc} />;
    case "blocPanneauContact":
      return <PanneauContact bloc={bloc} parametres={parametres} />;
    case "blocFaq":
      return <Faq bloc={bloc} />;
    case "blocMentionsLegales":
      return <MentionsLegales bloc={bloc} />;
    case "blocCloture":
      return <Cloture bloc={bloc} parametres={parametres} />;
    default: {
      // `jamais` vaut `never` tant que le switch est complet : ajouter un type
      // de bloc au schéma sans l'ajouter ici casse la compilation, avant même
      // que quiconque puisse publier la section.
      const jamais: never = bloc;
      throw new Error(
        `Type de section inconnu : ${(jamais as { _type: string })._type}. ` +
          "Le contenu publié utilise un bloc que cette version du site ne sait pas rendre.",
      );
    }
  }
}
