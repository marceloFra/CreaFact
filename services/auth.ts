import { normalizeBaseURL } from "./api";

export async function loginService(baseURL: string, email: string, password: string) {
  const url = normalizeBaseURL(baseURL);
  const resp = await fetch(`${url}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!resp.ok) {
    let msg = "No se pudo iniciar sesión";
    try { const j = await resp.json(); msg = j?.message || j?.error || msg; } catch {}
    throw new Error(msg);
  }
  const data = await resp.json(); // contiene token y demás datos del usuario
  return { ...data, email, baseURL: url };
}

export async function logoutService() {
  // opcional: llamar a /auth/logout si tu backend lo requiere
}
