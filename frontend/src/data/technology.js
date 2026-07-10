// Technology page content — from content-archive/pages/technology.md
// (The archive's fabricated "live agent status" counts are intentionally omitted —
//  no mock/telemetry data. The 8 agents are shown as an honest fleet roster.)

export const meta = {
  title: 'Technology — AI Agentix',
  description: 'The AI stack behind AI Agentix — agentic AI, RAG pipelines, voice agents, and 200+ integrations. SOC 2 compliant, hosted in India.',
}

export const hero = {
  eyebrow: 'Enterprise-Grade AI Stack',
  heading: 'The Technology Behind Every Automation',
  body: 'Purpose-built agentic AI. Not off-the-shelf tools wrapped in a dashboard. Every system we deploy is custom-engineered on a battle-tested stack — hosted in India, compliant with Indian data laws.',
  cta: { label: 'Talk to an Engineer', to: '/contact' },
  trust: ['SOC 2 Compliant', 'DPDPA 2023', 'Hosted in India (AWS Mumbai)', '99.97% uptime SLA'],
  fleetTitle: 'The Agent Fleet',
  fleetNote: 'Eight specialised agents — one unified platform',
}

export const agents = {
  eyebrow: 'Agent Types',
  heading: 'Eight Agents. One Unified Platform.',
  items: [
    { key: 'sales', icon: 'target', name: 'Sales Agent', role: 'Lead Qualification & Follow-Up',
      desc: 'Ingests leads from every source, scores by intent, routes to the right rep, and executes multi-step follow-up sequences — all without human intervention.',
      flow: ['Lead captured from portal / form / WhatsApp', 'NLP intent classification model runs', 'Scored & enriched with company data', 'Routed to rep or automated sequence', 'CRM updated in real-time'],
      tech: ['GPT-4 fine-tuned on sales data', 'Proprietary intent scoring model', 'WhatsApp Business API + webhook', 'HubSpot / Zoho / Salesforce sync'] },
    { key: 'support', icon: 'support', name: 'Support Agent', role: 'Ticket Resolution & Escalation',
      desc: 'Reads every support ticket, classifies by category and urgency, resolves common issues automatically, and escalates complex cases with full context to your human team.',
      flow: ['Ticket ingested from any channel', 'Classification & urgency scoring', 'Knowledge base retrieval (RAG)', 'Auto-resolution or escalation', 'Learning loop from agent feedback'],
      tech: ['RAG pipeline with vector search', 'Multi-turn conversation memory', 'Freshdesk / Zendesk API integration', 'Sentiment analysis for escalation'] },
    { key: 'analytics', icon: 'analytics', name: 'Analytics Agent', role: 'Anomaly Detection & Forecasting',
      desc: 'Continuously monitors business KPIs across all data sources, surfaces anomalies within minutes, forecasts trends, and delivers insights via WhatsApp or email.',
      flow: ['Data pulled from all connected tools', 'Baseline models trained on your data', 'Anomaly detection runs every 15 min', 'Insight narratives auto-generated', 'WhatsApp / email alert delivered'],
      tech: ['Time-series anomaly models', 'LLM-powered insight narrative', 'Google Analytics / GA4 + Sheets sync', 'Custom KPI definition engine'] },
    { key: 'content', icon: 'content', name: 'Content Agent', role: 'Research, Write & Publish',
      desc: 'Takes a keyword or brief, researches competitors, writes a full SEO-optimized post with images, generates metadata, and auto-publishes to your CMS and social accounts.',
      flow: ['Keyword / brief input received', 'SERP research & competitor analysis', 'Outline + draft generated with brand voice', 'Image generation & embedding', 'Auto-publish to CMS + social scheduling'],
      tech: ['Claude / GPT-4 with brand fine-tuning', 'DALL·E 3 / Stable Diffusion images', 'WordPress / Webflow CMS API', 'Buffer / Hootsuite social scheduling'] },
    { key: 'voice', icon: 'voice', name: 'Voice Agent', role: 'Inbound Calls & Outbound Outreach',
      desc: 'Handles inbound phone calls in English and Hindi — booking appointments, answering FAQs, qualifying leads, and escalating to humans when needed.',
      flow: ['Inbound call received (Twilio / Exotel)', 'Speech-to-text transcription', 'Intent classification & routing logic', "TTS response in caller's language", 'Call summary logged to CRM'],
      tech: ['Whisper ASR for STT', 'ElevenLabs / Polly for TTS', 'Exotel / Twilio for telephony', 'Real-time latency < 800ms'] },
    { key: 'hr', icon: 'hr', name: 'HR Agent', role: 'Hiring, Onboarding & HR Ops',
      desc: 'Screens resumes at scale, sends interview invites, answers candidate FAQs via WhatsApp, automates offer letters, and manages the full onboarding checklist — all without an HR coordinator.',
      flow: ['JD published, applications collected', 'Resume parsed & scored vs. JD criteria', 'Shortlisted candidates messaged on WhatsApp', 'Interview slots auto-scheduled via Calendar API', 'Offer letter generated & sent digitally'],
      tech: ['LLM-based resume parsing (Claude / GPT-4)', 'Google Calendar / Cal.com API', 'Darwinbox / Keka / Zoho People sync', 'DocuSign / DigiLocker for digital docs'] },
    { key: 'finance', icon: 'finance', name: 'Finance Agent', role: 'Invoicing, Reconciliation & GST',
      desc: 'Processes incoming invoices, matches line items to POs, flags discrepancies, auto-reconciles bank statements, prepares GST returns, and sends payment reminders — fully automated.',
      flow: ['Invoice received (email / WhatsApp / portal)', 'OCR extraction of line items & vendor data', 'PO matching & discrepancy detection', 'Bank reconciliation run against statement', 'GST data prepared and exported to Tally'],
      tech: ['Google Document AI / Nanonets OCR', 'Tally Prime API integration', 'Razorpay / HDFC Bank webhook', 'GST computation engine (GSTN API)'] },
    { key: 'document', icon: 'document', name: 'Document Agent', role: 'Contract Review & Document Processing',
      desc: 'Reads any document — contracts, NDAs, policy files, compliance forms — extracts key clauses, flags risk, generates summaries, and routes for approval with context pre-filled.',
      flow: ['Document uploaded (PDF / Word / scan)', 'OCR + layout parsing applied', 'Clause extraction & risk classification', 'Summary generated in plain language', 'Routed for e-sign or human review'],
      tech: ['Claude 3.5 for long-context analysis', 'Nanonets / AWS Textract OCR', 'Custom clause library (Indian law)', 'DigiLocker / DocuSign e-signature API'] },
  ],
}

export const stack = {
  eyebrow: 'The Stack',
  heading: 'Built on Best-in-Class Infrastructure',
  layers: [
    { name: 'AI Models', icon: 'bot', tools: ['Claude 3.5 Sonnet', 'GPT-4o / GPT-4 Turbo', 'Gemini 1.5 Pro', 'Llama 3 (on-prem)', 'Mistral 7B (fine-tuned)', 'Sarvam AI (Hindi NLP)'] },
    { name: 'Voice Layer', icon: 'voice', tools: ['OpenAI Whisper STT', 'ElevenLabs TTS', 'Azure Speech Services', 'Sarvam Indic TTS', 'Google Cloud Speech-to-Text', 'Deepgram ASR'] },
    { name: 'Agent Runtime', icon: 'workflow', tools: ['LangChain / LangGraph', 'Custom RAG Pipeline', 'Tool-calling Framework', 'Multi-agent Orchestration', 'Memory & Context Management', 'CrewAI Agents'] },
    { name: 'Data Layer', icon: 'database', tools: ['Pinecone Vector DB', 'Weaviate', 'PostgreSQL / Supabase', 'Redis Cache', 'AWS S3 Storage', 'Google Document AI (OCR)', 'Nanonets OCR'] },
    { name: 'Integration Layer', icon: 'integration', tools: ['REST / Webhook APIs', 'n8n Workflow Engine', 'Zapier / Make (Integromat)', 'WhatsApp Business API', 'Telephony (Exotel / Twilio)', 'RPA (UiPath / Power Automate)'] },
    { name: 'Frontend / Interfaces', icon: 'code', tools: ['React 18 + Vite', 'Next.js (SSR pages)', 'Framer Motion', 'WebSockets (real-time)', 'Vercel Edge Deployment', 'PWA / Mobile-ready'] },
    { name: 'Infrastructure', icon: 'server', tools: ['AWS Mumbai (ap-south-1)', 'Docker / Kubernetes (EKS)', 'CI/CD via GitHub Actions', 'Cloudflare CDN + WAF', 'Grafana / Datadog Monitoring', 'PagerDuty Alerts'] },
  ],
}

export const integrations = {
  eyebrow: 'Integrations',
  heading: '300+ Tools We Connect With',
  more: '+ More on request',
  categories: [
    { name: 'CRM', tools: ['HubSpot', 'Salesforce', 'Zoho CRM', 'Freshsales', 'Pipedrive', 'Leadsquared', 'Kylas'] },
    { name: 'Communication', tools: ['WhatsApp Business API', 'Slack', 'Gmail', 'Outlook', 'Twilio', 'Exotel', 'MSG91', 'Kaleyra'] },
    { name: 'E-commerce', tools: ['Shopify', 'WooCommerce', 'Razorpay', 'PayU', 'Cashfree', 'Instamojo', 'Paytm Business', 'Amazon Seller'] },
    { name: 'Productivity', tools: ['Google Workspace', 'Microsoft 365', 'Notion', 'Airtable', 'ClickUp', 'Jira', 'Trello', 'Monday.com'] },
    { name: 'Support', tools: ['Freshdesk', 'Zendesk', 'Intercom', 'Crisp', 'Tidio', 'Helpscout', 'Gorgias'] },
    { name: 'Analytics', tools: ['Google Analytics 4', 'Mixpanel', 'Metabase', 'Looker Studio', 'Tableau', 'Power BI', 'Amplitude'] },
    { name: 'HR / HRMS', tools: ['Darwinbox', 'Keka', 'Zoho People', 'BambooHR', 'greytHR', 'HROne', 'PeopleStrong'] },
    { name: 'Finance / ERP', tools: ['Tally Prime', 'Zoho Books', 'QuickBooks', 'SAP B1', 'Oracle NetSuite', 'Busy Accounting', 'GSTN API'] },
    { name: 'Marketing', tools: ['Mailchimp', 'Brevo (Sendinblue)', 'SendGrid', 'ActiveCampaign', 'Klaviyo', 'Google Ads', 'Meta Ads API'] },
    { name: 'Telephony', tools: ['Exotel', 'Twilio', 'Knowlarity', 'MyOperator', 'Servetel', 'Tata Tele', 'Ozonetel'] },
  ],
}

export const security = {
  eyebrow: 'Security & Compliance',
  heading: 'Enterprise Security by Default',
  body: 'Every AI Agentix deployment meets enterprise security requirements. Your data is never used to train shared models.',
  items: [
    { icon: 'lock', title: 'End-to-End Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). Encryption keys are rotated quarterly and stored in AWS KMS.' },
    { icon: 'shield', title: 'DPDPA 2023 Compliant', desc: "Fully aligned with India's Digital Personal Data Protection Act 2023. Consent management, data minimization, and breach notification within 72 hours." },
    { icon: 'server', title: 'Indian Data Residency', desc: 'All client data stored on AWS Mumbai (ap-south-1). Data never leaves Indian borders without written consent. No cross-border transfer by default.' },
    { icon: 'eyeoff', title: 'Zero Data Sharing', desc: 'Your data is never used to train models for other clients. Each client gets isolated fine-tuning environments — fully air-gapped from other deployments.' },
    { icon: 'scroll', title: 'Real-Time Audit Logs', desc: 'Every agent action, API call, and data access is logged with a tamper-proof audit trail. Full visibility for compliance and forensic review.' },
    { icon: 'key', title: 'Role-Based Access Control', desc: 'Granular RBAC down to field level. SSO support (Google, Microsoft). MFA enforced by default. Access auto-revoked on employee offboarding.' },
  ],
}

export const finalCta = {
  heading: 'Want a Technical Deep-Dive?',
  body: "Book a call with one of our ML engineers. We'll walk through the exact architecture we'd build for your use case.",
  cta: { label: 'Book Tech Discovery Call', to: '/contact' },
}
