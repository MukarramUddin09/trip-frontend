import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { itineraryApi, type Itinerary } from "@/lib/api";

export const Route = createFileRoute("/itineraries")({ component: Itineraries });

function Itineraries() {
  const [list, setList] = React.useState<Itinerary[]>([]);

  const load = () =>
    itineraryApi
      .list()
      .then(setList)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Load failed"));

  React.useEffect(() => {
    load();
  }, []);

  const create = async () => {
    try {
      await itineraryApi.create({
        title: "Mumbai Weekend",
        destination: "Mumbai",
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
        tripType: "leisure",
        totalBudget: 25000,
      });
      toast.success("Itinerary created");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Create failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Itineraries"
        subtitle="CRUD via TripAI itineraries API."
        actions={<IndigoButton onClick={create}>+ New itinerary</IndigoButton>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((it) => (
          <GlassCard key={it._id} className="p-5">
            <div className="font-display font-bold">{it.title}</div>
            <div className="text-sm text-muted-foreground">{it.destination}</div>
            <div className="text-xs mt-2 capitalize">{it.status}</div>
          </GlassCard>
        ))}
        {!list.length && <p className="text-sm text-muted-foreground">Create your first itinerary.</p>}
      </div>
    </div>
  );
}
