# Technology · route: /technology · source: frontend/src/pages/marketing/TechnologyPage.jsx

## Meta
- Title: Technology — AI Agentix
- Description: The AI stack behind AI Agentix — agentic AI, RAG pipelines, voice agents, and 200+ integrations. SOC 2 compliant, hosted in India.

## Section: Hero
- Eyebrow: Enterprise-Grade AI Stack
- Heading: The Technology Behind Every Automation
- Body: Purpose-built agentic AI. Not off-the-shelf tools wrapped in a dashboard. Every system we deploy is custom-engineered on a battle-tested stack — hosted in India, compliant with Indian data laws.
- "Live Agent Status" panel: Sales Agent (Processing 47 leads); Support Agent (Resolved 12 tickets today); Voice Agent (On 3 simultaneous calls); Content Agent (Publishing 2 blog articles); HR Agent (Screening 18 resumes); Finance Agent (Processing 9 invoices); Analytics Agent (Monitoring 14 KPI dashboards); Document Agent (Reviewing 3 contracts)
- Status line: All systems operational — 99.97% uptime

## CTAs
- Talk to an Engineer → /contact

## Section: Agent Types (Eight Agents. One Unified Platform.)
- Eyebrow: Agent Types
- Heading: Eight Agents. One Unified Platform.

## Features / Services / Industries (agent type — headline — description — process flow — tech used)
- Sales Agent — "Lead Qualification & Follow-Up" — Ingests leads from every source, scores by intent, routes to the right rep, and executes multi-step follow-up sequences — all without human intervention. Flow: Lead captured from portal/form/WhatsApp → NLP intent classification model runs → Scored & enriched with company data → Routed to rep or automated sequence → CRM updated in real-time. Tech: GPT-4 fine-tuned on sales data; Proprietary intent scoring model; WhatsApp Business API + webhook; HubSpot / Zoho / Salesforce sync.
- Support Agent — "Ticket Resolution & Escalation" — Reads every support ticket, classifies by category and urgency, resolves common issues automatically, and escalates complex cases with full context to your human team. Flow: Ticket ingested from any channel → Classification & urgency scoring → Knowledge base retrieval (RAG) → Auto-resolution or escalation → Learning loop from agent feedback. Tech: RAG pipeline with vector search; Multi-turn conversation memory; Freshdesk / Zendesk API integration; Sentiment analysis for escalation.
- Analytics Agent — "Anomaly Detection & Forecasting" — Continuously monitors business KPIs across all data sources, surfaces anomalies within minutes, forecasts trends, and delivers insights via WhatsApp or email. Flow: Data pulled from all connected tools → Baseline models trained on your data → Anomaly detection runs every 15 min → Insight narratives auto-generated → WhatsApp/email alert delivered. Tech: Time-series anomaly models; LLM-powered insight narrative; Google Analytics / GA4 + Sheets sync; Custom KPI definition engine.
- Content Agent — "Research, Write & Publish" — Takes a keyword or brief, researches competitors, writes a full SEO-optimized post with images, generates metadata, and auto-publishes to your CMS and social accounts. Flow: Keyword/brief input received → SERP research & competitor analysis → Outline + draft generated with brand voice → Image generation & embedding → Auto-publish to CMS + social scheduling. Tech: Claude/GPT-4 with brand fine-tuning; DALL-E 3 / Stable Diffusion images; WordPress / Webflow CMS API; Buffer / Hootsuite social scheduling.
- Voice Agent — "Inbound Calls & Outbound Outreach" — Handles inbound phone calls in English and Hindi — booking appointments, answering FAQs, qualifying leads, and escalating to humans when needed. Flow: Inbound call received (Twilio/Exotel) → Speech-to-text transcription → Intent classification & routing logic → TTS response in caller's language → Call summary logged to CRM. Tech: Whisper ASR for STT; ElevenLabs / Polly for TTS; Exotel / Twilio for telephony; Real-time latency < 800ms.
- HR Agent — "Hiring, Onboarding & HR Ops" — Screens resumes at scale, sends interview invites, answers candidate FAQs via WhatsApp, automates offer letters, and manages the full onboarding checklist — all without an HR coordinator. Flow: JD published, applications collected → Resume parsed & scored vs. JD criteria → Shortlisted candidates messaged on WhatsApp → Interview slots auto-scheduled via Calendar API → Offer letter generated & sent digitally. Tech: LLM-based resume parsing (Claude/GPT-4); Google Calendar / Cal.com API; Darwinbox / Keka / Zoho People sync; DocuSign / DigiLocker for digital docs.
- Finance Agent — "Invoicing, Reconciliation & GST" — Processes incoming invoices, matches line items to POs, flags discrepancies, auto-reconciles bank statements, prepares GST returns, and sends payment reminders — fully automated. Flow: Invoice received (email / WhatsApp / portal) → OCR extraction of line items & vendor data → PO matching & discrepancy detection → Bank reconciliation run against statement → GST data prepared and exported to Tally. Tech: Google Document AI / Nanonets OCR; Tally Prime API integration; Razorpay / HDFC Bank webhook; GST computation engine (GSTN API).
- Document Agent — "Contract Review & Document Processing" — Reads any document — contracts, NDAs, policy files, compliance forms — extracts key clauses, flags risk, generates summaries, and routes for approval with context pre-filled. Flow: Document uploaded (PDF/Word/scan) → OCR + layout parsing applied → Clause extraction & risk classification → Summary generated in plain language → Routed for e-sign or human review. Tech: Claude 3.5 for long-context analysis; Nanonets / AWS Textract OCR; Custom clause library (Indian law); DigiLocker / DocuSign e-signature API.

## Section: The Stack (Built on Best-in-Class Infrastructure)
- Eyebrow: The Stack
- Heading: Built on Best-in-Class Infrastructure
- Layers:
  - AI Models: Claude 3.5 Sonnet, GPT-4o / GPT-4 Turbo, Gemini 1.5 Pro, Llama 3 (on-prem), Mistral 7B (fine-tuned), Sarvam AI (Hindi NLP)
  - Voice Layer: OpenAI Whisper STT, ElevenLabs TTS, Azure Speech Services, Sarvam Indic TTS, Google Cloud Speech-to-Text, Deepgram ASR
  - Agent Runtime: LangChain / LangGraph, Custom RAG Pipeline, Tool-calling Framework, Multi-agent Orchestration, Memory & Context Management, CrewAI Agents
  - Data Layer: Pinecone Vector DB, Weaviate, PostgreSQL / Supabase, Redis Cache, AWS S3 Storage, Google Document AI (OCR), Nanonets OCR
  - Integration Layer: REST / Webhook APIs, n8n Workflow Engine, Zapier / Make (Integromat), WhatsApp Business API, Telephony (Exotel/Twilio), RPA (UiPath / Power Automate)
  - Frontend / Interfaces: React 18 + Vite, Next.js (SSR pages), Framer Motion, WebSockets (real-time), Vercel Edge Deployment, PWA / Mobile-ready
  - Infrastructure: AWS Mumbai (ap-south-1), Docker / Kubernetes (EKS), CI/CD via GitHub Actions, Cloudflare CDN + WAF, Grafana / Datadog Monitoring, PagerDuty Alerts

## Section: Integrations (300+ Tools We Connect With)
- Eyebrow: Integrations
- Heading: 300+ Tools We Connect With
- Categories and tools:
  - CRM: HubSpot, Salesforce, Zoho CRM, Freshsales, Pipedrive, Leadsquared, Kylas
  - Communication: WhatsApp Business API, Slack, Gmail, Outlook, Twilio, Exotel, MSG91, Kaleyra
  - E-commerce: Shopify, WooCommerce, Razorpay, PayU, Cashfree, Instamojo, Paytm Business, Amazon Seller
  - Productivity: Google Workspace, Microsoft 365, Notion, Airtable, ClickUp, Jira, Trello, Monday.com
  - Support: Freshdesk, Zendesk, Intercom, Crisp, Tidio, Helpscout, Gorgias
  - Analytics: Google Analytics 4, Mixpanel, Metabase, Looker Studio, Tableau, Power BI, Amplitude
  - HR / HRMS: Darwinbox, Keka, Zoho People, BambooHR, greytHR, HROne, PeopleStrong
  - Finance / ERP: Tally Prime, Zoho Books, QuickBooks, SAP B1, Oracle NetSuite, Busy Accounting, GSTN API
  - Marketing: Mailchimp, Brevo (Sendinblue), SendGrid, ActiveCampaign, Klaviyo, Google Ads, Meta Ads API
  - Telephony: Exotel, Twilio, Knowlarity, MyOperator, Servetel, Tata Tele, Ozonetel
- Note: "+ More on request" chip shown for every category.

## Section: Security & Compliance (Enterprise Security by Default)
- Eyebrow: Security & Compliance
- Heading: Enterprise Security by Default
- Body: Every AI Agentix deployment meets enterprise security requirements. Your data is never used to train shared models.

## Features / Services / Industries
- End-to-End Encryption: All data encrypted in transit (TLS 1.3) and at rest (AES-256). Encryption keys are rotated quarterly and stored in AWS KMS.
- DPDPA 2023 Compliant: Fully aligned with India's Digital Personal Data Protection Act 2023. Consent management, data minimization, and breach notification within 72 hours.
- Indian Data Residency: All client data stored on AWS Mumbai (ap-south-1). Data never leaves Indian borders without written consent. No cross-border transfer by default.
- Zero Data Sharing: Your data is never used to train models for other clients. Each client gets isolated fine-tuning environments — fully air-gapped from other deployments.
- Real-Time Audit Logs: Every agent action, API call, and data access is logged with a tamper-proof audit trail. Full visibility for compliance and forensic review.
- Role-Based Access Control: Granular RBAC down to field level. SSO support (Google, Microsoft). MFA enforced by default. Access auto-revoked on employee offboarding.

## Section: Final CTA
- Heading: Want a Technical Deep-Dive?
- Body: Book a call with one of our ML engineers. We'll walk through the exact architecture we'd build for your use case.

## CTAs
- Book Tech Discovery Call → /contact
