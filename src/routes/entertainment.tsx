import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { entertainmentApi, type Entertainment } from "@/lib/api";

export const Route = createFileRoute("/entertainment")({ component: EntertainmentPage });

function EntertainmentPage() {
  const [city, setCity] = React.useState("Mumbai");
  const [items, setItems] = React.useState<Entertainment[]>([]);

  const load = async () => {
    try {
      const data = await entertainmentApi.search(city);
      setItems(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Load failed");
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const book = async (item: Entertainment) => {
    const tier = item.ticketTiers[0];
    if (!tier) return;
    try {
      await entertainmentApi.book({
        entertainmentId: item._id,
        ticketTier: tier.name,
        ticketCount: 2,
      });
      toast.success(`Booked ${item.name}!`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Entertainment" subtitle="Tourist spots, movies & shows from API." />
      <GlassCard className="p-4 flex gap-3">
        <input value={city} onChange={(e) => setCity(e.target.value)} className="flex-1 rounded-lg border border-border px-3 py-2 text-sm" />
        <IndigoButton onClick={load}>Search</IndigoButton>
      </GlassCard>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <GlassCard key={item._id} className="p-4">
            <div className="font-display font-bold">{item.name}</div>
            <div className="text-sm text-muted-foreground capitalize">{item.type} · {item.city}</div>
            <div className="text-sm mt-2">Popularity {item.popularity}% · from ₹{item.entryFee}</div>
            <IndigoButton className="mt-3" onClick={() => book(item)}>
              Book tickets
            </IndigoButton>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
