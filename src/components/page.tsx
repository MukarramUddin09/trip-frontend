import * as React from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function GlassCard({
  className, children, ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn("glass rounded-2xl", className)}>
      {children}
    </div>
  );
}

export function Pill({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "teal" | "indigo" | "green" | "amber" | "red" }) {
  const tones: Record<string, string> = {
    default: "bg-muted text-foreground/80",
    teal: "bg-[color-mix(in_oklab,var(--teal)_18%,transparent)] text-[var(--teal)]",
    indigo: "bg-[color-mix(in_oklab,var(--brand)_18%,transparent)] text-[var(--brand)]",
    green: "bg-emerald-500/15 text-emerald-500",
    amber: "bg-amber-500/15 text-amber-500",
    red: "bg-red-500/15 text-red-500",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function IndigoButton({ className, children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={cn(
        "btn-shimmer inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white transition-all hover-glow",
        className,
      )}
    >
      {children}
    </button>
  );
}