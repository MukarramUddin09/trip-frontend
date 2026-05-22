import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { g as createLucideIcon, a as LoaderCircle, d as alertApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton, a as Pill } from "./page-49x7Z3kL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function Alerts() {
  const [city, setCity] = reactExports.useState("Mumbai");
  const [loading, setLoading] = reactExports.useState(false);
  const [alerts, setAlerts] = reactExports.useState([]);
  const load = async () => {
    setLoading(true);
    try {
      const data = await alertApi.list(city);
      setAlerts(data);
      if (!data.length) {
        await alertApi.subscribe(city);
        const weather = await alertApi.weather(city);
        setAlerts(weather);
      }
      toast.success(`Loaded alerts for ${city}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Alerts & Safety", subtitle: "Live alerts from TripAI monitor service." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: city, onChange: (e) => setCity(e.target.value), className: "w-full mt-1 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: load, disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Refresh" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: `p-4 flex gap-3 ${a.severity === "critical" ? "pulse-soft" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 shrink-0 text-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: a.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { tone: a.severity === "critical" ? "red" : "amber", children: a.severity })
        ] })
      ] }, a._id)),
      !loading && !alerts.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "No alerts — monitor runs every 10 min." })
    ] })
  ] });
}
export {
  Alerts as component
};
