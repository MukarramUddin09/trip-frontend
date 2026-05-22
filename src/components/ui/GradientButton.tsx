import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const SIZES: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

export function GradientButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium font-display tracking-tight " +
    "transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60 disabled:opacity-50";

  if (variant === "outline") {
    return (
      <button
        {...rest}
        className={`${base} ${SIZES[size]} ${className}`}
        style={{
          background:
            "linear-gradient(#050A14,#050A14) padding-box, linear-gradient(135deg,#3B82F6,#06B6D4,#8B5CF6) border-box",
          border: "1px solid transparent",
          color: "transparent",
          backgroundClip: "padding-box, border-box",
          ...rest.style,
        }}
      >
        <span className="text-gradient">{children}</span>
      </button>
    );
  }

  return (
    <button
      {...rest}
      className={`${base} ${SIZES[size]} text-white shadow-lg ${className}`}
      style={{
        background: "linear-gradient(135deg,#3B82F6 0%,#06B6D4 100%)",
        boxShadow: "0 8px 24px rgba(59,130,246,0.35)",
        ...rest.style,
      }}
    >
      {children}
    </button>
  );
}
