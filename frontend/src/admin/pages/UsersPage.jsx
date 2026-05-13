import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import { Search, UserPlus, Download, ChevronUp, ChevronDown } from 'lucide-react';
import { USERS } from '../lib/mockData';

const PLAN_COLOR = {
  'Enterprise Pro': { cls:'adm-badge-orange', dot:'#F97316' },
  'Enterprise':     { cls:'adm-badge-violet', dot:'#6366F1' },
  'Growth':         { cls:'adm-badge-blue',   dot:'#3B82F6' },
  'Starter':        { cls:'adm-badge-muted',  dot:'#94A3B8' },
};

const STATUS_COLOR = {
  active:    { cls:'adm-badge-green',  label:'Active' },
  suspended: { cls:'adm-badge-red',    label:'Suspended' },
  pending:   { cls:'adm-badge-amber',  label:'Pending' },
};

export default function UsersPage() {
  const [query,  setQuery]  = useState('');
  const [plan,   setPlan]   = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = USERS.filter(u => {
    const matchQ = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
    const matchP = plan === 'all' || u.plan === plan;
    const matchS = status === 'all' || u.status === status;
    return matchQ && matchP && matchS;
  });

  const stats = {
    total:     USERS.length,
    active:    USERS.filter(u => u.status === 'active').length,
    enterprise:USERS.filter(u => u.plan.startsWith('Enterprise')).length,
    mrr:       USERS.reduce((s, u) => s + parseInt(u.mrr.replace(/\D/g,'')), 0),
  };

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Users</div>
          <div className="adm-page-sub">{stats.total} registered users · {stats.active} active</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost"><Download size={13} /> Export</button>
          <button className="adm-btn adm-btn-primary"><UserPlus size={13} /> Invite User</button>
        </div>
      </div>

      {/* Summary row */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label:'Total Users',      value:stats.total,                   color:'#6366F1' },
          { label:'Active',           value:stats.active,                  color:'#10B981' },
          { label:'Enterprise Tier',  value:stats.enterprise,              color:'#F97316' },
          { label:'Total MRR',        value:`$${stats.mrr.toLocaleString()}`, color:'#06B6D4' },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="adm-card">
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <div className="adm-search" style={{ flex:'1 1 200px' }}>
            <Search size={13} />
            <input placeholder="Search users..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="adm-tabs">
            {['all','Enterprise Pro','Enterprise','Growth','Starter'].map(p => (
              <button key={p} className={`adm-tab${plan === p ? ' adm-tab-on' : ''}`} onClick={() => setPlan(p)}>{p === 'all' ? 'All plans' : p}</button>
            ))}
          </div>
          <div className="adm-tabs">
            {['all','active','suspended','pending'].map(s => (
              <button key={s} className={`adm-tab${status === s ? ' adm-tab-on' : ''}`} onClick={() => setStatus(s)}>{s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Agents</th>
                <th>API Calls</th>
                <th>MRR</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const pc = PLAN_COLOR[user.plan]   ?? PLAN_COLOR['Starter'];
                const sc = STATUS_COLOR[user.status] ?? STATUS_COLOR['active'];
                return (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:30, height:30, borderRadius:'50%', background:`linear-gradient(135deg, var(--adm-orange), var(--adm-violet))`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff', flexShrink:0 }}>
                          {user.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13 }}>{user.name}</div>
                          <div style={{ fontSize:11, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`adm-badge ${pc.cls}`}>{user.plan}</span></td>
                    <td><span className={`adm-badge ${sc.cls}`}>{sc.label}</span></td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{user.agents}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{user.calls}</td>
                    <td style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13 }}>{user.mrr}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{user.joined}</td>
                    <td>
                      <div style={{ display:'flex', gap:5 }}>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm">Edit</button>
                        {user.status === 'active'
                          ? <button className="adm-btn adm-btn-danger adm-btn-sm">Suspend</button>
                          : <button className="adm-btn adm-btn-ghost adm-btn-sm">Restore</button>
                        }
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8}><div className="adm-empty" style={{ padding:'32px' }}><div className="adm-empty-title">No users match filters</div></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
