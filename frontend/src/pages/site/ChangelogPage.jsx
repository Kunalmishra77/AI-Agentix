import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const CATEGORIES = ['All', 'Platform', 'Tools', 'Workflows', 'Assistant', 'Integrations', 'Security', 'API'];

const RELEASES = [
  {
    version: '2.4.1',
    date: 'May 2, 2026',
    category: 'Tools',
    type: 'patch',
    title: 'Video Script Writer and Social Calendar tool improvements',
    changes: [
      { type: 'fix', text: 'Video Script Writer: resolved issue where multi-scene outputs were being truncated at 2,000 words.' },
      { type: 'improve', text: 'Social Calendar: improved recurrence rule handling for weekly and bi-weekly publishing schedules.' },
      { type: 'fix', text: 'Campaign Planner: fixed a display bug affecting subcategory tool counts in the theatre view.' },
    ],
  },
  {
    version: '2.4.0',
    date: 'April 28, 2026',
    category: 'Platform',
    type: 'minor',
    title: 'Workflow trigger system and audit log export',
    changes: [
      { type: 'new', text: 'Trigger rules can now fire on CRM field changes, new Airtable rows, and Slack message keywords — in addition to the existing schedule and webhook triggers.' },
      { type: 'new', text: 'Audit log is now exportable as CSV or JSON from the admin dashboard. Covers the last 90 days per export batch.' },
      { type: 'improve', text: 'Workflow builder: added a visual step-dependency view that shows what blocks what in multi-step sequences.' },
      { type: 'fix', text: 'Human handoff: resolved edge case where escalation reminders sent duplicate notifications on workflows with multiple reviewers.' },
    ],
  },
  {
    version: '2.3.2',
    date: 'April 14, 2026',
    category: 'Security',
    type: 'patch',
    title: 'Security hardening and GDPR data subject rights improvements',
    changes: [
      { type: 'security', text: 'Session token rotation interval reduced from 7 days to 24 hours across all plans.' },
      { type: 'new', text: 'Data subject rights portal: account holders can now submit data export and deletion requests directly from account settings.' },
      { type: 'improve', text: 'GDPR consent records are now stored with full timestamp and IP metadata for audit purposes.' },
    ],
  },
  {
    version: '2.3.0',
    date: 'April 7, 2026',
    category: 'Assistant',
    type: 'minor',
    title: 'Assistant routing improvements and knowledge base RAG upgrade',
    changes: [
      { type: 'new', text: 'Multi-intent detection: the assistant can now identify and split goals with multiple sub-intents into parallel workflow paths.' },
      { type: 'improve', text: 'RAG knowledge base: retrieval accuracy improved by 22% on structured documents (SOPs, style guides, policy docs) via reranking upgrade.' },
      { type: 'new', text: 'Assistant dock now supports keyboard shortcut (Cmd/Ctrl + K) to open from any page.' },
      { type: 'fix', text: 'Fixed assistant state persistence issue that caused the dock to reset after navigating between category pages.' },
    ],
  },
  {
    version: '2.2.1',
    date: 'March 30, 2026',
    category: 'Integrations',
    type: 'patch',
    title: 'Salesforce and HubSpot integration stability fix',
    changes: [
      { type: 'fix', text: 'Salesforce: resolved OAuth token refresh failure for accounts using custom domains.' },
      { type: 'fix', text: 'HubSpot: fixed contact property sync delay that occurred after workflow step 4+ in long sequences.' },
      { type: 'improve', text: 'Integration health monitor now surfaces connection errors in the dashboard with a one-click reconnect prompt.' },
    ],
  },
  {
    version: '2.2.0',
    date: 'March 14, 2026',
    category: 'Workflows',
    type: 'minor',
    title: 'Workflow templates library and branching conditions',
    changes: [
      { type: 'new', text: '18 new workflow templates added to the Solutions library — covering content production, sales pipeline, CX response, and operations reporting.' },
      { type: 'new', text: 'Conditional branching: workflows can now route to different tool paths based on output content, score, or flag.' },
      { type: 'improve', text: 'Workflow copy/duplicate now includes all trigger rules and handoff configurations — not just the tool sequence.' },
    ],
  },
  {
    version: '2.1.0',
    date: 'February 28, 2026',
    category: 'API',
    type: 'minor',
    title: 'Workflow API v2 and webhook retry logic',
    changes: [
      { type: 'new', text: 'Workflow API v2 released with improved pagination, filtering, and run-status endpoints. V1 remains available until Q3 2026.' },
      { type: 'new', text: 'Webhook delivery now includes automatic retry with exponential backoff — up to 3 retries over 12 hours.' },
      { type: 'deprecation', text: 'Workflow API v1 endpoints /runs/list and /runs/detail are deprecated. Migration guide in Docs → API & Webhooks.' },
    ],
  },
];

const typeColor = { new: 'var(--accent)', improve: '#B6F26A', fix: 'var(--warn)', security: 'var(--ok)', deprecation: 'var(--err)' };
const typeLabel = { new: 'New', improve: 'Improved', fix: 'Fixed', security: 'Security', deprecation: 'Deprecation' };
const releaseColor = { patch: 'var(--ink-3)', minor: 'var(--accent)', major: '#FFB060' };
const releaseLabel = { patch: 'Patch', minor: 'Feature', major: 'Major' };

const catColor = {
  Platform: 'var(--accent)', Tools: '#FF8B6B', Workflows: '#B6F26A',
  Assistant: '#B69BFF', Integrations: '#5B9BFF', Security: 'var(--ok)',
  API: '#FFB060',
};

export default function ChangelogPage() {
  const [cat, setCat] = useState('All');
  const filtered = cat === 'All' ? RELEASES : RELEASES.filter((r) => r.category === cat);

  return (
    <>
      <Helmet><title>Changelog / Agentix</title></Helmet>

      {/* ── 1. Hero ── */}
      <section className="hero page-hero" style={{ minHeight: 'auto', paddingBottom: 56 }}>
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip"><span className="chip-dot" />Changelog</div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 820 }}>Every release. Every change.<br />No surprises.</h1>
          <p className="body-lg" style={{ maxWidth: 580 }}>
            Platform updates, tool improvements, workflow engine changes, security patches, and API changelog — all in one place.
          </p>
          <div className="changelog-version-badge">
            <span className="chip" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
              <span className="chip-dot" style={{ background: 'var(--accent)' }} />Current: v2.4.1
            </span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>Released May 2, 2026</span>
          </div>
        </div>
      </section>

      {/* ── 2. Release type legend ── */}
      <section style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
        <div className="container-wide">
          <div className="changelog-legend">
            {Object.entries(typeColor).map(([k, c]) => (
              <span key={k} className="changelog-legend-item">
                <span className="changelog-type-dot" style={{ background: c }} />
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-2)' }}>{typeLabel[k]}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Filter tabs ── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container-wide">
          <div className="usecase-tabs">
            {CATEGORIES.map((c) => (
              <button key={c} className={`usecase-tab ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Changelog timeline ── */}
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container-wide">
          <div className="changelog-timeline">
            {filtered.map((release) => (
              <div key={release.version} className="changelog-entry">
                <div className="changelog-entry-meta">
                  <div className="changelog-version mono">{release.version}</div>
                  <div className="changelog-date mono">{release.date}</div>
                  <div className="changelog-release-type">
                    <span className="dot" style={{ background: releaseColor[release.type] }} />
                    <span className="mono" style={{ fontSize: 11, color: releaseColor[release.type] }}>{releaseLabel[release.type]}</span>
                  </div>
                  <div className="changelog-cat chip" style={{ borderColor: catColor[release.category] ?? 'var(--line)', color: catColor[release.category] ?? 'var(--ink-2)' }}>
                    {release.category}
                  </div>
                </div>
                <div className="changelog-entry-body card">
                  <div className="changelog-entry-connector" />
                  <h3 className="changelog-entry-title">{release.title}</h3>
                  <ul className="changelog-changes">
                    {release.changes.map((change, i) => (
                      <li key={i} className="changelog-change">
                        <span className="changelog-change-type" style={{ background: typeColor[change.type] + '20', color: typeColor[change.type], borderColor: typeColor[change.type] + '40' }}>
                          {typeLabel[change.type]}
                        </span>
                        <span className="changelog-change-text">{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Deprecation notices ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Deprecation notices</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12, color: 'var(--err)' }}>What's being retired and when.</h2>
          </div>
          <div className="changelog-deprecations">
            {[
              { item: 'Workflow API v1 — /runs/list, /runs/detail', deadline: 'Q3 2026 (Sep 30)', replacement: 'Workflow API v2', href: '/docs/api-webhooks' },
              { item: 'Legacy integration format (pre-2.0 webhook schema)', deadline: 'Q4 2026 (Dec 31)', replacement: 'Unified webhook v2 format', href: '/integrations' },
            ].map((d) => (
              <div key={d.item} className="changelog-deprecation card">
                <div className="changelog-dep-badge">Deprecated</div>
                <div className="changelog-dep-item">{d.item}</div>
                <div className="changelog-dep-deadline mono">End of life: {d.deadline}</div>
                <div className="changelog-dep-replacement">
                  Replacement: <Link to={d.href} style={{ color: 'var(--accent)' }}>{d.replacement}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Roadmap teaser ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Coming soon</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>What's shipping next.</h2>
          </div>
          <div className="changelog-roadmap">
            {[
              { label: 'Q2 2026', title: 'Multi-model tool selection', desc: 'Choose the underlying model per tool — GPT-4o, Claude 3.5, Gemini 1.5 — from within the workflow builder.', status: 'In development', color: 'var(--accent)' },
              { label: 'Q3 2026', title: 'SOC 2 Type II certification', desc: 'Independent audit completion and public report publication.', status: 'In progress', color: 'var(--ok)' },
              { label: 'Q3 2026', title: 'Workflow collaboration', desc: 'Multiple team members can co-own, review, and iterate on workflows with comments and version history.', status: 'Planned', color: '#B6F26A' },
              { label: 'Q4 2026', title: 'Custom tool builder', desc: 'Define custom tools with your own prompt templates, input schemas, and output structures — no code required.', status: 'Planned', color: '#B69BFF' },
            ].map((r) => (
              <div key={r.title} className="changelog-roadmap-item card">
                <div className="changelog-roadmap-label mono">{r.label}</div>
                <div className="chip" style={{ borderColor: r.color, color: r.color, marginBottom: 12 }}>
                  <span className="chip-dot" style={{ background: r.color }} />{r.status}
                </div>
                <h3 className="h-4">{r.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. API changelog ── */}
      <section className="section page-band">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">API changelog</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Building on the Agentix API?</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              The full API changelog is maintained in the developer documentation — including schema diffs, version migration guides, and breaking change notices.
            </p>
            <div className="hero-ctas" style={{ marginTop: 24 }}>
              <Link to="/docs/api-webhooks" className="btn btn-secondary">API docs</Link>
              <Link to="/integrations" className="btn btn-secondary">Integrations</Link>
            </div>
          </div>
          <div className="changelog-api card">
            <div className="eyebrow" style={{ marginBottom: 16 }}>API versions</div>
            {[
              { version: 'v2 (current)', status: 'stable', note: 'Full support — all new endpoints here' },
              { version: 'v1 (legacy)', status: 'deprecated', note: 'End of life Q3 2026 — migrate now' },
            ].map((v) => (
              <div key={v.version} className="changelog-api-row">
                <span className="mono" style={{ fontSize: 13, color: 'var(--ink-0)' }}>{v.version}</span>
                <span className="dot" style={{ background: v.status === 'stable' ? 'var(--ok)' : 'var(--err)' }} />
                <span className="mono" style={{ fontSize: 11, color: v.status === 'stable' ? 'var(--ok)' : 'var(--err)' }}>{v.status}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{v.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Subscribe ── */}
      <section className="section">
        <div className="container-wide">
          <div className="changelog-subscribe card">
            <div className="changelog-subscribe-left">
              <span className="eyebrow">Stay updated</span>
              <h2 className="h-2" style={{ marginTop: 12 }}>Get the changelog by email.</h2>
              <p className="body" style={{ marginTop: 12 }}>
                Receive a digest of all platform changes once per release cycle. No marketing — just what shipped.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="changelog-subscribe-form">
              <input type="email" className="contact-input" placeholder="your@email.com" />
              <button type="submit" className="btn btn-primary">Subscribe to changelog</button>
            </form>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
