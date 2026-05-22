import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 50000, suffix: "+", label: "Travelers" },
  { value: 200, suffix: "+", label: "Destinations" },
  { value: 12, suffix: "", label: "Transport Providers" },
  { value: 4.9, decimals: 1, suffix: "★", label: "Average Rating" },
];

export function StatsSection() {
  return (
    <section
      className="relative py-20"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, rgba(13,21,38,0.6) 50%, transparent 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="relative flex flex-col items-center text-center"
            style={
              i < STATS.length - 1
                ? { borderRight: "1px solid rgba(255,255,255,0.05)" }
                : undefined
            }
          >
            <div className="font-display text-5xl font-bold md:text-[56px]">
              <span className="text-gradient">
                <AnimatedCounter
                  to={s.value}
                  decimals={s.decimals || 0}
                  suffix={s.suffix}
                />
              </span>
            </div>
            <div className="mt-2 font-body text-base text-[#94A3B8]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
