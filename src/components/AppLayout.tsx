import { Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const PUBLIC_PATHS = ["/", "/login", "/signup", "/admin"];

/**
 * Public marketing/auth routes render without sidebar; app routes use AppShell + auth guard.
 */
export function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isPublic = PUBLIC_PATHS.includes(path);

  if (isPublic) {
    return <Outlet />;
  }

  return (
    <ProtectedRoute>
      <AppShell />
    </ProtectedRoute>
  );
}
