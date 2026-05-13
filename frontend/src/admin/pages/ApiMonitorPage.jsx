import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import AreaChart from '../components/charts/AreaChart';
import { Activity, RefreshCw, AlertTriangle, Clock, Zap, CheckCircle } from 'lucide-react';
import { ENDPOINTS, API_TREND_30D } from '../lib/mockData';

const METHOD_CFG = {
  GET:    { color:'#10B981', bg:'#10B98118' },
  POST:   { color:'#6366F1', bg:'#6366F118' },
  PUT:    { color:'#F59E0B', bg:'#F59E0B18' },
  DELETE: { color:'#F43F5E', bg:'#F43F5E18' },
  PATCH:  { color:'#06B6D4', bg:'#06B6D418' },
};

const STATUS_CFG = {
  healthy:  { cls:'adm-badge-green', label:'Healthy' },
  degraded: { cls:'adm-badge-amber', label:'Degraded' },
  down:     { cls:'adm-badge-red',   label:'Down' },
};

export default function ApiMonitorPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? ENDPOINTS : ENDPOINTS.filter(e => e.status === filter);
  const healthyCount  = ENDPOINTS.filter(e => e.status === 'healthy').length;
  const degradedCount = ENDPOINTS.filter(e => e.status === 'degraded').length;

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">API Monitor</div>
          <div className="adm-page-sub">{ENDPOINTS.length} endpoints · real-time health</div>
        </div>
        <div className="adm-page-actions">
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:'var(--adm-r-sm)', background:'var(--adm-green-10)', border:'1px solid var(--adm-green-30)' }}>
            <span className="adm-live-dot" style={{ width:6, height:6, borderRadius:'50%', background:'var(--adm-green)', animation:'admPulse 2s infinite' }} />
            <span style={{ fontSize:11, color:'var(--adm-green)', fontFamily:'var(--adm-font-mono)', fontWeight:600 }}>All Systems Operational</span>
          </div>
          <button className="adm-btn adm-btn-ghost"><RefreshCw size={13} /> Refresh</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label:'Total Requests (24h)',  value:'81.6K',  color:'#F97316', icon:Activity },
          { label:'Avg Response Time',     value:'93ms',   color:'#6366F1', icon:Clock },
          { label:'Error Rate',            value:'0.04%',  color:'#10B981', icon:AlertTriangle },
          { label:'Uptime (30d)',          value:'99.97%', color:'#06B6D4', icon:Zap },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div className="adm-stat-label">{s.label}</div>
              <div style={{ width:26, height:26, borderRadius:'var(--adm-r-sm)', background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <s.icon size={12} color={s.color} />
              </div>
            </div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Request trend */}
      <div className="adm-card" style={{ marginBottom:16 }}>
        <div className="adm-card-hdr">
          <div className="adm-card-title">Request Volume — 30 Days</div>
          <div className="adm-card-sub">Daily · thousands</div>
        </div>
        <AreaChart
          data={API_TREND_30D.values}
          labels={API_TREND_30D.labels.map((l, i) => i % 5 === 0 ? l : '')}
          color="#F97316"
          height={150}
          formatY={v => `${v}K`}
        />
      </div>

      {/* Endpoints table */}
      <div className="adm-card">
        <div className="adm-card-hdr">
          <div className="adm-card-title">Endpoint Performance</div>
          <div className="adm-tabs">
            {['all','healthy','degraded'].map(f => (
              <button key={f} className={`adm-tab${filter === f ? ' adm-tab-on' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? `All (${ENDPOINTS.length})` : f === 'healthy' ? `Healthy (${healthyCount})` : `Degraded (${degradedCount})`}
              </button>
            ))}
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Method</th><th>Endpoint</th><th>Calls (24h)</th><th>p50</th><th>p99</th><th>Errors</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(ep => {
                const mc = METHOD_CFG[ep.method] ?? METHOD_CFG['GET'];
                const sc = STATUS_CFG[ep.status] ?? STATUS_CFG['healthy'];
                const errHigh = parseFloat(ep.errors) > 0.1;
                const p99High = parseInt(ep.p99) > 500;
                return (
                  <tr key={ep.path}>
                    <td>
                      <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:10, fontWeight:700, color:mc.color, background:mc.bg, padding:'2px 7px', borderRadius:3 }}>
                        {ep.method}
                      </span>
                    </td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color:'var(--adm-t-0)', fontWeight:500 }}>{ep.path}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, fontWeight:600 }}>{ep.calls}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color:'var(--adm-green)' }}>{ep.p50}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color: p99High ? 'var(--adm-amber)' : 'var(--adm-t-2)' }}>{ep.p99}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color: errHigh ? 'var(--adm-red)' : 'var(--adm-t-3)' }}>{ep.errors}</td>
                    <td><span className={`adm-badge ${sc.cls}`}>{sc.label}</span></td>
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
