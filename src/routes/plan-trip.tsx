import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { MapPin, Sparkles, Calendar, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { tripApi } from "@/lib/api";

export const Route = createFileRoute("/plan-trip")({ component: PlanTrip });

function PlanTrip() {
  const [from, setFrom] = React.useState("Hyderabad");
  const [to, setTo] = React.useState("Mumbai");
  const [startDate, setStartDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = React.useState(false);
  const [plan, setPlan] = React.useState<Record<string, unknown> | null>(null);

  const generate = async () => {
    setLoading(true);
    try {
      const data = await tripApi.plan({ from, to, startDate, passengers: 2, preferences: { ranking: "price" } });
      setPlan(data);
      toast.success("Trip plan generated via AI orchestrator");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Planning failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Plan a trip" subtitle="Agent orchestrator compares transport + hotels in parallel." />

      <GlassCard className="p-6 md:p-8 relative overflow-hidden">
        <div className="hero-anim absolute inset-0 -z-10 opacity-70" />
        <div className="grid gap-3 md:grid-cols-3">
          <Input icon={<MapPin className="h-4 w-4 text-[var(--brand)]" />} label="From" value={from} onChange={setFrom} />
          <Input icon={<MapPin className="h-4 w-4 text-[var(--teal)]" />} label="To" value={to} onChange={setTo} />
          <Input icon={<Calendar className="h-4 w-4" />} label="Start date" type="date" value={startDate} onChange={setStartDate} />
        </div>
        <div className="mt-5 flex justify-end">
          <IndigoButton onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate plan →
          </IndigoButton>
        </div>
      </GlassCard>

      {plan && (
        <GlassCard className="p-6">
          <h3 className="font-display font-semibold mb-3">Your AI trip plan</h3>
          <pre className="text-xs overflow-auto max-h-96 bg-card/50 p-4 rounded-lg">
            {JSON.stringify(plan, null, 2)}
          </pre>
          <p className="text-sm text-muted-foreground mt-3">
            Estimated total: ₹{(plan as { estimatedTotal?: number }).estimatedTotal ?? "—"}
          </p>
        </GlassCard>
      )}
    </div>
  );
}

function Input({
  icon,
  label,
  value,
  onChange,
  type = "text",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="glass rounded-xl px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2">
        {icon}
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}
