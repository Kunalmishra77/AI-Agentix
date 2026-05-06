import { useState } from 'react';
import AgentixIcon from './AgentixIcon';

const quotes = [
  { q: 'We collapsed seven tools into one workflow surface and gave our founders four hours back every day.', a: 'VP Operations · B2B SaaS · 80 employees' },
  { q: 'Our agency runs client work like a product team now. The OS is the difference.', a: 'Founder · Digital agency · 40 clients' },
  { q: 'Pipeline coverage went from spreadsheet hope to a live signal we trust.', a: 'Head of Revenue · Series B SaaS' },
];

export default function TrustLayer() {
  const [i, setI] = useState(0);
  return (
    <section className="section">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">10 / Trust</span>
          <h2 className="h-1" style={{ maxWidth: 760, marginTop: 12 }}>Built for teams who can't afford to break.</h2>
        </div>
        <div className="trust-grid">
          <div className="trust-quote card">
            <AgentixIcon name="logo" size={28} color="var(--accent)"/>
            <p className="trust-q">{quotes[i].q}</p>
            <p className="trust-a">{quotes[i].a}</p>
            <div className="trust-dots">
              {quotes.map((_, idx) => (
                <button key={idx} className={`trust-dot ${i === idx ? 'active' : ''}`} onClick={() => setI(idx)}/>
              ))}
            </div>
          </div>
          <div className="trust-side">
            <div className="trust-stats card">
              {[['120+','tools shipped'],['99.99%','platform uptime'],['SOC 2','type II ready'],['EU/US','data residency']].map(([v,l]) => (
                <div key={l} className="trust-stat">
                  <div className="trust-stat-v">{v}</div>
                  <div className="trust-stat-l">{l}</div>
                </div>
              ))}
            </div>
            <div className="trust-badges card">
              <div className="eyebrow">Compliance & security</div>
              <div className="trust-badge-row">
                {['SOC 2 II','GDPR','HIPAA-ready','ISO 27001','SSO/SAML','Audit logs'].map(b => (
                  <span key={b} className="chip"><span className="chip-dot" style={{ background: 'var(--ok)' }}/>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
