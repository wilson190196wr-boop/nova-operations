import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ContactPanel } from "@/components/contact-panel";
import { Container, Eyebrow } from "@/components/ui";
import { faq, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — réserver un diagnostic de 45 minutes",
  description:
    "Échangez 45 minutes avec NOVA Operations pour identifier vos trois principales pertes opérationnelles. Sans engagement.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[128px] pb-24 lg:pt-[168px] lg:pb-32">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 mask-fade-b" />
        <div
          className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full blur-[140px] animate-sheen"
          style={{ background: "radial-gradient(circle, rgba(47,92,255,0.15), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            {/* Left */}
            <div>
              <Reveal>
                <Eyebrow>Contact</Eyebrow>
                <h1
                  className="mt-6 text-[clamp(2.3rem,5.4vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
                  style={{ textWrap: "balance" }}
                >
                  45 minutes pour savoir où partent vos heures.
                </h1>
                <p className="mt-7 max-w-lg text-[17.5px] leading-[1.65] text-ink/60">
                  Un échange cadré, sans slide de vente. Vous décrivez votre organisation, nous
                  identifions les trois pertes les plus probables et nous vous disons franchement
                  si une mission se justifie.
                </p>
              </Reveal>

              <Reveal delay={100} className="mt-12">
                <ul className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {[
                    ["01", "Vous décrivez", "Activité, effectif, outils en place, irritants ressentis."],
                    ["02", "Nous cadrons", "Trois hypothèses de perte, chiffrées à la louche mais argumentées."],
                    ["03", "Vous décidez", "Un audit, un simple conseil, ou rien du tout. Sans relance commerciale."],
                  ].map(([n, t, d]) => (
                    <li key={n} className="flex gap-6 bg-white px-6 py-6">
                      <span className="font-mono text-[12px] text-ink/30">{n}</span>
                      <div>
                        <p className="text-[15.5px] font-medium">{t}</p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-ink/50">{d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={160} className="mt-12">
                <dl className="grid gap-6 sm:grid-cols-3">
                  {[
                    ["Email", site.email],
                    ["Téléphone", site.phone],
                    ["Adresse", site.address],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[11.5px] uppercase tracking-[0.14em] text-ink/40">
                        {label}
                      </dt>
                      <dd className="mt-2 text-[14.5px] leading-snug text-ink/75">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Prise de rendez-vous + formulaire */}
            <Reveal delay={120}>
              <ContactPanel />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-24 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <Eyebrow>Avant de nous écrire</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.035em]">
                Les réponses aux questions les plus fréquentes.
              </h2>
            </Reveal>
            <div>
              {faq.map((item, i) => (
                <Reveal key={item.q} delay={i * 60} className="border-t border-line py-7 last:border-b">
                  <h3 className="text-[17px] font-medium tracking-[-0.01em]">{item.q}</h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-ink/55">{item.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

