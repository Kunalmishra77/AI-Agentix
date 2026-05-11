import React, { useEffect, useState, useRef } from 'react';
import LottieAnimation from './LottieAnimation';

/**
 * STABLE EXPLICIT MAPPING for Marketing & Growth tools.
 * Using professionally cleaned transparent WebM assets.
 */
const MARKETING_GROWTH_VIDEO_MAP = {
  'Ad Creative Generator': '/categories/marketing-growth/ad-creative-copy-generator.webm',
  'Ad Performance Insight': '/categories/marketing-growth/ad-performance-insight.webm',
  'Attribution Explainer': '/categories/marketing-growth/attribution-explainer.webm',
  'Campaign Strategy Builder': '/categories/marketing-growth/campaign-strategy-builder.webm',
  'Content Brief Tool': '/categories/marketing-growth/content-brief-tool.webm',
  'Experiment Roadmap': '/categories/marketing-growth/experiment-roadmap.webm',
  'Funnel Audit': '/categories/marketing-growth/funnel-audit.webm',
  'Growth Analytics Assistant': '/categories/marketing-growth/growth-analytics-assistant.webm',
  'GTM Launch Planner': '/categories/marketing-growth/gtm-launcher.webm',
  'Landing Page Optimizer': '/categories/marketing-growth/landing-page-optimizer.webm',
  'Lead Capture Optimizer': '/categories/marketing-growth/lead-capture-optimizer.webm',
  'Marketing Calendar': '/categories/marketing-growth/marketing-calendar.webm',
  'Paid Campaign Planner': '/categories/marketing-growth/paid-campaign-planner.webm',
  'Competitive SEO Intelligence': '/categories/marketing-growth/seo-intelligence.webm',
  'SEO Topic Cluster Builder': '/categories/marketing-growth/seo-topic-cluster-builder.webm',
};

/**
 * STABLE EXPLICIT MAPPING for Sales & Revenue tools.
 */
const SALES_REVENUE_VIDEO_MAP = {
  'Lead Discovery': '/categories/sales-revenue/lead-discovery.webm',
  'Lead Enrichment & Scoring': '/categories/sales-revenue/lead-enrichment-scoring.webm',
  'Account Research': '/categories/sales-revenue/account-research.webm',
  'Multichannel Sequence Builder': '/categories/sales-revenue/multichannel-sequence-builder.webm',
  'Cold Email Personalization': '/categories/sales-revenue/cold-email-personalization.webm',
  'Follow-Up Automation': '/categories/sales-revenue/follow-up-automation.webm',
  'AI Sales Chat': '/categories/sales-revenue/ai-sales-chat.webm',
  'AI Sales Voice': '/categories/sales-revenue/ai-sales-voice.webm',
  'Meeting Booking Assistant': '/categories/sales-revenue/meeting-booking-assistant.webm',
  'CRM Sync & Hygiene': '/categories/sales-revenue/crm-sync-hygiene.webm',
  'Deal Assistant': '/categories/sales-revenue/deal-assistant.webm',
  'Proposal & Quote Generator': '/categories/sales-revenue/proposal-quote-generator.webm',
  'Pipeline Forecasting': '/categories/sales-revenue/pipeline-forecasting.webm',
  'Sales Process Audit': '/categories/sales-revenue/sales-process-audit.webm',
  'Sales Enablement Content': '/categories/sales-revenue/sales-enablement-content.webm',
};

/**
 * STABLE EXPLICIT MAPPING for Customer Experience & Support tools.
 */
const CUSTOMER_SUPPORT_VIDEO_MAP = {
  'AI Support Chat': '/categories/customer-experience-support/ai-support-chat.webm',
  'Ticket Triage & Routing': '/categories/customer-experience-support/ticket-triage-routing.webm',
  'Support Response Assistant': '/categories/customer-experience-support/support-response-assistant.webm',
  'Onboarding Journey Builder': '/categories/customer-experience-support/onboarding-journey-builder.webm',
  'Customer Training Generator': '/categories/customer-experience-support/customer-training-generator.webm',
  'Product Walkthrough': '/categories/customer-experience-support/product-walkthrough.webm',
  'Churn Risk Assistant': '/categories/customer-experience-support/churn-risk-assistant.webm',
  'Voice of Customer': '/categories/customer-experience-support/voice-of-customer.webm',
  'Renewal & Expansion': '/categories/customer-experience-support/renewal-expansion.webm',
  'Testimonial Builder': '/categories/customer-experience-support/testimonial-builder.webm',
  'Review Response': '/categories/customer-experience-support/review-response.webm',
  'Community Engagement': '/categories/customer-experience-support/community-engagement.webm',
};

/**
 * STABLE EXPLICIT MAPPING for Finance, Admin & Compliance tools.
 */
const FINANCE_ADMIN_COMPLIANCE_VIDEO_MAP = {
  'Invoice Processing': '/categories/finance-admin-compliance/invoice-processing.webm',
  'Expense Categorizer': '/categories/finance-admin-compliance/expense-categorizer.webm',
  'Receipt Capture': '/categories/finance-admin-compliance/receipt-capture.webm',
  'Contract Review': '/categories/finance-admin-compliance/contract-review.webm',
  'Risk Summary': '/categories/finance-admin-compliance/risk-summary.webm',
  'Clause Library': '/categories/finance-admin-compliance/clause-library.webm',
  'Compliance Checklist': '/categories/finance-admin-compliance/compliance-checklist.webm',
  'Policy Review': '/categories/finance-admin-compliance/policy-review.webm',
  'Audit Prep': '/categories/finance-admin-compliance/audit-prep.webm',
  'Employee On/Off-boarding': '/categories/finance-admin-compliance/employee-on-off-boarding.webm',
  'Meeting Notes & Actions': '/categories/finance-admin-compliance/meeting-notes-actions.webm',
  'Vendor Management': '/categories/finance-admin-compliance/vendor-management.webm',
};

/**
 * ToolHeroMedia - Dynamic Cinematic Media Handler
 * Optimized for Production Stability and REAL Transparency
 */
const ToolHeroMedia = ({ toolName, categoryId, accentRgb, lottieUrl }) => {
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaType, setMediaType] = useState('video'); 
  const videoRef = useRef(null);

  const slugify = (value) => {
    return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  useEffect(() => {
    const tool = toolName.trim();

    // REQUIREMENT: AI Content Generator MUST use Lottie intentionally
    if (tool === 'AI Content Generator') {
      setMediaType('lottie');
      setMediaUrl(null);
      return;
    }

    if (categoryId === 'content') {
      const slug = slugify(tool);
      // Content category uses processed transparent WebM
      const webmPath = `/categories/content/${slug}.webm`;
      setMediaUrl(webmPath);
      setMediaType('video');
    } else if (categoryId === 'marketing') {
      const path = MARKETING_GROWTH_VIDEO_MAP[tool];
      if (path) {
        setMediaUrl(path);
        setMediaType('video');
      } else {
        setMediaType('lottie');
        setMediaUrl(null);
      }
    } else if (categoryId === 'sales') {
      const path = SALES_REVENUE_VIDEO_MAP[tool];
      if (path) {
        setMediaUrl(path);
        setMediaType('video');
      } else {
        setMediaType('lottie');
        setMediaUrl(null);
      }
    } else if (categoryId === 'cx') {
      const path = CUSTOMER_SUPPORT_VIDEO_MAP[tool];
      if (path) {
        setMediaUrl(path);
        setMediaType('video');
      } else {
        setMediaType('lottie');
        setMediaUrl(null);
      }
    } else if (categoryId === 'finance') {
      const path = FINANCE_ADMIN_COMPLIANCE_VIDEO_MAP[tool];
      if (path) {
        setMediaUrl(path);
        setMediaType('video');
      } else {
        setMediaType('lottie');
        setMediaUrl(null);
      }
    } else {
      setMediaType('lottie');
      setMediaUrl(null);
    }
  }, [toolName, categoryId]);

  return (
    <div className="hero-anim-box cinematic-float" style={{ 
      width: '100%', 
      maxWidth: 420, 
      height: 340, 
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
      background: 'transparent'
    }}>
      {/* 1. Deep Ambient Atmospheric Glow */}
      <div style={{ 
        position: 'absolute', 
        width: '180%', 
        height: '180%', 
        background: `radial-gradient(circle at center, rgba(${accentRgb}, 0.12), transparent 70%)`, 
        filter: 'blur(100px)', 
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.8
      }} />
      
      {/* 2. Core Cinematic Halo */}
      <div style={{ 
        position: 'absolute', 
        width: '120%', 
        height: '120%', 
        background: `radial-gradient(circle at center, rgba(${accentRgb}, 0.25), transparent 60%)`, 
        filter: 'blur(50px)', 
        zIndex: 0,
        pointerEvents: 'none'
      }} />
      
      {mediaType === 'video' && mediaUrl ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          key={mediaUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
            display: 'block',
            background: 'transparent',
            // --- PROFESSIONAL TRANSPARENT BLENDING (No Color Damage) ---
            mixBlendMode: 'normal', 
            filter: 'brightness(1.05) contrast(1.05)', 
            transform: 'scale(1.15)',
            border: 'none',
            outline: 'none'
          }}
          onError={() => {
            setMediaType('lottie');
          }}
        >
          <source src={mediaUrl} type="video/webm" />
        </video>
      ) : (
        <LottieAnimation 
          url={lottieUrl} 
          style={{ 
            position: 'relative', 
            zIndex: 1, 
            transform: 'scale(1.15)',
            filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.04))',
            mixBlendMode: 'screen'
          }} 
        />
      )}
    </div>
  );
};

export default ToolHeroMedia;
