import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import AreaChart from '../components/charts/AreaChart';
import BarChart from '../components/charts/BarChart';
import { TrendingUp, Download, Users, Activity, DollarSign, Eye } from 'lucide-react';
import { WEEKLY_ANALYTICS, TOP_PAGES } from '../lib/mockData';

const RANGES = ['7D', '30D', '90D', '12M'];

const METRICS = [
  { key: 'apiCalls', label: 'API Calls', color: '#F97316', icon: Activity },
  { key: 'newUsers', label: 'New Users', color: '#6366F1', icon: Users },
  { key: 'revenue',  label: 'Revenue',   color: '#10B981', icon: DollarSign },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('90D');

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Analytics</div>
          <div className="adm-page-sub">Platform growth and performance metrics</div>
        </div>
        <div className="adm-page-actions">
          <div className="adm-tabs">
            {RANGES.map(r => (
              <button key={r} className={`adm-tab${range === r ? ' adm-tab-on' : ''}`} onClick={() => setRange(r)}>{r}</button>
            ))}
          </div>
          <button className="adm-btn adm-btn-ghost"><Download size={13} /> Export CSV</button>
        </div>
      </div>

      <div className="adm-grid-3" style={{ marginBottom:20 }}>
        {[
          { label:'API Calls (Period)', value:'128.4K', delta:'+8.4%',  color:'#F97316' },
          { label:'New Users',          value:'280',    delta:'+22%',   color:'#6366F1' },
          { label:'MRR Growth',         value:'+$3.2K', delta:'+22.1%', color:'#10B981' },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'18px 20px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{s.value}</div>
            <div className="adm-stat-delta adm-delta-up" style={{ display:'flex', alignItems:'center', gap:3, marginTop:5 }}>
              <TrendingUp size={10} />{s.delta} vs last period
            </div>
          </div>
        ))}
      </div>

      <div className="adm-card" style={{ marginBottom:16 }}>
        <div className="adm-card-hdr">
          <div>
            <div className="adm-card-title">API Calls Trend — {range}</div>
            <div className="adm-card-sub">Weekly aggregated</div>
          </div>
          <div style={{ display:'flex', gap:14 }}>
            {METRICS.map(m => (
              <div key={m.key} style={{ display:'flex', alignItems:'center', gap:5, fontSize:11, color:'var(--adm-t-2)' }}>
                <div style={{ width:8, height:8, borderRadius:2, background:m.color }} />{m.label}
              </div>
            ))}
          </div>
        </div>
        <AreaChart data={WEEKLY_ANALYTICS.apiCalls} labels={WEEKLY_ANALYTICS.weeks} color="#F97316" height={200} formatY={v => `${v}K`} />
      </div>

      <div className="adm-grid-3" style={{ marginBottom:20 }}>
        {METRICS.map(m => (
          <div key={m.key} className="adm-card">
            <div className="adm-card-hdr" style={{ marginBottom:10 }}>
              <div>
                <div className="adm-card-title" style={{ fontSize:12 }}>{m.label}</div>
                <div className="adm-card-sub">12-week</div>
              </div>
              <m.icon size={14} color={m.color} />
            </div>
            <BarChart data={WEEKLY_ANALYTICS[m.key]} labels={WEEKLY_ANALYTICS.weeks} color={m.color} height={100} />
          </div>
        ))}
      </div>

      <div className="adm-card">
        <div className="adm-card-hdr">
          <div className="adm-card-title">Top Pages</div>
          <Eye size={14} color="var(--adm-t-3)" />
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>Page</th><th>Views</th><th>Bounce</th><th>Avg Time</th><th>Trend</th></tr></thead>
            <tbody>
              {TOP_PAGES.map(page => (
                <tr key={page.path}>
                  <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color:'var(--adm-t-0)' }}>{page.path}</td>
                  <td style={{ fontWeight:600, color:'var(--adm-t-0)' }}>{page.views}</td>
                  <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color: parseInt(page.bounce) > 40 ? 'var(--adm-amber)' : 'var(--adm-t-1)' }}>{page.bounce}</td>
                  <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{page.avg}</td>
                  <td><span style={{ display:'inline-flex', alignItems:'center', gap:3, fontSize:11, fontFamily:'var(--adm-font-mono)', color:'var(--adm-green)' }}><TrendingUp size={10} />{page.delta}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
