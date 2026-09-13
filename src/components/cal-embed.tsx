"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { calBrandColor, calLink, calNamespace } from "@/lib/booking";
import { site } from "@/lib/home";

export function CalEmbed() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const cal = await getCalApi({ namespace: calNamespace });
        if (cancelled) return;

        cal("ui", {
          theme: "light",
          layout: "month_view",
          // La colonne « Wilson Rault / 45 min / Google Meet / Europe/Paris »
          // répète ce que la page dit déjà juste au-dessus, et elle occupe un
          // tiers de la largeur : sans elle, le calendrier et les créneaux
          // tiennent côte à côte au lieu de s'empiler.
          hideEventTypeDetails: true,
          cssVarsPerTheme: {
            light: { "cal-brand": calBrandColor },
            dark: { "cal-brand": calBrandColor },
          },
        });

        // Le squelette reste affiché tant que Cal.com n'a pas peint le calendrier.
        cal("on", { action: "linkReady", callback: () => setReady(true) });
        cal("on", { action: "linkFailed", callback: () => setFailed(true) });
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="mt-5 flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-tier border border-dashed border-ink/20 bg-sand p-8 text-center">
        <p className="text-fine font-medium">Le calendrier n&apos;a pas pu se charger.</p>
        <p className="max-w-sm text-finer leading-[1.55] text-ink-70">
          Écrivez-nous directement, nous vous proposerons trois créneaux dans la journée.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-2 inline-flex min-h-[44px] items-center rounded-full bg-navy px-5 text-finer font-medium text-white transition-colors hover:bg-[#0b1c3d] hover:text-white"
        >
          {site.email}
        </a>
      </div>
    );
  }

  return (
    <div className="relative mt-5 min-h-[560px] overflow-hidden rounded-tier">
      {!ready ? (
        <div className="absolute inset-0 z-10 flex flex-col gap-4 bg-sand p-8">
          <div className="h-4 w-40 animate-pulse rounded-full bg-sand-2" />
          <div className="h-3 w-64 animate-pulse rounded-full bg-sand-2" />
          <div className="mt-6 grid flex-1 grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg bg-sand-2"
                style={{ animationDelay: `${i * 18}ms` }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* L'iframe se redimensionne toute seule en hauteur : lui imposer
          `overflow: scroll` ajoutait une barre de défilement interne en plus de
          celle de la page. */}
      <Cal
        namespace={calNamespace}
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: "560px" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
