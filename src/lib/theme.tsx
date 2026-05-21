import * as React from "react";

type Theme = "dark" | "light";
const ThemeCtx = React.createContext<{
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
  mounted: boolean;
}>({
  theme: "dark",
  toggle: () => {},
  set: () => {},
  mounted: false,
});

/**
 * Reads theme from document class (set by inline script in RootShell).
 * @returns {Theme}
 */
function readThemeFromDocument(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setTheme(readThemeFromDocument());
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("tripai-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      mounted,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      set: setTheme,
    }),
    [theme, mounted],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  return React.useContext(ThemeCtx);
}
