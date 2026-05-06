import AgentixIcon from './AgentixIcon';
import { Link } from 'react-router-dom';

export default function CommandCenter() {
  return (
    <section className="section" id="command">
      <div className="container-wide">
        <div className="sec-head sec-head-center">
          <span className="eyebrow">08 / Command center</span>
          <h2 className="h-1" style={{ maxWidth: 880, margin: '16px auto 20px' }}>Not disconnected tools. <span style={{ color: 'var(--ink-2)' }}>An operating layer.</span></h2>
          <p className="body-lg" style={{ maxWidth: 640, margin: '0 auto' }}>One canvas to design, run, and observe every workflow your business depends on.</p>
        </div>
        <div className="cc-frame">
          <div className="cc-chrome">
            <div className="cc-chrome-dots"><span/><span/><span/></div>
            <div className="cc-chrome-url"><AgentixIcon name="shield" size={11} color="var(--ok)"/>app.agentix.ai · workspace · acme</div>
            <div className="cc-chrome-meta mono">v4.2 · live</div>
          </div>
          <div className="cc-body">
            <aside className="cc-side">
              <div className="cc-side-head">
                <AgentixIcon name="logo" size={18} color="var(--accent)"/>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Acme</span>
              </div>
              <div className="cc-side-section">
                <div className="cc-side-label">Workspaces</div>
                {['Content','Sales','Support','Ops','Finance'].map((w, i) => (
                  <div key={w} className={`cc-side-item ${i === 2 ? 'active' : ''}`}>
                    <span className="dot" style={{ background: ['#FF8B6B','#5B9BFF','#7FD7FF','#FFB060','#5BE3A8'][i] }}/>
                    <span style={{ flex: 1 }}>{w}</span>
                    <span className="mono cc-count">{[12,8,32,18,6][i]}</span>
                  </div>
                ))}
              </div>
              <div className="cc-side-section">
                <div className="cc-side-label">Recent</div>
                {['Ticket triage','Lead enrichment','Onboarding flow'].map(w => (
                  <div key={w} className="cc-side-item">
                    <AgentixIcon name="node" size={8} color="var(--ink-3)"/>
                    <span style={{ flex: 1 }}>{w}</span>
                  </div>
                ))}
              </div>
            </aside>
            <main className="cc-main">
              <div className="cc-main-head">
                <div>
                  <div className="eyebrow">Workspace · Support</div>
                  <h3 style={{ margin: '6px 0 0', fontSize: 20, fontWeight: 500 }}>Ticket Triage & Routing</h3>
                </div>
                <div className="cc-main-actions">
                  <Link to="/demo" className="theatre-action-btn"><AgentixIcon name="play" size={11}/>Run</Link>
                  <Link to="/talk-to-agentix" className="theatre-action-btn">Edit</Link>
                  <Link to="/demo" className="theatre-action-btn" style={{ color: 'var(--accent)', borderColor: 'rgba(232,117,32,0.3)' }}>Deploy</Link>
                </div>
              </div>
              <div className="cc-canvas">
                <svg viewBox="0 0 700 360" className="cc-svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                    </pattern>
                    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)"/>
                    </marker>
                  </defs>
                  <rect width="700" height="360" fill="url(#grid)"/>
                  {[
                    [80,80,'Inbox trigger','#7FD7FF',true],
                    [260,80,'Classify topic','var(--accent)',false],
                    [440,80,'Detect urgency','var(--accent)',false],
                    [620,80,'Score sentiment','var(--accent)',false],
                    [170,220,'Route to billing','#5BE3A8',false],
                    [350,220,'Route to product','#4D7BFF',false],
                    [530,220,'Escalate to human','#FF8B6B',false],
                  ].map(([x,y,l,c,trig],i) => (
                    <g key={i}>
                      <rect x={x-60} y={y-22} width="120" height="44" rx="8" fill="var(--bg-2)"
                        stroke={c} strokeOpacity={trig?0.8:0.35} strokeWidth={trig?1.5:1}/>
                      <circle cx={x-44} cy={y} r="3" fill={c}/>
                      <text x={x-30} y={y+4} fontSize="11" fontFamily="var(--font-display)" fill="var(--ink-0)">{l}</text>
                    </g>
                  ))}
                  {[[140,80,200,80],[320,80,380,80],[500,80,560,80],[260,102,260,160],[260,180,170,198],[260,180,350,198],[440,102,530,198]].map(([x1,y1,x2,y2],i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.2"
                      strokeDasharray="3 4" markerEnd="url(#arr)"
                      style={{ animation: `flow-dash ${2+i*0.15}s linear infinite` }}/>
                  ))}
                  <circle r="4" fill="var(--accent)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M 80 80 L 260 80 L 440 80 L 620 80"/>
                  </circle>
                </svg>
              </div>
              <div className="cc-foot">
                {[['Last run','2m ago'],['Volume','12,840 / day'],['Resolved','68% no-touch'],['Status','Healthy','var(--ok)']].map(([l,v,c]) => (
                  <div key={l}><div className="cc-foot-l">{l}</div><div className="cc-foot-v" style={{ color: c || 'var(--ink-0)' }}>{v}</div></div>
                ))}
              </div>
            </main>
            <aside className="cc-asst">
              <div className="cc-asst-head">
                <span className="dot dot-accent"/>
                <span style={{ fontSize: 12, fontWeight: 500 }}>Assistant</span>
              </div>
              <div className="cc-asst-msg">
                Tickets about "billing v2 migration" spiked 3× this morning. Recommend opening a status update and routing those to the finance squad.
              </div>
              <div className="cc-asst-actions">
                <Link to="/talk-to-agentix" className="cc-asst-btn primary">Apply</Link>
                <Link to="/security" className="cc-asst-btn">Review</Link>
              </div>
              <div className="cc-asst-cite">
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>Cited: support-data · 28 tickets</span>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
