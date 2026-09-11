import Link from "next/link";
import { mainNav, site } from "@/lib/home";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-9 lg:px-12">
      <div className="flex flex-col gap-5 text-[13.5px] text-ink/45 sm:flex-row sm:items-baseline sm:justify-between">
        <p>
          {site.name} — {site.baseline}
        </p>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="transition-colors hover:text-ink">
            Rendez-vous
          </Link>
          <Link href="/mentions-legales" className="transition-colors hover:text-ink">
            Mentions légales
          </Link>
        </nav>
      </div>
    </footer>
  );
}
