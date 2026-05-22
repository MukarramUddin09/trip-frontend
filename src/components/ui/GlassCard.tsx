import { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`relative ${className}`}
      style={{
        background: "rgba(13,21,38,0.7)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(99,179,237,0.1)",
        borderRadius: 16,
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        ...(rest.style || {}),
      }}
    >
      {children}
    </div>
  );
}
