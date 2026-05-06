import { useState, useEffect } from 'react';

const steps = [
  { n: '01', t: 'Discover', d: 'Goals, audience, signals' },
  { n: '02', t: 'Configure', d: 'Pick or build a workflow' },
  { n: '03', t: 'Generate', d: 'AI creates the work' },
  { n: '04', t: 'Review', d: 'Human-in-the-loop checks' },
  { n: '05', t: 'Deploy', d: 'Publish, send, route' },
  { n: '06', t: 'Measure', d: 'Insights drive iteration' },
];

export default function WorkflowStrip() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % steps.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section-sm">
      <div className="container-wide">
        <div className="workflow-strip">
          <div className="workflow-line">
            <div className="workflow-progress" style={{ width: `${((active + 1) / steps.length) * 100}%` }}/>
          </div>
          <div className="workflow-steps">
            {steps.map((s, i) => (
              <div key={s.n} className={`workflow-step ${active === i ? 'active' : ''}`} onClick={() => setActive(i)}>
                <span className="workflow-dot"/>
                <span className="workflow-num mono">{s.n}</span>
                <span className="workflow-title">{s.t}</span>
                <span className="workflow-desc">{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
