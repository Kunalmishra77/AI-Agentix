import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, CreditCard, Shield, UserCheck, Mail, ChevronRight } from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const up = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const SECTIONS = [
  {
    icon: <UserCheck size={22} />, color: '#E8631A', title: '1. Acceptance of Terms',
    paras: [
      'By accessing or using AI Agentix services — including our website, AI voice agents, automation workflows, dashboards, or any related product — you agree to be bound by these Terms of Service.',
      'These terms apply to all visitors, clients, partners, and any other party who engages with Santure AI Private Limited ("AI Agentix," "we," "us," or "our").',
      'If you are entering into these terms on behalf of a company or legal entity, you represent that you have the authority to bind that entity to these terms.',
    ],
  },
  {
    icon: <FileText size={22} />, color: '#6366F1', title: '2. Services Description',
    paras: [
      'AI Agentix provides AI-powered automation services including but not limited to: voice agents, WhatsApp chatbots, lead automation, document processing, and custom AI workflow development.',
      'All services are delivered as described in individual project scope documents, service agreements, or proposals agreed upon between AI Agentix and the client. Specific deliverables, timelines, and pricing are governed by those agreements.',
      'We reserve the right to modify, suspend, or discontinue any service with reasonable notice. For ongoing engagements, we will provide at least 30 days notice before any significant service changes.',
    ],
  },
  {
    icon: <CreditCard size={22} />, color: '#10B981', title: '3. Payment & Billing',
    paras: [
      'Payment terms are specified in your individual service agreement or proposal. Standard terms require 50% upfront and 50% on delivery for project-based work. Monthly retainer clients are billed at the start of each billing cycle.',
      'All prices are in Indian Rupees (INR) unless otherwise stated. Applicable GST will be charged as per Indian tax laws. Invoices must be paid within the due date specified — late payments may attract an interest of 1.5% per month.',
      'Payments are processed via Razorpay or direct bank transfer. We do not store card details on our servers. Disputes regarding invoices must be raised in writing within 7 days of the invoice date.',
    ],
  },
  {
    icon: <Shield size={22} />, color: '#F59E0B', title: '4. Intellectual Property',
    paras: [
      'Upon full payment, clients receive ownership of all custom-developed code, workflows, and AI configurations built specifically for their project. AI Agentix retains ownership of its proprietary frameworks, reusable components, and underlying platform technology.',
      'All content on this website — including text, graphics, logos, and design — is the property of Santure AI Private Limited and may not be reproduced without prior written consent.',
      'You may not reverse-engineer, disassemble, or create derivative works from our proprietary systems. Any third-party tools used in your project are subject to their respective licenses.',
    ],
  },
  {
    icon: <AlertCircle size={22} />, color: '#EC4899', title: '5. Limitation of Liability',
    paras: [
      'AI Agentix services are provided "as is." While we strive for reliability and accuracy, AI-generated outputs may occasionally contain errors. Human review is recommended for any business-critical decisions based on AI outputs.',
      'To the maximum extent permitted by law, Santure AI Private Limited shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services, including but not limited to loss of revenue, data, or business opportunity.',
      'Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim in the three months preceding the incident.',
    ],
  },
  {
    icon: <ChevronRight size={22} />, color: '#0EA5E9', title: '6. Termination & Governing Law',
    paras: [
      'Either party may terminate a service agreement with 30 days written notice, subject to the termination clauses in the individual service agreement. Work completed up to termination date shall be invoiced and paid.',
      'These terms are governed by the laws of India, and the courts of Pune, Maharashtra shall have exclusive jurisdiction over any disputes arising from or related to these terms.',
      'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
    ],
  },
  {
    icon: <Mail size={22} />, color: '#E8631A', title: '7. Contact & Updates',
    paras: [
      'These Terms of Service were last updated on 1 January 2025. We may update them periodically — significant changes will be communicated via email or a prominent notice on our website at least 14 days in advance.',
      'For any questions regarding these terms, please contact us at: legal@aiagentix.in or write to Santure AI Private Limited, Pune, Maharashtra, India.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — AI Agentix</title>
        <meta name="description" content="Terms of Service for AI Agentix. Read our commercial and acceptable-use terms governing AI automation services by Santure AI Private Limited." />
      </Helmet>
      <SiteNav />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '38vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <FileText size={13} color="#6366F1" />
            <span style={{ fontSize: 12, color: '#6366F1', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em' }}>Legal Agreement</span>
          </motion.div>
          <motion.h1 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Terms of Service
          </motion.h1>
          <motion.p {...up(0.12)} style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
            Please read these terms carefully before using AI Agentix services. They govern our relationship with every client and visitor.
          </motion.p>
          <motion.p {...up(0.16)} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16, fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
            Last updated: 1 January 2025 · Applies to: AI Agentix (Santure AI Private Limited)
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#fff', padding: '80px 0 100px' }}>
        <div className="ax-container" style={{ maxWidth: 860, margin: '0 auto', padding: '0 40px' }}>
          {SECTIONS.map((sec, i) => (
            <motion.div key={sec.title} {...up(i * 0.04)} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < SECTIONS.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${sec.color}12`, border: `1px solid ${sec.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sec.color, flexShrink: 0 }}>
                  {sec.icon}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#0D1B2E', margin: 0 }}>{sec.title}</h2>
              </div>
              {sec.paras.map((p, j) => (
                <p key={j} style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, marginBottom: 12, fontFamily: 'var(--font-body)' }}>{p}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#060E1A', padding: '60px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h3 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Questions about our terms?</motion.h3>
          <motion.p {...up(0.06)} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontFamily: 'var(--font-body)' }}>
            Our team is happy to walk you through anything that needs clarification.
          </motion.p>
          <motion.a {...up(0.1)} href="mailto:legal@aiagentix.in"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: '#6366F1', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>
            <Mail size={15} /> legal@aiagentix.in
          </motion.a>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}
