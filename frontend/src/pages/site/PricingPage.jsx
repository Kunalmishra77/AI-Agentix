import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 49, annual: 39 },
    tagline: "One workflow. See what's possible.",
    color: '#E87520',
    features: ['1 active workflow', '5 tools included', 'Assistant routing', 'Docs + Help access', 'Community support'],
    cta: 'Start free trial',
    href: '/demo',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: { monthly: 149, annual: 119 },
    tagline: 'Multiple workflows. Real operating leverage.',
    color: '#B6F26A',
    features: ['10 active workflows', '40 tools included', 'Full assistant layer', 'Integrations (CRM, Email, Docs)', 'Email support', 'Workflow templates'],
    cta: 'Start free trial',
    href: '/demo',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 349, annual: 279 },
    tagline: 'Full operating system for ambitious teams.',
    color: '#B69BFF',
    featured: true,
    features: ['Unlimited workflows', '130+ tools', 'Advanced assistant routing', 'RAG knowledge base', 'Human handoff rules', 'Priority support', 'Admin controls', 'Audit logging'],
    cta: 'Start free trial',
    href: '/demo',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: null, annual: null },
    tagline: 'Custom build. Full governance.',
    color: '#FFB060',
    features: ['Everything in Pro', 'Custom tool taxonomy', 'SSO + access controls', 'Dedicated implementation', 'SLA + uptime guarantee', 'Security review', 'Custom integrations', 'Dedicated success manager'],
    cta: 'Talk to sales',
    href: '/contact',
  },
];

const FEATURE_ROWS = [
  { label: 'Active workflows', starter: '1', growth: '10', pro: 'Unlimited', enterprise: 'Custom' },
  { label: 'Tools included', starter: '5', growth: '40', pro: '130+', enterprise: 'Custom' },
  { label: 'Assistant routing', starter: 'Basic', growth: 'Full', pro: 'Advanced', enterprise: 'Custom' },
  { label: 'RAG knowledge base', starter: '—', growth: '—', pro: '✓', enterprise: '✓' },
  { label: 'Human handoff rules', starter: '—', growth: 'Basic', pro: '✓', enterprise: '✓' },
  { label: 'Integrations', starter: '—', growth: '8 apps', pro: 'All', enterprise: 'Custom' },
  { label: 'Audit logging', starter: '—', growth: '—', pro: '✓', enterprise: '✓' },
  { label: 'SSO', starter: '—', growth: '—', pro: '—', enterprise: '✓' },
  { label: 'SLA', starter: '—', growth: '—', pro: '99.9%', enterprise: 'Custom' },
  { label: 'Support', starter: 'Community', growth: 'Email', pro: 'Priority', enterprise: 'Dedicated' },
];

const ADDONS = [
  { name: 'Extra workflow packs', price: '$29/mo per 5 workflows', desc: 'Add more active workflows to any plan.' },
  { name: 'Custom domain', price: '$19/mo', desc: 'Run Agentix under your own domain and branding.' },
  { name: 'Advanced RAG', price: '$79/mo', desc: 'Larger knowledge base with citation tracking and source permissions.' },
  { name: 'Implementation package', price: 'from $2,400', desc: 'Dedicated setup, taxonomy build, and workflow migration by the Agentix team.' },
];

const FAQS = [
  { q: 'What counts as an "active workflow"?', a: "A workflow is any goal-to-output sequence you've configured in Agentix — from a single-step content generator to a multi-tool sales pipeline. Inactive workflows don't count against your limit." },
  { q: 'Can I switch plans mid-cycle?', a: 'Yes. Upgrades take effect immediately and are prorated. Downgrades take effect at the next billing cycle.' },
  { q: 'Is there a free trial?', a: 'Every paid plan includes a 14-day free trial with full feature access and no card required to start.' },
  { q: 'What is the annual discount?', a: 'Annual plans are billed once per year at a 20% discount compared to monthly billing.' },
  { q: 'How does enterprise pricing work?', a: 'Enterprise is scoped to your team size, tool taxonomy, integration requirements, and implementation needs. Contact sales to build a custom quote.' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <Helmet><title>Pricing / Agentix</title></Helmet>

      {/* ── 1. Hero ── */}
      <section className="hero page-hero">
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip" style={{ borderColor: 'var(--warn)', color: 'var(--warn)' }}>
            <span className="chip-dot" style={{ background: 'var(--warn)' }} />Pricing
          </div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 840 }}>
            Start with one workflow.<br />Scale into an operating system.
          </h1>
          <p className="body-lg" style={{ maxWidth: 600 }}>
            Every plan includes the full assistant, workflow engine, and handoff layer. You grow the number of tools and workflows — the architecture stays the same.
          </p>
          {/* Billing toggle */}
          <div className="pricing-toggle" style={{ marginTop: 36 }}>
            <button className={`pricing-toggle-btn ${!annual ? 'active' : ''}`} onClick={() => setAnnual(false)}>Monthly</button>
            <button className={`pricing-toggle-btn ${annual ? 'active' : ''}`} onClick={() => setAnnual(true)}>
              Annual <span className="pricing-badge">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Plan cards ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`pricing-card card ${plan.featured ? 'pricing-featured' : ''}`} style={{ '--pcolor': plan.color }}>
                {plan.featured && <div className="pricing-featured-badge">Most popular</div>}
                <div className="pricing-card-top">
                  <div className="pricing-dot" style={{ background: plan.color }} />
                  <div className="pricing-name">{plan.name}</div>
                </div>
                <div className="pricing-price">
                  {plan.price.monthly ? (
                    <>
                      <span className="pricing-amount">${annual ? plan.price.annual : plan.price.monthly}</span>
                      <span className="pricing-period">/mo</span>
                      {annual && <div className="pricing-save mono">billed annually</div>}
                    </>
                  ) : (
                    <span className="pricing-amount pricing-custom">Custom</span>
                  )}
                </div>
                <p className="pricing-tagline">{plan.tagline}</p>
                <div className="pricing-divider" />
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f} className="pricing-feature">
                      <AgentixIcon name="check" size={13} color={plan.color} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={plan.href} className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} pricing-cta`} style={plan.featured ? {} : { borderColor: plan.color, color: plan.color }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Feature comparison table ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Full comparison</span>
            <h2 className="h-1" style={{ maxWidth: 640, margin: '12px auto 0' }}>Everything, side by side.</h2>
          </div>
          <div className="pricing-table card">
            <div className="pricing-table-head">
              <div className="pricing-table-feature">Feature</div>
              {PLANS.map((p) => <div key={p.id} className="pricing-table-col" style={{ color: p.color }}>{p.name}</div>)}
            </div>
            {FEATURE_ROWS.map((row, i) => (
              <div key={row.label} className={`pricing-table-row ${i % 2 === 0 ? 'pricing-table-even' : ''}`}>
                <div className="pricing-table-feature">{row.label}</div>
                {['starter', 'growth', 'pro', 'enterprise'].map((k) => (
                  <div key={k} className="pricing-table-col">
                    {row[k] === '✓' ? <AgentixIcon name="check" size={14} color="var(--ok)" /> : <span style={{ color: row[k] === '—' ? 'var(--ink-4)' : 'var(--ink-1)' }}>{row[k]}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Usage context ── */}
      <section className="section">
        <div className="container-wide">
          <div className="page-split">
            <div>
              <span className="eyebrow">Usage model</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>Pay for what the system produces — not what it attempts.</h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                Agentix pricing is based on active workflows, not API calls or seat count. A workflow that produces a reviewed output costs the same as one you run once a month.
              </p>
              <div className="hero-ctas" style={{ marginTop: 24 }}>
                <Link to="/docs" className="btn btn-secondary">Read the docs</Link>
              </div>
            </div>
            <div className="pricing-usage-visual card">
              {[
                { label: 'Content workflows', pct: 78, color: '#FF8B6B' },
                { label: 'Sales workflows', pct: 62, color: '#5B9BFF' },
                { label: 'Operations workflows', pct: 55, color: '#FFB060' },
                { label: 'Research workflows', pct: 41, color: '#B69BFF' },
              ].map((item) => (
                <div key={item.label} className="pricing-usage-row">
                  <div className="pricing-usage-label">{item.label}</div>
                  <div className="pricing-usage-bar">
                    <div className="pricing-usage-fill" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                  <div className="pricing-usage-pct mono">{item.pct}%</div>
                </div>
              ))}
              <div className="pricing-usage-note mono" style={{ marginTop: 20, color: 'var(--ink-3)', fontSize: 11 }}>
                Average workflow utilization by category across Growth plans
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Add-ons ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Add-ons</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Extend any plan. Pay only for what you need.</h2>
          </div>
          <div className="pricing-addons">
            {ADDONS.map((a) => (
              <div key={a.name} className="pricing-addon card">
                <div className="pricing-addon-name">{a.name}</div>
                <div className="pricing-addon-price" style={{ color: 'var(--accent)' }}>{a.price}</div>
                <div className="pricing-addon-desc">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Social proof stats ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Why teams choose Agentix</span>
            <h2 className="h-1" style={{ maxWidth: 560, margin: '12px auto 0' }}>The operating layer pays for itself.</h2>
          </div>
          <div className="pricing-proof">
            {[
              { stat: '3×', label: 'faster goal-to-output', sub: 'vs. previous manual process' },
              { stat: '14h', label: 'saved per week', sub: 'average per operator' },
              { stat: '< 1 week', label: 'to first workflow', sub: 'median time-to-value' },
              { stat: '97%', label: 'handoff accuracy', sub: 'human review routing' },
            ].map((p) => (
              <div key={p.label} className="pricing-proof-card card">
                <div className="pricing-proof-stat" style={{ color: 'var(--accent)' }}>{p.stat}</div>
                <div className="pricing-proof-label">{p.label}</div>
                <div className="pricing-proof-sub mono">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Enterprise CTA ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="pricing-enterprise card">
            <div className="pricing-enterprise-left">
              <div className="chip" style={{ borderColor: '#FFB060', color: '#FFB060' }}>
                <span className="chip-dot" style={{ background: '#FFB060' }} />Enterprise
              </div>
              <h2 className="h-1" style={{ marginTop: 16, maxWidth: 580 }}>Need a custom build? We scope it with you.</h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                Custom tool taxonomy, dedicated implementation, SSO, SLA, and a team that builds the system around your operating structure — not a generic template.
              </p>
            </div>
            <div className="pricing-enterprise-right">
              <Link to="/contact" className="btn btn-primary btn-lg" style={{ background: '#FFB060', boxShadow: '0 8px 30px rgba(255,176,96,0.3)', color: '#1A0D00' }}>
                Talk to sales <AgentixIcon name="arrow" size={16} />
              </Link>
              <Link to="/demo" className="btn btn-secondary btn-lg" style={{ marginTop: 12 }}>Book a demo first</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="section">
        <div className="container-wide">
          <div className="faq-grid">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>Pricing questions answered.</h2>
              <p className="body" style={{ marginTop: 16 }}>
                Still have questions? <Link to="/contact" style={{ color: 'var(--accent)' }}>Talk to us</Link>.
              </p>
            </div>
            <div className="faq-right">
              {FAQS.map((item) => (
                <div key={item.q} className="faq-item open">
                  <div className="faq-q"><span>{item.q}</span><span className="faq-icon"><AgentixIcon name="chevron" size={12} /></span></div>
                  <div className="faq-a"><div>{item.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
