// Thin fetch wrapper for admin API calls — attaches JWT from sessionStorage

const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/v1';
const TOKEN_KEY = 'ax_admin_token';

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
    throw new Error(err?.error?.message ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export const adminApi = {
  // ── Dashboard ───────────────────────────────────────────
  getStats:      ()           => request('/admin/stats'),
  getActivity:   ()           => request('/admin/activity'),

  // ── Leads (contact submissions) ─────────────────────────
  getLeads:      (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/leads${qs ? `?${qs}` : ''}`);
  },
  updateLeadStatus: (id, status) =>
    request(`/admin/leads/${id}/status`, {
      method: 'PUT',
      body:   JSON.stringify({ status }),
    }),
  deleteLead:    (id) => request(`/admin/leads/${id}`, { method: 'DELETE' }),

  // ── Demo bookings ───────────────────────────────────────
  getBookings:   (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/bookings${qs ? `?${qs}` : ''}`);
  },

  // ── Subscribers ─────────────────────────────────────────
  getSubscribers: () => request('/admin/subscribers'),

  // ── Health ──────────────────────────────────────────────
  health: () => request('/health'),
};
