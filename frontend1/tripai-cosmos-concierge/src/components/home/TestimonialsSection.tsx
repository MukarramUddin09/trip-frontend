import { GlassCard } from "@/components/ui/GlassCard";

const QUOTES = [
  {
    quote:
      "Booked flights, hotel AND local cabs for my Goa trip in under 10 minutes. The AI picked options I would never have found on my own — saved me ₹4,000.",
    name: "Priya S.",
    sub: "Business traveler, Hyderabad",
    initials: "PS",
    grad: "linear-gradient(135deg,#3B82F6,#06B6D4)",
  },
  {
    quote:
      "The safety alerts feature warned me about heavy rains before I even left for Coorg. Switched my travel day and had a perfect trip.",
    name: "Rahul M.",
    sub: "Solo traveler, Bangalore",
    initials: "RM",
    grad: "linear-gradient(135deg,#8B5CF6,#3B82F6)",
  },
  {
    quote:
      "The itinerary builder automatically organised all my bookings into a beautiful day-by-day plan. Shared it with my family instantly.",
    name: "Aisha K.",
    sub: "Family traveler, Delhi",
    initials: "AK",
    grad: "linear-gradient(135deg,#06B6D4,#10B981)",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-4xl font-bold text-white md:text-5xl reveal">
          What <span className="text-gradient">travelers say</span>
        </h2>

        <div className="mt-16 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {QUOTES.map((q, i) => (
            <GlassCard
              key={q.name}
              className="reveal min-w-[300px] p-7"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="text-[#F59E0B] tracking-wide">★★★★★</div>
              <p className="mt-4 font-body text-[16px] italic leading-relaxed text-[#CBD5E1]">
                "{q.quote}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-semibold text-white"
                  style={{ background: q.grad }}
                >
                  {q.initials}
                </span>
                <div>
                  <div className="font-display text-base text-white">{q.name}</div>
                  <div className="font-body text-[13px] text-[#64748B]">{q.sub}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
