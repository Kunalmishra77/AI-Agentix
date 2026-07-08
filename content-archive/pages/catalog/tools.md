# Catalog: Tools · source: frontend/src/data/agentixData.js (TOOL_DESCRIPTIONS) + frontend/src/data/toolWorkspaces.js

121 tools total, grouped by category/subcategory to match categories.md. Each tool workspace record in toolWorkspaces.js follows one fixed template — captured once below instead of repeating 121 times:

## Shared workspace template (applies to every tool, boilerplate only)
- Left heading: "{Tool Name} operating brief"
- Status pill: "review-ready"
- Right heading: "Workspace output"
- Indicator text: "ready"
- Workspace title: "{Tool Name} command workspace"
- Workspace body: "Use this workspace to {verb} {tool name, lowercase} outputs from approved inputs, then move them through review, routing, and measurable next steps." — the verb varies per tool (build / produce / plan / assist / evaluate / capture / monitor) and is noted per tool below.

Per tool, the genuinely unique content is: **Description** (= "Workflow outcome" field, identical text to TOOL_DESCRIPTIONS), and **Required inputs**. "Best-fit user" repeats across every tool in the same subcategory (noted once per subcategory). "Review standard" and "Ready for..." (checkedStatus) repeat across every tool in the same top-level category (noted once per category).

---

# CATEGORY: Content & Creative Production
- Review standard (all tools in this category): "Check brand voice, factual accuracy, usage rights, claims, and final channel fit before publishing."
- Checked status (all tools in this category): "Ready for creative review, brand approval, and channel routing."

## Subcategory: Content Creation & Copywriting
Best-fit user (all 4 tools below): "Built for content strategists, founders, marketers, and copy teams producing conversion-ready written assets."

- **AI Content Generator** — Description: "Turns a brief, audience, offer, and brand voice into polished drafts for emails, pages, ads, and social posts, with review notes before publish." Required inputs: "Start with brief, audience segment, offer, channel, examples, tone rules, and required CTA." Workspace verb: build.
- **Blog & SEO Article Writer** — Description: "Builds search-aware articles from keywords, SERP intent, outline, internal links, and brand guidance so content is useful, structured, and ready to edit." Required inputs: "Start with target keyword, search intent, outline, internal links, product angle, and SERP notes." Workspace verb: build.
- **Script & Storyboard Writer** — Description: "Converts campaign ideas into scene-by-scene scripts, shot lists, hooks, voiceover cues, and storyboard notes for video or presentation production." Required inputs: "Start with campaign idea, runtime, scene goal, visual references, voiceover tone, and channel format." Workspace verb: build.
- **Product & Sales Copy Builder** — Description: "Writes benefit-led product pages, sales emails, comparison copy, and objection-handling snippets from product facts, audience pain points, and proof." Required inputs: "Start with product facts, buyer pain points, proof, objections, pricing context, and competitor alternatives." Workspace verb: build.

## Subcategory: Visual & Brand Assets
Best-fit user (all 3 tools below): "Built for brand, ecommerce, design, and campaign teams preparing visual assets for launch."

- **AI Product Photography** — Description: "Generates product-shot concepts, backgrounds, and scene prompts that make catalog images, ads, and launch visuals more premium and on-brand." Required inputs: "Start with product image, desired scene, background style, usage channel, aspect ratio, and brand mood." Workspace verb: produce.
- **Image Enhancement Studio** — Description: "Cleans, upscales, reframes, and prepares images for web, social, marketplace, or ad use while preserving product accuracy and brand polish." Required inputs: "Start with source image, cleanup goal, output size, platform requirements, product accuracy notes, and brand constraints." Workspace verb: produce.
- **Brand Asset Generator** — Description: "Creates campaign visuals, style-consistent graphics, banners, and reusable brand elements from approved colors, typography, logo rules, and creative direction." Required inputs: "Start with logo rules, colors, fonts, campaign theme, asset size, and approved visual references." Workspace verb: build.

## Subcategory: Voice, Avatar & Audio
Best-fit user (all 3 tools below): "Built for video, enablement, learning, and brand teams creating spoken or presenter-led content."

- **AI Voiceover Studio** — Description: "Produces clear voiceover drafts with tone, pacing, pronunciation, and script timing controls for ads, explainers, training, and product videos." Required inputs: "Start with script, target tone, pronunciation notes, pacing, language, and intended channel." Workspace verb: assist.
- **Voice Cloning** — Description: "Creates controlled synthetic voice assets from approved samples, consent rules, and usage limits so narration can scale without losing brand familiarity." Required inputs: "Start with approved voice sample, consent record, usage context, pronunciation guide, and brand safety limits." Workspace verb: assist.
- **Avatar Presenter Studio** — Description: "Builds presenter-style videos from scripts, slides, or product messages using avatars, voice, captions, and scene direction for fast explainers." Required inputs: "Start with script, presenter style, slide or scene assets, language, captions, and audience context." Workspace verb: produce.

## Subcategory: Video Creation & Repurposing
Best-fit user (all 3 tools below): "Built for video, social, product marketing, and localization teams turning ideas or footage into publishable clips."

- **AI Video Generator** — Description: "Turns scripts, briefs, and assets into draft videos with scenes, motion direction, voiceover, captions, and edit-ready structure." Required inputs: "Start with script, storyboard, source assets, visual style, format, music or voice direction, and CTA." Workspace verb: build.
- **Video Clipper** — Description: "Finds the strongest moments in long videos and converts them into channel-specific clips with hooks, titles, captions, and aspect ratios." Required inputs: "Start with long-form video, target platforms, key themes, clip length, hook style, and caption rules." Workspace verb: produce.
- **Subtitle & Localization** — Description: "Creates accurate captions, translations, timing, and market-specific phrasing so videos can travel across languages without losing meaning." Required inputs: "Start with video file, transcript, target language, regional tone, terminology list, and timing rules." Workspace verb: produce.

## Subcategory: Workflow & Publishing
Best-fit user (all 3 tools below): "Built for content operations, social, brand, and compliance teams moving assets from approval to distribution."

- **Social Media Scheduler** — Description: "Plans, queues, and adapts approved posts across channels using campaign timing, audience behavior, asset availability, and review status." Required inputs: "Start with approved posts, channel rules, campaign calendar, audience timing, creative assets, and review status." Workspace verb: produce.
- **Content Repurposing** — Description: "Transforms one approved asset into blogs, posts, emails, scripts, clips, and sales snippets while preserving the core message and proof." Required inputs: "Start with pillar asset, target channels, desired formats, core message, proof points, and tone rules." Workspace verb: produce.
- **Brand Compliance** — Description: "Checks copy, visuals, claims, and tone against brand rules, legal sensitivities, and channel requirements before content moves to approval." Required inputs: "Start with draft content, brand guidelines, claim rules, visual standards, legal sensitivities, and channel requirements." Workspace verb: produce.

---

# CATEGORY: Marketing & Growth
- Review standard (all tools in this category): "Review messaging, audience logic, offer strength, tracking assumptions, and budget or experiment risk before launch."
- Checked status (all tools in this category): "Ready for campaign review, experiment setup, and performance tracking."

## Subcategory: Campaign Strategy & Planning
Best-fit user (all 3 tools below): "Built for growth leaders, marketers, founders, and launch teams planning coordinated campaigns."

- **Campaign Strategy Builder** — Description: "Converts goals, audience segments, budget, and offer context into a campaign plan with positioning, channels, milestones, assets, and KPIs." Required inputs: "Start with business goal, target audience, offer, budget, timeline, channels, and success metrics." Workspace verb: build.
- **GTM Launch Planner** — Description: "Maps product, audience, pricing, messaging, enablement, and launch motions into a sequenced go-to-market plan with owners and dependencies." Required inputs: "Start with product context, audience segments, pricing, positioning, enablement needs, and launch timeline." Workspace verb: plan.
- **Marketing Calendar** — Description: "Builds a coordinated calendar for campaigns, content, email, social, events, and launches so every asset has timing and accountability." Required inputs: "Start with campaigns, channels, asset owners, launch dates, content themes, and approval milestones." Workspace verb: plan.

## Subcategory: Funnel & Landing Page Optimization
Best-fit user (all 3 tools below): "Built for conversion, demand generation, and revenue teams improving visitor-to-lead performance."

- **Landing Page Optimizer** — Description: "Reviews page structure, messaging, proof, CTAs, and conversion flow, then recommends specific improvements and test ideas." Required inputs: "Start with page URL or copy, traffic source, audience, conversion goal, analytics notes, and proof assets." Workspace verb: produce.
- **Funnel Audit** — Description: "Finds leaks across acquisition, capture, nurture, demo, purchase, and retention paths using data, page behavior, and journey logic." Required inputs: "Start with journey stages, analytics, traffic sources, conversion rates, forms, emails, and sales handoff data." Workspace verb: evaluate.
- **Lead Capture Optimizer** — Description: "Improves forms, lead magnets, popups, chat prompts, and qualification steps so high-intent visitors become cleaner, more useful leads." Required inputs: "Start with form fields, offer, lead magnet, traffic source, qualification rules, and conversion data." Workspace verb: capture.

## Subcategory: SEO & Content Growth
Best-fit user (all 3 tools below): "Built for SEO, content, and organic growth teams building durable search visibility."

- **SEO Topic Cluster Builder** — Description: "Builds pillar pages, supporting articles, keyword groups, search intent maps, and internal-link plans around a strategic topic." Required inputs: "Start with seed topic, keyword data, competitors, buyer intent, existing content, and product priorities." Workspace verb: build.
- **Content Brief Tool** — Description: "Turns target keyword, audience, SERP analysis, product angle, and competitor gaps into a clear writing brief for useful content." Required inputs: "Start with keyword, audience, SERP findings, product angle, internal links, and required sections." Workspace verb: produce.
- **Competitive SEO Intelligence** — Description: "Compares search visibility, ranking gaps, content depth, backlinks, and keyword opportunities to prioritize realistic organic growth moves." Required inputs: "Start with competitor domains, keyword targets, ranking data, content inventory, and backlink signals." Workspace verb: produce.

## Subcategory: Paid Media & Ad Creative
Best-fit user (all 3 tools below): "Built for performance marketers and creative strategists managing spend, messaging, and ad learning."

- **Ad Creative Generator** — Description: "Creates ad angles, headlines, hooks, visuals, and variant sets aligned to audience pains, offer strength, channel norms, and brand voice." Required inputs: "Start with audience, offer, channel, proof, objections, brand voice, creative examples, and campaign goal." Workspace verb: build.
- **Paid Campaign Planner** — Description: "Plans paid campaigns across audiences, budgets, channels, creative sets, landing pages, measurement, and learning milestones." Required inputs: "Start with budget, channels, audience segments, offer, landing pages, creative inventory, and KPI targets." Workspace verb: plan.
- **Ad Performance Insight** — Description: "Explains performance shifts by audience, creative, spend, placement, and funnel quality, then recommends what to scale, pause, or test." Required inputs: "Start with campaign data, spend, creative variants, audience segments, funnel metrics, and historical benchmarks." Workspace verb: produce.

## Subcategory: Analytics & Experiments
Best-fit user (all 3 tools below): "Built for growth, analytics, and marketing leaders deciding what to test, scale, or stop."

- **Growth Analytics Assistant** — Description: "Turns marketing dashboards into plain-language insight, KPI movement, anomaly explanations, and recommended next actions." Required inputs: "Start with marketing dashboards, KPI definitions, date ranges, campaign notes, and anomaly context." Workspace verb: assist.
- **Experiment Roadmap** — Description: "Prioritizes conversion, messaging, pricing, lifecycle, and channel tests by expected impact, confidence, effort, and learning value." Required inputs: "Start with growth goal, backlog ideas, traffic levels, confidence estimates, effort notes, and learning priorities." Workspace verb: plan.
- **Attribution Explainer** — Description: "Translates multi-touch performance into a clear story of what influenced pipeline, where data is weak, and what decisions are safe." Required inputs: "Start with source data, campaign history, CRM pipeline, conversion windows, channel definitions, and known tracking gaps." Workspace verb: produce.

---

# CATEGORY: Sales & Revenue
- Review standard (all tools in this category): "Confirm buyer relevance, CRM accuracy, promise discipline, pricing language, and human handoff before prospect contact."
- Checked status (all tools in this category): "Ready for rep review, CRM update, and buyer-safe follow-up."

## Subcategory: Prospecting & Lead Intelligence
Best-fit user (all 3 tools below): "Built for SDRs, AEs, RevOps, and founders building sharper target account motions."

- **Lead Discovery** — Description: "Builds target lead lists from ICP filters, trigger events, territories, and buying signals so prospecting starts with the right accounts." Required inputs: "Start with ICP filters, territory, industry, trigger events, exclusions, and target account criteria." Workspace verb: produce.
- **Lead Enrichment & Scoring** — Description: "Adds company, role, intent, fit, and engagement data to leads, then ranks them for outreach priority and routing." Required inputs: "Start with lead list, firmographic data, role data, engagement history, intent signals, and scoring rules." Workspace verb: produce.
- **Account Research** — Description: "Produces account briefs with business context, priorities, stakeholders, recent signals, pain hypotheses, and likely entry points for outreach." Required inputs: "Start with target account, website, news, leadership context, tech stack clues, and buying trigger signals." Workspace verb: produce.

## Subcategory: Outreach & Messaging
Best-fit user (all 3 tools below): "Built for sales teams creating relevant, sequenced buyer communication at scale."

- **Multichannel Sequence Builder** — Description: "Creates coordinated email, LinkedIn, call, and follow-up sequences with timing, personalization fields, and clear conversion goals." Required inputs: "Start with persona, offer, account context, channels, cadence rules, proof, and desired meeting outcome." Workspace verb: build.
- **Cold Email Personalization** — Description: "Turns account research and buyer role into concise, relevant cold emails with specific hooks, proof, and low-friction CTAs." Required inputs: "Start with account research, buyer role, pain hypothesis, proof point, CTA, and tone guardrails." Workspace verb: produce.
- **Follow-Up Automation** — Description: "Tracks meetings, replies, silence, and next steps, then drafts timely follow-ups that move deals without sounding automated." Required inputs: "Start with meeting notes, reply status, open tasks, deal stage, stakeholder context, and next-step timing." Workspace verb: produce.

## Subcategory: Conversational Sales Agents
Best-fit user (all 3 tools below): "Built for sales, growth, and revenue teams qualifying intent and booking conversations."

- **AI Sales Chat** — Description: "Qualifies website visitors, answers product questions, captures intent, recommends next steps, and hands high-value conversations to sales." Required inputs: "Start with product knowledge, qualification rules, routing logic, FAQs, pricing guardrails, and meeting booking rules." Workspace verb: assist.
- **AI Sales Voice** — Description: "Runs structured voice conversations for qualification, reminders, confirmations, and simple sales questions with clear escalation points." Required inputs: "Start with call script, qualification criteria, consent requirements, escalation rules, and CRM capture fields." Workspace verb: assist.
- **Meeting Booking Assistant** — Description: "Finds availability, qualifies meeting intent, routes to the right rep, sends reminders, and records context before the call." Required inputs: "Start with calendar availability, routing rules, qualification answers, rep assignment, and confirmation details." Workspace verb: assist.

## Subcategory: CRM & Pipeline
Best-fit user (all 3 tools below): "Built for sales managers, RevOps, and account teams keeping deals and records accurate."

- **CRM Sync & Hygiene** — Description: "Updates records, deduplicates contacts, standardizes fields, flags stale data, and keeps CRM activity aligned with real selling work." Required inputs: "Start with CRM records, duplicate rules, required fields, activity logs, lifecycle stages, and data standards." Workspace verb: capture.
- **Deal Assistant** — Description: "Summarizes deal context, identifies blockers, recommends next actions, drafts stakeholder messages, and prepares reps for stage movement." Required inputs: "Start with CRM deal record, meeting notes, stakeholders, blockers, next steps, and stage criteria." Workspace verb: assist.
- **Proposal & Quote Generator** — Description: "Creates proposal and quote drafts from scope, pricing, terms, use case, and buyer priorities for faster review." Required inputs: "Start with scope, pricing, buyer priorities, timeline, terms, assumptions, and approved proposal language." Workspace verb: build.

## Subcategory: RevOps & Forecasting
Best-fit user (all 3 tools below): "Built for revenue leaders and operators improving pipeline discipline and forecast confidence."

- **Pipeline Forecasting** — Description: "Combines stage data, deal quality, activity signals, slippage risk, and historical patterns to explain forecast confidence." Required inputs: "Start with pipeline data, stage definitions, close dates, activity signals, historical win rates, and risk flags." Workspace verb: monitor.
- **Sales Process Audit** — Description: "Reviews funnel stages, handoffs, CRM discipline, response times, and conversion patterns to expose revenue process bottlenecks." Required inputs: "Start with funnel metrics, CRM hygiene, response times, stage movement, handoff rules, and conversion history." Workspace verb: evaluate.
- **Sales Enablement Content** — Description: "Creates battlecards, objection responses, talk tracks, one-pagers, and follow-up assets tied to persona, use case, and sales stage." Required inputs: "Start with persona, product positioning, objections, proof, competitor context, and sales stage." Workspace verb: produce.

---

# CATEGORY: Customer Experience & Support
- Review standard (all tools in this category): "Validate policy accuracy, customer tone, escalation need, privacy sensitivity, and product correctness before reply."
- Checked status (all tools in this category): "Ready for support review, customer-safe response, and escalation routing."

## Subcategory: AI Support & Helpdesk
Best-fit user (all 3 tools below): "Built for support agents, CX leaders, and service teams handling customer questions and ticket queues."

- **AI Support Chat** — Description: "Answers customer questions from approved knowledge, clarifies intent, suggests fixes, and escalates complex or sensitive cases to humans." Required inputs: "Start with knowledge base, product docs, support policies, customer context, escalation rules, and tone standards." Workspace verb: assist.
- **Ticket Triage & Routing** — Description: "Classifies issues, urgency, sentiment, product area, and customer value, then routes tickets to the right queue with context." Required inputs: "Start with incoming ticket, customer tier, sentiment, product area, urgency, SLA, and queue rules." Workspace verb: produce.
- **Support Response Assistant** — Description: "Drafts helpful replies from ticket history, policies, product docs, and tone guidance so agents respond faster and more consistently." Required inputs: "Start with ticket history, policy notes, product docs, customer profile, tone rules, and known issue status." Workspace verb: assist.

## Subcategory: Onboarding & Education
Best-fit user (all 3 tools below): "Built for success, product education, and implementation teams helping customers reach first value."

- **Onboarding Journey Builder** — Description: "Creates role-based onboarding plans, milestones, emails, checklists, and success criteria from customer goals and product setup needs." Required inputs: "Start with customer goals, product modules, user roles, timeline, milestone criteria, and success metrics." Workspace verb: build.
- **Customer Training Generator** — Description: "Turns product features, workflows, and audience skill levels into training outlines, lessons, quizzes, and enablement assets." Required inputs: "Start with product workflow, learner role, skill level, examples, policy notes, and completion criteria." Workspace verb: build.
- **Product Walkthrough** — Description: "Builds guided in-app or demo walkthrough scripts that explain workflows step by step and highlight the right next action." Required inputs: "Start with feature flow, user goal, screen steps, CTA, friction points, and success event." Workspace verb: produce.

## Subcategory: Retention & Success
Best-fit user (all 3 tools below): "Built for CSMs, account managers, and customer leaders protecting renewals and expansion potential."

- **Churn Risk Assistant** — Description: "Detects churn signals from usage, support history, sentiment, contract stage, and engagement, then recommends recovery actions." Required inputs: "Start with usage data, support history, renewal date, sentiment, adoption milestones, and account notes." Workspace verb: assist.
- **Voice of Customer** — Description: "Synthesizes tickets, calls, surveys, reviews, and interviews into themes, pain points, product requests, and executive-ready insights." Required inputs: "Start with tickets, calls, surveys, reviews, interviews, product feedback, and customer segments." Workspace verb: assist.
- **Renewal & Expansion** — Description: "Prepares renewal briefs, value summaries, risk notes, stakeholder messages, and expansion opportunities from account data." Required inputs: "Start with account history, usage, outcomes, contract terms, stakeholder notes, and expansion signals." Workspace verb: produce.

## Subcategory: Community & Reputation
Best-fit user (all 3 tools below): "Built for community, support, and brand teams managing public customer conversations."

- **Testimonial Builder** — Description: "Turns customer outcomes, quotes, metrics, and use cases into testimonial drafts, case-study angles, and approval-ready proof points." Required inputs: "Start with customer quote, outcome metric, use case, approval status, story arc, and proof points." Workspace verb: build.
- **Review Response** — Description: "Drafts brand-safe responses to positive, neutral, and negative reviews while flagging issues that need service recovery." Required inputs: "Start with review text, rating, customer history, brand tone, issue category, and service recovery rules." Workspace verb: evaluate.
- **Community Engagement** — Description: "Plans and drafts community replies, prompts, announcements, and moderation guidance to keep customer spaces useful and active." Required inputs: "Start with community post, member context, moderation policy, product facts, tone rules, and next action." Workspace verb: produce.

---

# CATEGORY: Market Research & Strategy
- Review standard (all tools in this category): "Separate evidence from inference, cite source context, flag confidence level, and route strategic calls to leadership."
- Checked status (all tools in this category): "Ready for source review, confidence grading, and executive decision use."

## Subcategory: Competitive Intelligence
Best-fit user (all 3 tools below): "Built for strategy, sales, product marketing, and leadership teams monitoring competitors."

- **Competitor Analyzer** — Description: "Builds competitor profiles across positioning, product, pricing, channels, proof, and weaknesses so teams can act with context." Required inputs: "Start with competitor website, pricing, product pages, reviews, ads, news, and sales notes." Workspace verb: evaluate.
- **Battlecard Builder** — Description: "Creates sales-ready battlecards with competitor claims, traps, differentiators, objection responses, and discovery questions." Required inputs: "Start with competitor claims, differentiators, proof, objection history, pricing context, and sales scenarios." Workspace verb: build.
- **Market Movement Monitor** — Description: "Tracks launches, funding, hiring, messaging, pricing shifts, and news signals to alert teams when strategy should change." Required inputs: "Start with competitor feeds, news, funding, hiring, product launches, pricing pages, and messaging changes." Workspace verb: monitor.

## Subcategory: Audience & Customer Insight
Best-fit user (all 3 tools below): "Built for research, product, marketing, and CX teams turning customer signals into decisions."

- **Persona Builder** — Description: "Creates practical buyer personas from customer interviews, CRM data, reviews, jobs-to-be-done, pains, triggers, and decision criteria." Required inputs: "Start with interviews, CRM segments, reviews, surveys, buying triggers, objections, and jobs-to-be-done notes." Workspace verb: build.
- **Interview Synthesizer** — Description: "Turns transcripts and notes into themes, quotes, evidence strength, unmet needs, objections, and product or marketing implications." Required inputs: "Start with transcripts, notes, research questions, participant tags, product themes, and evidence rules." Workspace verb: produce.
- **Review Insight Miner** — Description: "Analyzes reviews across products or competitors to surface recurring complaints, praise drivers, feature gaps, and message opportunities." Required inputs: "Start with review exports, competitor products, star ratings, themes, dates, and customer segments." Workspace verb: evaluate.

## Subcategory: Pricing & Packaging
Best-fit user (all 3 tools below): "Built for founders, product marketers, finance, and strategy teams improving monetization."

- **Pricing Intelligence** — Description: "Compares plans, packaging, fences, discounts, usage limits, and buyer value signals to inform pricing and monetization choices." Required inputs: "Start with pricing pages, plan limits, packaging rules, discount notes, competitor offers, and value drivers." Workspace verb: produce.
- **Offer Research** — Description: "Tests and refines offer angles using audience pains, proof, urgency, objections, alternatives, and perceived value." Required inputs: "Start with audience pain, offer promise, proof, alternatives, objections, urgency drivers, and test channels." Workspace verb: produce.
- **Plan Builder** — Description: "Designs plan names, tiers, feature bundles, limits, and upgrade paths that align customer segments with business economics." Required inputs: "Start with feature list, buyer segments, willingness-to-pay signals, limits, upgrade logic, and margin goals." Workspace verb: build.

## Subcategory: Trend & Opportunity
Best-fit user (all 3 tools below): "Built for strategy, product, and growth teams scanning for emerging demand and market gaps."

- **Trend Finder** — Description: "Scans market signals, search behavior, content themes, and customer conversations to identify trends worth exploring." Required inputs: "Start with search trends, social signals, industry news, customer conversations, and competitor themes." Workspace verb: produce.
- **Market Gap Finder** — Description: "Maps customer needs against competitor coverage to identify underserved segments, missing workflows, and differentiated product angles." Required inputs: "Start with customer needs, competitor coverage, review complaints, feature maps, and segment opportunities." Workspace verb: produce.
- **Product Benchmarking** — Description: "Compares features, UX patterns, pricing, performance claims, and customer feedback to clarify where a product leads or lags." Required inputs: "Start with feature set, competitor products, UX references, pricing, performance claims, and customer feedback." Workspace verb: produce.

## Subcategory: Strategic Reports
Best-fit user (all 3 tools below): "Built for executives, consultants, and strategy teams packaging analysis into decisions."

- **Research Report Generator** — Description: "Turns collected evidence into structured reports with findings, implications, recommendations, risks, and source-backed assumptions." Required inputs: "Start with research notes, sources, findings, charts, assumptions, and target decision audience." Workspace verb: build.
- **Positioning Assistant** — Description: "Sharpens category narrative, audience promise, differentiation, proof points, and messaging hierarchy for a product or offer." Required inputs: "Start with product facts, audience, competitors, proof, category context, and differentiation hypotheses." Workspace verb: assist.
- **Decision Brief Builder** — Description: "Creates concise executive briefs that frame the decision, evidence, options, tradeoffs, recommendation, and next steps." Required inputs: "Start with decision question, evidence, options, constraints, risks, stakeholders, and recommendation criteria." Workspace verb: build.

---

# CATEGORY: Operations & Workflow Automation
- Review standard (all tools in this category): "Confirm process owner, exception path, approval requirement, data destination, and failure handling before activation."
- Checked status (all tools in this category): "Ready for process-owner review, automation build, and exception routing."

## Subcategory: Workflow Orchestration
Best-fit user (all 3 tools below): "Built for operations leaders and automation teams designing reliable end-to-end workflows."

- **Workflow Orchestrator** — Description: "Connects triggers, tools, approvals, data updates, and notifications into end-to-end workflows with clear ownership and error handling." Required inputs: "Start with trigger, systems, steps, owners, conditions, approvals, notifications, and exception rules." Workspace verb: produce.
- **Automation Blueprint** — Description: "Documents process goals, inputs, systems, rules, dependencies, exceptions, and success metrics before automation is built." Required inputs: "Start with process goal, inputs, systems, rules, dependencies, failure modes, and success metrics." Workspace verb: produce.
- **Process Mapping** — Description: "Converts interviews and operating notes into step-by-step process maps that expose bottlenecks, duplicate work, and automation opportunities." Required inputs: "Start with process interviews, current steps, handoffs, systems, wait times, exceptions, and pain points." Workspace verb: produce.

## Subcategory: Tasks, Approvals & Handoffs
Best-fit user (all 3 tools below): "Built for operations, finance, HR, delivery, and admin teams controlling internal handoffs."

- **Approval Engine** — Description: "Routes requests through policy-based approvals, captures decisions, sends reminders, and records the audit trail." Required inputs: "Start with request type, approval policy, approvers, thresholds, SLA, evidence, and escalation path." Workspace verb: produce.
- **Task Routing** — Description: "Assigns work based on type, priority, capacity, SLA, skills, and ownership rules so tasks land with the right team." Required inputs: "Start with task type, priority, owner rules, capacity, SLA, required skills, and destination system." Workspace verb: produce.
- **Internal Follow-Up** — Description: "Monitors open requests, overdue items, missing inputs, and stalled handoffs, then sends contextual reminders or escalations." Required inputs: "Start with open tasks, due dates, owners, dependencies, blockers, reminder cadence, and escalation rules." Workspace verb: produce.

## Subcategory: Document & Data Automation
Best-fit user (all 3 tools below): "Built for ops, finance, admin, and data teams extracting and cleaning business information."

- **Document Extraction** — Description: "Reads invoices, forms, contracts, PDFs, and uploaded files to extract structured fields for review, routing, or system entry." Required inputs: "Start with document file, target fields, validation rules, destination system, and exception handling requirements." Workspace verb: capture.
- **Form-to-Workflow** — Description: "Turns form submissions into tasks, approvals, CRM records, emails, and notifications based on request type and business rules." Required inputs: "Start with form response, request type, routing logic, approval rules, notifications, and record creation needs." Workspace verb: produce.
- **Data Cleanup** — Description: "Standardizes records, flags missing fields, deduplicates entries, and prepares messy data for reporting, migration, or automation." Required inputs: "Start with raw records, field standards, duplicate rules, validation requirements, and target reporting format." Workspace verb: produce.

## Subcategory: Reporting & Visibility
Best-fit user (all 3 tools below): "Built for managers and operators who need status, SLA, and performance visibility."

- **Operations Dashboard** — Description: "Creates an operational view of workload, status, bottlenecks, SLA risk, and team throughput from connected workflow data." Required inputs: "Start with workflow data, SLA targets, status fields, owners, bottleneck signals, and reporting cadence." Workspace verb: monitor.
- **Weekly Business Summary** — Description: "Summarizes progress, blockers, metrics, risks, decisions, and upcoming priorities into a leadership-ready weekly update." Required inputs: "Start with project updates, metrics, blockers, decisions, risks, wins, and next-week priorities." Workspace verb: produce.
- **SLA & Escalation** — Description: "Tracks service commitments, warns teams before breaches, escalates overdue work, and documents resolution history." Required inputs: "Start with service commitments, due dates, ticket status, priority rules, owners, and escalation thresholds." Workspace verb: produce.

---

# CATEGORY: Business Systems & Knowledge
- Review standard (all tools in this category): "Check permissions, source freshness, system ownership, data mapping, and knowledge governance before deployment."
- Checked status (all tools in this category): "Ready for admin review, permission check, and system connection."

## Subcategory: Internal Knowledge & RAG
Best-fit user (all 3 tools below): "Built for employees, managers, and enablement teams using governed company knowledge."

- **Internal Knowledge Assistant** — Description: "Answers employee questions from approved knowledge sources, cites context, suggests actions, and flags gaps in documentation." Required inputs: "Start with company docs, policies, SOPs, product notes, permission rules, and citation requirements." Workspace verb: assist.
- **Knowledge Base Builder** — Description: "Turns scattered docs, tickets, policies, and product notes into organized articles, categories, FAQs, and update workflows." Required inputs: "Start with source docs, ticket history, product notes, categories, article owners, and update cadence." Workspace verb: build.
- **Policy & SOP Generator** — Description: "Creates practical policies and standard operating procedures with owners, steps, controls, exceptions, and review cycles." Required inputs: "Start with process notes, policy requirements, owners, controls, exceptions, and review schedule." Workspace verb: build.

## Subcategory: CRM, ERP & Core Systems
Best-fit user (all 3 tools below): "Built for small business operators and department heads centralizing core system workflows."

- **Lightweight CRM** — Description: "Sets up a simple customer system for contacts, accounts, pipeline, activity history, reminders, and handoffs without enterprise complexity." Required inputs: "Start with contact records, accounts, stages, activity notes, reminders, custom fields, and reporting needs." Workspace verb: produce.
- **Modular ERP** — Description: "Designs lightweight modules for inventory, finance, procurement, operations, and reporting so core business data stays coordinated." Required inputs: "Start with operations data, inventory or finance modules, approval rules, reporting needs, and department workflows." Workspace verb: produce.
- **LMS & Training** — Description: "Builds role-based training paths, lessons, quizzes, completion tracking, and refresh schedules from internal knowledge and process docs." Required inputs: "Start with training content, learner roles, skill goals, lessons, quizzes, and completion tracking needs." Workspace verb: produce.

## Subcategory: Integration & Data
Best-fit user (all 3 tools below): "Built for technical operators, automation builders, and business systems teams connecting apps."

- **Integration Layer** — Description: "Defines and connects the data paths between business apps so workflows can trigger, update, and reconcile across systems." Required inputs: "Start with source apps, destination apps, field mappings, sync frequency, permissions, and failure rules." Workspace verb: produce.
- **API & Webhook Workflows** — Description: "Creates event-driven workflows using APIs and webhooks to move data, trigger actions, and notify teams in real time." Required inputs: "Start with event trigger, API endpoints, payload fields, authentication, actions, and error handling." Workspace verb: produce.
- **Data Sync Monitor** — Description: "Watches connected systems for failed syncs, stale records, mismatched fields, and integration errors that need attention." Required inputs: "Start with connected systems, sync logs, field mappings, freshness rules, and alert thresholds." Workspace verb: monitor.

## Subcategory: Websites & Portals
Best-fit user (all 3 tools below): "Built for web, operations, sales, and client-service teams creating self-serve digital experiences."

- **AI Website Builder** — Description: "Builds conversion-focused website drafts from brand, offer, audience, pages, content blocks, and action paths." Required inputs: "Start with brand details, offer, pages, audience, conversion goal, content blocks, and style direction." Workspace verb: build.
- **Client Portal Builder** — Description: "Creates secure portal structures for clients to view progress, share files, submit requests, approve work, and find key information." Required inputs: "Start with client roles, access rules, project data, files, requests, approvals, and notification needs." Workspace verb: build.
- **Embedded AI Widget** — Description: "Adds an AI assistant to a site or portal that answers questions, qualifies users, starts workflows, and routes human help." Required inputs: "Start with site context, knowledge base, user intents, workflow triggers, routing rules, and brand tone." Workspace verb: produce.

---

# CATEGORY: Product, Project & Delivery
- Review standard (all tools in this category): "Validate scope, dependencies, acceptance criteria, customer impact, and owner accountability before execution."
- Checked status (all tools in this category): "Ready for delivery review, owner assignment, and milestone tracking."

## Subcategory: Product Planning
Best-fit user (all 3 tools below): "Built for product managers, founders, designers, and engineering leads shaping product direction."

- **PRD Generator** — Description: "Turns product goals, user problems, requirements, constraints, and success metrics into a clear product requirements document." Required inputs: "Start with product goal, user problem, requirements, constraints, success metrics, and stakeholder notes." Workspace verb: build.
- **Roadmap Prioritization** — Description: "Scores features by impact, effort, confidence, risk, customer demand, and strategic fit to support better roadmap decisions." Required inputs: "Start with feature backlog, customer evidence, impact scores, effort estimates, risk, and strategic goals." Workspace verb: plan.
- **Feature Spec Writer** — Description: "Creates feature specs with user stories, acceptance criteria, edge cases, dependencies, analytics needs, and rollout notes." Required inputs: "Start with feature idea, user stories, edge cases, dependencies, analytics needs, and acceptance criteria." Workspace verb: build.

## Subcategory: Project Delivery
Best-fit user (all 3 tools below): "Built for project managers, delivery teams, and operators coordinating execution."

- **Project Plan Builder** — Description: "Converts scope, goals, timeline, team, dependencies, and risks into a project plan with milestones and owners." Required inputs: "Start with scope, goals, timeline, team, dependencies, milestones, risks, and communication cadence." Workspace verb: build.
- **Sprint Planner** — Description: "Turns backlog items, capacity, priority, and dependencies into a sprint plan with clear commitments and risk flags." Required inputs: "Start with backlog, velocity, capacity, priorities, dependencies, risks, and sprint goal." Workspace verb: plan.
- **Status Report Assistant** — Description: "Creates concise project updates with progress, blockers, decisions needed, timeline changes, risks, and next actions." Required inputs: "Start with project notes, milestones, blockers, risks, decisions, metric updates, and next actions." Workspace verb: assist.

## Subcategory: Client Work
Best-fit user (all 3 tools below): "Built for agencies, consultants, and service teams managing repeatable client delivery."

- **Client Onboarding** — Description: "Builds onboarding checklists, kickoff agendas, intake forms, timelines, and communication plans for new client work." Required inputs: "Start with client goals, contract scope, stakeholders, files, kickoff agenda, and milestone dates." Workspace verb: produce.
- **Brief & Scope Builder** — Description: "Turns discovery notes into a clear brief, scope, deliverables, assumptions, exclusions, timeline, and change-control language." Required inputs: "Start with discovery notes, client goals, deliverables, assumptions, exclusions, timeline, and change rules." Workspace verb: build.
- **Deliverable Review** — Description: "Reviews drafts against brief, brand, scope, quality bar, and acceptance criteria, then produces revision notes." Required inputs: "Start with draft deliverable, brief, scope, brand rules, acceptance criteria, and revision standards." Workspace verb: evaluate.

## Subcategory: Releases
Best-fit user (all 3 tools below): "Built for product, marketing, support, and customer teams preparing launches."

- **Release Notes Generator** — Description: "Turns shipped work into clear release notes grouped by user value, feature, fix, known limitation, and next step." Required inputs: "Start with completed work, user impact, fixes, known limits, screenshots, and rollout notes." Workspace verb: build.
- **Launch Checklist** — Description: "Creates a launch readiness checklist across product, marketing, sales, support, analytics, legal, and operations." Required inputs: "Start with launch goal, release date, product readiness, marketing assets, support docs, and owner list." Workspace verb: plan.
- **Beta Feedback** — Description: "Synthesizes beta survey responses, interviews, usage notes, and bugs into themes, priority issues, and launch recommendations." Required inputs: "Start with survey responses, interviews, usage notes, bug reports, tester segments, and release criteria." Workspace verb: produce.

---

# CATEGORY: Finance, Admin & Compliance
- Review standard (all tools in this category): "Require human approval for money movement, legal-adjacent decisions, employee records, compliance claims, and vendor commitments."
- Checked status (all tools in this category): "Ready for policy review, audit trail capture, and human approval."

## Subcategory: Invoices & Reconciliation
Best-fit user (all 3 tools below): "Built for finance and admin teams processing spend, invoices, and receipts."

- **Invoice Processing** — Description: "Extracts vendor, amount, tax, due date, PO, and line items from invoices, then routes exceptions for finance review." Required inputs: "Start with invoice, vendor data, PO, line items, tax, due date, and approval rules." Workspace verb: assist.
- **Expense Categorizer** — Description: "Classifies expenses by policy, category, project, vendor, and anomaly risk so finance teams can review faster." Required inputs: "Start with expense record, receipt, policy, category rules, project codes, and anomaly thresholds." Workspace verb: produce.
- **Receipt Capture** — Description: "Reads receipts, captures key fields, matches spend to users or projects, and prepares clean records for reimbursement." Required inputs: "Start with receipt image, employee or project ID, merchant, date, tax, category, and reimbursement rules." Workspace verb: capture.

## Subcategory: Contracts & Risk
Best-fit user (all 3 tools below): "Built for legal-adjacent, finance, procurement, and leadership teams reviewing obligations and risk."

- **Contract Review** — Description: "Summarizes key terms, obligations, renewal dates, red flags, and negotiation points for human legal or business review." Required inputs: "Start with contract draft, clause library, commercial terms, obligations, renewal rules, and risk thresholds." Workspace verb: evaluate.
- **Risk Summary** — Description: "Turns contracts, incidents, vendors, or projects into a concise risk view with likelihood, impact, controls, and recommended actions." Required inputs: "Start with risk source, context, controls, likelihood, impact, owner, and mitigation options." Workspace verb: produce.
- **Clause Library** — Description: "Organizes approved clauses, fallback positions, usage notes, and negotiation guidance so teams draft consistently." Required inputs: "Start with approved clauses, fallback language, usage notes, negotiation positions, and contract types." Workspace verb: produce.

## Subcategory: Compliance
Best-fit user (all 3 tools below): "Built for operations, finance, HR, and leadership teams preparing governance evidence."

- **Compliance Checklist** — Description: "Creates role-specific compliance checklists with evidence needed, owners, frequency, control mapping, and completion tracking." Required inputs: "Start with regulation or policy, controls, evidence requirements, owners, frequency, and completion status." Workspace verb: plan.
- **Policy Review** — Description: "Reviews policies for clarity, coverage, outdated language, owner gaps, and alignment with internal standards." Required inputs: "Start with policy draft, internal standards, control requirements, owner notes, and outdated sections." Workspace verb: evaluate.
- **Audit Prep** — Description: "Collects evidence requests, maps controls, identifies missing documentation, prepares status updates, and tracks audit readiness." Required inputs: "Start with audit request list, control map, evidence links, owners, deadlines, and gap notes." Workspace verb: evaluate.

## Subcategory: HR & Admin
Best-fit user (all 3 tools below): "Built for people, admin, operations, and leadership teams managing internal coordination."

- **Employee On/Off-boarding** — Description: "Coordinates access, equipment, documents, training, introductions, exit steps, and compliance tasks for employee lifecycle events." Required inputs: "Start with employee role, start or exit date, access list, equipment, training, and compliance tasks." Workspace verb: produce.
- **Meeting Notes & Actions** — Description: "Turns meeting recordings or notes into decisions, action items, owners, deadlines, risks, and follow-up reminders." Required inputs: "Start with meeting transcript, attendees, agenda, decisions, action items, deadlines, and owners." Workspace verb: produce.
- **Vendor Management** — Description: "Tracks vendor records, renewals, contracts, performance notes, compliance documents, and approval workflows in one managed process." Required inputs: "Start with vendor profile, contract dates, renewal terms, performance notes, documents, and approval status." Workspace verb: produce.

---
Entry count: 121 tools captured (16 Content, 15 Marketing, 15 Sales, 12 CX, 15 Research, 12 Ops, 12 Systems, 12 Product, 12 Finance), each with Description + Required inputs + workspace verb; 9 category-level Review-standard/Checked-status pairs; 42 subcategory-level Best-fit-user statements.
