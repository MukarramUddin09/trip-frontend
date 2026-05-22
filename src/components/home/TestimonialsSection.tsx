import { GlassCard } from "@/components/ui/GlassCard";

const QUOTES = [
  { quote: "Booked flights, hotel AND local cabs for my Goa trip in under 10 minutes.", name: "Priya S.", sub: "Business traveler", initials: "PS", grad: "linear-gradient(135deg,#3B82F6,#06B6D4)" },
  { quote: "Safety alerts warned me about heavy rains before I left for Coorg.", name: "Rahul M.", sub: "Solo traveler", initials: "RM", grad: "linear-gradient(135deg,#8B5CF6,#3B82F6)" },
  { quote: "Itinerary builder organised all bookings into a beautiful day-by-day plan.", name: "Aisha K.", sub: "Family traveler", initials: "AK", grad: "linear-gradient(135deg,#06B6D4,#10B981)" },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="reveal text-center font-display text-4xl font-bold text-white md:text-5xl">
          What <span className="text-gradient">travelers say</span>
        </h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <GlassCard key={q.name} className="reveal p-7">
              <div className="text-[#F59E0B]">★★★★★</div>
              <p className="mt-4 font-body text-[16px] italic leading-relaxed text-[#CBD5E1]">"{q.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full font-display text-sm font-semibold text-white" style={{ background: q.grad }}>{q.initials}</span>
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
