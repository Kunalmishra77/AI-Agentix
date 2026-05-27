import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiteNav from '../../../components/layout/SiteNav.jsx';
import SiteFooter from '../../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../../voice-agent/VoiceAgentWidget.jsx';
import '../../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

function useCountUp(target, dur = 1800) {
  const [count, setCount] = useState(0); const ref = useRef(null);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; obs.disconnect(); let s = null; const tick = (ts) => { if (!s) s = ts; const p = Math.min((ts - s) / dur, 1); setCount(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, { threshold: 0.3 }); obs.observe(el); return () => obs.disconnect(); }, [target, dur]);
  return [count, ref];
}

const FEATURES = [
  { id: 0, label: 'Lead Qualification Engine', detail: 'AI scores and qualifies every incoming lead based on budget, timeline, location preference, and engagement signals. Only high-intent prospects reach your agents, saving 60% of prospecting time.' },
  { id: 1, label: 'Property Matching AI', detail: 'Natural language property search lets buyers describe their dream home conversationally. AI matches requirements to inventory and delivers personalized shortlists instantly.' },
  { id: 2, label: 'Site Visit Automation', detail: 'Automated scheduling, reminders, and follow-ups for property viewings. Reduce no-shows by 45% with intelligent nudges and WhatsApp confirmations.' },
  { id: 3, label: 'Document Processing', detail: 'AI extracts, verifies, and organizes documents for KYC, loan applications, and legal agreements. Cut document processing time from days to minutes.' },
  { id: 4, label: 'Post-Sale Relationship', detail: 'Automated handover workflows, maintenance request routing, and owner community management. Keep buyers engaged through possession and beyond.' },
  { id: 5, label: 'Market Intelligence', detail: 'Real-time market data, competitor pricing, and demand forecasting help developers and agents price accurately and time launches strategically.' },
];

const FAQS = [
  { q: 'How does the AI handle property inquiries at 2 AM?', a: 'The AI answers all inquiries 24/7 via website chat, WhatsApp, and email "" qualifying leads, sharing property details, and scheduling visits automatically. No lead is ever missed.' },
  { q: 'Can it manage multiple project launches simultaneously?', a: 'Yes. AI Agentix can run parallel campaigns for multiple projects with separate workflows, pricing logic, and follow-up sequences "" all managed from one dashboard.' },
  { q: 'Does it work for both residential and commercial real estate?', a: 'Absolutely. We serve residential developers, commercial brokers, property management companies, and individual agents with tailored workflows for each.' },
  { q: 'How does document AI help with RERA compliance?', a: 'AI extracts key terms from agreements, flags non-standard clauses, organizes compliance documents, and maintains audit trails "" reducing legal review time significantly.' },
  { q: 'What CRM platforms do you integrate with?', a: 'We integrate with Salesforce, HubSpot, Zoho CRM, LeadSquared, and all major real estate CRMs. Custom integrations available for proprietary systems.' },
];

export default function RealEstatePage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [leads, leadsRef] = useCountUp(73);
  const [conversion, conversionRef] = useCountUp(41);
  const [noshow, noshowRef] = useCountUp(45);
  const [doctime, doctimeRef] = useCountUp(85);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--nvd)', color: 'var(--ow)', overflowX: 'hidden' }}>
      <SiteNav scrolled={scrolled} logoFilter={scrolled ? 'none' : 'brightness(0) invert(1)'} />

      {/* HERO "" dark, property pipeline widget */}
      <section style={{ background: 'var(--nvd)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.15)', border: '1px solid rgba(232,99,26,0.4)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600 }}>AI FOR REAL ESTATE</span>
            </motion.div>
            <motion.h1 {...up(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              Close More Deals with <span style={{ color: 'var(--or)' }}>AI-Powered Real Estate</span>
            </motion.h1>
            <motion.p {...up(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(248,246,242,0.7)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              From first inquiry to final handover, AI Agentix automates the entire real estate sales cycle "" so your agents focus on closing, not chasing leads.
            </motion.p>
            <motion.div {...up(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book a Demo</a>
              <a href="/case-studies" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>View Case Studies</a>
            </motion.div>
          </div>

          {/* Property Pipeline Widget */}
          <motion.div {...up(0.3)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 13, color: 'rgba(248,246,242,0.5)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>LIVE SALES PIPELINE</div>
            {[
              { stage: 'New Inquiries', count: 47, color: '#60a5fa', bar: 90 },
              { stage: 'AI Qualified', count: 31, color: '#22c55e', bar: 65 },
              { stage: 'Visit Scheduled', count: 18, color: 'var(--or)', bar: 40 },
              { stage: 'Negotiation', count: 9, color: '#a78bfa', bar: 22 },
              { stage: 'Booked / Closed', count: 4, color: '#f59e0b', bar: 12 },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: 'rgba(248,246,242,0.7)' }}>{s.stage}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.count} leads</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.bar}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }} style={{ height: '100%', background: s.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(232,99,26,0.1)', borderRadius: 10, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'rgba(248,246,242,0.6)' }}>Today's Revenue (Booked)</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--or)', fontFamily: 'var(--font-number)' }}>₹4.2Cr</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Impact Across the Sales Funnel</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'More Qualified Leads', value: leads, ref: leadsRef, suffix: '%', sub: 'Higher lead quality score' },
              { label: 'Sales Conversion Lift', value: conversion, ref: conversionRef, suffix: '%', sub: 'Inquiry to booking rate' },
              { label: 'Fewer No-shows', value: noshow, ref: noshowRef, suffix: '%', sub: 'Site visit no-show reduction' },
              { label: 'Faster Documentation', value: doctime, ref: doctimeRef, suffix: '%', sub: 'Reduction in doc processing time' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 16, background: 'var(--ice)', border: '1px solid rgba(13,27,46,0.06)' }}>
                <div ref={s.ref} style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', lineHeight: 1 }}>{s.value}{s.suffix}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nvd)', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gr)', marginTop: 4 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES "" light ice */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Everything Your Real Estate Team Needs</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Six AI modules working together to automate your entire sales process.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEATURES.map((f) => (
                <motion.button key={f.id} {...up(f.id * 0.08)} onClick={() => setActiveFeature(f.id)}
                  style={{ textAlign: 'left', padding: '16px 20px', borderRadius: 10, border: activeFeature === f.id ? '2px solid var(--or)' : '2px solid transparent', background: activeFeature === f.id ? 'rgba(232,99,26,0.08)' : '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ fontWeight: 700, color: activeFeature === f.id ? 'var(--or)' : 'var(--nvd)', fontSize: '0.95rem' }}>{f.label}</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid rgba(13,27,46,0.08)', minHeight: 220 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--or)', marginBottom: 12, letterSpacing: 1 }}>FEATURE</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nvd)', marginBottom: 16 }}>{FEATURES[activeFeature].label}</h3>
                <p style={{ color: 'var(--gr)', lineHeight: 1.75 }}>{FEATURES[activeFeature].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SEGMENT "" cream */}
      <section style={{ background: 'var(--ow)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Built for Every Real Estate Segment</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { icon: '🏗️', title: 'Developers', desc: 'Project launch automation, bulk lead management, and buyer communication at scale.' },
              { icon: '🏠', title: 'Residential Brokers', desc: 'AI assistant for agents "" lead qualification, property matching, and follow-up automation.' },
              { icon: '🏢', title: 'Commercial RE', desc: 'Tenant acquisition, lease management automation, and investor communication workflows.' },
              { icon: '🏘️', title: 'Property Managers', desc: 'Maintenance request routing, tenant portals, and rent collection automation.' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: '28px 24px', borderRadius: 16, background: '#fff', border: '1px solid rgba(13,27,46,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--nvd)', marginBottom: 8, fontSize: '1rem' }}>{s.title}</h4>
                <p style={{ color: 'var(--gr)', fontSize: '0.88rem', lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE "" dark */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Automated Buyer Journey</h2>
          </motion.div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, background: 'rgba(232,99,26,0.3)' }} />
            {[
              { label: 'Inquiry Captured', desc: 'Lead arrives from portal, website, or social media "" AI captures and responds within 30 seconds' },
              { label: 'Smart Qualification', desc: 'AI scores lead based on budget, timeline, and property preference through conversational questions' },
              { label: 'Property Matching', desc: 'Personalized shortlist generated and shared with virtual tour links and availability' },
              { label: 'Visit Coordination', desc: 'Automated scheduling, reminders, and agent briefing before each site visit' },
              { label: 'Negotiation Support', desc: 'AI surfaces comparable pricing data, buyer history, and deal terms for agents' },
              { label: 'Closing & Documentation', desc: 'Document collection, processing, and registration workflow automation to final handover' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ display: 'flex', gap: 28, marginBottom: 32, paddingLeft: 16 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--or)', border: '3px solid var(--nvd)', flexShrink: 0, marginTop: 3, zIndex: 1, position: 'relative' }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ow)', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS "" deep dark */}
      <section style={{ background: '#060E1A', padding: '80px 24px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Real Estate Success Stories</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { company: 'Prestige Developers', result: '73% more qualified leads', detail: 'AI lead scoring eliminated 60% of unqualified inquiries, letting agents focus on serious buyers for a 400-unit launch.', stat: '73%' },
              { company: 'HomeFinder Agency', result: '41% conversion increase', detail: 'Automated follow-up sequences kept buyers engaged through a 90-day sales cycle, dramatically improving close rates.', stat: '+41%' },
              { company: 'Nexus Realty Group', result: '₹12M saved in sales costs', detail: 'AI reduced the sales team needed to handle 5x the lead volume, cutting cost per acquisition by 58%.', stat: '₹12M' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', marginBottom: 12 }}>{r.stat}</div>
                <div style={{ fontWeight: 700, color: 'var(--ow)', fontSize: '1.05rem', marginBottom: 10 }}>{r.result}</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.65 }}>{r.detail}</div>
                <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--or)', fontWeight: 600 }}>"" {r.company}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Frequently Asked Questions</h2>
          </motion.div>
          {FAQS.map((f, i) => (
            <motion.div key={i} {...up(i * 0.08)} style={{ background: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', border: '1px solid rgba(13,27,46,0.08)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 700, color: 'var(--nvd)', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.q}</span>
                <span style={{ color: 'var(--or)', fontWeight: 700, fontSize: 20, flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div style={{ padding: '0 24px 20px', color: 'var(--gr)', lineHeight: 1.75, fontSize: '0.92rem' }}>{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <motion.h2 {...up(0)} style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 16 }}>
            Close More Deals, <span style={{ color: 'var(--or)' }}>Faster</span>
          </motion.h2>
          <motion.p {...up(0.1)} style={{ color: 'rgba(248,246,242,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Join 500+ real estate developers and brokers using AI Agentix to automate their sales pipeline.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '16px 40px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Get Started Today</a>
            <a href="/contact" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '16px 40px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>Talk to Sales</a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </div>
  );
}

