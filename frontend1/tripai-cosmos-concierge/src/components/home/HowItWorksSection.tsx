import { Compass, Cpu, CheckCircle2, ShieldCheck } from "lucide-react";

const STEPS = [
  { Icon: Compass, title: "Tell us your trip", desc: "Enter origin, destination, dates and preferences." },
  { Icon: Cpu, title: "AI agents search", desc: "Our agents scan all providers simultaneously." },
  { Icon: CheckCircle2, title: "Compare & confirm", desc: "Review ranked options, book in one click." },
  { Icon: ShieldCheck, title: "Travel with confidence", desc: "Live alerts, itinerary, and support throughout." },
];

export function HowItWorksSection() {
  return (
    <section id="how" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-4xl font-bold text-white md:text-5xl reveal">
          How <span className="text-gradient">TripAI</span> Works
        </h2>

        <div className="relative mt-20">
          {/* Connecting line desktop */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-[2px] md:block"
            style={{ background: "linear-gradient(90deg,#3B82F6,#06B6D4,#8B5CF6)" }}
          />
          <div className="grid gap-12 md:grid-cols-4">
            {STEPS.map(({ Icon, title, desc }, i) => (
              <div key={title} className="reveal relative flex flex-col items-center text-center" style={{ animationDelay: `${i * 120}ms` }}>
                <div
                  className="relative grid h-14 w-14 place-items-center rounded-full font-display text-lg font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
                    boxShadow: "0 0 28px rgba(59,130,246,0.45)",
                  }}
                >
                  {i + 1}
                </div>
                <div className="mt-5 grid h-12 w-12 place-items-center rounded-xl border border-white/5 bg-white/[0.03] text-[#06B6D4]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 max-w-xs text-[15px] text-[#94A3B8]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
