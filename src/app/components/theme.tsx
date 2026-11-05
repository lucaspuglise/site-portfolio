import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "lpc-hero-dark";
type Ctx = { dark: boolean; toggle: () => void };
const ThemeCtx = createContext<Ctx>({ dark: false, toggle: () => {} });

/** Modo escuro: mantém a tela inicial (Hero) escura desde o primeiro segundo. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(KEY, dark ? "1" : "0");
    } catch {}
    document.documentElement.style.colorScheme = "dark";
  }, [dark]);
  const toggle = useCallback(() => setDark((d) => !d), []);
  return <ThemeCtx.Provider value={{ dark, toggle }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
