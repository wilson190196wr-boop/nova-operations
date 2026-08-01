"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-line bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="NOVA Operations — accueil">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  active ? "text-ink" : "text-ink/55 hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 -bottom-px h-px origin-left bg-azure transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-white transition-all hover:bg-navy sm:inline-flex"
          >
            Prendre rendez-vous
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10m0 0-4-4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
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
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-white/95 backdrop-blur-xl transition-all duration-400 lg:hidden ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] flex-col gap-1 px-6 py-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/70 py-3 text-[15px] font-medium text-ink/80"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-[14px] font-medium text-white"
          >
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </header>
  );
}
