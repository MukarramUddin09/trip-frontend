import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { q as useTheme, u as useAuth, e as authApi, t as toast } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, I as IndigoButton } from "./page-49x7Z3kL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function SettingsPage() {
  const {
    theme,
    set
  } = useTheme();
  const {
    user,
    refresh
  } = useAuth();
  const [name, setName] = reactExports.useState(user?.name || "");
  const [phone, setPhone] = reactExports.useState(user?.phone || "");
  reactExports.useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [user]);
  const save = async () => {
    try {
      await authApi.updateProfile({
        name,
        phone
      });
      await refresh();
      toast.success("Profile saved via API");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Settings", subtitle: "Account connected to TripAI backend." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "Logged in as ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user?.email }),
        " (",
        user?.role,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Theme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["dark", "light"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => set(t), className: `rounded-md border px-3 py-1.5 text-sm capitalize ${theme === t ? "border-[var(--brand)] text-[var(--brand)]" : "border-border"}`, children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Display name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-md border border-border bg-card/40 px-3 py-2 text-sm outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium mb-2", children: "Phone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), className: "w-full rounded-md border border-border bg-card/40 px-3 py-2 text-sm outline-none" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndigoButton, { onClick: save, children: "Save changes" })
    ] })
  ] });
}
export {
  SettingsPage as component
};
