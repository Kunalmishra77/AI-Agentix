import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const PRINCIPLES = [
  { num: '01', title: 'No more stacks', body: 'Every team is running 15 tools that don\'t talk to each other. Agentix replaces the sprawl with one operating layer.' },
  { num: '02', title: 'Intent before interface', body: 'Teams shouldn\'t configure AI. They should state a goal and watch the system route it to the right tools, workflows, and humans.' },
  { num: '03', title: 'Human handoff is a feature', body: 'AI handles what it can. Risk, compliance, escalation, and judgment calls route to a person — always with full context.' },
  { num: '04', title: 'Output over activity', body: 'We measure what gets produced and reviewed — not what was started. Outputs are the unit of progress.' },
  { num: '05', title: 'Governed, not locked', body: 'You own your data, your workflows, and your handoff rules. Agentix is infrastructure, not a walled garden.' },
  { num: '06', title: 'One layer, not one app', body: 'Agentix isn\'t a chat tool or a generator. It\'s the connective tissue between your goals, tools, people, and systems.' },
];

const DOMAINS = [
  { id: 'content', name: 'Content & Creative Production', color: '#FF8B6B', count: '4 subcategories' },
  { id: 'marketing', name: 'Marketing & Growth', color: '#B6F26A', count: '5 subcategories' },
  { id: 'sales', name: 'Sales & Revenue', color: '#5B9BFF', count: '4 subcategories' },
  { id: 'cx', name: 'Customer Experience', color: '#7FD7FF', count: '4 subcategories' },
  { id: 'research', name: 'Research & Intelligence', color: '#B69BFF', count: '4 subcategories' },
  { id: 'ops', name: 'Operations & Automation', color: '#FFB060', count: '5 subcategories' },
  { id: 'systems', name: 'Systems & Infrastructure', color: '#6E8BFF', count: '4 subcategories' },
  { id: 'product', name: 'Product & Development', color: '#4D7BFF', count: '4 subcategories' },
  { id: 'finance', name: 'Finance & Admin', color: '#5BE3A8', count: '4 subcategories' },
];

const TIMELINE = [
  { year: '2023', label: 'Foundation', text: 'Agentix started as an internal operating system for a consulting team running content, sales, and ops across 9 business units.' },
  { year: '2024 Q1', label: 'Taxonomy', text: 'The 9-domain / 38-subcategory structure was formalized after auditing 400+ manual workflows across 12 client teams.' },
  { year: '2024 Q3', label: 'Assistant layer', text: 'Voice and chat routing was added. Teams could now describe a goal and receive a recommended tool path instead of browsing.' },
  { year: '2025 Q1', label: 'Platform', text: 'The full operating system launched publicly — 9 categories, 38 subcategories, 130+ tools, workflow engine, and human handoff.' },
  { year: '2025 Q3', label: 'Enterprise', text: 'RAG knowledge base, access controls, audit logging, and custom workflow templates launched for enterprise teams.' },
  { year: '2026', label: 'Today', text: 'Agentix is the AI operating system for modern business — one connected layer replacing disconnected tool stacks.' },
];

const TEAM_ROLES = [
  'Founders building fast', 'Operators governing scale',
  'Content teams producing daily', 'Sales teams running pipeline',
  'CX teams handling volume', 'Product teams shipping quickly',
  'Finance teams controlling spend', 'Agencies serving clients',
];

export default function AboutPage() {
  return (
    <>
      <Helmet><title>About Agentix / The AI Operating System</title></Helmet>

      {/* ── 1. Hero: editorial large-type ── */}
      <section className="about-hero">
        <div className="container-wide">
          <div className="chip">
            <span className="chip-dot" style={{ background: 'var(--accent)' }} />
            About Agentix
          </div>
          <h1 className="h-display about-hero-h" style={{ marginTop: 28 }}>
            <span className="hero-line">One operating layer.</span><br />
            <span className="hero-line" style={{ color: 'var(--ink-2)' }}>Not another stack</span><br />
            <span className="hero-line accent">of tools.</span>
          </h1>
          <p className="body-lg about-hero-lead">
            Agentix exists to replace scattered manual work with a single connected operating system — nine domains, one assistant, and clear handoff rules for every workflow.
          </p>
          <div className="about-stats-row">
            {[['9', 'domains'], ['38', 'subcategories'], ['130+', 'tools'], ['1', 'operating layer']].map(([n, l]) => (
              <div key={l} className="about-stat">
                <div className="about-stat-n">{n}</div>
                <div className="about-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Mission statement: full-bleed quote ── */}
      <section className="about-mission">
        <div className="container-wide">
          <div className="about-mission-inner card">
            <div className="about-mission-eyebrow eyebrow">Mission</div>
            <blockquote className="about-mission-quote">
              "Replace the 15-tool stack with one connected operating system — where goals become workflows, workflows produce reviewed outputs, and humans stay in control of every decision that matters."
            </blockquote>
            <div className="about-mission-attr">
              <span className="dot dot-accent" />
              <span className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>Agentix founding principle / 2023</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Before / After: side-by-side contrast ── */}
      <section className="section">
        <div className="container-wide">
          <div className="about-contrast">
            <div className="about-contrast-side about-contrast-before card">
              <div className="eyebrow" style={{ color: 'var(--err)' }}>Before Agentix</div>
              <h3 className="h-3" style={{ marginTop: 12 }}>15 tools. No system.</h3>
              <div className="about-tool-scatter">
                {['Notion', 'Loom', 'Slack', 'HubSpot', 'Zapier', 'ChatGPT', 'Airtable', 'Linear', 'Figma', 'G Suite', 'Salesforce', 'Intercom', 'Monday', 'Asana', 'Make'].map((t) => (
                  <span key={t} className="about-scatter-pill">{t}</span>
                ))}
              </div>
              <div className="about-contrast-stats">
                <div><span style={{ color: 'var(--err)', fontWeight: 600 }}>14h/wk</span> lost to context switching</div>
                <div><span style={{ color: 'var(--err)', fontWeight: 600 }}>63%</span> of outputs never reviewed</div>
                <div><span style={{ color: 'var(--err)', fontWeight: 600 }}>0</span> unified handoff rules</div>
              </div>
            </div>
            <div className="about-contrast-arrow">
              <AgentixIcon name="arrow" size={22} color="var(--accent)" />
            </div>
            <div className="about-contrast-side about-contrast-after card">
              <div className="eyebrow" style={{ color: 'var(--ok)' }}>After Agentix</div>
              <h3 className="h-3" style={{ marginTop: 12 }}>One layer. All domains.</h3>
              <div className="about-tool-scatter">
                {DOMAINS.map((d) => (
                  <span key={d.name} className="about-scatter-pill" style={{ borderColor: d.color, color: d.color, background: `${d.color}12` }}>{d.name.split(' ')[0]}</span>
                ))}
              </div>
              <div className="about-contrast-stats">
                <div><span style={{ color: 'var(--ok)', fontWeight: 600 }}>3× faster</span> goal-to-output</div>
                <div><span style={{ color: 'var(--ok)', fontWeight: 600 }}>100%</span> handoff coverage</div>
                <div><span style={{ color: 'var(--ok)', fontWeight: 600 }}>9</span> domains. One assistant.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 9 Domains: colored grid ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Platform coverage</span>
            <h2 className="h-1" style={{ maxWidth: 640, marginTop: 12 }}>Nine operating domains. Fully connected.</h2>
          </div>
          <div className="about-domains">
            {DOMAINS.map((d, i) => (
              <Link key={d.name} to={`/category/${d.id}`} className="about-domain-card card" style={{ '--dcolor': d.color }}>
                <div className="about-domain-num mono">{String(i + 1).padStart(2, '0')}</div>
                <div className="about-domain-dot" style={{ background: d.color }} />
                <div className="about-domain-name">{d.name}</div>
                <div className="about-domain-count">{d.count}</div>
                <AgentixIcon name="arrow" size={12} color={d.color} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Philosophy: numbered principles ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Product philosophy</span>
            <h2 className="h-1" style={{ maxWidth: 680, marginTop: 12 }}>Six principles that shape every decision.</h2>
          </div>
          <div className="about-principles">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="about-principle card">
                <div className="about-principle-num mono">{p.num}</div>
                <h3 className="about-principle-title">{p.title}</h3>
                <p className="about-principle-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Timeline: vertical rail ── */}
      <section className="section page-band">
        <div className="container-wide about-timeline-wrap">
          <div className="sec-head">
            <span className="eyebrow">Origin and trajectory</span>
            <h2 className="h-1" style={{ maxWidth: 640, marginTop: 12 }}>Built from inside the problem.</h2>
          </div>
          <div className="about-timeline">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="about-tl-item">
                <div className="about-tl-left">
                  <div className="about-tl-year mono">{t.year}</div>
                  <div className="about-tl-label eyebrow">{t.label}</div>
                </div>
                <div className="about-tl-connector">
                  <div className="about-tl-dot" style={{ background: i === TIMELINE.length - 1 ? 'var(--accent)' : 'var(--bg-4)' }} />
                  {i < TIMELINE.length - 1 && <div className="about-tl-line" />}
                </div>
                <div className="about-tl-right">
                  <p className="body">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Who it serves: role chips ── */}
      <section className="section">
        <div className="container-wide">
          <div className="about-roles-wrap">
            <div className="about-roles-left">
              <span className="eyebrow">Who it serves</span>
              <h2 className="h-1" style={{ marginTop: 12, maxWidth: 480 }}>Built for the team you actually have.</h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                Not for enterprises with 18 months to implement. For ambitious teams who need results in the first week.
              </p>
              <div className="hero-ctas" style={{ marginTop: 28 }}>
                <Link to="/use-cases" className="btn btn-primary">See use cases <AgentixIcon name="arrow" size={14} /></Link>
                <Link to="/demo" className="btn btn-secondary">Book a demo</Link>
              </div>
            </div>
            <div className="about-roles-grid">
              {TEAM_ROLES.map((r) => (
                <div key={r} className="about-role-chip card">
                  <span className="dot dot-accent" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: 'var(--ink-0)' }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Product layers: horizontal stack diagram ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Architecture</span>
            <h2 className="h-1" style={{ maxWidth: 720, margin: '12px auto 0' }}>Four layers. One operating system.</h2>
          </div>
          <div className="about-layers">
            {[
              { label: 'Assistant layer', desc: 'Voice and chat routing — translates goals into tool paths', accent: 'var(--accent)' },
              { label: 'Workflow engine', desc: 'Sequential and parallel task execution across categories', accent: '#B6F26A' },
              { label: 'Tool ecosystem', desc: '130+ tools organized across 9 domains and 38 subcategories', accent: '#B69BFF' },
              { label: 'Human handoff', desc: 'Risk, compliance, and judgment routes to the right person with full context', accent: '#FFB060' },
            ].map((layer, i) => (
              <div key={layer.label} className="about-layer card" style={{ '--laccent': layer.accent }}>
                <div className="about-layer-num mono">{String(i + 1).padStart(2, '0')}</div>
                <div className="about-layer-bar" style={{ background: layer.accent }} />
                <div className="about-layer-label">{layer.label}</div>
                <div className="about-layer-desc">{layer.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Open question + CTA ── */}
      <section className="section">
        <div className="container-wide about-closing">
          <div className="about-closing-q">
            <div className="eyebrow">The question we started with</div>
            <h2 className="h-1" style={{ marginTop: 12, maxWidth: 720 }}>
              What if the whole business ran like your best operator's playbook?
            </h2>
            <p className="body-lg" style={{ marginTop: 20 }}>
              That's Agentix. One goal. One system. Reviewed outputs. Human decisions where they belong.
            </p>
            <div className="hero-ctas" style={{ marginTop: 32 }}>
              <Link to="/talk-to-agentix" className="btn btn-primary btn-lg"><AgentixIcon name="mic" size={16} />Talk to Agentix</Link>
              <Link to="/solutions" className="btn btn-secondary btn-lg">Explore solutions</Link>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
