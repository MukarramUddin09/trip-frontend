import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-28">
      {/* Mesh gradient backdrop */}
      <div
        className="absolute left-1/2 top-1/2 h-[700px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(59,130,246,0.55), transparent 60%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.45), transparent 60%), radial-gradient(circle at 50% 50%, rgba(6,182,212,0.4), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold text-white md:text-[52px] leading-tight">
          Ready to travel <span className="text-gradient">smarter?</span>
        </h2>
        <p className="mt-5 text-lg text-[#CBD5E1]">
          Join 50,000+ travelers. No credit card required.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-xl bg-white px-7 py-3.5 font-display font-semibold text-[#050A14] shadow-xl transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Free Account
          </Link>
          <button
            className="rounded-xl border border-white/40 px-7 py-3.5 font-display font-semibold text-white transition hover:bg-white/10"
          >
            See Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}
