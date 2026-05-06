import AGENTIX_DATA from '../../data/agentixData';

export default function ValueProof() {
  return (
    <section className="section">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">09 / Why Agentix</span>
          <h2 className="h-1" style={{ maxWidth: 760, marginTop: 12 }}>Replaces a stack. <span style={{ color: 'var(--ink-2)' }}>Connects the rest.</span></h2>
        </div>
        <div className="proof-grid">
          <div className="proof-before card">
            <div className="eyebrow" style={{ color: 'var(--err)' }}>Before</div>
            <div className="h-4" style={{ margin: '8px 0 16px' }}>The fragmented stack</div>
            <div className="proof-cluster">
              {['Notion','Slack','Sheets','HubSpot','Intercom','Calendly','Loom','Figma','Linear','Zapier','Asana','Sales Nav'].map(t => (
                <span key={t} className="proof-pill">{t}</span>
              ))}
            </div>
            <div className="proof-stats">
              <div><div className="mono cc-foot-l">Tools</div><div className="cc-foot-v">12+</div></div>
              <div><div className="mono cc-foot-l">Manual handoffs</div><div className="cc-foot-v" style={{ color: 'var(--err)' }}>Daily</div></div>
              <div><div className="mono cc-foot-l">Time saved</div><div className="cc-foot-v">—</div></div>
            </div>
          </div>
          <div className="proof-arrow">
            <svg viewBox="0 0 60 200" width="60" height="200">
              <line x1="30" y1="20" x2="30" y2="180" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 4" style={{ animation: 'flow-dash 2s linear infinite' }}/>
              <circle cx="30" cy="100" r="20" fill="var(--accent-soft)" stroke="var(--accent)"/>
              <text x="30" y="105" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--accent)" letterSpacing="0.1em">AGNTX</text>
            </svg>
          </div>
          <div className="proof-after card">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>After</div>
            <div className="h-4" style={{ margin: '8px 0 16px' }}>One operating system</div>
            <div className="proof-cluster">
              {AGENTIX_DATA.categories.map(c => (
                <span key={c.id} className="proof-pill" style={{ borderColor: `rgba(${c.accentRgb},0.3)`, color: c.accent }}>
                  <span className="dot" style={{ background: c.accent, marginRight: 6 }}/>{c.short}
                </span>
              ))}
            </div>
            <div className="proof-stats">
              <div><div className="mono cc-foot-l">Tools</div><div className="cc-foot-v" style={{ color: 'var(--accent)' }}>1 platform</div></div>
              <div><div className="mono cc-foot-l">Manual handoffs</div><div className="cc-foot-v" style={{ color: 'var(--ok)' }}>Routed</div></div>
              <div><div className="mono cc-foot-l">Time saved</div><div className="cc-foot-v" style={{ color: 'var(--ok)' }}>~22h/wk</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
