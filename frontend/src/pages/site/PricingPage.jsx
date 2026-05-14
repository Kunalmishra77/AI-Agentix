import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const COST_CATEGORIES = [
  {
    id: 'tool',
    number: '01',
    title: 'Tool Cost',
    color: '#E87520',
    icon: 'tools',
    tagline: 'What we build for you.',
    description:
      'Every Agentix deployment is a custom-built tool or set of tools designed around your specific business goal, workflow, and team structure. Tool cost covers the design, development, configuration, and integration of the AI agents and automation layer built for your use case.',
    includes: [
      'Custom tool taxonomy mapped to your business domain',
      'AI agent configuration and prompt engineering',
      'Workflow logic, routing rules, and handoff conditions',
      'UI and dashboard setup for your team',
      'Initial integration with your existing systems',
    ],
    note: 'Varies based on complexity, number of tools, and integration depth.',
  },
  {
    id: 'api',
    number: '02',
    title: 'API Cost',
    color: '#B6F26A',
    icon: 'api',
    tagline: 'What the AI runs on.',
    description:
      'The intelligence behind every Agentix tool is powered by large language model APIs and supporting AI infrastructure. API cost reflects the actual compute consumed by your workflows — the number of AI calls, token volumes, model selection, and usage frequency across your team.',
    includes: [
      'LLM API usage (OpenAI, Anthropic, Groq, or custom models)',
      'Voice and speech processing (STT / TTS) if applicable',
      'Embedding and retrieval for knowledge base features',
      'Third-party API calls triggered by your workflows',
      'Usage scales with your team size and workflow frequency',
    ],
    note: 'Billed based on actual consumption — not a flat rate. Light usage costs less; heavy automation costs more.',
  },
  {
    id: 'maintenance',
    number: '03',
    title: 'Maintenance Cost',
    color: '#B69BFF',
    icon: 'settings',
    tagline: 'What keeps it running.',
    description:
      'AI systems and business workflows evolve. Maintenance cost covers the ongoing health, updates, and improvements to your Agentix deployment — including model updates, prompt refinements as your business changes, integration upkeep, monitoring, and access to the Agentix team for support and iteration.',
    includes: [
      'Ongoing prompt and model tuning as outputs drift',
      'Integration updates when connected systems change',
      'Performance monitoring and error resolution',
      'New workflow additions and tool expansions',
      'Priority access to the Agentix team for iteration',
    ],
    note: 'Maintenance can be handled by your team or Agentix — we scope it based on your capacity.',
  },
];

const FAQS = [
  {
    q: 'Why no fixed pricing on this page?',
    a: "Because every Agentix deployment is built for a specific business goal, team structure, and integration environment. A single-tool content workflow costs very differently from a multi-domain operating system with 30 integrations. Fixed pricing would be misleading — we'd rather give you an accurate quote after understanding your actual situation.",
  },
  {
    q: 'What does a typical engagement cost?',
    a: 'That depends on the three cost categories above and how they apply to your use case. The best way to get an accurate number is a demo call — we scope the tool cost, estimate API usage based on your volume, and discuss maintenance options. Most teams have a clear budget picture within one conversation.',
  },
  {
    q: 'Can we start small and expand?',
    a: 'Yes. Most clients start with one workflow or one domain (e.g., content production or sales outreach), validate the output, and then expand. We design the system to grow — adding tools, workflows, and integrations without rebuilding from scratch.',
  },
  {
    q: 'Is there an ongoing commitment?',
    a: "Tool cost is typically a one-time or phased project engagement. API cost runs as long as your workflows run. Maintenance is optional — some teams manage it internally, others keep us on retainer. We'll make a recommendation after the demo.",
  },
  {
    q: 'How long does it take to get started?',
    a: "Most teams go from demo call to first working workflow in under two weeks. Complex multi-tool systems with many integrations take longer — we'll give you a realistic timeline in the scoping conversation.",
  },
];

export default function PricingPage() {
  const handleTalk = () => window.dispatchEvent(new CustomEvent('open-voice-agent'));

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
          <h1 className="h-display" style={{ margin: '22px 0 18px', maxWidth: 900 }}>
            Three things that determine<br />what Agentix costs you.
          </h1>
          <p className="body-lg" style={{ maxWidth: 640 }}>
            Every deployment is custom-built around your business goal, team, and systems. Pricing varies based on what you're building, how heavily it runs, and how much support you want around it.
          </p>
          <div className="hero-ctas" style={{ marginTop: 36 }}>
            <Link to="/demo" className="btn btn-primary btn-lg">
              Book a demo call <AgentixIcon name="arrow" size={16} />
            </Link>
            <button className="btn btn-secondary btn-lg" onClick={handleTalk}>
              <AgentixIcon name="mic" size={14} />Ask about pricing
            </button>
          </div>
        </div>
      </section>

      {/* ── 2. Three cost categories ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Cost breakdown</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Every quote is built from these three components.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 48 }}>
            {COST_CATEGORIES.map((cat) => (
              <div key={cat.id} className="card" style={{
                borderLeft: `4px solid ${cat.color}`,
                padding: '36px 40px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 40,
                alignItems: 'start',
              }}>
                {/* Left col */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <span className="mono" style={{ fontSize: 11, color: cat.color, letterSpacing: '0.08em' }}>{cat.number}</span>
                    <h3 className="h-2" style={{ color: cat.color, margin: 0 }}>{cat.title}</h3>
                  </div>
                  <p className="body-lg" style={{ color: 'var(--ink-1)', marginBottom: 16 }}>
                    <em>{cat.tagline}</em>
                  </p>
                  <p className="body" style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
                    {cat.description}
                  </p>
                  <div className="chip" style={{ marginTop: 20, borderColor: cat.color, color: cat.color, width: 'fit-content' }}>
                    {cat.note}
                  </div>
                </div>
                {/* Right col — what's included */}
                <div>
                  <div className="eyebrow" style={{ marginBottom: 20 }}>What this covers</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cat.includes.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: '50%', background: cat.color,
                          flexShrink: 0, marginTop: 6,
                        }} />
                        <span style={{ fontSize: 14, color: 'var(--ink-1)', lineHeight: 1.6 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Pricing variable callout ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(0,200,160,0.06) 0%, transparent 60%)',
            border: '1px solid rgba(0,200,160,0.2)',
            padding: '52px 60px',
            textAlign: 'center',
            maxWidth: 860,
            margin: '0 auto',
          }}>
            <div className="chip" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', margin: '0 auto 24px' }}>
              <span className="chip-dot" style={{ background: 'var(--accent)' }} />Variable pricing
            </div>
            <h2 className="h-1" style={{ maxWidth: 680, margin: '0 auto 20px' }}>
              Pricing depends entirely on what we build for you.
            </h2>
            <p className="body-lg" style={{ maxWidth: 560, margin: '0 auto 32px', color: 'var(--ink-2)' }}>
              A single-tool deployment for a 3-person team is priced very differently from a 12-domain operating system for a 200-person company. The right number comes from a real conversation about your goal, volume, and timeline — not a pricing table.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demo" className="btn btn-primary btn-lg" style={{ background: 'var(--accent)', color: '#001a14' }}>
                Discuss pricing on a demo call <AgentixIcon name="arrow" size={16} />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Send us a question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. What the demo call covers ── */}
      <section className="section">
        <div className="container-wide">
          <div className="page-split">
            <div>
              <span className="eyebrow">The demo call</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>30 minutes to a real quote and a working workflow.</h2>
              <p className="body-lg" style={{ marginTop: 16 }}>
                The demo is where we scope your deployment. You leave with a clear picture of all three cost components, a recommended starting point, and usually a working example of your first workflow.
              </p>
              <Link to="/demo" className="btn btn-primary" style={{ marginTop: 28 }}>
                Book the demo <AgentixIcon name="arrow" size={14} />
              </Link>
            </div>
            <div className="card" style={{ padding: '32px 36px' }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>What we cover in the call</div>
              {[
                ['Your goal', "We start with the business outcome you're trying to achieve — not features."],
                ['Tool scope', 'We map which tools, workflows, and domains apply to your use case.'],
                ['API estimate', 'Based on your team size and usage patterns, we estimate real API volumes.'],
                ['Maintenance path', "We discuss whether your team handles upkeep or we stay involved."],
                ['Implementation timeline', 'You get a realistic path from zero to first output in production.'],
                ['Pricing breakdown', 'All three cost components, scoped to your specific situation.'],
              ].map(([label, desc]) => (
                <div key={label} style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'flex-start' }}>
                  <AgentixIcon name="check" size={15} color="var(--accent)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-0)' }}>{label}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 3 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="faq-grid">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="h-1" style={{ marginTop: 12 }}>Pricing questions.</h2>
              <p className="body" style={{ marginTop: 16 }}>
                Still unclear? <Link to="/contact" style={{ color: 'var(--accent)' }}>Write to us</Link> or{' '}
                <button
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--accent)', cursor: 'pointer', fontSize: 'inherit' }}
                  onClick={handleTalk}
                >
                  ask the assistant
                </button>.
              </p>
            </div>
            <div className="faq-right">
              {FAQS.map((item) => (
                <div key={item.q} className="faq-item open">
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

      <FinalCTA />
    </>
  );
}
