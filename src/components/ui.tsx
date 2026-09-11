import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-6 lg:px-10 ${className}`}>{children}</div>
  );
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-ink/45" : "text-white/50"
      }`}
    >
      <span className="h-px w-6 bg-azure" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-5 text-[clamp(1.9rem,4vw,3.05rem)] font-semibold leading-[1.06] tracking-[-0.035em] ${
          tone === "dark" ? "text-ink" : "text-white"
        }`}
        style={{ textWrap: "balance" }}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-6 text-[17px] leading-[1.65] ${
            tone === "dark" ? "text-ink/60" : "text-white/60"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {intro}
        </p>
      ) : null}
    </Reveal>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  className?: string;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all duration-300";
  const styles = {
    primary: "bg-ink text-white hover:bg-navy",
    ghost: "border border-line text-ink hover:border-ink/40 hover:bg-mist",
    light: "bg-white text-ink hover:bg-white/90",
  }[variant];

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 8h10m0 0-4-4m4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </svg>
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist pt-[128px] pb-20 lg:pt-[168px] lg:pb-28">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 mask-fade-b" />
      <div
        className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full blur-[130px] animate-sheen"
        style={{ background: "radial-gradient(circle, rgba(47,92,255,0.16), transparent 70%)" }}
      />
      <Container className="relative">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            className="mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={100}>
            <p className="mt-7 max-w-2xl text-[18px] leading-[1.65] text-ink/60">{intro}</p>
          </Reveal>
        ) : null}
        {meta ? (
          <Reveal delay={180}>
            <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {meta.map((item) => (
                <div key={item.label} className="bg-white px-6 py-6">
                  <dt className="text-[12px] uppercase tracking-[0.14em] text-ink/40">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[22px] font-semibold tracking-[-0.02em]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

export function CTABand({
  title = "Combien d'heures perdez-vous chaque semaine ?",
  intro = "45 minutes suffisent pour identifier vos trois principales pertes opérationnelles. Sans engagement, sans slide de vente.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-24 text-white lg:py-32">
      <div className="grid-lines-dark pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] animate-sheen"
        style={{ background: "radial-gradient(circle, rgba(47,92,255,0.32), transparent 68%)" }}
      />
      <Container className="relative text-center">
        <Reveal>
          <Eyebrow tone="light">Diagnostic flash · gratuit</Eyebrow>
          <h2
            className="mx-auto mt-6 max-w-3xl text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/60">{intro}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="light">
              Réserver 45 minutes
            </Button>
            <Button href="/methode" variant="ghost" className="border-white/20 text-white hover:bg-white/5">
              Découvrir KELERIA OS™
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
