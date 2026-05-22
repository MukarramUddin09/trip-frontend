import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait one tick for localStorage hydration
    const t = setTimeout(() => {
      if (!isAuthenticated) navigate({ to: "/login" });
    }, 50);
    return () => clearTimeout(t);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen" style={{ background: "#050A14" }}>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <h1 className="font-display text-4xl font-bold text-white">
          Welcome back, <span className="text-gradient">{user?.name || "traveler"}</span>
        </h1>
        <p className="mt-2 text-[#94A3B8]">Your dashboard is being prepared.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Upcoming trips", "Saved itineraries", "Live alerts"].map((t) => (
            <GlassCard key={t} className="p-6">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">Section</div>
              <div className="mt-1 font-display text-xl text-white">{t}</div>
              <p className="mt-3 text-sm text-[#94A3B8]">Coming soon.</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-10">
          <GradientButton variant="outline" onClick={() => { logout(); navigate({ to: "/" }); }}>
            Sign out
          </GradientButton>
        </div>
      </main>
    </div>
  );
}
