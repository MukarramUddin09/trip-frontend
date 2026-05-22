/**
 * Loads Razorpay checkout script and opens payment modal.
 */

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(!!window.Razorpay);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export type RazorpayCheckoutParams = {
  key: string;
  orderId: string;
  amount: number;
  currency: string;
  name?: string;
  email?: string;
  onSuccess: (response: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => void;
};

export async function openRazorpayCheckout(params: RazorpayCheckoutParams) {
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
    handler: params.onSuccess,
  });
  rzp.open();
}
