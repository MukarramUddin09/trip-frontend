import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { a as LoaderCircle, c as Star, j as hotelApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import { S as Skeleton } from "./skeleton-CN00v5hQ.js";
import { S as Sparkles } from "./sparkles-CIHZJOc-.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Hotels() {
  const [city, setCity] = reactExports.useState("Mumbai");
  const [loading, setLoading] = reactExports.useState(false);
  const [hotels, setHotels] = reactExports.useState([]);
  const search = async () => {
    setLoading(true);
    try {
      const data = await hotelApi.search({
        city,
        minStars: "3"
      });
      setHotels(data);
      toast.success(`Found ${data.length} hotels`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Search failed");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    search();
  }, []);
  const book = async (h) => {
    const room = h.rooms[0];
    if (!room) return toast.error("No rooms available");
    try {
      const checkIn = /* @__PURE__ */ new Date();
      const checkOut = /* @__PURE__ */ new Date();
      checkOut.setDate(checkOut.getDate() + 2);
      await hotelApi.book({
        hotelId: h._id,
        roomType: room.type,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: 2,
        mealPreference: "veg"
      });
      toast.success(`Booked ${h.name}!`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Booking failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Stay & Hotels", subtitle: "Live hotel search from TripAI API." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 flex flex-wrap gap-3 items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[200px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs text-muted-foreground", children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: city, onChange: (e) => setCity(e.target.value), className: "w-full mt-1 rounded-lg border border-border bg-card/40 px-3 py-2 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IndigoButton, { onClick: search, disabled: loading, children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : null,
        "Search"
      ] })
    ] }),
    hotels[0] && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 border-[var(--teal)]/40 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-[var(--teal)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
        "Top rated: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: hotels[0].name }),
        " — ",
        hotels[0].starRating,
        "★ · ₹",
        hotels[0].pricePerNight,
        "/night"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: loading ? Array.from({
      length: 4
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" }) }, i)) : hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-lg", children: h.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        h.address,
        ", ",
        h.city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-amber-400" }),
        h.rating?.toFixed(1),
        " · ",
        h.starRating,
        "★ · ₹",
        h.pricePerNight,
        "/night"
      ] }),
      h.availability != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[var(--teal)] mt-1", children: [
        h.availability,
        " rooms left (live)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { className: "mt-4", onClick: () => book(h), children: "Book room" })
    ] }, h._id)) })
  ] });
}
export {
  Hotels as component
};
