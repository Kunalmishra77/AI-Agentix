import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const FAQ_DATA = {
  platform: {
    label: 'Platform',
    color: 'var(--accent)',
    items: [
      { q: 'What is Agentix?', a: 'Agentix is an AI operating system for business — a single connected layer that replaces scattered manual workflows with goal-to-output automation across 9 domains, 38 subcategories, and 130+ tools.' },
      { q: 'How is Agentix different from ChatGPT or other AI tools?', a: 'ChatGPT generates content. Agentix runs a business workflow — from goal statement to reviewed output to human handoff. It organizes AI tools into a structured taxonomy and routes work through the right sequence.' },
      { q: 'What does "one operating layer" mean?', a: 'Instead of using 15 separate tools that don\'t talk to each other, Agentix connects the goal, the tools, the review step, and the human handoff into a single governed flow.' },
      { q: 'Is Agentix a no-code platform?', a: 'Yes, for most workflows. The assistant lets you describe your goal and Agentix builds the workflow path. Technical teams can also use the API and webhook layer for custom integrations.' },
      { q: 'Can I use Agentix for one specific workflow before expanding?', a: 'That\'s the recommended starting point. Start with one workflow — content production, sales pipeline, or ops reporting — and expand once you see results.' },
    ],
  },
  tools: {
    label: 'Tools',
    color: '#B6F26A',
    items: [
      { q: 'What is a "tool" in Agentix?', a: 'A tool is a discrete AI-powered function within a category — for example, "Cold Email Writer" inside Sales → Outbound. Each tool has defined inputs, outputs, review rules, and handoff logic.' },
      { q: 'How many tools are there?', a: 'The current platform includes 130+ tools across 9 categories and 38 subcategories. New tools are added regularly and announced in the changelog.' },
      { q: 'Can I use a tool without setting up a full workflow?', a: 'Yes. Tools can be accessed directly via the tool explorer or assistant routing. You don\'t need a full workflow to run a single tool.' },
      { q: 'Can I build custom tools?', a: 'On Pro and Enterprise plans, you can configure custom tool parameters, input schemas, and output templates. Full custom tool builds are part of the Enterprise implementation package.' },
    ],
  },
  workflows: {
    label: 'Workflows',
    color: '#B69BFF',
    items: [
      { q: 'What is a workflow in Agentix?', a: 'A workflow is a sequence of goals, inputs, tool executions, review checkpoints, and handoff actions — from initial intent to a reviewed, routed output.' },
      { q: 'How do I start a workflow?', a: 'State your goal to the assistant. It will recommend a workflow path. You can also browse templates in the Solutions section or build from scratch in the workflow builder.' },
      { q: 'Can workflows run automatically?', a: 'Yes. Trigger-based workflows run on a schedule, on a system event (new lead in CRM, new ticket in support), or on webhook payload. Human review steps pause the flow until approved.' },
      { q: 'What happens when a workflow needs human input?', a: 'The workflow pauses and routes to the designated reviewer with full context — the goal, the tool output, the review question, and the required action. No context is lost between steps.' },
    ],
  },
  pricing: {
    label: 'Pricing',
    color: '#FFB060',
    items: [
      { q: 'Is there a free trial?', a: 'Every paid plan includes a 14-day free trial with full access and no credit card required.' },
      { q: 'What\'s included in the Starter plan?', a: 'Starter includes 1 active workflow, 5 tools, basic assistant routing, and access to Docs and Help. It\'s designed for a single team proving out one workflow before expanding.' },
      { q: 'How does the annual discount work?', a: 'Annual plans are billed once per year at a 20% discount compared to the monthly rate. The discount applies to all paid plans.' },
      { q: 'Can I change my plan later?', a: 'Yes. Upgrades take effect immediately with prorated billing. Downgrades take effect at the next billing cycle.' },
      { q: 'What does Enterprise pricing look like?', a: 'Enterprise is scoped based on team size, workflow count, integration requirements, and implementation needs. Contact sales to receive a custom quote within 24 hours.' },
    ],
  },
  security: {
    label: 'Security',
    color: 'var(--ok)',
    items: [
      { q: 'Where is my data stored?', a: 'Agentix runs regional endpoints. Your data is stored in the region you select during account setup and never transferred to other regions without your explicit permission.' },
      { q: 'Is my data used to train Agentix?', a: 'No. Your workflow data, assistant conversations, and outputs are never used to train Agentix models.' },
      { q: 'What access controls are available?', a: 'Pro and Enterprise plans include role-based access control (RBAC), workflow-level permissions, and audit logging. Enterprise adds SSO and custom permission schemas.' },
      { q: 'Is Agentix SOC 2 compliant?', a: 'Agentix is currently pursuing SOC 2 Type II. The compliance roadmap is published on the security page. Enterprise accounts receive the current report and audit timeline on request.' },
    ],
  },
  handoff: {
    label: 'Human handoff',
    color: '#FF8B6B',
    items: [
      { q: 'What triggers human handoff?', a: 'Handoff triggers are configured per workflow — examples include: content that makes financial claims, legal-adjacent recommendations, customer escalation signals, and manual review checkpoints.' },
      { q: 'Who receives the handoff?', a: 'You designate reviewers per workflow step. The reviewer receives a structured summary: goal, tool output, risk flags, and the required action. They approve, reject, or reroute.' },
      { q: 'Can handoff go to an external person?', a: 'Yes. Handoff can route to internal users, external email addresses, Slack channels, or a webhook endpoint for integration with your existing review process.' },
      { q: 'What happens if no one reviews the handoff?', a: 'The workflow pauses and sends an escalation reminder at configured intervals (e.g., 4h, 24h). After the escalation period, it routes to a fallback reviewer or closes with a logged reason.' },
    ],
  },
};

export default function FAQPage() {
  const [cat, setCat] = useState('platform');
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? Object.values(FAQ_DATA).flatMap((c) => c.items.filter((i) => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())))
    : FAQ_DATA[cat].items;

  return (
    <>
      <Helmet><title>FAQ / Agentix</title></Helmet>

      {/* ── 1. Hero ── */}
      <section className="hero page-hero">
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip"><span className="chip-dot" />FAQ</div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 820 }}>Questions answered.<br />No boilerplate.</h1>
          <p className="body-lg" style={{ maxWidth: 580 }}>
            Real answers about the platform, tools, workflows, pricing, security, and human handoff — organized by topic.
          </p>
        </div>
      </section>

      {/* ── 2. Search bar ── */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container-wide">
          <div className="faq-search card">
            <AgentixIcon name="search" size={16} color="var(--accent)" />
            <input
              className="faq-search-input"
              placeholder="Search all FAQ topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => setSearch('')}>Clear</button>}
          </div>
        </div>
      </section>

      {/* ── 3. Category tabs + accordion ── */}
      <section className="section">
        <div className="container-wide">
          {!search && (
            <div className="faq-cats">
              {Object.entries(FAQ_DATA).map(([id, data]) => (
                <button key={id} className={`usecase-tab ${cat === id ? 'active' : ''}`} style={cat === id ? { background: data.color, borderColor: data.color, color: '#fff' } : {}} onClick={() => { setCat(id); setOpen(null); }}>
                  {data.label}
                </button>
              ))}
            </div>
          )}

          <div className="faq-main">
            {!search && (
              <div className="faq-sidebar">
                <div className="eyebrow" style={{ marginBottom: 16 }}>Topics</div>
                {Object.entries(FAQ_DATA).map(([id, data]) => (
                  <button key={id} className={`faq-sidebar-item ${cat === id ? 'active' : ''}`} style={cat === id ? { color: data.color, borderColor: data.color } : {}} onClick={() => { setCat(id); setOpen(null); }}>
                    <span className="dot" style={{ background: cat === id ? data.color : 'var(--bg-4)' }} />
                    {data.label}
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginLeft: 'auto' }}>{data.items.length}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="faq-content">
              {search && filtered.length === 0 && (
                <div className="faq-empty">
                  <p className="body">No results for "{search}". <button className="btn btn-ghost" style={{ padding: 0 }} onClick={() => setSearch('')}>Clear search</button></p>
                </div>
              )}
              {search && filtered.length > 0 && (
                <div className="eyebrow" style={{ marginBottom: 20 }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"</div>
              )}
              {filtered.map((item, i) => (
                <div key={item.q} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? null : i)}>
                  <div className="faq-q">
                    <span>{item.q}</span>
                    <span className="faq-icon"><AgentixIcon name="chevron" size={12} /></span>
                  </div>
                  <div className="faq-a"><div>{item.a}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Stats strip ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="faq-stats">
            {[['6', 'topic categories'], [Object.values(FAQ_DATA).reduce((n, c) => n + c.items.length, 0).toString(), 'total questions'], ['< 30s', 'average read time'], ['Updated', 'monthly']].map(([v, l]) => (
              <div key={l} className="faq-stat card">
                <div className="faq-stat-val" style={{ color: 'var(--accent)' }}>{v}</div>
                <div className="faq-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Popular docs ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Go deeper</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Documentation for specific topics.</h2>
          </div>
          <div className="faq-docs">
            {[
              { label: 'Getting started', href: '/docs/getting-started', desc: 'First workflow setup and assistant intro', color: 'var(--accent)' },
              { label: 'Workflow builder', href: '/docs/workflows', desc: 'Full guide to building and automating workflows', color: '#B6F26A' },
              { label: 'Integrations', href: '/integrations', desc: 'Connect CRM, email, docs, and more', color: '#B69BFF' },
              { label: 'Security model', href: '/security', desc: 'Data handling, access controls, and compliance', color: 'var(--ok)' },
              { label: 'API and webhooks', href: '/docs/api-webhooks', desc: 'Technical reference for custom integrations', color: '#5B9BFF' },
              { label: 'Pricing guide', href: '/pricing', desc: 'Plan comparison, limits, and add-ons', color: '#FFB060' },
            ].map((d) => (
              <Link key={d.label} to={d.href} className="faq-doc-card card">
                <div className="faq-doc-label" style={{ color: d.color }}>{d.label}</div>
                <div className="faq-doc-desc">{d.desc}</div>
                <AgentixIcon name="arrow" size={12} color={d.color} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Still have questions ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="faq-contact card">
            <div className="faq-contact-left">
              <span className="eyebrow">Didn't find your answer?</span>
              <h2 className="h-2" style={{ marginTop: 12 }}>A real person can help.</h2>
              <p className="body" style={{ marginTop: 12 }}>
                Agentix support responds within 2 hours on business days. No bots, no auto-close, no generic answers.
              </p>
            </div>
            <div className="faq-contact-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">Contact support</Link>
              <Link to="/help" className="btn btn-secondary btn-lg" style={{ marginTop: 12 }}>Browse help center</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Assistant routing ── */}
      <section className="section">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">Assistant</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Ask Agentix directly.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              The assistant can answer any question about the platform, route you to the right tool, and build a workflow from your goal — all in one conversation.
            </p>
            <Link to="/talk-to-agentix" className="btn btn-primary" style={{ marginTop: 24 }}>
              <AgentixIcon name="mic" size={14} />Talk to Agentix
            </Link>
          </div>
          <div className="dock-panel-static">
            <div className="dock-head"><span className="dot dot-accent" /><span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>Agentix Assistant</span></div>
            <div className="dock-body">
              <div className="dock-msg">Ask me any question about the platform. I can also route you to the right tool, workflow, or human contact.</div>
              <div className="dock-suggest">
                {['Pricing', 'How handoff works', 'Tool discovery', 'Getting started'].map((chip) => (
                  <Link key={chip} to={`/search?q=${encodeURIComponent(chip)}`} className="dock-chip">{chip}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Feedback ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="faq-feedback card">
            <div className="eyebrow" style={{ marginBottom: 12 }}>Was this page helpful?</div>
            <div className="faq-feedback-actions">
              <button className="btn btn-secondary">Yes, this answered my question</button>
              <Link to="/contact" className="btn btn-ghost">No, I need more help</Link>
            </div>
            <div className="faq-feedback-note mono" style={{ marginTop: 16, fontSize: 11, color: 'var(--ink-3)' }}>
              This page is updated monthly. Last updated: May 2026.
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
