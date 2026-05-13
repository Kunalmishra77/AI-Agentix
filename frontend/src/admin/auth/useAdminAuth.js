import { createContext, useCallback, useContext, useState } from 'react';

const ADMIN_EMAIL    = import.meta.env.VITE_ADMIN_EMAIL    ?? 'aiagentix2025@gmail.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'AGENTiX@2025';
const TOKEN_KEY = 'ax_admin_v1';

function makeToken() {
  return btoa(`${ADMIN_EMAIL}:${Date.now()}`);
}

export const AdminAuthContext = createContext(null);

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export function useAdminAuthState() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(TOKEN_KEY));

  const login = useCallback(async (email, password) => {
    await new Promise(r => setTimeout(r, 600));
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(TOKEN_KEY, makeToken());
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
  }, []);

  return { authed, login, logout };
}
