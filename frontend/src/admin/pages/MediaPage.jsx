import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import { Upload, Search, Image, FileVideo, FileJson, Grid, List, Trash2, Copy, ExternalLink, FolderOpen } from 'lucide-react';
import { MEDIA_ASSETS } from '../lib/mockData';

const TYPE_ICON = { image: Image, video: FileVideo, lottie: FileJson, icon: Image };
const TYPE_COLOR = { image:'#6366F1', video:'#F97316', lottie:'#10B981', icon:'#06B6D4' };

const FOLDERS = ['All Assets', 'icons/categories', 'icons/tools', 'lottie', 'brand', 'uploads'];

export default function MediaPage() {
  const [query,  setQuery]  = useState('');
  const [type,   setType]   = useState('all');
  const [folder, setFolder] = useState('All Assets');
  const [view,   setView]   = useState('grid');
  const [copied, setCopied] = useState(null);

  const filtered = MEDIA_ASSETS.filter(a => {
    const matchQ = !query || a.name.toLowerCase().includes(query.toLowerCase());
    const matchT = type === 'all' || a.type === type;
    const matchF = folder === 'All Assets' || a.folder === folder;
    return matchQ && matchT && matchF;
  });

  function copyUrl(id, url) {
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  }

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Media Library</div>
          <div className="adm-page-sub">{MEDIA_ASSETS.length} assets · Cloudinary CDN-ready</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost">
            <ExternalLink size={13} /> Open Cloudinary
          </button>
          <button className="adm-btn adm-btn-primary">
            <Upload size={13} /> Upload Assets
          </button>
        </div>
      </div>

      {/* Upload zone */}
      <div style={{ border:'2px dashed var(--adm-bdr-2)', borderRadius:'var(--adm-r-lg)', padding:'32px', textAlign:'center', marginBottom:20, background:'var(--adm-bg-2)', cursor:'pointer', transition:'border-color var(--adm-dur-fast), background var(--adm-dur-fast)' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='var(--adm-orange-60)'; e.currentTarget.style.background='var(--adm-orange-06)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='var(--adm-bdr-2)'; e.currentTarget.style.background='var(--adm-bg-2)'; }}
      >
        <Upload size={24} color="var(--adm-t-3)" style={{ marginBottom:8 }} />
        <div style={{ fontSize:14, fontWeight:500, color:'var(--adm-t-1)', marginBottom:4 }}>Drop files here or click to upload</div>
        <div style={{ fontSize:12, color:'var(--adm-t-3)' }}>SVG, PNG, JPG, WebP, MP4, JSON · Max 50MB per file · Auto WebP conversion</div>
      </div>

      {/* Layout */}
      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:16 }}>
        {/* Folders sidebar */}
        <div className="adm-card" style={{ padding:'12px 0', height:'fit-content' }}>
          <div style={{ padding:'0 14px 8px', fontSize:10, fontFamily:'var(--adm-font-mono)', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--adm-t-3)' }}>Folders</div>
          {FOLDERS.map(f => (
            <button
              key={f}
              onClick={() => setFolder(f)}
              style={{ width:'100%', display:'flex', alignItems:'center', gap:8, padding:'8px 14px', background: folder === f ? 'var(--adm-orange-06)' : 'transparent', color: folder === f ? 'var(--adm-orange)' : 'var(--adm-t-2)', fontSize:12.5, fontWeight: folder === f ? 600 : 400, border:'none', cursor:'pointer', textAlign:'left', borderLeft: folder === f ? '2px solid var(--adm-orange)' : '2px solid transparent', transition:'all var(--adm-dur-fast)' }}
            >
              <FolderOpen size={13} />
              {f}
            </button>
          ))}
        </div>

        {/* Main area */}
        <div>
          {/* Filters */}
          <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
            <div className="adm-search" style={{ flex:'1 1 180px' }}>
              <Search size={13} />
              <input placeholder="Search assets..." value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="adm-tabs">
              {['all','image','icon','lottie','video'].map(t => (
                <button key={t} className={`adm-tab${type === t ? ' adm-tab-on' : ''}`} onClick={() => setType(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ display:'flex', gap:4, background:'var(--adm-bg-3)', border:'1px solid var(--adm-bdr-0)', borderRadius:'var(--adm-r-sm)', padding:3 }}>
              <button onClick={() => setView('grid')} style={{ padding:'5px 8px', borderRadius:'var(--adm-r-xs)', border:'none', background: view === 'grid' ? 'var(--adm-bg-4)' : 'transparent', cursor:'pointer', color: view === 'grid' ? 'var(--adm-t-0)' : 'var(--adm-t-3)', display:'flex', alignItems:'center' }}>
                <Grid size={13} />
              </button>
              <button onClick={() => setView('list')} style={{ padding:'5px 8px', borderRadius:'var(--adm-r-xs)', border:'none', background: view === 'list' ? 'var(--adm-bg-4)' : 'transparent', cursor:'pointer', color: view === 'list' ? 'var(--adm-t-0)' : 'var(--adm-t-3)', display:'flex', alignItems:'center' }}>
                <List size={13} />
              </button>
            </div>
          </div>

          {/* Asset grid */}
          {view === 'grid' ? (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px, 1fr))', gap:12 }}>
              {filtered.map(asset => {
                const Icon  = TYPE_ICON[asset.type]  ?? Image;
                const color = TYPE_COLOR[asset.type] ?? '#6366F1';
                return (
                  <div key={asset.id} className="adm-card" style={{ padding:0, overflow:'hidden', cursor:'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='var(--adm-bdr-2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='var(--adm-bdr-0)'}
                  >
                    <div style={{ height:100, background:'var(--adm-bg-3)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                      {asset.type === 'icon' || asset.type === 'image'
                        ? <img src={asset.url} alt="" style={{ maxWidth:'60%', maxHeight:'60%', objectFit:'contain' }} onError={e => { e.currentTarget.style.display='none'; }} />
                        : <Icon size={28} color={color} />
                      }
                      <div style={{ position:'absolute', top:6, right:6, display:'flex', gap:4 }}>
                        <button onClick={() => copyUrl(asset.id, asset.url)} style={{ width:22, height:22, borderRadius:5, background:'var(--adm-bg-overlay)', border:'1px solid var(--adm-bdr-1)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'var(--adm-t-1)' }}>
                          <Copy size={10} />
                        </button>
                      </div>
                      {copied === asset.id && (
                        <div style={{ position:'absolute', inset:0, background:'var(--adm-green-10)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, color:'var(--adm-green)', fontFamily:'var(--adm-font-mono)' }}>
                          Copied!
                        </div>
                      )}
                    </div>
                    <div style={{ padding:'10px 10px 8px' }}>
                      <div style={{ fontSize:11, fontWeight:500, color:'var(--adm-t-0)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{asset.name}</div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                        <span style={{ fontSize:10, fontFamily:'var(--adm-font-mono)', color:`${color}`, background:`${color}15`, padding:'1px 5px', borderRadius:3 }}>{asset.type}</span>
                        <span style={{ fontSize:10, fontFamily:'var(--adm-font-mono)', color:'var(--adm-t-3)' }}>{asset.size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="adm-empty" style={{ gridColumn:'1/-1' }}>
                  <Image size={28} color="var(--adm-t-4)" />
                  <div className="adm-empty-title">No assets found</div>
                  <div className="adm-empty-sub">Try a different filter or upload new assets</div>
                </div>
              )}
            </div>
          ) : (
            <div className="adm-card">
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Folder</th><th>Used In</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filtered.map(asset => {
                      const Icon  = TYPE_ICON[asset.type]  ?? Image;
                      const color = TYPE_COLOR[asset.type] ?? '#6366F1';
                      return (
                        <tr key={asset.id}>
                          <td>
                            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                              <div style={{ width:28, height:28, borderRadius:'var(--adm-r-sm)', background:`${color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                <Icon size={13} color={color} />
                              </div>
                              <span style={{ fontSize:12, color:'var(--adm-t-0)', fontWeight:500 }}>{asset.name}</span>
                            </div>
                          </td>
                          <td><span style={{ fontSize:10, fontFamily:'var(--adm-font-mono)', color, background:`${color}15`, padding:'2px 7px', borderRadius:3 }}>{asset.type}</span></td>
                          <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11 }}>{asset.size}</td>
                          <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{asset.folder}</td>
                          <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11 }}>{asset.used} refs</td>
                          <td>
                            <div style={{ display:'flex', gap:5 }}>
                              <button className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => copyUrl(asset.id, asset.url)}>{copied === asset.id ? '✓' : 'Copy URL'}</button>
                              <button className="adm-btn adm-btn-danger adm-btn-sm"><Trash2 size={10} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
