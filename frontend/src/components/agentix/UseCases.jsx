import { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';
import AGENTIX_DATA from '../../data/agentixData';

function UseCaseDashboard({ ucName }) {
  return (
    <div className="uc-dash">
      <div className="uc-dash-head">
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Today · {ucName}</span>
        <span className="dot dot-accent"/>
      </div>
      <div className="uc-dash-stats">
        <div><div className="mono uc-dash-stat-l">Active workflows</div><div className="uc-dash-stat-v">12</div></div>
        <div><div className="mono uc-dash-stat-l">Time saved</div><div className="uc-dash-stat-v">38h</div></div>
        <div><div className="mono uc-dash-stat-l">Pipeline impact</div><div className="uc-dash-stat-v" style={{ color: 'var(--accent)' }}>+24%</div></div>
      </div>
      <div className="uc-dash-list">
        {['Lead routing','Onboarding emails','Weekly summary','Renewal alerts','Invoice review'].map((t, i) => (
          <div key={t} className="uc-dash-row">
            <span className="dot" style={{ background: i < 3 ? 'var(--ok)' : 'var(--ink-3)' }}/>
            <span style={{ flex: 1, fontSize: 13 }}>{t}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{i < 3 ? 'running' : 'queued'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UseCases() {
  const uc = AGENTIX_DATA.useCases;
  const [active, setActive] = useState(uc[0].id);
  const cur = uc.find(u => u.id === active);

  return (
    <section className="section" id="use-cases">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">07 / Use cases</span>
          <h2 className="h-1" style={{ maxWidth: 760, marginTop: 12 }}>Built for the team you actually have.</h2>
        </div>
        <div className="usecase-tabs">
          {uc.map(u => (
            <button key={u.id} className={`usecase-tab ${active === u.id ? 'active' : ''}`} onClick={() => setActive(u.id)}>
              {u.name}
            </button>
          ))}
        </div>
        <div className="usecase-stage card" key={cur.id}>
          <div className="usecase-left">
            <span className="chip"><span className="chip-dot" style={{ background: 'var(--accent)' }}/>Use case</span>
            <h3 className="h-2" style={{ margin: '14px 0 12px' }}>{cur.name}</h3>
            <p className="body-lg" style={{ maxWidth: 480 }}>{cur.problem}</p>
            <div style={{ marginTop: 24 }}>
              <div className="eyebrow" style={{ marginBottom: 10 }}>Recommended stack</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cur.stack.map((t, i) => (
                  <div key={t} className="uc-tool-row">
                    <span className="mono" style={{ color: 'var(--ink-3)', fontSize: 11 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ flex: 1 }}>{t}</span>
                    <AgentixIcon name="arrow" size={12} color="var(--ink-3)"/>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
              <Link to={`/use-cases/${cur.id}`} className="btn btn-primary">Build my stack</Link>
              <Link to="/contact" className="btn btn-secondary">Talk to a human</Link>
            </div>
          </div>
          <div className="usecase-right">
            <UseCaseDashboard ucName={cur.name}/>
          </div>
        </div>
      </div>
    </section>
  );
}
