import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import SparkLine from '../components/charts/SparkLine';
import { Search, Plus, Bot, Zap, Activity, Clock } from 'lucide-react';
import { AGENTS } from '../lib/mockData';

const STATUS_CFG = {
  live:     { cls:'adm-badge-green',  label:'Live' },
  degraded: { cls:'adm-badge-amber',  label:'Degraded' },
  paused:   { cls:'adm-badge-muted',  label:'Paused' },
  archived: { cls:'adm-badge-red',    label:'Archived' },
};

const CAT_COLOR = {
  content:   '#6366F1', sales:'#F97316',  cx:'#06B6D4',
  research:  '#10B981', finance:'#F59E0B', marketing:'#A855F7',
  ops:       '#3B82F6', product:'#EC4899', systems:'#14B8A6',
};

export default function AgentsPage() {
  const [query, setQuery]   = useState('');
  const [status, setStatus] = useState('all');

  const filtered = AGENTS.filter(a => {
    const matchQ = !query || a.name.toLowerCase().includes(query.toLowerCase()) || a.id.includes(query);
    const matchS = status === 'all' || a.status === status;
    return matchQ && matchS;
  });

  const liveCount    = AGENTS.filter(a => a.status === 'live').length;
  const totalCalls   = AGENTS.reduce((s, a) => s + parseFloat(a.calls.replace('K','')), 0).toFixed(1) + 'K';
  const avgUptime    = (AGENTS.reduce((s, a) => s + parseFloat(a.uptime), 0) / AGENTS.length).toFixed(1) + '%';
  const totalTokens  = AGENTS.reduce((s, a) => s + parseFloat(a.tokens.replace(/[KM]/g, m => m === 'K' ? '0.001' : '1')), 0);

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">AI Agents</div>
          <div className="adm-page-sub">{AGENTS.length} registered · {liveCount} live in production</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost"><Activity size={13} /> View Logs</button>
          <button className="adm-btn adm-btn-primary"><Plus size={13} /> Deploy Agent</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label:'Live Agents',   value:liveCount,  color:'#10B981', icon:Bot },
          { label:'Total Calls',   value:totalCalls,  color:'#F97316', icon:Activity },
          { label:'Avg Uptime',    value:avgUptime,   color:'#6366F1', icon:Zap },
          { label:'Total Tokens',  value:'28.4M',     color:'#06B6D4', icon:Clock },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 }}>
              <div className="adm-stat-label">{s.label}</div>
              <div style={{ width:26, height:26, borderRadius:'var(--adm-r-sm)', background:`rgba(${s.color === '#10B981' ? '16,185,129' : s.color === '#F97316' ? '249,115,22' : s.color === '#6366F1' ? '99,102,241' : '6,182,212'},0.12)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <s.icon size={12} color={s.color} />
              </div>
            </div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters + table */}
      <div className="adm-card">
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <div className="adm-search" style={{ flex:'1 1 200px' }}>
            <Search size={13} />
            <input placeholder="Search agents..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="adm-tabs">
            {['all','live','degraded','paused'].map(s => (
              <button key={s} className={`adm-tab${status === s ? ' adm-tab-on' : ''}`} onClick={() => setStatus(s)}>
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>ID</th><th>Agent</th><th>Category</th><th>Calls (24h)</th><th>Uptime</th><th>Latency</th><th>Status</th><th>Owner</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(agent => {
                const sc  = STATUS_CFG[agent.status] ?? STATUS_CFG['paused'];
                const cc  = CAT_COLOR[agent.category] ?? '#6366F1';
                return (
                  <tr key={agent.id}>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{agent.id}</td>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:`rgba(${cc === '#6366F1' ? '99,102,241' : '249,115,22'},0.12)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <Bot size={12} color={cc} />
                        </div>
                        <span style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13 }}>{agent.name}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize:11, fontFamily:'var(--adm-font-mono)', padding:'2px 8px', borderRadius:999, background:`${cc}18`, color:cc, border:`1px solid ${cc}30` }}>
                        {agent.category}
                      </span>
                    </td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, fontWeight:600, color:'var(--adm-t-0)' }}>{agent.calls}</td>
                    <td>
                      <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color: parseFloat(agent.uptime) >= 99 ? 'var(--adm-green)' : 'var(--adm-amber)' }}>
                        {agent.uptime}
                      </span>
                    </td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{agent.latency}</td>
                    <td><span className={`adm-badge ${sc.cls}`}>{sc.label}</span></td>
                    <td style={{ fontSize:11, fontFamily:'var(--adm-font-mono)', color:'var(--adm-t-3)', maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{agent.owner}</td>
                    <td>
                      <div style={{ display:'flex', gap:5 }}>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm">View</button>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm">Logs</button>
                        {agent.status === 'live'
                          ? <button className="adm-btn adm-btn-danger adm-btn-sm">Pause</button>
                          : <button className="adm-btn adm-btn-ghost adm-btn-sm">Resume</button>
                        }
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
