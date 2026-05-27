import { useState, useEffect, useCallback } from 'react';
import AdminShell from '../layout/AdminShell';
import { adminApi } from '../lib/adminApi';
import { Search, RefreshCw, Mail, Phone, Building2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const STATUS_META = {
  new:        { label: 'New',        cls: 'adm-badge-orange' },
  contacted:  { label: 'Contacted',  cls: 'adm-badge-blue' },
  qualified:  { label: 'Qualified',  cls: 'adm-badge-green' },
  closed:     { label: 'Closed',     cls: 'adm-badge-muted' },
  spam:       { label: 'Spam',       cls: 'adm-badge-red' },
};
const ALL_STATUSES = ['all', 'new', 'contacted', 'qualified', 'closed', 'spam'];

function timeAgo(dateStr) {
  if (!dateStr) return '—';
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)    return 'just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function LeadsPage() {
  const [leads,     setLeads]     = useState([]);
  const [meta,      setMeta]      = useState({ total: 0, page: 1, pages: 1 });
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [query,     setQuery]     = useState('');
  const [status,    setStatus]    = useState('all');
  const [page,      setPage]      = useState(1);
  const [expanded,  setExpanded]  = useState(null);
  const [updating,  setUpdating]  = useState(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, limit: 20 };
      if (status !== 'all') params.status = status;
      if (query)            params.q      = query;
      const res = await adminApi.getLeads(params);
      if (res.success) {
        setLeads(res.data ?? []);
        setMeta(res.meta ?? { total: 0, page: 1, pages: 1 });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page, status, query]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchLeads(); }, 350);
    return () => clearTimeout(t);
  }, [query]);

  async function handleStatusChange(id, newStatus) {
    setUpdating(id);
    try {
      const res = await adminApi.updateLeadStatus(id, newStatus);
      if (res.success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      }
    } catch { /* silent */ }
    finally { setUpdating(null); }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this lead permanently?')) return;
    try {
      await adminApi.deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
      setMeta(prev => ({ ...prev, total: prev.total - 1 }));
    } catch { /* silent */ }
  }

  const newCount = leads.filter(l => l.status === 'new').length;

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Leads & Inquiries</div>
          <div className="adm-page-sub">{meta.total} total submissions · {newCount} new</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost" onClick={() => fetchLeads()} style={{ gap:5 }}>
            <RefreshCw size={13} style={{ animation: loading ? 'spin 0.8s linear infinite' : 'none' }} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginBottom:16, padding:'10px 16px', borderRadius:'var(--adm-r-md)', border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.06)', fontSize:13, color:'#EF4444' }}>
          ⚠ Backend error: {error}. Make sure the server is running.
        </div>
      )}

      {/* ── Summary cards ── */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label: 'Total Leads',  value: meta.total,                                        color: '#6366F1' },
          { label: 'New',          value: leads.filter(l => l.status === 'new').length,       color: '#F97316' },
          { label: 'Qualified',    value: leads.filter(l => l.status === 'qualified').length, color: '#10B981' },
          { label: 'Closed',       value: leads.filter(l => l.status === 'closed').length,    color: '#06B6D4' },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{loading ? '—' : s.value}</div>
          </div>
        ))}
      </div>

      <div className="adm-card">
        {/* ── Filters ── */}
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <div className="adm-search" style={{ flex:'1 1 220px' }}>
            <Search size={13} />
            <input
              placeholder="Search name, email, company..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <div className="adm-tabs">
            {ALL_STATUSES.map(s => (
              <button key={s} className={`adm-tab${status === s ? ' adm-tab-on' : ''}`}
                onClick={() => { setStatus(s); setPage(1); }}>
                {s === 'all' ? 'All' : STATUS_META[s]?.label ?? s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table ── */}
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Company</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Received</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j}><div style={{ height:12, background:'var(--adm-bg-3)', borderRadius:4, width:'70%' }} /></td>
                    ))}
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="adm-empty" style={{ padding:'40px' }}>
                      <div className="adm-empty-title">No leads found</div>
                      <div className="adm-empty-sub">Contact form submissions will appear here</div>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map(lead => (
                  <>
                    <tr key={lead.id} style={{ cursor:'pointer' }} onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,var(--adm-orange),var(--adm-violet))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff', flexShrink:0 }}>
                            {(lead.name ?? '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13 }}>{lead.name}</div>
                            <div style={{ fontSize:11, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>{lead.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize:12, color:'var(--adm-t-2)' }}>{lead.company ?? '—'}</td>
                      <td style={{ fontSize:12, color:'var(--adm-t-2)' }}>{lead.service ?? '—'}</td>
                      <td style={{ fontSize:12, color:'var(--adm-t-2)' }}>{lead.budget ?? '—'}</td>
                      <td>
                        <select
                          value={lead.status ?? 'new'}
                          disabled={updating === lead.id}
                          onClick={e => e.stopPropagation()}
                          onChange={e => handleStatusChange(lead.id, e.target.value)}
                          style={{ background:'transparent', border:'1px solid var(--adm-bdr-1)', borderRadius:6, padding:'3px 8px', fontSize:11, color:'var(--adm-t-1)', cursor:'pointer', fontFamily:'var(--adm-font-body)' }}
                        >
                          {Object.entries(STATUS_META).map(([val, { label }]) => (
                            <option key={val} value={val} style={{ background:'#1a1a2e' }}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ fontSize:11, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>{timeAgo(lead.createdAt)}</td>
                      <td>
                        <div style={{ display:'flex', gap:5 }}>
                          <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()}
                            className="adm-btn adm-btn-ghost adm-btn-sm" title="Send email">
                            <Mail size={11} />
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()}
                              className="adm-btn adm-btn-ghost adm-btn-sm" title="Call">
                              <Phone size={11} />
                            </a>
                          )}
                          <button onClick={e => { e.stopPropagation(); handleDelete(lead.id); }}
                            className="adm-btn adm-btn-danger adm-btn-sm" title="Delete">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-exp`} style={{ background:'var(--adm-bg-2)' }}>
                        <td colSpan={7} style={{ padding:'16px 20px' }}>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                            <div>
                              <div style={{ fontSize:11, fontWeight:700, color:'var(--adm-t-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Message</div>
                              <div style={{ fontSize:13, color:'var(--adm-t-1)', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{lead.message}</div>
                            </div>
                            <div>
                              <div style={{ fontSize:11, fontWeight:700, color:'var(--adm-t-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Details</div>
                              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                                {[
                                  ['Phone',   lead.phone],
                                  ['Company', lead.company],
                                  ['Service', lead.service],
                                  ['Budget',  lead.budget],
                                  ['Source',  lead.source],
                                  ['ID',      lead.id],
                                ].filter(([,v]) => v).map(([k, v]) => (
                                  <div key={k} style={{ display:'flex', gap:8, fontSize:12 }}>
                                    <span style={{ color:'var(--adm-t-3)', width:70, flexShrink:0 }}>{k}:</span>
                                    <span style={{ color:'var(--adm-t-1)', fontFamily: k === 'ID' ? 'var(--adm-font-mono)' : undefined, fontSize: k === 'ID' ? 10 : 12 }}>{v}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        {meta.pages > 1 && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:16, paddingTop:16, borderTop:'1px solid var(--adm-bdr-0)' }}>
            <div style={{ fontSize:12, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>
              Page {meta.page} of {meta.pages} · {meta.total} total
            </div>
            <div style={{ display:'flex', gap:6 }}>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft size={12} />
              </button>
              <button className="adm-btn adm-btn-ghost adm-btn-sm" disabled={page >= meta.pages} onClick={() => setPage(p => p + 1)}>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AdminShell>
  );
}
