import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import { Download, RefreshCw, Search, Terminal } from 'lucide-react';
import { LOG_ENTRIES } from '../lib/mockData';

const LEVEL_CFG = {
  info:    { cls:'adm-badge-blue',   color:'#3B82F6',  bg:'#3B82F618' },
  warn:    { cls:'adm-badge-amber',  color:'#F59E0B',  bg:'#F59E0B18' },
  error:   { cls:'adm-badge-red',    color:'#F43F5E',  bg:'#F43F5E18' },
  debug:   { cls:'adm-badge-muted',  color:'#94A3B8',  bg:'#94A3B818' },
  success: { cls:'adm-badge-green',  color:'#10B981',  bg:'#10B98118' },
};

export default function LogsPage() {
  const [level,  setLevel]  = useState('all');
  const [query,  setQuery]  = useState('');
  const [live,   setLive]   = useState(true);

  const filtered = LOG_ENTRIES.filter(l => {
    const matchL = level === 'all' || l.level === level;
    const matchQ = !query || l.message.toLowerCase().includes(query.toLowerCase()) || l.service.toLowerCase().includes(query.toLowerCase());
    return matchL && matchQ;
  });

  const counts = ['info','warn','error','debug'].reduce((acc, lv) => {
    acc[lv] = LOG_ENTRIES.filter(l => l.level === lv).length;
    return acc;
  }, {});

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">System Logs</div>
          <div className="adm-page-sub">Last 24 hours · {LOG_ENTRIES.length} entries</div>
        </div>
        <div className="adm-page-actions">
          <button
            className="adm-btn adm-btn-ghost"
            onClick={() => setLive(v => !v)}
            style={{ color: live ? 'var(--adm-green)' : undefined }}
          >
            <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background: live ? 'var(--adm-green)' : 'var(--adm-t-3)', marginRight:4 }} />
            {live ? 'Live' : 'Paused'}
          </button>
          <button className="adm-btn adm-btn-ghost"><Download size={13} /> Export</button>
          <button className="adm-btn adm-btn-ghost"><RefreshCw size={13} /> Refresh</button>
        </div>
      </div>

      {/* Level summary pills */}
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {[
          { key:'all',   label:'All',   count:LOG_ENTRIES.length, color:'var(--adm-t-2)' },
          { key:'error', label:'Error', count:counts.error,       color:'#F43F5E' },
          { key:'warn',  label:'Warn',  count:counts.warn,        color:'#F59E0B' },
          { key:'info',  label:'Info',  count:counts.info,        color:'#3B82F6' },
          { key:'debug', label:'Debug', count:counts.debug,       color:'#94A3B8' },
        ].map(lv => (
          <button
            key={lv.key}
            onClick={() => setLevel(lv.key)}
            style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'5px 12px', borderRadius:'var(--adm-r-sm)',
              border: level === lv.key ? `1px solid ${lv.color}` : '1px solid var(--adm-bdr-0)',
              background: level === lv.key ? `${lv.color}15` : 'var(--adm-bg-3)',
              color: level === lv.key ? lv.color : 'var(--adm-t-3)',
              cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'var(--adm-font-mono)',
              transition:'all var(--adm-dur-fast)',
            }}
          >
            {lv.label}
            <span style={{ fontSize:10, background:`${lv.color}20`, padding:'0 5px', borderRadius:10, color:'inherit' }}>{lv.count}</span>
          </button>
        ))}

        <div className="adm-search" style={{ flex:'1 1 200px', marginLeft:'auto' }}>
          <Search size={13} />
          <input placeholder="Filter by message or service..." value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      {/* Log stream */}
      <div className="adm-card" style={{ padding:0, fontFamily:'var(--adm-font-mono)' }}>
        {/* Stream header */}
        <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px', borderBottom:'1px solid var(--adm-bdr-0)', background:'var(--adm-bg-3)' }}>
          <Terminal size={12} color="var(--adm-t-3)" />
          <span style={{ fontSize:10, color:'var(--adm-t-3)', letterSpacing:'0.08em', textTransform:'uppercase' }}>Log Stream — {filtered.length} entries</span>
          {live && <span style={{ marginLeft:'auto', fontSize:10, color:'var(--adm-green)' }}>● live</span>}
        </div>

        {filtered.map((log, i) => {
          const lc = LEVEL_CFG[log.level] ?? LEVEL_CFG['info'];
          return (
            <div
              key={i}
              style={{
                display:'grid',
                gridTemplateColumns:'160px 70px 120px 1fr',
                gap:12,
                alignItems:'start',
                padding:'10px 16px',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--adm-bdr-0)' : 'none',
                background: log.level === 'error' ? '#F43F5E06' : log.level === 'warn' ? '#F59E0B05' : 'transparent',
                transition:'background var(--adm-dur-fast)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--adm-bg-3)'}
              onMouseLeave={e => e.currentTarget.style.background = log.level === 'error' ? '#F43F5E06' : log.level === 'warn' ? '#F59E0B05' : 'transparent'}
            >
              <span style={{ fontSize:10, color:'var(--adm-t-4)', whiteSpace:'nowrap', paddingTop:1 }}>{log.time}</span>
              <span className={`adm-badge ${lc.cls}`} style={{ justifySelf:'start', fontSize:9, letterSpacing:'0.05em' }}>{log.level.toUpperCase()}</span>
              <span style={{ fontSize:10, color:'var(--adm-orange)', background:'var(--adm-orange-06)', padding:'1px 6px', borderRadius:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>[{log.service}]</span>
              <span style={{ fontSize:12, color:'var(--adm-t-1)', lineHeight:1.5, fontFamily:'var(--adm-font-mono)' }}>{log.message}</span>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="adm-empty" style={{ padding:40 }}>
            <Terminal size={28} color="var(--adm-t-4)" />
            <div className="adm-empty-title">No log entries match</div>
            <div className="adm-empty-sub">Try a different level or clear the search filter</div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
