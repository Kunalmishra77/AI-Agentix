import { createContext, useCallback, useContext, useState } from 'react';

const API       = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/v1';
const FB_EMAIL  = import.meta.env.VITE_ADMIN_EMAIL    ?? 'aiagentix2025@gmail.com';
const FB_PASS   = import.meta.env.VITE_ADMIN_PASSWORD ?? 'AGENTiX@2025';
const TOKEN_KEY = 'ax_admin_token';
const INFO_KEY  = 'ax_admin_info';

export const AdminAuthContext = createContext(null);
export function useAdminAuth() { return useContext(AdminAuthContext); }

function saveSession(tok, info) {
  sessionStorage.setItem(TOKEN_KEY, tok);
  sessionStorage.setItem(INFO_KEY, JSON.stringify(info));
}

export function useAdminAuthState() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(INFO_KEY) ?? 'null'); } catch { return null; }
  });

  const authed = !!token;

  const login = useCallback(async (email, password) => {
    // ── 1. Hardcoded fallback check (always works, no network needed) ──
    if (email === FB_EMAIL && password === FB_PASS) {
      // Try backend first — if it works, use the real JWT
      try {
        const res = await fetch(`${API}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          signal: AbortSignal.timeout(3000),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.success) {
          const tok  = data.data.token;
          const info = data.data.admin;
          saveSession(tok, info);
          setToken(tok);
          setAdmin(info);
          return true;
        }
      } catch { /* backend offline — use fallback token */ }

      // Backend offline / not seeded — use local token
      const tok  = btoa(`${email}:${Date.now()}`);
      const info = { name: 'Admin', email };
      saveSession(tok, info);
      setToken(tok);
      setAdmin(info);
      return true;
    }

    // ── 2. Wrong credentials entirely ──
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(INFO_KEY);
    setToken(null);
    setAdmin(null);
  }, []);

  return { authed, token, admin, login, logout };
}
