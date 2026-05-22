import { useMemo } from "react";

function seededRandom(seed: number) {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

export function ParticleBackground({ count = 40 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: seededRandom(i * 6 + 1) * 100,
        top: seededRandom(i * 6 + 2) * 100,
        size: 1 + seededRandom(i * 6 + 3) * 2.5,
        delay: seededRandom(i * 6 + 4) * -20,
        duration: 18 + seededRandom(i * 6 + 5) * 22,
        opacity: 0.15 + seededRandom(i * 6 + 6) * 0.4,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "rgba(147,197,253,1)",
            opacity: d.opacity,
            boxShadow: "0 0 6px rgba(59,130,246,0.6)",
            animation: `float-soft ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
