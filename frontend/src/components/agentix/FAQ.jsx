import { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';

const faqs = [
  { q: 'What is Agentix?', a: 'An AI operating system that connects content, marketing, sales, support, research, ops, knowledge, delivery, and finance into one workflow surface — with grounded RAG, voice/chat, and human handoff built in.' },
  { q: 'Who is it for?', a: 'B2B SaaS startups, SMEs, agencies, and founder-led businesses. Teams that need predictable systems but can\'t justify enterprise software.' },
  { q: 'Does it replace existing tools?', a: 'It can replace several. Or sit on top — Agentix integrates with CRMs, calendars, docs, support, messaging, spreadsheets, CMS, and analytics.' },
  { q: 'How does human handoff work?', a: 'Every workflow defines review rules. Compliance, finance, and high-risk decisions route to a human by default. You decide where AI ends and humans take over.' },
  { q: 'Is the assistant grounded in approved content?', a: 'Yes. RAG over your docs, SOPs, knowledge base, support history, and product data — with citations on every answer.' },
  { q: 'Can it connect to our CRM and support tools?', a: 'HubSpot, Salesforce, Pipedrive, Intercom, Zendesk, Help Scout, Notion, Linear, Slack, GMail, Outlook, and more — plus an open API and webhooks.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="container-wide">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="eyebrow">12 / FAQ</span>
            <h2 className="h-1" style={{ margin: '12px 0 16px', maxWidth: 380 }}>Questions, answered.</h2>
            <p className="body-lg" style={{ maxWidth: 360 }}>The short version. For the long version — talk to Agentix and ask anything.</p>
            <Link to="/talk-to-agentix" className="btn btn-secondary" style={{ marginTop: 24 }}>Ask the assistant <AgentixIcon name="arrow" size={12}/></Link>
          </div>
          <div className="faq-right">
            {faqs.map((f, i) => (
              <div key={f.q} className={`faq-item ${open === i ? 'open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <span className="faq-icon"><AgentixIcon name={open === i ? 'close' : 'plus'} size={14}/></span>
                </div>
                <div className="faq-a"><div>{f.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
