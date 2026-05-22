import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type User = { email: string; name?: string };

type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User) => string;
  logout: () => void;
};

const ADMIN_EMAIL = "mukarramuddin09@gmail.com";
const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("tripai_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const login = (u: User) => {
    setUser(u);
    if (typeof window !== "undefined") localStorage.setItem("tripai_user", JSON.stringify(u));
    return u.email === ADMIN_EMAIL ? "/admin" : "/dashboard";
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") localStorage.removeItem("tripai_user");
  };

  return (
    <Ctx.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.email === ADMIN_EMAIL,
        login,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
