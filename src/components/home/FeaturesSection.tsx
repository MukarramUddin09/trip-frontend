import { Plane, Hotel, MapPin, Ticket, ShieldCheck, BarChart2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const FEATURES = [
  { Icon: Plane, title: "Smart Travel Booking", desc: "AI compares flights, trains, buses and cabs in real time." },
  { Icon: Hotel, title: "Seamless Hotel Stays", desc: "Browse rooms, check live availability, and book in seconds." },
  { Icon: MapPin, title: "Local Rides & Transfers", desc: "Best local ride options so you never overpay." },
  { Icon: Ticket, title: "Events & Attractions", desc: "Discover top-rated places and book time slots." },
  { Icon: ShieldCheck, title: "Live Safety Alerts", desc: "OpenWeather-powered monitoring for your destination." },
  { Icon: BarChart2, title: "Smart Expense Tracking", desc: "Every booking tracked with GST invoices via Razorpay." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal text-center">
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">Everything for your journey</h2>
          <p className="mt-3 font-display text-2xl font-medium">
            <span className="text-gradient">One platform. Every step.</span>
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, desc }) => (
            <GlassCard key={title} className="group reveal p-7 transition-all duration-300 hover:-translate-y-1">
              <div className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.25),rgba(6,182,212,0.25))", border: "1px solid rgba(99,179,237,0.25)" }}>
                <Icon size={26} className="text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#94A3B8]">{desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
