import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { feedbackApi, type Feedback } from "@/lib/api";

export const Route = createFileRoute("/feedback")({ component: FeedbackPage });

function FeedbackPage() {
  const [provider, setProvider] = React.useState("IndiGo");
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [history, setHistory] = React.useState<Feedback[]>([]);

  const load = () =>
    feedbackApi
      .mine()
      .then(setHistory)
      .catch(() => {});

  React.useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    try {
      await feedbackApi.submit({
        provider,
        providerType: "flight",
        rating,
        comment,
        tags: ["on-time"],
      });
      toast.success("Feedback submitted — provider score updated");
      setComment("");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submit failed");
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <PageHeader title="Feedback" subtitle="Rates providers via EMA scoring API." />
      <GlassCard className="p-6 space-y-4">
        <input value={provider} onChange={(e) => setProvider(e.target.value)} placeholder="Provider" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" className="w-full rounded-lg border border-border px-3 py-2 text-sm min-h-[80px]" />
        <IndigoButton onClick={submit}>Submit feedback</IndigoButton>
      </GlassCard>
      <GlassCard className="p-6">
        <h3 className="font-semibold mb-3">Your history</h3>
        {history.map((f) => (
          <div key={f._id} className="text-sm py-2 border-b border-border/50">
            {f.provider} — {f.rating}★ — {f.comment}
          </div>
        ))}
        {!history.length && <p className="text-sm text-muted-foreground">No feedback yet.</p>}
      </GlassCard>
    </div>
  );
}
