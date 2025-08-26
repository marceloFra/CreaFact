import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService, logoutService } from "../services/auth";

type Session = { token: string; email: string; baseURL: string };
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
      const token = await SecureStore.getItemAsync("token");
      const baseURL = (await AsyncStorage.getItem("baseURL")) || "";
      const email = (await AsyncStorage.getItem("userEmail")) || "";
      if (token && baseURL) setSession({ token, baseURL, email });
      setLoading(false);
    })();
  }, []);

  const api = useMemo(
    () => ({
      session,
      loading,
      login: async (baseURL: string, email: string, password: string) => {
        const s = await loginService(baseURL, email, password);
        await SecureStore.setItemAsync("token", s.token);
        await AsyncStorage.multiSet([
          ["baseURL", s.baseURL],
          ["userEmail", s.email],
        ]);
        setSession(s);
      },
      logout: async () => {
        await logoutService();
        await SecureStore.deleteItemAsync("token");
        await AsyncStorage.multiRemove(["baseURL", "userEmail"]);
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
