import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { RefreshCcw, CheckCircle, XCircle, Clock, AlertTriangle, Mail } from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const up = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const SECTIONS = [
  {
    icon: <RefreshCcw size={22} />, color: '#E8631A', title: '1. Our Commitment',
    paras: [
      'At AI Agentix, we are committed to delivering measurable value. If we fail to deliver the agreed-upon scope of work, we will work to resolve it — including partial refunds where warranted.',
      'Every project begins with a clearly defined scope document. Our refund policy is applied against the deliverables and milestones outlined in that agreement.',
    ],
  },
  {
    icon: <CheckCircle size={22} />, color: '#10B981', title: '2. Eligible Refunds',
    paras: [
      'A full refund of the advance/upfront payment is applicable if: (a) AI Agentix fails to initiate work within 14 business days of payment without communication, or (b) both parties mutually agree to cancel the project before any work commences.',
      'A partial refund (proportional to undelivered milestones) is applicable if: (a) AI Agentix is unable to deliver a specific milestone as defined in the scope document, or (b) a project is terminated by AI Agentix without cause.',
      'Refunds for subscription/retainer services: if you cancel a monthly retainer within the first 7 days of a billing cycle and no significant work has been initiated for that cycle, a prorated refund for unused days will be issued.',
    ],
  },
  {
    icon: <XCircle size={22} />, color: '#EF4444', title: '3. Non-Refundable Situations',
    paras: [
      'Refunds will NOT be issued in the following circumstances: (a) work has been completed and delivered as per the agreed scope, (b) the client changes requirements or project direction after work has begun, (c) delays are caused by the client\'s failure to provide timely approvals, content, access, or feedback.',
      'Payments for completed milestones are non-refundable even if subsequent milestones are cancelled. Any third-party costs incurred on your behalf (API credits, tool licenses, server costs) are non-refundable.',
      'Change-of-mind cancellations after project kickoff are not eligible for refunds on work already in progress.',
    ],
  },
  {
    icon: <Clock size={22} />, color: '#6366F1', title: '4. Refund Process & Timeline',
    paras: [
      'To request a refund, email billing@aiagentix.in with your project details, invoice number, and the reason for your request. Please include any supporting documentation.',
      'We will acknowledge your request within 2 business days and complete our review within 10 business days. If your refund is approved, the amount will be credited to your original payment method within 7–10 business days after approval.',
      'Refunds are processed via the same payment method used for the original transaction (Razorpay/bank transfer). Processing times may vary depending on your bank or payment provider.',
    ],
  },
  {
    icon: <AlertTriangle size={22} />, color: '#F59E0B', title: '5. Disputes',
    paras: [
      'If you are not satisfied with our refund decision, you may escalate by writing to grievances@aiagentix.in. We will appoint a senior team member to review your case independently.',
      'We strongly encourage resolving disputes amicably. If a resolution cannot be reached, disputes shall be subject to the jurisdiction of Pune, Maharashtra, India as specified in our Terms of Service.',
    ],
  },
  {
    icon: <Mail size={22} />, color: '#0EA5E9', title: '6. Contact for Refund Requests',
    paras: [
      'This Refund Policy was last updated on 1 January 2025. We may revise it from time to time — updates will be published on this page.',
      'To initiate a refund request or ask questions about this policy, contact us at: billing@aiagentix.in or write to Santure AI Private Limited, Pune, Maharashtra, India.',
    ],
  },
];

export default function RefundPage() {
  return (
    <>
      <Helmet>
        <title>Refund Policy — AI Agentix</title>
        <meta name="description" content="AI Agentix refund policy. Understand when refunds apply, the process to request one, and how we resolve disputes fairly." />
      </Helmet>
      <SiteNav />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '38vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <RefreshCcw size={13} color="#10B981" />
            <span style={{ fontSize: 12, color: '#10B981', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em' }}>Fair & Transparent</span>
          </motion.div>
          <motion.h1 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Refund Policy
          </motion.h1>
          <motion.p {...up(0.12)} style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
            We stand behind our work. Here's exactly when refunds apply, how to request one, and what to expect from the process.
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
          <motion.h3 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Need to raise a refund request?</motion.h3>
          <motion.p {...up(0.06)} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontFamily: 'var(--font-body)' }}>
            Email our billing team directly with your invoice number and details.
          </motion.p>
          <motion.a {...up(0.1)} href="mailto:billing@aiagentix.in"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>
            <Mail size={15} /> billing@aiagentix.in
          </motion.a>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}
