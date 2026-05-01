import fs from 'fs';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

const doc = new Document({
  creator: "AI Agentix",
  title: "Website Content Review",
  description: "Comprehensive content of the AI Agentix website for client review.",
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: "AI Agentix — Website Content Review",
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          text: "Please review the content below. Each section represents a page or component on the website. You can add comments, edits, and highlight parts that need to be updated.",
          spacing: { after: 400 },
        }),

        // ── HOME PAGE ──
        new Paragraph({ text: "1. Home Page", heading: HeadingLevel.HEADING_1 }),
        
        new Paragraph({ text: "Hero Section", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "Tagline: ", bold: true }), new TextRun("AI Solution provider & Big Data Experts Company")] }),
        new Paragraph({ children: [new TextRun({ text: "Headline: ", bold: true }), new TextRun("Driving changes through AI & Agentic Automation")] }),
        new Paragraph({ children: [new TextRun({ text: "CTA Buttons: ", bold: true }), new TextRun("Read case studies | Let's talk")] }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "Service Highlights", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "• AI Consulting: ", bold: true }), new TextRun("Discover AI's practical advantages with custom solutions tailored to your business model.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Generative AI: ", bold: true }), new TextRun("Adapt cutting-edge Generative AI to your business needs.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Big Data Consulting: ", bold: true }), new TextRun("Transform your data into actionable business insights.")] }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "Core Capabilities", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "• AI Consulting: ", bold: true }), new TextRun("Create the AI strategy with expert guidance, identify the most impactful AI opportunities.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Generative AI Development: ", bold: true }), new TextRun("Leverage cutting-edge generative AI to power products and workflows.")] }),
        new Paragraph({ children: [new TextRun({ text: "• AI Business Buddy: ", bold: true }), new TextRun("AI-Driven Knowledge Management for your team.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Computer Vision Solutions: ", bold: true }), new TextRun("Empower your systems to interpret and act on visual data with human-like accuracy.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Data Engineering Services: ", bold: true }), new TextRun("Transform raw data into actionable insights with robust pipelines.")] }),
        new Paragraph({ children: [new TextRun({ text: "• MLOps: ", bold: true }), new TextRun("Streamline your ML lifecycle from development to production.")] }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "Customer Stories", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "• Stackflow Inc.: ", bold: true }), new TextRun("Autonomous Lead Generation Engine for a SaaS Startup. 3.9x Increase in qualified meetings.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Velora Platform: ", bold: true }), new TextRun("24/7 AI Support Agent for a 50,000-User Platform. 74% Autonomous ticket resolution.")] }),
        new Paragraph({ children: [new TextRun({ text: "• BrightWave Agency: ", bold: true }), new TextRun("End-to-End n8n Automation for a Digital Marketing Agency. 26 hours/week saved.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Prismatic Legal: ", bold: true }), new TextRun("Intelligent Contract Analysis System for a Legal Firm. 68% Reduction in review time.")] }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "Industry Expertise", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "• Aviation: ", bold: true }), new TextRun("AI solutions tailored for enhancing passenger experiences, optimising operations.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Private Investments: ", bold: true }), new TextRun("AI-powered platforms for deal sourcing, portfolio monitoring, and predictive valuation.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Finance & Insurance: ", bold: true }), new TextRun("Real-time fraud detection platforms, intelligent document verification systems.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Manufacturing: ", bold: true }), new TextRun("Quality control, predictive maintenance, CAD standardisation, traceability.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Retail: ", bold: true }), new TextRun("Image quality detection, store compliance analysis, demand forecasting.")] }),
        new Paragraph({ children: [new TextRun({ text: "• Logistics: ", bold: true }), new TextRun("Intermodal transportation data platforms, AI-based demand forecasting.")] }),
        new Paragraph({ spacing: { after: 400 } }),

        // ── ABOUT PAGE ──
        new Paragraph({ text: "2. About Page", heading: HeadingLevel.HEADING_1 }),
        
        new Paragraph({ text: "Who We Are", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ children: [new TextRun({ text: "Headline: ", bold: true }), new TextRun("We Build AI That Actually Works")] }),
        new Paragraph({ text: "Description: We are a global team of engineers, architects, and AI specialists obsessed with shipping production-grade AI systems that create real business value — not demos, not decks, not hype." }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "Our Mission", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: "Description: AI Agentix exists to close the gap between AI potential and business reality. We partner with forward-thinking companies to design, build, and operate AI systems that actually move the needle — automating workflows, augmenting teams, and unlocking revenue." }),
        new Paragraph({ text: "We believe the best AI work happens when deep engineering craft meets genuine business understanding. That is why every engagement is led by senior engineers who have shipped AI in the real world — not junior consultants reading playbooks." }),
        new Paragraph({ text: "Value Pillars:", bold: true }),
        new Paragraph({ text: "• Engineers, not consultants: We write the code. We own the deployment. We fix the bugs." }),
        new Paragraph({ text: "• Production-first mindset: Every solution is built to run reliably at scale from day one." }),
        new Paragraph({ text: "• No AI hype — only outcomes: We measure success in ROI, automation hours, and cost saved." }),
        new Paragraph({ text: "• Global remote team: Top-tier AI talent across 12 time zones, always available." }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "What We Build", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: "• Agentic AI Systems: Autonomous agents that reason, plan, and act across complex multi-step workflows." }),
        new Paragraph({ text: "• LLM Integrations: GPT-4, Claude, Gemini, and open-source models wired into your product." }),
        new Paragraph({ text: "• RAG & Knowledge Bases: Retrieval-augmented generation pipelines." }),
        new Paragraph({ text: "• Workflow Automation: n8n, Zapier, and custom orchestration layers." }),
        new Paragraph({ text: "• Custom AI APIs: Production-hardened REST and GraphQL APIs." }),
        new Paragraph({ text: "• AI Analytics & Insight: Dashboards and anomaly-detection systems powered by ML." }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ text: "Why Choose Us", heading: HeadingLevel.HEADING_2 }),
        new Paragraph({ text: "• Ship in Weeks, Not Months" }),
        new Paragraph({ text: "• Enterprise-Grade Security" }),
        new Paragraph({ text: "• Obsessively Iterative" }),
        new Paragraph({ text: "• Built for Scale" }),
        new Paragraph({ spacing: { after: 400 } }),

        // ── CONTACT PAGE ──
        new Paragraph({ text: "3. Contact Page", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ children: [new TextRun({ text: "Headline: ", bold: true }), new TextRun("Let's Build Something")] }),
        new Paragraph({ text: "Description: Tell us about your project. We design tailored AI solutions and move fast from discovery to deployment." }),
        new Paragraph({ text: "Badges:", bold: true }),
        new Paragraph({ text: "• Reply in 24h: Guaranteed response on business days" }),
        new Paragraph({ text: "• NDA Available: Strict confidentiality from day one" }),
        new Paragraph({ text: "• Fixed-price PoC: Scoped, budgeted, no surprises" }),
        new Paragraph({ spacing: { after: 200 } }),
        new Paragraph({ text: "What Happens Next:", bold: true }),
        new Paragraph({ text: "01. Tell us your challenge" }),
        new Paragraph({ text: "02. We design a solution" }),
        new Paragraph({ text: "03. We start building" }),
        new Paragraph({ spacing: { after: 400 } }),

        // ── SERVICES & SOLUTIONS ──
        new Paragraph({ text: "4. Services & Solutions Offerings", heading: HeadingLevel.HEADING_1 }),
        new Paragraph({ text: "Here is the list of our core service pages:" }),
        new Paragraph({ text: "• AI Consulting & Strategy" }),
        new Paragraph({ text: "• AI Agents Development" }),
        new Paragraph({ text: "• n8n Workflow Automation" }),
        new Paragraph({ text: "• LLM Integration" }),
        new Paragraph({ text: "• Generative AI Development" }),
        new Paragraph({ text: "• Custom AI Chatbots" }),
        new Paragraph({ text: "• Data Engineering" }),
        new Paragraph({ text: "• AI Integration Services" }),
        new Paragraph({ text: "• MLOps Consulting" }),
        new Paragraph({ spacing: { after: 400 } }),

      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("AI-Agentix-Website-Content.docx", buffer);
  console.log("📄 Word document created: AI-Agentix-Website-Content.docx");
});