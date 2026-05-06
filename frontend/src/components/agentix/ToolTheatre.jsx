import { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';

const theatres = [
  { id: 'content', name: 'AI Content Generator', cat: 'Content & Creative', accent: '#FF8B6B', accentRgb: '255, 139, 107', kind: 'writer' },
  { id: 'lead', name: 'Lead Enrichment & Scoring', cat: 'Sales & Revenue', accent: '#5B9BFF', accentRgb: '91, 155, 255', kind: 'leads' },
  { id: 'support', name: 'AI Support Chat Agent', cat: 'Customer Experience', accent: '#7FD7FF', accentRgb: '127, 215, 255', kind: 'chat' },
  { id: 'competitor', name: 'Competitor Analyzer', cat: 'Market Research', accent: '#B69BFF', accentRgb: '182, 155, 255', kind: 'report' },
  { id: 'workflow', name: 'Workflow Orchestrator', cat: 'Operations', accent: '#FFB060', accentRgb: '255, 176, 96', kind: 'flow' },
  { id: 'dash', name: 'Operations Dashboard', cat: 'Operations', accent: '#FFB060', accentRgb: '255, 176, 96', kind: 'dashboard' },
];

function ToolMock({ kind, accent, accentRgb }) {
  if (kind === 'writer') return (
    <div className="mock-split">
      <div className="mock-pane">
        <div className="mock-pane-head">
          <span className="mono mock-pane-label">Brief</span>
          <span className="chip mono" style={{ fontSize: 10 }}>blog · 1200 words</span>
        </div>
        <div className="mock-field"><div className="mock-field-label">Topic</div><div className="mock-field-val">How AI workflow automation reduces SaaS support load</div></div>
        <div className="mock-field"><div className="mock-field-label">Audience</div><div className="mock-field-val">SaaS founders · Customer success leads</div></div>
        <div className="mock-field"><div className="mock-field-label">Tone</div><div className="mock-field-val">Confident · technical · evidence-led</div></div>
        <div className="mock-field">
          <div className="mock-field-label">Sources</div>
          <div className="mock-tags">
            <span className="mock-tag">brand-voice.md</span>
            <span className="mock-tag">support-data.csv</span>
            <span className="mock-tag">3 customer interviews</span>
          </div>
        </div>
      </div>
      <div className="mock-pane mock-pane-output">
        <div className="mock-pane-head">
          <span className="mono mock-pane-label">Generated · streaming</span>
          <span className="dot dot-accent"/>
        </div>
        <div className="mock-doc">
          <div className="mock-h1">The hidden cost of human-only support</div>
          <p>For SaaS teams under 50, support burden grows faster than headcount. By month 18, founders are answering tickets at 11pm. <span className="mock-cursor">▌</span></p>
          <div className="mock-h2">Where AI actually helps</div>
          <p>The wins compound where context already exists — onboarding, billing, troubleshooting. Three patterns we see in production…</p>
          <div className="mock-callout">
            <span className="mono" style={{ fontSize: 10, color: accent }}>SOURCE</span>
            <span>support-data.csv · 412 conversations · last 30 days</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (kind === 'leads') {
    const rows = [
      ['Northwind SaaS','Series B · 240 emp','92','ICP',accent],
      ['Linder Studios','Agency · 18 emp','78','Hot',accent],
      ['Voltic Health','SMB · 60 emp','61','Warm','#B6F26A'],
      ['Forge Labs','Series A · 45 emp','57','Warm','#B6F26A'],
      ['Pinemark','SMB · 22 emp','34','Cold','var(--ink-3)'],
      ['Bayline','Agency · 8 emp','28','Cold','var(--ink-3)'],
    ];
    return (
      <div className="mock-leads">
        <div className="mock-leads-head">
          {[['Enriched','1,284',null],['ICP match','312',accent],['Routed','128',null],['Pipeline','$1.2M',null]].map(([l,v,c]) => (
            <div key={l} className="mock-leads-stat">
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontSize: 24, fontWeight: 500, color: c || 'var(--ink-0)' }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="mock-table">
          <div className="mock-table-head"><span>Account</span><span>Profile</span><span style={{ textAlign: 'right' }}>Score</span><span>Stage</span><span/></div>
          {rows.map(([name,profile,score,stage,color]) => (
            <div key={name} className="mock-table-row">
              <span style={{ color: 'var(--ink-0)' }}>{name}</span>
              <span style={{ color: 'var(--ink-2)', fontSize: 13 }}>{profile}</span>
              <span className="mono" style={{ textAlign: 'right', color: parseInt(score) > 70 ? accent : 'var(--ink-1)' }}>{score}</span>
              <span><span className="mock-pill" style={{ color, borderColor: `${color}55` }}>{stage}</span></span>
              <span style={{ textAlign: 'right', color: 'var(--ink-3)' }}><AgentixIcon name="arrow" size={12}/></span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === 'chat') return (
    <div className="mock-chat">
      <div className="mock-chat-head">
        <span className="chip" style={{ color: 'var(--ok)', borderColor: 'rgba(91,227,168,0.3)' }}><span className="chip-dot" style={{ background: 'var(--ok)' }}/>Online · 1.2s avg response</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>session #4012</span>
      </div>
      <div className="mock-chat-body">
        <div className="mock-msg user"><span className="mock-avatar u">EM</span><div><div className="mock-bubble">My team can't sync Salesforce contacts after the latest update. We're seeing duplicates in HubSpot too.</div></div></div>
        <div className="mock-msg ai"><span className="mock-avatar a" style={{ background: accent, color: '#fff' }}>A</span><div><div className="mock-bubble ai">I see your workspace had a sync conflict at 9:42am. Three things look related:<ul><li>Field mapping for "Lead Source" changed in v4.2</li><li>Duplicate detection rule paused since Tuesday</li><li>Two queued jobs need rerun</li></ul>Want me to walk through the fix or open a ticket?</div><div className="mock-cite">Cited: <span>integration-docs/v4.2.md</span> · <span>account #N-2240</span></div></div></div>
        <div className="mock-typing"><span/><span/><span/></div>
      </div>
      <div className="mock-chat-input">
        <span style={{ color: 'var(--ink-3)' }}>Type a message…</span>
        <span className="chip" style={{ fontSize: 10, marginLeft: 'auto' }}>↳ enter</span>
      </div>
    </div>
  );

  if (kind === 'report') return (
    <div className="mock-report">
      <div className="mock-report-grid">
        <div className="mock-card">
          <div className="eyebrow">Position</div>
          <div className="h-3" style={{ margin: '8px 0' }}>Mid-market challenger</div>
          <div className="mock-bar"><span style={{ width: '62%', background: accent }}/></div>
          <div className="body-sm">Above 4 of 7 competitors on workflow depth.</div>
        </div>
        <div className="mock-card">
          <div className="eyebrow">Pricing gap</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, margin: '8px 0' }}>
            <div className="h-3">$12k</div>
            <span className="mono" style={{ color: 'var(--ok)', fontSize: 12 }}>−18% vs avg</span>
          </div>
          <div className="body-sm">Room to package a Pro tier at $18k.</div>
        </div>
        <div className="mock-card mock-card-wide">
          <div className="eyebrow">Top messaging themes · last 30 days</div>
          <div className="mock-themes">
            {[['AI workflow',0.92],['Time saved',0.74],['Integration depth',0.68],['Human handoff',0.51],['Compliance',0.39]].map(([t,v]) => (
              <div key={t} className="mock-theme">
                <span style={{ flex: '0 0 140px', fontSize: 13 }}>{t}</span>
                <div className="mock-theme-bar"><span style={{ width: `${v*100}%`, background: accent }}/></div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{Math.round(v*100)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mock-card mock-card-wide">
          <div className="eyebrow">Recommended next moves</div>
          <ol className="mock-recs">
            <li><span className="mock-rec-num" style={{ color: accent }}>01</span> Reframe homepage around "AI operating system" — competitors avoid the OS framing.</li>
            <li><span className="mock-rec-num" style={{ color: accent }}>02</span> Launch comparison page targeting the two priced-up alternatives.</li>
            <li><span className="mock-rec-num" style={{ color: accent }}>03</span> Add SOC 2 badge above the fold; 4 of 7 lead with it.</li>
          </ol>
        </div>
      </div>
    </div>
  );

  if (kind === 'flow') return (
    <div className="mock-flow">
      <svg viewBox="0 0 600 320" className="mock-flow-svg">
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill={accent}/>
          </marker>
        </defs>
        {[['Form submitted',60,60],['Enrich',220,60],['Score',380,60],['Route by ICP',220,180],['Notify owner',380,180],['CRM update',540,60],['Send sequence',540,180],['Log activity',380,280]].map(([t,x,y],i) => (
          <g key={i}>
            <rect x={x-60} y={y-22} width="120" height="44" rx="8" fill="var(--bg-3)"
              stroke={i===2?accent:'rgba(255,255,255,0.12)'} strokeWidth={i===2?1.5:1}/>
            <text x={x} y={y+4} textAnchor="middle" fontSize="12" fontFamily="var(--font-display)" fill={i===2?accent:'var(--ink-1)'}>{t}</text>
          </g>
        ))}
        {[[120,60,160,60],[280,60,320,60],[440,60,480,60],[380,82,380,158],[320,180,280,180],[440,180,480,180],[380,202,380,258]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity={0.5} strokeWidth="1.2"
            strokeDasharray="3 4" markerEnd="url(#arrowhead)"
            style={{ animation: `flow-dash ${2+i*0.2}s linear infinite` }}/>
        ))}
        <circle cx={120} cy={60} r="3" fill={accent}>
          <animate attributeName="cx" values="120;480" dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <div className="mock-flow-foot">
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Last run</span>
        <span style={{ fontSize: 12 }}>2 minutes ago · 14 records · 0 errors</span>
        <span className="chip mono" style={{ fontSize: 10, marginLeft: 'auto', color: 'var(--ok)', borderColor: 'rgba(91,227,168,0.3)' }}>healthy</span>
      </div>
    </div>
  );

  if (kind === 'dashboard') return (
    <div className="mock-dashboard">
      <div className="mock-dash-row">
        {[['Open tickets','47','−12%',true],['Pipeline','$1.4M','+8%',true],['Approvals waiting','9','+2',false],['Active workflows','32','+4',true]].map(([l,v,d,ok]) => (
          <div key={l} className="mock-dash-stat">
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
            <div style={{ fontSize: 26, fontWeight: 500, marginTop: 6 }}>{v}</div>
            <div className="mono" style={{ fontSize: 11, color: ok ? 'var(--ok)' : 'var(--warn)', marginTop: 4 }}>{d}</div>
          </div>
        ))}
      </div>
      <div className="mock-dash-grid">
        <div className="mock-card">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Workflow health · 24h</div>
          <svg viewBox="0 0 320 100" className="mock-spark">
            {Array.from({ length: 32 }).map((_, i) => {
              const h = 30 + Math.sin(i * 0.8) * 18 + Math.cos(i * 0.4) * 12 + (i % 3) * 4;
              return <rect key={i} x={i * 10} y={100 - h} width="6" height={h} rx="1.5"
                fill={i > 26 ? accent : 'rgba(255,176,96,0.5)'}/>;
            })}
          </svg>
        </div>
        <div className="mock-card">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Top blockers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Invoice approval','3 stalled','var(--warn)'],['Demo follow-up','5 overdue','var(--err)'],['Content review','2 pending','var(--ink-2)']].map(([t,s,c]) => (
              <div key={t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="dot" style={{ background: c }}/>{t}</span>
                <span className="mono" style={{ color: 'var(--ink-2)', fontSize: 12 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return null;
}

export default function ToolTheatre() {
  const [active, setActive] = useState(theatres[0].id);
  const cur = theatres.find(t => t.id === active);

  return (
    <section className="section" id="theatre">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">04 / Tool theatre</span>
          <h2 className="h-1">Real outputs. Not just a feature list.</h2>
          <p className="body-lg" style={{ maxWidth: 640, marginTop: 20 }}>
            Every Agentix tool ships with a live preview. Switch tools — the input pane morphs into a real output.
          </p>
        </div>
        <div className="theatre card">
          <div className="theatre-rail">
            <div className="eyebrow" style={{ padding: '12px 16px 8px' }}>Featured tools</div>
            {theatres.map(t => (
              <button key={t.id}
                className={`theatre-rail-item ${active === t.id ? 'active' : ''}`}
                onClick={() => setActive(t.id)}
                style={{ '--accent-cat': t.accent }}>
                <span className="theatre-rail-dot" style={{ background: t.accent }}/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, textAlign: 'left' }}>
                  <span className="theatre-rail-name">{t.name}</span>
                  <span className="theatre-rail-cat">{t.cat}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="theatre-stage" key={cur.id}>
            <div className="theatre-stage-head">
              <div className="flex items-center gap-3">
                <span className="chip" style={{ borderColor: `rgba(${cur.accentRgb},0.4)`, color: cur.accent }}>
                  <span className="chip-dot" style={{ background: cur.accent }}/>{cur.cat}
                </span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--ink-2)' }}>tool / {cur.id}</span>
              </div>
              <div className="theatre-actions">
                <button className="theatre-action-btn"><AgentixIcon name="play" size={11}/>Run</button>
                <Link to={`/tools/${cur.id}`} className="theatre-action-btn">Open</Link>
              </div>
            </div>
            <div className="theatre-stage-body">
              <ToolMock kind={cur.kind} accent={cur.accent} accentRgb={cur.accentRgb}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
