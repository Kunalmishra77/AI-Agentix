import { useState, useEffect, useCallback } from 'react';
import AdminShell from '../layout/AdminShell';
import { adminApi } from '../lib/adminApi';
import { RefreshCw, Mail, Phone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

function timeAgo(dateStr) {
  if (!dateStr) return '—';
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60)    return 'just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const SOURCE_LABEL = { voice: '🎙 Voice', chat: '💬 Chat', manual: '🖱 Manual' };

export default function BookingsPage() {
  const [bookings,  setBookings]  = useState([]);
  const [meta,      setMeta]      = useState({ total: 0, page: 1, pages: 1 });
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [page,      setPage]      = useState(1);
  const [expanded,  setExpanded]  = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getBookings({ page, limit: 20 });
      if (res.success) {
        setBookings(res.data ?? []);
        setMeta(res.meta ?? { total: 0, page: 1, pages: 1 });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Demo Bookings</div>
          <div className="adm-page-sub">{meta.total} total bookings from voice, chat & manual sources</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost" onClick={() => fetchBookings()} style={{ gap:5 }}>
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

      {/* Summary */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label: 'Total Bookings', value: meta.total,                                          color: '#6366F1' },
          { label: 'Voice Agent',    value: bookings.filter(b => b.source === 'voice').length,   color: '#F97316' },
          { label: 'Chat Agent',     value: bookings.filter(b => b.source === 'chat').length,    color: '#10B981' },
          { label: 'Manual',         value: bookings.filter(b => b.source === 'manual' || !b.source).length, color: '#06B6D4' },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{loading ? '—' : s.value}</div>
          </div>
        ))}
      </div>

      <div className="adm-card">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Solution Need</th>
                <th>Preferred Date</th>
                <th>Source</th>
                <th>Booked</th>
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
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="adm-empty" style={{ padding:'40px' }}>
                      <div className="adm-empty-title">No bookings yet</div>
                      <div className="adm-empty-sub">Demo bookings from voice agent, chat, and manual sources appear here</div>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map(b => (
                  <>
                    <tr key={b.id} style={{ cursor:'pointer' }} onClick={() => setExpanded(expanded === b.id ? null : b.id)}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,var(--adm-cyan),var(--adm-violet))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#fff', flexShrink:0 }}>
                            {(b.name ?? '?')[0].toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13 }}>{b.name}</div>
                            <div style={{ fontSize:11, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>{b.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize:12, color:'var(--adm-t-2)' }}>{b.company ?? '—'}</td>
                      <td style={{ fontSize:12, color:'var(--adm-t-2)', maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{b.solutionNeed ?? b.solution_need ?? '—'}</td>
                      <td>
                        {b.preferredDate ? (
                          <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--adm-t-1)' }}>
                            <Calendar size={11} color="var(--adm-cyan)" />
                            {b.preferredDate} {b.preferredTime ? `@ ${b.preferredTime}` : ''}
                          </div>
                        ) : <span style={{ fontSize:12, color:'var(--adm-t-4)' }}>—</span>}
                      </td>
                      <td>
                        <span style={{ fontSize:11, fontFamily:'var(--adm-font-mono)', color:'var(--adm-t-2)' }}>
                          {SOURCE_LABEL[b.source] ?? b.source ?? '—'}
                        </span>
                      </td>
                      <td style={{ fontSize:11, color:'var(--adm-t-3)', fontFamily:'var(--adm-font-mono)' }}>
                        {timeAgo(b.createdAt)}
                      </td>
                      <td>
                        <div style={{ display:'flex', gap:5 }}>
                          <a href={`mailto:${b.email}`} onClick={e => e.stopPropagation()}
                            className="adm-btn adm-btn-ghost adm-btn-sm" title="Email">
                            <Mail size={11} />
                          </a>
                          {b.phone && (
                            <a href={`tel:${b.phone}`} onClick={e => e.stopPropagation()}
                              className="adm-btn adm-btn-ghost adm-btn-sm" title="Call">
                              <Phone size={11} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expanded === b.id && (
                      <tr key={`${b.id}-exp`} style={{ background:'var(--adm-bg-2)' }}>
                        <td colSpan={7} style={{ padding:'16px 20px' }}>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                            {b.notes && (
                              <div>
                                <div style={{ fontSize:11, fontWeight:700, color:'var(--adm-t-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Notes</div>
                                <div style={{ fontSize:13, color:'var(--adm-t-1)', lineHeight:1.6 }}>{b.notes}</div>
                              </div>
                            )}
                            <div>
                              <div style={{ fontSize:11, fontWeight:700, color:'var(--adm-t-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Booking Details</div>
                              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                                {[
                                  ['Calendar ID', b.calendarEventId ?? b.calendar_event_id],
                                  ['Source',      SOURCE_LABEL[b.source] ?? b.source],
                                  ['Date',        b.preferredDate],
                                  ['Time',        b.preferredTime],
                                  ['ID',          b.id],
                                ].filter(([,v]) => v).map(([k, v]) => (
                                  <div key={k} style={{ display:'flex', gap:8, fontSize:12 }}>
                                    <span style={{ color:'var(--adm-t-3)', width:80, flexShrink:0 }}>{k}:</span>
                                    <span style={{ color:'var(--adm-t-1)', fontFamily: k === 'ID' || k === 'Calendar ID' ? 'var(--adm-font-mono)' : undefined, fontSize: k === 'ID' ? 10 : 12 }}>{v}</span>
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
