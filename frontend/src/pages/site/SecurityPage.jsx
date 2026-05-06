import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const PILLARS = [
  { id: 'data', label: 'Data handling', color: 'var(--ok)', icon: 'logo', desc: 'Your workflow data, inputs, outputs, and conversations are stored in your selected region and never transferred across jurisdiction boundaries without explicit consent.', points: ['Regional data residency', 'No cross-border transfer', 'At-rest AES-256 encryption', 'In-transit TLS 1.3'] },
  { id: 'access', label: 'Access controls', color: '#5B9BFF', icon: 'check', desc: 'Role-based access control (RBAC) governs who can view, edit, run, and approve workflows. Every action is tied to an authenticated identity.', points: ['RBAC across all workflows', 'Granular tool-level permissions', 'SSO (Enterprise)', 'MFA enforced on all accounts'] },
  { id: 'rag', label: 'RAG and knowledge base', color: '#B69BFF', icon: 'search', desc: 'When Agentix references your internal knowledge base, retrieval is scoped strictly to documents you\'ve granted permission for. No cross-account bleed.', points: ['Per-document permission scopes', 'No cross-account RAG bleed', 'Citation tracking on all outputs', 'Source attribution in every response'] },
  { id: 'audit', label: 'Audit logging', color: '#FFB060', icon: 'arrow', desc: 'Every workflow action, routing decision, human handoff event, and permission change is logged with timestamp, actor, and outcome — immutably.', points: ['Immutable event log', 'Per-workflow audit trail', 'Handoff event tracking', 'Exportable for compliance review'] },
  { id: 'models', label: 'AI model governance', color: 'var(--accent)', icon: 'logo', desc: 'Agentix does not use your data to train or fine-tune any AI model. Model outputs are deterministic within a session and never fed back into training pipelines.', points: ['No training on your data', 'Deterministic session context', 'Model version pinning on request', 'Enterprise model selection'] },
  { id: 'incident', label: 'Incident response', color: 'var(--err)', icon: 'close', desc: 'Security incidents trigger a defined response playbook — isolation, investigation, notification, and remediation — with SLA commitments at each stage.', points: ['< 1h detection SLA', '< 4h notification SLA', 'Named incident commander', 'Post-incident report within 7 days'] },
];

const COMPLIANCE = [
  { label: 'GDPR', status: 'compliant', note: 'Full data subject rights, DPA available' },
  { label: 'SOC 2 Type II', status: 'in-progress', note: 'Expected Q3 2026 — current report on request' },
  { label: 'CCPA', status: 'compliant', note: 'Consumer rights and data deletion honored' },
  { label: 'ISO 27001', status: 'roadmap', note: 'Planned Q1 2027' },
  { label: 'HIPAA', status: 'enterprise', note: 'BAA available for qualifying enterprise accounts' },
  { label: 'DORA', status: 'in-progress', note: 'EU digital operations readiness by Q4 2026' },
];

const statusColor = { compliant: 'var(--ok)', 'in-progress': 'var(--warn)', roadmap: 'var(--ink-3)', enterprise: '#B69BFF' };
const statusLabel = { compliant: 'Compliant', 'in-progress': 'In progress', roadmap: 'Roadmap', enterprise: 'Enterprise' };

const TECH_SPECS = [
  ['Encryption at rest', 'AES-256-GCM'],
  ['Encryption in transit', 'TLS 1.3 minimum'],
  ['Authentication', 'OAuth 2.0 + MFA'],
  ['Session management', 'JWTs with short expiry + rotation'],
  ['Data residency', 'US, EU, APAC (region-selectable)'],
  ['Backup retention', '30-day encrypted snapshots'],
  ['Uptime SLA (Pro)', '99.9%'],
  ['Uptime SLA (Enterprise)', 'Custom, up to 99.99%'],
];

export default function SecurityPage() {
  return (
    <>
      <Helmet><title>Security / Agentix</title></Helmet>

      {/* ── 1. Hero ── */}
      <section className="hero page-hero">
        <div className="hero-bg-glow" style={{ background: 'radial-gradient(800px 500px at 75% 40%, rgba(91,227,168,0.12), transparent 60%)' }} />
        <div className="container-wide">
          <div className="chip" style={{ borderColor: 'var(--ok)', color: 'var(--ok)' }}>
            <span className="chip-dot" style={{ background: 'var(--ok)' }} />Security
          </div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 860 }}>
            Built for teams that handle<br />sensitive work.
          </h1>
          <p className="body-lg" style={{ maxWidth: 640 }}>
            Agentix is infrastructure for real business operations — which means security, data governance, and access control are not afterthoughts. They're part of the platform architecture.
          </p>
          <div className="security-status-bar" style={{ marginTop: 36 }}>
            <span className="dot dot-ok" />
            <span className="mono" style={{ fontSize: 13, color: 'var(--ok)' }}>All systems operational</span>
            <Link to="/status" className="btn btn-ghost" style={{ fontSize: 12 }}>View status <AgentixIcon name="arrow" size={10} /></Link>
          </div>
        </div>
      </section>

      {/* ── 2. Security pillars grid ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Security pillars</span>
            <h2 className="h-1" style={{ maxWidth: 640, marginTop: 12 }}>Six areas that govern how your data is handled.</h2>
          </div>
          <div className="security-pillars">
            {PILLARS.map((p) => (
              <div key={p.id} className="security-pillar card" style={{ '--pillcolor': p.color }}>
                <div className="security-pillar-head">
                  <div className="security-pillar-dot" style={{ background: p.color }} />
                  <div className="security-pillar-label">{p.label}</div>
                </div>
                <p className="security-pillar-desc">{p.desc}</p>
                <ul className="security-pillar-points">
                  {p.points.map((pt) => (
                    <li key={pt} className="security-pillar-point">
                      <AgentixIcon name="check" size={12} color={p.color} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Technical specifications table ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="page-split">
            <div>
              <span className="eyebrow">Technical specifications</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>The implementation details, for those who need them.</h2>
              <p className="body" style={{ marginTop: 16 }}>
                Security teams reviewing Agentix for enterprise deployment can request our full security questionnaire and third-party audit reports via{' '}
                <a href="mailto:security@agentix.ai" style={{ color: 'var(--accent)' }}>security@agentix.ai</a>.
              </p>
            </div>
            <div className="security-specs card">
              {TECH_SPECS.map(([label, value]) => (
                <div key={label} className="security-spec-row">
                  <span className="security-spec-label">{label}</span>
                  <span className="security-spec-value mono">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Compliance grid ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Compliance</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Current status and roadmap.</h2>
          </div>
          <div className="security-compliance">
            {COMPLIANCE.map((c) => (
              <div key={c.label} className="security-compliance-item card">
                <div className="security-compliance-label">{c.label}</div>
                <div className="security-compliance-status">
                  <span className="dot" style={{ background: statusColor[c.status] }} />
                  <span className="mono" style={{ fontSize: 12, color: statusColor[c.status] }}>{statusLabel[c.status]}</span>
                </div>
                <div className="security-compliance-note">{c.note}</div>
              </div>
            ))}
          </div>
          <div className="security-compliance-note-global mono" style={{ marginTop: 20, fontSize: 12, color: 'var(--ink-3)' }}>
            Last updated: May 2026 · Compliance status is reviewed and updated quarterly
          </div>
        </div>
      </section>

      {/* ── 5. Data flow diagram (text-based) ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Data flow</span>
            <h2 className="h-1" style={{ maxWidth: 640, margin: '12px auto 0' }}>Where your data goes. And where it doesn't.</h2>
          </div>
          <div className="security-flow card">
            <div className="security-flow-stages">
              {[
                { label: 'Your input', desc: 'Goal, brief, or workflow trigger', color: '#5B9BFF' },
                { label: 'Agentix routing', desc: 'Intent classification and tool selection', color: 'var(--accent)' },
                { label: 'Tool execution', desc: 'AI model processes your specific input', color: '#B69BFF' },
                { label: 'Output generation', desc: 'Result stored in your regional endpoint', color: '#B6F26A' },
                { label: 'Human review', desc: 'Reviewer sees output with context', color: '#FFB060' },
                { label: 'Final action', desc: 'Approved, rejected, or rerouted', color: 'var(--ok)' },
              ].map((s, i) => (
                <>
                  <div key={s.label} className="security-flow-stage">
                    <div className="security-flow-dot" style={{ background: s.color }} />
                    <div className="security-flow-content">
                      <div className="security-flow-label">{s.label}</div>
                      <div className="security-flow-desc">{s.desc}</div>
                    </div>
                  </div>
                  {i < 5 && <div key={`arr-${i}`} className="security-flow-arrow"><AgentixIcon name="arrow" size={12} color="var(--ink-3)" /></div>}
                </>
              ))}
            </div>
            <div className="security-flow-note card" style={{ marginTop: 24, padding: '16px 20px' }}>
              <AgentixIcon name="check" size={14} color="var(--ok)" />
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                Your data never exits your region. No cross-account context. No training pipeline. Every stage is logged and auditable.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Responsible disclosure ── */}
      <section className="section">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">Vulnerability disclosure</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Found something? Tell us first.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              Agentix operates a responsible disclosure program. Security researchers who identify and responsibly report vulnerabilities receive acknowledgment, updates on remediation, and recognition in our security changelog.
            </p>
            <div className="hero-ctas" style={{ marginTop: 24 }}>
              <a href="mailto:security@agentix.ai" className="btn btn-primary" style={{ background: 'var(--ok)', boxShadow: '0 8px 30px rgba(91,227,168,0.3)', color: '#fff' }}>
                Report a vulnerability
              </a>
            </div>
          </div>
          <div className="security-disclosure card">
            <div className="eyebrow" style={{ marginBottom: 20 }}>Disclosure process</div>
            {[
              { step: '01', label: 'Submit', desc: 'Email security@agentix.ai with a detailed report and reproduction steps.' },
              { step: '02', label: 'Acknowledge', desc: 'We confirm receipt and assign a severity level within 24 hours.' },
              { step: '03', label: 'Investigate', desc: 'Our security team investigates and keeps you updated throughout.' },
              { step: '04', label: 'Remediate', desc: 'We fix the issue, notify affected accounts if applicable, and publish a changelog entry.' },
            ].map((s) => (
              <div key={s.step} className="security-disc-row">
                <span className="mono" style={{ fontSize: 11, color: 'var(--ok)', flexShrink: 0 }}>{s.step}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink-0)' }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="faq-grid">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>Security questions.</h2>
            </div>
            <div className="faq-right">
              {[
                { q: 'Is my data used to train AI models?', a: 'No. Your workflow data, inputs, outputs, and conversations are never used to train or fine-tune any AI model.' },
                { q: 'Where is my data stored?', a: 'Agentix stores data in the region you select during account setup — US (AWS us-east-1), EU (AWS eu-west-1), or APAC (AWS ap-southeast-1). Data does not cross regions.' },
                { q: 'Who can access my workflows and outputs?', a: 'Only authenticated users you\'ve granted access to on your account. Agentix staff can access your data only in response to a documented support request, with your knowledge.' },
                { q: 'How do I request a security review or DPA?', a: 'Email security@agentix.ai with your account details and requirement. We respond within 24 hours with the relevant documents and a security review schedule.' },
              ].map((item) => (
                <div key={item.q} className="faq-item open">
                  <div className="faq-q"><span>{item.q}</span><span className="faq-icon"><AgentixIcon name="chevron" size={12} /></span></div>
                  <div className="faq-a"><div>{item.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Contact security team ── */}
      <section className="section">
        <div className="container-wide">
          <div className="security-contact card">
            <div className="security-contact-left">
              <div className="chip" style={{ borderColor: 'var(--ok)', color: 'var(--ok)' }}>
                <span className="chip-dot" style={{ background: 'var(--ok)' }} />Security team
              </div>
              <h2 className="h-2" style={{ marginTop: 16 }}>Enterprise security review, DPA, or incident escalation?</h2>
              <p className="body" style={{ marginTop: 12 }}>
                The security team reviews all enterprise accounts directly. DPA, SOC 2 report, and security questionnaire responses are available within 24 hours.
              </p>
            </div>
            <div className="security-contact-right">
              <a href="mailto:security@agentix.ai" className="btn btn-primary btn-lg" style={{ background: 'var(--ok)', color: '#fff', boxShadow: '0 8px 30px rgba(91,227,168,0.3)' }}>
                security@agentix.ai
              </a>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, textAlign: 'center' }}>Response SLA: &lt; 24 hours</div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
