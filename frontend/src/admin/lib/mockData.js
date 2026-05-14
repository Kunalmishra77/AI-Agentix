/* ════════════════════════════════════════════════════════════════
   ADMIN MOCK DATA — Centralized realistic dataset
   Replace each section with real API calls in production
════════════════════════════════════════════════════════════════ */

// ── Dashboard KPIs ──────────────────────────────────────────
export const DASHBOARD_STATS = [
  {
    id: 'users',
    label: 'Total Users',
    value: '3,841',
    raw: 3841,
    delta: '+12.4%',
    deltaDir: 'up',
    color: '#6366F1',
    colorRgb: '99,102,241',
    spark: [42, 48, 44, 61, 58, 72, 68, 80, 76, 91, 88, 95],
  },
  {
    id: 'agents',
    label: 'Active Agents',
    value: '247',
    raw: 247,
    delta: '+18 this week',
    deltaDir: 'up',
    color: '#F97316',
    colorRgb: '249,115,22',
    spark: [120, 138, 145, 162, 170, 188, 195, 212, 220, 235, 241, 247],
  },
  {
    id: 'api_calls',
    label: 'API Calls Today',
    value: '128.4K',
    raw: 128400,
    delta: '+8.4%',
    deltaDir: 'up',
    color: '#06B6D4',
    colorRgb: '6,182,212',
    spark: [58, 72, 65, 88, 84, 104, 98, 116, 108, 124, 120, 128],
  },
  {
    id: 'latency',
    label: 'Avg Response',
    value: '184ms',
    raw: 184,
    delta: '-22ms improved',
    deltaDir: 'up',
    color: '#10B981',
    colorRgb: '16,185,129',
    spark: [230, 218, 225, 208, 214, 200, 196, 210, 198, 190, 187, 184],
  },
  {
    id: 'mrr',
    label: 'Revenue (MRR)',
    value: '$42.8K',
    raw: 42800,
    delta: '+6.1% vs last mo',
    deltaDir: 'up',
    color: '#F97316',
    colorRgb: '249,115,22',
    spark: [28, 30, 29, 33, 32, 36, 35, 38, 37, 40, 41, 42.8],
  },
  {
    id: 'errors',
    label: 'Errors (24h)',
    value: '4',
    raw: 4,
    delta: '-68% vs yesterday',
    deltaDir: 'up',
    color: '#F43F5E',
    colorRgb: '244,63,94',
    spark: [18, 14, 22, 12, 16, 9, 14, 8, 11, 6, 5, 4],
  },
];

// ── API Activity (30-day trend) ──────────────────────────────
export const API_TREND_30D = {
  labels: ['May 14','May 15','May 16','May 17','May 18','May 19','May 20','May 21','May 22','May 23','May 24','May 25','May 26','May 27','May 28','May 29','May 30','May 31','Jun 1','Jun 2','Jun 3','Jun 4','Jun 5','Jun 6','Jun 7','Jun 8','Jun 9','Jun 10','Jun 11','Jun 12'],
  values: [41,48,44,62,58,52,68,72,66,80,76,70,88,85,78,94,90,84,104,98,92,114,108,102,122,118,112,124,120,128],
};

// ── Weekly analytics ─────────────────────────────────────────
export const WEEKLY_ANALYTICS = {
  weeks: ['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12'],
  apiCalls: [28,45,38,62,55,78,71,84,92,88,110,128],
  newUsers: [12,18,9,24,16,31,22,28,35,30,42,48],
  revenue:  [4.2,5.8,5.1,7.4,6.9,9.2,8.7,10.4,11.8,10.9,13.2,14.6],
};

// ── Recent Activity Feed ─────────────────────────────────────
export const ACTIVITY_FEED = [
  { id:1, color:'#6366F1', text:'New user signed up — founder@zenith.ai', time:'2m ago', type:'signup' },
  { id:2, color:'#F59E0B', text:'API rate limit hit — workspace AX-8821', time:'8m ago', type:'warning' },
  { id:3, color:'#10B981', text:'Agent "Content Ops v3" deployed to prod', time:'15m ago', type:'deploy' },
  { id:4, color:'#10B981', text:'Payment received — $1,299 · Enterprise plan', time:'1h ago', type:'payment' },
  { id:5, color:'#F43F5E', text:'Webhook delivery failure — retry 3/3 exhausted', time:'2h ago', type:'error' },
  { id:6, color:'#6366F1', text:'Model updated — claude-opus-4-7 → claude-sonnet-4-6', time:'3h ago', type:'update' },
  { id:7, color:'#10B981', text:'New Enterprise onboarding — Apex Technologies', time:'4h ago', type:'signup' },
  { id:8, color:'#06B6D4', text:'Voice session peak — 48 concurrent users', time:'5h ago', type:'system' },
];

// ── Users ────────────────────────────────────────────────────
export const USERS = [
  { id:'USR-001', name:'Sarah Chen', email:'sarah@techcorp.io', plan:'Enterprise', status:'active', joined:'2025-11-12', agents:12, calls:'48.2K', mrr:'$1,299' },
  { id:'USR-002', name:'Marcus Webb', email:'marcus@growthly.com', plan:'Growth', status:'active', joined:'2026-01-08', agents:6, calls:'24.8K', mrr:'$399' },
  { id:'USR-003', name:'Priya Sharma', email:'priya@finai.co', plan:'Enterprise', status:'active', joined:'2025-12-20', agents:18, calls:'92.1K', mrr:'$1,299' },
  { id:'USR-004', name:'James Thornton', email:'james@nexaworks.io', plan:'Starter', status:'active', joined:'2026-03-15', agents:2, calls:'4.1K', mrr:'$49' },
  { id:'USR-005', name:'Lena Müller', email:'lena@automate.eu', plan:'Growth', status:'suspended', joined:'2026-02-01', agents:4, calls:'18.7K', mrr:'$399' },
  { id:'USR-006', name:'Raj Patel', email:'raj@aiconsult.in', plan:'Enterprise', status:'active', joined:'2025-10-30', agents:22, calls:'128.4K', mrr:'$2,499' },
  { id:'USR-007', name:'Yuki Tanaka', email:'yuki@smartflow.jp', plan:'Growth', status:'active', joined:'2026-04-01', agents:8, calls:'31.6K', mrr:'$399' },
  { id:'USR-008', name:'Ana Sousa', email:'ana@datavine.pt', plan:'Starter', status:'pending', joined:'2026-05-10', agents:0, calls:'0', mrr:'$49' },
];

// ── AI Agents ────────────────────────────────────────────────
export const AGENTS = [
  { id:'AX-0001', name:'Content Ops v3', category:'content', calls:'42.4K', uptime:'99.8%', latency:'188ms', status:'live', owner:'sarah@techcorp.io', tokens:'2.4M', createdAt:'2026-01-15' },
  { id:'AX-0002', name:'Lead Qualifier', category:'sales', calls:'18.2K', uptime:'99.6%', latency:'212ms', status:'live', owner:'marcus@growthly.com', tokens:'892K', createdAt:'2026-02-01' },
  { id:'AX-0003', name:'Support Brain', category:'cx', calls:'31.8K', uptime:'99.9%', latency:'144ms', status:'live', owner:'priya@finai.co', tokens:'1.8M', createdAt:'2025-12-20' },
  { id:'AX-0004', name:'Market Intel', category:'research', calls:'8.4K', uptime:'98.2%', latency:'284ms', status:'degraded', owner:'raj@aiconsult.in', tokens:'420K', createdAt:'2026-03-08' },
  { id:'AX-0005', name:'Invoice Robot', category:'finance', calls:'12.1K', uptime:'100%', latency:'98ms', status:'live', owner:'priya@finai.co', tokens:'340K', createdAt:'2026-01-28' },
  { id:'AX-0006', name:'Growth Engine', category:'marketing', calls:'24.6K', uptime:'99.4%', latency:'168ms', status:'live', owner:'raj@aiconsult.in', tokens:'1.1M', createdAt:'2026-02-14' },
  { id:'AX-0007', name:'Workflow Sync', category:'ops', calls:'6.2K', uptime:'97.8%', latency:'320ms', status:'paused', owner:'yuki@smartflow.jp', tokens:'180K', createdAt:'2026-04-05' },
  { id:'AX-0008', name:'Sprint Planner', category:'product', calls:'4.8K', uptime:'99.1%', latency:'201ms', status:'live', owner:'marcus@growthly.com', tokens:'210K', createdAt:'2026-03-22' },
];

// ── API Endpoints ────────────────────────────────────────────
export const ENDPOINTS = [
  { method:'POST', path:'/api/v1/voice/session', calls:'12,441', p50:'148ms', p99:'410ms', errors:'0.02%', status:'healthy' },
  { method:'POST', path:'/api/v1/leads/qualify', calls:'8,821', p50:'204ms', p99:'580ms', errors:'0.08%', status:'healthy' },
  { method:'GET',  path:'/api/v1/agents/:id/run', calls:'44,218', p50:'122ms', p99:'340ms', errors:'0.01%', status:'healthy' },
  { method:'GET',  path:'/api/v1/tools/search', calls:'28,104', p50:'44ms', p99:'180ms', errors:'0.00%', status:'healthy' },
  { method:'POST', path:'/api/v1/analytics/event', calls:'88,402', p50:'18ms', p99:'68ms', errors:'0.00%', status:'healthy' },
  { method:'POST', path:'/api/v1/auth/admin/login', calls:'242', p50:'380ms', p99:'820ms', errors:'1.24%', status:'degraded' },
  { method:'POST', path:'/api/v1/media/upload', calls:'1,204', p50:'1.2s', p99:'4.8s', errors:'0.41%', status:'healthy' },
  { method:'GET',  path:'/api/v1/admin/stats', calls:'4,818', p50:'88ms', p99:'240ms', errors:'0.00%', status:'healthy' },
];

// ── System Services ──────────────────────────────────────────
export const SERVICES = [
  { name:'API Gateway',        uptime:99.97, latency:'92ms',  region:'us-east-1',    status:'healthy' },
  { name:'Voice Agent Engine', uptime:99.94, latency:'218ms', region:'us-east-1',    status:'healthy' },
  { name:'Model Router',       uptime:99.88, latency:'44ms',  region:'us-east-1',    status:'healthy' },
  { name:'Webhook Delivery',   uptime:98.12, latency:'—',     region:'us-east-1',    status:'degraded' },
  { name:'Analytics Pipeline', uptime:99.99, latency:'12ms',  region:'eu-central-1', status:'healthy' },
  { name:'Auth Service',       uptime:100.0, latency:'24ms',  region:'global-edge',  status:'healthy' },
  { name:'Billing Service',    uptime:99.95, latency:'88ms',  region:'us-east-1',    status:'healthy' },
  { name:'Cloudinary CDN',     uptime:99.99, latency:'38ms',  region:'multi-region', status:'healthy' },
  { name:'Groq AI Service',    uptime:99.82, latency:'142ms', region:'us-east-1',    status:'healthy' },
];

// ── Logs ─────────────────────────────────────────────────────
export const LOG_ENTRIES = [
  { id:1,  level:'info',  time:'2026-05-13 14:38:22', service:'voice-agent',  message:'Session AX-98821 started — user raj@aiconsult.in', requestId:'req_1715608702_a8c' },
  { id:2,  level:'warn',  time:'2026-05-13 14:35:11', service:'api-gateway',  message:'Rate limit threshold 80% reached — workspace AX-8821', requestId:'req_1715608511_b4f' },
  { id:3,  level:'info',  time:'2026-05-13 14:32:04', service:'billing',      message:'Invoice INV-2058 processed — $1,299.00 for Enterprise plan', requestId:'req_1715608324_c2e' },
  { id:4,  level:'error', time:'2026-05-13 14:28:44', service:'webhook',      message:'Delivery failed after 3 retries — endpoint https://api.nexaworks.io/hooks/agentix', requestId:'req_1715608124_d9a' },
  { id:5,  level:'info',  time:'2026-05-13 14:22:18', service:'agents',       message:'Agent AX-0003 "Support Brain" model context refreshed', requestId:'req_1715607738_e1b' },
  { id:6,  level:'info',  time:'2026-05-13 14:18:55', service:'model-router', message:'Request routed to claude-sonnet-4-6 — latency 188ms', requestId:'req_1715607535_f7c' },
  { id:7,  level:'warn',  time:'2026-05-13 14:14:02', service:'auth',         message:'Failed login attempt — ip 185.220.101.4 — blocked', requestId:'req_1715607242_g5d' },
  { id:8,  level:'info',  time:'2026-05-13 14:08:34', service:'tools-runner', message:'Tool chain completed — 6 tools — 2.4s total — success', requestId:'req_1715606914_h3e' },
  { id:9,  level:'info',  time:'2026-05-13 14:04:11', service:'deploy',       message:'Frontend build #482 deployed — commit f719492 — 18.4s', requestId:'req_1715606651_i8f' },
  { id:10, level:'error', time:'2026-05-13 14:00:08', service:'analytics',    message:'Event pipeline stall — recovered after 12s — no data loss', requestId:'req_1715606408_j2a' },
  { id:11, level:'info',  time:'2026-05-13 13:55:41', service:'voice-agent',  message:'Peak concurrent sessions: 48 — threshold 60', requestId:'req_1715606141_k4b' },
  { id:12, level:'info',  time:'2026-05-13 13:48:22', service:'api-gateway',  message:'SSL certificate auto-renewed — next expiry 2027-05-13', requestId:'req_1715605702_l9c' },
];

// ── Billing / Invoices ───────────────────────────────────────
export const INVOICES = [
  { id:'INV-2058', customer:'raj@aiconsult.in', plan:'Enterprise Pro', amount:'$2,499', date:'2026-05-01', status:'paid', method:'Stripe' },
  { id:'INV-2057', customer:'sarah@techcorp.io', plan:'Enterprise', amount:'$1,299', date:'2026-05-01', status:'paid', method:'Stripe' },
  { id:'INV-2056', customer:'priya@finai.co', plan:'Enterprise', amount:'$1,299', date:'2026-05-01', status:'paid', method:'Stripe' },
  { id:'INV-2055', customer:'marcus@growthly.com', plan:'Growth', amount:'$399', date:'2026-05-01', status:'paid', method:'Stripe' },
  { id:'INV-2054', customer:'yuki@smartflow.jp', plan:'Growth', amount:'$399', date:'2026-05-01', status:'paid', method:'Stripe' },
  { id:'INV-2053', customer:'lena@automate.eu', plan:'Growth', amount:'$399', date:'2026-04-01', status:'overdue', method:'Stripe' },
  { id:'INV-2052', customer:'james@nexaworks.io', plan:'Starter', amount:'$49', date:'2026-04-01', status:'cancelled', method:'Stripe' },
  { id:'INV-2051', customer:'ana@datavine.pt', plan:'Starter', amount:'$49', date:'2026-05-10', status:'pending', method:'Stripe' },
];

// ── Content / CMS ────────────────────────────────────────────
export const CONTENT_ITEMS = [
  { id:1, title:'How AI Agents Automate Sales Workflows', slug:'ai-agents-sales-automation', type:'Blog', status:'published', views:'6.2K', updated:'2026-04-15', author:'Admin' },
  { id:2, title:'Getting Started with Agentix API', slug:'getting-started-api', type:'Docs', status:'published', views:'12.8K', updated:'2026-04-20', author:'Admin' },
  { id:3, title:'Voice Agent Integration Guide', slug:'voice-agent-integration', type:'Guide', status:'published', views:'4.1K', updated:'2026-05-01', author:'Admin' },
  { id:4, title:'Enterprise AI Security Whitepaper 2026', slug:'enterprise-ai-security-2026', type:'Whitepaper', status:'draft', views:'0', updated:'2026-05-10', author:'Admin' },
  { id:5, title:'Agentix Platform v2.0 Release Notes', slug:'platform-v2-release-notes', type:'Release', status:'published', views:'8.4K', updated:'2026-05-05', author:'Admin' },
  { id:6, title:'Multi-Agent Orchestration Tutorial', slug:'multi-agent-orchestration', type:'Guide', status:'review', views:'0', updated:'2026-05-12', author:'Admin' },
  { id:7, title:'Q2 2026 AI Trend Report', slug:'q2-2026-ai-trends', type:'Report', status:'draft', views:'0', updated:'2026-05-13', author:'Admin' },
];

// ── AI / Groq Usage ──────────────────────────────────────────
export const AI_USAGE = {
  totalTokens: '28.4M',
  costMonth: '$284.20',
  avgLatency: '188ms',
  errorRate: '0.04%',
  models: [
    { name:'claude-sonnet-4-6', calls:'44,218', tokens:'18.2M', latency:'188ms', cost:'$182.00', share: 64 },
    { name:'claude-haiku-4-5',  calls:'28,104', tokens:'6.8M',  latency:'88ms',  cost:'$34.00',  share: 24 },
    { name:'claude-opus-4-7',   calls:'2,812',  tokens:'3.4M',  latency:'420ms', cost:'$68.20',  share: 12 },
  ],
  tokenTrend: [18, 22, 20, 26, 24, 28, 26, 30, 28.4],
};

// ── Top pages ────────────────────────────────────────────────
export const TOP_PAGES = [
  { path:'/', views:'24.8K', bounce:'28%', avg:'4m 12s', delta:'+12%' },
  { path:'/category/content', views:'12.4K', bounce:'34%', avg:'3m 48s', delta:'+8%' },
  { path:'/category/sales', views:'9.8K', bounce:'31%', avg:'3m 24s', delta:'+22%' },
  { path:'/pricing', views:'8.2K', bounce:'42%', avg:'2m 58s', delta:'+6%' },
  { path:'/demo', views:'6.4K', bounce:'18%', avg:'6m 10s', delta:'+34%' },
  { path:'/category/marketing', views:'5.1K', bounce:'37%', avg:'3m 02s', delta:'+4%' },
];

// ── Media assets (preview) ───────────────────────────────────
export const MEDIA_ASSETS = [
  { id:'m001', name:'content-and-creative-production.svg', type:'icon', size:'4.2KB', folder:'icons/categories', url:'/agentix-generated-media/icons/categories/content-and-creative-production.svg', used:12 },
  { id:'m002', name:'marketing-and-growth.svg', type:'icon', size:'3.8KB', folder:'icons/categories', url:'/agentix-generated-media/icons/categories/marketing-and-growth.svg', used:9 },
  { id:'m003', name:'sales-and-revenue.svg', type:'icon', size:'4.1KB', folder:'icons/categories', url:'/agentix-generated-media/icons/categories/sales-and-revenue.svg', used:8 },
  { id:'m004', name:'hero-lottie.json', type:'lottie', size:'128KB', folder:'lottie', url:'/agentix-generated-media/lottie/hero.json', used:1 },
  { id:'m005', name:'platform-logo.png', type:'image', size:'22KB', folder:'brand', url:'/agentix-generated-media/brand/logo.png', used:24 },
];
