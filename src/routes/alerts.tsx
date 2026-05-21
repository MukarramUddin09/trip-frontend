import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { CloudRain, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GlassCard, PageHeader, Pill, IndigoButton } from "@/components/page";
import { alertApi, type Alert } from "@/lib/api";

export const Route = createFileRoute("/alerts")({ component: Alerts });

function Alerts() {
  const [city, setCity] = React.useState("Mumbai");
  const [loading, setLoading] = React.useState(false);
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await alertApi.list(city);
      setAlerts(data);
      if (!data.length) {
        await alertApi.subscribe(city);
        const weather = await alertApi.weather(city);
        setAlerts(weather);
      }
      toast.success(`Loaded alerts for ${city}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Alerts & Safety" subtitle="Live alerts from TripAI monitor service." />

      <GlassCard className="p-4 flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground">City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full mt-1 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm"
          />
        </div>
        <IndigoButton onClick={load} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
        </IndigoButton>
      </GlassCard>

      <div className="grid gap-3">
        {alerts.map((a) => (
          <GlassCard key={a._id} className={`p-4 flex gap-3 ${a.severity === "critical" ? "pulse-soft" : ""}`}>
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <div className="font-medium">{a.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{a.message}</p>
              <Pill tone={a.severity === "critical" ? "red" : "amber"}>{a.severity}</Pill>
            </div>
          </GlassCard>
        ))}
        {!loading && !alerts.length && (
          <p className="text-sm text-muted-foreground text-center">No alerts — monitor runs every 10 min.</p>
        )}
      </div>
    </div>
  );
}
