import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { g as createLucideIcon, a as LoaderCircle, n as tripApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import { M as MapPin } from "./map-pin-BpC09woJ.js";
import { S as Sparkles } from "./sparkles-CIHZJOc-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function PlanTrip() {
  const [from, setFrom] = reactExports.useState("Hyderabad");
  const [to, setTo] = reactExports.useState("Mumbai");
  const [startDate, setStartDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [loading, setLoading] = reactExports.useState(false);
  const [plan, setPlan] = reactExports.useState(null);
  const generate = async () => {
    setLoading(true);
    try {
      const data = await tripApi.plan({
        from,
        to,
        startDate,
        passengers: 2,
        preferences: {
          ranking: "price"
        }
      });
      setPlan(data);
      toast.success("Trip plan generated via AI orchestrator");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Planning failed");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Plan a trip", subtitle: "Agent orchestrator compares transport + hotels in parallel." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 md:p-8 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-anim absolute inset-0 -z-10 opacity-70" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[var(--brand)]" }), label: "From", value: from, onChange: setFrom }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-[var(--teal)]" }), label: "To", value: to, onChange: setTo }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }), label: "Start date", type: "date", value: startDate, onChange: setStartDate })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IndigoButton, { onClick: generate, disabled: loading, children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        "Generate plan →"
      ] }) })
    ] }),
    plan && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold mb-3", children: "Your AI trip plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs overflow-auto max-h-96 bg-card/50 p-4 rounded-lg", children: JSON.stringify(plan, null, 2) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-3", children: [
        "Estimated total: ₹",
        plan.estimatedTotal ?? "—"
      ] })
    ] })
  ] });
}
function Input({
  icon,
  label,
  value,
  onChange,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-3 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wide text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "flex-1 bg-transparent text-sm outline-none" })
    ] })
  ] });
}
export {
  PlanTrip as component
};
