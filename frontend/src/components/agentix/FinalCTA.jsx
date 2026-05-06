import AgentixIcon from './AgentixIcon';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="section final-cta-section">
      <div className="container">
        <svg viewBox="0 0 1200 200" className="final-cta-bg" preserveAspectRatio="none">
          <line x1="0" y1="100" x2="1200" y2="100" stroke="var(--line)" strokeWidth="1"/>
          {[150,400,650,900,1100].map(x => (
            <circle key={x} cx={x} cy="100" r="3" fill="var(--accent)" opacity="0.6"/>
          ))}
          <path d="M 0 100 Q 600 40 1200 100" fill="none" stroke="var(--accent)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 6" style={{ animation: 'flow-dash 8s linear infinite' }}/>
        </svg>
        <div className="final-cta-inner">
          <span className="eyebrow" style={{ color: 'var(--accent)' }}>13 / Start here</span>
          <h2 className="h-display" style={{ maxWidth: 980, margin: '16px 0 8px' }}>Start with one workflow.</h2>
          <p className="h-2" style={{ color: 'var(--ink-2)', maxWidth: 780, margin: '0 0 32px', fontWeight: 400 }}>
            Scale into an AI operating system.
          </p>
          <div className="hero-ctas" style={{ justifyContent: 'center' }}>
            <Link to="/talk-to-agentix" className="btn btn-primary btn-lg"><AgentixIcon name="mic" size={14}/>Talk to Agentix</Link>
            <Link to="/demo" className="btn btn-secondary btn-lg">Book a Demo</Link>
          </div>
          <div className="final-cta-meta">
            <span className="chip"><span className="chip-dot" style={{ background: 'var(--ok)' }}/>14-day pilot</span>
            <span className="chip">No credit card</span>
            <span className="chip">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
