# Admin Console · route: /admin/* · source: frontend/src/admin/**

## Meta
- Title/brand shown in sidebar: AGENTiX — "Admin" pill
- Console tagline (login screen eyebrow): Admin Console
- All data on every page below is mock/demo data (frontend/src/admin/lib/mockData.js) meant to be
  replaced by real API calls — captured here only where it doubles as UI copy (labels, statuses, etc).

## Section: Auth — AdminLogin.jsx
- Eyebrow: Admin Console
- Heading: Sign in
- Field: Email — placeholder "admin@domain.com"
- Field: Password — placeholder "••••••••"
- Submit button: "Access Console" (loading state: "Authenticating...")
- Error message: "Invalid credentials. Check email and password."

## Section: Layout — AdminShell.jsx (sidebar/topbar shell, wraps every page)
- Logo text: AGENTiX — badge "Admin"
- Nav groups and items:
  - Overview: Dashboard, Analytics
  - CRM: Leads, Bookings
  - Platform: AI Agents, AI Management, Content / CMS, Media Library
  - Operations: API Monitor, Logs, Billing, System
  - Config: Settings
- Breadcrumb root label: Admin
- Breadcrumb map: Dashboard / Analytics / CRM → Leads / CRM → Bookings / Platform → Users /
  Platform → AI Agents / Platform → AI Management / Platform → Content / CMS / Platform → Media Library /
  Operations → API Monitor / Operations → Logs / Operations → Billing / Operations → System /
  Config → Settings
- Search trigger: "Search or jump to..." (kbd hint ⌘ K)
- Env badge: "DEV · v1.0.0"
- Env pill (topbar): DEV
- User row fallback name: "Admin", fallback role text: "Super Admin"
- Sign-out button tooltip: "Sign out"; topbar avatar tooltip: "{name} — click to sign out"
- Sidebar collapse button tooltip: "Expand sidebar" / "Collapse sidebar"; inline label "Collapse"
- Notifications button tooltip: "Notifications"
- Command palette button tooltip: "Command palette (⌘K)"
- Mobile toggle aria-label: "Toggle sidebar"

## Section: Layout — CommandPalette.jsx
- Input placeholder: "Search pages, actions..."
- Kbd hint: ESC
- Section labels: "Pages", "Actions"
- Nav commands (labels only): Dashboard, Analytics, Users, AI Agents, AI Management, Content / CMS,
  Media Library, API Monitor, Logs, Billing, System, Settings
- Action commands: "Refresh page data", "New AI Agent", "New Content item"
- Empty state: 'No results for "{query}"'
- Footer hints: "↑↓ navigate", "↵ select", "ESC close"

## Section: AdminDashboard.jsx ("Mission Control")
- Page title: Mission Control
- Page subtitle: "Real-time platform overview · {date}"
- Live badge: "Live"
- Buttons: "Refresh", "View Leads"
- Backend-offline error banner: "Backend offline — start the server with `cd backend && npm run dev`"
- Service status badges: "● Healthy", "⚠ Degraded", "✕ Down"
- Operational counter: "{healthyCount}/{total} operational"
- KPI card labels: Total Leads, Demo Bookings, Total Inquiries, "Today's Leads"
- KPI deltas: "+{n} today", "live count"
- Chart card: "API Activity — 30 days" / "Platform call volume"
- Activity feed card: "Recent Activity" + "Live" badge
- Activity empty state: title "No activity yet", sub "Leads will appear here in real time"
- Activity row template: "{📅 or 📧} {name} — {email}" · "{company} · {time ago}"
- "View all leads →" link
- System Health card title + badges: "⚠ Degraded" / "● All OK"
- Quick Actions card title + action labels: "View Leads", "Bookings", "View Logs", "Export Data"

## Section: LeadsPage.jsx ("Leads & Inquiries")
- Page title: Leads & Inquiries
- Page subtitle: "{total} total submissions · {new} new"
- Button: Refresh
- Error banner: "⚠ Backend error: {message}. Make sure the server is running."
- Summary cards: Total Leads, New, Qualified, Closed
- Search placeholder: "Search name, email, company..."
- Status filter tabs: All, New, Contacted, Qualified, Closed, Spam
- Table columns: Contact, Company, Service, Budget, Status, Received, Actions
- Empty state: title "No leads found", sub "Contact form submissions will appear here"
- Row action tooltips: "Send email", "Call", "Delete"
- Delete confirm dialog: "Delete this lead permanently?"
- Expanded row labels: "Message", "Details" (with sub-fields Phone, Company, Service, Budget, Source, ID)
- Pagination: "Page {page} of {pages} · {total} total"

## Section: BookingsPage.jsx ("Demo Bookings")
- Page title: Demo Bookings
- Page subtitle: "{total} total bookings from voice, chat & manual sources"
- Button: Refresh
- Error banner: "⚠ Backend error: {message}. Make sure the server is running."
- Summary cards: Total Bookings, Voice Agent, Chat Agent, Manual
- Source labels: "🎙 Voice", "💬 Chat", "🖱 Manual"
- Table columns: Name, Company, Solution Need, Preferred Date, Source, Booked, Actions
- Empty state: title "No bookings yet", sub "Demo bookings from voice agent, chat, and manual sources appear here"
- Row action tooltips: "Email", "Call"
- Expanded row labels: "Notes", "Booking Details" (Calendar ID, Source, Date, Time, ID)
- Pagination: "Page {page} of {pages} · {total} total"

## Section: AgentsPage.jsx ("AI Agents")
- Page title: AI Agents
- Page subtitle: "{count} registered · {live} live in production"
- Buttons: "View Logs", "Deploy Agent"
- Stat cards: Live Agents, Total Calls, Avg Uptime, Total Tokens
- Search placeholder: "Search agents..."
- Status filter tabs: All, Live, Degraded, Paused
- Table columns: ID, Agent, Category, Calls (24h), Uptime, Latency, Status, Owner, Actions
- Status badges: Live, Degraded, Paused, Archived
- Row actions: "View", "Logs", "Pause" / "Resume"

## Section: AiManagePage.jsx ("AI Management")
- Page title: AI Management
- Page subtitle: "Model usage · Prompt library · Voice agent · API keys"
- Buttons: "Sync Usage", "New Prompt"
- Tabs: Overview, Prompt Library, Voice Agent, API Keys
- Overview stat cards: Total Tokens (Mo), AI Cost (Month), Avg Latency, Error Rate
- Chart titles: "Token Usage Trend" (9-week · M tokens), "Model Distribution"
- Table: "Model Usage Breakdown" — columns Model, API Calls, Tokens, Avg Latency, Cost, Share
- Prompt Library: card title "Prompt Library", button "New Template"
  - Table columns: ID, Name, Model, Est. Tokens, Updated, Status, Actions
  - Row actions: "Edit", "Clone"
  - Sample prompt template names: Lead Qualifier System, Content Writer v4, Support Agent Base,
    Research Analyst, Invoice Processor
- Voice Agent tab:
  - Card title: "Voice Agent Config"; button "Save Voice Config"
  - Config field labels (auto-titled from camelCase keys): Persona, Wake Phrase, Language,
    Response Timeout, Max Session Duration, Tts Model
  - Sample values: persona "Aria — Professional AI Assistant", wake phrase "Hey Agentix",
    language "English (US)", response timeout "8s", max session duration "20min", TTS model "Groq Whisper v3"
  - Card title: "Voice Session Stats" — rows: Active Sessions, Sessions Today, Avg Duration,
    Completion Rate, Transcription Acc., Peak Concurrent
- API Keys tab:
  - Card title: "API Key Management"; button "Generate Key"
  - Row actions: "Rotate", "Revoke"; label "Scopes: {scopes}"
  - Sample services: Groq AI, Cloudinary, Supabase, SMTP (Gmail), Stripe

## Section: AnalyticsPage.jsx ("Analytics")
- Page title: Analytics
- Page subtitle: "Platform growth and performance metrics"
- Range tabs: 7D, 30D, 90D, 12M
- Button: "Export CSV"
- Stat cards: "API Calls (Period)", "New Users", "MRR Growth" — delta suffix "vs last period"
- Chart card: "API Calls Trend — {range}" / "Weekly aggregated"
- Metric legend labels: API Calls, New Users, Revenue
- Mini chart cards: same three metric labels, sub "12-week"
- Table: "Top Pages" — columns Page, Views, Bounce, Avg Time, Trend

## Section: ApiMonitorPage.jsx ("API Monitor")
- Page title: API Monitor
- Page subtitle: "{n} endpoints · real-time health"
- Status pill: "All Systems Operational"
- Button: Refresh
- Stat cards: Total Requests (24h), Avg Response Time, Error Rate, Uptime (30d)
- Chart card: "Request Volume — 30 Days" / "Daily · thousands"
- Table card: "Endpoint Performance" — filter tabs "All ({n})", "Healthy ({n})", "Degraded ({n})"
- Table columns: Method, Endpoint, Calls (24h), p50, p99, Errors, Status
- Status badges: Healthy, Degraded, Down

## Section: BillingPage.jsx ("Billing")
- Page title: Billing
- Page subtitle: "Subscriptions · Invoices · Revenue"
- Buttons: "Export", "Sync Stripe", "Create Invoice"
- Stat cards: MRR, Active Subs, Overdue, Churn (30d)
- Chart card: "MRR Growth" / "12 months · $K"; delta note "+56% YoY"
- Table card: "Invoices" — filter tabs All, Paid, Overdue, Cancelled
- Table columns: Invoice, Customer, Plan, Amount, Date, Status, Actions
- Status badges: Paid, Overdue, Cancelled, Pending
- Row actions: "View", "Retry" (if overdue), "PDF" (if paid)

## Section: ContentPage.jsx ("Content / CMS")
- Page title: Content / CMS
- Page subtitle: "{total} items · {published} published"
- Buttons: "Export", "New Content"
- Stat cards: Total Items, Published, Drafts, Total Views
- Search placeholder: "Search content..."
- Type filter tabs: All types, Blog, Docs, Guide, Release, Whitepaper, Report
- Status filter tabs: All, Published, Draft, In Review
- Table columns: Title, Type, Status, Views, Author, Updated, Actions
- Empty state: "No content found"
- Row action icons (no text labels; tooltip-free icon buttons: view/edit/delete)

## Section: LogsPage.jsx ("System Logs")
- Page title: System Logs
- Page subtitle: "Last 24 hours · {n} entries"
- Live/Paused toggle button: "Live" / "Paused"
- Buttons: "Export", "Refresh"
- Level filter pills: All, Error, Warn, Info, Debug (each with count)
- Search placeholder: "Filter by message or service..."
- Stream header: "Log Stream — {n} entries", live indicator "● live"
- Empty state: title "No log entries match", sub "Try a different level or clear the search filter"

## Section: MediaPage.jsx ("Media Library")
- Page title: Media Library
- Page subtitle: "{n} assets · Cloudinary CDN-ready"
- Buttons: "Open Cloudinary", "Upload Assets"
- Upload dropzone: "Drop files here or click to upload" /
  "SVG, PNG, JPG, WebP, MP4, JSON · Max 50MB per file · Auto WebP conversion"
- Folders sidebar heading: "Folders" — folder names: All Assets, icons/categories, icons/tools,
  lottie, brand, uploads
- Search placeholder: "Search assets..."
- Type filter tabs: All, Image, Icon, Lottie, Video
- Grid/List view toggle (icon buttons, no text)
- Copy-to-clipboard confirmation overlay: "Copied!"
- List view table columns: Name, Type, Size, Folder, Used In, Actions
- List view "Used In" cell suffix: "{n} refs"
- List view copy button label: "Copy URL" (toggles to "✓" when copied)
- Empty state: title "No assets found", sub "Try a different filter or upload new assets"

## Section: SettingsPage.jsx ("Settings")
- Page title: Settings
- Page subtitle: "Platform configuration and feature flags"
- Save button: "Save Changes" (confirmed state: "✓ Saved")
- Section nav heading: "Configuration" — sections: General, Security, Feature Flags, Integrations
- General fields: Platform Name, Support Email, API Rate Limit (req/min), Webhook Retries
  - Sample values: "AI Agentix", "aiagentix2025@gmail.com", "1000", "3"
- Security fields: Session Timeout (min), Max Login Attempts, IP Allowlist (CSV)
  - Sample values: "60", "5", ""
- Feature flag toggles (label — description):
  - Maintenance Mode — "Blocks all public routes with a maintenance page"
  - Analytics Tracking — "Enables page view and event tracking"
  - Webhook Delivery — "Enable outbound webhook event delivery"
  - Email Notifications — "Send system alerts and reports via email"
  - Beta Features — "Enable experimental features for all users"
  - Debug Logging — "Verbose server-side logging (high I/O)"
- Integrations list (name — detail — status/action):
  - Stripe — "Payments & subscriptions" — connected / Disconnect
  - Cloudinary — "Media storage & CDN" — connected / Disconnect
  - Supabase — "Primary database" — connected / Disconnect
  - Groq AI — "LLM inference" — connected / Disconnect
  - Slack — "Team notifications" — disconnected / Connect
  - PagerDuty — "Incident management" — disconnected / Connect

## Section: SystemPage.jsx ("System Health")
- Page title: System Health
- Page subtitle: "Infrastructure status · all regions"
- Status pill: "All Operational" / "{n} Degraded"
- Button: Refresh
- Stat cards: Services, Healthy, Degraded, "Avg Uptime (30d)"
- Card: "30-Day Uptime History" — footer labels "30 days ago" / "Today"
- Card: "Resource Usage" — meters: CPU Usage, Memory, Disk I/O, Network Out
- Card: "Services" — table columns Service, Region, Uptime, Latency, Status
- Status badges: Healthy, Degraded, Down

## Section: UsersPage.jsx ("Users")
- Page title: Users
- Page subtitle: "{total} registered users · {active} active"
- Buttons: "Export", "Invite User"
- Stat cards: Total Users, Active, Enterprise Tier, Total MRR
- Search placeholder: "Search users..."
- Plan filter tabs: All plans, Enterprise Pro, Enterprise, Growth, Starter
- Status filter tabs: All, Active, Suspended, Pending
- Table columns: User, Plan, Status, Agents, API Calls, MRR, Joined, Actions
- Status badges: Active, Suspended, Pending
- Row actions: "Edit", "Suspend" (if active) / "Restore" (if not)
- Empty state: "No users match filters"

## Section: Non-user-facing (no UI copy to preserve)
- adminApi.js — fetch wrapper, error strings only surface as generic `HTTP {status}` fallback (not
  authored copy).
- useAdminAuth.js — no UI copy; fallback admin display values "Admin" / role "Super Admin" already
  covered above.
- charts/AreaChart.jsx, BarChart.jsx, DonutChart.jsx, SparkLine.jsx — pure SVG rendering, no static text.
- mockData.js — demo dataset (names, emails, invoice IDs, log messages, agent names, etc.) used purely
  as placeholder/sample data throughout the pages above; not authored marketing copy. Notable literal
  strings already surfaced inline where they double as visible table content (e.g. agent names, log
  messages, invoice customers) are represented via the page sections above rather than duplicated here.
