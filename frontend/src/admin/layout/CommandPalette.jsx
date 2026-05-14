import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart3, Users, Bot, Brain, FileText, Image,
  Activity, Terminal, CreditCard, Server, Settings, Search, ArrowRight,
  Plus, RefreshCw, Command,
} from 'lucide-react';

const NAV_COMMANDS = [
  { label: 'Dashboard',      to: '/admin',          icon: LayoutDashboard },
  { label: 'Analytics',      to: '/admin/analytics', icon: BarChart3 },
  { label: 'Users',          to: '/admin/users',     icon: Users },
  { label: 'AI Agents',      to: '/admin/agents',    icon: Bot },
  { label: 'AI Management',  to: '/admin/ai',        icon: Brain },
  { label: 'Content / CMS',  to: '/admin/content',   icon: FileText },
  { label: 'Media Library',  to: '/admin/media',     icon: Image },
  { label: 'API Monitor',    to: '/admin/api',       icon: Activity },
  { label: 'Logs',           to: '/admin/logs',      icon: Terminal },
  { label: 'Billing',        to: '/admin/billing',   icon: CreditCard },
  { label: 'System',         to: '/admin/system',    icon: Server },
  { label: 'Settings',       to: '/admin/settings',  icon: Settings },
];

const ACTION_COMMANDS = [
  { label: 'Refresh page data', icon: RefreshCw, action: () => window.location.reload() },
  { label: 'New AI Agent',      icon: Plus,       action: null, to: '/admin/agents' },
  { label: 'New Content item',  icon: Plus,       action: null, to: '/admin/content' },
];

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery]   = useState('');
  const [selected, setSel]  = useState(0);
  const inputRef            = useRef(null);
  const navigate            = useNavigate();

  const allItems = [
    ...NAV_COMMANDS.map(c => ({ ...c, type: 'nav' })),
    ...ACTION_COMMANDS.map(c => ({ ...c, type: 'action' })),
  ];

  const filtered = query.trim()
    ? allItems.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : allItems;

  const execute = useCallback((item) => {
    if (item.action) item.action();
    if (item.to)     navigate(item.to);
    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSel(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape')     { e.preventDefault(); onClose(); }
      if (e.key === 'ArrowDown')  { e.preventDefault(); setSel(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setSel(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && filtered[selected]) { e.preventDefault(); execute(filtered[selected]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, execute, onClose]);

  if (!open) return null;

  const navItems    = filtered.filter(i => i.type === 'nav');
  const actionItems = filtered.filter(i => i.type === 'action');

  return (
    <div className="adm-palette-backdrop" onClick={onClose}>
      <div className="adm-palette" onClick={e => e.stopPropagation()}>
        {/* Search input */}
        <div className="adm-palette-input-row">
          <Search size={15} color="var(--adm-t-3)" />
          <input
            ref={inputRef}
            className="adm-palette-input"
            placeholder="Search pages, actions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="adm-kbd">ESC</span>
        </div>

        {/* Results */}
        <div className="adm-palette-results">
          {navItems.length > 0 && (
            <>
              <div className="adm-palette-section-label">Pages</div>
              {navItems.map((item, i) => {
                const Icon = item.icon;
                const globalIdx = filtered.indexOf(item);
                return (
                  <div
                    key={item.label}
                    className={`adm-palette-item${globalIdx === selected ? ' adm-palette-selected' : ''}`}
                    onMouseEnter={() => setSel(globalIdx)}
                    onClick={() => execute(item)}
                  >
                    <Icon size={14} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    <ArrowRight size={12} style={{ color: 'var(--adm-t-4)' }} />
                  </div>
                );
              })}
            </>
          )}

          {actionItems.length > 0 && (
            <>
              <div className="adm-palette-section-label" style={{ marginTop: 6 }}>Actions</div>
              {actionItems.map((item) => {
                const Icon = item.icon;
                const globalIdx = filtered.indexOf(item);
                return (
                  <div
                    key={item.label}
                    className={`adm-palette-item${globalIdx === selected ? ' adm-palette-selected' : ''}`}
                    onMouseEnter={() => setSel(globalIdx)}
                    onClick={() => execute(item)}
                  >
                    <Icon size={14} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                  </div>
                );
              })}
            </>
          )}

          {filtered.length === 0 && (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--adm-t-3)', fontSize: 13 }}>
              No results for "{query}"
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="adm-palette-foot">
          <span><span className="adm-kbd">↑↓</span> navigate</span>
          <span><span className="adm-kbd">↵</span> select</span>
          <span><span className="adm-kbd">ESC</span> close</span>
        </div>
      </div>
    </div>
  );
}
