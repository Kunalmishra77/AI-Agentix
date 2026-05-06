import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const EXAMPLE_CONVOS = [
  {
    id: 'content',
    label: 'Content team',
    color: '#FF8B6B',
    messages: [
      { role: 'user', text: 'I need to produce 20 pieces of content a week but my team is at capacity.' },
      { role: 'ai', text: 'Got it. That\'s a Content & Creative Production workflow. I\'m seeing three tools that fit: Content Brief Generator, SEO Brief Builder, and Article Writer. Want me to build the stack?' },
      { role: 'user', text: 'Yes, and I need human review before anything publishes.' },
      { role: 'ai', text: 'Configured. Every output goes to your designated reviewer before routing to the CMS. I\'ve attached the handoff rule to the workflow. Here\'s your first draft path.' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales team',
    color: '#5B9BFF',
    messages: [
      { role: 'user', text: 'We\'re losing deals because follow-up is inconsistent. Can Agentix fix that?' },
      { role: 'ai', text: 'Yes — this is a Sales workflow. I\'ll connect Outreach Sequencer, CRM Updater, and Deal Risk Scorer. Inconsistent follow-up usually means you need a trigger rule. Should I add one?' },
      { role: 'user', text: 'Yes. Trigger follow-up 24 hours after no reply.' },
      { role: 'ai', text: 'Done. The sequence now auto-triggers at 24h and 72h with no reply. Human handoff fires if a deal shows high-risk signals. Your pipeline visibility just improved significantly.' },
    ],
  },
  {
    id: 'ops',
    label: 'Operations',
    color: '#FFB060',
    messages: [
      { role: 'user', text: 'I spend 3 hours a week on status reports. There has to be a better way.' },
      { role: 'ai', text: 'Absolutely. Operations & Automation — specifically Reporting & Analytics. I\'ll pull the inputs from your connected systems, generate the report, and route it for your review. You only touch the exceptions.' },
      { role: 'user', text: 'What systems does it pull from?' },
      { role: 'ai', text: 'Any connected integration: CRM, Airtable, Google Sheets, or a custom API. You specify the data sources and the report format once. After that it runs automatically on your schedule.' },
    ],
  },
];

const USE_CASES = [
  { label: 'Find the right tool for a goal', example: '"What tool handles social media scheduling?"' },
  { label: 'Build a workflow stack', example: '"Build me a full content production stack."' },
  { label: 'Compare plans', example: '"Which plan do I need for 3 teams and 20 workflows?"' },
  { label: 'Get implementation guidance', example: '"How do I migrate from HubSpot to Agentix sales workflows?"' },
  { label: 'Diagnose a workflow problem', example: '"Why is my review step creating a bottleneck?"' },
  { label: 'Book a demo or talk to a human', example: '"I want to talk to someone about enterprise pricing."' },
];

const PRIVACY_POINTS = [
  { label: 'No conversation logging by default', desc: 'Sessions are not stored unless you enable conversation history.' },
  { label: 'Data stays in your region', desc: 'Agentix runs regional endpoints — your data doesn\'t cross jurisdiction boundaries.' },
  { label: 'No training on your conversations', desc: 'Your inputs are never used to train Agentix models.' },
  { label: 'Enterprise DPA available', desc: 'Full data processing agreement for enterprise accounts on request.' },
];

export default function TalkPage() {
  const [convo, setConvo] = useState('content');
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const active = EXAMPLE_CONVOS.find((c) => c.id === convo);

  const handleAsk = (e) => {
    if (e) e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <>
      <Helmet><title>Talk to Agentix / The AI Assistant</title></Helmet>

      {/* ── 1. Hero: voice-first ── */}
      <section className="hero page-hero">
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            <span className="chip-dot" style={{ background: 'var(--accent)' }} />Assistant
          </div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 900 }}>
            Start talking.<br />The system routes the rest.
          </h1>
          <p className="body-lg" style={{ maxWidth: 620 }}>
            Describe a goal, a problem, or a question. The Agentix assistant recommends the right category, tool, workflow, or human — in seconds.
          </p>
          <div className="talk-entry">
            <div className="talk-orb">
              <div className="dock-fab-orb" style={{ width: 40, height: 40 }} />
            </div>
            <form className="talk-input-wrap card" onSubmit={handleAsk}>
              <AgentixIcon name="mic" size={20} color="var(--accent)" />
              <input
                className="talk-input"
                placeholder="Tell Agentix what you're trying to accomplish..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Ask <AgentixIcon name="arrow" size={12} />
              </button>
            </form>
          </div>
          <div className="talk-prompts">
            {['"Build a content workflow"', '"Find a sales tool"', '"Compare plans"', '"How does handoff work?"'].map((p) => (
              <button key={p} className="voice-prompt-chip" onClick={() => setInput(p.slice(1, -1))}>{p}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Live conversation examples ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">In action</span>
            <h2 className="h-1" style={{ maxWidth: 640, marginTop: 12 }}>Real conversations. Real routing.</h2>
          </div>
          <div className="talk-convo-tabs">
            {EXAMPLE_CONVOS.map((c) => (
              <button key={c.id} className={`usecase-tab ${convo === c.id ? 'active' : ''}`} style={convo === c.id ? { background: c.color, borderColor: c.color, color: '#fff' } : {}} onClick={() => setConvo(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
          {active && (
            <div className="cc-frame" style={{ marginTop: 16 }}>
              <div className="cc-chrome">
                <div className="cc-chrome-dots"><span /><span /><span /></div>
                <div className="cc-chrome-url">assistant.agentix.ai / {active.id}</div>
                <div className="cc-chrome-meta mono">live session</div>
              </div>
              <div className="talk-convo-body">
                {active.messages.map((msg, i) => (
                  <div key={i} className={`mock-msg ${msg.role === 'user' ? 'user' : ''}`} style={{ maxWidth: '75%' }}>
                    <span className={`mock-avatar ${msg.role === 'user' ? 'u' : ''}`} style={msg.role === 'ai' ? { background: active.color + '20', color: active.color } : {}}>
                      {msg.role === 'ai' ? 'AI' : 'U'}
                    </span>
                    <div className={`mock-bubble ${msg.role === 'ai' ? 'ai' : ''}`}>{msg.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. What you can ask ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Use cases</span>
            <h2 className="h-1" style={{ maxWidth: 640, margin: '12px auto 0' }}>Six things the assistant handles best.</h2>
          </div>
          <div className="talk-use-cases">
            {USE_CASES.map((u, i) => (
              <div key={u.label} className="talk-use-case card">
                <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>{String(i + 1).padStart(2, '0')}</div>
                <div className="talk-uc-label">{u.label}</div>
                <div className="talk-uc-example mono">{u.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How routing works ── */}
      <section className="section">
        <div className="container-wide">
          <div className="page-split">
            <div>
              <span className="eyebrow">Routing logic</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>Intent → Category → Tool → Workflow → Human.</h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                The assistant doesn't guess. It maps your stated intent to the 9-domain taxonomy, identifies the best tool or workflow match, and — when needed — routes to a person with full context attached.
              </p>
              <Link to="/docs" className="btn btn-secondary" style={{ marginTop: 24 }}>Read the routing docs</Link>
            </div>
            <div className="talk-routing card">
              {[
                { step: 'Input', label: 'Goal or question', color: 'var(--ink-2)' },
                { step: 'Intent', label: 'Intent classification', color: '#B69BFF' },
                { step: 'Domain', label: 'Category mapping', color: '#5B9BFF' },
                { step: 'Tool', label: 'Tool recommendation', color: 'var(--accent)' },
                { step: 'Action', label: 'Workflow or handoff', color: 'var(--ok)' },
              ].map((r, i) => (
                <div key={r.step} className="talk-routing-step">
                  <div className="talk-routing-dot" style={{ background: r.color }} />
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{r.step}</div>
                    <div style={{ fontSize: 14, color: r.color }}>{r.label}</div>
                  </div>
                  {i < 4 && <div className="talk-routing-line" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Voice + text modes ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">Input modes</span>
            <h2 className="h-1" style={{ maxWidth: 560, margin: '12px auto 0' }}>Voice or text. Your preference.</h2>
          </div>
          <div className="talk-modes">
            <div className="talk-mode card">
              <div className="talk-mode-icon" style={{ color: 'var(--accent)' }}>
                <AgentixIcon name="mic" size={32} color="var(--accent)" />
              </div>
              <h3 className="h-3" style={{ marginTop: 16 }}>Voice entry</h3>
              <p className="body" style={{ marginTop: 8 }}>
                Speak your goal naturally. The assistant transcribes, classifies intent, and routes — no special commands needed.
              </p>
              <div className="talk-mode-chip chip" style={{ marginTop: 16, borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                Works on all devices
              </div>
            </div>
            <div className="talk-mode card">
              <div className="talk-mode-icon">
                <AgentixIcon name="search" size={32} color="#B69BFF" />
              </div>
              <h3 className="h-3" style={{ marginTop: 16 }}>Text / search entry</h3>
              <p className="body" style={{ marginTop: 8 }}>
                Type your question or goal. Same routing, same results — works in any environment where mic access isn't available.
              </p>
              <div className="talk-mode-chip chip" style={{ marginTop: 16, borderColor: '#B69BFF', color: '#B69BFF' }}>
                Full keyboard support
              </div>
            </div>
            <div className="talk-mode card">
              <div className="talk-mode-icon">
                <AgentixIcon name="arrow" size={32} color="#FFB060" />
              </div>
              <h3 className="h-3" style={{ marginTop: 16 }}>Assistant dock</h3>
              <p className="body" style={{ marginTop: 8 }}>
                The floating assistant is available on every page. One click opens the routing interface wherever you are in the system.
              </p>
              <div className="talk-mode-chip chip" style={{ marginTop: 16, borderColor: '#FFB060', color: '#FFB060' }}>
                Persistent on all pages
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Privacy and data handling ── */}
      <section className="section">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">Privacy</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Your conversations are private by design.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              The assistant is a routing layer — not a data collection system. What you tell it stays within your account, not a training dataset.
            </p>
            <Link to="/security" className="btn btn-secondary" style={{ marginTop: 24 }}>Security and privacy</Link>
          </div>
          <div className="talk-privacy">
            {PRIVACY_POINTS.map((p) => (
              <div key={p.label} className="talk-privacy-item card">
                <AgentixIcon name="check" size={16} color="var(--ok)" />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink-0)' }}>{p.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Enterprise assistant options ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Enterprise</span>
            <h2 className="h-1" style={{ maxWidth: 640, marginTop: 12 }}>For teams that need a custom assistant layer.</h2>
          </div>
          <div className="page-card-grid">
            {[
              { title: 'Custom routing rules', desc: 'Configure exactly how the assistant routes goals within your taxonomy — by team, role, or workflow type.', color: 'var(--accent)' },
              { title: 'Knowledge base integration', desc: 'Connect your internal documentation, SOPs, and FAQs so the assistant cites your content, not general knowledge.', color: '#B6F26A' },
              { title: 'Branded assistant', desc: 'Run the assistant under your own brand and domain with custom prompts and response tone.', color: '#B69BFF' },
              { title: 'Audit logging', desc: 'Full log of every routing decision, tool recommendation, and human handoff event for compliance review.', color: '#FFB060' },
            ].map((f) => (
              <div key={f.title} className="solution-card card" style={{ '--accent-cat': f.color }}>
                <div className="solution-head"><span className="solution-dot" style={{ background: f.color }} /><span className="solution-cat mono">Enterprise</span></div>
                <h3 className="solution-name">{f.title}</h3>
                <p className="solution-outcome">{f.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/contact" className="btn btn-secondary btn-lg">Talk to sales about enterprise</Link>
          </div>
        </div>
      </section>

      {/* ── 8. CTA: try it now ── */}
      <section className="voice-section">
        <div className="container-wide">
          <div className="voice-inner">
            <div className="voice-orb">
              <div className="voice-orb-core" />
              <div className="voice-orb-ring r1" />
              <div className="voice-orb-ring r2" />
              <div className="voice-orb-ring r3" />
            </div>
            <h2 className="h-1" style={{ textAlign: 'center', maxWidth: 560 }}>Start with a question. End with a working workflow.</h2>
            <p className="body-lg" style={{ textAlign: 'center', maxWidth: 480 }}>
              No setup. No configuration. Just describe what you're trying to accomplish.
            </p>
            <form className="voice-input" style={{ maxWidth: 640 }} onSubmit={handleAsk}>
              <AgentixIcon name="mic" size={18} color="var(--accent)" />
              <input
                placeholder="What are you trying to build or solve today?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Go <AgentixIcon name="arrow" size={12} />
              </button>
            </form>
            <div className="voice-prompts">
              {['"Find tools for my content team"', '"Build a sales workflow"', '"What\'s the right plan?"'].map((p) => (
                <button key={p} className="voice-prompt-chip" onClick={() => setInput(p.slice(1, -1))}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
