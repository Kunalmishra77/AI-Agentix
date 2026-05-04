import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

// ── DATA INJECTION (Normally imported, here hardcoded for self-containment) ──

const SERVICES_DETAIL = [
  { title: 'AI Consulting', tagline: 'Strategic AI guidance that transforms your business from the ground up', overview: 'We help enterprise leaders cut through the AI hype and identify where artificial intelligence will deliver real, measurable value. Our consultants combine deep technical expertise with business strategy to build AI roadmaps that are practical, scalable, and aligned with your goals.' },
  { title: 'Generative AI Consulting', tagline: 'Lead the GenAI revolution with expert strategy built for enterprise scale', overview: 'Generative AI is the most transformative technology of our era — and most enterprises are unprepared to harness it strategically. We help you cut through the noise, select the right models and architectures, build responsible AI governance, and deploy GenAI applications that genuinely transform how your organisation operates.' },
  { title: 'AI Agents Development', tagline: 'Build autonomous AI agents that work 24/7 to deliver business outcomes', overview: 'AI agents are the next frontier of enterprise automation — systems that plan, reason, use tools, and complete complex tasks without human handholding. We build production-ready agents powered by the latest LLMs, with robust error handling, observability, and human-in-the-loop controls that make them trustworthy in real-world operations.' },
  { title: 'Big Data Consulting', tagline: 'Unlock actionable intelligence from petabyte-scale data at enterprise speed', overview: 'Modern enterprises generate more data than their legacy systems can process. We design and build big data platforms that ingest, store, process, and serve insights at scale — using cloud-native architectures that grow with your business and keep your analysts focused on insight, not infrastructure.' },
  { title: 'Business Intelligence Services', tagline: 'Transform raw data into decisions your entire organisation can act on', overview: 'Most organisations drown in data but starve for insight. We build modern BI ecosystems — from semantic data models to interactive executive dashboards — that give every decision-maker instant access to the metrics that matter most, without waiting for IT or running complex queries.' },
  { title: 'Data Engineering Services', tagline: 'Build the data infrastructure that makes every AI and analytics initiative possible', overview: 'Every AI model and analytics dashboard is only as good as the data feeding it. We build robust, observable data pipelines and modern data platforms that deliver clean, timely, and trusted data to every consumer — from analysts running ad-hoc queries to ML models serving real-time predictions.' },
  { title: 'Machine Learning Consulting', tagline: 'Build and deploy ML models that predict, classify, and optimise at enterprise scale', overview: 'We build machine learning models that solve real business problems — not Kaggle benchmarks. From feature engineering through to production serving, our ML engineers design systems that perform reliably in the messy, unpredictable real world, with monitoring to catch model drift before it costs you.' },
  { title: 'MLOps Consulting', tagline: 'Operationalise your ML models with the discipline and reliability of elite software engineering', overview: 'Most ML models never make it to production — and of those that do, most degrade silently. We build MLOps platforms that automate the entire lifecycle from model registry to production serving, with continuous monitoring and automated retraining that keep your models performing at peak accuracy as the world changes.' },
];

const SOLUTIONS_DETAIL = [
  { title: 'AI Document Processing', tagline: 'Transform unstructured documents into structured, actionable data — automatically.', overview: 'Our AI Document Processing solution ingests documents in any format — PDFs, scanned images, Word files, and emails — and converts them into clean, structured data your systems can act on. Powered by fine-tuned large language models and enterprise-grade OCR, it handles everything from invoices and contracts to medical records and compliance filings.' },
  { title: 'AI-Powered Knowledge Base', tagline: 'Give every employee instant access to your organization\'s collective intelligence.', overview: 'The AI-Powered Knowledge Base solution aggregates content from every corner of your enterprise — SharePoint, Confluence, Notion, Salesforce, internal databases, and email archives — and makes it instantly queryable through a natural-language interface.' },
  { title: 'Enterprise Generative AI Platform', tagline: 'A governed, scalable foundation to deploy and manage generative AI across your entire organization.', overview: 'The Enterprise Generative AI Platform is a full-stack solution that gives your organization a single, governed control plane for all AI workloads. It abstracts across foundation models from OpenAI, Anthropic, Google, and open-source providers so teams can choose the right model for each task while central IT maintains visibility, cost control, and compliance.' },
  { title: 'Computer Vision Solutions', tagline: 'Teach machines to see, understand, and act on visual data from any camera or sensor.', overview: 'Our Computer Vision Solutions practice designs and deploys custom vision models that can detect, classify, segment, and track objects in images and video streams at production scale.' },
];

const PRODUCTS_DETAIL = [
  { name: 'AI Sales Buddy', tagline: 'Your AI-powered revenue engine — automating prospecting, personalizing outreach, and accelerating pipeline from first touch to close.', overview: 'AI Sales Buddy researches prospects in seconds, writes personalized outreach that sounds human, qualifies inbound leads automatically, and surfaces the right intelligence at the right moment in every deal.' },
  { name: 'AI Business Buddy', tagline: 'The AI operations co-pilot for growing businesses — automating workflows, surfacing insights, and making your entire team more productive.', overview: 'AI Business Buddy is the intelligent operations layer for your company. Connect it to your tools, docs, and data — then ask it anything. It answers questions from your internal knowledge base, automates repetitive operational workflows, and generates reports and summaries on demand.' },
  { name: 'AI Content Buddy', tagline: 'Create on-brand, high-converting content at 10× speed — from blog posts and social to ad copy, email campaigns, and everything in between.', overview: 'AI Content Buddy is a brand-aware content engine that learns your voice, your audience, and your goals, then produces content that performs.' },
];

const INDUSTRIES_DETAIL = [
  { title: 'Healthcare & Life Sciences', tagline: 'Accelerating diagnostics, streamlining clinical workflows, and personalizing patient care.', overview: 'AI Agentix brings purpose-built AI to clinical and operational teams, enabling them to focus on what matters most: patient outcomes. From predictive diagnostics and NLP-driven documentation to clinical decision support.' },
  { title: 'Financial Services & FinTech', tagline: 'Transforming risk management, fraud detection, and customer intelligence.', overview: 'We help banks, insurers, wealth managers, and payment platforms deploy AI that is not only powerful but auditable, fair, and built to meet compliance standards (SR 11-7, GDPR, AML/KYC).' },
  { title: 'Retail & E-Commerce', tagline: 'Powering hyper-personalization, intelligent inventory management, and AI-driven customer journeys.', overview: 'AI Agentix helps retailers deploy AI that turns data into competitive advantage across every touchpoint — from recommendation engines to demand forecasting.' },
  { title: 'Manufacturing & Industry 4.0', tagline: 'Connecting the factory floor to the intelligence layer — predictive maintenance and quality AI.', overview: 'We bridge the OT/IT divide — bringing machine learning to the factory floor through robust, scalable architectures that work in high-latency, constrained environments.' },
];

const CASE_STUDIES = [
  { client: 'Stackflow Inc.', title: 'Autonomous Lead Generation Engine for a SaaS Startup', challenge: 'A B2B SaaS startup was spending 40 hours/week on manual outbound prospecting.', solution: 'Multi-agent system that scrapes, qualifies, enriches, and sequences outbound leads.', result: '78 qualified meetings in the first 6 weeks, a 3.9× improvement.' },
  { client: 'Velora Platform', title: '24/7 AI Support Agent for a 50,000-User Platform', challenge: 'Growing support ticket volume was drowning a 12-person team.', solution: 'RAG-powered support agent trained on 12,000+ tickets and help docs.', result: '74% autonomous resolution rate. CSAT improved from 3.4 to 4.7.' },
  { client: 'BrightWave Agency', title: 'End-to-End n8n Automation for a Digital Marketing Agency', challenge: 'Account managers were spending 26+ hours per week on manual reporting.', solution: 'Built a 47-node n8n workflow connecting HubSpot, Asana, Slack, and Xero.', result: '26 hours/week reclaimed per account manager.' },
];

// ── DOCUMENT BUILDING ──

const children = [];

// Header
children.push(new Paragraph({ text: "AI Agentix — Full Website Content Master File", heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }));
children.push(new Paragraph({ text: "Generated Date: May 1, 2026", alignment: AlignmentType.CENTER }));
children.push(new Paragraph({ text: "Contact: hello@ai-agentix.com | Website: ai-agentix-opal.vercel.app", alignment: AlignmentType.CENTER, spacing: { after: 400 } }));

// 1. HOME PAGE
children.push(new Paragraph({ text: "SECTION 1: HOME PAGE CONTENT", heading: HeadingLevel.HEADING_1 }));
children.push(new Paragraph({ children: [new TextRun({ text: "Hero Tagline: ", bold: true }), new TextRun("AI Solution provider & Big Data Experts Company")] }));
children.push(new Paragraph({ children: [new TextRun({ text: "Hero Headline: ", bold: true }), new TextRun("Driving changes through AI & Agentic Automation")] }));
children.push(new Paragraph({ children: [new TextRun({ text: "Hero Subtitle: ", bold: true }), new TextRun("We build autonomous agents that reason, plan, and act to solve complex business challenges.")] }));
children.push(new Paragraph({ text: "Section: Core Capabilities", heading: HeadingLevel.HEADING_2 }));
children.push(new Paragraph({ text: "• AI Consulting: Create the AI strategy with expert guidance." }));
children.push(new Paragraph({ text: "• Generative AI Development: Leverage cutting-edge generative AI to power products." }));
children.push(new Paragraph({ text: "• AI Business Buddy: AI-Driven Knowledge Management for your team." }));
children.push(new Paragraph({ text: "• Computer Vision: Empower systems to interpret visual data." }));
children.push(new Paragraph({ text: "• Data Engineering: Transform raw data into actionable insights." }));
children.push(new Paragraph({ text: "• MLOps: Streamline your ML lifecycle from development to production." }));
children.push(new Paragraph({ spacing: { after: 400 } }));

// 2. ABOUT PAGE
children.push(new Paragraph({ text: "SECTION 2: ABOUT US (COMPANY STORY)", heading: HeadingLevel.HEADING_1 }));
children.push(new Paragraph({ text: "Headline: We Build AI That Actually Works", heading: HeadingLevel.HEADING_2 }));
children.push(new Paragraph({ text: "Description: We are a global team of engineers, architects, and AI specialists obsessed with shipping production-grade AI systems that create real business value — not demos, not decks, not hype." }));
children.push(new Paragraph({ text: "Our Mission:", bold: true }));
children.push(new Paragraph({ text: "AI Agentix exists to close the gap between AI potential and business reality. We partner with forward-thinking companies to design, build, and operate AI systems that actually move the needle — automating workflows, augmenting teams, and unlocking revenue." }));
children.push(new Paragraph({ text: "Core Values:", bold: true }));
children.push(new Paragraph({ text: "1. Engineers, not consultants: We write the code. We own the deployment. We fix the bugs." }));
children.push(new Paragraph({ text: "2. Production-first mindset: Every solution is built to run reliably at scale." }));
children.push(new Paragraph({ text: "3. No AI hype: We measure success in ROI and automation hours." }));
children.push(new Paragraph({ text: "4. Transparency: Clear pricing, honest timelines, and shared knowledge." }));
children.push(new Paragraph({ spacing: { after: 400 } }));

// 3. SERVICES (The 8 Detailed ones)
children.push(new Paragraph({ text: "SECTION 3: CORE SERVICES PROFILES", heading: HeadingLevel.HEADING_1 }));
SERVICES_DETAIL.forEach(s => {
  children.push(new Paragraph({ text: s.title, heading: HeadingLevel.HEADING_2 }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Tagline: ", bold: true }), new TextRun(s.tagline)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Overview: ", bold: true }), new TextRun(s.overview)] }));
  children.push(new Paragraph({ spacing: { after: 200 } }));
});

// 4. SOLUTIONS
children.push(new Paragraph({ text: "SECTION 4: SPECIALIZED AI SOLUTIONS", heading: HeadingLevel.HEADING_1 }));
SOLUTIONS_DETAIL.forEach(s => {
  children.push(new Paragraph({ text: s.title, heading: HeadingLevel.HEADING_2 }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Tagline: ", bold: true }), new TextRun(s.tagline)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Overview: ", bold: true }), new TextRun(s.overview)] }));
  children.push(new Paragraph({ spacing: { after: 200 } }));
});

// 5. PRODUCTS
children.push(new Paragraph({ text: "SECTION 5: PRODUCT SUITE", heading: HeadingLevel.HEADING_1 }));
PRODUCTS_DETAIL.forEach(p => {
  children.push(new Paragraph({ text: p.name, heading: HeadingLevel.HEADING_2 }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Tagline: ", bold: true }), new TextRun(p.tagline)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Overview: ", bold: true }), new TextRun(p.overview)] }));
  children.push(new Paragraph({ spacing: { after: 200 } }));
});

// 6. INDUSTRIES
children.push(new Paragraph({ text: "SECTION 6: INDUSTRY EXPERTISE", heading: HeadingLevel.HEADING_1 }));
INDUSTRIES_DETAIL.forEach(i => {
  children.push(new Paragraph({ text: i.title, heading: HeadingLevel.HEADING_2 }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Tagline: ", bold: true }), new TextRun(i.tagline)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Overview: ", bold: true }), new TextRun(i.overview)] }));
  children.push(new Paragraph({ spacing: { after: 200 } }));
});

// 7. CASE STUDIES
children.push(new Paragraph({ text: "SECTION 7: CASE STUDIES (CLIENT SUCCESS)", heading: HeadingLevel.HEADING_1 }));
CASE_STUDIES.forEach(cs => {
  children.push(new Paragraph({ text: cs.client, heading: HeadingLevel.HEADING_2 }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Project: ", bold: true }), new TextRun(cs.title)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "The Challenge: ", bold: true }), new TextRun(cs.challenge)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "Our Solution: ", bold: true }), new TextRun(cs.solution)] }));
  children.push(new Paragraph({ children: [new TextRun({ text: "The Result: ", bold: true }), new TextRun(cs.result)] }));
  children.push(new Paragraph({ spacing: { after: 200 } }));
});

// 8. CONTACT & PROCESS
children.push(new Paragraph({ text: "SECTION 8: CONTACT & OPERATIONAL INFO", heading: HeadingLevel.HEADING_1 }));
children.push(new Paragraph({ text: "Contact Headline: Let's Build Something Great", heading: HeadingLevel.HEADING_2 }));
children.push(new Paragraph({ text: "Our Engagement Process:", bold: true }));
children.push(new Paragraph({ text: "01. Discovery Call: We understand your data, stack, and goals." }));
children.push(new Paragraph({ text: "02. Strategy & Scoping: We design the solution architecture and PoC plan." }));
children.push(new Paragraph({ text: "03. Build & Iterate: Weekly demos and transparent progress tracking." }));
children.push(new Paragraph({ text: "04. Deployment & Scale: We ship to production and optimize." }));
children.push(new Paragraph({ text: "Trust Badges:", bold: true }));
children.push(new Paragraph({ text: "• NDA First: We sign NDAs before discussing any sensitive data." }));
children.push(new Paragraph({ text: "• Fixed Price PoCs: Guaranteed scope and budget." }));
children.push(new Paragraph({ text: "• Enterprise Security: SOC 2 compliant workflows." }));

const doc = new Document({
  sections: [{ properties: {}, children }]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("AI-Agentix-Complete-Master-Content.docx", buffer);
  console.log("📄 Comprehensive Word document created: AI-Agentix-Complete-Master-Content.docx");
});