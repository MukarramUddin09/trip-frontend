import { I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { A as AdminRoute, u as useAuth, o as useNavigate } from "./router-26JqOd2M.js";
import { N as Navbar, G as GlassCard, a as GradientButton } from "./GlassCard-DMOMiWU3.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./plane-PAa-47lh.js";
function AdminPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AdminContent, {}) });
}
function AdminContent() {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: "#050A14"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-6 pt-32 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#F59E0B]", style: {
        background: "rgba(245,158,11,0.1)",
        border: "1px solid rgba(245,158,11,0.3)"
      }, children: "✦ Admin Console" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-4xl font-bold text-white", children: [
        "Hello, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: user?.name || "Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-[#94A3B8]", children: [
        "Platform overview & controls (",
        user?.email,
        ")."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 md:grid-cols-3", children: ["Users", "Bookings", "System health"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-wider text-[#64748B]", children: "Module" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-xl text-white", children: t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-[#94A3B8]", children: "Admin tools placeholder." })
      ] }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientButton, { variant: "outline", onClick: async () => {
        await logout();
        navigate({
          to: "/"
        });
      }, children: "Sign out" }) })
    ] })
  ] });
}
export {
  AdminPage as component
};
