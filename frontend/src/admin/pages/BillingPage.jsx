import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import AreaChart from '../components/charts/AreaChart';
import { DollarSign, TrendingUp, AlertTriangle, Download, Plus, RefreshCw } from 'lucide-react';
import { INVOICES } from '../lib/mockData';

const STATUS_CFG = {
  paid:      { cls:'adm-badge-green',  label:'Paid' },
  overdue:   { cls:'adm-badge-red',    label:'Overdue' },
  cancelled: { cls:'adm-badge-muted',  label:'Cancelled' },
  pending:   { cls:'adm-badge-amber',  label:'Pending' },
};

const PLAN_CFG = {
  'Enterprise Pro': { color:'#F97316', bg:'#F9731618' },
  'Enterprise':     { color:'#6366F1', bg:'#6366F118' },
  'Growth':         { color:'#3B82F6', bg:'#3B82F618' },
  'Starter':        { color:'#94A3B8', bg:'#94A3B818' },
};

const MRR_TREND = [18.2,19.1,20.4,21.0,21.8,22.5,23.9,24.8,25.1,26.3,27.0,28.4];

export default function BillingPage() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? INVOICES : INVOICES.filter(i => i.status === filter);
  const mrr      = INVOICES.filter(i => i.status === 'paid').reduce((s, i) => s + parseInt(i.amount.replace(/\D/g,'')), 0);
  const overdue  = INVOICES.filter(i => i.status === 'overdue').length;
  const active   = INVOICES.filter(i => i.status === 'paid').length;

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Billing</div>
          <div className="adm-page-sub">Subscriptions · Invoices · Revenue</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost"><Download size={13} /> Export</button>
          <button className="adm-btn adm-btn-ghost"><RefreshCw size={13} /> Sync Stripe</button>
          <button className="adm-btn adm-btn-primary"><Plus size={13} /> Create Invoice</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label:'MRR',             value:`$${mrr.toLocaleString()}`, color:'#10B981', icon:DollarSign },
          { label:'Active Subs',     value:active,                     color:'#6366F1', icon:TrendingUp },
          { label:'Overdue',         value:overdue,                    color:'#F43F5E', icon:AlertTriangle },
          { label:'Churn (30d)',     value:'1',                        color:'#F59E0B', icon:TrendingUp },
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

      {/* MRR Trend */}
      <div className="adm-card" style={{ marginBottom:16 }}>
        <div className="adm-card-hdr">
          <div>
            <div className="adm-card-title">MRR Growth</div>
            <div className="adm-card-sub">12 months · $K</div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--adm-green)', fontFamily:'var(--adm-font-mono)', fontWeight:600 }}>
            <TrendingUp size={12} /> +56% YoY
          </div>
        </div>
        <AreaChart data={MRR_TREND} labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} color="#10B981" height={140} formatY={v => `$${v}K`} />
      </div>

      {/* Invoices table */}
      <div className="adm-card">
        <div className="adm-card-hdr">
          <div className="adm-card-title">Invoices</div>
          <div className="adm-tabs">
            {['all','paid','overdue','cancelled'].map(f => (
              <button key={f} className={`adm-tab${filter === f ? ' adm-tab-on' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Invoice</th><th>Customer</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(inv => {
                const sc = STATUS_CFG[inv.status] ?? STATUS_CFG['pending'];
                const pc = PLAN_CFG[inv.plan]     ?? PLAN_CFG['Starter'];
                return (
                  <tr key={inv.id}>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{inv.id}</td>
                    <td style={{ fontSize:12, color:'var(--adm-t-1)', fontFamily:'var(--adm-font-mono)' }}>{inv.customer}</td>
                    <td>
                      <span style={{ fontSize:10, fontFamily:'var(--adm-font-mono)', color:pc.color, background:pc.bg, padding:'2px 7px', borderRadius:3 }}>{inv.plan}</span>
                    </td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:13, fontWeight:700, color:'var(--adm-t-0)' }}>{inv.amount}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{inv.date}</td>
                    <td><span className={`adm-badge ${sc.cls}`}>{sc.label}</span></td>
                    <td>
                      <div style={{ display:'flex', gap:5 }}>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm">View</button>
                        {inv.status === 'overdue' && <button className="adm-btn adm-btn-primary adm-btn-sm">Retry</button>}
                        {inv.status === 'paid'    && <button className="adm-btn adm-btn-ghost adm-btn-sm">PDF</button>}
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
