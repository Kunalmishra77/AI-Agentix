// scripts/seed.js — Run: node scripts/seed.js
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../.env') });

import pg from 'pg';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const sl = (s) => slugify(s, { lower: true, strict: true });

const SERVICES = [
  { title: 'AI Consulting & Strategy',      tagline: 'Chart a clear AI roadmap',                icon: '🧠', features: ['AI readiness assessment', 'Technology selection', 'ROI modeling', 'Change management'],       sort: 1 },
  { title: 'AI Agents Development',         tagline: 'Autonomous agents that execute',          icon: '🤖', features: ['Multi-agent systems', 'Tool-use agents', 'Autonomous pipelines', 'LangChain & AutoGen'],      sort: 2 },
  { title: 'n8n Workflow Automation',       tagline: 'No-code automation at scale',             icon: '⚡', features: ['500+ integrations', 'Custom node dev', 'Self-hosted setup', 'API orchestration'],              sort: 3 },
  { title: 'LLM Integration',               tagline: 'Connect LLMs to your stack',              icon: '🔗', features: ['OpenAI / Claude / Gemini', 'Fine-tuning', 'RAG pipelines', 'Prompt engineering'],              sort: 4 },
  { title: 'Generative AI Development',     tagline: 'Creative AI for real applications',       icon: '✨', features: ['Image generation', 'Content creation', 'Synthetic data', 'Media AI'],                         sort: 5 },
  { title: 'Custom AI Chatbots',            tagline: 'Intelligent assistants, your brand',      icon: '💬', features: ['Multi-channel deployment', 'Context retention', 'CRM integration', 'Analytics'],               sort: 6 },
  { title: 'Data Engineering',              tagline: 'AI-ready data infrastructure',            icon: '📊', features: ['ETL pipelines', 'Data lakes', 'Real-time streaming', 'Vector databases'],                      sort: 7 },
  { title: 'AI Integration Services',       tagline: 'Connect AI to every system',              icon: '🔌', features: ['REST & GraphQL', 'Legacy modernisation', 'ERP/CRM connectors', 'Event-driven'],                sort: 8 },
  { title: 'MLOps Consulting',              tagline: 'Ship models faster, more reliably',       icon: '🚀', features: ['CI/CD for ML', 'Model monitoring', 'Drift detection', 'Scalable inference'],                   sort: 9 },
];

const CASE_STUDIES = [
  {
    title: 'Autonomous Lead Generation Engine for a SaaS Startup',
    industry: 'SaaS & Technology', client: 'Stackflow Inc.',
    challenge: 'A B2B SaaS startup was spending 40 hours/week on manual outbound prospecting with a 4-person BDR team generating only 20 qualified meetings per month.',
    solution: 'We built a multi-agent system that scrapes, qualifies, enriches, and sequences outbound leads — autonomously writing personalized emails and scheduling follow-ups.',
    result: 'The system delivered 78 qualified meetings in the first 6 weeks, a 3.9× improvement.',
    metrics: [{ value: '3.9×', label: 'Increase in qualified meetings' }, { value: '40h', label: 'Weekly hours saved' }, { value: '6wk', label: 'Time to full ROI' }],
    tags: ['AI Agents', 'LLM Integration'], featured: true,
  },
  {
    title: '24/7 AI Support Agent for a 50,000-User Platform',
    industry: 'SaaS & Technology', client: 'Velora Platform',
    challenge: 'Growing support ticket volume was drowning a 12-person team. Average response time was 8 hours.',
    solution: 'Deployed a RAG-powered support agent trained on 12,000+ tickets, help docs, and product knowledge. Integrated directly into Intercom and Slack.',
    result: '74% autonomous resolution rate. CSAT improved from 3.4 to 4.7 in 30 days.',
    metrics: [{ value: '74%', label: 'Autonomous ticket resolution' }, { value: '4.7★', label: 'CSAT (up from 3.4)' }, { value: '30d', label: 'Time to full impact' }],
    tags: ['Custom Chatbot', 'RAG'], featured: true,
  },
  {
    title: 'End-to-End n8n Automation for a Digital Marketing Agency',
    industry: 'Marketing Agencies', client: 'BrightWave Agency',
    challenge: 'Account managers were spending 26+ hours per week on manual reporting, onboarding documents, invoice generation, and client communication.',
    solution: 'Built a 47-node n8n workflow connecting HubSpot, Asana, Slack, Xero, and Google Workspace.',
    result: '26 hours/week reclaimed per account manager. Full ROI achieved in 3 weeks.',
    metrics: [{ value: '26h', label: 'Hours saved/week per AM' }, { value: '100%', label: 'Automated reporting' }, { value: '3wk', label: 'Time to ROI' }],
    tags: ['n8n Automation'], featured: true,
  },
  {
    title: 'Intelligent Contract Analysis System for a Legal Firm',
    industry: 'Finance & Insurance', client: 'Prismatic Legal',
    challenge: 'Legal associates spent 70% of their time on rote extraction of key clauses, dates, and risk flags.',
    solution: 'Built a document intelligence pipeline that ingests, classifies, extracts clauses, and flags risk indicators.',
    result: 'Contract review time reduced by 68%. Associates now focus entirely on legal strategy.',
    metrics: [{ value: '68%', label: 'Reduction in review time' }, { value: '99.2%', label: 'Extraction accuracy' }],
    tags: ['LLM Integration', 'Data Engineering'], featured: false,
  },
];

const POSTS = [
  {
    title: 'Why Agentic AI Is the Next Platform Shift',
    excerpt: 'The move from prompt-response AI to goal-directed autonomous agents represents a fundamental architectural shift.',
    content: '<p>Autonomous AI agents represent the next frontier in enterprise automation. Unlike traditional RPA tools that follow rigid scripts, modern AI agents can reason, plan, and adapt to unexpected situations.</p><p>In 2024, we saw a massive acceleration in agent deployments across industries—from insurance claims processing to software development.</p>',
    categories: ['Agentic AI', 'Strategy'], tags: ['agents', 'automation'], readTime: 12,
  },
  {
    title: 'n8n vs Zapier vs Make: The Ultimate Comparison for AI Workflows',
    excerpt: 'A deep-dive comparison of the three leading workflow automation platforms, based on 50+ real enterprise deployments.',
    content: '<p>When it comes to automating AI workflows, not all platforms are created equal. n8n is the clear winner for AI-heavy use cases.</p><p>Three reasons: code flexibility, self-hosting, and LLM-native nodes.</p>',
    categories: ['n8n Automation', 'Tools'], tags: ['n8n', 'automation'], readTime: 8,
  },
  {
    title: 'RAG in Production: Why 80% of Implementations Fail',
    excerpt: 'Retrieval Augmented Generation sounds simple. In production it is anything but. Here are the failure patterns we see.',
    content: '<p>RAG is the most powerful pattern for giving LLMs access to your proprietary data. But 80% of production RAG implementations underperform expectations.</p><p>The culprits: poor chunking strategy, no reranking, and ignoring query transformation.</p>',
    categories: ['LLM Integration', 'Engineering'], tags: ['rag', 'llm'], readTime: 10,
  },
];

const CLIENTS = ['Nexus AI', 'BrightWave', 'Stackflow', 'Velora', 'Prismatic Legal', 'DataForge', 'Orbix Systems', 'Synthex', 'Luminary', 'CloudNine'];
const AWARDS = [
  { title: 'Top AI Agency 2025', issuer: 'Clutch', year: 2025, sort: 1 },
  { title: 'Fastest Growing AI Company', issuer: 'G2', year: 2024, sort: 2 },
  { title: 'n8n Partner Agency', issuer: 'n8n', year: 2024, sort: 3 },
  { title: 'Forbes AI Spotlight', issuer: 'Forbes', year: 2024, sort: 4 },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('🌱  Seeding Supabase database...\n');

    // Admin
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 12);
    await client.query(
      `INSERT INTO admins (email, password, name) VALUES ($1,$2,'Admin') ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password`,
      [process.env.ADMIN_EMAIL || 'admin@ai-agentix.com', hash]
    );
    console.log('  ✅  Admin upserted');

    // Services
    for (const s of SERVICES) {
      await client.query(
        `INSERT INTO services (title, slug, tagline, icon, features, is_featured, sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (slug) DO NOTHING`,
        [s.title, sl(s.title), s.tagline, s.icon, s.features, s.sort <= 3, s.sort]
      );
    }
    console.log(`  ✅  ${SERVICES.length} services seeded`);

    // Case studies
    for (const cs of CASE_STUDIES) {
      await client.query(
        `INSERT INTO case_studies (title, slug, industry, client, challenge, solution, result, metrics, tags, is_featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT (slug) DO NOTHING`,
        [cs.title, sl(cs.title), cs.industry, cs.client, cs.challenge, cs.solution, cs.result, JSON.stringify(cs.metrics), cs.tags, cs.featured]
      );
    }
    console.log(`  ✅  ${CASE_STUDIES.length} case studies seeded`);

    // Blog posts
    for (const p of POSTS) {
      await client.query(
        `INSERT INTO posts (title, slug, excerpt, content, categories, tags, author_name, read_time, is_published, published_at) VALUES ($1,$2,$3,$4,$5,$6,'AI Agentix Team',$7,true,now()) ON CONFLICT (slug) DO NOTHING`,
        [p.title, sl(p.title), p.excerpt, p.content, p.categories, p.tags, p.readTime]
      );
    }
    console.log(`  ✅  ${POSTS.length} blog posts seeded`);

    // Clients
    for (let i = 0; i < CLIENTS.length; i++) {
      await client.query(`INSERT INTO clients (name, sort_order) VALUES ($1,$2) ON CONFLICT DO NOTHING`, [CLIENTS[i], i + 1]);
    }
    console.log(`  ✅  ${CLIENTS.length} clients seeded`);

    // Awards
    for (const a of AWARDS) {
      await client.query(`INSERT INTO awards (title, issuer, year, sort_order) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [a.title, a.issuer, a.year, a.sort]);
    }
    console.log(`  ✅  ${AWARDS.length} awards seeded`);

    console.log('\n🎉  Seed complete! Your Supabase DB is ready.');
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => { console.error('❌  Seed failed:', err.message); process.exit(1); });
