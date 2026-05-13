import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import AreaChart from '../components/charts/AreaChart';
import DonutChart from '../components/charts/DonutChart';
import { Brain, Zap, DollarSign, AlertTriangle, RefreshCw, Settings, MessageSquare, Mic, Key } from 'lucide-react';
import { AI_USAGE } from '../lib/mockData';

const MODEL_SEGMENTS = AI_USAGE.models.map((m, i) => ({
  label: m.name,
  value: m.share,
  color: ['#F97316','#6366F1','#06B6D4'][i],
}));

const PROMPT_TEMPLATES = [
  { id:'PT-001', name:'Lead Qualifier System',   model:'claude-sonnet-4-6', tokens:'~800', updated:'2026-05-10', status:'active' },
  { id:'PT-002', name:'Content Writer v4',       model:'claude-opus-4-7',   tokens:'~1200', updated:'2026-05-08', status:'active' },
  { id:'PT-003', name:'Support Agent Base',      model:'claude-haiku-4-5',  tokens:'~400',  updated:'2026-05-01', status:'active' },
  { id:'PT-004', name:'Research Analyst',        model:'claude-opus-4-7',   tokens:'~1600', updated:'2026-04-22', status:'draft' },
  { id:'PT-005', name:'Invoice Processor',       model:'claude-haiku-4-5',  tokens:'~600',  updated:'2026-04-15', status:'active' },
];

const VOICE_CONFIG = {
  persona: 'Aria — Professional AI Assistant',
  wakePhrase: 'Hey Agentix',
  language: 'English (US)',
  responseTimeout: '8s',
  maxSessionDuration: '20min',
  ttsModel: 'Groq Whisper v3',
};

export default function AiManagePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = ['overview', 'prompts', 'voice', 'api-keys'];

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">AI Management</div>
          <div className="adm-page-sub">Model usage · Prompt library · Voice agent · API keys</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-ghost"><RefreshCw size={13} /> Sync Usage</button>
          <button className="adm-btn adm-btn-primary"><Brain size={13} /> New Prompt</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="adm-tabs" style={{ marginBottom:20, width:'fit-content' }}>
        {tabs.map(t => (
          <button key={t} className={`adm-tab${activeTab === t ? ' adm-tab-on' : ''}`} onClick={() => setActiveTab(t)}>
            {t === 'overview' ? 'Overview' : t === 'prompts' ? 'Prompt Library' : t === 'voice' ? 'Voice Agent' : 'API Keys'}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === 'overview' && (
        <>
          <div className="adm-grid-auto" style={{ marginBottom:20 }}>
            {[
              { label:'Total Tokens (Mo)',  value:AI_USAGE.totalTokens, color:'#F97316', icon:Zap },
              { label:'AI Cost (Month)',    value:AI_USAGE.costMonth,   color:'#6366F1', icon:DollarSign },
              { label:'Avg Latency',        value:AI_USAGE.avgLatency,  color:'#10B981', icon:Brain },
              { label:'Error Rate',         value:AI_USAGE.errorRate,   color:'#F43F5E', icon:AlertTriangle },
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

          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:16 }}>
            <div className="adm-card">
              <div className="adm-card-hdr">
                <div className="adm-card-title">Token Usage Trend</div>
                <div className="adm-card-sub">9-week · M tokens</div>
              </div>
              <AreaChart data={AI_USAGE.tokenTrend} labels={['W1','W2','W3','W4','W5','W6','W7','W8','W9']} color="#F97316" height={160} formatY={v => `${v}M`} />
            </div>
            <div className="adm-card">
              <div className="adm-card-hdr">
                <div className="adm-card-title">Model Distribution</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
                <DonutChart segments={MODEL_SEGMENTS} size={120} strokeW={18} />
                <div style={{ display:'flex', flexDirection:'column', gap:6, width:'100%' }}>
                  {MODEL_SEGMENTS.map(s => (
                    <div key={s.label} style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ width:8, height:8, borderRadius:2, background:s.color, flexShrink:0 }} />
                      <span style={{ fontSize:11, color:'var(--adm-t-2)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.label}</span>
                      <span style={{ fontSize:11, fontFamily:'var(--adm-font-mono)', color:'var(--adm-t-0)', fontWeight:600 }}>{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-hdr">
              <div className="adm-card-title">Model Usage Breakdown</div>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead><tr><th>Model</th><th>API Calls</th><th>Tokens</th><th>Avg Latency</th><th>Cost</th><th>Share</th></tr></thead>
                <tbody>
                  {AI_USAGE.models.map((m, i) => (
                    <tr key={m.name}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:8, height:8, borderRadius:2, background:MODEL_SEGMENTS[i].color }} />
                          <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:12, color:'var(--adm-t-0)' }}>{m.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{m.calls}</td>
                      <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{m.tokens}</td>
                      <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{m.latency}</td>
                      <td style={{ fontWeight:600, color:'var(--adm-t-0)' }}>{m.cost}</td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ flex:1, height:4, background:'var(--adm-bdr-1)', borderRadius:2, overflow:'hidden' }}>
                            <div style={{ width:`${m.share}%`, height:'100%', background:MODEL_SEGMENTS[i].color, borderRadius:2 }} />
                          </div>
                          <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-2)', width:30, textAlign:'right' }}>{m.share}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── PROMPTS ── */}
      {activeTab === 'prompts' && (
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">Prompt Library</div>
            <button className="adm-btn adm-btn-primary adm-btn-sm"><MessageSquare size={11} /> New Template</button>
          </div>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>ID</th><th>Name</th><th>Model</th><th>Est. Tokens</th><th>Updated</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {PROMPT_TEMPLATES.map(pt => (
                  <tr key={pt.id}>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{pt.id}</td>
                    <td style={{ fontWeight:600, color:'var(--adm-t-0)' }}>{pt.name}</td>
                    <td><span style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-violet)' }}>{pt.model}</span></td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:12 }}>{pt.tokens}</td>
                    <td style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)' }}>{pt.updated}</td>
                    <td><span className={`adm-badge ${pt.status === 'active' ? 'adm-badge-green' : 'adm-badge-muted'}`}>{pt.status}</span></td>
                    <td><div style={{ display:'flex', gap:5 }}><button className="adm-btn adm-btn-ghost adm-btn-sm">Edit</button><button className="adm-btn adm-btn-ghost adm-btn-sm">Clone</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── VOICE AGENT ── */}
      {activeTab === 'voice' && (
        <div className="adm-grid-2">
          <div className="adm-card">
            <div className="adm-card-hdr">
              <div className="adm-card-title">Voice Agent Config</div>
              <Mic size={14} color="var(--adm-cyan)" />
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {Object.entries(VOICE_CONFIG).map(([k, v]) => (
                <div key={k}>
                  <label className="adm-label">{k.replace(/([A-Z])/g, ' $1').trim()}</label>
                  <input className="adm-input" defaultValue={v} />
                </div>
              ))}
              <button className="adm-btn adm-btn-primary" style={{ marginTop:4 }}>Save Voice Config</button>
            </div>
          </div>
          <div className="adm-card">
            <div className="adm-card-hdr">
              <div className="adm-card-title">Voice Session Stats</div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {[
                { label:'Active Sessions',    value:'12', color:'var(--adm-green)' },
                { label:'Sessions Today',     value:'284', color:'var(--adm-orange)' },
                { label:'Avg Duration',       value:'4m 22s', color:'var(--adm-violet)' },
                { label:'Completion Rate',    value:'94.8%', color:'var(--adm-cyan)' },
                { label:'Transcription Acc.', value:'98.2%', color:'var(--adm-green)' },
                { label:'Peak Concurrent',    value:'48', color:'var(--adm-amber)' },
              ].map(s => (
                <div key={s.label} className="adm-health-row">
                  <span className="adm-health-name">{s.label}</span>
                  <span style={{ fontFamily:'var(--adm-font-mono)', fontSize:13, fontWeight:600, color:s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── API KEYS ── */}
      {activeTab === 'api-keys' && (
        <div className="adm-card">
          <div className="adm-card-hdr">
            <div className="adm-card-title">API Key Management</div>
            <button className="adm-btn adm-btn-primary adm-btn-sm"><Key size={11} /> Generate Key</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              { service:'Groq AI',      key:'gsk_••••••••••••••••••••••2k8f', status:'active',   scopes:'inference, stream' },
              { service:'Cloudinary',   key:'cl_••••••••••••••••••••••5x3r', status:'active',   scopes:'upload, transform' },
              { service:'Supabase',     key:'sb_••••••••••••••••••••••9z1m', status:'active',   scopes:'db:read, db:write' },
              { service:'SMTP (Gmail)', key:'gs_••••••••••••••••••••••7p4n', status:'active',   scopes:'send' },
              { service:'Stripe',       key:'sk_••••••••••••••••••••••3q8w', status:'active',   scopes:'charges, webhooks' },
            ].map(k => (
              <div key={k.service} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:'1px solid var(--adm-bdr-0)' }}>
                <Key size={14} color="var(--adm-t-3)" />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--adm-t-0)' }}>{k.service}</div>
                  <div style={{ fontFamily:'var(--adm-font-mono)', fontSize:11, color:'var(--adm-t-3)', marginTop:2 }}>{k.key}</div>
                  <div style={{ fontSize:10, color:'var(--adm-t-3)', marginTop:2 }}>Scopes: {k.scopes}</div>
                </div>
                <span className="adm-badge adm-badge-green">{k.status}</span>
                <div style={{ display:'flex', gap:5 }}>
                  <button className="adm-btn adm-btn-ghost adm-btn-sm">Rotate</button>
                  <button className="adm-btn adm-btn-danger adm-btn-sm">Revoke</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
