"use client";

import { useState } from "react";
import { calUrl } from "@/lib/booking";
import { CalEmbed } from "./cal-embed";
import { ContactForm } from "./contact-form";

/**
 * Prise de rendez-vous et formulaire, sous un sélecteur à deux positions.
 *
 * Les deux panneaux sont montés en permanence et masqués par `hidden` plutôt
 * que démontés : le calendrier Cal.com se recharge entièrement à chaque
 * montage, et une saisie en cours dans le formulaire serait perdue à chaque
 * aller-retour.
 *
 * Le panneau prend toute la largeur du conteneur. C'est ce qui permet au
 * calendrier d'afficher sa vue mois — sous environ 800 px, il empile le mois
 * au-dessus des créneaux et double de hauteur.
 */
const tabs = [
  { id: "rdv", label: "Réserver un créneau", hint: "45 min · visio ou téléphone" },
  { id: "message", label: "Écrire un message", hint: "Réponse sous 24 h ouvrées" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContactPanel() {
  const [active, setActive] = useState<TabId>("rdv");
  const current = tabs.find((tab) => tab.id === active)!;

  return (
    <div className="rounded-card bg-paper p-4 sm:p-5 lg:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Mode de prise de contact"
          className="inline-flex rounded-full bg-sand p-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`min-h-[40px] rounded-full px-5 text-finer font-medium transition-colors ${
                active === tab.id ? "bg-navy text-white" : "text-ink-70 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="flex items-center gap-2 pr-1 font-mono text-mono tracking-[0.06em] text-ink-55">
          <span className="h-1.5 w-1.5 rounded-full bg-azure" />
          {current.hint}
        </span>
      </div>

      <div role="tabpanel" id="panel-rdv" aria-labelledby="tab-rdv" hidden={active !== "rdv"}>
        <CalEmbed />
      </div>

      <div
        role="tabpanel"
        id="panel-message"
        aria-labelledby="tab-message"
        hidden={active !== "message"}
      >
        {/* Le panneau est large pour le calendrier ; un formulaire étiré sur
            1 200 px serait illisible, d'où la colonne bornée et centrée —
            calée à gauche, elle laissait un grand vide sur la droite. */}
        <div className="mx-auto mt-5 max-w-[640px]">
          <ContactForm />
        </div>
      </div>

      {/* Hors des deux panneaux, donc jamais masqué par l'onglet actif, et
          hors du squelette du calendrier, donc présent avant même son
          chargement. C'est la seule façon de réserver qui ne dépende ni de
          JavaScript ni du script Cal.com. */}
      <p className="mt-5 border-t border-line-soft pt-4 text-fine text-ink-70">
        <a href={calUrl} className="underline underline-offset-4 hover:text-azure">
          Ouvrir le calendrier sur Cal.com
        </a>
      </p>
    </div>
  );
}
