/**
 * Auth context — auto-registers/logs in demo user and exposes session state app-wide.
 */

import * as React from "react";
import { ApiError, getToken, setToken } from "@/lib/api/client";
import { authApi, type User } from "@/lib/api";

const DEMO = {
  name: "Aarav Sharma",
  email: "demo@tripai.com",
  password: "demo123456",
  phone: "9876543210",
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthCtx = React.createContext<AuthState>({
  user: null,
  loading: true,
  error: null,
  refresh: async () => {},
  logout: async () => {},
});

/**
 * Ensures a demo session exists (register if needed, then login).
 * @returns {Promise<string>} JWT token
 */
async function ensureDemoSession(): Promise<string> {
  try {
    const { token } = await authApi.login({ email: DEMO.email, password: DEMO.password });
    setToken(token);
    return token;
  } catch (e) {
    if (e instanceof ApiError && e.status === 401) {
      try {
        const { token } = await authApi.register(DEMO);
        setToken(token);
        return token;
      } catch (regErr) {
        if (regErr instanceof ApiError && regErr.status === 409) {
          throw new Error(
            "Demo account exists with a different password. Drop the tripai DB or delete user demo@tripai.com",
          );
        }
        throw regErr;
      }
    }
    throw e;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const refresh = React.useCallback(async () => {
    setError(null);
    if (!getToken()) await ensureDemoSession();
    const me = await authApi.me();
    setUser(me);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not connect to API. Is the backend running?");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const logout = React.useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* ignore */
    }
    setToken(null);
    setUser(null);
    await ensureDemoSession();
    await refresh();
  }, [refresh]);

  const value = React.useMemo(
    () => ({ user, loading, error, refresh, logout }),
    [user, loading, error, refresh, logout],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return React.useContext(AuthCtx);
}
