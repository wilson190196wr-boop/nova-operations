"use client";

import { useState } from "react";
import { CalEmbed } from "./cal-embed";
import { ContactForm } from "./contact-form";

const tabs = [
  { id: "rdv", label: "Réserver un créneau", hint: "45 min · visio ou téléphone" },
  { id: "message", label: "Écrire un message", hint: "Réponse sous 24 h ouvrées" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ContactPanel() {
  const [active, setActive] = useState<TabId>("rdv");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_40px_90px_-50px_rgba(8,9,12,0.45)] lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Mode de prise de contact"
          className="inline-flex rounded-full bg-mist p-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300 ${
                active === tab.id ? "bg-ink text-white" : "text-ink/55 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="flex items-center gap-2 pr-1 text-[12.5px] text-ink/45">
          <span className="h-1.5 w-1.5 rounded-full bg-azure" />
          {current.hint}
        </span>
      </div>

      <div
        role="tabpanel"
        id="panel-rdv"
        aria-labelledby="tab-rdv"
        hidden={active !== "rdv"}
        className="mt-6"
      >
        <CalEmbed />
      </div>

      <div
        role="tabpanel"
        id="panel-message"
        aria-labelledby="tab-message"
        hidden={active !== "message"}
        className="mt-8"
      >
        <ContactForm />
      </div>
    </div>
  );
}
