export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const fg = tone === "dark" ? "#08090c" : "#ffffff";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="7.25" stroke={fg} strokeOpacity="0.18" strokeWidth="1.5" />
        <path d="M10 22V10l12 12V10" stroke={fg} strokeWidth="2" strokeLinecap="square" />
        <circle cx="22" cy="10" r="2.6" fill="#2f5cff" />
      </svg>
      <span className="flex items-baseline gap-1.5">
        <span
          className="text-[15px] font-semibold tracking-[-0.02em]"
          style={{ color: fg }}
        >
          KELERIA
        </span>
        <span
          className="text-[11px] font-medium uppercase tracking-[0.18em] opacity-50"
          style={{ color: fg }}
        >
          Operations
        </span>
      </span>
    </span>
  );
}
