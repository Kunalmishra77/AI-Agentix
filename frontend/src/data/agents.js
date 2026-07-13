// Agent detail pages (/technology/:slug).
// Single source of truth for flow + tech + role + desc is technology.js — we import
// the fleet roster from there and layer on page-only content (hero copy, spec card,
// capabilities, integrations, FAQ). No fabricated telemetry — the spec card lists
// honest configuration facts (deploy window, model family, channels), not live counts.

import { agents as fleet } from './technology'

// key -> url slug (matches the Technology mega dropdown links)
const SLUG = {
  sales: 'sales-agent',
  support: 'support-agent',
  analytics: 'analytics-agent',
  content: 'content-agent',
  voice: 'voice-agent',
  hr: 'hr-agent',
  finance: 'finance-agent',
  document: 'document-agent',
}

// key -> hero background image (from the latest Agentix designer set)
const IMAGE = {
  sales: '/images/sales-agent.webp',
  support: '/images/chat-support.webp',
  analytics: '/images/analytics-bi.webp',
  content: '/images/content-engine.webp',
  voice: '/images/voice-agent.webp',
  hr: '/images/hr-recruitment.webp',
  finance: '/images/finance-billing.webp',
  document: '/images/document-ocr.webp',
}

// Page-only content, keyed by agent key.
const EXTRAS = {
  sales: {
    headline: 'The tireless SDR that never lets a lead go cold.',
    chips: ['Lead scoring', 'Auto follow-up', 'CRM sync', 'WhatsApp-first'],
    spec: [
      { label: 'Deploys in', value: '2–4 weeks' },
      { label: 'Runs on', value: 'GPT-4 · fine-tuned' },
      { label: 'Channels', value: 'WhatsApp · Web · Email' },
      { label: 'Escalation', value: 'Routes to rep on intent' },
    ],
    capabilities: [
      { title: 'Capture from every source', desc: 'Website forms, landing pages, WhatsApp, ad leads and CSV uploads flow into one qualified pipeline.' },
      { title: 'Score by real intent', desc: 'A proprietary model ranks each lead on buying signals — not just form fields — so reps work the hottest first.' },
      { title: 'Never-miss follow-up', desc: 'Multi-step sequences fire on the right channel at the right time until the lead responds or is closed.' },
      { title: 'Enrich automatically', desc: 'Company size, industry and role are appended before the lead ever reaches a human.' },
      { title: 'Keep the CRM honest', desc: 'Every touch, reply and status change is written back to HubSpot, Zoho or Salesforce in real time.' },
    ],
    integrations: ['HubSpot', 'Salesforce', 'Zoho CRM', 'WhatsApp Business API', 'Leadsquared', 'Pipedrive', 'Gmail', 'Razorpay'],
    faq: [
      { q: 'Does it replace my sales team?', a: 'No — it removes the grunt work. Qualification, enrichment and follow-up run automatically so your reps spend their day on live, high-intent conversations instead of chasing dead leads.' },
      { q: 'Which CRM does it work with?', a: 'HubSpot, Zoho, Salesforce, Pipedrive and Leadsquared are supported out of the box. Any CRM with an API can be connected on request.' },
      { q: 'How does lead scoring actually work?', a: 'We train a scoring model on your historical won/lost data plus live intent signals (channel, response speed, page activity). It improves as more of your outcomes feed back in.' },
      { q: 'Can it message leads on WhatsApp?', a: 'Yes — it runs on the official WhatsApp Business API, so follow-up sequences are fully compliant and delivered from your verified business number.' },
    ],
  },
  support: {
    headline: 'Resolves the routine, escalates the rest — with full context.',
    chips: ['Ticket triage', 'RAG answers', 'Auto-resolve', 'Smart escalation'],
    spec: [
      { label: 'Deploys in', value: '2–3 weeks' },
      { label: 'Runs on', value: 'RAG + vector search' },
      { label: 'Channels', value: 'Email · Chat · WhatsApp' },
      { label: 'Escalation', value: 'Full context to human' },
    ],
    capabilities: [
      { title: 'Read and classify instantly', desc: 'Every incoming ticket is categorised by topic and scored for urgency the moment it lands.' },
      { title: 'Answer from your knowledge', desc: 'A retrieval pipeline pulls the right answer from your docs and past tickets — grounded, not guessed.' },
      { title: 'Resolve the repeat questions', desc: 'Password resets, order status, how-tos and policy questions are closed automatically, 24/7.' },
      { title: 'Escalate without the re-explaining', desc: 'Complex cases reach a human with the full thread, category and suggested resolution attached.' },
      { title: 'Learn from every correction', desc: 'When an agent edits a reply, that feedback sharpens the next answer through a continuous loop.' },
    ],
    integrations: ['Freshdesk', 'Zendesk', 'Intercom', 'WhatsApp Business API', 'Crisp', 'Slack', 'Gmail', 'Tidio'],
    faq: [
      { q: 'Will customers know they are talking to AI?', a: 'That is your call. You can disclose it, brand it as an assistant, or run it silently in the background to draft replies for human approval.' },
      { q: 'How does it avoid making things up?', a: 'It only answers from your knowledge base and ticket history via a retrieval pipeline. If it cannot find a grounded answer, it escalates instead of guessing.' },
      { q: 'What happens to complex tickets?', a: 'They are escalated to the right human queue with the full conversation, category, urgency and a suggested resolution — so nobody starts from scratch.' },
      { q: 'Which help desks are supported?', a: 'Freshdesk, Zendesk, Intercom, Crisp and Tidio connect directly. Others integrate through their API or via email routing.' },
    ],
  },
  analytics: {
    headline: 'Spots the anomaly before it becomes a bad quarter.',
    chips: ['Anomaly detection', 'Forecasting', 'KPI monitoring', 'Alerts'],
    spec: [
      { label: 'Deploys in', value: '2–4 weeks' },
      { label: 'Runs on', value: 'Time-series + LLM' },
      { label: 'Check cadence', value: 'Every 15 minutes' },
      { label: 'Delivery', value: 'WhatsApp · Email' },
    ],
    capabilities: [
      { title: 'Watch every KPI at once', desc: 'Revenue, spend, traffic, churn and conversion are monitored continuously across all your connected tools.' },
      { title: 'Catch anomalies early', desc: 'Baseline models flag the unexpected within minutes — a spend spike, a conversion drop, a traffic dip.' },
      { title: 'Explain, not just alert', desc: 'Each alert arrives as a plain-language narrative: what changed, by how much, and where to look.' },
      { title: 'Forecast the trend', desc: 'Short-horizon forecasts show where a metric is heading so you can act before the month closes.' },
      { title: 'Deliver where you already are', desc: 'Insights land on WhatsApp or email on a schedule you set — no dashboard-hunting required.' },
    ],
    integrations: ['Google Analytics 4', 'Mixpanel', 'Looker Studio', 'Power BI', 'Metabase', 'Google Sheets', 'Tableau', 'Amplitude'],
    faq: [
      { q: 'Do I need a data team to use it?', a: 'No. You define the KPIs that matter in plain language; the agent handles the modelling, monitoring and narration on its own.' },
      { q: 'Where do the insights get delivered?', a: 'Wherever you work — a WhatsApp thread, an email digest, or both — on a cadence you choose (real-time alerts plus a daily or weekly summary).' },
      { q: 'How does it know what is abnormal?', a: 'It learns a baseline from your own history for each metric, accounting for weekday and seasonal patterns, then flags statistically significant deviations.' },
      { q: 'Which data sources can it read?', a: 'GA4, Mixpanel, Amplitude, Google Sheets and most BI tools connect directly. Custom databases connect via API.' },
    ],
  },
  content: {
    headline: 'From keyword to published post — in your brand voice.',
    chips: ['SEO research', 'Drafting', 'Image generation', 'Auto-publish'],
    spec: [
      { label: 'Deploys in', value: '1–3 weeks' },
      { label: 'Runs on', value: 'Claude / GPT-4 · brand-tuned' },
      { label: 'Publishes to', value: 'CMS + social' },
      { label: 'Review', value: 'Optional human approval' },
    ],
    capabilities: [
      { title: 'Research like a strategist', desc: 'It reads the SERP, studies competing pages and builds an outline designed to rank — before writing a word.' },
      { title: 'Write in your voice', desc: 'Fine-tuned on your existing content, drafts match your tone, terminology and formatting conventions.' },
      { title: 'Illustrate automatically', desc: 'On-brief images are generated and embedded, with alt text written for accessibility and SEO.' },
      { title: 'Ship the metadata too', desc: 'Titles, meta descriptions, slugs and schema are produced alongside the post — nothing left manual.' },
      { title: 'Publish and schedule', desc: 'Approved posts push straight to your CMS and get scheduled across your social channels.' },
    ],
    integrations: ['WordPress', 'Webflow', 'Buffer', 'Meta Ads API', 'Mailchimp', 'Notion', 'Google Workspace', 'Hootsuite'],
    faq: [
      { q: 'Will the content sound generic?', a: 'No — the agent is fine-tuned on your published work, so it inherits your tone, vocabulary and structure. You can keep a human approval step for final polish.' },
      { q: 'Does it handle images too?', a: 'Yes. It generates on-brief visuals, embeds them, and writes descriptive alt text automatically for accessibility and SEO.' },
      { q: 'Can it publish on its own?', a: 'It can auto-publish to your CMS and schedule social posts, or pause at a draft for human approval — you decide the level of autonomy.' },
      { q: 'Which platforms does it publish to?', a: 'WordPress and Webflow for CMS; Buffer and Hootsuite for social scheduling; Mailchimp for email. Others on request.' },
    ],
  },
  voice: {
    headline: 'Answers every call in English or Hindi — day or night.',
    chips: ['Inbound calls', 'Outbound outreach', 'Bilingual', 'CRM logging'],
    spec: [
      { label: 'Deploys in', value: '3–5 weeks' },
      { label: 'Languages', value: 'English · Hindi' },
      { label: 'Telephony', value: 'Exotel · Twilio' },
      { label: 'Latency', value: '< 800ms response' },
    ],
    capabilities: [
      { title: 'Pick up every call', desc: 'No hold music, no missed calls after hours — it answers instantly and handles the conversation end to end.' },
      { title: 'Speak the caller’s language', desc: 'Natural English and Hindi speech, switching to whichever the caller prefers.' },
      { title: 'Book, qualify and answer', desc: 'It schedules appointments, qualifies leads and resolves FAQs without a human on the line.' },
      { title: 'Hand off cleanly', desc: 'When a call needs a person, it transfers with a spoken summary so the human is never caught off guard.' },
      { title: 'Log the outcome', desc: 'Every call is transcribed, summarised and written back to your CRM automatically.' },
    ],
    integrations: ['Exotel', 'Twilio', 'Knowlarity', 'MyOperator', 'WhatsApp Business API', 'HubSpot', 'Google Calendar', 'Servetel'],
    faq: [
      { q: 'Does it sound robotic?', a: 'No — it uses modern neural text-to-speech with sub-800ms latency, so conversations feel natural. Callers can interrupt and it responds in real time.' },
      { q: 'Can it handle both Hindi and English?', a: 'Yes, including natural code-switching mid-call. It detects the caller’s language and responds accordingly.' },
      { q: 'What if the caller needs a human?', a: 'It transfers the call to the right person or team along with a spoken summary of the conversation so far — no repeating for the caller.' },
      { q: 'Which phone systems does it work with?', a: 'Exotel, Twilio, Knowlarity, MyOperator and Servetel are supported. It works on your existing business numbers.' },
    ],
  },
  hr: {
    headline: 'Runs hiring and onboarding without an HR coordinator.',
    chips: ['Resume screening', 'Interview scheduling', 'Onboarding', 'Offer letters'],
    spec: [
      { label: 'Deploys in', value: '2–4 weeks' },
      { label: 'Runs on', value: 'Claude / GPT-4' },
      { label: 'Channels', value: 'WhatsApp · Email' },
      { label: 'Docs', value: 'DigiLocker · DocuSign' },
    ],
    capabilities: [
      { title: 'Screen at scale', desc: 'Every application is parsed and scored against your job criteria — no resume left unread.' },
      { title: 'Message candidates instantly', desc: 'Shortlisted applicants get personalised updates on WhatsApp, and their questions answered around the clock.' },
      { title: 'Schedule without the ping-pong', desc: 'Interview slots are booked automatically against your team’s calendars.' },
      { title: 'Generate offers digitally', desc: 'Offer letters are drafted, sent and e-signed — with the full audit trail retained.' },
      { title: 'Drive onboarding to done', desc: 'The joining checklist, document collection and account setup are tracked to completion.' },
    ],
    integrations: ['Darwinbox', 'Keka', 'Zoho People', 'greytHR', 'Google Calendar', 'DocuSign', 'DigiLocker', 'BambooHR'],
    faq: [
      { q: 'Is resume screening fair?', a: 'It scores against the job criteria you define and surfaces its reasoning for each candidate, so decisions stay transparent and reviewable rather than a black box.' },
      { q: 'How does it talk to candidates?', a: 'Primarily over WhatsApp and email — sending updates, answering FAQs and collecting documents, all in your company’s tone.' },
      { q: 'Can it send offer letters?', a: 'Yes. It generates the letter from your template, sends it for e-signature via DocuSign or DigiLocker, and files the signed copy automatically.' },
      { q: 'Which HRMS does it sync with?', a: 'Darwinbox, Keka, Zoho People, greytHR and BambooHR connect directly; others via API.' },
    ],
  },
  finance: {
    headline: 'Closes the books without the month-end scramble.',
    chips: ['Invoice OCR', 'PO matching', 'Bank reconciliation', 'GST-ready'],
    spec: [
      { label: 'Deploys in', value: '3–5 weeks' },
      { label: 'Runs on', value: 'Document AI + OCR' },
      { label: 'Exports to', value: 'Tally · Zoho Books' },
      { label: 'Compliance', value: 'GSTN-ready' },
    ],
    capabilities: [
      { title: 'Read any invoice', desc: 'Email, WhatsApp or portal — line items, taxes and vendor details are extracted with OCR, no manual entry.' },
      { title: 'Match against POs', desc: 'Every invoice is checked line-by-line against its purchase order and flagged on any discrepancy.' },
      { title: 'Reconcile the bank', desc: 'Statements are matched to your ledger automatically, so unexplained entries surface fast.' },
      { title: 'Prepare GST', desc: 'Tax data is computed and structured for filing, then exported straight to Tally or Zoho Books.' },
      { title: 'Chase payments politely', desc: 'Overdue reminders go out on schedule so receivables don’t slip through the cracks.' },
    ],
    integrations: ['Tally Prime', 'Zoho Books', 'QuickBooks', 'Razorpay', 'GSTN API', 'HDFC Bank', 'Busy Accounting', 'SAP B1'],
    faq: [
      { q: 'Does it work with Tally?', a: 'Yes — GST-ready data and reconciled entries export directly to Tally Prime. Zoho Books, QuickBooks and Busy are also supported.' },
      { q: 'How accurate is the invoice reading?', a: 'It uses enterprise OCR (Google Document AI / Nanonets) and flags anything low-confidence for a quick human check rather than posting it blindly.' },
      { q: 'Can it handle GST filing prep?', a: 'It computes and structures your GST data ready for filing and exports it to your accounting system. Final submission stays with your accountant.' },
      { q: 'Is our financial data secure?', a: 'All data stays on AWS Mumbai, encrypted in transit and at rest, and is never used to train shared models. Full audit logs are retained.' },
    ],
  },
  document: {
    headline: 'Reads the contract, flags the risk, routes for sign-off.',
    chips: ['Clause extraction', 'Risk flagging', 'Plain-language summary', 'E-sign routing'],
    spec: [
      { label: 'Deploys in', value: '2–4 weeks' },
      { label: 'Runs on', value: 'Claude · long-context' },
      { label: 'Handles', value: 'PDF · Word · scans' },
      { label: 'E-sign', value: 'DigiLocker · DocuSign' },
    ],
    capabilities: [
      { title: 'Ingest any format', desc: 'Contracts, NDAs, policies and scanned forms are parsed — layout and tables included — via OCR.' },
      { title: 'Extract the clauses that matter', desc: 'Key terms, obligations, dates and liabilities are pulled out and structured for review.' },
      { title: 'Flag the risk', desc: 'Unusual or high-risk clauses are highlighted against a clause library built for Indian law.' },
      { title: 'Summarise in plain language', desc: 'A one-page summary explains what the document actually commits you to — no legalese.' },
      { title: 'Route for sign-off', desc: 'Documents move to the right approver or straight to e-signature with context pre-filled.' },
    ],
    integrations: ['DocuSign', 'DigiLocker', 'AWS Textract', 'Nanonets', 'Google Document AI', 'Google Workspace', 'Notion', 'Microsoft 365'],
    faq: [
      { q: 'What document types can it read?', a: 'PDFs, Word files and scanned images — including tables and multi-column layouts — thanks to layout-aware OCR.' },
      { q: 'Does it understand Indian contracts?', a: 'It compares clauses against a library built around Indian legal norms and flags terms that deviate, so review is faster and more consistent.' },
      { q: 'Is it a replacement for a lawyer?', a: 'No — it accelerates review by extracting, summarising and flagging. Final legal judgement stays with your counsel, who now works from a clear brief.' },
      { q: 'How does e-signature work?', a: 'Once approved, documents route to DigiLocker or DocuSign for signing, and the executed copy is filed automatically with a full audit trail.' },
    ],
  },
}

// Build the registry: merge fleet roster (name/role/desc/flow/tech/icon) with page extras.
const REGISTRY = fleet.items.reduce((acc, base) => {
  const extra = EXTRAS[base.key]
  if (!extra) return acc
  const slug = SLUG[base.key]
  acc[slug] = {
    slug,
    key: base.key,
    icon: base.icon,
    image: IMAGE[base.key],
    name: base.name,
    role: base.role,
    desc: base.desc,
    flow: base.flow,
    tech: base.tech,
    meta: {
      title: `${base.name} — ${base.role} | AI Agentix`,
      description: `${base.name}: ${base.desc}`,
    },
    ...extra,
  }
  return acc
}, {})

// Ordered list for the "rest of the fleet" navigation.
export const agentIndex = fleet.items
  .filter((b) => SLUG[b.key])
  .map((b) => ({ slug: SLUG[b.key], key: b.key, icon: b.icon, name: b.name, role: b.role }))

export function getAgentPage(slug) {
  return REGISTRY[slug] || null
}
