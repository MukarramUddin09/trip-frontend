import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { i as feedbackApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function FeedbackPage() {
  const [provider, setProvider] = reactExports.useState("IndiGo");
  const [rating, setRating] = reactExports.useState(5);
  const [comment, setComment] = reactExports.useState("");
  const [history, setHistory] = reactExports.useState([]);
  const load = () => feedbackApi.mine().then(setHistory).catch(() => {
  });
  reactExports.useEffect(() => {
    load();
  }, []);
  const submit = async () => {
    try {
      await feedbackApi.submit({
        provider,
        providerType: "flight",
        rating,
        comment,
        tags: ["on-time"]
      });
      toast.success("Feedback submitted — provider score updated");
      setComment("");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submit failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Feedback", subtitle: "Rates providers via EMA scoring API." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: provider, onChange: (e) => setProvider(e.target.value), placeholder: "Provider", className: "w-full rounded-lg border border-border px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 5, value: rating, onChange: (e) => setRating(Number(e.target.value)), className: "w-full rounded-lg border border-border px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Comment", className: "w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[80px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: submit, children: "Submit feedback" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-3", children: "Your history" }),
      history.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm py-2 border-b border-border/50", children: [
        f.provider,
        " — ",
        f.rating,
        "★ — ",
        f.comment
      ] }, f._id)),
      !history.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No feedback yet." })
    ] })
  ] });
}
export {
  FeedbackPage as component
};
