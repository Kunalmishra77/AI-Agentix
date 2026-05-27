import { useState, useEffect } from 'react';
import AdminShell from '../layout/AdminShell';
import SparkLine from '../components/charts/SparkLine';
import AreaChart from '../components/charts/AreaChart';
import { adminApi } from '../lib/adminApi';
import {
  TrendingUp, TrendingDown, Download, RefreshCw,
  Zap, Users, Bot, Activity, Mail, AlertTriangle,
  ArrowUpRight, ExternalLink,
} from 'lucide-react';
import { API_TREND_30D, SERVICES } from '../lib/mockData';

const SERVICE_STATUS = {
  healthy:  { label: '● Healthy',  cls: 'adm-badge-green' },
  degraded: { label: '⚠ Degraded', cls: 'adm-badge-amber' },
  down:     { label: '✕ Down',     cls: 'adm-badge-red' },
};

const QUICK_ACTIONS = [
  { label: 'View Leads',    icon: Mail,     color: 'var(--adm-violet)', href: '/admin/leads' },
  { label: 'Bookings',      icon: Zap,      color: 'var(--adm-cyan)',   href: '/admin/bookings' },
  { label: 'View Logs',     icon: Activity, color: 'var(--adm-amber)',  href: '/admin/logs' },
  { label: 'Export Data',   icon: Download, color: 'var(--adm-green)',  href: '#' },
];

function StatCard({ label, value, delta, deltaDir, color, colorRgb, spark, icon: Icon, loading }) {
  const isUp = deltaDir === 'up';
  return (
    <div className="adm-stat">
      <div className="adm-stat-accent" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12, marginTop:4 }}>
        <div className="adm-stat-label">{label}</div>
        {Icon && (
          <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:`rgba(${colorRgb},0.12)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon size={13} color={color} />
          </div>
        )}
      </div>
      <div className="adm-stat-value">{loading ? '—' : value}</div>
      {delta && (
        <div className={`adm-stat-delta ${isUp ? 'adm-delta-up' : 'adm-delta-down'}`} style={{ display:'flex', alignItems:'center', gap:3 }}>
          {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {delta}
        </div>
      )}
      {spark && (
        <div className="adm-stat-spark">
          <SparkLine data={spark} color={color} height={36} />
        </div>
      )}
    </div>
  );
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)    return 'just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const TYPE_COLOR = { contact: 'var(--adm-orange)', booking: 'var(--adm-cyan)' };

export default function AdminDashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [stats,      setStats]      = useState(null);
  const [activity,   setActivity]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const healthyCount  = SERVICES.filter(s => s.status === 'healthy').length;
  const degradedCount = SERVICES.filter(s => s.status === 'degraded').length;

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const [statsRes, actRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getActivity(),
      ]);
      if (statsRes.success)   setStats(statsRes.data);
      if (actRes.success)     setActivity(actRes.data ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchData(); }, []);

  function handleRefresh() {
    setRefreshing(true);
    fetchData().finally(() => setTimeout(() => setRefreshing(false), 400));
  }

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const kpis = [
    {
      id: 'leads', label: 'Total Leads', icon: Users, color: '#6366F1', colorRgb: '99,102,241',
      value:  stats ? String(stats.totalLeads) : '—',
      delta:  stats ? `+${stats.todayLeads} today` : null, deltaDir: 'up',
      spark:  [2,4,3,6,5,8,7,9,8,11,10,stats?.totalLeads ?? 12],
    },
    {
      id: 'bookings', label: 'Demo Bookings', icon: Bot, color: '#F97316', colorRgb: '249,115,22',
      value:  stats ? String(stats.totalBookings) : '—',
      delta:  null, deltaDir: 'up',
      spark:  [1,2,3,4,4,5,6,6,7,8,8,stats?.totalBookings ?? 9],
    },
    {
      id: 'inquiries', label: 'Total Inquiries', icon: Activity, color: '#06B6D4', colorRgb: '6,182,212',
      value:  stats ? String(stats.totalInquiries) : '—',
      delta:  null, deltaDir: 'up',
      spark:  [3,5,4,7,6,9,8,11,10,12,11,stats?.totalInquiries ?? 14],
    },
    {
      id: 'today', label: "Today's Leads", icon: Zap, color: '#10B981', colorRgb: '16,185,129',
      value:  stats ? String(stats.todayLeads) : '—',
      delta:  'live count', deltaDir: 'up',
      spark:  null,
    },
  ];

  return (
    <AdminShell>
      {/* ── Page header ── */}
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Mission Control</div>
          <div className="adm-page-sub">Real-time platform overview · {today}</div>
        </div>
        <div className="adm-page-actions">
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 11px', borderRadius:'var(--adm-r-sm)', border:'1px solid var(--adm-green-20)', background:'var(--adm-green-10)', fontSize:11, fontFamily:'var(--adm-font-mono)', color:'var(--adm-green)' }}>
            <span className="adm-live-dot" />
            Live
          </div>
          <button className="adm-btn adm-btn-ghost" onClick={handleRefresh} style={{ gap:5 }}>
            <RefreshCw size={13} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
            Refresh
          </button>
          <a href="/admin/leads" className="adm-btn adm-btn-primary" style={{ textDecoration:'none' }}>
            <Users size={13} /> View Leads
          </a>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom:16, padding:'10px 16px', borderRadius:'var(--adm-r-md)', border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.06)', fontSize:13, color:'#EF4444', display:'flex', alignItems:'center', gap:8 }}>
          <AlertTriangle size={14} /> Backend offline — start the server with <code style={{ fontFamily:'var(--adm-font-mono)', background:'rgba(255,255,255,0.06)', padding:'1px 6px', borderRadius:4 }}>cd backend && npm run dev</code>
        </div>
      )}

      {/* ── Platform health bar ── */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:22, padding:'10px 16px', borderRadius:'var(--adm-r-md)', border:'1px solid var(--adm-bdr-0)', background:'var(--adm-bg-2)', flexWrap:'wrap' }}>
        {SERVICES.slice(0, 5).map(svc => (
          <div key={svc.name} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, fontFamily:'var(--adm-font-mono)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background: svc.status === 'healthy' ? 'var(--adm-green)' : 'var(--adm-amber)', flexShrink:0, boxShadow: svc.status === 'healthy' ? '0 0 5px var(--adm-green)' : '0 0 5px var(--adm-amber)' }} />
            <span style={{ color:'var(--adm-t-2)' }}>{svc.name}</span>
            <span style={{ color:'var(--adm-t-4)', marginRight:4 }}>·</span>
          </div>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, fontFamily:'var(--adm-font-mono)', color: degradedCount > 0 ? 'var(--adm-amber)' : 'var(--adm-green)' }}>
          {healthyCount}/{SERVICES.length} operational
        </span>
      </div>

      {/* ── KPI grid ── */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {kpis.map(k => (
          <StatCard key={k.id} {...k} loading={loading && !stats} />
        ))}
      </div>

      {/* ── Charts + Activity ── */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div>
              <div className="adm-card-title">API Activity — 30 days</div>
              <div className="adm-card-sub">Platform call volume</div>
            </div>
          </div>
          <AreaChart
            data={API_TREND_30D.values}
            labels={API_TREND_30D.labels}
            color="var(--adm-orange)"
            height={160}
            formatY={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : String(v)}
          />
        </div>

        {/* Live activity feed */}
        <div className="adm-card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="adm-card-hdr">
            <div className="adm-card-title">Recent Activity</div>
            <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, fontFamily:'var(--adm-font-mono)', color:'var(--adm-cyan)', background:'var(--adm-cyan-06)', padding:'3px 8px', borderRadius:999, border:'1px solid var(--adm-cyan-12)' }}>
              <span className="adm-live-dot" style={{ background:'var(--adm-cyan)', boxShadow:'0 0 5px var(--adm-cyan)' }} />
              Live
            </div>
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            {loading && !activity.length ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="adm-feed-item">
                  <div className="adm-feed-dot" style={{ background:'var(--adm-bdr-1)' }} />
                  <div className="adm-feed-content">
                    <div style={{ height:12, width:'60%', background:'var(--adm-bg-3)', borderRadius:4 }} />
                    <div style={{ height:10, width:'30%', background:'var(--adm-bg-3)', borderRadius:4, marginTop:4 }} />
                  </div>
                </div>
              ))
            ) : activity.length === 0 ? (
              <div className="adm-empty" style={{ padding:'20px' }}>
                <div className="adm-empty-title" style={{ fontSize:12 }}>No activity yet</div>
                <div className="adm-empty-sub" style={{ fontSize:11 }}>Leads will appear here in real time</div>
              </div>
            ) : (
              activity.slice(0, 6).map((item, i) => (
                <div key={item.id || i} className="adm-feed-item">
                  <div className="adm-feed-dot" style={{ background: TYPE_COLOR[item.type] ?? 'var(--adm-orange)' }} />
                  {i < 5 && <div className="adm-feed-line" />}
                  <div className="adm-feed-content">
                    <div className="adm-feed-text">
                      {item.type === 'booking' ? '📅' : '📧'} {item.name} — {item.email}
                    </div>
                    <div className="adm-feed-time">
                      {item.company ? `${item.company} · ` : ''}{timeAgo(item.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {activity.length > 0 && (
            <a href="/admin/leads" style={{ display:'flex', alignItems:'center', gap:4, marginTop:12, fontSize:11, color:'var(--adm-orange)', fontFamily:'var(--adm-font-mono)', textDecoration:'none' }}>
              View all leads <ArrowUpRight size={10} />
            </a>
          )}
        </div>
      </div>

      {/* ── Service health + Quick Actions ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">System Health</div>
            <span className={`adm-badge ${degradedCount > 0 ? 'adm-badge-amber' : 'adm-badge-green'}`}>
              {degradedCount > 0 ? '⚠ Degraded' : '● All OK'}
            </span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {SERVICES.slice(0, 5).map(svc => (
              <div key={svc.name} className="adm-health-row">
                <span className="adm-health-name" style={{ fontSize:12 }}>{svc.name}</span>
                <div className="adm-health-bar-wrap">
                  <div className="adm-health-bar" style={{ width:`${svc.uptime}%`, background: svc.status === 'healthy' ? 'var(--adm-green)' : 'var(--adm-amber)' }} />
                </div>
                <span className="adm-health-val">{svc.uptime.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">Quick Actions</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {QUICK_ACTIONS.map(action => {
              const Icon = action.icon;
              return (
                <a key={action.label} href={action.href}
                  style={{ display:'flex', flexDirection:'column', gap:8, padding:'14px 12px', borderRadius:'var(--adm-r-md)', border:'1px solid var(--adm-bdr-1)', background:'var(--adm-bg-3)', textDecoration:'none', transition:'background var(--adm-dur-fast), border-color var(--adm-dur-fast)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--adm-bdr-2)'; e.currentTarget.style.background='var(--adm-bg-4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--adm-bdr-1)'; e.currentTarget.style.background='var(--adm-bg-3)'; }}>
                  <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:'rgba(99,102,241,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={13} color={action.color} />
                  </div>
                  <span style={{ fontSize:12, fontWeight:500, color:'var(--adm-t-1)' }}>{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) { .adm-grid-auto { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .adm-grid-auto { grid-template-columns: 1fr !important; } }
      `}</style>
    </AdminShell>
  );
}
