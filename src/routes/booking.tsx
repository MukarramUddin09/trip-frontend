import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Star, Sparkles, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader, Pill } from "@/components/page";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { travelApi, type TravelResult } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/booking")({ component: Booking });

const TABS = [
  { id: "flight", label: "Flight", icon: "✈" },
  { id: "train", label: "Train", icon: "🚂" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "cab", label: "Cab", icon: "🚕" },
  { id: "bike", label: "Bike", icon: "🏍" },
] as const;

function Booking() {
  const { loading: authLoading } = useAuth();
  const [tab, setTab] = React.useState<(typeof TABS)[number]["id"]>("flight");
  const [from, setFrom] = React.useState("Hyderabad");
  const [to, setTo] = React.useState("Mumbai");
  const [date, setDate] = React.useState(new Date().toISOString().slice(0, 10));
  const [passengers, setPassengers] = React.useState(1);
  const [travelClass, setTravelClass] = React.useState("3A");
  const [loading, setLoading] = React.useState(false);
  const [bookingId, setBookingId] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<TravelResult[]>([]);
  const [recommended, setRecommended] = React.useState<TravelResult | null>(null);

  const search = async () => {
    setLoading(true);
    setBookingId(null);
    try {
      const data = await travelApi.search({
        type: tab,
        from,
        to,
        date,
        passengers,
        class: tab === "train" ? travelClass : undefined,
        preference: "price",
      });
      setResults(data.results || []);
      setRecommended(data.recommended);
      toast.success(`Found ${data.results?.length || 0} options`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const book = async (r: TravelResult) => {
    try {
      const data = await travelApi.book({
        resultId: r.id,
        provider: r.provider,
        type: tab,
        from: r.from || from,
        to: r.to || to,
        departureTime: r.departureTime,
        arrivalTime: r.arrivalTime,
        passengers,
        totalAmount: r.price,
      });
      setBookingId(data.booking._id);
      toast.success(data.confirmation?.message || "Booked!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Travel Booking" subtitle="Live results from TripAI API + mock providers." />

      <div className="relative flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="mr-1.5">{t.icon}</span>
              {t.label}
              {active && (
                <motion.span layoutId="tab-underline" className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--brand)]" />
              )}
            </button>
          );
        })}
      </div>

      <GlassCard className="p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Field label="From" value={from} onChange={setFrom} />
          <Field label="To" value={to} onChange={setTo} />
          <Field label="Date" type="date" value={date} onChange={setDate} />
          {tab === "train" && (
            <Field label="Class" value={travelClass} onChange={setTravelClass} />
          )}
          <Field label="Passengers" type="number" value={String(passengers)} onChange={(v) => setPassengers(Number(v) || 1)} />
        </div>
        <div className="mt-4 flex justify-end">
          <IndigoButton onClick={search} disabled={loading || authLoading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {loading ? "Searching…" : "Search"}
          </IndigoButton>
        </div>
      </GlassCard>

      {recommended && (
        <GlassCard className="p-4 border-[var(--teal)]/40 flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-[var(--teal)]" />
          <span className="text-sm">
            AI pick: <strong>{recommended.provider}</strong> — ₹{recommended.price}
          </span>
        </GlassCard>
      )}

      <div className="space-y-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <GlassCard key={i} className="p-4">
                <Skeleton className="h-20 w-full" />
              </GlassCard>
            ))
          : results.map((r) => (
              <GlassCard key={r.id} className="p-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-semibold">{r.provider}</div>
                  <div className="text-sm text-muted-foreground">
                    {r.duration} · ₹{r.price} · {r.availability} seats
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                    <Star className="h-3 w-3" /> {r.rating}
                  </div>
                </div>
                <IndigoButton onClick={() => book(r)}>Book →</IndigoButton>
              </GlassCard>
            ))}
        {!loading && results.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Search to see live options from the API.</p>
        )}
      </div>

      {bookingId && (
        <GlassCard className="p-4 text-sm text-[var(--teal)]">
          Booking confirmed — ID: {bookingId}
        </GlassCard>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="glass rounded-xl px-3 py-2.5">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm outline-none mt-1"
      />
    </div>
  );
}
