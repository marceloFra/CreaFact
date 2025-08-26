import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const normalizeBaseURL = (u: string) => {
  if (!/^https?:\/\//i.test(u)) u = `https://${u.trim()}`;
  return u.replace(/\/+$/, "");
};

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await SecureStore.getItemAsync("token");
  const baseURL = (await AsyncStorage.getItem("baseURL")) || "";
  const headers = { ...(init.headers || {}), "Content-Type": "application/json" };
  if (token) (headers as any).Authorization = `Bearer ${token}`;
  const resp = await fetch(`${normalizeBaseURL(baseURL)}${path}`, { ...init, headers });
  if (!resp.ok) throw new Error((await safeMsg(resp)) || `Error ${resp.status}`);
  return resp.json();
}

async function safeMsg(resp: Response) {
  try { const j = await resp.json(); return j?.message || j?.error || ""; }
  catch { return ""; }
}
