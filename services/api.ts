import { getToken } from "../lib/tokenStorage";
import { getSession } from "../lib/sessionStorage";

export const normalizeBaseURL = (u: string) => {
  if (!/^https?:\/\//i.test(u)) u = `https://${u.trim()}`;
  return u.replace(/\/+$/, "");
};

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await getToken();
  const session = await getSession();
  const baseURL = session?.baseURL || "";

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init.headers as Record<string, string>),
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  if (init.body || (init.method && init.method !== "GET")) {
    headers["Content-Type"] = "application/json";
  }

  const resp = await fetch(`${normalizeBaseURL(baseURL)}${path}`, { ...init, headers });
  if (!resp.ok) throw new Error((await safeMsg(resp)) || `Error ${resp.status}`);
  return resp.json();
}

async function safeMsg(resp: Response) {
  try { const j = await resp.json(); return j?.message || j?.error || ""; }
  catch { return ""; }
}
