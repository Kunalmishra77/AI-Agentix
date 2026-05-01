const PRODUCTS = [
  {
    slug: 'ai-sales-buddy',
    name: 'AI Sales Buddy',
    tagline: 'Your AI-powered revenue engine — automating prospecting, personalizing outreach, and accelerating pipeline from first touch to close.',
    metaDesc: 'AI Sales Buddy by AI Agentix automates lead research, writes hyper-personalized outreach, qualifies prospects via AI, and gives revenue teams real-time deal intelligence to close more faster.',
    badge: 'Sales Automation',
    gradient: 'linear-gradient(135deg, #FFF5F0 0%, #FFEEE4 60%, #FFF0E6 100%)',
    accentColor: '#F26522',
    iconBg: 'rgba(242,101,34,0.10)',
    heroStats: [
      { value: '3.8×', label: 'More pipeline generated per rep' },
      { value: '62%', label: 'Reduction in time-to-first-meeting' },
      { value: '41%', label: 'Higher win rate on AI-qualified leads' },
    ],
    overview:
      'AI Sales Buddy is the AI copilot for modern revenue teams. It researches prospects in seconds, writes personalized outreach that sounds human, qualifies inbound leads automatically, and surfaces the right intelligence at the right moment in every deal. Stop wasting rep time on admin — let AI handle the top of funnel so your team can focus on selling.',
    features: [
      {
        icon: 'magnifying-glass',
        title: 'Intelligent Prospect Research',
        desc: 'Automatically aggregates company news, tech stack, funding events, job postings, and social signals into a crisp prospect brief before every call.',
      },
      {
        icon: 'envelope',
        title: 'Hyper-Personalized Outreach',
        desc: 'Generates personalized emails and LinkedIn messages using prospect-specific context, your product value propositions, and proven high-performing sequences.',
      },
      {
        icon: 'bullseye',
        title: 'AI Lead Qualification',
        desc: 'Scores inbound leads in real time using firmographic, behavioral, and intent data — routing high-fit prospects to reps instantly and nurturing the rest automatically.',
      },
      {
        icon: 'comments',
        title: 'Meeting Intelligence',
        desc: 'Transcribes and analyzes sales calls, extracts action items, surfaces objections and next steps, and auto-updates your CRM — no manual notes required.',
      },
      {
        icon: 'chart-bar',
        title: 'Deal Risk Scoring',
        desc: 'ML models that monitor deal health across CRM signals, engagement patterns, and stakeholder mapping to flag at-risk opportunities before they go dark.',
      },
      {
        icon: 'link',
        title: 'CRM Auto-Enrichment',
        desc: 'Automatically enriches Salesforce, HubSpot, or Pipedrive records with verified contact data, technographic insights, and AI-generated account summaries.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Connect Your Stack',
        desc: 'Integrate AI Sales Buddy with your CRM, email, calendar, and LinkedIn in under 30 minutes. Pre-built connectors cover Salesforce, HubSpot, Outreach, Salesloft, and Gmail.',
      },
      {
        step: 2,
        title: 'Define Your ICP',
        desc: 'Configure your ideal customer profile — industry, company size, tech stack signals, job title targeting, and key pain points. AI uses this to prioritize and personalize at scale.',
      },
      {
        step: 3,
        title: 'AI Researches Every Prospect',
        desc: 'Before every outreach, the AI aggregates real-time intelligence on the prospect — recent company news, funding, hiring signals, competitor usage, and relevant trigger events.',
      },
      {
        step: 4,
        title: 'Generate & Send Personalized Outreach',
        desc: 'Review AI-generated emails and messages in seconds. One-click approve or lightly edit before sending. Track opens, replies, and meetings booked in a unified dashboard.',
      },
      {
        step: 5,
        title: 'Optimize With Every Interaction',
        desc: 'AI learns from reply rates, meeting conversions, and win data to continuously improve message quality and prospect prioritization for your specific market.',
      },
    ],
    useCases: [
      {
        title: 'SDR Pipeline Acceleration',
        desc: 'Sales development reps use AI Sales Buddy to research 10× more accounts per day and send personalized outreach at volume without sacrificing quality — filling pipeline faster with less headcount.',
      },
      {
        title: 'Account Executive Deal Intelligence',
        desc: 'AEs get real-time deal health scores, stakeholder maps, and call intelligence summaries so they can focus energy on winnable deals and catch slippage before it costs the quarter.',
      },
      {
        title: 'Inbound Lead Response Automation',
        desc: 'Marketing-generated inbound leads are instantly scored, personalized follow-ups are sent within 90 seconds, and high-intent prospects are routed to available reps — zero SDR involvement required.',
      },
      {
        title: 'RevOps Forecasting Intelligence',
        desc: 'Revenue operations teams use AI Sales Buddy\'s deal risk models to build more accurate forecasts, identify at-risk pipeline, and coach reps on specific deal behaviors that correlate with wins.',
      },
    ],
    integrations: [
      'Salesforce', 'HubSpot', 'Pipedrive', 'Outreach', 'Salesloft',
      'Gmail', 'Outlook', 'Google Calendar', 'LinkedIn Sales Navigator', 'Slack',
    ],
    results: [
      { value: '3.8×', label: 'More Pipeline', desc: 'Per rep vs. unassisted outbound' },
      { value: '62%', label: 'Faster Meetings', desc: 'Time from first touch to booked call' },
      { value: '41%', label: 'Higher Win Rate', desc: 'On AI-qualified vs. manual leads' },
      { value: '90s', label: 'Inbound Response', desc: 'Automated personalized follow-up' },
    ],
    pricing: [
      {
        plan: 'Starter',
        price: '$149/mo',
        desc: 'For individual reps and small teams getting started with AI-assisted selling.',
        highlighted: false,
        features: [
          'Up to 3 users',
          '500 AI prospect briefs/month',
          '1,000 personalized emails/month',
          'CRM sync (HubSpot or Salesforce)',
          'Basic lead scoring',
          'Email support',
        ],
      },
      {
        plan: 'Growth',
        price: '$499/mo',
        desc: 'For scaling sales teams that want full AI automation across the pipeline.',
        highlighted: true,
        features: [
          'Up to 15 users',
          'Unlimited prospect research',
          'Unlimited AI outreach',
          'Meeting intelligence & transcription',
          'Deal risk scoring',
          'Multi-channel (email + LinkedIn)',
          'Priority support + onboarding',
        ],
      },
      {
        plan: 'Enterprise',
        price: 'Custom',
        desc: 'For large revenue organizations with custom workflows and security requirements.',
        highlighted: false,
        features: [
          'Unlimited users',
          'Custom AI model fine-tuning',
          'SSO / SCIM provisioning',
          'Advanced analytics & forecasting',
          'Dedicated customer success manager',
          'SLA guarantees',
          'On-premise deployment option',
        ],
      },
    ],
    faq: [
      {
        q: 'Does AI Sales Buddy replace SDRs?',
        a: 'No — it makes your SDRs dramatically more productive. AI handles research, first-draft outreach, and lead routing so reps focus on conversations and relationships. Most teams 3–4× their output without adding headcount.',
      },
      {
        q: 'How does the personalization work — does it sound robotic?',
        a: 'The AI is fine-tuned on high-performing sales sequences and trained to write in a natural, human tone. It uses real prospect-specific details — not merge tags — so messages feel genuinely researched. Most recipients cannot tell they were AI-generated.',
      },
      {
        q: 'Which CRMs are supported?',
        a: 'Native integrations exist for Salesforce, HubSpot, and Pipedrive. API connections are available for any CRM with a REST API. Salesforce users get a native AppExchange package for seamless installation.',
      },
      {
        q: 'Is prospect data compliant with GDPR and CCPA?',
        a: 'Yes. All prospect data is sourced from compliant B2B data providers and public signals. Opt-out handling, data subject rights, and consent management are built into the platform. We maintain SOC 2 Type II certification.',
      },
    ],
  },

  {
    slug: 'ai-business-buddy',
    name: 'AI Business Buddy',
    tagline: 'The AI operations co-pilot for growing businesses — automating workflows, surfacing insights, and making your entire team more productive.',
    metaDesc: 'AI Business Buddy by AI Agentix is an all-in-one AI assistant for business operations — automating repetitive tasks, answering questions from your company knowledge base, generating reports, and streamlining team workflows.',
    badge: 'Business Automation',
    gradient: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 60%, #EEF2FF 100%)',
    accentColor: '#6366F1',
    iconBg: 'rgba(99,102,241,0.10)',
    heroStats: [
      { value: '12hrs', label: 'Saved per employee per week' },
      { value: '80%', label: 'Faster internal Q&A resolution' },
      { value: '6×', label: 'More reports generated per analyst' },
    ],
    overview:
      'AI Business Buddy is the intelligent operations layer for your company. Connect it to your tools, docs, and data — then ask it anything. It answers questions from your internal knowledge base, automates repetitive operational workflows, generates reports and summaries on demand, and acts as a tireless AI assistant available to every team member. Think of it as the smartest employee you\'ve ever had, who never sleeps and knows everything.',
    features: [
      {
        icon: 'brain',
        title: 'Company Knowledge AI',
        desc: 'Indexes your Notion, Confluence, Google Drive, SharePoint, and Slack history into a searchable AI brain — employees get instant, accurate answers with source citations.',
      },
      {
        icon: 'bolt',
        title: 'Workflow Automation',
        desc: 'Build AI-powered workflows that automate multi-step business processes — approval chains, data enrichment, content generation, and cross-tool orchestration without code.',
      },
      {
        icon: 'chart-bar',
        title: 'On-Demand Report Generation',
        desc: 'Connect to your databases and BI tools — ask in plain English and get formatted reports, charts, and executive summaries generated instantly.',
      },
      {
        icon: 'envelope',
        title: 'Email & Communication AI',
        desc: 'Drafts emails, meeting summaries, proposals, and communications in your brand voice. Learns from feedback to continuously improve output quality.',
      },
      {
        icon: 'magnifying-glass',
        title: 'Intelligent Document Analysis',
        desc: 'Upload contracts, reports, or datasets — AI extracts key information, answers questions, flags risks, and generates executive summaries in seconds.',
      },
      {
        icon: 'handshake',
        title: 'Team Collaboration Copilot',
        desc: 'Integrated into Slack and Teams, AI Business Buddy answers questions, takes meeting notes, creates action items, and keeps projects moving in your existing communication channels.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Connect Your Knowledge Sources',
        desc: 'Link your Notion, Confluence, Google Drive, SharePoint, Slack, and internal databases. AI Business Buddy ingests and indexes all content in a private, secure vector database.',
      },
      {
        step: 2,
        title: 'Configure Your AI Workspace',
        desc: 'Set your company\'s brand voice, key terminology, access permissions by team, and the specific workflows you want to automate. No coding required — a clean setup UI handles everything.',
      },
      {
        step: 3,
        title: 'Ask Anything, Automate Everything',
        desc: 'Employees interact via chat interface, Slack bot, or API. Ask questions, request reports, trigger workflows, or generate content — all from a single conversational interface.',
      },
      {
        step: 4,
        title: 'Review, Edit, Deploy',
        desc: 'AI output is always reviewable before action is taken. Approve, edit, or reject. Human-in-the-loop controls ensure AI augments your team without making unreviewed decisions.',
      },
      {
        step: 5,
        title: 'Learn & Improve Continuously',
        desc: 'AI Business Buddy learns from feedback, tracks usage patterns, and surfaces the most-asked questions and workflow bottlenecks — giving you a continuous improvement roadmap.',
      },
    ],
    useCases: [
      {
        title: 'Internal Knowledge Management',
        desc: 'Employees stop digging through outdated wikis and Slack threads. They ask AI Business Buddy in plain English and get accurate, source-linked answers from verified company documentation in seconds.',
      },
      {
        title: 'Operations & Finance Reporting',
        desc: 'Finance and operations teams connect BI tools and ask for custom reports, KPI dashboards, or variance analysis — getting formatted outputs in minutes instead of hours of manual work.',
      },
      {
        title: 'HR & People Operations Automation',
        desc: 'HR teams use AI Business Buddy to answer employee policy questions, generate offer letters, onboarding checklists, and performance review templates — freeing up capacity for strategic work.',
      },
      {
        title: 'Project & Executive Communication',
        desc: 'Project managers get AI-generated status reports, exec summaries, meeting minutes, and risk logs — keeping stakeholders informed without time-consuming manual documentation.',
      },
    ],
    integrations: [
      'Notion', 'Confluence', 'Google Drive', 'SharePoint', 'Slack',
      'Microsoft Teams', 'Jira', 'Salesforce', 'HubSpot', 'Zapier',
    ],
    results: [
      { value: '12hrs', label: 'Saved Weekly', desc: 'Per employee on average' },
      { value: '80%', label: 'Faster Answers', desc: 'Internal Q&A vs. manual search' },
      { value: '6×', label: 'Report Throughput', desc: 'Analyst capacity with AI' },
      { value: '94%', label: 'Team Adoption', desc: 'Average within 30 days of launch' },
    ],
    pricing: [
      {
        plan: 'Startup',
        price: '$299/mo',
        desc: 'For early-stage teams that want AI automation without enterprise complexity.',
        highlighted: false,
        features: [
          'Up to 10 users',
          '3 knowledge source integrations',
          '50 automated workflow runs/day',
          'Chat interface + Slack bot',
          'Email support',
          '5GB document storage',
        ],
      },
      {
        plan: 'Business',
        price: '$899/mo',
        desc: 'For growing companies ready to automate operations across every team.',
        highlighted: true,
        features: [
          'Up to 50 users',
          'Unlimited knowledge source integrations',
          'Unlimited workflow runs',
          'Custom AI brand voice training',
          'Advanced analytics dashboard',
          'Slack + Teams + API access',
          'Priority support + dedicated CSM',
        ],
      },
      {
        plan: 'Enterprise',
        price: 'Custom',
        desc: 'For organizations that need full customization, compliance, and scale.',
        highlighted: false,
        features: [
          'Unlimited users',
          'Private cloud or on-premise deployment',
          'SSO, SCIM, audit logs',
          'Custom LLM fine-tuning',
          'SLA & uptime guarantees',
          'Dedicated implementation team',
          'Executive business reviews',
        ],
      },
    ],
    faq: [
      {
        q: 'Is my company\'s data used to train AI models?',
        a: 'No. Your data is stored in a private, isolated vector database and is never used to train shared AI models. All AI Business Buddy instances are fully tenant-isolated. Enterprise customers can opt for private cloud deployment.',
      },
      {
        q: 'How does it handle outdated or conflicting information?',
        a: 'AI Business Buddy shows source citations with timestamps so users can verify recency. Admins can set content expiry rules and mark authoritative sources — the AI prioritizes verified, current documents over older content.',
      },
      {
        q: 'Can non-technical teams set up workflows?',
        a: 'Yes. Workflow creation uses a visual, no-code interface. Most workflows are configured in under 15 minutes without engineering involvement. Complex integrations have an AI Agentix implementation team available.',
      },
      {
        q: 'What happens if AI gives an incorrect answer?',
        a: 'Every answer includes source citations. Users can flag inaccurate responses, which feed a review queue for knowledge base administrators. Continuous feedback loops improve answer quality over time.',
      },
    ],
  },

  {
    slug: 'ai-content-buddy',
    name: 'AI Content Buddy',
    tagline: 'Create on-brand, high-converting content at 10× speed — from blog posts and social to ad copy, email campaigns, and everything in between.',
    metaDesc: 'AI Content Buddy by AI Agentix is a brand-aware AI content platform that creates SEO-optimized blog posts, social content, email campaigns, ad copy, and product descriptions in your exact brand voice.',
    badge: 'Content & Marketing AI',
    gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 60%, #ECFDF5 100%)',
    accentColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.10)',
    heroStats: [
      { value: '10×', label: 'Faster content production' },
      { value: '68%', label: 'Reduction in content creation cost' },
      { value: '2.4×', label: 'Higher engagement on AI-optimized content' },
    ],
    overview:
      'AI Content Buddy is not a generic AI writer — it\'s a brand-aware content engine that learns your voice, your audience, and your goals, then produces content that performs. From long-form SEO articles and email campaigns to ad copy and social posts, it creates across every format and channel. A built-in SEO optimizer, brand voice enforcer, and performance feedback loop make every piece better than the last.',
    features: [
      {
        icon: 'pen',
        title: 'Brand Voice Training',
        desc: 'Upload your best-performing content and brand guidelines — AI Content Buddy learns your tone, vocabulary, sentence structure, and style, then applies it consistently across everything it writes.',
      },
      {
        icon: 'magnifying-glass',
        title: 'SEO-First Content Engine',
        desc: 'Built-in keyword research, semantic topic clustering, SERP analysis, and on-page optimization guidance ensure every blog post and landing page is built to rank.',
      },
      {
        icon: 'mobile',
        title: 'Multi-Format Content Creation',
        desc: 'Generate blog posts, LinkedIn articles, X threads, email sequences, ad copy, product descriptions, video scripts, press releases, and more — all in one platform.',
      },
      {
        icon: 'bullseye',
        title: 'Audience-Specific Variants',
        desc: 'Create multiple versions of the same content for different audiences, personas, or channels — each adapted in tone and messaging without rewriting from scratch.',
      },
      {
        icon: 'chart-bar',
        title: 'Performance Feedback Loop',
        desc: 'Connect your analytics — Google Analytics, HubSpot, or ad platforms — and AI Content Buddy learns which content performs best, continuously improving future outputs.',
      },
      {
        icon: 'arrows-rotate',
        title: 'Content Repurposing Engine',
        desc: 'Transform a single long-form blog post into social snippets, an email series, a LinkedIn carousel, and an ad campaign — with one click, preserving key messages across formats.',
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Train Your Brand Voice',
        desc: 'Upload 5–10 examples of your best content — blogs, emails, social posts. AI Content Buddy analyzes your style, tone, and vocabulary to create a brand voice model unique to your company.',
      },
      {
        step: 2,
        title: 'Brief the AI',
        desc: 'Describe what you need: topic, target audience, goal, length, and any key points to include. The briefer takes 90 seconds — far faster than briefing a human writer.',
      },
      {
        step: 3,
        title: 'Generate, Review & Refine',
        desc: 'AI produces a full-length draft with SEO suggestions, readability scores, and variant options. Edit inline with AI assistance — change tone, expand sections, or regenerate specific paragraphs.',
      },
      {
        step: 4,
        title: 'Optimize for SEO & Platform',
        desc: 'Built-in SEO checker verifies target keyword usage, title tags, meta descriptions, internal link suggestions, and readability. Platform-specific optimization adjusts length and format for LinkedIn vs. email vs. web.',
      },
      {
        step: 5,
        title: 'Publish & Learn',
        desc: 'Publish directly from AI Content Buddy or export to your CMS. Connect analytics to feed engagement data back — the AI learns which angles, formats, and CTAs drive results for your audience.',
      },
    ],
    useCases: [
      {
        title: 'Scaling Content Marketing for SEO',
        desc: 'Content teams use AI Content Buddy to build topic clusters and produce high-quality, SEO-optimized blog posts at scale — filling content calendars months in advance without agency fees.',
      },
      {
        title: 'Email Campaign Automation',
        desc: 'Marketing teams create entire email sequences — welcome series, nurture campaigns, re-engagement flows — in hours rather than weeks, with audience-specific variants tested automatically.',
      },
      {
        title: 'Paid Ad Copy at Scale',
        desc: 'Performance marketing teams generate dozens of ad creative variants per campaign, testing headlines and body copy across Google, Meta, and LinkedIn — identifying top performers faster with AI.',
      },
      {
        title: 'Product Description & E-Commerce Content',
        desc: 'E-commerce teams generate SEO-optimized product descriptions, category page copy, and comparison content for thousands of SKUs — maintaining brand voice at catalog scale.',
      },
    ],
    integrations: [
      'WordPress', 'Webflow', 'HubSpot CMS', 'Shopify', 'Google Analytics',
      'Semrush', 'Ahrefs', 'Mailchimp', 'Klaviyo', 'Buffer',
    ],
    results: [
      { value: '10×', label: 'Content Speed', desc: 'vs. fully manual content creation' },
      { value: '68%', label: 'Cost Reduction', desc: 'Content production cost per piece' },
      { value: '2.4×', label: 'Engagement Rate', desc: 'On AI-optimized vs. baseline content' },
      { value: '4.7×', label: 'SEO Traffic', desc: 'Organic traffic growth in 6 months' },
    ],
    pricing: [
      {
        plan: 'Creator',
        price: '$79/mo',
        desc: 'For solo marketers and small teams producing content regularly.',
        highlighted: false,
        features: [
          '1 user',
          '50,000 AI words/month',
          '5 brand voice profiles',
          'SEO optimizer',
          'Blog, social & email formats',
          'Export to Google Docs / Word',
          'Email support',
        ],
      },
      {
        plan: 'Team',
        price: '$349/mo',
        desc: 'For content teams that need collaboration, scale, and performance tracking.',
        highlighted: true,
        features: [
          'Up to 10 users',
          'Unlimited AI words',
          '25 brand voice profiles',
          'Performance analytics integration',
          'Content repurposing engine',
          'Multi-channel publishing',
          'CMS integrations (WordPress, Webflow)',
          'Priority support',
        ],
      },
      {
        plan: 'Agency',
        price: '$899/mo',
        desc: 'For agencies and enterprise marketing teams managing multiple brands.',
        highlighted: false,
        features: [
          'Unlimited users',
          'Unlimited brand voice profiles',
          'White-label client workspaces',
          'Custom LLM fine-tuning per brand',
          'API access for workflow automation',
          'Dedicated account manager',
          'Custom integrations',
        ],
      },
    ],
    faq: [
      {
        q: 'How does AI Content Buddy differ from ChatGPT or Jasper?',
        a: 'The key difference is brand voice training and performance feedback loops. Generic AI writers produce generic output. AI Content Buddy learns your specific tone, trains on your best performers, and gets smarter from your actual engagement data — content improves over time rather than staying static.',
      },
      {
        q: 'Will search engines penalize AI-generated content?',
        a: 'Google\'s guidance is clear: helpful, high-quality content ranks regardless of how it was produced. AI Content Buddy is designed to produce genuinely useful content — not keyword-stuffed filler. Our SEO optimizer ensures content meets E-E-A-T quality standards.',
      },
      {
        q: 'Can I train it on a highly technical or niche subject area?',
        a: 'Yes. Enterprise and Agency plans include custom fine-tuning on domain-specific content. We can train on your product documentation, technical whitepapers, and industry terminology to ensure accurate, expert-level output.',
      },
      {
        q: 'Does content go through any human review before publishing?',
        a: 'AI Content Buddy never publishes automatically — every piece goes through human review before it reaches your audience. Think of it as a first-draft machine that eliminates the blank-page problem, not a replacement for editorial judgment.',
      },
    ],
  },
];

export default PRODUCTS;
