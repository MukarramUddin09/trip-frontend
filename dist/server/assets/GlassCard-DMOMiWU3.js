import { I as jsxRuntimeExports, Q as reactExports } from "./server-JUmjKwJO.js";
import { u as useAuth, o as useNavigate, L as Link, b as LogOut, M as Menu, X } from "./router-26JqOd2M.js";
import { P as Plane } from "./plane-PAa-47lh.js";
const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-base"
};
function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const base = "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium font-display tracking-tight transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60 disabled:opacity-50";
  if (variant === "outline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ...rest,
        className: `${base} ${SIZES[size]} ${className}`,
        style: {
          background: "linear-gradient(#050A14,#050A14) padding-box, linear-gradient(135deg,#3B82F6,#06B6D4,#8B5CF6) border-box",
          border: "1px solid transparent",
          color: "transparent",
          backgroundClip: "padding-box, border-box",
          ...rest.style
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      ...rest,
      className: `${base} ${SIZES[size]} text-white shadow-lg ${className}`,
      style: {
        background: "linear-gradient(135deg,#3B82F6 0%,#06B6D4 100%)",
        boxShadow: "0 8px 24px rgba(59,130,246,0.35)",
        ...rest.style
      },
      children
    }
  );
}
const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" }
];
function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate({ to: "/" });
  };
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "fixed inset-x-0 top-0 z-50 transition-all duration-300",
      style: {
        background: scrolled ? "rgba(5,10,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,179,237,0.1)" : "1px solid transparent"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "grid h-8 w-8 place-items-center rounded-lg",
                style: { background: "linear-gradient(135deg,#3B82F6,#06B6D4)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { size: 16, className: "text-white" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-bold tracking-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Trip" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "AI" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden items-center gap-8 md:flex", children: LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: l.href,
              className: "font-body text-sm text-[#94A3B8] transition-colors duration-200 hover:text-white",
              children: l.label
            }
          ) }, l.label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden items-center gap-3 md:flex", children: user && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/dashboard",
                className: "rounded-lg px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:bg-white/5 hover:text-white",
                children: "Dashboard"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientButton, { variant: "outline", size: "sm", onClick: handleLogout, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
              "Log Out"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/login",
                className: "rounded-lg px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:bg-white/5 hover:text-white",
                children: "Sign In"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientButton, { size: "sm", children: "Get Started Free" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              "aria-label": "Menu",
              className: "md:hidden rounded-lg p-2 text-white hover:bg-white/5",
              onClick: () => setOpen(true),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 22 })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "fixed inset-0 z-[60] flex flex-col",
            style: { background: "rgba(5,10,20,0.97)", backdropFilter: "blur(24px)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl font-bold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "Trip" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "AI" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    "aria-label": "Close",
                    onClick: () => setOpen(false),
                    className: "rounded-lg p-2 text-white hover:bg-white/5",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 22 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-8 flex flex-col items-center gap-6 px-6", children: [
                LINKS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, onClick: () => setOpen(false), className: "font-display text-2xl text-white", children: l.label }) }, l.label)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mt-6 flex w-64 flex-col items-stretch gap-3", children: user && !loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientButton, { size: "md", className: "w-full", children: "Dashboard" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(GradientButton, { variant: "outline", size: "md", className: "w-full", onClick: handleLogout, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18 }),
                    "Log Out"
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientButton, { variant: "outline", size: "md", className: "w-full", children: "Sign In" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", onClick: () => setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradientButton, { size: "md", className: "w-full", children: "Get Started Free" }) })
                ] }) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function GlassCard({
  children,
  className = "",
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ...rest,
      className: `relative ${className}`,
      style: {
        background: "rgba(13,21,38,0.7)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(99,179,237,0.1)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        ...rest.style || {}
      },
      children
    }
  );
}
export {
  GlassCard as G,
  Navbar as N,
  GradientButton as a
};
