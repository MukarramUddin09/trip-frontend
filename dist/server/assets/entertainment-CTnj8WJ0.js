import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { h as entertainmentApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function EntertainmentPage() {
  const [city, setCity] = reactExports.useState("Mumbai");
  const [items, setItems] = reactExports.useState([]);
  const load = async () => {
    try {
      const data = await entertainmentApi.search(city);
      setItems(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Load failed");
    }
  };
  reactExports.useEffect(() => {
    load();
  }, []);
  const book = async (item) => {
    const tier = item.ticketTiers[0];
    if (!tier) return;
    try {
      await entertainmentApi.book({
        entertainmentId: item._id,
        ticketTier: tier.name,
        ticketCount: 2
      });
      toast.success(`Booked ${item.name}!`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Entertainment", subtitle: "Tourist spots, movies & shows from API." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: city, onChange: (e) => setCity(e.target.value), className: "flex-1 rounded-lg border border-border px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: load, children: "Search" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold", children: item.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground capitalize", children: [
        item.type,
        " · ",
        item.city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm mt-2", children: [
        "Popularity ",
        item.popularity,
        "% · from ₹",
        item.entryFee
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { className: "mt-3", onClick: () => book(item), children: "Book tickets" })
    ] }, item._id)) })
  ] });
}
export {
  EntertainmentPage as component
};
