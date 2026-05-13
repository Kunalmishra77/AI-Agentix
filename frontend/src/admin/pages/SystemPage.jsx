import AdminShell from '../layout/AdminShell';
import { Server, Globe, RefreshCw, AlertTriangle } from 'lucide-react';
import { SERVICES } from '../lib/mockData';

const STATUS_CFG = {
  healthy:  { cls:'adm-badge-green', label:'Healthy',  color:'#10B981' },
  degraded: { cls:'adm-badge-amber', label:'Degraded', color:'#F59E0B' },
  down:     { cls:'adm-badge-red',   label:'Down',     color:'#F43F5E' },
};

const UPTIME_SEGS = Array.from({ length: 30 }, (_, i) =>
  i === 22 || i === 23 ? 'degraded' : 'healthy'
);

const INFRA = [
  { label:'CPU Usage',     value:42,  unit:'%',   color:'#6366F1', thresh:80 },
  { label:'Memory',        value:58,  unit:'%',   color:'#F97316', thresh:85 },
  { label:'Disk I/O',      value:23,  unit:'%',   color:'#10B981', thresh:90 },
  { label:'Network Out',   value:67,  unit:'%',   color:'#06B6D4', thresh:85 },
];

export default function SystemPage() {
  const healthyCount  = SERVICES.filter(s => s.status === 'healthy').length;
  const degradedCount = SERVICES.filter(s => s.status === 'degraded').length;

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">System Health</div>
          <div className="adm-page-sub">Infrastructure status · all regions</div>
        </div>
        <div className="adm-page-actions">
          <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:'var(--adm-r-sm)', background: degradedCount > 0 ? 'var(--adm-amber-10)' : 'var(--adm-green-10)', border:`1px solid ${degradedCount > 0 ? 'var(--adm-amber-30)' : 'var(--adm-green-30)'}` }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background: degradedCount > 0 ? 'var(--adm-amber)' : 'var(--adm-green)' }} />
            <span style={{ fontSize:11, color: degradedCount > 0 ? 'var(--adm-amber)' : 'var(--adm-green)', fontFamily:'var(--adm-font-mono)', fontWeight:600 }}>
              {degradedCount > 0 ? `${degradedCount} Degraded` : 'All Operational'}
            </span>
          </div>
          <button className="adm-btn adm-btn-ghost"><RefreshCw size={13} /> Refresh</button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label:'Services',        value:`${SERVICES.length}`,           color:'#6366F1' },
          { label:'Healthy',         value:healthyCount,                   color:'#10B981' },
          { label:'Degraded',        value:degradedCount,                  color:'#F59E0B' },
          { label:'Avg Uptime (30d)', value:'99.61%',                      color:'#06B6D4' },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* 30-day uptime bar */}
      <div className="adm-card" style={{ marginBottom:16 }}>
        <div className="adm-card-hdr">
          <div className="adm-card-title">30-Day Uptime History</div>
          <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>99.61% avg</span>
        </div>
        <div style={{ display:'flex', gap:2 }}>
          {UPTIME_SEGS.map((s, i) => (
            <div
              key={i}
              title={`Day ${i+1}: ${s}`}
              style={{
                flex:1, height:28, borderRadius:3,
                background: s === 'healthy' ? 'var(--adm-green)' : 'var(--adm-amber)',
                opacity: 0.75, cursor:'pointer', transition:'opacity var(--adm-dur-fast)',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity='1'}
              onMouseLeave={e => e.currentTarget.style.opacity='0.75'}
            />
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
          <span style={{ fontSize:10, color:'var(--adm-t-4)', fontFamily:'var(--adm-font-mono)' }}>30 days ago</span>
          <span style={{ fontSize:10, color:'var(--adm-t-4)', fontFamily:'var(--adm-font-mono)' }}>Today</span>
        </div>
      </div>

      {/* Infrastructure meters + Services table */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:16, marginBottom:16 }}>
        {/* Resource meters */}
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">Resource Usage</div>
            <Server size={14} color="var(--adm-t-3)" />
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            {INFRA.map(r => (
              <div key={r.label}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:12, color:'var(--adm-t-2)' }}>{r.label}</span>
                  <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, fontWeight:600, color: r.value >= r.thresh ? 'var(--adm-red)' : 'var(--adm-t-0)' }}>{r.value}{r.unit}</span>
                </div>
                <div style={{ height:6, background:'var(--adm-bg-5)', borderRadius:3, overflow:'hidden' }}>
                  <div style={{ width:`${r.value}%`, height:'100%', background: r.value >= r.thresh ? 'var(--adm-red)' : r.color, borderRadius:3, transition:'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services table */}
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">Services</div>
            <Globe size={14} color="var(--adm-t-3)" />
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Service</th><th>Region</th><th>Uptime</th><th>Latency</th><th>Status</th></tr></thead>
              <tbody>
                {SERVICES.map(svc => {
                  const sc = STATUS_CFG[svc.status] ?? STATUS_CFG['healthy'];
                  return (
                    <tr key={svc.name}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ width:6, height:6, borderRadius:'50%', background:sc.color, flexShrink:0 }} />
                          <span style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13 }}>{svc.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:10, color:'var(--adm-t-4)' }}>{svc.region}</td>
                      <td>
                        <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color: svc.uptime < 99 ? 'var(--adm-amber)' : 'var(--adm-green)' }}>
                          {svc.uptime.toFixed(2)}%
                        </span>
                      </td>
                      <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{svc.latency}</td>
                      <td><span className={`adm-badge ${sc.cls}`}>{sc.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
