// Retail & E-commerce industry page — content verbatim from
// content-archive/pages/industries/retail-ecommerce.md

export default {
  slug: 'retail-ecommerce',
  heroImage: '/images/hero-ind-retail.webp',
  meta: {
    title: 'AI for Retail & E-commerce | AI Agentix',
    description: 'AI-powered shopping assistants, recovery campaigns, and inventory intelligence that drive revenue while you sleep.',
  },
  hero: {
    eyebrow: 'AI for Retail & E-commerce',
    heading: 'Sell Smarter with Retail AI Automation',
    subheading: 'AI-powered shopping assistants, recovery campaigns, and inventory intelligence that drive revenue while you sleep.',
    ctas: [
      { label: 'Book a Demo', to: '/contact', primary: true },
      { label: 'View Results', to: '/case-studies', primary: false },
    ],
    tags: ['Conversational Commerce', 'Recommendations', 'Cart Recovery', 'Support Automation', 'Inventory', 'Loyalty'],
  },
  stats: [
    { value: '28%', label: 'Higher AOV', sub: 'average order value lift' },
    { value: '22%', label: 'Cart Recovery Rate', sub: 'of abandoned carts recovered' },
    { value: '85%', label: 'Support Automation', sub: 'queries resolved by AI' },
    { value: '34%', label: 'Customer Retention', sub: 'repeat purchase rate increase' },
  ],
  solutions: {
    eyebrow: 'Complete Retail AI Platform',
    heading: 'Six capabilities that drive revenue at every stage',
    items: [
      { name: 'Conversational Commerce', image: '/images/business-intelligence.webp',
        desc: 'AI shopping assistants on WhatsApp, website, and Instagram help customers discover products, compare options, and complete purchases — 24/7 without human intervention.',
        points: ['WhatsApp, web & Instagram', 'Product discovery', 'Option comparison', '24/7 guided purchases'] },
      { name: 'Personalized Recommendations', image: '/images/personalization.webp',
        desc: 'Machine learning analyzes browse history, purchase patterns, and real-time behavior to serve hyper-relevant product suggestions that increase average order value by 28%.',
        points: ['Browse & purchase analysis', 'Real-time behavior signals', 'Hyper-relevant suggestions', '+28% average order value'] },
      { name: 'Cart Abandonment Recovery', image: '/images/ecommerce.webp',
        desc: 'Automated multi-channel sequences (email, SMS, WhatsApp) with personalized incentives recover 22% of abandoned carts — timed intelligently to avoid discount dependency.',
        points: ['Email, SMS & WhatsApp', 'Personalized incentives', 'Intelligent timing', '22% carts recovered'] },
      { name: 'Customer Support Automation', image: '/images/chat-support.webp',
        desc: 'AI handles 85% of support queries — order tracking, returns, refunds, size guides, and product questions — resolving most in under 60 seconds without human escalation.',
        points: ['Order tracking & returns', 'Refunds & size guides', 'Product questions', 'Under-60-second resolution'] },
      { name: 'Inventory Intelligence', image: '/images/inventory.webp',
        desc: 'Demand forecasting AI predicts stockouts before they happen, automates reorder triggers, and optimizes stock levels across warehouses and store locations.',
        points: ['Stockout prediction', 'Automated reorder triggers', 'Multi-location optimization', 'Demand forecasting'] },
      { name: 'Loyalty & Retention Engine', image: '/images/business-intelligence.webp',
        desc: 'Behavioral AI identifies at-risk customers before churn, triggers win-back campaigns, and optimizes loyalty program rewards based on individual purchase drivers.',
        points: ['At-risk churn detection', 'Win-back campaigns', 'Reward optimization', 'Purchase-driver analysis'] },
    ],
  },
  integrations: {
    eyebrow: 'Sell Everywhere',
    heading: 'Sell everywhere, manage from one place',
    body: 'AI Agentix unifies your customer experience across every channel and platform your store sells on.',
    tools: ['Shopify', 'WooCommerce', 'Amazon', 'Flipkart', 'WhatsApp Business', 'Instagram Shop', 'Google Shopping', 'Magento', 'BigCommerce', 'Mobile App', 'Website', 'Physical Store'],
  },
  proof: {
    eyebrow: 'Retail Success Stories',
    heading: 'Brands that grew revenue with AI',
    items: [
      { tag: 'StyleHub Fashion', stat: '28% higher average order value', text: 'AI recommendation engine surfaced complementary products at the right moments, increasing basket size across 400K monthly shoppers.', meta: '+28% AOV' },
      { tag: 'QuickCart Grocery', stat: '22% cart recovery rate', text: 'Intelligent WhatsApp and email sequences with personalized incentives recovered ₹3.2M in abandoned cart revenue monthly.', meta: '₹3.2M/mo recovered' },
      { tag: 'TechGadgets India', stat: '85% support automated', text: 'AI handles 85% of all customer queries — order tracking, returns, specs — freeing the support team for complex escalations only.', meta: '85% automated' },
    ],
  },
  faq: {
    heading: 'Retail & E-commerce AI — Questions Answered',
    items: [
      { q: 'Which e-commerce platforms do you integrate with?', a: 'We integrate with Shopify, WooCommerce, Magento, BigCommerce, Amazon, Flipkart, and all major e-commerce platforms via native connectors and APIs.' },
      { q: 'How does the AI product recommendation engine work?', a: 'It uses collaborative filtering, real-time behavioral signals, and purchase history to serve relevant recommendations across product pages, emails, and chat — without requiring manual curation.' },
      { q: 'Can it handle seasonal traffic spikes like Diwali sales?', a: 'Yes. The AI infrastructure auto-scales to handle 100x traffic. Campaign workflows can be pre-configured for peak events and launched instantly.' },
      { q: 'How does cart abandonment AI avoid being annoying?', a: 'AI monitors engagement signals to determine optimal timing and frequency. It suppresses messages for active shoppers and learns individual preferences over time.' },
      { q: 'What languages does the shopping assistant support?', a: 'It supports 40+ languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and all major regional Indian languages alongside global languages.' },
    ],
  },
  cta: {
    heading: 'Ready to Grow Your Retail Revenue?',
    body: 'Join 1,000+ retail and e-commerce brands using AI Agentix to automate growth.',
    ctas: [
      { label: 'Start Free Trial', to: '/contact', primary: true },
      { label: 'Talk to Sales', to: '/contact', primary: false },
    ],
  },
}
