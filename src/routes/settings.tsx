import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { toast } from "sonner";
import { GlassCard, IndigoButton, PageHeader } from "@/components/page";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { authApi } from "@/lib/api";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const { theme, set } = useTheme();
  const { user, refresh } = useAuth();
  const [name, setName] = React.useState(user?.name || "");
  const [phone, setPhone] = React.useState(user?.phone || "");

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [user]);

  const save = async () => {
    try {
      await authApi.updateProfile({ name, phone });
      await refresh();
      toast.success("Profile saved via API");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" subtitle="Account connected to TripAI backend." />
      <GlassCard className="p-6 space-y-5">
        <div className="text-sm text-muted-foreground">
          Logged in as <strong>{user?.email}</strong> ({user?.role})
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Theme</div>
          <div className="flex gap-2">
            {(["dark", "light"] as const).map((t) => (
              <button
                key={t}
                onClick={() => set(t)}
                className={`rounded-md border px-3 py-1.5 text-sm capitalize ${theme === t ? "border-[var(--brand)] text-[var(--brand)]" : "border-border"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Display name</div>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-border bg-card/40 px-3 py-2 text-sm outline-none" />
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Phone</div>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-md border border-border bg-card/40 px-3 py-2 text-sm outline-none" />
        </div>
        <IndigoButton onClick={save}>Save changes</IndigoButton>
      </GlassCard>
    </div>
  );
}
