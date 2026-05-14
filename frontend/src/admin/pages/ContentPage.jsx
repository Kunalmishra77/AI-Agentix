import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import { Search, Plus, FileText, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { CONTENT_ITEMS } from '../lib/mockData';

const TYPE_COLOR = {
  Blog:       { color:'#6366F1', bg:'#6366F118' },
  Docs:       { color:'#06B6D4', bg:'#06B6D418' },
  Guide:      { color:'#10B981', bg:'#10B98118' },
  Release:    { color:'#F97316', bg:'#F9731618' },
  Whitepaper: { color:'#A855F7', bg:'#A855F718' },
  Report:     { color:'#F59E0B', bg:'#F59E0B18' },
  Page:       { color:'#F59E0B', bg:'#F59E0B18' },
};

const STATUS_CFG = {
  published: { cls:'adm-badge-green',  label:'Published' },
  draft:     { cls:'adm-badge-muted',  label:'Draft' },
  review:    { cls:'adm-badge-blue',   label:'In Review' },
};

export default function ContentPage() {
  const [query,  setQuery]  = useState('');
  const [type,   setType]   = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = CONTENT_ITEMS.filter(c => {
    const matchQ = !query || c.title.toLowerCase().includes(query.toLowerCase());
    const matchT = type   === 'all' || c.type   === type;
    const matchS = status === 'all' || c.status === status;
    return matchQ && matchT && matchS;
  });

  const stats = {
    total:     CONTENT_ITEMS.length,
    published: CONTENT_ITEMS.filter(c => c.status === 'published').length,
    drafts:    CONTENT_ITEMS.filter(c => c.status === 'draft').length,
    totalViews: CONTENT_ITEMS.reduce((s, c) => {
      const n = parseFloat((c.views || '0').replace('K','')) * (c.views?.includes('K') ? 1000 : 1);
      return s + n;
    }, 0),
  };

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Content / CMS</div>
          <div className="adm-page-sub">{stats.total} items · {stats.published} published</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost"><Download size={13} /> Export</button>
          <button className="adm-btn adm-btn-primary"><Plus size={13} /> New Content</button>
        </div>
      </div>

      {/* Stats */}
      <div className="adm-grid-auto" style={{ marginBottom:20 }}>
        {[
          { label:'Total Items',    value:stats.total,                                          color:'#6366F1' },
          { label:'Published',      value:stats.published,                                      color:'#10B981' },
          { label:'Drafts',         value:stats.drafts,                                         color:'#F59E0B' },
          { label:'Total Views',    value:(stats.totalViews/1000).toFixed(1)+'K',               color:'#06B6D4' },
        ].map(s => (
          <div key={s.label} className="adm-stat" style={{ padding:'16px 18px' }}>
            <div className="adm-stat-accent" style={{ background:`linear-gradient(90deg, ${s.color}, transparent)` }} />
            <div className="adm-stat-label">{s.label}</div>
            <div className="adm-stat-value" style={{ fontSize:22 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="adm-card">
        {/* Filters */}
        <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap' }}>
          <div className="adm-search" style={{ flex:'1 1 200px' }}>
            <Search size={13} />
            <input placeholder="Search content..." value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="adm-tabs">
            {['all','Blog','Docs','Guide','Release','Whitepaper','Report'].map(t => (
              <button key={t} className={`adm-tab${type === t ? ' adm-tab-on' : ''}`} onClick={() => setType(t)}>
                {t === 'all' ? 'All types' : t}
              </button>
            ))}
          </div>
          <div className="adm-tabs">
            {['all','published','draft','review'].map(s => (
              <button key={s} className={`adm-tab${status === s ? ' adm-tab-on' : ''}`} onClick={() => setStatus(s)}>
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr><th>Title</th><th>Type</th><th>Status</th><th>Views</th><th>Author</th><th>Updated</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(item => {
                const tc = TYPE_COLOR[item.type]   ?? TYPE_COLOR['Page'];
                const sc = STATUS_CFG[item.status] ?? STATUS_CFG['draft'];
                return (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:tc.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <FileText size={12} color={tc.color} />
                        </div>
                        <span style={{ fontWeight:600, color:'var(--adm-t-0)', fontSize:13, maxWidth:280, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.title}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize:10, fontFamily:'var(--adm-font-mono)', color:tc.color, background:tc.bg, padding:'2px 7px', borderRadius:3 }}>{item.type}</span>
                    </td>
                    <td><span className={`adm-badge ${sc.cls}`}>{sc.label}</span></td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{item.views ?? '—'}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{item.author}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{item.updated}</td>
                    <td>
                      <div style={{ display:'flex', gap:5 }}>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm"><Eye size={10} /></button>
                        <button className="adm-btn adm-btn-ghost adm-btn-sm"><Edit size={10} /></button>
                        <button className="adm-btn adm-btn-danger adm-btn-sm"><Trash2 size={10} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7}><div className="adm-empty" style={{ padding:32 }}><FileText size={28} color="var(--adm-t-4)" /><div className="adm-empty-title">No content found</div></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
