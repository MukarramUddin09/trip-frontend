import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { g as createLucideIcon, u as useAuth, l as travelApi, j as hotelApi, d as alertApi, t as toast, B as Bell } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton, a as Pill } from "./page-49x7Z3kL.js";
import { S as Skeleton } from "./skeleton-CN00v5hQ.js";
import { M as MapPin } from "./map-pin-BpC09woJ.js";
import { P as Plane } from "./plane-PAa-47lh.js";
import { C as CircleCheck } from "./circle-check-BZCjSPJY.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function StatusBadge({
  s
}) {
  if (s === "confirmed") return /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { tone: "green", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
    " Confirmed"
  ] });
  if (s === "pending") return /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { tone: "amber", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
    " Pending"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { tone: "red", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
    " ",
    s
  ] });
}
function Dashboard() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const [loading, setLoading] = reactExports.useState(true);
  const [trips, setTrips] = reactExports.useState([]);
  const [alertCount, setAlertCount] = reactExports.useState(0);
  const [from, setFrom] = reactExports.useState("Hyderabad");
  const [to, setTo] = reactExports.useState("Mumbai");
  reactExports.useEffect(() => {
    if (authLoading) return;
    (async () => {
      try {
        const [travel, hotels, alerts] = await Promise.all([travelApi.bookings(1), hotelApi.bookings().catch(() => ({
          bookings: []
        })), alertApi.list("Mumbai").catch(() => [])]);
        setTrips([...travel.bookings, ...hotels.bookings || []].slice(0, 8));
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
        date: (/* @__PURE__ */ new Date()).toISOString(),
        passengers: 1
      });
      toast.success(`Found ${data.results?.length || 0} flights — open Travel Booking for details`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
    }
  };
  const confirmed = trips.filter((t) => t.status === "confirmed").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: `Welcome back, ${user?.name?.split(" ")[0] || "Traveller"} 👋`, subtitle: "Live data from TripAI backend." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "relative overflow-hidden p-6 md:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-anim absolute inset-0 -z-10 opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[28px] md:text-[32px] font-bold leading-tight", children: "Where are you going?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "From", value: from, onChange: setFrom, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[var(--brand)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "To", value: to, onChange: setTo, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[var(--teal)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { className: "lg:self-end", onClick: quickSearch, children: "Find Best Options →" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { className: "h-5 w-5" }), label: "Total bookings", value: String(trips.length), tint: "teal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-5 w-5" }), label: "Confirmed", value: String(confirmed), tint: "green" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }), label: "Pending", value: String(trips.filter((t) => t.status === "pending").length), tint: "amber" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }), label: "Mumbai alerts", value: String(alertCount), tint: "coral" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-4", children: "Recent Activity (API)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Provider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: loading ? Array.from({
            length: 3
          }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }) }, i)) : trips.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 capitalize", children: t.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: t.provider }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 font-semibold", children: [
              "₹",
              t.totalAmount
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { s: t.status }) })
          ] }, t._id)) })
        ] }),
        !loading && !trips.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "No bookings yet — use Travel Booking or Hotels." })
      ] })
    ] })
  ] });
}
function Field({
  icon,
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "flex-1 bg-transparent text-sm outline-none" })
    ] })
  ] });
}
function Stat({
  icon,
  label,
  value,
  tint
}) {
  const map = {
    teal: "text-[var(--teal)] bg-[color-mix(in_oklab,var(--teal)_18%,transparent)]",
    green: "text-emerald-500 bg-emerald-500/15",
    amber: "text-amber-500 bg-amber-500/15",
    coral: "text-[color:#FF6B6B] bg-[#FF6B6B]/15"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid h-10 w-10 place-items-center rounded-lg ${map[tint]}`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-2xl font-display font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-1", children: label })
  ] });
}
export {
  Dashboard as component
};
