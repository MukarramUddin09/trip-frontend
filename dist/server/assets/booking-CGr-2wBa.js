import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { u as useAuth, m as motion, f as cn, a as LoaderCircle, S as Search, c as Star, l as travelApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import { S as Skeleton } from "./skeleton-CN00v5hQ.js";
import { S as Sparkles } from "./sparkles-CIHZJOc-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const TABS = [{
  id: "flight",
  label: "Flight",
  icon: "✈"
}, {
  id: "train",
  label: "Train",
  icon: "🚂"
}, {
  id: "bus",
  label: "Bus",
  icon: "🚌"
}, {
  id: "cab",
  label: "Cab",
  icon: "🚕"
}, {
  id: "bike",
  label: "Bike",
  icon: "🏍"
}];
function Booking() {
  const {
    loading: authLoading
  } = useAuth();
  const [tab, setTab] = reactExports.useState("flight");
  const [from, setFrom] = reactExports.useState("Hyderabad");
  const [to, setTo] = reactExports.useState("Mumbai");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [passengers, setPassengers] = reactExports.useState(1);
  const [travelClass, setTravelClass] = reactExports.useState("3A");
  const [loading, setLoading] = reactExports.useState(false);
  const [bookingId, setBookingId] = reactExports.useState(null);
  const [results, setResults] = reactExports.useState([]);
  const [recommended, setRecommended] = reactExports.useState(null);
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
        class: tab === "train" ? travelClass : void 0,
        preference: "price"
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
  const book = async (r) => {
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
        totalAmount: r.price
      });
      setBookingId(data.booking._id);
      toast.success(data.confirmation?.message || "Booked!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Travel Booking", subtitle: "Live results from TripAI API + mock providers." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex gap-1 overflow-x-auto border-b border-border", children: TABS.map((t) => {
      const active = tab === t.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.id), className: cn("relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1.5", children: t.icon }),
        t.label,
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { layoutId: "tab-underline", className: "absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[var(--brand)]" })
      ] }, t.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 md:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "From", value: from, onChange: setFrom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "To", value: to, onChange: setTo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", type: "date", value: date, onChange: setDate }),
        tab === "train" && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Class", value: travelClass, onChange: setTravelClass }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Passengers", type: "number", value: String(passengers), onChange: (v) => setPassengers(Number(v) || 1) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IndigoButton, { onClick: search, disabled: loading || authLoading, children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4" }),
        loading ? "Searching…" : "Search"
      ] }) })
    ] }),
    recommended && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 border-[var(--teal)]/40 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[var(--teal)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        "AI pick: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: recommended.provider }),
        " — ₹",
        recommended.price
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      loading ? Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }) }, i)) : results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex flex-wrap items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: r.provider }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            r.duration,
            " · ₹",
            r.price,
            " · ",
            r.availability,
            " seats"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-amber-400 text-xs mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
            " ",
            r.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: () => book(r), children: "Book →" })
      ] }, r.id)),
      !loading && results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "Search to see live options from the API." })
    ] }),
    bookingId && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 text-sm text-[var(--teal)]", children: [
      "Booking confirmed — ID: ",
      bookingId
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "w-full bg-transparent text-sm outline-none mt-1" })
  ] });
}
export {
  Booking as component
};
