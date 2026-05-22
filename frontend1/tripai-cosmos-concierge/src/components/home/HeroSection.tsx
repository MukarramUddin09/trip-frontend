import { Calendar, MapPin, Plane, Train, Bus, ChevronDown, Play, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden noise">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 60%)" }}
      />
      <div
        className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 60%)" }}
      />

      {/* Floating orbs */}
      <div
        className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle,#3B82F6,transparent 70%)",
          animation: "float 40s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle,#06B6D4,transparent 70%)",
          animation: "float 50s ease-in-out -10s infinite alternate-reverse",
        }}
      />
      <div
        className="absolute left-1/2 bottom-10 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle,#8B5CF6,transparent 70%)",
          animation: "float 60s ease-in-out -20s infinite alternate",
        }}
      />

      <ParticleBackground count={50} />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        {/* Pill badge */}
        <div
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wider text-[#93C5FD]"
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.3)",
          }}
        >
          ✦ AI-POWERED TRAVEL COMPANION
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
              animation: "shimmer 3s linear infinite",
            }}
          />
        </div>

        {/* Heading */}
        <h1 className="mt-8 font-display font-bold tracking-tight text-white text-[42px] leading-[1.1] md:text-[72px]">
          Your Entire Journey.
          <br />
          <span className="text-gradient">One Intelligent Platform.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#94A3B8] md:text-xl">
          From booking flights and hotels to local rides and attractions —
          TripAI's agents handle everything so you can focus on the experience.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GradientButton size="lg">
            Start Planning Free <ArrowRight size={18} />
          </GradientButton>
          <GradientButton size="lg" variant="outline">
            <Play size={16} /> Watch Demo
          </GradientButton>
        </div>

        {/* Trust row */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "linear-gradient(135deg,#3B82F6,#06B6D4)",
              "linear-gradient(135deg,#8B5CF6,#3B82F6)",
              "linear-gradient(135deg,#06B6D4,#10B981)",
              "linear-gradient(135deg,#F59E0B,#EF4444)",
              "linear-gradient(135deg,#EC4899,#8B5CF6)",
            ].map((bg, i) => (
              <span
                key={i}
                className="h-7 w-7 rounded-full border-2"
                style={{ background: bg, borderColor: "#050A14" }}
              />
            ))}
          </div>
          <p className="font-body text-sm text-[#64748B]">
            Trusted by 50,000+ travelers
          </p>
        </div>

        {/* Search widget card */}
        <div className="mt-16 w-full max-w-xl" style={{ animation: "float-soft 6s ease-in-out infinite" }}>
          <GlassCard
            className="p-6 text-left"
            style={{ boxShadow: "0 0 60px rgba(59,130,246,0.15), 0 8px 32px rgba(0,0,0,0.4)" }}
          >
            <h3 className="font-display text-lg font-semibold text-white">Plan Your Trip</h3>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field icon={<MapPin size={16} />} label="From" value="Hyderabad" />
              <Field icon={<MapPin size={16} />} label="To" value="Goa" />
            </div>
            <div className="mt-3">
              <Field icon={<Calendar size={16} />} label="Dates" value="Fri 22 May → Sun 24 May" />
            </div>
            <button
              className="mt-5 w-full rounded-xl py-3 font-display font-semibold text-white transition hover:brightness-110"
              style={{
                background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
                boxShadow: "0 8px 24px rgba(59,130,246,0.35)",
              }}
            >
              Find Best Options
            </button>

            <div className="mt-6 space-y-2">
              <Result icon={<Plane size={14} />} provider="IndiGo · 6E-204" time="08:25 → 10:10" price="₹4,290" pick />
              <Result icon={<Train size={14} />} provider="Vande Bharat" time="06:00 → 18:30" price="₹1,840" />
              <Result icon={<Bus size={14} />} provider="VRL Sleeper" time="22:00 → 09:15" price="₹1,150" />
            </div>
          </GlassCard>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-12 text-[#64748B]"
          style={{ animation: "fade-in 1s ease 2s both, bounce-down 1.6s ease-in-out infinite" }}
        >
          <ChevronDown size={22} />
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg px-3 py-2.5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,179,237,0.08)" }}
    >
      <span className="text-[#06B6D4]">{icon}</span>
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">{label}</div>
        <div className="truncate text-sm text-white">{value}</div>
      </div>
    </div>
  );
}

function Result({
  icon, provider, time, price, pick = false,
}: { icon: React.ReactNode; provider: string; time: string; price: string; pick?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <div className="flex items-center gap-3">
        <span
          className="grid h-7 w-7 place-items-center rounded-md text-white"
          style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)" }}
        >
          {icon}
        </span>
        <div>
          <div className="text-xs font-medium text-white">{provider}</div>
          <div className="text-[11px] text-[#94A3B8]">{time}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {pick && (
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
            style={{ background: "rgba(16,185,129,0.15)", color: "#34D399", border: "1px solid rgba(16,185,129,0.3)" }}
          >
            AI Pick
          </span>
        )}
        <div className="text-sm font-semibold text-white">{price}</div>
      </div>
    </div>
  );
}
