import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const ROUTES = [
  { id: 'sales', label: 'Sales', title: 'New plan or upgrade', icon: 'arrow', color: '#5B9BFF', desc: 'Explore plans, scope enterprise, or get a custom quote.', time: '< 4 hours', cta: 'Start with a demo', href: '/demo' },
  { id: 'support', label: 'Support', title: 'Product help', icon: 'check', color: '#5BE3A8', desc: 'Troubleshoot tools, workflows, integrations, or account issues.', time: '< 2 hours', cta: 'Open a ticket', href: '/help' },
  { id: 'demo', label: 'Demo', title: 'Book a walkthrough', icon: 'mic', color: '#E87520', desc: 'See the full system in 30 minutes with a product specialist.', time: 'Same day', cta: 'Book your demo', href: '/demo' },
  { id: 'partnership', label: 'Partnership', title: 'Integrate or co-build', icon: 'logo', color: '#B69BFF', desc: 'Agency, reseller, technology, or strategic partnership enquiries.', time: '< 24 hours', cta: 'Submit enquiry', href: '#form' },
  { id: 'implementation', label: 'Implementation', title: 'Build it with us', icon: 'arrow', color: '#FFB060', desc: 'Scoped implementation, taxonomy build, and workflow migration.', time: '< 24 hours', cta: 'Scope a project', href: '#form' },
  { id: 'press', label: 'Press', title: 'Media and research', icon: 'search', color: '#B6F26A', desc: 'Journalist, analyst, or research enquiries about Agentix.', time: '< 48 hours', cta: 'Send a brief', href: '#form' },
];

const CHANNELS = [
  { name: 'Email', handle: 'hello@agentix.ai', desc: 'General and sales enquiries', icon: 'arrow' },
  { name: 'Support', handle: 'support@agentix.ai', desc: 'Product help and troubleshooting', icon: 'check' },
  { name: 'Security', handle: 'security@agentix.ai', desc: 'Vulnerability or data disclosures', icon: 'logo' },
  { name: 'Press', handle: 'press@agentix.ai', desc: 'Media and analyst enquiries', icon: 'search' },
];

export default function ContactPage() {
  const [selected, setSelected] = useState('sales');
  const [submitted, setSubmitted] = useState(false);
  const active = ROUTES.find((r) => r.id === selected);

  return (
    <>
      <Helmet><title>Contact / Agentix</title></Helmet>

      {/* ── 1. Hero: route-first ── */}
      <section className="hero page-hero">
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip"><span className="chip-dot" />Contact</div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 900 }}>
            Talk to the right person,<br />right away.
          </h1>
          <p className="body-lg" style={{ maxWidth: 620 }}>
            Choose your route below. Every enquiry goes to the team that can actually help — not a shared inbox with a 5-day SLA.
          </p>
        </div>
      </section>

      {/* ── 2. Route selector ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="contact-routes">
            {ROUTES.map((r) => (
              <button key={r.id} className={`contact-route card ${selected === r.id ? 'contact-route-active' : ''}`} style={{ '--rcolor': r.color }} onClick={() => setSelected(r.id)}>
                <div className="contact-route-dot" style={{ background: r.color }} />
                <div className="contact-route-label">{r.label}</div>
                <div className="contact-route-title">{r.title}</div>
              </button>
            ))}
          </div>

          {/* Detail panel for selected route */}
          {active && (
            <div className="contact-detail card" style={{ '--rcolor': active.color }}>
              <div className="contact-detail-left">
                <div className="chip" style={{ borderColor: active.color, color: active.color }}>
                  <span className="chip-dot" style={{ background: active.color }} />{active.label}
                </div>
                <h2 className="h-2" style={{ marginTop: 16 }}>{active.title}</h2>
                <p className="body-lg" style={{ marginTop: 12 }}>{active.desc}</p>
                <div className="contact-sla">
                  <span className="dot dot-ok" />
                  <span className="mono" style={{ fontSize: 12, color: 'var(--ink-2)' }}>Response time: {active.time}</span>
                </div>
                <Link to={active.href} className="btn btn-primary" style={{ marginTop: 24, background: active.color, color: '#fff', boxShadow: `0 8px 30px ${active.color}40` }}>
                  {active.cta}
                </Link>
              </div>
              <div className="contact-detail-right">
                <div className="contact-info-card card">
                  <div className="eyebrow">Before you reach out</div>
                  <ul className="contact-pre-list">
                    {active.id === 'sales' && ['Your current team size', 'Main workflow goal', 'Timeline and budget'].map((i) => <li key={i}>{i}</li>)}
                    {active.id === 'support' && ['The tool or workflow in question', 'Steps to reproduce the issue', 'Your account email'].map((i) => <li key={i}>{i}</li>)}
                    {active.id === 'demo' && ['Your primary use case', 'Team role and size', 'Any tools you\'re replacing'].map((i) => <li key={i}>{i}</li>)}
                    {active.id === 'partnership' && ['Partnership type', 'Your audience or client base', 'What you want to build together'].map((i) => <li key={i}>{i}</li>)}
                    {active.id === 'implementation' && ['Number of workflows to migrate', 'Current tool stack', 'Implementation timeline'].map((i) => <li key={i}>{i}</li>)}
                    {active.id === 'press' && ['Publication or institution', 'Topic or angle', 'Deadline if applicable'].map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Contact form ── */}
      <section className="section page-band" id="form">
        <div className="container-wide">
          <div className="contact-form-wrap">
            <div>
              <span className="eyebrow">Send a message</span>
              <h2 className="h-1" style={{ marginTop: 12, maxWidth: 420 }}>We read every message. Actually.</h2>
              <p className="body" style={{ marginTop: 14 }}>
                No bots. No auto-close. A real Agentix team member will review your message and route it to the right person.
              </p>
            </div>
            <div className="contact-form card">
              {submitted ? (
                <div className="contact-success">
                  <div className="dot dot-ok" style={{ width: 40, height: 40 }} />
                  <h3 className="h-3" style={{ marginTop: 16 }}>Message received.</h3>
                  <p className="body" style={{ marginTop: 8 }}>We'll get back to you at the email you provided. Expected response: {active?.time ?? '< 24 hours'}.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label className="contact-label">Your name</label>
                      <input className="contact-input" placeholder="Alex Johnson" required />
                    </div>
                    <div className="contact-field">
                      <label className="contact-label">Work email</label>
                      <input type="email" className="contact-input" placeholder="alex@company.com" required />
                    </div>
                  </div>
                  <div className="contact-field">
                    <label className="contact-label">Route</label>
                    <select className="contact-input contact-select" value={selected} onChange={(e) => setSelected(e.target.value)}>
                      {ROUTES.map((r) => <option key={r.id} value={r.id}>{r.label} — {r.title}</option>)}
                    </select>
                  </div>
                  <div className="contact-field">
                    <label className="contact-label">Message</label>
                    <textarea className="contact-input contact-textarea" placeholder="Describe what you're trying to accomplish..." rows={5} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send message <AgentixIcon name="arrow" size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Direct channels ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Direct channels</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Prefer email? Here's where to send it.</h2>
          </div>
          <div className="contact-channels">
            {CHANNELS.map((c) => (
              <div key={c.name} className="contact-channel card">
                <div className="contact-channel-name">{c.name}</div>
                <div className="contact-channel-email" style={{ color: 'var(--accent)' }}>{c.handle}</div>
                <div className="contact-channel-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Response SLAs ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Response commitments</span>
            <h2 className="h-1" style={{ maxWidth: 560, margin: '12px auto 0' }}>We're accountable to a timeline, not an auto-responder.</h2>
          </div>
          <div className="contact-slas">
            {ROUTES.map((r) => (
              <div key={r.id} className="contact-sla-row card">
                <div className="contact-sla-dot" style={{ background: r.color }} />
                <div className="contact-sla-label">{r.label}</div>
                <div className="contact-sla-time" style={{ color: r.color }}>{r.time}</div>
                <div className="contact-sla-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Support path escalation ── */}
      <section className="section">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">Escalation path</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Critical issue? Here's how it's handled.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              Security incidents, data concerns, and platform-down events have a dedicated on-call path that bypasses the standard support queue.
            </p>
            <div className="hero-ctas" style={{ marginTop: 24 }}>
              <Link to="/security" className="btn btn-secondary"><AgentixIcon name="logo" size={14} />Security page</Link>
              <Link to="/status" className="btn btn-secondary">Status page</Link>
            </div>
          </div>
          <div className="contact-escalation card">
            {[
              { step: '01', label: 'Critical incident', action: 'Email security@agentix.ai immediately', color: 'var(--err)' },
              { step: '02', label: 'Platform down', action: 'Check status.agentix.ai then email support', color: 'var(--warn)' },
              { step: '03', label: 'Data concern', action: 'Use the privacy contact form with subject: DATA', color: '#B69BFF' },
              { step: '04', label: 'Billing dispute', action: 'Email billing@agentix.ai with your invoice number', color: 'var(--ok)' },
            ].map((e) => (
              <div key={e.step} className="contact-esc-row">
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0 }}>{e.step}</span>
                <span style={{ color: e.color, fontWeight: 500, fontSize: 14, minWidth: 140 }}>{e.label}</span>
                <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{e.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Self-serve resources ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Self-serve first</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Most answers are already documented.</h2>
          </div>
          <div className="contact-resources">
            {[
              { label: 'Docs', desc: 'Setup, workflow builder, integrations, API', href: '/docs', color: 'var(--accent)' },
              { label: 'Help center', desc: 'Account, billing, tools, troubleshooting', href: '/help', color: '#5B9BFF' },
              { label: 'FAQ', desc: 'Common platform and pricing questions', href: '/faq', color: '#B6F26A' },
              { label: 'Status', desc: 'Current system status and incidents', href: '/status', color: 'var(--ok)' },
            ].map((r) => (
              <Link key={r.label} to={r.href} className="contact-resource card">
                <div className="contact-resource-label" style={{ color: r.color }}>{r.label}</div>
                <div className="contact-resource-desc">{r.desc}</div>
                <AgentixIcon name="arrow" size={12} color={r.color} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Assistant quick-start ── */}
      <section className="section">
        <div className="container-wide">
          <div className="contact-assistant card">
            <div className="contact-assistant-left">
              <div className="dock-fab-orb" style={{ width: 48, height: 48, flexShrink: 0 }} />
              <div>
                <h2 className="h-2">Not sure which route to take?</h2>
                <p className="body" style={{ marginTop: 8 }}>
                  Ask the Agentix assistant. It will recommend the right channel based on what you're trying to accomplish.
                </p>
              </div>
            </div>
            <Link to="/talk-to-agentix" className="btn btn-primary btn-lg">
              <AgentixIcon name="mic" size={16} />Ask Agentix
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
