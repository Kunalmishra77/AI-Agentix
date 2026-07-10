// AI Studio page — content from content-archive/pages/ai-studio.md
// (The archive's fabricated "Live Content Feed" numbers are omitted — no mock data.
//  The hero shows an honest channels showcase instead.)

export const meta = {
  title: 'AI Content Studio — AI Agentix',
  description: "India's AI-powered content and marketing studio. Videos, social posts, email campaigns, and ads — all automated.",
}

export const hero = {
  eyebrow: 'AI Content Studio',
  heading: 'Your Brand. On Every Platform. Every Day.',
  body: "AI Agentix runs India's most advanced AI-powered content studio. We create, publish, and optimize your brand's entire digital presence — delivering the output of a 10-person marketing team at a fraction of the cost.",
  quickStats: [
    { value: '10x', label: 'Content output' },
    { value: '60%', label: 'Lower cost vs agency' },
    { value: '3x', label: 'More leads' },
  ],
  ctas: [
    { label: 'Start AI Studio', to: '/contact', primary: true },
    { label: 'View Packages', to: '#packages', primary: false },
  ],
  panelTitle: 'One AI brain. Every channel.',
}

export const stats = {
  items: [
    { value: '10x', label: 'Content output vs agency', sub: 'Same cost, 10x more content' },
    { value: '60%', label: 'Reduction in marketing cost', sub: 'vs traditional agency retainer' },
    { value: '3x', label: 'More leads from same budget', sub: 'Due to continuous A/B testing' },
    { value: '< 24h', label: 'Campaign launch time', sub: 'From brief to live' },
  ],
}

export const create = {
  eyebrow: 'What We Create',
  heading: 'Every Format. Every Platform. Every Day.',
  items: [
    { icon: 'video', name: 'AI Videos', desc: 'Explainer videos, reels, product demos — scripted, voiced, and edited by AI.', eg: 'Product launch reel — 30s, branded, auto-published to Instagram.' },
    { icon: 'social', name: 'Social Posts', desc: 'Daily posts, carousels, stories across Instagram, LinkedIn, Facebook — planned and published by AI agents.', eg: 'LinkedIn thought-leadership — 800 words, industry-specific.' },
    { icon: 'email', name: 'Email Campaigns', desc: 'Full nurture sequences, newsletters, transactional emails — written and sent at the right time.', eg: 'Welcome sequence — 7 emails, behaviour-triggered, 42% open rate.' },
    { icon: 'ads', name: 'Ad Creatives', desc: 'Google and Meta ad copy, creative briefs, A/B variants — generated and optimised autonomously.', eg: 'Facebook lead-gen — 5 variants, auto-optimised, ₹85 CPL.' },
    { icon: 'blog', name: 'Blog Articles', desc: 'SEO-optimized blog content targeting buyer-intent keywords — researched, written, and published weekly.', eg: 'Blog: "AI in Indian Real Estate" — 1,200 words, page 1.' },
    { icon: 'whatsapp', name: 'WhatsApp Campaigns', desc: 'Targeted broadcasts, drip sequences, and personalised follow-ups via WhatsApp Business API.', eg: 'Diwali offer — 2,400 contacts, 98% delivered, 34% opened.' },
    { icon: 'landing', name: 'Landing Pages', desc: 'High-converting campaign landing pages — written, designed, A/B tested, and published automatically.', eg: 'Lead gen page — 38% conversion, auto-connected to CRM.' },
    { icon: 'sms', name: 'SMS / RCS Campaigns', desc: 'Personalised SMS drip campaigns with smart reply triggers — timed to user behaviour and purchase events.', eg: 'Abandoned cart SMS — 3-step sequence, 18% recovery.' },
    { icon: 'product', name: 'Product Descriptions', desc: 'E-commerce product listings — SEO-optimised, benefit-led, auto-updated across Shopify, WooCommerce, and Amazon.', eg: '500 SKUs updated overnight — consistent tone, keyword-rich.' },
    { icon: 'youtube', name: 'YouTube Shorts & Scripts', desc: 'Short-form video scripts, thumbnails, titles, and descriptions — auto-published with scheduling and analytics.', eg: 'Weekly Shorts: "AI tip of the week" — 4.2K avg views.' },
    { icon: 'push', name: 'Push Notifications', desc: 'Browser and app push campaigns — timed to user behaviour, personalised by segment, A/B tested automatically.', eg: 'Re-engagement push — 22% click-through, 11% conversion.' },
    { icon: 'podcast', name: 'Podcast & Audio Content', desc: 'Podcast show notes, transcriptions, audiograms, and short clips — repurposed from recordings automatically.', eg: 'Episode transcript → blog + 3 social clips in under 5 min.' },
    { icon: 'reports', name: 'Case Studies & Reports', desc: 'Client success stories, ROI reports, and thought leadership documents — drafted from data and published on schedule.', eg: 'Case study: ₹18L/month saved — PDF + web version.' },
  ],
}

export const channels = {
  eyebrow: 'Channels',
  heading: '7 Platforms. One AI Brain.',
  body: "Our AI agents don't just schedule posts — they plan campaigns, write copy, design creatives, run A/B tests, analyze performance, and iterate. A full digital marketing function, running autonomously.",
  bullets: ['Campaign planning and execution', 'Real-time performance optimization', 'Content creation for each platform', 'Budget management and ROI tracking', 'Weekly reporting and insights'],
  platforms: [
    { icon: 'instagram', name: 'Instagram', role: 'Daily Reels + Stories' },
    { icon: 'facebook', name: 'Facebook', role: 'Ads + Posts' },
    { icon: 'linkedin', name: 'LinkedIn', role: 'Content + Outreach' },
    { icon: 'youtube', name: 'YouTube', role: 'Videos + SEO' },
    { icon: 'google', name: 'Google Ads', role: 'Campaigns + Bidding' },
    { icon: 'whatsapp', name: 'WhatsApp', role: 'Broadcasts + Drips' },
    { icon: 'email', name: 'Email', role: 'Sequences + Newsletters' },
  ],
}

export const pricing = {
  eyebrow: 'Pricing',
  heading: 'Choose Your AI Studio Package',
  body: 'All packages include custom setup, onboarding, and dedicated AI marketing management.',
  packages: [
    { name: 'Starter', price: '₹25,000', period: '/month', popular: false,
      features: ['8 videos per month', '30-day social calendar (3 platforms)', '2 email campaigns per month', 'Basic ad campaign management', 'Monthly performance report'] },
    { name: 'Growth', price: '₹49,000', period: '/month', popular: true,
      features: ['20 videos per month', 'Daily content across 5 platforms', 'Weekly email sequences', 'Full Google & Meta ad management', 'Lead generation landing pages', 'A/B testing on all ads', 'Weekly analytics report'] },
    { name: 'Dominator', price: '₹89,000', period: '/month', popular: false,
      features: ['30+ videos per month', 'Full omnichannel marketing automation', 'Lead generation system included', 'AI voice agent for lead follow-up', 'Real-time analytics dashboard', 'Dedicated AI marketing manager', 'Unlimited platforms'] },
  ],
  cta: { label: 'Get Started', to: '/contact' },
}

export const finalCta = {
  heading: 'Stop Paying Agency Retainers.',
  body: 'Get the output of a 10-person marketing team at a fraction of the cost. Book a demo to see AI Studio in action.',
  cta: { label: 'See AI Studio in Action', to: '/contact' },
}
