import { Plane, Hotel, MapPin, Ticket, ShieldCheck, BarChart2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const FEATURES = [
  { Icon: Plane, title: "Smart Travel Booking", desc: "AI compares flights, trains, buses and cabs in real time to find you the perfect option by price or speed." },
  { Icon: Hotel, title: "Seamless Hotel Stays", desc: "Browse rooms, check live availability, view veg/non-veg menus and book in seconds." },
  { Icon: MapPin, title: "Local Rides & Transfers", desc: "Uber, Rapido, Ola — our agent picks the best local ride so you never overpay at the destination." },
  { Icon: Ticket, title: "Events & Attractions", desc: "Discover top-rated places, check real-time ticket availability and book for any day or time slot." },
  { Icon: ShieldCheck, title: "Live Safety Alerts", desc: "Continuous weather monitoring, local event tracking and AI-generated precautions for your destination." },
  { Icon: BarChart2, title: "Smart Expense Tracking", desc: "Every booking tracked, every receipt generated, with full budget vs spend breakdown and GST invoices." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center reveal">
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Everything for your journey
          </h2>
          <p className="mt-3 font-display text-2xl font-medium">
            <span className="text-gradient">One platform. Every step.</span>
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <GlassCard
              key={title}
              className="group reveal p-7 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.25),rgba(6,182,212,0.25))", border: "1px solid rgba(99,179,237,0.25)" }}
              >
                <Icon size={26} className="text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#94A3B8]">{desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
