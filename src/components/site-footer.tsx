import Link from "next/link";
import { nav, offers, site } from "@/lib/content";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grid-lines-dark pointer-events-none absolute inset-0 opacity-60" />
      <div
        className="pointer-events-none absolute -top-40 left-1/3 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(47,92,255,0.28), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="grid gap-14 border-b border-white/10 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/55">
              Fractional COO et partenaire de performance des PME françaises. Nous
              transformons les opérations, pas seulement les outils.
            </p>
            <div className="mt-8 flex gap-2">
              {["LinkedIn", "Newsletter"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/15 px-4 py-1.5 text-[12.5px] text-white/60"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <FooterColumn title="Navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
          </FooterColumn>

          <FooterColumn title="Offres">
            {offers.map((offer) => (
              <Link key={offer.slug} href="/offres" className="footer-link">
                {offer.name}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <span className="footer-link">{site.email}</span>
            <span className="footer-link">{site.phone}</span>
            <span className="footer-link">{site.address}</span>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 py-8 text-[12.5px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NOVA Operations. Tous droits réservés.</p>
          <p className="flex gap-6">
            <span>Mentions légales</span>
            <span>Confidentialité</span>
            <span>SIREN 929 326 049</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">{title}</p>
      <div className="mt-5 flex flex-col gap-3 text-[14.5px] text-white/65 [&_.footer-link]:transition-colors [&_.footer-link:hover]:text-white">
        {children}
      </div>
    </div>
  );
}
