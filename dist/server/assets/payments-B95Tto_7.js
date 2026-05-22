import { Q as reactExports, I as jsxRuntimeExports } from "./server-JUmjKwJO.js";
import { u as useAuth, p as paymentApi, t as toast, l as travelApi } from "./router-26JqOd2M.js";
import { P as PageHeader, G as GlassCard, a as Pill } from "./page-49x7Z3kL.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(!!window.Razorpay);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
async function openRazorpayCheckout(params) {
  const ok = await loadRazorpayScript();
  if (!ok || !window.Razorpay) throw new Error("Could not load Razorpay checkout");
  const rzp = new window.Razorpay({
    key: params.key,
    amount: params.amount,
    currency: params.currency,
    name: params.name || "TripAI",
    description: "Travel booking payment",
    order_id: params.orderId,
    prefill: { email: params.email },
    theme: { color: "#3B82F6" },
    handler: params.onSuccess
  });
  rzp.open();
}
function Payments() {
  const {
    user
  } = useAuth();
  const [payments, setPayments] = reactExports.useState([]);
  const [paying, setPaying] = reactExports.useState(false);
  reactExports.useEffect(() => {
    paymentApi.history().then(setPayments).catch((e) => toast.error(e instanceof Error ? e.message : "Failed to load"));
  }, []);
  const payLatestBooking = async () => {
    try {
      setPaying(true);
      const {
        bookings
      } = await travelApi.bookings(1);
      const b = bookings[0];
      if (!b) return toast.error("No bookings — book travel first");
      const data = await paymentApi.initiate({
        bookingId: b._id,
        amount: b.totalAmount,
        method: "card"
      });
      await openRazorpayCheckout({
        key: data.razorpayKeyId,
        orderId: data.order.id,
        amount: data.order.amount,
        currency: data.order.currency,
        email: user?.email,
        onSuccess: async (response) => {
          await paymentApi.verify({
            paymentId: data.payment._id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
          toast.success("Payment successful! Use test card 4111 1111 1111 1111 in Razorpay test mode.");
          setPayments(await paymentApi.history());
        }
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setPaying(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Payments", subtitle: "Pay with Razorpay (test card: 4111 1111 1111 1111, any future expiry/CVV).", actions: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: payLatestBooking, disabled: paying, className: "text-sm text-[var(--brand)] hover:underline disabled:opacity-50", children: paying ? "Opening checkout…" : "Pay latest booking" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-6 overflow-x-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-xs text-muted-foreground border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: payments.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3", children: [
            "₹",
            p.amount
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 capitalize", children: p.method }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { tone: p.status === "success" ? "green" : "amber", children: p.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-muted-foreground", children: new Date(p.createdAt).toLocaleDateString() })
        ] }, p._id)) })
      ] }),
      !payments.length && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4", children: "No payments yet." })
    ] })
  ] });
}
export {
  Payments as component
};
