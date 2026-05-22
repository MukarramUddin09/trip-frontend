/**
 * Auth context — Google OAuth + email/password via TripAI API.
 */

import * as React from "react";
import { ApiError, getToken, setToken } from "@/lib/api/client";
import { authApi, type User } from "@/lib/api";

export const ADMIN_EMAIL = "mukarramuddin09@gmail.com";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
  loginWithGoogle: (credential: string) => Promise<string>;
  loginWithPassword: (email: string, password: string) => Promise<string>;
  register: (body: { name: string; email: string; password: string; phone: string }) => Promise<string>;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = React.createContext<AuthState | null>(null);

function redirectPath(user: User) {
  return user.email?.toLowerCase() === ADMIN_EMAIL || user.role === "admin" ? "/admin" : "/dashboard";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    setError(null);
    if (!getToken()) {
      setUser(null);
      return;
    }
    const me = await authApi.me();
    setUser(me);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (getToken()) await refresh();
      } catch (err) {
        if (!cancelled) {
          setToken(null);
          setError(err instanceof Error ? err.message : "Session expired");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const applySession = React.useCallback(async (token: string, u: User) => {
    setToken(token);
    setUser(u);
    return redirectPath(u);
  }, []);

  const loginWithGoogle = React.useCallback(
    async (credential: string) => {
      const { token, user: u } = await authApi.google(credential);
      return applySession(token, u);
    },
    [applySession],
  );

  const loginWithPassword = React.useCallback(
    async (email: string, password: string) => {
      const { token, user: u } = await authApi.login({ email, password });
      return applySession(token, u);
    },
    [applySession],
  );

  const register = React.useCallback(
    async (body: { name: string; email: string; password: string; phone: string }) => {
      const { token, user: u } = await authApi.register(body);
      return applySession(token, u);
    },
    [applySession],
  );

  const logout = React.useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore */
    }
    setToken(null);
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      loading,
      error,
      isAdmin: user?.role === "admin" || user?.email?.toLowerCase() === ADMIN_EMAIL,
      loginWithGoogle,
      loginWithPassword,
      register,
      refresh,
      logout,
    }),
    [user, loading, error, loginWithGoogle, loginWithPassword, register, refresh, logout],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
