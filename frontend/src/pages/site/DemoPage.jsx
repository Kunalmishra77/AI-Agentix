import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const PERSONAS = [
  {
    id: 'founder',
    label: 'Founder / CEO',
    goal: 'Replace manual ops with one system',
    color: '#E87520',
    path: ['State the business goal', 'See the 9 domains mapped to it', 'Pick a first workflow', 'Watch the assistant route it', 'Review the output'],
    duration: '30 min',
  },
  {
    id: 'operator',
    label: 'Operator / COO',
    goal: 'Govern workflows across teams',
    color: '#B6F26A',
    path: ['Map current manual workflows', 'See Agentix equivalents', 'Configure human handoff rules', 'Set up integrations', 'Review audit trail'],
    duration: '45 min',
  },
  {
    id: 'team-lead',
    label: 'Team Lead',
    goal: 'Eliminate daily manual tasks',
    color: '#B69BFF',
    path: ['Pick your team domain', 'See the tool stack', 'Run a live workflow', 'Review outputs', 'Set up recurring automation'],
    duration: '25 min',
  },
];

const DEMO_WHAT = [
  { step: '01', title: 'System overview', desc: 'The full 9-domain taxonomy, how categories connect, and how the assistant routes goals.' },
  { step: '02', title: 'Live workflow', desc: 'We run a real workflow from your stated goal — from input to reviewed output — during the call.' },
  { step: '03', title: 'Tool selection', desc: 'You pick any tool from the ecosystem. We show the workspace, inputs, outputs, and handoff rules.' },
  { step: '04', title: 'Integration walkthrough', desc: 'Connect Agentix to one of your existing systems — CRM, email, docs, or Slack — in real time.' },
  { step: '05', title: 'Pricing recommendation', desc: 'Based on your goal, team size, and workflow count, we recommend the right plan.' },
  { step: '06', title: 'Implementation path', desc: 'We outline exactly how you\'d go from zero to first workflow in production — usually under one week.' },
];

const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const DAYS = ['Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16'];

export default function DemoPage() {
  const [persona, setPersona] = useState('founder');
  const [day, setDay] = useState('Wed 14');
  const [time, setTime] = useState('2:00 PM');
  const [booked, setBooked] = useState(false);
  const active = PERSONAS.find((p) => p.id === persona);

  return (
    <>
      <Helmet><title>Book a Demo / Agentix</title></Helmet>

      {/* ── 1. Hero ── */}
      <section className="hero page-hero">
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            <span className="chip-dot" style={{ background: 'var(--accent)' }} />Book a Demo
          </div>
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 900 }}>
            See the whole system<br />in 30 minutes.
          </h1>
          <p className="body-lg" style={{ maxWidth: 620 }}>
            Not a slide deck. A live session where we run a real workflow from your goal, in real time, with a product specialist who knows the system cold.
          </p>
          <div className="demo-meta-row">
            {[['30–45 min', 'Duration'], ['No slides', 'Format'], ['Your goal', 'Starting point'], ['Same day', 'Availability']].map(([v, l]) => (
              <div key={l} className="demo-meta-item">
                <div className="demo-meta-val" style={{ color: 'var(--accent)' }}>{v}</div>
                <div className="demo-meta-label eyebrow">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Persona selector ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Choose your demo path</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Different roles. Different starting points.</h2>
          </div>
          <div className="demo-personas">
            {PERSONAS.map((p) => (
              <button key={p.id} className={`demo-persona card ${persona === p.id ? 'demo-persona-active' : ''}`} style={{ '--pcolor': p.color }} onClick={() => setPersona(p.id)}>
                <div className="demo-persona-dot" style={{ background: p.color }} />
                <div className="demo-persona-label">{p.label}</div>
                <div className="demo-persona-goal">{p.goal}</div>
                <div className="demo-persona-duration mono">{p.duration}</div>
              </button>
            ))}
          </div>

          {active && (
            <div className="demo-path card" style={{ '--pcolor': active.color, marginTop: 24 }}>
              <div className="demo-path-head">
                <span className="eyebrow">Your demo path — {active.label}</span>
                <span className="chip" style={{ borderColor: active.color, color: active.color }}>{active.duration}</span>
              </div>
              <div className="demo-path-steps">
                {active.path.map((step, i) => (
                  <div key={step} className="demo-path-step">
                    <div className="demo-path-num mono" style={{ color: active.color }}>{String(i + 1).padStart(2, '0')}</div>
                    <div className="demo-path-connector" />
                    <div className="demo-path-label">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. What you'll see ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">What's covered</span>
            <h2 className="h-1" style={{ maxWidth: 640, margin: '12px auto 0' }}>Six things every demo covers.</h2>
          </div>
          <div className="demo-what">
            {DEMO_WHAT.map((w) => (
              <div key={w.step} className="demo-what-item card">
                <div className="demo-what-step mono">{w.step}</div>
                <h3 className="demo-what-title">{w.title}</h3>
                <p className="demo-what-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Calendar booking UI ── */}
      <section className="section">
        <div className="container-wide">
          <div className="demo-booking-wrap">
            <div>
              <span className="eyebrow">Pick a time</span>
              <h2 className="h-1" style={{ marginTop: 12, maxWidth: 440 }}>We're available this week. Choose a slot.</h2>
              <p className="body" style={{ marginTop: 14 }}>
                All sessions are live — not recordings. A specialist joins you on video, shares screen, and runs the demo from your stated goal.
              </p>
            </div>

            {booked ? (
              <div className="demo-booked card">
                <div className="dot dot-ok" style={{ width: 48, height: 48, margin: '0 auto 20px' }} />
                <h3 className="h-3" style={{ textAlign: 'center' }}>Demo booked!</h3>
                <p className="body" style={{ textAlign: 'center', marginTop: 8 }}>
                  {day} at {time}. You'll receive a calendar invite and prep guide within the next 15 minutes.
                </p>
                <Link to="/docs" className="btn btn-secondary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                  Read docs while you wait
                </Link>
              </div>
            ) : (
              <div className="demo-calendar card">
                <div className="demo-cal-head">
                  <span className="eyebrow">May 2026</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>Your timezone · GMT</span>
                </div>
                <div className="demo-cal-days">
                  {DAYS.map((d) => (
                    <button key={d} className={`demo-cal-day ${day === d ? 'active' : ''}`} onClick={() => setDay(d)}>{d}</button>
                  ))}
                </div>
                <div className="demo-cal-times">
                  {TIMES.map((t) => (
                    <button key={t} className={`demo-cal-time ${time === t ? 'active' : ''}`} onClick={() => setTime(t)}>{t}</button>
                  ))}
                </div>
                <div className="demo-cal-selected mono" style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 16 }}>
                  Selected: {day} · {time}
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={() => setBooked(true)}>
                  Book this slot <AgentixIcon name="arrow" size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. What to prepare ── */}
      <section className="section page-band">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">Preparation</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Come with a goal. That's it.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>
              You don't need to configure anything or read the docs first. The demo starts with your goal and routes everything from there.
            </p>
          </div>
          <div className="demo-prep card">
            <div className="eyebrow" style={{ marginBottom: 20 }}>Optional prep items</div>
            {[
              ['Your primary workflow goal', 'e.g., "Reduce manual sales outreach by 80%"'],
              ['Current tool stack', 'We\'ll show Agentix equivalents or integrations'],
              ['Team size and roles', 'Helps us recommend the right plan during the demo'],
              ['One pain point to solve first', 'We\'ll build a live solution around it in the session'],
            ].map(([label, hint]) => (
              <div key={label} className="demo-prep-row">
                <div className="dot dot-accent" style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <div style={{ fontSize: 14, color: 'var(--ink-0)', fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{hint}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Social proof ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head-center sec-head">
            <span className="eyebrow">What people say about the demo</span>
            <h2 className="h-1" style={{ maxWidth: 600, margin: '12px auto 0' }}>The session changes how you think about the problem.</h2>
          </div>
          <div className="demo-quotes">
            {[
              { quote: '"I came in expecting a feature tour. I left with a working workflow and a week-by-week migration plan."', role: 'COO · SaaS company', color: '#E87520' },
              { quote: '"30 minutes and I understood exactly why everything I\'d tried before hadn\'t stuck. It\'s a different category."', role: 'Founder · Agency', color: '#B6F26A' },
              { quote: '"They ran a live sales workflow from my exact pipeline. I signed up before the call ended."', role: 'Head of Revenue · Scale-up', color: '#B69BFF' },
            ].map((q) => (
              <div key={q.role} className="demo-quote card">
                <div className="demo-quote-bar" style={{ background: q.color }} />
                <p className="demo-quote-text">{q.quote}</p>
                <div className="demo-quote-role mono">{q.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Alternative routes ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Not ready to book?</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>There are other ways to explore Agentix.</h2>
          </div>
          <div className="demo-alts">
            {[
              { label: 'Talk to Agentix', desc: 'Use the assistant now — no booking, no form. State your goal and watch the system route it.', href: '/talk-to-agentix', cta: 'Start talking', color: 'var(--accent)' },
              { label: 'Read the docs', desc: 'Builder documentation for the workflow engine, tool ecosystem, and integration layer.', href: '/docs', cta: 'Open docs', color: '#B6F26A' },
              { label: 'Browse solutions', desc: 'Pre-built outcome stacks for common business goals. Start with one that matches your situation.', href: '/solutions', cta: 'View solutions', color: '#B69BFF' },
              { label: 'Contact sales', desc: 'Skip the demo and go straight to a pricing conversation with the sales team.', href: '/contact', cta: 'Get in touch', color: '#FFB060' },
            ].map((a) => (
              <div key={a.label} className="demo-alt card">
                <div className="demo-alt-label" style={{ color: a.color }}>{a.label}</div>
                <div className="demo-alt-desc">{a.desc}</div>
                <Link to={a.href} className="btn btn-ghost" style={{ marginTop: 'auto', color: a.color, paddingLeft: 0 }}>
                  {a.cta} <AgentixIcon name="arrow" size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="section">
        <div className="container-wide">
          <div className="faq-grid">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>Demo questions.</h2>
            </div>
            <div className="faq-right">
              {[
                { q: 'Is the demo really live?', a: 'Yes. A product specialist joins you, shares their screen, and runs the actual Agentix platform from your stated goal. No video, no slides.' },
                { q: 'Who runs the demo?', a: 'A founding-team product specialist — not a sales account executive. They know the system at a technical level and can answer edge-case questions.' },
                { q: 'How long does it take?', a: 'Typically 30–45 minutes. Founder paths run shorter (30 min). Operator and team lead paths go deeper and may extend to 45 minutes.' },
                { q: 'Do I need to sign up first?', a: 'No. You book the slot, show up, and the specialist walks you through everything. You decide after the session whether to start a trial.' },
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

      <FinalCTA />
    </>
  );
}
