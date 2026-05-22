import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-28">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl font-bold leading-tight text-white md:text-[52px]">
          Ready to travel <span className="text-gradient">smarter?</span>
        </h2>
        <p className="mt-5 text-lg text-[#CBD5E1]">Join 50,000+ travelers. No credit card required.</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup" className="rounded-xl bg-white px-7 py-3.5 font-display font-semibold text-[#050A14] shadow-xl transition hover:scale-[1.02]">
            Create Free Account
          </Link>
        </div>
      </div>
    </section>
  );
}
