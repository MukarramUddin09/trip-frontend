import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { k as itineraryApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, I as IndigoButton, G as GlassCard } from "./page-49x7Z3kL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Itineraries() {
  const [list, setList] = reactExports.useState([]);
  const load = () => itineraryApi.list().then(setList).catch((e) => toast.error(e instanceof Error ? e.message : "Load failed"));
  reactExports.useEffect(() => {
    load();
  }, []);
  const create = async () => {
    try {
      await itineraryApi.create({
        title: "Mumbai Weekend",
        destination: "Mumbai",
        startDate: (/* @__PURE__ */ new Date()).toISOString(),
        endDate: new Date(Date.now() + 3 * 864e5).toISOString(),
        tripType: "leisure",
        totalBudget: 25e3
      });
      toast.success("Itinerary created");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Create failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "My Itineraries", subtitle: "CRUD via TripAI itineraries API.", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: create, children: "+ New itinerary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      list.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: it.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: it.destination }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs mt-2 capitalize", children: it.status })
      ] }, it._id)),
      !list.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first itinerary." })
    ] })
  ] });
}
export {
  Itineraries as component
};
