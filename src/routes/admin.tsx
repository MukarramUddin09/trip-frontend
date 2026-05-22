import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { AdminRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}

function AdminContent() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "#050A14" }}>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#F59E0B]" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
          ✦ Admin Console
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">
          Hello, <span className="text-gradient">{user?.name || "Admin"}</span>
        </h1>
        <p className="mt-2 text-[#94A3B8]">Platform overview &amp; controls ({user?.email}).</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Users", "Bookings", "System health"].map((t) => (
            <GlassCard key={t} className="p-6">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">Module</div>
              <div className="mt-1 font-display text-xl text-white">{t}</div>
              <p className="mt-3 text-sm text-[#94A3B8]">Admin tools placeholder.</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-10">
          <GradientButton variant="outline" onClick={async () => { await logout(); navigate({ to: "/" }); }}>
            Sign out
          </GradientButton>
        </div>
      </main>
    </div>
  );
}
