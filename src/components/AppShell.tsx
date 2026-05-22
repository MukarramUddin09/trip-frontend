import * as React from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, Map, Train, Car, Hotel, Ticket, Wallet, ShieldAlert,
  BookOpen, Star, Settings, Menu, X, Bell, Search, Sun, Moon,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/plan-trip", label: "Plan Trip", icon: Map },
  { to: "/booking", label: "Travel Booking", icon: Train },
  { to: "/rides", label: "Local Rides", icon: Car },
  { to: "/hotels", label: "Stay & Hotels", icon: Hotel },
  { to: "/entertainment", label: "Entertainment", icon: Ticket },
  { to: "/payments", label: "Payments", icon: Wallet },
  { to: "/alerts", label: "Alerts & Safety", icon: ShieldAlert },
  { to: "/itineraries", label: "My Itineraries", icon: BookOpen },
  { to: "/feedback", label: "Feedback", icon: Star },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = path === to || path.startsWith(`${to}/`);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              "text-sidebar-foreground/80 hover:text-sidebar-foreground",
              "hover:bg-[color-mix(in_oklab,var(--brand)_14%,transparent)]",
              active &&
                "bg-[color-mix(in_oklab,var(--brand)_18%,transparent)] text-sidebar-foreground glow-indigo",
            )}
          >
            <Icon className={cn("h-4.5 w-4.5 shrink-0", active && "text-[var(--brand)]")} />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell() {
  const { theme, toggle, mounted } = useTheme();
  const { user, loading: authLoading, error: authError, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate({ to: "/" });
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "?";

  return (
    <div className="relative min-h-screen text-foreground">
      <Toaster richColors position="top-right" />
      {authError && (
        <div className="bg-destructive/90 text-destructive-foreground text-center text-sm py-2 px-4">
          {authError} — run <code className="font-mono">npm run dev</code> in <code className="font-mono">tripai-backend</code>
        </div>
      )}
      <div className="blob-bg" aria-hidden />

      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl md:flex md:flex-col">
        <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--teal)] text-white font-bold">T</div>
          <span className="font-display text-lg font-bold tracking-tight">TripAI</span>
        </div>
        <div className="flex-1 overflow-y-auto"><NavList /></div>
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-all hover:bg-[color-mix(in_oklab,var(--brand)_14%,transparent)] hover:text-sidebar-foreground"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            <span>Log Out</span>
          </button>
          <p className="mt-2 px-3 text-xs text-muted-foreground">v1.0 · Travel smarter with AI</p>
        </div>
      </aside>

      {/* Sidebar (mobile drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border md:hidden flex flex-col"
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[var(--brand)] to-[var(--teal)] text-white font-bold">T</div>
                  <span className="font-display text-lg font-bold">TripAI</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-md hover:bg-accent"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto"><NavList onNavigate={() => setMobileOpen(false)} /></div>
              <div className="border-t border-sidebar-border p-3">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/80 transition-all hover:bg-accent hover:text-sidebar-foreground"
                >
                  <LogOut className="h-4.5 w-4.5 shrink-0" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="md:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/60 px-4 backdrop-blur-xl md:px-6">
          <button className="md:hidden p-2 rounded-md hover:bg-accent" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="md:hidden flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-[var(--brand)] to-[var(--teal)] text-white font-bold text-xs">T</div>
            <span className="font-display font-bold">TripAI</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search destinations, bookings, places…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden lg:inline rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 hover:bg-accent transition-colors"
            >
              {!mounted ? (
                <Sun className="h-4 w-4" aria-hidden />
              ) : theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 hover:bg-accent" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--teal)]" />
            </button>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[var(--brand)] to-[var(--teal)] text-white text-sm font-semibold" title={user?.email || ""}>
              {authLoading ? "…" : initials}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
