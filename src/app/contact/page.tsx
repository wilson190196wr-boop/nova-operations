import type { Metadata } from "next";
import { metadonnees } from "@/lib/seo";
import { ContactPanel } from "@/components/contact-panel";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, PageHead, SectionHead, Steps } from "@/components/ui";
import { faq } from "@/lib/faq";
import { site } from "@/lib/home";

export const metadata: Metadata = metadonnees("/contact");

/** Les trois temps de l'échange, propres à cette page. */
const echange = [
  {
    n: "01",
    title: "Vous décrivez",
    text: "Votre activité, vos effectifs, les outils en place et ce qui vous freine aujourd'hui.",
  },
  {
    n: "02",
    title: "Je cadre",
    text: "Ce qui me paraît prioritaire, ce que ça suppose de votre côté, et ce que je laisserais de côté.",
  },
  {
    n: "03",
    title: "Vous décidez",
    text: "Un audit, un chantier précis, un simple conseil, ou rien du tout. Sans relance commerciale.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Quarante-cinq minutes pour y voir clair."
        lead="Un échange cadré, sans slide de vente. Vous décrivez votre organisation, vos outils et ce qui vous freine. Je vous dis par où je commencerais, ce que ça suppose, et s'il y a matière à travailler ensemble."
      >
        <Coordinates />
      </PageHead>

      <Container>
        {/* Les trois étapes produisent des H3. Sans H2 parent, ils suivaient
            directement le H1 et cassaient la hiérarchie du document. Le titre
            est masqué visuellement, pas retiré : la page ne change pas. */}
        <section aria-labelledby="echange-title">
          <h2 id="echange-title" className="sr-only">
            Comment se déroule notre échange
          </h2>
          <Steps items={echange} />
        </section>

        <Reveal className="mt-section">
          <ContactPanel />
        </Reveal>

        <Faq />
      </Container>
    </>
  );
}

/* ----------------------------------------------------------- Coordinates */

/**
 * Les coordonnées, en une seule ligne compacte sur une carte claire.
 *
 * Elles occupaient auparavant trois colonnes coiffées d'un filet — le même
 * traitement que la rangée des étapes qui suit immédiatement, ce qui donnait
 * deux bandeaux jumeaux et rendait la hiérarchie illisible. Ramenées sur une
 * carte, elles se lisent comme un encart de contact et non comme une section.
 */
function Coordinates() {
  const rows = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    // `tel:` n'accepte ni espace ni signe de ponctuation : le numéro affiché
    // reste lisible, celui composé est nettoyé.
    { label: "Téléphone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { label: "Localisation", value: site.address, href: null },
  ];

  return (
    <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 rounded-tier bg-paper px-5 py-4 sm:mt-9 sm:inline-flex sm:flex-wrap sm:gap-x-10 sm:px-6 sm:py-5">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1">
          <dt>
            <Eyebrow uppercase>{row.label}</Eyebrow>
          </dt>
          <dd className="text-[1.0625rem] font-medium leading-none">
            {/* Padding vertical compensé par une marge négative : la zone
                tappable passe de 22 à 45 px sans déplacer le texte d'un pixel.
                3.5 et non 3, parce que `leading-none` réduit la boîte de ligne
                à 17 px — 24 px de padding ne suffisaient pas à atteindre 44. */}
            {row.href ? (
              <a href={row.href} className="-my-3.5 inline-block py-3.5">
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------- FAQ */

function Faq() {
  return (
    <section aria-labelledby="faq-title" className="mt-section">
      <SectionHead
        id="faq-title"
        eyebrow="Avant de nous écrire"
        title="Les réponses aux questions les plus fréquentes."
      />
      {/* `details` plutôt qu'une liste toujours ouverte : le dépliage est natif,
          donc opérable au clavier et annoncé par les lecteurs d'écran sans une
          ligne de JavaScript. */}
      <div className="mt-6 grid gap-2 sm:mt-9 sm:gap-3">
        {faq.map((item, i) => (
          <Reveal key={item.q} delay={i * 60}>
            <details className="group rounded-card bg-paper px-5 py-[1.125rem] sm:px-[clamp(1.25rem,2vw,1.75rem)] sm:py-5">
              {/* 44 px au doigt, la hauteur de la maquette à la souris. */}
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold tracking-[-0.02em] sm:text-[1.0625rem] lg:min-h-8 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="font-mono text-xl leading-none text-azure after:content-['+'] group-open:after:content-['–']"
                />
              </summary>
              <p className="mt-3 max-w-[70ch] text-fine leading-[1.6] text-ink-70 sm:mt-3.5">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
