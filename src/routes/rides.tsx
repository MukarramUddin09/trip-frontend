import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MapPin, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { travelApi, type TravelResult } from "@/lib/api";
import { useAvailabilityWs } from "@/lib/useAvailabilityWs";

export const Route = createFileRoute("/rides")({ component: Rides });

function Rides() {
  const [from, setFrom] = React.useState("Mumbai Central");
  const [to, setTo] = React.useState("Gateway of India");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<TravelResult[]>([]);
  const [aiPick, setAiPick] = React.useState<TravelResult | null>(null);
  const { latest, connected } = useAvailabilityWs("Mumbai", ["hotel", "flight"]);

  const search = async () => {
    setLoading(true);
    try {
      const data = await travelApi.localRides({ from, to, preference: "price" });
      setResults(data.results || []);
      setAiPick(data.aiRecommended);
      toast.success(`Found ${data.results?.length || 0} rides`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Local Rides"
        subtitle={connected ? "WebSocket connected · live availability" : "Connecting WebSocket…"}
      />

      {latest && (
        <GlassCard className="p-3 text-xs text-muted-foreground">
          Live update: {latest.provider} —{" "}
          {latest.seatsLeft != null ? `${latest.seatsLeft} seats` : `${latest.roomsLeft} rooms`} left
        </GlassCard>
      )}

      <GlassCard className="p-5 grid gap-3 md:grid-cols-3">
        <Field label="Pickup" value={from} onChange={setFrom} icon={<MapPin className="h-4 w-4 text-[var(--brand)]" />} />
        <Field label="Drop" value={to} onChange={setTo} icon={<MapPin className="h-4 w-4 text-[var(--teal)]" />} />
        <IndigoButton onClick={search} disabled={loading} className="self-end">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Find rides"}
        </IndigoButton>
      </GlassCard>

      {aiPick && (
        <GlassCard className="p-4 border-[var(--teal)]/40 flex gap-2">
          <Sparkles className="h-4 w-4 text-[var(--teal)]" />
          <span className="text-sm">
            AI recommends <strong>{aiPick.provider}</strong> — ₹{aiPick.price}
          </span>
        </GlassCard>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {results.map((r) => (
          <GlassCard key={r.id} className="p-4">
            <div className="font-semibold">{r.provider}</div>
            <div className="text-sm text-muted-foreground">
              {r.duration} · ₹{r.price} · ETA from API
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div className="glass rounded-xl px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2 mt-1">
        {icon}
        <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}
