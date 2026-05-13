import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../auth/useAdminAuth';
import {
  LayoutDashboard, BarChart3, Users, Bot, Brain,
  FileText, Image, Activity, Terminal, CreditCard,
  Server, Settings, LogOut, Menu, X, Bell, Search,
  ChevronLeft, ChevronRight, Command,
} from 'lucide-react';
import CommandPalette from './CommandPalette';
import '../styles/admin-tokens.css';
import '../styles/admin-shell.css';
import '../styles/admin-components.css';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard',    path: '/admin',           icon: LayoutDashboard, exact: true },
      { label: 'Analytics',   path: '/admin/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Users',       path: '/admin/users',     icon: Users,     badge: '3.8K' },
      { label: 'AI Agents',   path: '/admin/agents',    icon: Bot,       badge: '247' },
      { label: 'AI Management', path: '/admin/ai',      icon: Brain },
      { label: 'Content / CMS', path: '/admin/content', icon: FileText },
      { label: 'Media Library', path: '/admin/media',   icon: Image },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'API Monitor', path: '/admin/api',       icon: Activity },
      { label: 'Logs',        path: '/admin/logs',      icon: Terminal },
      { label: 'Billing',     path: '/admin/billing',   icon: CreditCard },
      { label: 'System',      path: '/admin/system',    icon: Server },
    ],
  },
  {
    label: 'Config',
    items: [
      { label: 'Settings',    path: '/admin/settings',  icon: Settings },
    ],
  },
];

// Map path → breadcrumb label
const BREADCRUMB_MAP = {
  '/admin':           ['Dashboard'],
  '/admin/analytics': ['Analytics'],
  '/admin/users':     ['Platform', 'Users'],
  '/admin/agents':    ['Platform', 'AI Agents'],
  '/admin/ai':        ['Platform', 'AI Management'],
  '/admin/content':   ['Platform', 'Content / CMS'],
  '/admin/media':     ['Platform', 'Media Library'],
  '/admin/api':       ['Operations', 'API Monitor'],
  '/admin/logs':      ['Operations', 'Logs'],
  '/admin/billing':   ['Operations', 'Billing'],
  '/admin/system':    ['Operations', 'System'],
  '/admin/settings':  ['Config', 'Settings'],
};

function isActive(path, pathname, exact) {
  return exact ? pathname === path : pathname === path;
}

export default function AdminShell({ children }) {
  const { logout } = useAdminAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [collapsed,   setCollapsed]  = useState(() => localStorage.getItem('adm-sidebar-collapsed') === 'true');
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('adm-sidebar-collapsed', String(next));
      return next;
    });
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Cmd+K → palette
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const breadcrumbs = BREADCRUMB_MAP[pathname] ?? ['Admin'];

  return (
    <>
      <div
        className="adm-root"
        data-collapsed={String(collapsed)}
        data-mobile-open={String(mobileOpen)}
      >
        {/* ══ SIDEBAR ══════════════════════════════════════════ */}
        <aside className="adm-sidebar">
          {/* Logo */}
          <div className="adm-logo">
            <img src="/assets/clients/logo.png" alt="AGENTiX" className="adm-logo-img"
              onError={e => { e.currentTarget.style.display='none'; }} />
            <span className="adm-logo-text">AGENTiX</span>
            <span className="adm-logo-pill">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="adm-nav">
            {NAV_GROUPS.map(({ label, items }) => (
              <div key={label} className="adm-nav-group">
                <div className="adm-nav-group-label">{label}</div>
                {items.map(({ label: lbl, path, icon: Icon, badge, exact }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`adm-nav-item${isActive(path, pathname, exact) ? ' adm-active' : ''}`}
                    title={collapsed ? lbl : undefined}
                  >
                    <Icon size={15} className="adm-nav-icon" />
                    <span className="adm-nav-label">{lbl}</span>
                    {badge && <span className="adm-nav-badge">{badge}</span>}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="adm-sidebar-foot">
            <div className="adm-env-badge">
              <span className="adm-env-dot" />
              <span className="adm-env-label">DEV · v1.0.0</span>
            </div>

            <div className="adm-user-row" title={collapsed ? 'Admin — Super Admin' : undefined}>
              <div className="adm-avatar">A</div>
              <div className="adm-user-info">
                <div className="adm-user-name">Admin</div>
                <div className="adm-user-role">Super Admin</div>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                style={{ background:'none', border:'none', cursor:'pointer', color:'var(--adm-t-3)', padding:4, borderRadius:6, transition:'color 0.15s', flexShrink:0 }}
              >
                <LogOut size={13} />
              </button>
            </div>

            <button className="adm-collapse-btn" onClick={toggleCollapse} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              {collapsed
                ? <ChevronRight size={14} />
                : <><ChevronLeft size={14} /><span style={{ fontSize:11, marginLeft:4, fontFamily:'var(--adm-font-mono)', color:'var(--adm-t-3)', transition:'opacity var(--adm-dur-fast)' }} className="adm-env-label">Collapse</span></>
              }
            </button>
          </div>
        </aside>

        {/* ══ TOPBAR ═══════════════════════════════════════════ */}
        <header className="adm-topbar">
          {/* Mobile menu toggle */}
          <button
            className="adm-topbar-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle sidebar"
            style={{ display: 'none' }}
            id="adm-mobile-toggle"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          {/* Breadcrumb */}
          <div className="adm-breadcrumb">
            <span className="adm-breadcrumb-item">Admin</span>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: 'contents' }}>
                <span className="adm-breadcrumb-sep">/</span>
                <span className={`adm-breadcrumb-item${i === breadcrumbs.length - 1 ? ' adm-breadcrumb-current' : ''}`}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>

          {/* Search trigger */}
          <button
            className="adm-search-trigger"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
          >
            <Search size={13} />
            <span>Search or jump to...</span>
            <div className="adm-search-kbd">
              <span className="adm-kbd">⌘</span>
              <span className="adm-kbd">K</span>
            </div>
          </button>

          {/* Right actions */}
          <div className="adm-topbar-actions">
            <button
              className="adm-topbar-btn"
              onClick={() => setPaletteOpen(true)}
              title="Command palette (⌘K)"
            >
              <Command size={14} />
            </button>

            <button className="adm-topbar-btn" title="Notifications" style={{ position: 'relative' }}>
              <Bell size={14} />
              <span className="adm-notif-dot" />
            </button>

            <span className="adm-env-pill">DEV</span>

            <div
              className="adm-topbar-avatar"
              title="Admin — Super Admin"
              onClick={logout}
            >
              A
            </div>
          </div>
        </header>

        {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
        <main className="adm-main">
          {children}
        </main>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.65)', zIndex:99, backdropFilter:'blur(4px)' }}
          />
        )}
      </div>

      {/* ══ COMMAND PALETTE ════════════════════════════════════ */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* ── Mobile menu toggle (injected via CSS) ── */}
      <style>{`
        @media (max-width: 900px) {
          #adm-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
