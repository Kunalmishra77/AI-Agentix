import AgentixIcon from './AgentixIcon';
import { Link } from 'react-router-dom';

export default function VoiceCTA() {
  return (
    <section className="section voice-section">
      <div className="container">
        <div className="voice-inner">
          <div className="voice-orb">
            <div className="voice-orb-core"/>
            <div className="voice-orb-ring r1"/>
            <div className="voice-orb-ring r2"/>
            <div className="voice-orb-ring r3"/>
            <div className="voice-wave">
              {Array.from({ length: 32 }).map((_, i) => <span key={i} style={{ animationDelay: `${i * 30}ms` }}/>)}
            </div>
          </div>
          <span className="eyebrow" style={{ color: 'var(--accent)' }}>11 / Talk to Agentix</span>
          <h2 className="h-display" style={{ maxWidth: 880, margin: '16px 0', textAlign: 'center' }}>
            Tell Agentix<br/><span style={{ color: 'var(--ink-2)' }}>what you want to build.</span>
          </h2>
          <div className="voice-prompts">
            {['Build my sales stack','Create a content workflow','Automate support','Research my market'].map(p => (
              <Link key={p} to={`/search?q=${encodeURIComponent(p)}`} className="voice-prompt-chip">{p}</Link>
            ))}
          </div>
          <div className="voice-input">
            <AgentixIcon name="mic" size={16} color="var(--accent)"/>
            <input placeholder="Or type your goal — Agentix will route you to the right stack." aria-label="Voice prompt"/>
            <Link to="/talk-to-agentix" className="btn btn-primary">Send <AgentixIcon name="arrow" size={12}/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
