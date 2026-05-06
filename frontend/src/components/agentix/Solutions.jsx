import AgentixIcon from './AgentixIcon';
import AGENTIX_DATA from '../../data/agentixData';
import { Link } from 'react-router-dom';

export default function Solutions() {
  const sols = AGENTIX_DATA.solutions;
  const cats = AGENTIX_DATA.categories;
  const getAccent = id => cats.find(c => c.id === id)?.accent || 'var(--accent)';

  return (
    <section className="section" id="solutions">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">06 / Solutions</span>
          <h2 className="h-1" style={{ maxWidth: 760, marginTop: 12 }}>
            Outcome-shaped stacks.<br/>
            <span style={{ color: 'var(--ink-2)' }}>Not feature buckets.</span>
          </h2>
        </div>
        <div className="solutions-grid">
          {sols.map((s, i) => (
            <Link key={s.id} to={`/solutions/${s.id}`} className="solution-card card"
              style={{ '--accent-cat': getAccent(s.category), animationDelay: `${i * 40}ms` }}>
              <div className="solution-head">
                <span className="solution-dot" style={{ background: getAccent(s.category) }}/>
                <span className="solution-cat mono">{cats.find(c => c.id === s.category)?.short}</span>
              </div>
              <h3 className="solution-name">{s.name}</h3>
              <p className="solution-outcome">{s.outcome}</p>
              <div className="solution-stack">
                {s.tools.map(t => <span key={t} className="solution-tool">{t}</span>)}
              </div>
              <div className="solution-cta">
                Build this stack <AgentixIcon name="arrow" size={12}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
