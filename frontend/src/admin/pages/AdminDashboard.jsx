import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import SparkLine from '../components/charts/SparkLine';
import AreaChart from '../components/charts/AreaChart';
import {
  TrendingUp, TrendingDown, Download, RefreshCw,
  Zap, Users, Bot, Activity, DollarSign, AlertTriangle,
  ExternalLink, ArrowUpRight, CheckCircle, XCircle, AlertCircle,
} from 'lucide-react';
import {
  DASHBOARD_STATS, ACTIVITY_FEED, API_TREND_30D, AGENTS, SERVICES,
} from '../lib/mockData';

const STAT_ICONS = {
  users:     Users,
  agents:    Bot,
  api_calls: Activity,
  latency:   Zap,
  mrr:       DollarSign,
  errors:    AlertTriangle,
};

const SERVICE_STATUS = {
  healthy:  { label: '● Healthy',  cls: 'adm-badge-green' },
  degraded: { label: '⚠ Degraded', cls: 'adm-badge-amber' },
  down:     { label: '✕ Down',     cls: 'adm-badge-red' },
};

const QUICK_ACTIONS = [
  { label: 'Deploy Agent', icon: Bot, color: 'var(--adm-violet)', href: '/admin/agents' },
  { label: 'Add Content',  icon: Zap,   color: 'var(--adm-cyan)',   href: '/admin/content' },
  { label: 'View Logs',    icon: Activity, color: 'var(--adm-amber)', href: '/admin/logs' },
  { label: 'Export Data',  icon: Download, color: 'var(--adm-green)', href: '#' },
];

export default function AdminDashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const healthyCount  = SERVICES.filter(s => s.status === 'healthy').length;
  const degradedCount = SERVICES.filter(s => s.status === 'degraded').length;

  function handleRefresh() {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }

  return (
    <AdminShell>
      {/* ── Page header ── */}
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Mission Control</div>
          <div className="adm-page-sub">Real-time platform overview · May 13, 2026</div>
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
          <button className="adm-btn adm-btn-primary">
            <Download size={13} /> Export
          </button>
        </div>
      </div>

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
        {DASHBOARD_STATS.map(stat => {
          const Icon = STAT_ICONS[stat.id];
          const isUp = stat.deltaDir === 'up';
          return (
            <div key={stat.id} className="adm-stat">
              <div className="adm-stat-accent" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:12, marginTop:4 }}>
                <div className="adm-stat-label">{stat.label}</div>
                {Icon && (
                  <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:`rgba(${stat.colorRgb},0.12)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={13} color={stat.color} />
                  </div>
                )}
              </div>
              <div className="adm-stat-value">{stat.value}</div>
              <div className={`adm-stat-delta ${isUp ? 'adm-delta-up' : 'adm-delta-down'}`} style={{ display:'flex', alignItems:'center', gap:3 }}>
                {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stat.delta}
              </div>
              <div className="adm-stat-spark">
                <SparkLine data={stat.spark} color={stat.color} height={36} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Charts + Activity row ── */}
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>
        {/* API Trend area chart */}
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div>
              <div className="adm-card-title">API Activity — 30 days</div>
              <div className="adm-card-sub">128.4K calls today · +8.4%</div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10, height:10, borderRadius:2, background:'var(--adm-orange)', opacity:0.6 }} />
              <span style={{ fontSize:11, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>Calls / day</span>
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

        {/* Activity feed */}
        <div className="adm-card" style={{ display:'flex', flexDirection:'column' }}>
          <div className="adm-card-hdr">
            <div className="adm-card-title">Recent Activity</div>
            <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, fontFamily:'var(--adm-font-mono)', color:'var(--adm-cyan)', background:'var(--adm-cyan-06)', padding:'3px 8px', borderRadius:999, border:'1px solid var(--adm-cyan-12)' }}>
              <span className="adm-live-dot" style={{ background:'var(--adm-cyan)', boxShadow:'0 0 5px var(--adm-cyan)' }} />
              Live
            </div>
          </div>
          <div style={{ flex:1, overflow:'hidden' }}>
            {ACTIVITY_FEED.slice(0, 6).map((item, i) => (
              <div key={item.id} className="adm-feed-item">
                <div className="adm-feed-dot" style={{ background: item.color }} />
                {i < 5 && <div className="adm-feed-line" />}
                <div className="adm-feed-content">
                  <div className="adm-feed-text">{item.text}</div>
                  <div className="adm-feed-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Agents + System + Quick Actions row ── */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
        {/* Top Agents */}
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">Top Agents</div>
            <a href="/admin/agents" style={{ fontSize:11, color:'var(--adm-orange)', fontFamily:'var(--adm-font-mono)', textDecoration:'none', display:'flex', alignItems:'center', gap:3 }}>
              All <ArrowUpRight size={10} />
            </a>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {AGENTS.slice(0, 5).map(agent => (
              <div key={agent.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderBottom:'1px solid var(--adm-bdr-0)' }}>
                <div style={{ width:7, height:7, borderRadius:'50%', flexShrink:0, background: agent.status === 'live' ? 'var(--adm-green)' : agent.status === 'degraded' ? 'var(--adm-amber)' : 'var(--adm-t-3)', boxShadow: agent.status === 'live' ? '0 0 5px var(--adm-green)' : 'none' }} />
                <span style={{ flex:1, fontSize:12, color:'var(--adm-t-0)', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{agent.name}</span>
                <span style={{ fontSize:10.5, fontFamily:'var(--adm-font-mono)', color:'var(--adm-t-3)' }}>{agent.calls}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
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

        {/* Quick Actions */}
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">Quick Actions</div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {QUICK_ACTIONS.map(action => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  style={{ display:'flex', flexDirection:'column', gap:8, padding:'14px 12px', borderRadius:'var(--adm-r-md)', border:'1px solid var(--adm-bdr-1)', background:'var(--adm-bg-3)', textDecoration:'none', transition:'background var(--adm-dur-fast), border-color var(--adm-dur-fast)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--adm-bdr-2)'; e.currentTarget.style.background='var(--adm-bg-4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--adm-bdr-1)'; e.currentTarget.style.background='var(--adm-bg-3)'; }}
                >
                  <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:`rgba(${action.color.includes('adm-violet') ? '99,102,241' : action.color.includes('adm-cyan') ? '6,182,212' : action.color.includes('adm-amber') ? '245,158,11' : '16,185,129'},0.15)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={13} color={action.color} />
                  </div>
                  <span style={{ fontSize:11.5, fontWeight:500, color:'var(--adm-t-1)' }}>{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .adm-grid-auto { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .adm-grid-auto { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </AdminShell>
  );
}
