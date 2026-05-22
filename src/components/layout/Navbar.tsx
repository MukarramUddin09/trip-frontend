import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, Plane, X } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { useAuth } from "@/lib/auth";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how" },
  { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate({ to: "/" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,10,20,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(99,179,237,0.1)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg"
            style={{ background: "linear-gradient(135deg,#3B82F6,#06B6D4)" }}
          >
            <Plane size={16} className="text-white" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-white">Trip</span>
            <span className="text-gradient">AI</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-body text-sm text-[#94A3B8] transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {user && !loading ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:bg-white/5 hover:text-white"
              >
                Dashboard
              </Link>
              <GradientButton variant="outline" size="sm" onClick={handleLogout}>
                <LogOut size={16} />
                Log Out
              </GradientButton>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-[#CBD5E1] transition hover:bg-white/5 hover:text-white"
              >
                Sign In
              </Link>
              <Link to="/signup">
                <GradientButton size="sm">Get Started Free</GradientButton>
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Menu"
          className="md:hidden rounded-lg p-2 text-white hover:bg-white/5"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} />
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col"
          style={{ background: "rgba(5,10,20,0.97)", backdropFilter: "blur(24px)" }}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-xl font-bold">
              <span className="text-white">Trip</span>
              <span className="text-gradient">AI</span>
            </span>
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-white hover:bg-white/5"
            >
              <X size={22} />
            </button>
          </div>
          <ul className="mt-8 flex flex-col items-center gap-6 px-6">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)} className="font-display text-2xl text-white">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-6 flex w-64 flex-col items-stretch gap-3">
              {user && !loading ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <GradientButton size="md" className="w-full">
                      Dashboard
                    </GradientButton>
                  </Link>
                  <GradientButton variant="outline" size="md" className="w-full" onClick={handleLogout}>
                    <LogOut size={18} />
                    Log Out
                  </GradientButton>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <GradientButton variant="outline" size="md" className="w-full">
                      Sign In
                    </GradientButton>
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <GradientButton size="md" className="w-full">
                      Get Started Free
                    </GradientButton>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
