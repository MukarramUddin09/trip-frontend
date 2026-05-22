import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/signup")({ component: SignupPage });

function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const dest = login({ email, name: name || email.split("@")[0] });
    navigate({ to: dest });
  };

  return (
    <div className="min-h-screen" style={{ background: "#050A14" }}>
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-md items-center px-6 pt-24">
        <GlassCard className="w-full p-8">
          <h1 className="font-display text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Start planning smarter trips today.</p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <Input label="Name" type="text" value={name} onChange={setName} />
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input label="Password" type="password" value={password} onChange={setPassword} />
            <GradientButton size="lg" className="w-full">Get Started Free</GradientButton>
          </form>
          <p className="mt-6 text-center text-sm text-[#94A3B8]">
            Already have an account? <Link to="/login" className="text-gradient font-medium">Sign in</Link>
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
        className="mt-1 w-full rounded-lg px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#3B82F6]"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,179,237,0.12)" }}
      />
    </label>
  );
}
