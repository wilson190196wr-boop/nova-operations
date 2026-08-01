import { pillars } from "@/lib/content";

const WIDTH = 420;
const HEIGHT = 340;
const CX = WIDTH / 2;
const CY = HEIGHT / 2;
const RADIUS = 112;

function point(index: number, ratio: number) {
  const angle = (Math.PI * 2 * index) / pillars.length - Math.PI / 2;
  return [
    CX + Math.cos(angle) * RADIUS * ratio,
    CY + Math.sin(angle) * RADIUS * ratio,
  ] as const;
}

function polygon(ratio: number) {
  return pillars
    .map((_, i) => point(i, ratio))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

export function MaturityRadar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const grid = tone === "light" ? "#e6e8ec" : "#ffffff22";
  const label = tone === "light" ? "#08090c" : "#ffffff";

  const shape = pillars
    .map((p, i) => point(i, p.score / 100))
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full max-w-[420px]"
      role="img"
      aria-label="Score de maturité NOVA OS par pilier"
    >
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f5cff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#2f5cff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={polygon(r)} fill="none" stroke={grid} strokeWidth="1" />
      ))}

      {pillars.map((p, i) => {
        const [x, y] = point(i, 1);
        return <line key={p.id} x1={CX} y1={CY} x2={x} y2={y} stroke={grid} strokeWidth="1" />;
      })}

      <polygon points={shape} fill="url(#radarFill)" stroke="#2f5cff" strokeWidth="1.75" strokeLinejoin="round" />

      {pillars.map((p, i) => {
        const [x, y] = point(i, p.score / 100);
        return <circle key={p.id} cx={x} cy={y} r="3.5" fill="#2f5cff" stroke={tone === "light" ? "#fff" : "#061127"} strokeWidth="2" />;
      })}

      {pillars.map((p, i) => {
        const [x, y] = point(i, 1.22);
        const anchor = x < CX - 8 ? "end" : x > CX + 8 ? "start" : "middle";
        return (
          <text
            key={p.id}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="10.5"
            fill={label}
            opacity="0.6"
            style={{ fontWeight: 500, letterSpacing: "0.04em" }}
          >
            {p.name === "Intelligence Artificielle" ? "IA" : p.name}
          </text>
        );
      })}
    </svg>
  );
}

export function MaturityBars({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="w-full">
      {pillars.map((p) => (
        <div
          key={p.id}
          className={`flex items-center gap-5 border-b py-3.5 last:border-b-0 ${
            tone === "light" ? "border-line" : "border-white/10"
          }`}
        >
          <span
            className={`w-40 shrink-0 text-[13.5px] font-medium ${
              tone === "light" ? "text-ink/75" : "text-white/75"
            }`}
          >
            {p.name}
          </span>
          <span
            className={`relative h-1.5 flex-1 overflow-hidden rounded-full ${
              tone === "light" ? "bg-line" : "bg-white/10"
            }`}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${p.score}%`,
                background:
                  p.score < 35
                    ? "linear-gradient(90deg,#ff6a3d,#ff9d6e)"
                    : "linear-gradient(90deg,#2f5cff,#7fa0ff)",
              }}
            />
          </span>
          <span
            className={`w-9 shrink-0 text-right font-mono text-[13px] tabular-nums ${
              tone === "light" ? "text-ink/50" : "text-white/50"
            }`}
          >
            {p.score}
          </span>
        </div>
      ))}
    </div>
  );
}
