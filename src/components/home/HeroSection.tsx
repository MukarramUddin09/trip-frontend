import { Calendar, MapPin, Plane, Train, Bus, ChevronDown, Play, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden noise">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 60%)" }}
      />
      <div
        className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12), transparent 60%)" }}
      />
      <ParticleBackground count={50} />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <div
          className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wider text-[#93C5FD]"
          style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.3)" }}
        >
          ✦ AI-POWERED TRAVEL COMPANION
        </div>

        <h1 className="mt-8 font-display text-[42px] font-bold leading-[1.1] tracking-tight text-white md:text-[72px]">
          Your Entire Journey.
          <br />
          <span className="text-gradient">One Intelligent Platform.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-[#94A3B8] md:text-xl">
          From booking flights and hotels to local rides and attractions — TripAI handles everything.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup">
            <GradientButton size="lg">
              Start Planning Free <ArrowRight size={18} />
            </GradientButton>
          </Link>
          <GradientButton size="lg" variant="outline">
            <Play size={16} /> Watch Demo
          </GradientButton>
        </div>

        <div className="mt-16 w-full max-w-xl">
          <GlassCard className="p-6 text-left">
            <h3 className="font-display text-lg font-semibold text-white">Plan Your Trip</h3>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field icon={<MapPin size={16} />} label="From" value="Hyderabad" />
              <Field icon={<MapPin size={16} />} label="To" value="Goa" />
            </div>
            <Link to="/dashboard" className="mt-5 block w-full rounded-xl py-3 text-center font-display font-semibold text-white" style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)" }}>
              Find Best Options
            </Link>
          </GlassCard>
        </div>

        <div className="mt-12 text-[#64748B]">
          <ChevronDown size={22} />
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,179,237,0.08)" }}>
      <span className="text-[#06B6D4]">{icon}</span>
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">{label}</div>
        <div className="truncate text-sm text-white">{value}</div>
      </div>
    </div>
  );
}
