import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";
import { GlassCard, PageHeader, Pill } from "@/components/page";
import { paymentApi, travelApi, type Payment } from "@/lib/api";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/payments")({ component: Payments });

function Payments() {
  const { user } = useAuth();
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [paying, setPaying] = React.useState(false);

  React.useEffect(() => {
    paymentApi
      .history()
      .then(setPayments)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Failed to load"));
  }, []);

  const payLatestBooking = async () => {
    try {
      setPaying(true);
      const { bookings } = await travelApi.bookings(1);
      const b = bookings[0];
      if (!b) return toast.error("No bookings — book travel first");

      const data = await paymentApi.initiate({
        bookingId: b._id,
        amount: b.totalAmount,
        method: "card",
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
            razorpay_signature: response.razorpay_signature,
          });
          toast.success("Payment successful! Use test card 4111 1111 1111 1111 in Razorpay test mode.");
          setPayments(await paymentApi.history());
        },
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        subtitle="Pay with Razorpay (test card: 4111 1111 1111 1111, any future expiry/CVV)."
        actions={
          <button
            onClick={payLatestBooking}
            disabled={paying}
            className="text-sm text-[var(--brand)] hover:underline disabled:opacity-50"
          >
            {paying ? "Opening checkout…" : "Pay latest booking"}
          </button>
        }
      />
      <GlassCard className="p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Method</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-b border-border/60">
                <td className="py-3">₹{p.amount}</td>
                <td className="py-3 capitalize">{p.method}</td>
                <td className="py-3">
                  <Pill tone={p.status === "success" ? "green" : "amber"}>{p.status}</Pill>
                </td>
                <td className="py-3 text-muted-foreground">{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!payments.length && <p className="text-sm text-muted-foreground py-4">No payments yet.</p>}
      </GlassCard>
    </div>
  );
}
