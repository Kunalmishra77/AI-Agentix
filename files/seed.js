// scripts/seed.js — Run: node scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify';
import {
  Post, CaseStudy, Service, Client, Resource, TeamMember, Award, Admin
} from '../models/index.js';

dotenv.config({ path: '../.env' });

const makeSlug = (s) => slugify(s, { lower:true, strict:true });

const SERVICES = [
  { title:'AI Consulting & Strategy',       category:'Discover',     shortDesc:'Chart a clear AI roadmap aligned to your business goals, budget, and team capabilities.' },
  { title:'AI Proof of Concept',            category:'Discover',     shortDesc:'Validate your AI idea with a working prototype before committing to full development.' },
  { title:'AI Agents Development',          category:'Develop',      shortDesc:'Build networks of autonomous agents that think, decide, and execute complex multi-step tasks.' },
  { title:'n8n Workflow Automation',        category:'Develop',      shortDesc:'Design intelligent, modular n8n workflows that connect every tool in your stack.' },
  { title:'LLM Integration Services',       category:'Develop',      shortDesc:'Integrate OpenAI, Anthropic, and open-source LLMs into your products and internal tools.' },
  { title:'Generative AI Development',      category:'Develop',      shortDesc:'Build custom generative AI applications trained on your data and aligned to your workflows.' },
  { title:'Custom AI Chatbot Development',  category:'Develop',      shortDesc:'Deploy context-aware conversational agents trained on your business knowledge base.' },
  { title:'Data Engineering Services',      category:'Organize Data',shortDesc:'Build robust data pipelines, warehouses, and infrastructure for data-driven decisions.' },
  { title:'AI Integration Services',        category:'Deploy',       shortDesc:'Connect AI capabilities to your existing CRM, ERP, and SaaS tools via robust APIs.' },
  { title:'MLOps Consulting',               category:'Deploy',       shortDesc:'Streamline your ML lifecycle from development to production with reliable monitoring.' },
  { title:'AI Advisory Services',           category:'Deploy',       shortDesc:'Ongoing strategic AI guidance to help you navigate model selection and governance.' },
  { title:'AI Test Automation',             category:'Deploy',       shortDesc:'Automated testing frameworks for AI systems, ensuring reliability and performance.' },
].map((s,i) => ({ ...s, slug: makeSlug(s.title), order: i, active: true }));

const CASE_STUDIES = [
  {
    title: 'Autonomous Lead Generation Engine for a SaaS Startup',
    client: 'Stackflow Inc.',
    industry: 'SaaS & Technology',
    service: 'AI Agents Development',
    challenge: 'A B2B SaaS startup was spending 40 hours/week on manual outbound prospecting with a 4-person BDR team generating only 20 qualified meetings per month.',
    solution: 'We built a multi-agent system that scrapes, qualifies, enriches, and sequences outbound leads — autonomously writing personalized emails and scheduling follow-ups.',
    result: 'The system replaced the BDR team\'s prospecting work and delivered 78 qualified meetings in the first 6 weeks, a 3.9× improvement.',
    quote: { text:'The system doesn\'t just find leads — it understands them. We went from 20 meetings/month to 78 in 6 weeks.', author:'James Whitfield', role:'CEO' },
    metrics: [{ value:'3.9×', label:'Increase in qualified meetings' },{ value:'40h', label:'Weekly hours saved' },{ value:'6wk', label:'Time to full ROI' }],
    featured: true,
  },
  {
    title: '24/7 AI Support Agent for a 50,000-User Platform',
    client: 'Velora Platform',
    industry: 'SaaS & Technology',
    service: 'Custom AI Chatbot Development',
    challenge: 'Growing support ticket volume was drowning a 12-person team. Average response time was 8 hours. CSAT scores were declining.',
    solution: 'Deployed a RAG-powered support agent trained on 12,000+ tickets, help docs, and product knowledge. Integrated directly into Intercom and Slack.',
    result: '74% autonomous resolution rate. CSAT improved from 3.4 to 4.7 in 30 days. Support team refocused on complex, high-value issues.',
    quote: { text:'Our CSAT went from 3.4 to 4.7 within 30 days. The agent handles nuance that we thought only humans could manage.', author:'Maria Chen', role:'Head of Product' },
    metrics: [{ value:'74%', label:'Autonomous ticket resolution' },{ value:'4.7★', label:'CSAT (up from 3.4)' },{ value:'30d', label:'Time to full impact' }],
    featured: true,
  },
  {
    title: 'End-to-End n8n Automation for a Digital Marketing Agency',
    client: 'BrightWave Agency',
    industry: 'Marketing Agencies',
    service: 'n8n Workflow Automation',
    challenge: 'Account managers were spending 26+ hours per week on manual reporting, onboarding documents, invoice generation, and client communication.',
    solution: 'Built a 47-node n8n workflow connecting HubSpot, Asana, Slack, Xero, and Google Workspace. Automated the entire client lifecycle from onboarding to billing.',
    result: '26 hours/week reclaimed per account manager. Full ROI achieved in 3 weeks.',
    quote: { text:'What used to take our team an entire Monday morning now happens automatically at midnight Sunday.', author:'Raj Patel', role:'Operations Director' },
    metrics: [{ value:'26h', label:'Hours saved per week/AM' },{ value:'100%', label:'Automated reporting' },{ value:'3wk', label:'Time to ROI' }],
    featured: true,
  },
  {
    title: 'Intelligent Contract Analysis System for a Legal Firm',
    client: 'Prismatic Legal',
    industry: 'Finance & Insurance',
    service: 'LLM Integration Services',
    challenge: 'Legal associates spent 70% of their time on rote extraction of key clauses, dates, and risk flags from thousands of contract documents.',
    solution: 'Built a document intelligence pipeline that ingests, classifies, extracts clauses, and flags risk indicators — integrated into their existing document management system.',
    result: 'Contract review time reduced by 68%. Associates now focus entirely on legal strategy.',
    quote: { text:'Our associates were spending 70% of their time on rote extraction. Now they spend it on actual legal strategy.', author:'Sarah Okonkwo', role:'Managing Partner' },
    metrics: [{ value:'68%', label:'Reduction in review time' },{ value:'99.2%', label:'Extraction accuracy' },{ value:'70%', label:'Associate time freed' }],
    featured: false,
  },
].map((cs, i) => ({ ...cs, slug: makeSlug(cs.title), order: i, status: 'published' }));

const CLIENTS = [
  'Nexus AI', 'BrightWave', 'Stackflow', 'Velora', 'Prismatic Legal',
  'DataForge', 'Orbix Systems', 'Synthex', 'Luminary', 'CloudNine',
  'HiveTech', 'Acme Corp', 'TechNova', 'ScaleAI', 'FlowBridge',
].map((name, i) => ({ name, logo: `/assets/clients/${makeSlug(name)}.svg`, order: i, active: true }));

const AWARDS = [
  { name:'Top AI Agency 2025', issuer:'Clutch', year:2025, order:0 },
  { name:'Clutch Top 1000', issuer:'Clutch', year:2025, order:1 },
  { name:'Fastest Growing AI Company', issuer:'G2', year:2024, order:2 },
  { name:'n8n Partner Agency', issuer:'n8n', year:2024, order:3 },
  { name:'Forbes AI Spotlight', issuer:'Forbes', year:2024, order:4 },
  { name:'Top Automation Agency', issuer:'GoodFirms', year:2025, order:5 },
].map(a => ({ ...a, active: true }));

const POSTS = [
  {
    title: 'Why Agentic AI Is the Next Platform Shift — And How to Position Your Business',
    excerpt: 'The move from prompt-response AI to goal-directed autonomous agents represents a fundamental architectural shift. Here\'s what it means for your operations.',
    content: '<p>Full article content here...</p>',
    categories: ['Agentic AI', 'Strategy'],
    author: { name:'AI Agentix Team', role:'Research Team' },
    status: 'published', featured: true, readTime: 12,
  },
  {
    title: 'n8n vs Zapier vs Make: Which Automation Platform Is Right for Enterprise in 2026?',
    excerpt: 'A deep-dive comparison of the three leading workflow automation platforms, based on 50+ real enterprise deployments.',
    content: '<p>Full article content here...</p>',
    categories: ['n8n Automation', 'Tools'],
    author: { name:'AI Agentix Team', role:'Engineering' },
    status: 'published', featured: false, readTime: 8,
  },
  {
    title: 'RAG in Production: Why 80% of Implementations Fail and How to Be in the 20%',
    excerpt: 'Retrieval Augmented Generation sounds simple. In production it\'s anything but. Here are the failure patterns we see — and how to avoid them.',
    content: '<p>Full article content here...</p>',
    categories: ['LLM Integration', 'Engineering'],
    author: { name:'AI Agentix Team', role:'AI Engineering' },
    status: 'published', featured: false, readTime: 10,
  },
].map(p => ({ ...p, slug: makeSlug(p.title), publishedAt: new Date() }));

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing
  await Promise.all([
    Post.deleteMany(), CaseStudy.deleteMany(), Service.deleteMany(),
    Client.deleteMany(), Award.deleteMany(),
  ]);
  console.log('🗑️  Cleared existing data');

  // Insert fresh data
  await Service.insertMany(SERVICES);     console.log(`✅ ${SERVICES.length} services seeded`);
  await CaseStudy.insertMany(CASE_STUDIES); console.log(`✅ ${CASE_STUDIES.length} case studies seeded`);
  await Client.insertMany(CLIENTS);       console.log(`✅ ${CLIENTS.length} clients seeded`);
  await Award.insertMany(AWARDS);         console.log(`✅ ${AWARDS.length} awards seeded`);
  await Post.insertMany(POSTS);           console.log(`✅ ${POSTS.length} posts seeded`);

  // Admin user
  const adminExists = await Admin.countDocuments();
  if (!adminExists) {
    await Admin.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@ai-agentix.com',
      password: process.env.ADMIN_PASSWORD || 'Change-Me-Now-123!',
      role: 'superadmin',
    });
    console.log('✅ Admin user created');
  }

  console.log('\n🎉 Database seeded successfully!');
  process.exit(0);
}

seed().catch(err => { console.error('❌ Seed failed:', err); process.exit(1); });
