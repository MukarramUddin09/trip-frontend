import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { u as useAuth, o as useNavigate, L as Link, t as toast } from "./router-26JqOd2M.js";
import { N as Navbar, G as GlassCard, a as GradientButton } from "./GlassCard-DMOMiWU3.js";
import { G as GoogleSignInButton } from "./GoogleSignInButton-BAyWRaKK.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./plane-PAa-47lh.js";
function SignupPage() {
  const {
    loginWithGoogle,
    register
  } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("9876543210");
  const [busy, setBusy] = reactExports.useState(false);
  const onGoogle = async (credential) => {
    try {
      setBusy(true);
      const dest = await loginWithGoogle(credential);
      navigate({
        to: dest
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Google sign-up failed");
    } finally {
      setBusy(false);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) return;
    try {
      setBusy(true);
      const dest = await register({
        name,
        email,
        password,
        phone
      });
      navigate({
        to: dest
      });
    } catch (e2) {
      toast.error(e2 instanceof Error ? e2.message : "Sign up failed");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: "#050A14"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto flex min-h-screen max-w-md items-center px-6 pt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "w-full p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-white", children: "Create account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[#94A3B8]", children: "Sign up with Google or email." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleSignInButton, { onSuccess: onGoogle }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-6 text-center text-xs text-[#64748B]", children: "or register with email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Name", type: "text", value: name, onChange: setName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", type: "email", value: email, onChange: setEmail }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Phone", type: "tel", value: phone, onChange: setPhone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Password", type: "password", value: password, onChange: setPassword }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GradientButton, { size: "lg", className: "w-full", disabled: busy, children: "Get Started Free" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-[#94A3B8]", children: [
        "Already have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-gradient font-medium", children: "Sign in" })
      ] })
    ] }) })
  ] });
}
function Input({
  label,
  type,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-[#64748B]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "mt-1 w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none", style: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(99,179,237,0.12)"
    } })
  ] });
}
export {
  SignupPage as component
};
