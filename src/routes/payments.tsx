import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";
import { GlassCard, PageHeader, Pill } from "@/components/page";
import { paymentApi, travelApi, type Payment } from "@/lib/api";

export const Route = createFileRoute("/payments")({ component: Payments });

function Payments() {
  const [payments, setPayments] = React.useState<Payment[]>([]);

  React.useEffect(() => {
    paymentApi
      .history()
      .then(setPayments)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Failed to load"));
  }, []);

  const payLatestBooking = async () => {
    try {
      const { bookings } = await travelApi.bookings(1);
      const b = bookings[0];
      if (!b) return toast.error("No bookings — book travel first");
      const data = await paymentApi.initiate({
        bookingId: b._id,
        amount: b.totalAmount,
        method: "upi",
      });
      toast.success(`Payment URL: ${data.paymentUrl}`);
      const hist = await paymentApi.history();
      setPayments(hist);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment failed");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" subtitle="Payment history from TripAI API." actions={
        <button onClick={payLatestBooking} className="text-sm text-[var(--brand)] hover:underline">
          Pay latest booking
        </button>
      } />
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
