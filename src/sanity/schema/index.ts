import type { SchemaTypeDefinition } from "sanity";

import { offre } from "./documents/offre";
import { page } from "./documents/page";
import { parametresSite } from "./documents/parametresSite";
import { realisation } from "./documents/realisation";

import { etape } from "./objets/etape";
import { fait } from "./objets/fait";
import { lienNavigation } from "./objets/lienNavigation";
import { seo } from "./objets/seo";

import { blocAlternatives } from "./blocs/blocAlternatives";
import { blocApercuOffres } from "./blocs/blocApercuOffres";
import { blocCloture } from "./blocs/blocCloture";
import { blocComparaison } from "./blocs/blocComparaison";
import { blocDeuxVitesses } from "./blocs/blocDeuxVitesses";
import { blocEnTetePage } from "./blocs/blocEnTetePage";
import { blocEtapes } from "./blocs/blocEtapes";
import { blocFaq } from "./blocs/blocFaq";
import { blocGroupeRealisations } from "./blocs/blocGroupeRealisations";
import { blocHero } from "./blocs/blocHero";
import { blocIntroFondateur } from "./blocs/blocIntroFondateur";
import { blocMarques } from "./blocs/blocMarques";
import { blocMentionsLegales } from "./blocs/blocMentionsLegales";
import { blocOffresDetaillees } from "./blocs/blocOffresDetaillees";
import { blocPanneauContact } from "./blocs/blocPanneauContact";
import { blocParcours } from "./blocs/blocParcours";
import { blocPrincipes } from "./blocs/blocPrincipes";
import { blocSituations } from "./blocs/blocSituations";
import { blocTournant } from "./blocs/blocTournant";

/**
 * Le schéma complet, en trois familles.
 *
 * Les documents sont ce qu'on crée et publie. Les objets sont des formes
 * réutilisées à l'intérieur des documents. Les blocs sont les sections qu'une
 * page peut recevoir — un par composant réellement disponible dans le site, ni
 * plus ni moins : un bloc sans composant produirait du contenu que rien ne sait
 * afficher.
 */
export const types: SchemaTypeDefinition[] = [
  // Documents
  page,
  parametresSite,
  offre,
  realisation,

  // Objets partagés
  seo,
  fait,
  etape,
  lienNavigation,

  // Blocs de page
  blocHero,
  blocEnTetePage,
  blocMarques,
  blocSituations,
  blocEtapes,
  blocApercuOffres,
  blocAlternatives,
  blocOffresDetaillees,
  blocDeuxVitesses,
  blocComparaison,
  blocGroupeRealisations,
  blocIntroFondateur,
  blocParcours,
  blocTournant,
  blocPrincipes,
  blocPanneauContact,
  blocFaq,
  blocMentionsLegales,
  blocCloture,
];
