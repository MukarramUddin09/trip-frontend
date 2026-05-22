import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { a as LoaderCircle, l as travelApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import { M as MapPin } from "./map-pin-BpC09woJ.js";
import { S as Sparkles } from "./sparkles-CIHZJOc-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const WS_URL = "ws://localhost:5000/ws";
function useAvailabilityWs(city, categories = ["hotel", "flight"]) {
  const [latest, setLatest] = reactExports.useState(null);
  const [connected, setConnected] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const ws = new WebSocket(WS_URL);
    let cancelled = false;
    ws.onopen = () => {
      if (cancelled) {
        ws.close();
        return;
      }
      setConnected(true);
      ws.send(JSON.stringify({ type: "subscribe", city, categories }));
    };
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data.type === "availability_update") setLatest(data);
      } catch {
      }
    };
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    return () => {
      cancelled = true;
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
  }, [city, categories.join(",")]);
  return { latest, connected };
}
function Rides() {
  const [from, setFrom] = reactExports.useState("Mumbai Central");
  const [to, setTo] = reactExports.useState("Gateway of India");
  const [loading, setLoading] = reactExports.useState(false);
  const [results, setResults] = reactExports.useState([]);
  const [aiPick, setAiPick] = reactExports.useState(null);
  const {
    latest,
    connected
  } = useAvailabilityWs("Mumbai", ["hotel", "flight"]);
  const search = async () => {
    setLoading(true);
    try {
      const data = await travelApi.localRides({
        from,
        to,
        preference: "price"
      });
      setResults(data.results || []);
      setAiPick(data.aiRecommended);
      toast.success(`Found ${data.results?.length || 0} rides`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Local Rides", subtitle: connected ? "WebSocket connected · live availability" : "Connecting WebSocket…" }),
    latest && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-3 text-xs text-muted-foreground", children: [
      "Live update: ",
      latest.provider,
      " —",
      " ",
      latest.seatsLeft != null ? `${latest.seatsLeft} seats` : `${latest.roomsLeft} rooms`,
      " left"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 grid gap-3 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pickup", value: from, onChange: setFrom, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[var(--brand)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Drop", value: to, onChange: setTo, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[var(--teal)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: search, disabled: loading, className: "self-end", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Find rides" })
    ] }),
    aiPick && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 border-[var(--teal)]/40 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[var(--teal)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        "AI recommends ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: aiPick.provider }),
        " — ₹",
        aiPick.price
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: r.provider }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        r.duration,
        " · ₹",
        r.price,
        " · ETA from API"
      ] })
    ] }, r.id)) })
  ] });
}
function Field({
  label,
  value,
  onChange,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "flex-1 bg-transparent text-sm outline-none" })
    ] })
  ] });
}
export {
  Rides as component
};
