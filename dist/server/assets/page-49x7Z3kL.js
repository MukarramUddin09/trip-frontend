import { I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { f as cn } from "./router-26JqOd2M.js";
function PageHeader({
  title,
  subtitle,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-wrap items-end justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl md:text-3xl font-bold tracking-tight", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle })
    ] }),
    actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: actions })
  ] });
}
function GlassCard({
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...rest, className: cn("glass rounded-2xl", className), children });
}
function Pill({ children, tone = "default" }) {
  const tones = {
    default: "bg-muted text-foreground/80",
    teal: "bg-[color-mix(in_oklab,var(--teal)_18%,transparent)] text-[var(--teal)]",
    indigo: "bg-[color-mix(in_oklab,var(--brand)_18%,transparent)] text-[var(--brand)]",
    green: "bg-emerald-500/15 text-emerald-500",
    amber: "bg-amber-500/15 text-amber-500",
    red: "bg-red-500/15 text-red-500"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone]), children });
}
function IndigoButton({ className, children, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      ...rest,
      className: cn(
        "btn-shimmer inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition-all hover-glow",
        className
      ),
      children
    }
  );
}
export {
  GlassCard as G,
  IndigoButton as I,
  PageHeader as P,
  Pill as a
};
