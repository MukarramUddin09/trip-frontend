import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const { loginWithGoogle, loginWithPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onGoogle = async (credential: string) => {
    try {
      setBusy(true);
      const dest = await loginWithGoogle(credential);
      navigate({ to: dest });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setBusy(true);
      const dest = await loginWithPassword(email, password);
      navigate({ to: dest });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#050A14" }}>
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-md items-center px-6 pt-24">
        <GlassCard className="w-full p-8">
          <h1 className="font-display text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Sign in with Google or email.</p>
          <div className="mt-6">
            <GoogleSignInButton onSuccess={onGoogle} />
          </div>
          <div className="my-6 text-center text-xs text-[#64748B]">or continue with email</div>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input label="Password" type="password" value={password} onChange={setPassword} />
            <GradientButton size="lg" className="w-full" disabled={busy}>Sign In</GradientButton>
          </form>
          <p className="mt-6 text-center text-sm text-[#94A3B8]">
            New here? <Link to="/signup" className="text-gradient font-medium">Create an account</Link>
          </p>
        </GlassCard>
      </main>
    </div>
  );
}

function Input({ label, type, value, onChange }: { label: string; type: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,179,237,0.12)" }}
      />
    </label>
  );
}
