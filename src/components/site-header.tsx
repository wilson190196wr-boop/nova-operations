"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav, site } from "@/lib/home";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 lg:px-12 lg:py-6">
        <Link href="/" aria-label="KELERIA — accueil" className="flex items-baseline gap-3.5">
          <span className="text-[19px] font-semibold tracking-[-0.03em]">{site.name}</span>
          <span className="hidden text-[13px] text-ink/45 xl:inline">{site.baseline}</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-8">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[14.5px] transition-colors ${
                    active ? "text-ink" : "text-ink/65 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className="rounded-lg bg-ink px-5 py-2.5 text-[14.5px] text-white transition-colors hover:bg-navy-deep"
          >
            Rendez-vous
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden"
        >
          <span className="relative block h-2.5 w-4">
            <span
              className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${
                open ? "top-1 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${
                open ? "top-1 -rotate-45" : "top-2.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-line transition-all duration-300 lg:hidden ${
          open ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-4">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[15px] text-ink/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 rounded-lg bg-ink px-5 py-3.5 text-center text-[15px] text-white"
          >
            Rendez-vous
          </Link>
        </div>
      </div>
    </header>
  );
}
