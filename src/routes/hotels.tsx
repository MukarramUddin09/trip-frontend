import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Star, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { Skeleton } from "@/components/ui/skeleton";
import { hotelApi, type Hotel } from "@/lib/api";

export const Route = createFileRoute("/hotels")({ component: Hotels });

function Hotels() {
  const [city, setCity] = React.useState("Mumbai");
  const [loading, setLoading] = React.useState(false);
  const [hotels, setHotels] = React.useState<Hotel[]>([]);

  const search = async () => {
    setLoading(true);
    try {
      const data = await hotelApi.search({ city, minStars: "3" });
      setHotels(data);
      toast.success(`Found ${data.length} hotels`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    search();
  }, []);

  const book = async (h: Hotel) => {
    const room = h.rooms[0];
    if (!room) return toast.error("No rooms available");
    try {
      const checkIn = new Date();
      const checkOut = new Date();
      checkOut.setDate(checkOut.getDate() + 2);
      await hotelApi.book({
        hotelId: h._id,
        roomType: room.type,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: 2,
        mealPreference: "veg",
      });
      toast.success(`Booked ${h.name}!`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Stay & Hotels" subtitle="Live hotel search from TripAI API." />

      <GlassCard className="p-5 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs text-muted-foreground">City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full mt-1 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm"
          />
        </div>
        <IndigoButton onClick={search} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Search
        </IndigoButton>
      </GlassCard>

      {hotels[0] && (
        <GlassCard className="p-4 border-[var(--teal)]/40 flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-[var(--teal)]" />
          <span className="text-sm">
            Top rated: <strong>{hotels[0].name}</strong> — {hotels[0].starRating}★ · ₹{hotels[0].pricePerNight}/night
          </span>
        </GlassCard>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <GlassCard key={i} className="p-4">
                <Skeleton className="h-32 w-full" />
              </GlassCard>
            ))
          : hotels.map((h) => (
              <GlassCard key={h._id} className="p-4 flex flex-col">
                <div className="font-display font-bold text-lg">{h.name}</div>
                <div className="text-sm text-muted-foreground">{h.address}, {h.city}</div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Star className="h-4 w-4 text-amber-400" />
                  {h.rating?.toFixed(1)} · {h.starRating}★ · ₹{h.pricePerNight}/night
                </div>
                {h.availability != null && (
                  <div className="text-xs text-[var(--teal)] mt-1">{h.availability} rooms left (live)</div>
                )}
                <IndigoButton className="mt-4" onClick={() => book(h)}>
                  Book room
                </IndigoButton>
              </GlassCard>
            ))}
      </div>
    </div>
  );
}
