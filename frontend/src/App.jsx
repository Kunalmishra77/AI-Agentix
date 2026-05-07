import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from './components/agentix/AgentixIcon.jsx';
import HeroSection from './components/agentix/HeroSection.jsx';
import CategoryEcosystem from './components/agentix/CategoryEcosystem.jsx';
import CategoryConstellation from './components/agentix/CategoryConstellation.jsx';
import WorkflowStrip from './components/agentix/WorkflowStrip.jsx';
import ToolTheatre from './components/agentix/ToolTheatre.jsx';
import HowItWorks from './components/agentix/HowItWorks.jsx';
import Solutions from './components/agentix/Solutions.jsx';
import UseCases from './components/agentix/UseCases.jsx';
import CommandCenter from './components/agentix/CommandCenter.jsx';
import ValueProof from './components/agentix/ValueProof.jsx';
import TrustLayer from './components/agentix/TrustLayer.jsx';
import VoiceCTA from './components/agentix/VoiceCTA.jsx';
import FAQ from './components/agentix/FAQ.jsx';
import FinalCTA from './components/agentix/FinalCTA.jsx';
import AGENTIX_DATA from './data/agentixData.js';
import AboutPage from './pages/site/AboutPage.jsx';
import PricingPage from './pages/site/PricingPage.jsx';
import ContactPage from './pages/site/ContactPage.jsx';
import DemoPage from './pages/site/DemoPage.jsx';
import TalkPage from './pages/site/TalkPage.jsx';
import FAQPage from './pages/site/FAQPage.jsx';
import SecurityPage from './pages/site/SecurityPage.jsx';
import StatusPage from './pages/site/StatusPage.jsx';
import ChangelogPage from './pages/site/ChangelogPage.jsx';
import './styles/ax-tokens.css';
import './styles/ax-hero.css';
import './styles/ax-ecosystem.css';
import './styles/ax-sections.css';
import './styles/ax-sections2.css';
import './styles/ax-shell.css';
import './styles/ax-pages.css';

const allTools = AGENTIX_DATA.categories.flatMap((category) =>
  category.subcategories.flatMap((subcategory) =>
    subcategory.tools.map((tool) => ({
      id: slugify(tool),
      name: tool,
      categoryId: category.id,
      categoryName: category.name,
      subcategoryName: subcategory.name,
      accent: category.accent,
      accentRgb: category.accentRgb,
      description: `${tool} helps ${category.short.toLowerCase()} teams move work from input to reviewed output inside Agentix.`,
    }))
  )
);

const pageCopy = {
  pricing: ['Pricing', 'Start with one workflow. Scale into an AI operating system.', ['Starter', 'Growth', 'Pro', 'Enterprise', 'Custom Build']],
  demo: ['Book a Demo', 'See Agentix translate your business goal into categories, tools, workflows, and human handoff rules.', ['Goal selector', 'Qualification form', 'Recommended demo path', 'Calendar handoff']],
  'talk-to-agentix': ['Talk to Agentix', 'Use the assistant as the primary product discovery and conversion interface.', ['Voice entry', 'Chat entry', 'Recommended tools', 'Stack builder']],
  about: ['About Agentix', 'Agentix exists to replace scattered manual work with one connected operating layer.', ['Mission', 'Product philosophy', 'Who it serves', 'Platform principles']],
  contact: ['Contact', 'Route sales, support, demo, partnership, and implementation questions to the right human path.', ['Sales route', 'Support route', 'Partnership route', 'Implementation route']],
  security: ['Security', 'Trust, RAG alignment, access control, integration permissions, and handoff rules are core to Agentix.', ['Data handling', 'Access controls', 'RAG policy', 'Compliance roadmap']],
  status: ['Status', 'Current system status and incident communication for the Agentix public platform.', ['Assistant', 'Workflow engine', 'Integrations', 'Docs']],
  changelog: ['Changelog', 'Product releases, tool updates, workflow improvements, and documentation changes.', ['Assistant routes', 'New tools', 'Workflow templates', 'Security updates']],
  privacy: ['Privacy', 'How Agentix handles contact data, workflow data, assistant conversations, and user rights.', ['Key points', 'Data rights', 'Contact privacy', 'Last updated']],
  terms: ['Terms', 'Commercial and acceptable-use terms for Agentix tools, workflows, assistant features, and integrations.', ['Key terms', 'Acceptable use', 'Admin contact', 'Last updated']],
  'cookie-preferences': ['Cookie Preferences', 'Manage preference, analytics, and product improvement cookies.', ['Necessary', 'Analytics', 'Preferences', 'Product improvement']],
  accessibility: ['Accessibility Statement', 'Agentix aims to support keyboard navigation, contrast, reduced motion, and readable layouts.', ['Commitment', 'Supported features', 'Known limits', 'Contact']],
  faq: ['FAQ', 'Answers about Agentix, tools, workflows, integrations, security, pricing, and human handoff.', ['Platform', 'Tools', 'Workflows', 'Security']],
  500: ['500', 'Something failed while loading this route. Retry, check status, or contact support.', ['Retry', 'Status', 'Support', 'Search']],
  404: ['Page not found', 'This page does not exist or has moved. Use the links below to find what you need.', ['Browse tools', 'View categories', 'Search', 'Contact']],
};

const integrations = [
  'CRM', 'Email', 'Calendar', 'Messaging', 'Support', 'Docs Storage', 'Spreadsheets', 'CMS', 'Analytics', 'Payments', 'Databases', 'APIs Webhooks',
].map((name) => ({
  id: slugify(name),
  name,
  text: `Connect Agentix workflows with ${name.toLowerCase()} systems so data moves cleanly between tools, AI agents, and human review.`,
  bullets: ['Supported apps', 'Common workflows', 'Setup requirements', 'Permissions and security'],
}));

const docs = [
  'Getting Started', 'Tools', 'Workflows', 'Assistant', 'Integrations', 'RAG Knowledge Base', 'API Webhooks', 'Security', 'Admin Billing',
].map((name) => ({
  id: slugify(name),
  name,
  text: `Documentation for ${name.toLowerCase()} inside the Agentix operating system.`,
  bullets: ['Overview', 'Recommended path', 'Popular guides', 'Related collections'],
}));

const helpTopics = [
  'Account', 'Billing', 'Tools', 'Workflows', 'Integrations', 'Assistant', 'Security', 'Troubleshooting', 'Contact Support',
].map((name) => ({
  id: slugify(name),
  name,
  text: `Help articles and troubleshooting paths for ${name.toLowerCase()} questions.`,
  bullets: ['Common questions', 'Troubleshooting path', 'Related topics', 'Contact support'],
}));

function catIconPath(categoryId) {
  const map = {
    content: 'content-and-creative-production',
    marketing: 'marketing-and-growth',
    sales: 'sales-and-revenue',
    cx: 'customer-experience-and-support',
    research: 'market-research-and-strategy',
    ops: 'operations-and-workflow-automation',
    systems: 'business-systems-and-knowledge',
    product: 'product-project-and-delivery',
    finance: 'finance-admin-and-compliance',
  };
  return `/agentix-generated-media/icons/categories/${map[categoryId] ?? categoryId}.svg`;
}

const TOOL_ICON_MAP = {
  'AI Content Generator':'ai-content-generator','Blog & SEO Article Writer':'blog-and-seo-article-writer',
  'Script & Storyboard Writer':'script-and-storyboard-writer','Product & Sales Copy Builder':'product-and-sales-copy-builder',
  'AI Product Photography':'ai-product-photography-and-scene-builder','Image Enhancement Studio':'image-enhancement-and-cleanup-studio',
  'Brand Asset Generator':'brand-asset-generator','AI Voiceover Studio':'ai-voiceover-and-narration-studio',
  'Voice Cloning':'voice-cloning-and-brand-voice-tool','Avatar Presenter Studio':'avatar-presenter-studio',
  'AI Video Generator':'ai-video-generator','Video Clipper':'video-clipper-and-repurposing-tool',
  'Subtitle & Localization':'subtitle-caption-and-localization-studio','Social Media Scheduler':'social-media-content-workflow-and-scheduler',
  'Content Repurposing':'content-repurposing-workflow','Brand Compliance':'content-approval-and-brand-compliance-tool',
  'Campaign Strategy Builder':'campaign-strategy-builder','GTM Launch Planner':'go-to-market-launch-planner',
  'Marketing Calendar':'marketing-calendar-and-execution-planner','Landing Page Optimizer':'landing-page-optimizer',
  'Funnel Audit':'funnel-audit-and-fix-tool','Lead Capture Optimizer':'form-and-lead-capture-optimizer',
  'SEO Topic Cluster Builder':'seo-strategy-and-topic-cluster-builder','Content Brief Tool':'content-brief-and-optimization-tool',
  'Competitive SEO Intelligence':'competitive-seo-intelligence-tool','Ad Creative Generator':'ad-creative-and-copy-generator',
  'Paid Campaign Planner':'paid-campaign-planner','Ad Performance Insight':'ad-performance-insight-tool',
  'Growth Analytics Assistant':'growth-analytics-assistant','Experiment Roadmap':'experiment-roadmap-generator',
  'Attribution Explainer':'attribution-and-roi-explainer','Lead Discovery':'lead-discovery-and-list-builder',
  'Lead Enrichment & Scoring':'lead-enrichment-and-scoring-tool','Account Research':'account-research-assistant',
  'Multichannel Sequence Builder':'multichannel-outreach-sequence-builder','Cold Email Personalization':'cold-email-personalization-tool',
  'Follow-Up Automation':'follow-up-automation-assistant','AI Sales Chat':'ai-sales-chat-agent',
  'AI Sales Voice':'ai-sales-voice-agent','Meeting Booking Assistant':'meeting-booking-and-qualification-assistant',
  'CRM Sync & Hygiene':'crm-sync-and-data-hygiene-tool','Deal Assistant':'deal-assistant',
  'Proposal & Quote Generator':'proposal-and-quote-generator','Pipeline Forecasting':'pipeline-forecasting-assistant',
  'Sales Process Audit':'sales-process-audit-tool','Sales Enablement Content':'sales-enablement-content-assistant',
  'AI Support Chat':'ai-support-chat-agent','Ticket Triage & Routing':'ticket-triage-and-routing-tool',
  'Support Response Assistant':'support-response-assistant','Onboarding Journey Builder':'onboarding-journey-builder',
  'Customer Training Generator':'customer-training-content-generator','Product Walkthrough':'product-walkthrough-assistant',
  'Churn Risk Assistant':'customer-health-and-churn-risk-assistant','Voice of Customer':'feedback-analysis-and-voice-of-customer-tool',
  'Renewal & Expansion':'renewal-and-expansion-assistant','Testimonial Builder':'testimonial-and-case-study-builder',
  'Review Response':'review-and-reputation-response-assistant','Community Engagement':'community-engagement-assistant',
  'Competitor Analyzer':'competitor-analyzer','Battlecard Builder':'competitive-battlecard-builder',
  'Market Movement Monitor':'market-movement-monitor','Persona Builder':'audience-persona-builder',
  'Interview Synthesizer':'customer-interview-synthesizer','Review Insight Miner':'review-and-community-insight-miner',
  'Pricing Intelligence':'pricing-intelligence-tool','Offer Research':'offer-research-and-positioning-tool',
  'Plan Builder':'packaging-and-plan-builder','Trend Finder':'trend-finder',
  'Market Gap Finder':'market-gap-finder','Product Benchmarking':'product-benchmarking-tool',
  'Research Report Generator':'market-research-report-generator','Positioning Assistant':'positioning-assistant',
  'Decision Brief Builder':'strategic-decision-brief-builder','Workflow Orchestrator':'workflow-orchestrator',
  'Automation Blueprint':'automation-blueprint-builder','Process Mapping':'process-mapping-assistant',
  'Approval Engine':'approval-engine','Task Routing':'task-routing-and-assignment-tool',
  'Internal Follow-Up':'internal-follow-up-assistant','Document Extraction':'document-intake-and-extraction-tool',
  'Form-to-Workflow':'form-to-workflow-builder','Data Cleanup':'data-cleanup-and-standardization-tool',
  'Operations Dashboard':'operations-dashboard-generator','Weekly Business Summary':'weekly-business-summary-assistant',
  'SLA & Escalation':'sla-and-escalation-monitor','Internal Knowledge Assistant':'internal-knowledge-assistant',
  'Knowledge Base Builder':'knowledge-base-builder','Policy & SOP Generator':'policy-and-sop-generator',
  'Lightweight CRM':'lightweight-crm-system','Modular ERP':'modular-erp-workspace',
  'LMS & Training':'lms-and-training-system','Integration Layer':'integration-layer',
  'API & Webhook Workflows':'api-and-webhook-workflow-tool','Data Sync Monitor':'data-sync-monitor',
  'AI Website Builder':'ai-website-and-landing-page-builder','Client Portal Builder':'client-portal-builder',
  'Embedded AI Widget':'embedded-ai-widget-builder','PRD Generator':'product-requirements-generator',
  'Roadmap Prioritization':'roadmap-prioritization-assistant','Feature Spec Writer':'feature-validation-planner',
  'Project Plan Builder':'project-plan-and-task-breakdown-tool','Sprint Planner':'sprint-planning-assistant',
  'Status Report Assistant':'project-risk-and-status-reporter','Client Onboarding':'client-onboarding-workflow',
  'Brief & Scope Builder':'scope-and-change-request-assistant','Deliverable Review':'qa-scenario-generator',
  'Release Notes Generator':'release-notes-and-changelog-generator','Launch Checklist':'go-to-market-launch-planner',
  'Beta Feedback':'feedback-analysis-and-voice-of-customer-tool','Invoice Processing':'invoice-processing-and-reconciliation-tool',
  'Expense Categorizer':'expense-review-assistant','Receipt Capture':'cash-flow-and-revenue-summary-assistant',
  'Contract Review':'contract-review-and-risk-summary-tool','Risk Summary':'risk-register-assistant',
  'Clause Library':'contract-drafting-assistant','Compliance Checklist':'compliance-checklist-builder',
  'Policy Review':'policy-generator-and-review-assistant','Audit Prep':'risk-register-assistant',
  'Employee On/Off-boarding':'employee-onboarding-and-offboarding-assistant','Meeting Notes & Actions':'meeting-notes-and-action-assistant',
  'Vendor Management':'internal-request-desk',
};

function toolIconPath(toolName) {
  const slug = TOOL_ICON_MAP[toolName] ?? toolName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `/agentix-generated-media/icons/tools/${slug}.svg`;
}

function slugify(value) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function unslug(value) {
  return value.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function findCategory(id) {
  return AGENTIX_DATA.categories.find((category) => category.id === id || slugify(category.name) === id);
}

function findTool(id) {
  return allTools.find((tool) => tool.id === id || tool.categoryId === id);
}

function useScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
}

function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`scroll-top-btn${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M8 4L4 8M8 4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function Layout({ children }) {
  useScrollToTop();
  useEffect(() => {
    document.body.dataset.theme = 'dark';
    document.body.dataset.density = 'spacious';
  }, []);
  return (
    <>
      <div className="app-bg" />
      <GlobalNav />
      <main>{children}</main>
      <AssistantDock />
      <ScrollTopBtn />
      <GlobalFooter />
    </>
  );
}

function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);
  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container-wide nav-inner">
          <Link to="/" className="nav-logo">
            <img src="/assets/clients/logo.png" alt="Agentix" />
          </Link>
          <nav className="nav-links">
            <button
              className="nav-link"
              onMouseEnter={() => setMegaOpen(true)}
              onClick={() => setMegaOpen((o) => !o)}
            >
              Categories <AgentixIcon name="chevdown" size={10} />
            </button>
            <Link className="nav-link" to="/solutions">Solutions</Link>
            <Link className="nav-link" to="/tools">Tools</Link>
            <Link className="nav-link" to="/use-cases">Use cases</Link>
            <Link className="nav-link" to="/pricing">Pricing</Link>
            <Link className="nav-link" to="/about">About</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
          </nav>
          <div className="nav-actions">
            <Link className="nav-link" to="/search"><AgentixIcon name="search" size={14} />Search</Link>
            <Link className="btn btn-secondary nav-btn talk-btn" to="/talk-to-agentix"><AgentixIcon name="mic" size={12} />Talk</Link>
            <Link className="btn btn-primary nav-btn demo-btn" to="/demo">Book Demo</Link>
            <button className="nav-link mobile-menu-btn" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu"><AgentixIcon name="menu" size={18} /></button>
          </div>
        </div>
      </header>
      {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
}

function MegaMenu({ onClose }) {
  const [hover, setHover] = useState(AGENTIX_DATA.categories[0].id);
  const cur = findCategory(hover);
  return (
    <div className="mega-overlay" onMouseLeave={onClose} onClick={onClose}>
      <div className="mega mega-dropdown" onClick={(event) => event.stopPropagation()} onMouseEnter={() => {}}>
        <div className="mega-head">
          <span className="eyebrow">All categories / {AGENTIX_DATA.categories.length}</span>
          <button className="mega-close" onClick={onClose}><AgentixIcon name="close" size={14} /></button>
        </div>
        <div className="mega-body">
          <div className="mega-list">
            {AGENTIX_DATA.categories.map((category) => (
              <button key={category.id} className={`mega-item ${hover === category.id ? 'active' : ''}`} onMouseEnter={() => setHover(category.id)} style={{ '--accent-cat': category.accent }}>
                <span className="cat-rail-dot" style={{ background: category.accent }} />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 14, color: 'var(--ink-0)', fontWeight: 600 }}>{category.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{category.subcategories.length} workflows / {category.subcategories.reduce((sum, sub) => sum + sub.tools.length, 0)} tools</div>
                </div>
                <AgentixIcon name="arrow" size={11} color="var(--ink-3)" />
              </button>
            ))}
          </div>
          <div className="mega-detail" style={{ '--accent-cat': cur.accent, '--accent-cat-rgb': cur.accentRgb }}>
            <div className="eyebrow">{cur.short}</div>
            <h3 className="h-2" style={{ margin: '12px 0 24px' }}>{cur.name}</h3>
            <div className="mega-subs">
              {cur.subcategories.map((subcategory) => (
                <Link key={subcategory.name} to={`/category/${cur.id}/${slugify(subcategory.name)}`} className="mega-sub card" style={{ padding: 16, textDecoration: 'none' }}>
                  <div className="mega-sub-name" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-0)' }}>{subcategory.name}</div>
                  <div className="mega-sub-tools" style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {subcategory.tools.slice(0, 3).map((tool) => <span key={tool} className="chip" style={{ fontSize: 10 }}>{tool}</span>)}
                  </div>
                </Link>
              ))}
            </div>
            <Link to={`/category/${cur.id}`} className="btn btn-primary" style={{ marginTop: 32 }}>View {cur.short} Domain</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ onClose }) {
  const navLinks = [
    ['Tools', '/tools'], ['Solutions', '/solutions'], ['Use cases', '/use-cases'],
    ['Pricing', '/pricing'], ['About', '/about'], ['Blog', '/docs'],
    ['Docs', '/docs'], ['Help', '/help'], ['Security', '/security'], ['Contact', '/contact'],
  ];
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
        <div className="mega-head" style={{ padding: '14px 20px', flexShrink: 0 }}>
          <span className="nav-logo" style={{ filter: 'invert(1) hue-rotate(180deg)' }}>
            <img src="/assets/clients/logo.png" alt="Agentix" style={{ height: 36, width: 'auto' }} />
          </span>
          <button className="mega-close" onClick={onClose}><AgentixIcon name="close" size={14} /></button>
        </div>
        <div style={{ padding: '20px 20px 32px', overflowY: 'auto', flex: 1 }}>
          <Link className="btn btn-primary" to="/talk-to-agentix" style={{ width: '100%', justifyContent: 'center' }}>
            <AgentixIcon name="mic" size={13} />Talk to Agentix
          </Link>
          <Link className="btn btn-secondary" to="/demo" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
            Book a Demo
          </Link>
          <div className="mobile-menu-section-label">Categories</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {AGENTIX_DATA.categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="mobile-menu-cat-row">
                <span className="mobile-menu-cat-dot" style={{ background: cat.accent }} />
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: 'var(--ink-0)' }}>{cat.name}</span>
                <AgentixIcon name="arrow" size={11} color="var(--ink-3)" />
              </Link>
            ))}
          </div>
          <div className="mobile-menu-section-label" style={{ marginTop: 20 }}>Platform</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {navLinks.map(([label, href]) => <Link key={href} className="dock-chip" to={href}>{label}</Link>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantDock() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {!open && (
        <button className="dock-fab" onClick={() => setOpen(true)} aria-label="Open assistant">
          <span className="dock-fab-orb" />
          <span className="dock-fab-label">Ask Agentix</span>
          <span className="chip mono" style={{ fontSize: 10, marginLeft: 4 }}>AI</span>
        </button>
      )}
      {open && (
        <div className="dock-panel" role="dialog" aria-label="Agentix assistant">
          <div className="dock-head">
            <span className="dot dot-accent" />
            <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>Agentix Assistant</span>
            <button className="dock-close" onClick={() => setOpen(false)}><AgentixIcon name="close" size={12} /></button>
          </div>
          <div className="dock-body">
            <div className="dock-msg">Hi. I can help you find a tool, build a workflow, or choose a demo route. What's your goal today?</div>
            <div className="dock-suggest">
              {[
                ['Find a sales tool', '/category/sales'],
                ['Build a content stack', '/solutions/content-studio'],
                ['Compare plans', '/pricing'],
                ['Talk to a human', '/contact'],
              ].map(([label, href]) => <Link key={href} className="dock-chip" to={href}>{label}</Link>)}
            </div>
          </div>
          <form className="dock-input" onSubmit={(e) => {
            e.preventDefault();
            const q = e.currentTarget.search.value.trim();
            if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
          }}>
            <AgentixIcon name="mic" size={16} color="var(--accent)" />
            <input name="search" placeholder="Ask anything..." autoComplete="off" />
            <button type="submit" className="dock-send"><AgentixIcon name="arrow" size={11} color="#02141A" /></button>
          </form>
        </div>
      )}
    </>
  );
}

function GlobalFooter() {
  const cats = AGENTIX_DATA.categories;
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-top">
          <div>
            <Link to="/" className="nav-logo">
              <img src="/assets/clients/logo.png" alt="Agentix" style={{ height: 44, width: 'auto', display: 'block', filter: 'invert(1) hue-rotate(180deg)' }} />
            </Link>
            <p style={{ maxWidth: 320, marginTop: 20, color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6 }}>
              The AI operating system for ambitious teams. Replace the stack. Run the business.
            </p>
          </div>
          <div className="footer-cols">
            <FooterCol title="Categories" links={cats.slice(0, 5).map((category) => [category.name, `/category/${category.id}`, category.accent])} />
            <FooterCol title="More" links={cats.slice(5).map((category) => [category.name, `/category/${category.id}`, category.accent])} />
            <FooterCol title="Platform" links={[['Tools', '/tools'], ['Solutions', '/solutions'], ['Use cases', '/use-cases'], ['Pricing', '/pricing'], ['Demo', '/demo']]} />
            <FooterCol title="Resources" links={[['Docs', '/docs'], ['Help', '/help'], ['FAQ', '/faq'], ['Security', '/security'], ['Changelog', '/changelog'], ['Contact', '/contact']]} />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>© 2026 Agentix.ai / All rights reserved</div>
          <div className="footer-meta">
            <Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/cookie-preferences">Cookies</Link><Link to="/status">Status <span className="dot" style={{ background: 'var(--ok)' }} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="footer-col">
      <div className="footer-col-h">{title}</div>
      {links.map(([label, href, color]) => (
        <Link key={href} className="footer-link" to={href}>
          {color && <span className="dot" style={{ background: color, width: 6, height: 6 }} />}
          {label}
        </Link>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Helmet><title>Agentix.ai / The AI Operating System for Modern Business</title></Helmet>
      <HeroSection />
      <CategoryEcosystem />
      <CategoryConstellation />
      <WorkflowStrip />
      <ToolTheatre />
      <HowItWorks />
      <Solutions />
      <UseCases />
      <CommandCenter />
      <ValueProof />
      <TrustLayer />
      <VoiceCTA />
      <FAQ />
      <FinalCTA />
    </>
  );
}

function PageHero({ eyebrow, title, text, accent = 'var(--accent)', children }) {
  return (
    <section className="hero page-hero">
      <div className="hero-bg-glow" />
      <div className="container-wide">
        <div className="chip" style={{ borderColor: accent, color: accent }}><span className="chip-dot" style={{ background: accent }} />{eyebrow}</div>
        <h1 className="h-display" style={{ margin: '22px 0 24px', maxWidth: 960 }}>{title}</h1>
        <p className="body-lg" style={{ maxWidth: 720, lineHeight: 1.6 }}>{text}</p>
        {children}
      </div>
    </section>
  );
}

function SectionHead({ eyebrow: label, title, text, center = false }) {
  return (
    <div className={center ? 'sec-head sec-head-center' : 'sec-head'}>
      <span className="eyebrow">{label}</span>
      <h2 className="h-1" style={{ maxWidth: 880, margin: center ? '16px auto 0' : '16px 0 0' }}>{title}</h2>
      {text && <p className="body-lg" style={{ maxWidth: 680, margin: center ? '20px auto 0' : '20px 0 0', lineHeight: 1.6 }}>{text}</p>}
    </div>
  );
}

const CAT_ROLES = {
  content: [['Creative Directors','Manage brand output across formats with AI-generated drafts and built-in compliance gates.'],['Copywriters','Scale creative output without sacrificing voice — AI writes first, you approve and ship.'],['Brand Managers','Enforce guidelines automatically. Every output passes your brand rules before publishing.'],['Agencies','Run client content production at scale with trackable, repeatable AI workflows.']],
  marketing: [['Growth Leads','Run demand gen and pipeline operations from one connected campaign layer.'],['Campaign Managers','Plan, execute, and analyze campaigns without switching between tools.'],['SEO Specialists','Build content clusters, track rankings, and brief writers — all from one system.'],['Performance Marketers','Optimize ads, landing pages, and funnels with AI-powered recommendations.']],
  sales: [['Sales Leaders','Forecast accurately, enforce process, and see exactly where pipeline stalls.'],['Account Executives','Spend time selling — not on CRM updates, research, and manual follow-up.'],['SDRs / BDRs','Personalize outreach at scale with enriched data and AI-generated sequences.'],['RevOps','Automate pipeline hygiene, routing, and reporting across the full funnel.']],
  cx: [['Support Leads','Manage ticket volume, quality, and SLAs — AI handles first response, humans handle escalations.'],['Customer Success','Spot churn risk early and automate renewals, QBRs, and health scoring.'],['Onboarding Teams','Build repeatable onboarding journeys with AI-generated guides and automated check-ins.'],['Community Managers','Scale engagement, reviews, and testimonials with AI-powered response workflows.']],
  research: [['Strategy Leads','Turn competitor signals and market data into positioning briefs in hours.'],['Research Analysts','Synthesize interviews, reviews, and signals into structured reports automatically.'],['Product Marketers','Build battlecards, persona docs, and pricing strategy from live data.'],['Founders','Get the market intelligence you need without a full research team.']],
  ops: [['Operations Leads','Formalize tribal knowledge into documented, automated workflows with clear owners.'],['Process Managers','Map every workflow, assign owners, and track completion from one layer.'],['Executives','Get weekly visibility into operations — approvals, blockers, and performance trends.'],['Finance & Admin','Automate document processing, approvals, and compliance workflows end to end.']],
  systems: [['IT Leads','Build and maintain a connected AI infrastructure without custom engineering.'],['Knowledge Managers','Centralise documentation, SOPs, and institutional knowledge into searchable AI.'],['System Admins','Manage access controls, integrations, and CRM/ERP data from one governed layer.'],['Developers','Extend Agentix with APIs, webhooks, and embedded widgets — no rebuild required.']],
  product: [['Product Managers','Write PRDs, plan sprints, and ship features with AI-generated specs and checklists.'],['Project Leads','Track delivery, manage blockers, and generate status reports automatically.'],['Client-Facing Teams','Onboard clients, manage scope, and review deliverables from one project layer.'],['Engineering Leads','Generate release notes, QA scenarios, and launch checklists with zero manual writing.']],
  finance: [['Finance Leads','Automate invoice processing, reconciliation, and month-end close workflows.'],['Legal / Compliance','Review contracts, build compliance checklists, and prepare for audits systematically.'],['HR Managers','Automate onboarding, offboarding, policy updates, and vendor management tasks.'],['Founders / Admins','Replace manual finance and admin tasks with governed, trackable AI workflows.']],
};

const CAT_FAQS = {
  content: [['How does Agentix handle brand voice?','You upload brand guidelines, tone examples, and approved content as knowledge sources. The AI generates drafts matching your defined voice — and every output passes a brand compliance check.'],['Can I review content before it publishes?','Yes. Every workflow includes mandatory human review checkpoints. Nothing moves forward or publishes without your sign-off.'],['Does it work for multiple content formats?','Yes — blog, social, scripts, video, audio, and ads all live in one operating layer. Each format has its own tool with shared brand context.'],['How does content repurposing work?','Upload any approved piece. Agentix generates format-specific variants using your brand voice and original context — captions, email copy, video script.']],
  marketing: [['Can Agentix run my entire campaign?','Agentix handles strategy, brief creation, ad copy, landing pages, and performance analysis. You own the channel spend and final approval — Agentix handles everything else.'],['How does it connect to my ad platforms?','Through integrations with Google, Meta, and LinkedIn. Agentix reads performance data, generates copy variants, and routes approvals — you control deployment.'],['Does it work for early-stage teams?','Yes. Growth starts on Starter with a single workflow. As you add channels, you scale tools — not headcount.'],['How does SEO content connect to campaigns?','Your SEO topic cluster and campaign calendar share the same knowledge base. SEO content can be repurposed as campaign assets automatically.']],
  sales: [['How does Agentix score leads?','Lead scoring uses firmographic data, intent signals, and ICP criteria you define. Scores update automatically as data enriches across the workflow.'],['Does it replace my CRM?','No — it connects to your existing CRM and keeps it clean. Agentix writes notes, updates fields, and routes follow-ups automatically.'],['How does AI outreach personalization work?','Each sequence is generated using account research, persona context, and your approved tone. Every message is unique — no mail-merge placeholders.'],['What triggers human review in the sales workflow?','Large deals, enterprise accounts, legal-adjacent questions, and sensitive pricing discussions route to a human with full conversation context attached.']],
  cx: [['How does AI handle support without wrong answers?','Agentix grounds all responses in your approved knowledge base. Questions outside your defined context escalate to a human — never fabricated answers.'],['What does human handoff look like in support?','When AI confidence drops below threshold, the ticket routes to a human with full conversation history, account context, and recommended next action.'],['Can customers tell they are talking to AI?','You control the framing. Most teams use AI for instant first response with clear escalation paths. Both transparent and human-first setups are supported.'],['Does it integrate with Zendesk or Intercom?','Yes. Agentix enriches your existing helpdesk — not replaces it. Tickets flow in, are triaged by AI, and routed back as structured responses.']],
  research: [['How often is competitor data refreshed?','The Monitor tool checks competitor signals on your defined schedule — weekly by default, daily on Pro and Enterprise. You receive a structured change digest each run.'],['Can I use my own interview data as input?','Yes. Upload call recordings, transcripts, or survey responses. Agentix synthesizes themes, quotes, and recommendations into structured research output.'],['How does pricing intelligence work?','The tool tracks public pricing pages, packaging changes, and customer reviews from competitors. It flags changes and recommends response options.'],['Is research output ready for stakeholders?','Yes. Every report is generated in a structured format — executive summary, findings, evidence, and recommended next steps included.']],
  ops: [['How do we migrate existing workflows into Agentix?','The Automation Blueprint tool maps your current processes, identifies manual steps, and generates a recommended workflow structure. Migration support is included on Pro.'],['What happens when a workflow gets blocked?','Agentix detects stalled steps, escalates to the assigned owner, and logs the blocker. You get visibility without chasing people in Slack.'],['Can we set up approval gates?','Yes. The Approval Engine lets you define who approves what, at which stage, and with what SLA. Unapproved items escalate automatically.'],['How does Agentix handle document processing?','The Document Extraction tool ingests PDFs and forms, extracts structured data, and routes it into the right workflow — no manual data entry required.']],
  systems: [['What does the RAG knowledge base support?','It supports PDFs, Word docs, Markdown files, URLs, and Notion pages. Content is chunked, embedded, and cited in AI responses with source attribution.'],['How does access control work?','You define roles (admin, editor, viewer) at the workspace, category, and tool level. SSO is available on Enterprise. All access is logged.'],['Can we build on top of Agentix with APIs?','Yes. The API & Webhook Workflows tool lets you trigger Agentix workflows from external systems, receive output via webhooks, and embed AI widgets in your own interfaces.'],['What systems does Agentix integrate with natively?','CRM, Email, Docs, Support, Analytics, and 40+ more. Custom integrations are available on Enterprise.']],
  product: [['How does Agentix help with product planning?','The PRD Generator turns feature requests into structured requirements. The Roadmap tool prioritizes by impact and effort. All decisions are logged with rationale.'],['Can it manage client projects?','Yes. Client Onboarding and Brief & Scope Builder handle the full project lifecycle with client-facing summaries generated automatically.'],['How does it integrate with existing project tools?','Agentix connects to Jira, Linear, Asana, and Notion. Tasks sync to your tool of choice — no need to change how your team works.'],['What gets automated in product delivery?','Sprint planning, status reports, release notes, QA checklists, and launch coordination are all automated. Your team focuses on building.']],
  finance: [['How does Agentix handle sensitive financial data?','All data is encrypted at rest and in transit. Finance workflows run with role-based access and full audit logs for compliance review.'],['Can it process invoices automatically?','Yes. Invoice Processing extracts line items, matches them to POs, flags discrepancies, and routes approvals — no manual data entry.'],['Does it replace our accounting software?','No — it connects to QuickBooks, Xero, and similar platforms. Agentix automates the upstream process: capture, categorization, approval, and sync.'],['How does contract review work?','Upload any contract. Agentix extracts key terms, flags risk clauses, generates a risk summary, and routes for legal review with highlighted sections pre-marked.']],
};

const stepDescMap = {
  'Inputs required': 'Data, context, and constraints the AI needs before generation begins.',
  'Outputs produced': 'Reviewed, formatted output ready for the next stage or human handoff.',
  'Constraints': 'Brand rules, tone guardrails, and approval gates applied throughout.',
  'Review path': 'Human or automated check before output moves downstream.',
  'Owner': 'The person or role accountable for this stage in the workflow.',
  'Reviewer': 'Who approves or rejects output before it progresses.',
  'Status': 'Live state of the workflow — running, queued, blocked, or complete.',
  'Next action': 'The routed next step after this stage resolves.',
  'Talk to Agentix': 'Use the AI assistant to build your stack, define goals, and get recommendations.',
  'Book Demo': 'See Agentix run a live workflow mapped to your business context.',
  'Search': 'Explore 120+ tools, categories, and workflows across every domain.',
  'Contact': 'Route your question to the right human — sales, support, or implementation.',
  'Tools': 'Browse the full tool catalogue across 9 categories and 40+ subcategories.',
  'Categories': 'Explore every business domain with subcategory and tool depth.',
  'Solutions': 'Pre-built stacks mapped to business outcomes — deploy in hours.',
  'Resources': 'Docs, help topics, integrations, and workflow guides for builders.',
  'Find tools': 'Search 120+ AI tools across every business category.',
  'Build stack': 'Get a recommended stack for your business type and goal.',
  'Read docs': 'Access builder documentation and workflow guides.',
  'Book demo': 'See Agentix run a workflow matched to your context.',
};

function stepDesc(item) {
  if (stepDescMap[item]) return stepDescMap[item];
  if (item.includes('Generator') || item.includes('Builder')) return `AI-powered ${item.toLowerCase()} — from goal to reviewed output in one workflow.`;
  if (item.includes('Assistant')) return `${item} routes your intent and surfaces the right next action automatically.`;
  if (item.includes('Dashboard') || item.includes('Analytics')) return `Live visibility into performance, status, and pipeline impact across your stack.`;
  if (item.includes('Sync') || item.includes('Integration')) return `Connect ${item.toLowerCase().replace('sync', '').trim()} to Agentix so data flows without manual transfer.`;
  return `${item} runs inside Agentix — connected to your stack and routed for review.`;
}

function StepCards({ items, accent = 'var(--accent)' }) {
  return (
    <div className="page-card-grid">
      {items.map((item, index) => (
        <div key={item} className="solution-card card" style={{ '--accent-cat': accent }}>
          <div className="solution-head">
            <span className="solution-dot" style={{ background: accent }} />
            <span className="solution-cat mono">0{index + 1}</span>
          </div>
          <h3 className="solution-name" style={{ fontSize: 18, marginTop: 12 }}>{item}</h3>
          <p className="solution-outcome" style={{ marginTop: 8 }}>{stepDesc(item)}</p>
        </div>
      ))}
    </div>
  );
}

function WorkflowBand({ title = 'From goal to reviewed output.', accent = 'var(--accent)' }) {
  return (
    <section className="section page-band">
      <div className="container-wide">
        <SectionHead eyebrow="Workflow sequence" title={title} text="Every route has a clear path from goal to reviewed output — with AI generation, human checks, and iteration built in." center />
        <div className="workflow-strip card" style={{ '--accent-cat': accent, marginTop: 48 }}>
          <div className="workflow-steps">
            {[
              ['Goal', 'Define the business outcome this workflow is targeting.'],
              ['Inputs', 'Gather the data, context, and constraints the AI needs.'],
              ['Generate', 'AI produces first-pass output — copy, analysis, or plan.'],
              ['Review', 'Human or automated check before output moves forward.'],
              ['Handoff', 'Pass to the next person or system with full context.'],
              ['Measure', 'Track outcomes against the goal set at the start.'],
            ].map(([step, desc], index) => (
              <div key={step} className={`workflow-step ${index < 4 ? 'active' : ''}`}>
                <span className="workflow-dot" />
                <span className="workflow-num mono">0{index + 1}</span>
                <span className="workflow-title">{step}</span>
                <span className="workflow-desc">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AssistantPanelSection({ title = 'Assistant-guided next step.', text = 'The assistant routes intent to the right category, tool, docs page, support path, or human handoff.' }) {
  return (
    <section className="section">
      <div className="container-wide page-split">
        <div>
          <span className="eyebrow">Assistant layer</span>
          <h2 className="h-1" style={{ marginTop: 12 }}>{title}</h2>
          <p className="body-lg" style={{ marginTop: 20 }}>{text}</p>
          <div className="hero-ctas" style={{ marginTop: 32 }}>
            <Link to="/talk-to-agentix" className="btn btn-primary"><AgentixIcon name="mic" size={14} />Talk to Agentix</Link>
            <Link to="/contact" className="btn btn-secondary">Human handoff</Link>
          </div>
        </div>
        <div className="dock-panel-static card" style={{ padding: 0 }}>
          <div className="dock-head"><span className="dot dot-accent" /><span>Agentix Assistant</span></div>
          <div className="dock-body">
            <div className="dock-msg">{text}</div>
            <div className="dock-suggest">
              {['Find tools', 'Build stack', 'Read docs', 'Book demo'].map((chip) => <Link key={chip} to="/search" className="dock-chip">{chip}</Link>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEFAULT_FAQS = [
  ['What does this page help me decide?', 'It shows you the exact tools, workflow path, and recommended stack for this context — so you can choose and move, not just browse.'],
  ['How does Agentix route the workflow?', 'Agentix maps your goal to the right tools, sequences the stages, and assigns human review points where judgment is required.'],
  ['When does human handoff happen?', 'Handoff triggers when AI confidence is low, a decision needs sign-off, or output is ready for the next person in your process.'],
  ['What should I open next?', 'Use the Talk to Agentix assistant to build your stack, or book a demo to see the workflow run live against your business context.'],
];

function FAQSection({ title = 'Questions answered.', accent = 'var(--accent)', faqs }) {
  const items = faqs ?? DEFAULT_FAQS;
  return (
    <section className="section page-band">
      <div className="container-wide faq-grid">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="h-1" style={{ marginTop: 12 }}>{title}</h2>
        </div>
        <div className="faq-right">
          {items.map(([question, answer]) => (
            <div key={question} className="faq-item open" style={{ '--accent-cat': accent, borderBottom: '1px solid var(--line)' }}>
              <div className="faq-q" style={{ padding: '20px 0' }}><span>{question}</span><span className="faq-icon"><AgentixIcon name="chevron" size={12} /></span></div>
              <div className="faq-a" style={{ paddingBottom: 20 }}><div>{answer}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryPage() {
  const { categoryId, subId } = useParams();
  const category = findCategory(categoryId);
  if (!category) return <Navigate to="/404" replace />;
  const subcategory = subId ? category.subcategories.find((sub) => slugify(sub.name) === subId) : null;
  if (subId && !subcategory) return <Navigate to="/404" replace />;
  const tools = subcategory ? subcategory.tools : category.subcategories.flatMap((sub) => sub.tools);
  const totalTools = category.subcategories.reduce((s, sub) => s + sub.tools.length, 0);
  return (
    <>
      <Helmet><title>{subcategory ? subcategory.name : category.name} / Agentix</title></Helmet>

      {/* Rich category hero */}
      <section className="cat-page-hero" style={{ '--cat-accent': category.accent, '--cat-rgb': category.accentRgb }}>
        <div className="cat-page-hero-glow" />
        <div className="container-wide cat-page-hero-inner">
          <div className="cat-page-hero-left">
            <div className="chip" style={{ borderColor: category.accent, color: category.accent }}>
              <span className="chip-dot" style={{ background: category.accent }} />
              {subcategory ? category.name : 'Operating Domain'}
            </div>
            <h1 className="h-display cat-page-hero-title">{subcategory ? subcategory.name : category.name}</h1>
            <p className="body-lg" style={{ maxWidth: 620, marginTop: 24, lineHeight: 1.6 }}>{category.promise}</p>
            <div className="cat-page-hero-stats">
              <div className="cat-page-stat"><span className="cat-page-stat-n">{category.subcategories.length}</span><span className="cat-page-stat-l">workflows</span></div>
              <div className="cat-page-stat"><span className="cat-page-stat-n">{totalTools}</span><span className="cat-page-stat-l">intelligent tools</span></div>
              <div className="cat-page-stat"><span className="cat-page-stat-n">01</span><span className="cat-page-stat-l">unified layer</span></div>
            </div>
            <div className="hero-ctas" style={{ marginTop: 40 }}>
              <Link to="/talk-to-agentix" className="btn btn-primary btn-lg"><AgentixIcon name="mic" size={16} />Build this workflow</Link>
              <Link to="/demo" className="btn btn-secondary btn-lg">See it in action <AgentixIcon name="arrow" size={16} /></Link>
            </div>
          </div>
          <div className="cat-page-hero-right">
            <div className="cat-page-hero-subs card">
              <div className="eyebrow" style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>Workflows</div>
              {category.subcategories.map((sub, i) => (
                <Link key={sub.name} to={`/category/${category.id}/${slugify(sub.name)}`}
                  className={`cat-page-hero-sub ${subcategory?.name === sub.name ? 'active' : ''}`}
                  style={{ '--cat-accent': category.accent, animationDelay: `${i * 0.06}s` }}>
                  <span className="cat-rail-dot" style={{ background: category.accent, boxShadow: `0 0 10px ${category.accent}` }} />
                  <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{sub.name}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{sub.tools.length} tools</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool explorer */}
      <section className="section">
        <div className="container-wide">
          <SectionHead eyebrow={subcategory ? subcategory.name : 'Ecosystem'} title={subcategory ? `${tools.length} specialized tools for this workflow.` : `${tools.length} connected tools across ${category.name}.`} text="Each tool maps to a specific stage in the operating layer, ensuring goals are met with precise, reviewed outputs." />
          <div className="tool-grid" style={{ marginTop: 48 }}>
            {tools.map((tool) => <ToolCard key={tool} tool={allTools.find((item) => item.name === tool)} />)}
          </div>
        </div>
      </section>

      {/* Subcategory breakdown */}
      {!subcategory && (
        <section className="section page-band">
          <div className="container-wide">
            <SectionHead eyebrow="Workflow clusters" title={`${category.subcategories.length} operating zones within ${category.short}.`} text="Categorized by business outcome, each zone provides a complete path from raw intent to production-ready output." />
            <div className="cat-sub-grid">
              {category.subcategories.map((sub, i) => (
                <Link key={sub.name} to={`/category/${category.id}/${slugify(sub.name)}`}
                  className="cat-sub-card card" style={{ '--cat-accent': category.accent }}>
                  <div className="cat-sub-card-head">
                    <span className="mono" style={{ fontSize: 12, color: category.accent, fontWeight: 600 }}>0{i + 1}</span>
                    <span className="chip" style={{ fontSize: 10, borderColor: `rgba(${category.accentRgb},0.3)`, color: category.accent, fontWeight: 600 }}>{sub.tools.length} TOOLS</span>
                  </div>
                  <h3 className="cat-sub-card-name" style={{ fontSize: 18, marginTop: 12 }}>{sub.name}</h3>
                  <div className="cat-sub-card-tools">
                    {sub.tools.slice(0, 4).map((t) => <span key={t} className="cat-sub-card-tool">· {t}</span>)}
                    {sub.tools.length > 4 && <span className="cat-sub-card-more mono">+{sub.tools.length - 4} more</span>}
                  </div>
                  <div className="solution-cta" style={{ marginTop: 'auto', color: category.accent }}>Explore workflow <AgentixIcon name="arrow" size={12} /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <WorkflowBand title={`${subcategory ? subcategory.name : category.name} — intent to output sequence.`} accent={category.accent} />

      {/* Featured tools spotlight */}
      <section className="section">
        <div className="container-wide page-split">
          <div>
            <SectionHead eyebrow="Spotlight" title={`Core tools for ${category.short}.`} text="These featured tools represent the highest-frequency entry points for teams building in this domain." />
            <div style={{ marginTop: 32 }}>
              <Link to="/talk-to-agentix" className="btn btn-primary">
                <AgentixIcon name="mic" size={14} />Ask the assistant
              </Link>
            </div>
          </div>
          <div className="cat-featured-list">
            {category.featured.map((toolName) => {
              const tool = allTools.find((t) => t.name === toolName);
              return tool ? (
                <Link key={toolName} to={`/tools/${tool.id}`} className="cat-featured-row card" style={{ '--cat-accent': category.accent }}>
                  <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <AgentixIcon name="node" size={16} color={category.accent} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-0)' }}>{toolName}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>{tool.subcategoryName}</div>
                  </div>
                  <AgentixIcon name="arrow" size={14} color={category.accent} />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>

      <section className="section page-band">
        <div className="container-wide">
          <SectionHead eyebrow="Team alignment" title="Who manages this domain." />
          <div className="page-card-grid">
            {(CAT_ROLES[category.id] ?? CAT_ROLES.ops).map(([role, desc]) => (
              <div key={role} className="solution-card card" style={{ '--accent-cat': category.accent }}>
                <div className="solution-head">
                  <span className="solution-dot" style={{ background: category.accent }} />
                  <span className="solution-cat mono">{role}</span>
                </div>
                <h4 className="h-4" style={{ marginTop: 16 }}>{role}</h4>
                <p className="solution-outcome" style={{ marginTop: 10 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AssistantPanelSection title={`Build your ${category.short} workspace.`} text={`The assistant maps your goal to the right ${category.short} tools, workflows, and human handoff rules — then guides you from setup to first output.`} />
      <FAQSection title={`Frequently asked — ${category.short}.`} accent={category.accent} faqs={CAT_FAQS[category.id]} />
      <FinalCTA />
    </>
  );
}

function ToolsPage() {
  const [params] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(params.get('q') ?? '');
  
  const q = searchValue.toLowerCase();
  const tools = useMemo(() => {
    let result = allTools;
    if (q) result = result.filter((tool) => `${tool.name} ${tool.categoryName} ${tool.subcategoryName}`.toLowerCase().includes(q));
    if (activeCategory) result = result.filter((tool) => tool.categoryId === activeCategory);
    return result;
  }, [q, activeCategory]);

  return (
    <>
      <Helmet><title>Tools / Agentix</title></Helmet>
      <PageHero eyebrow="Tools" title={`${allTools.length}+ tools across 9 domains.`}
        text="Browse every tool in the Agentix ecosystem. Each tool belongs to a category, subcategory, and workflow path with clear input, output, and handoff rules.">
        <div style={{ marginTop: 32, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <form onSubmit={(e) => { e.preventDefault(); navigate(`/tools?q=${encodeURIComponent(searchValue)}`); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', background: 'var(--bg-2)', border: '1px solid var(--line-bright)', borderRadius: 'var(--r-2)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
            <AgentixIcon name="search" size={16} color="var(--accent)" />
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search tools..." style={{ background: 'transparent', border: 0, outline: 0, color: 'var(--ink-0)', fontSize: 15, width: 260 }} />
          </form>
        </div>
      </PageHero>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-wide">
          {/* Category filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            <button className={`usecase-tab ${!activeCategory ? 'active' : ''}`} onClick={() => setActiveCategory(null)}>All tools</button>
            {AGENTIX_DATA.categories.map((cat) => (
              <button key={cat.id} className={`usecase-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                style={activeCategory === cat.id ? { background: cat.accent, borderColor: cat.accent, color: '#fff' } : {}}>
                {cat.short}
              </button>
            ))}
          </div>
          <div className="tool-grid">
            {tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
          </div>
          {tools.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
              <p>No tools match your search. <button className="btn btn-secondary" onClick={() => { setActiveCategory(null); navigate('/tools'); }} style={{ marginLeft: 12 }}>Clear filters</button></p>
            </div>
          )}
        </div>
      </section>
      <section className="section page-band">
        <div className="container-wide">
          <SectionHead eyebrow="Category routes" title="Browse by operating domain." text="Each category is a governed workflow zone with its own subcategories, tools, and assistant paths." />
          <div className="ecosystem-grid" style={{ marginTop: 40 }}>
            {AGENTIX_DATA.categories.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="eco-card card"
                style={{ '--accent-cat': cat.accent, '--accent-cat-rgb': cat.accentRgb }}>
                <div className="eco-card-head">
                  <span className="eco-dot" style={{ background: cat.accent }} />
                  <img src={catIconPath(cat.id)} alt="" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)', opacity: 0.4 }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <div className="eco-name">{cat.name}</div>
                <div className="eco-desc">{cat.promise}</div>
                <div className="eco-stats">
                  <span>{cat.subcategories.length} subcategories</span>
                  <span>·</span>
                  <span>{cat.subcategories.reduce((s, sub) => s + sub.tools.length, 0)} tools</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <AssistantPanelSection title="Ask Agentix to find the exact tool for your workflow." />
      <FAQSection title="Tool discovery questions." />
      <FinalCTA />
    </>
  );
}

function ToolCard({ tool }) {
  if (!tool) return null;
  return (
    <Link to={`/tools/${tool.id}`} className="tool-card card" style={{ '--accent-cat': tool.accent }}>
      <div className="tool-card-head">
        <img src={toolIconPath(tool.name)} alt="" className="tool-card-icon" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <span className="solution-dot" style={{ background: tool.accent }} />
      </div>
      <h3 className="tool-card-name">{tool.name}</h3>
      <p className="tool-card-sub">{tool.subcategoryName}</p>
      <div className="tool-card-cta">Open tool <AgentixIcon name="arrow" size={11} /></div>
    </Link>
  );
}

function ToolPage() {
  const { toolId } = useParams();
  const tool = findTool(toolId);
  if (!tool) return <Navigate to="/404" replace />;
  const related = allTools.filter((item) => item.id !== tool.id && item.categoryId === tool.categoryId).slice(0, 6);
  const variant = ['content', 'marketing', 'sales'].includes(tool.categoryId)
    ? 'split'
    : ['cx', 'research', 'systems'].includes(tool.categoryId)
      ? 'desk'
      : 'ledger';
  return (
    <>
      <Helmet><title>{tool.name} / Agentix</title></Helmet>
      <PageHero eyebrow={tool.categoryName} title={tool.name} text={tool.description} accent={tool.accent}>
        <div className="hero-ctas" style={{ marginTop: 28 }}>
          <Link to="/talk-to-agentix" className="btn btn-primary">Try this tool</Link>
          <Link to={`/category/${tool.categoryId}`} className="btn btn-secondary">View category</Link>
        </div>
      </PageHero>
      <section className="section">
        <div className="container-wide">
          <ToolWorkspaceVisual tool={tool} variant={variant} />
          {related.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <div className="eyebrow" style={{ marginBottom: 20 }}>Related tools in {tool.categoryName}</div>
              <div className="tool-grid">
                {related.map((item) => <ToolCard key={item.id} tool={item} />)}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="section page-band"><div className="container-wide"><SectionHead eyebrow="What it does" title={`${tool.name} turns intent into reviewed output.`} text={tool.description} /><StepCards accent={tool.accent} items={['Inputs required', 'Outputs produced', 'Constraints', 'Review path']} /></div></section>
      <WorkflowBand title={`${tool.name} workflow placement.`} accent={tool.accent} />
      <section className="section"><div className="container-wide page-split"><div><SectionHead eyebrow="Integrations" title="Connect the systems this tool touches." /></div><StepCards accent={tool.accent} items={integrations.slice(0, 4).map((item) => item.name)} /></div></section>
      <section className="section page-band"><div className="container-wide"><SectionHead eyebrow="Human handoff" title="Review stays attached to the tool." text="Risk, compliance, legal-adjacent claims, customer escalation, and finance/admin actions route to a person." /></div></section>
      <AssistantPanelSection title={`Ask Agentix how to use ${tool.name}.`} />
      <FAQSection title={`${tool.name} questions.`} accent={tool.accent} />
      <FinalCTA />
    </>
  );
}

function ToolWorkspaceVisual({ tool, variant }) {
  if (variant === 'split') {
    return (
      <div className="theatre card tool-variant-split" style={{ '--accent-cat': tool.accent }}>
        <div className="mock-pane">
          <div className="mock-pane-head"><span className="mock-pane-label mono">Input brief</span><span className="chip mono">approved</span></div>
          {['Business goal', 'Audience', 'Knowledge sources', 'Review rules'].map((item) => (
            <div key={item} className="mock-field"><div className="mock-field-label">{item}</div><div className="mock-field-val">{tool.name} / {tool.subcategoryName}</div></div>
          ))}
        </div>
        <div className="mock-pane">
          <div className="mock-pane-head"><span className="mock-pane-label mono">Generated output</span><span className="dot" style={{ background: tool.accent }} /></div>
          <div className="mock-doc">
            <div className="mock-h1">{tool.name} workspace</div>
            <p>This page is tuned for {tool.categoryName}: fast inputs, structured output, review, and publishing.</p>
            <div className="mock-callout" style={{ marginTop: 24 }}><AgentixIcon name="check" size={14} color={tool.accent} /> Ready for human review and workflow routing.</div>
          </div>
        </div>
      </div>
    );
  }
  if (variant === 'desk') {
    return (
      <div className="cc-frame">
        <div className="cc-chrome"><div className="cc-chrome-dots"><span/><span/><span/></div><div className="cc-chrome-url">app.agentix.ai / {tool.id}</div><div className="cc-chrome-meta mono">live</div></div>
        <div className="tool-desk-grid">
          <div className="mock-chat">
            <div className="mock-chat-head"><span className="chip">{tool.categoryName}</span><span className="mono">assistant</span></div>
            <div className="mock-chat-body">
              <div className="mock-msg"><span className="mock-avatar">AI</span><div className="mock-bubble ai">I found the right workflow for {tool.name}. I can cite approved sources and route edge cases.</div></div>
              <div className="mock-msg user"><span className="mock-avatar u">U</span><div className="mock-bubble">Show the output and constraints.</div></div>
              <div className="mock-msg"><span className="mock-avatar">AI</span><div className="mock-bubble ai">Output is ready. Human handoff triggers are attached.</div></div>
            </div>
          </div>
          <div className="mock-report-grid">
            {['Signals', 'Recommendations', 'Risks', 'Next action'].map((item) => <div key={item} className="mock-card"><div className="mock-field-label">{item}</div><div className="mock-h2" style={{ fontSize: 16 }}>{tool.subcategoryName}</div></div>)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cc-frame">
      <div className="cc-chrome"><div className="cc-chrome-dots"><span/><span/><span/></div><div className="cc-chrome-url">workflow.agentix.ai / controls / {tool.id}</div><div className="cc-chrome-meta mono">governed</div></div>
      <div className="tool-ledger-grid">
        {['Trigger', 'Validate', 'Approve', 'Execute', 'Log', 'Report'].map((step, index) => (
          <div key={step} className="mock-card">
            <div className="mock-field-label">0{index + 1}</div>
            <div className="mock-h2" style={{ fontSize: 18 }}>{step}</div>
            <p style={{ color: 'var(--ink-2)', fontSize: 13, marginTop: 8 }}>{tool.name} moves through this governed workflow state.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionPage({ type }) {
  const data = type === 'solutions' ? AGENTIX_DATA.solutions : AGENTIX_DATA.useCases;
  const label = type === 'solutions' ? 'Solutions' : 'Use cases';
  const isSolutions = type === 'solutions';
  return (
    <>
      <Helmet><title>{label} / Agentix</title></Helmet>
      <PageHero
        eyebrow={label}
        title={isSolutions ? 'Outcome-shaped AI stacks.' : 'Built for the team you actually have.'}
        text={isSolutions
          ? 'Pre-built stacks that combine categories, tools, workflows, and handoff rules into one operating system for a specific business outcome.'
          : 'Agentix adapts to your team structure and role. Each use case is a starting point — not a template.'}
      />
      <section className="section">
        <div className="container-wide">
          <div className="collection-grid">
            {data.map((item) => (
              <Link key={item.id} to={`/${type}/${item.id}`} className="collection-card card">
                {isSolutions && item.category && (
                  <div className="collection-card-icon-wrap">
                    <img src={catIconPath(item.category)} alt="" className="collection-card-icon"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </div>
                )}
                <div className="solution-head">
                  <span className="solution-dot" style={{ background: AGENTIX_DATA.categories.find(c => c.id === item.category)?.accent ?? 'var(--accent)' }} />
                  <span className="solution-cat mono">{label}</span>
                </div>
                <h3 className="solution-name" style={{ marginTop: 12 }}>{item.name}</h3>
                <p className="solution-outcome" style={{ marginTop: 8 }}>{item.outcome ?? item.problem}</p>
                {(item.tools ?? item.stack ?? []).length > 0 && (
                  <div className="collection-card-tools" style={{ marginTop: 16 }}>
                    {(item.tools ?? item.stack).slice(0, 3).map((t) => (
                      <span key={t} className="collection-card-tool">{t}</span>
                    ))}
                  </div>
                )}
                <div className="solution-cta" style={{ marginTop: 'auto', paddingTop: 16 }}>Explore stack <AgentixIcon name="arrow" size={12} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <WorkflowBand title={`${label} become runnable Agentix workflows.`} />
      <section className="section page-band">
        <div className="container-wide">
          <SectionHead eyebrow="How it works" title="From outcome to operating system." text="Pick the stack closest to your goal. The assistant maps it to categories, tools, and handoff rules in your environment." />
          <div className="page-card-grid">
            {[['1. Choose outcome', 'Find the stack that matches your business goal or team type.'],
              ['2. Preview the tools', 'See which Agentix tools are connected and how they route together.'],
              ['3. Start the assistant', 'Talk to Agentix to tailor the stack to your inputs and constraints.'],
              ['4. Run the workflow', 'Execute, review, and iterate from one connected operating layer.']
            ].map(([title, desc]) => (
              <div key={title} className="solution-card card">
                <h3 className="solution-name" style={{ fontSize: 16 }}>{title}</h3>
                <p className="solution-outcome" style={{ marginTop: 8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AssistantPanelSection title={`Choose the right ${label.toLowerCase()} with Agentix.`} />
      <FAQSection title={`${label} questions.`} />
      <FinalCTA />
    </>
  );
}

function CollectionDetail({ type }) {
  const { id } = useParams();
  const data = type === 'solutions' ? AGENTIX_DATA.solutions : AGENTIX_DATA.useCases;
  const item = data.find((entry) => entry.id === id);
  if (!item) return <Navigate to="/404" replace />;
  return (
    <>
      <Helmet><title>{item.name} / Agentix</title></Helmet>
      <PageHero eyebrow={type} title={item.name} text={item.outcome ?? item.problem} />
      <section className="section"><div className="container-wide"><SectionHead eyebrow="Recommended stack" title={`Tools that power ${item.name}.`} text={`These tools connect inside Agentix — each one handles a specific stage of the ${item.name.toLowerCase()} workflow, from input to reviewed output.`} /><StepCards items={(item.tools ?? item.stack ?? []).slice(0, 4)} /></div></section>
      <WorkflowBand title={`${item.name} execution path.`} />
      <section className="section page-band"><div className="container-wide page-split"><div><SectionHead eyebrow="Command center" title={`${item.name} runs in one layer.`} text="Every tool, workflow, and handoff point is visible and controllable from the Agentix command center." /></div><div className="uc-dash"><div className="uc-dash-head"><span className="mono">{item.name}</span><span className="dot dot-accent" /></div><div className="uc-dash-list">{(item.tools ?? item.stack ?? []).map((tool) => <div key={tool} className="uc-dash-row"><span className="dot dot-accent" /><span>{tool}</span></div>)}</div></div></div></section>
      <AssistantPanelSection title={`Build ${item.name} with the assistant.`} />
      <FAQSection title={`${item.name} questions.`} />
      <FinalCTA />
    </>
  );
}

function ResourceIndex({ type }) {
  const config = resourceConfig(type);
  return (
    <>
      <Helmet><title>{config.title} / Agentix</title></Helmet>
      <PageHero eyebrow={config.eyebrow} title={config.title} text={config.text} />
      <section className="section">
        <div className={`container-wide ${config.gridClass}`}>
          {config.items.map((item, index) => (
            <Link key={item.id} to={`/${type}/${item.id}`} className={`resource-card card resource-card-${index % 3}`}>
              <div className="solution-head"><span className="solution-dot" /><span className="solution-cat mono">{config.eyebrow}</span></div>
              <h3 className="solution-name" style={{ marginTop: 12 }}>{item.name}</h3>
              <p className="solution-outcome" style={{ marginTop: 8 }}>{item.text}</p>
              <div className="solution-cta" style={{ marginTop: 'auto' }}>Open {config.singular} <AgentixIcon name="arrow" size={12} /></div>
            </Link>
          ))}
        </div>
      </section>
      <WorkflowBand title={`${config.title} connect into Agentix workflows.`} />
      <section className="section"><div className="container-wide"><SectionHead eyebrow="Featured paths" title={config.indexTitle ?? 'Choose a path.'} /><StepCards items={config.items.slice(0, 4).map((item) => item.name)} /></div></section>
      <section className="section page-band"><div className="container-wide"><SectionHead eyebrow="Governance" title="Every resource has permissions, handoff, and next-action context." /><StepCards items={['Owner', 'Reviewer', 'Status', 'Next action']} /></div></section>
      <AssistantPanelSection title={`Ask Agentix about ${config.title.toLowerCase()}.`} />
      <FAQSection title={`${config.title} questions.`} />
      <FinalCTA />
    </>
  );
}

function ResourceDetail({ type }) {
  const { id } = useParams();
  const config = resourceConfig(type);
  const item = config.items.find((entry) => entry.id === id || `${entry.id}-help` === id);
  if (!item) return <Navigate to="/404" replace />;
  return (
    <>
      <Helmet><title>{item.name} / Agentix {config.title}</title></Helmet>
      <PageHero eyebrow={config.eyebrow} title={item.name} text={item.text} />
      <section className="section">
        <div className={`container-wide detail-layout-${config.variant}`}>
          <div className="card detail-main">
            <span className="eyebrow">{config.singular} path</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>{item.name} inside Agentix.</h2>
            <p className="body-lg" style={{ marginTop: 16 }}>{item.text}</p>
          </div>
          <div className="detail-side">
            {item.bullets.map((bullet, index) => (
              <div key={bullet} className="card mock-card">
                <div className="mock-field-label">0{index + 1}</div>
                <div className="mock-h2" style={{ fontSize: 16 }}>{bullet}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WorkflowBand title={`${item.name} implementation path.`} />
      <section className="section page-band"><div className="container-wide"><SectionHead eyebrow="Related routes" title="Continue through nearby Agentix pages." /><StepCards items={config.items.filter((entry) => entry.id !== item.id).slice(0, 4).map((entry) => entry.name)} /></div></section>
      <AssistantPanelSection title={`Get help with ${item.name}.`} />
      <FAQSection title={`${item.name} questions.`} />
      <FinalCTA />
    </>
  );
}

function resourceConfig(type) {
  const map = {
    integrations: {
      title: 'Integrations',
      singular: 'integration',
      eyebrow: 'Connected systems',
      text: 'Connect Agentix to the systems your team already uses: CRM, email, docs, support, analytics, databases, and APIs.',
      items: integrations,
      gridClass: 'resource-grid-flow',
      variant: 'flow',
    },
    docs: {
      title: 'Docs',
      singular: 'collection',
      eyebrow: 'Builder docs',
      text: 'Documentation for builders, admins, and technical buyers using Agentix tools and workflow infrastructure.',
      items: docs,
      gridClass: 'resource-grid-docs',
      variant: 'docs',
    },
    help: {
      title: 'Help Center',
      singular: 'topic',
      eyebrow: 'Support paths',
      text: 'Troubleshooting and support topics for teams building workflows with Agentix.',
      items: helpTopics,
      gridClass: 'resource-grid-help',
      variant: 'help',
    },
  };
  return map[type];
}

function InfoPage({ id }) {
  const copy = pageCopy[id] ?? [unslug(id), `${unslug(id)} is part of the Agentix operating system — connecting tools, workflows, and human review in one layer.`, ['Overview', 'Workflow', 'Tools', 'Next steps']];
  const accent = id === 'security' ? 'var(--ok)' : id === 'pricing' ? 'var(--warn)' : 'var(--accent)';
  return (
    <>
      <Helmet><title>{copy[0]} / Agentix</title></Helmet>
      <PageHero eyebrow="Agentix" title={copy[0]} text={copy[1]} accent={accent} />
      <section className="section">
        <div className="container-wide solutions-grid">
          {copy[2].map((item) => (
            <div key={item} className="solution-card card" style={{ '--accent-cat': accent }}>
              <div className="solution-head"><span className="solution-dot" style={{ background: accent }} /><span className="solution-cat mono">Section</span></div>
              <h3 className="solution-name" style={{ marginTop: 12 }}>{item}</h3>
              <p className="solution-outcome" style={{ marginTop: 8 }}>Part of the Agentix operating system — tools, workflows, and handoff routes connected in one layer.</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section page-band"><div className="container-wide page-split"><div><SectionHead eyebrow="Page role" title={`${copy[0]} has a dedicated conversion role.`} text="The page does not share a thin generic body. It separates route choice, forms or content, trust notes, and next action." /></div><div className="mock-report-grid">{copy[2].slice(0, 4).map((item) => <div key={item} className="mock-card"><div className="mock-field-label">Role</div><div className="mock-h2" style={{ fontSize: 16 }}>{item}</div></div>)}</div></div></section>
      <WorkflowBand title={`${copy[0]} decision path.`} accent={accent} />
      <section className="section"><div className="container-wide"><SectionHead eyebrow="Routing" title="Clear routes replace inert buttons." /><StepCards accent={accent} items={['Talk to Agentix', 'Book Demo', 'Search', 'Contact']} /></div></section>
      <section className="section page-band"><div className="container-wide"><SectionHead eyebrow="Platform" title="Every page connects to one operating layer." text="Tools, workflows, assistant routing, and human handoff all run inside the same Agentix system — no switching between products." /></div></section>
      <AssistantPanelSection title={`Ask Agentix about ${copy[0]}.`} />
      <FAQSection title={`${copy[0]} questions.`} accent={accent} />
      <FinalCTA />
    </>
  );
}

function SearchPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const navigate = useNavigate();
  
  const results = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return [];
    return allTools.filter((tool) => `${tool.name} ${tool.categoryName} ${tool.subcategoryName}`.toLowerCase().includes(q)).slice(0, 24);
  }, [query]);

  return (
    <>
      <Helmet><title>Search / Agentix</title></Helmet>
      <PageHero eyebrow="Search" title="Search the Agentix ecosystem." text="Find tools, categories, solutions, and use cases across every Agentix domain.">
        <form className="dock-input" style={{ marginTop: 32, maxWidth: 680, background: 'var(--bg-2)', border: '1px solid var(--line-bright)', padding: '14px 20px', borderRadius: 'var(--r-3)', boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }} onSubmit={(event) => {
          event.preventDefault();
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }}>
          <AgentixIcon name="search" size={20} color="var(--accent)" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools, categories, and workflows..." style={{ fontSize: 16 }} />
          <button type="submit" className="dock-send"><AgentixIcon name="arrow" size={14} color="#02141A" /></button>
        </form>
      </PageHero>
      <section className="section"><div className="container-wide tool-grid">{results.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div></section>
      <WorkflowBand title="Search routes into the same operating system." />
      <section className="section page-band"><div className="container-wide"><SectionHead eyebrow="Grouped results" title="Search covers tools, categories, solutions, docs, help, and integrations." /><StepCards items={['Tools', 'Categories', 'Solutions', 'Resources']} /></div></section>
      <AssistantPanelSection title="Ask Agentix when search is not enough." />
      <FAQSection title="Search questions." />
      <FinalCTA />
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <Helmet><title>Page not found / Agentix</title></Helmet>
      <PageHero eyebrow="404" title="Page not found." text="This page does not exist or has moved. Use the links below to find what you need." />
      <section className="section">
        <div className="container-wide page-card-grid">
          {[
            ['Browse tools', '/tools', 'Explore 120+ AI tools across every business category and workflow.'],
            ['View categories', '/category/content', 'Browse all 9 business domains with subcategory and tool depth.'],
            ['Search', '/search', 'Find tools, categories, solutions, and use cases instantly.'],
            ['Contact us', '/contact', 'Get help from the Agentix team — sales, support, or implementation.'],
          ].map(([label, href, desc]) => (
            <Link key={label} to={href} className="solution-card card" style={{ textDecoration: 'none' }}>
              <div className="solution-head"><span className="solution-dot" style={{ background: 'var(--accent)' }} /><span className="solution-cat mono">Quick link</span></div>
              <h3 className="solution-name" style={{ fontSize: 18, marginTop: 12 }}>{label}</h3>
              <p className="solution-outcome" style={{ marginTop: 8 }}>{desc}</p>
              <div className="solution-cta" style={{ marginTop: 'auto' }}>Go <AgentixIcon name="arrow" size={12} /></div>
            </Link>
          ))}
        </div>
      </section>
      <AssistantPanelSection title="Can't find it? Ask Agentix." text="The assistant can find any tool, workflow, or page in the Agentix ecosystem." />
      <FinalCTA />
    </>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/category/:categoryId/:subId" element={<CategoryPage />} />
        <Route path="/solutions" element={<CollectionPage type="solutions" />} />
        <Route path="/solutions/:id" element={<CollectionDetail type="solutions" />} />
        <Route path="/use-cases" element={<CollectionPage type="use-cases" />} />
        <Route path="/use-cases/founder-led-businesses" element={<Navigate to="/use-cases/founder-led" replace />} />
        <Route path="/use-cases/operations-teams" element={<Navigate to="/use-cases/ops-teams" replace />} />
        <Route path="/use-cases/saas" element={<Navigate to="/use-cases/saas-startups" replace />} />
        <Route path="/use-cases/agencies" element={<Navigate to="/use-cases/b2b-agencies" replace />} />
        <Route path="/use-cases/:id" element={<CollectionDetail type="use-cases" />} />
        <Route path="/integrations" element={<ResourceIndex type="integrations" />} />
        <Route path="/integrations/:id" element={<ResourceDetail type="integrations" />} />
        <Route path="/docs" element={<ResourceIndex type="docs" />} />
        <Route path="/docs/:id" element={<ResourceDetail type="docs" />} />
        <Route path="/help" element={<ResourceIndex type="help" />} />
        <Route path="/help/:id" element={<ResourceDetail type="help" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/talk-to-agentix" element={<TalkPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="/changelog" element={<ChangelogPage />} />
        {['privacy', 'privacy-policy', 'terms', 'cookies', 'cookie-preferences', 'accessibility', '500'].map((id) => (
          <Route key={id} path={`/${id}`} element={<InfoPage id={id === 'privacy-policy' ? 'privacy' : id === 'cookies' ? 'cookie-preferences' : id} />} />
        ))}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
