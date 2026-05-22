import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {
  MapPin, Plane, TrendingDown, Clock, Bell, Train, Hotel,
  CheckCircle2, AlertCircle, XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader, Pill } from "@/components/page";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { travelApi, hotelApi, alertApi, type Booking } from "@/lib/api";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function StatusBadge({ s }: { s: string }) {
  if (s === "confirmed") return <Pill tone="green"><CheckCircle2 className="h-3 w-3" /> Confirmed</Pill>;
  if (s === "pending") return <Pill tone="amber"><AlertCircle className="h-3 w-3" /> Pending</Pill>;
  return <Pill tone="red"><XCircle className="h-3 w-3" /> {s}</Pill>;
}

function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [trips, setTrips] = React.useState<Booking[]>([]);
  const [alertCount, setAlertCount] = React.useState(0);
  const [from, setFrom] = React.useState("Hyderabad");
  const [to, setTo] = React.useState("Mumbai");

  React.useEffect(() => {
    if (authLoading) return;
    (async () => {
      try {
        const [travel, hotels, alerts] = await Promise.all([
          travelApi.bookings(1),
          hotelApi.bookings().catch(() => ({ bookings: [] })),
          alertApi.list("Mumbai").catch(() => []),
        ]);
        setTrips([...travel.bookings, ...(hotels.bookings || [])].slice(0, 8));
        setAlertCount(alerts.length);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Dashboard load failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [authLoading]);

  const quickSearch = async () => {
    try {
      const data = await travelApi.search({
        type: "flight",
        from,
        to,
        date: new Date().toISOString(),
        passengers: 1,
      });
      toast.success(`Found ${data.results?.length || 0} flights — open Travel Booking for details`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
    }
  };

  const confirmed = trips.filter((t) => t.status === "confirmed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Traveller"} 👋`}
        subtitle="Live data from TripAI backend."
      />
      <GlassCard className="relative overflow-hidden p-6 md:p-8">
        <div className="hero-anim absolute inset-0 -z-10 opacity-80" />
        <h2 className="font-display text-[28px] md:text-[32px] font-bold leading-tight">Where are you going?</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <Field label="From" value={from} onChange={setFrom} icon={<MapPin className="h-4 w-4 text-[var(--brand)]" />} />
          <Field label="To" value={to} onChange={setTo} icon={<MapPin className="h-4 w-4 text-[var(--teal)]" />} />
          <IndigoButton className="lg:self-end" onClick={quickSearch}>Find Best Options →</IndigoButton>
        </div>
      </GlassCard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Plane className="h-5 w-5" />} label="Total bookings" value={String(trips.length)} tint="teal" />
        <Stat icon={<TrendingDown className="h-5 w-5" />} label="Confirmed" value={String(confirmed)} tint="green" />
        <Stat icon={<Clock className="h-5 w-5" />} label="Pending" value={String(trips.filter((t) => t.status === "pending").length)} tint="amber" />
        <Stat icon={<Bell className="h-5 w-5" />} label="Mumbai alerts" value={String(alertCount)} tint="coral" />
      </div>
      <GlassCard className="p-6">
        <h3 className="font-display text-lg font-semibold mb-4">Recent Activity (API)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left py-2">Type</th>
                <th className="text-left py-2">Provider</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}><td colSpan={4} className="py-3"><Skeleton className="h-4 w-full" /></td></tr>
                  ))
                : trips.map((t) => (
                    <tr key={t._id} className="border-b border-border/60">
                      <td className="py-3 capitalize">{t.type}</td>
                      <td className="py-3">{t.provider}</td>
                      <td className="py-3 font-semibold">₹{t.totalAmount}</td>
                      <td className="py-3"><StatusBadge s={t.status} /></td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {!loading && !trips.length && (
            <p className="text-sm text-muted-foreground py-4 text-center">No bookings yet — use Travel Booking or Hotels.</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}

function Field({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="glass rounded-xl px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2">
        {icon}
        <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}

function Stat({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: string; tint: "teal" | "green" | "amber" | "coral" }) {
  const map = {
    teal: "text-[var(--teal)] bg-[color-mix(in_oklab,var(--teal)_18%,transparent)]",
    green: "text-emerald-500 bg-emerald-500/15",
    amber: "text-amber-500 bg-amber-500/15",
    coral: "text-[color:#FF6B6B] bg-[#FF6B6B]/15",
  } as const;
  return (
    <GlassCard className="p-5">
      <div className={`grid h-10 w-10 place-items-center rounded-lg ${map[tint]}`}>{icon}</div>
      <div className="mt-4 text-2xl font-display font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </GlassCard>
  );
}
