import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginService, logoutService } from "../services/auth";
import { setToken, deleteToken } from "../lib/tokenStorage";
import { getSession, setSession as persistSession, deleteSession } from "../lib/sessionStorage";
 

type Session = { token: string; email: string; baseURL: string; [key: string]: any };
type Ctx = {
  session: Session | null;
  loading: boolean;
  login: (baseURL: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await getSession<Session>();
      if (stored) setSession(stored);
      setLoading(false);
    })();
  }, []);

  const api = useMemo(
    () => ({
      session,
      loading,
      login: async (baseURL: string, email: string, password: string) => {
        const s = await loginService(baseURL, email, password);
        await setToken(s.token);
        await persistSession(s);
        setSession(s);
      },
      logout: async () => {
        await logoutService();
        await deleteToken();
        await deleteSession();
        setSession(null);
      },
    }),
    [session, loading]
  );

  return <AuthCtx.Provider value={api}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
