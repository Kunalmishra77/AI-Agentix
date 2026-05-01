const SOLUTIONS = [
  {
    slug: 'document-processing',
    title: 'AI Document Processing',
    tagline: 'Transform unstructured documents into structured, actionable data — automatically.',
    metaDesc:
      'AI Agentix document processing solution uses LLMs and OCR to extract, classify, and route data from any document type at enterprise scale.',
    heroStats: [
      { value: '95%', label: 'Extraction Accuracy' },
      { value: '10x', label: 'Faster Than Manual Review' },
      { value: '80%', label: 'Reduction in Processing Cost' },
    ],
    overview:
      'Our AI Document Processing solution ingests documents in any format — PDFs, scanned images, Word files, and emails — and converts them into clean, structured data your systems can act on. Powered by fine-tuned large language models and enterprise-grade OCR, it handles everything from invoices and contracts to medical records and compliance filings. The pipeline integrates directly with your existing ERP, CRM, and workflow tools, eliminating manual data entry entirely.',
    features: [
      {
        icon: 'magnifying-glass',
        title: 'Intelligent OCR & Layout Analysis',
        desc: 'Beyond pixel-level text extraction, our engine understands document structure — tables, headers, footers, and multi-column layouts — producing clean output regardless of scan quality.',
      },
      {
        icon: 'tag',
        title: 'Automated Classification & Routing',
        desc: 'Documents are automatically classified by type, intent, and urgency, then routed to the appropriate downstream system or human reviewer with zero manual intervention.',
      },
      {
        icon: 'link',
        title: 'Entity & Relationship Extraction',
        desc: 'Named-entity recognition identifies parties, dates, amounts, clauses, and custom fields defined by your schema, building a rich knowledge graph from raw documents.',
      },
      {
        icon: 'circle-check',
        title: 'Confidence Scoring & Human-in-the-Loop',
        desc: 'Every extracted field carries a confidence score. Low-confidence values are flagged for human review through a streamlined UI, preserving accuracy without slowing throughput.',
      },
      {
        icon: 'lock',
        title: 'Redaction & Compliance',
        desc: 'PII, PHI, and sensitive financial data are automatically detected and redacted before storage or forwarding, keeping your workflows compliant with GDPR, HIPAA, and SOC 2.',
      },
      {
        icon: 'bolt',
        title: 'Real-Time & Batch Processing',
        desc: 'Process a single urgent document in under three seconds via REST API, or queue millions of records for overnight batch runs — the same pipeline handles both modes seamlessly.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Ingestion & Pre-processing',
        desc: 'Documents arrive via email, SFTP, API upload, or direct integration with SharePoint and Google Drive. Images are deskewed, denoised, and normalized before analysis.',
      },
      {
        step: 2,
        title: 'OCR & Layout Parsing',
        desc: 'A hybrid OCR engine (Tesseract + proprietary deep-learning model) extracts text while a layout parser identifies structural regions such as tables, signatures, and stamps.',
      },
      {
        step: 3,
        title: 'LLM-Powered Data Extraction',
        desc: 'A fine-tuned LLM reads the parsed content and populates a user-defined JSON schema with extracted entities, relationships, and metadata with per-field confidence scores.',
      },
      {
        step: 4,
        title: 'Validation & Enrichment',
        desc: 'Extracted values are cross-validated against business rules, lookup tables, and external APIs (e.g., vendor databases, tax IDs) to catch errors before they reach downstream systems.',
      },
      {
        step: 5,
        title: 'Delivery & Audit Trail',
        desc: 'Clean structured data is delivered to your target system via webhook, direct DB write, or message queue. Every action is logged to an immutable audit trail for compliance.',
      },
    ],
    industries: [
      {
        name: 'Financial Services',
        desc: 'Automate loan applications, KYC document verification, trade confirmations, and regulatory filings with full audit trails.',
      },
      {
        name: 'Healthcare',
        desc: 'Extract clinical data from referral letters, lab reports, and insurance claims while maintaining HIPAA compliance throughout.',
      },
      {
        name: 'Legal & Compliance',
        desc: 'Review and abstract contracts, court filings, and due-diligence packages at a fraction of the time and cost of manual review.',
      },
      {
        name: 'Logistics & Supply Chain',
        desc: 'Parse bills of lading, customs declarations, and purchase orders to keep shipment data accurate and systems synchronized.',
      },
    ],
    technologies: [
      'GPT-4o',
      'Tesseract OCR',
      'Apache Tika',
      'LangChain',
      'Apache Kafka',
      'PostgreSQL',
      'Redis',
      'AWS Textract',
    ],
    results: [
      {
        value: '95%',
        label: 'Field Extraction Accuracy',
        desc: 'Across diverse document types including handwritten forms and low-resolution scans.',
      },
      {
        value: '10x',
        label: 'Throughput vs. Manual',
        desc: 'Teams that processed 500 documents per day now handle 5,000+ with the same headcount.',
      },
      {
        value: '80%',
        label: 'Cost Reduction',
        desc: 'Clients report an average 80% drop in per-document processing cost within 90 days of deployment.',
      },
      {
        value: '<3s',
        label: 'Real-Time Latency',
        desc: 'Single-document extraction via API completes in under three seconds end-to-end.',
      },
    ],
    faq: [
      {
        q: 'What document formats does the solution support?',
        a: 'We support PDF (native and scanned), DOCX, XLSX, PNG, JPEG, TIFF, EML, and MSG. Multi-page and password-protected PDFs are handled natively. Custom parsers for proprietary formats can be added on request.',
      },
      {
        q: 'How do you handle low-quality or partially damaged scans?',
        a: 'Our pre-processing pipeline applies adaptive thresholding, deskewing, and super-resolution upscaling before OCR. Confidence scores will reflect lower certainty for degraded inputs, and those fields are automatically routed for human review.',
      },
      {
        q: 'Can we define custom extraction schemas for our document types?',
        a: 'Yes. You define a JSON schema describing the fields, data types, and validation rules you need. The LLM is prompted against your schema, so no model retraining is required for new document types.',
      },
      {
        q: 'Is our document data used to train your models?',
        a: 'No. Customer document data is never used for model training. All processing happens within isolated tenant environments, and data is deleted from our systems after delivery unless you configure longer retention.',
      },
    ],
  },

  {
    slug: 'knowledge-base',
    title: 'AI-Powered Knowledge Base',
    tagline: 'Give every employee instant access to your organization\'s collective intelligence.',
    metaDesc:
      'AI Agentix Knowledge Base solution turns siloed documents, wikis, and databases into a single queryable AI assistant that answers in seconds with cited sources.',
    heroStats: [
      { value: '60%', label: 'Faster Employee Onboarding' },
      { value: '4.2x', label: 'Support Ticket Deflection' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    overview:
      'The AI-Powered Knowledge Base solution aggregates content from every corner of your enterprise — SharePoint, Confluence, Notion, Salesforce, internal databases, and email archives — and makes it instantly queryable through a natural-language interface. Unlike keyword search, the system understands intent, disambiguates jargon, and synthesizes answers from multiple sources with transparent citations. It deploys as a chat widget, Slack bot, Teams app, or headless API in under two weeks.',
    features: [
      {
        icon: 'brain',
        title: 'Semantic Search & Retrieval-Augmented Generation',
        desc: 'Queries are embedded and matched against a vector index of your content. A retrieval-augmented generation pipeline fetches the top passages and instructs the LLM to synthesize a grounded, cited answer.',
      },
      {
        icon: 'link',
        title: 'Universal Connector Library',
        desc: 'Out-of-the-box connectors for SharePoint, Confluence, Notion, Google Drive, Salesforce, Zendesk, GitHub, and Jira keep the knowledge base continuously synchronized with live content.',
      },
      {
        icon: 'link',
        title: 'Transparent Source Citations',
        desc: 'Every answer includes clickable references to the exact source documents and page numbers used, so users can verify answers and navigate directly to authoritative content.',
      },
      {
        icon: 'shield',
        title: 'Permission-Aware Access Control',
        desc: 'The system respects your existing identity provider permissions. Users only receive answers drawn from content they are authorized to view, with no risk of privilege escalation.',
      },
      {
        icon: 'chart-bar',
        title: 'Usage Analytics & Knowledge Gap Detection',
        desc: 'A real-time dashboard surfaces the most common queries, unanswered questions, and content staleness signals — giving knowledge managers a clear roadmap for improvement.',
      },
      {
        icon: 'globe',
        title: 'Multilingual Support',
        desc: 'Queries and answers are handled in over 40 languages. Content in one language can be retrieved and summarized in response to a query in another, enabling global teams to share knowledge seamlessly.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Content Discovery & Ingestion',
        desc: 'Connectors crawl authorized content sources on a configurable schedule, extracting text, metadata, and access-control lists into a staging pipeline.',
      },
      {
        step: 2,
        title: 'Chunking, Cleaning & Embedding',
        desc: 'Documents are chunked at semantic boundaries, cleaned of boilerplate, and converted into high-dimensional vector embeddings using a best-in-class embedding model.',
      },
      {
        step: 3,
        title: 'Vector Index Construction',
        desc: 'Embeddings are stored in a managed vector database (Pinecone or Weaviate) alongside rich metadata for hybrid keyword + semantic retrieval.',
      },
      {
        step: 4,
        title: 'Query Processing & Answer Generation',
        desc: 'User queries are embedded, retrieval fetches the top-k passages, and the LLM generates a grounded answer with inline citations within 1–2 seconds.',
      },
      {
        step: 5,
        title: 'Continuous Sync & Freshness',
        desc: 'Changed and deleted documents are detected by webhooks and change-data-capture feeds, keeping the index fresh without full re-indexing.',
      },
    ],
    industries: [
      {
        name: 'Technology & SaaS',
        desc: 'Provide instant answers from engineering runbooks, product docs, and support playbooks, reducing escalations and onboarding time for new engineers.',
      },
      {
        name: 'Professional Services',
        desc: 'Surface relevant case precedents, proposal templates, and methodology frameworks instantly, helping consultants deliver better work faster.',
      },
      {
        name: 'Healthcare',
        desc: 'Give clinical staff rapid access to treatment protocols, drug interactions, and regulatory guidance without leaving their workflow.',
      },
      {
        name: 'Financial Services',
        desc: 'Enable advisors and analysts to query compliance manuals, product sheets, and research reports in natural language with full citation trails.',
      },
    ],
    technologies: [
      'OpenAI GPT-4o',
      'Pinecone',
      'Weaviate',
      'LangChain',
      'Elasticsearch',
      'Azure Active Directory',
      'OAuth 2.0',
      'Apache Airflow',
    ],
    results: [
      {
        value: '60%',
        label: 'Faster Onboarding',
        desc: 'New hires reach productivity benchmarks 60% faster by querying institutional knowledge rather than hunting through wikis.',
      },
      {
        value: '4.2x',
        label: 'Support Ticket Deflection',
        desc: 'Customers and employees self-serve answers, reducing inbound support volume by over 75% for common query types.',
      },
      {
        value: '87%',
        label: 'Answer Accuracy',
        desc: 'Grounded retrieval ensures answers are accurate and up-to-date, as verified by quarterly human evaluation panels.',
      },
      {
        value: '1.4s',
        label: 'Average Response Latency',
        desc: 'End-to-end query-to-answer latency including retrieval and generation averages 1.4 seconds at the 95th percentile.',
      },
    ],
    faq: [
      {
        q: 'How do you handle sensitive or confidential documents?',
        a: 'The system mirrors your existing permission model. Content tagged as confidential in the source system is only indexed into tenant-isolated partitions that are queryable solely by users with the corresponding access rights in your identity provider.',
      },
      {
        q: 'How long does initial setup and indexing take?',
        a: 'For a corpus of up to 500,000 documents, initial indexing typically completes within 48 hours of connector configuration. Smaller corpora (under 50,000 documents) are indexed within a few hours.',
      },
      {
        q: 'Can the knowledge base answer questions about real-time data like CRM records?',
        a: 'Yes. For highly dynamic data sources such as Salesforce or live databases, we offer a live-query retrieval mode that fetches data at query time rather than from the index, ensuring real-time accuracy for structured records.',
      },
      {
        q: 'What happens when the AI does not know an answer?',
        a: 'The system is instructed to express uncertainty rather than hallucinate. When no relevant content is found, it tells the user it does not have a reliable answer and suggests escalation paths or related topics it can assist with.',
      },
    ],
  },

  {
    slug: 'enterprise-genai',
    title: 'Enterprise Generative AI Platform',
    tagline: 'A governed, scalable foundation to deploy and manage generative AI across your entire organization.',
    metaDesc:
      'AI Agentix Enterprise GenAI Platform gives large organizations the model orchestration, governance, cost management, and developer tooling needed to scale AI safely and efficiently.',
    heroStats: [
      { value: '300+', label: 'Enterprises Deployed' },
      { value: '40%', label: 'Average AI Cost Reduction' },
      { value: 'SOC 2 Type II', label: 'Certified Infrastructure' },
    ],
    overview:
      'The Enterprise Generative AI Platform is a full-stack solution that gives your organization a single, governed control plane for all AI workloads. It abstracts across foundation models from OpenAI, Anthropic, Google, and open-source providers so teams can choose the right model for each task while central IT maintains visibility, cost control, and compliance. Built-in prompt management, evaluation frameworks, and a self-service developer portal accelerate time-to-production for every AI initiative.',
    features: [
      {
        icon: 'building',
        title: 'Multi-Model Orchestration',
        desc: 'Route requests intelligently across GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3, and your own fine-tuned models based on latency, cost, capability, and compliance requirements.',
      },
      {
        icon: 'lock',
        title: 'Centralized Governance & Policy Engine',
        desc: 'Define organization-wide policies for data classification, PII handling, content filtering, and approved model usage. Policies are enforced at the API gateway layer before requests reach any model.',
      },
      {
        icon: 'dollar-sign',
        title: 'Cost Management & FinOps',
        desc: 'Real-time token usage dashboards, per-team budget caps, and automated model-routing rules that fall back to cheaper models when quality requirements are met eliminate runaway AI spend.',
      },
      {
        icon: 'flask',
        title: 'Prompt Registry & Versioning',
        desc: 'A centralized prompt registry with Git-style versioning, A/B testing support, and automated evaluation pipelines ensures production prompts are tested, approved, and auditable.',
      },
      {
        icon: 'wrench',
        title: 'Developer Self-Service Portal',
        desc: 'An internal developer portal with API key management, usage quotas, SDK snippets, and a prompt playground lets engineering teams move fast within defined guardrails.',
      },
      {
        icon: 'chart-line',
        title: 'Observability & Evaluation Suite',
        desc: 'Every LLM call is logged with latency, token counts, model version, and user context. Automated evaluation harnesses score output quality, hallucination rate, and policy compliance continuously.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Architecture Design',
        desc: 'We map your existing AI initiatives, data flows, compliance requirements, and team structures to design a platform architecture that fits your enterprise without disrupting in-flight projects.',
      },
      {
        step: 2,
        title: 'Platform Deployment',
        desc: 'The platform is deployed to your cloud environment (AWS, Azure, or GCP) or on-premises Kubernetes cluster in a dedicated VPC with private endpoints, ensuring no data leaves your environment.',
      },
      {
        step: 3,
        title: 'Policy & Governance Configuration',
        desc: 'Your security and compliance teams configure data classification rules, approved model lists, content filters, and audit log destinations through a no-code policy editor.',
      },
      {
        step: 4,
        title: 'Team Onboarding & SDK Integration',
        desc: 'Development teams are onboarded via the self-service portal. Our SDK wraps the platform API behind familiar interfaces, so existing applications require minimal code changes.',
      },
      {
        step: 5,
        title: 'Ongoing Optimization & Support',
        desc: 'A dedicated customer success engineer reviews your usage quarterly, identifying cost-optimization opportunities, emerging model upgrades, and new capability rollouts.',
      },
    ],
    industries: [
      {
        name: 'Financial Services',
        desc: 'Meet strict regulatory requirements for AI model governance, explainability, and audit trails while enabling trading desks, risk teams, and customer service to leverage generative AI.',
      },
      {
        name: 'Healthcare & Life Sciences',
        desc: 'Deploy AI applications in a HIPAA-compliant environment with PHI isolation, consent management, and clinical decision support guardrails built in from day one.',
      },
      {
        name: 'Government & Defense',
        desc: 'Run models entirely within air-gapped, on-premises deployments with FedRAMP-ready architecture and full data sovereignty, with no external API dependencies.',
      },
      {
        name: 'Telecommunications',
        desc: 'Scale AI across network operations, customer service, and product development teams with the governance controls needed for regulated customer data handling.',
      },
    ],
    technologies: [
      'OpenAI GPT-4o',
      'Anthropic Claude 3.5',
      'Google Gemini 1.5',
      'Meta Llama 3',
      'Kubernetes',
      'HashiCorp Vault',
      'Apache Kafka',
      'Prometheus & Grafana',
    ],
    results: [
      {
        value: '40%',
        label: 'AI Infrastructure Cost Reduction',
        desc: 'Intelligent model routing and budget enforcement consistently cut total AI spend by 35–45% within the first quarter.',
      },
      {
        value: '3x',
        label: 'Faster AI Feature Delivery',
        desc: 'Teams ship new AI-powered features three times faster when starting from a governed platform rather than building infrastructure from scratch.',
      },
      {
        value: '100%',
        label: 'Audit Log Coverage',
        desc: 'Every LLM interaction is logged, ensuring complete traceability for regulatory review or internal incident investigation.',
      },
      {
        value: '99.95%',
        label: 'Platform Uptime',
        desc: 'Multi-region active-active deployment with automatic failover maintains near-perfect availability for business-critical AI workloads.',
      },
    ],
    faq: [
      {
        q: 'Can we use our own fine-tuned or self-hosted models alongside commercial APIs?',
        a: 'Yes. The platform supports any model that exposes an OpenAI-compatible API endpoint, including self-hosted Llama variants, Mistral models on vLLM, and custom fine-tunes. They appear alongside commercial models in the routing engine and developer portal.',
      },
      {
        q: 'How does the platform handle data residency and sovereignty requirements?',
        a: 'The platform is deployed exclusively within your cloud account or on-premises environment. We never proxy your data through AI Agentix infrastructure. Model API calls can be restricted to providers with data residency agreements matching your jurisdiction.',
      },
      {
        q: 'What does the implementation timeline look like?',
        a: 'A standard enterprise deployment takes 6–8 weeks: two weeks for architecture and policy design, two weeks for platform deployment and security review, and two weeks for team onboarding and SDK integration. Custom on-premises deployments may take 10–12 weeks.',
      },
      {
        q: 'How are prompt injection and adversarial attacks mitigated?',
        a: 'The policy engine applies input sanitization, system prompt protection, and output filtering at the gateway layer before requests reach the model. We also offer an optional real-time threat detection layer powered by a specialized classifier fine-tuned to detect prompt injection patterns.',
      },
    ],
  },

  {
    slug: 'llm-solutions',
    title: 'LLM-Based Solutions',
    tagline: 'Custom large language model applications engineered for your specific business context and data.',
    metaDesc:
      'AI Agentix designs, fine-tunes, and deploys custom LLM solutions — from domain-specific models to agentic workflows — that outperform generic AI on your unique tasks.',
    heroStats: [
      { value: '2–6 weeks', label: 'Typical Time to Production' },
      { value: '30%+', label: 'Accuracy Gain Over Base Models' },
      { value: '50+', label: 'Custom Models Deployed' },
    ],
    overview:
      'Generic LLMs perform well on average tasks but fall short on the specialized language, domain knowledge, and business logic your organization requires. Our LLM solutions practice covers the full lifecycle: task analysis, model selection, fine-tuning or RAG architecture, evaluation, and production deployment. Whether you need a contract review engine that understands your legal taxonomy, a customer service bot trained on your product catalog, or a multi-step agentic workflow that interacts with your internal APIs, we engineer it to your exact specifications.',
    features: [
      {
        icon: 'bullseye',
        title: 'Domain-Specific Fine-Tuning',
        desc: 'We fine-tune foundation models on your proprietary data using techniques including supervised fine-tuning, RLHF-style preference optimization, and parameter-efficient methods like LoRA and QLoRA to maximize accuracy within your domain.',
      },
      {
        icon: 'robot',
        title: 'Agentic Workflow Design',
        desc: 'Multi-step agents that plan, use tools, call APIs, query databases, and execute conditional logic enable LLMs to complete complex business processes end-to-end rather than just generating text.',
      },
      {
        icon: 'book',
        title: 'Retrieval-Augmented Generation (RAG)',
        desc: 'For knowledge-intensive tasks, we design advanced RAG pipelines with hybrid search, re-ranking, and cross-encoder verification to ground model outputs in your authoritative content.',
      },
      {
        icon: 'microscope',
        title: 'Structured Output Engineering',
        desc: 'Production applications require deterministic, machine-readable output. We use constrained decoding, function-calling, and schema validation to guarantee that model responses always conform to your data contracts.',
      },
      {
        icon: 'shield',
        title: 'Custom Evaluation Frameworks',
        desc: 'We build task-specific evaluation harnesses with golden datasets curated from your data, automated scoring rubrics, and human-in-the-loop review stages so you have objective quality signals before and after every deployment.',
      },
      {
        icon: 'rocket',
        title: 'Optimized Inference Deployment',
        desc: 'Models are quantized, compiled with TensorRT or vLLM, and deployed on cost-appropriate hardware — from A100 clusters for high-throughput tasks to edge devices for latency-sensitive on-premises use cases.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Task Scoping & Feasibility Analysis',
        desc: 'We analyze your task, baseline current performance, review available data, and recommend the optimal architecture — fine-tuning, RAG, agentic, or a hybrid approach.',
      },
      {
        step: 2,
        title: 'Data Preparation & Curation',
        desc: 'Training data is extracted, cleaned, deduped, and formatted. For fine-tuning, we work with your domain experts to label examples using our annotation toolchain.',
      },
      {
        step: 3,
        title: 'Model Training & Experimentation',
        desc: 'Experiments are tracked in MLflow or Weights & Biases. We run ablations across model size, training objective, and data mixture to identify the optimal configuration.',
      },
      {
        step: 4,
        title: 'Evaluation & Red-Teaming',
        desc: 'The candidate model is evaluated against your golden test set and adversarially red-teamed for edge cases, bias, and safety concerns before any production consideration.',
      },
      {
        step: 5,
        title: 'Production Deployment & Monitoring',
        desc: 'The approved model is deployed to your environment with latency and cost SLAs. A monitoring stack tracks output quality drift over time and triggers retraining alerts.',
      },
    ],
    industries: [
      {
        name: 'Legal Services',
        desc: 'Contract analysis, clause extraction, due-diligence review, and regulatory research engines trained on legal corpora that understand jurisdiction-specific terminology.',
      },
      {
        name: 'E-Commerce & Retail',
        desc: 'Product description generation, customer intent classification, personalized recommendation narratives, and returns-reason analysis at millions of SKUs scale.',
      },
      {
        name: 'Insurance',
        desc: 'Claims narrative summarization, policy document Q&A, fraud indicator extraction, and underwriting triage models tailored to your product lines and risk taxonomy.',
      },
      {
        name: 'Media & Publishing',
        desc: 'Automated content summarization, tone-consistent article drafting, SEO metadata generation, and multilingual localization workflows for editorial teams.',
      },
    ],
    technologies: [
      'PyTorch',
      'Hugging Face Transformers',
      'vLLM',
      'LangChain',
      'LlamaIndex',
      'MLflow',
      'Weights & Biases',
      'TensorRT-LLM',
    ],
    results: [
      {
        value: '30%+',
        label: 'Accuracy Improvement',
        desc: 'Domain-specific fine-tuning consistently outperforms the equivalent base model by 25–40% on client-specific evaluation benchmarks.',
      },
      {
        value: '5x',
        label: 'Inference Cost Reduction',
        desc: 'Quantization and hardware-optimized serving reduce per-query inference cost by up to 80% compared to naive API deployments.',
      },
      {
        value: '2–6 weeks',
        label: 'Time to Production',
        desc: 'From signed engagement to a production-deployed model in as little as two weeks for well-scoped RAG projects, six weeks for full fine-tuning cycles.',
      },
      {
        value: '99%',
        label: 'Schema Compliance Rate',
        desc: 'Structured output engineering achieves near-perfect JSON schema adherence in production, eliminating downstream parsing failures.',
      },
    ],
    faq: [
      {
        q: 'How much proprietary data do we need to fine-tune a model?',
        a: 'It depends on the task complexity. Instruction-style fine-tuning with LoRA can yield meaningful improvements with as few as 500–2,000 high-quality labeled examples. For complex, nuanced tasks, 10,000+ examples are recommended. We will assess your data during scoping and advise accordingly.',
      },
      {
        q: 'Will fine-tuning cause the model to forget general knowledge?',
        a: 'Catastrophic forgetting is a known risk we actively mitigate. We use regularization techniques, replay buffers of general-purpose data, and parameter-efficient methods like LoRA that modify only a small fraction of weights, preserving general capabilities while injecting domain expertise.',
      },
      {
        q: 'Can the solution run entirely on our own infrastructure without external API calls?',
        a: 'Yes. We can fine-tune and deploy open-weight models such as Llama 3, Mistral, or Falcon entirely within your on-premises or private cloud environment, with zero dependency on external LLM API providers.',
      },
      {
        q: 'How do you handle model updates when our underlying data changes?',
        a: 'We design a continuous training pipeline from the start. When your data drifts beyond a configurable threshold — measured by automated evaluation scores — the pipeline triggers a retraining job, evaluates the new model, and promotes it to production after approval.',
      },
    ],
  },

  {
    slug: 'computer-vision',
    title: 'Computer Vision Solutions',
    tagline: 'Teach machines to see, understand, and act on visual data from any camera or sensor.',
    metaDesc:
      'AI Agentix computer vision solutions deliver real-time object detection, quality inspection, facial analysis, and video analytics for industrial and commercial applications.',
    heroStats: [
      { value: '99.2%', label: 'Detection Precision' },
      { value: '<15ms', label: 'Inference Latency' },
      { value: '70%', label: 'Defect Catch Rate Improvement' },
    ],
    overview:
      'Our Computer Vision Solutions practice designs and deploys custom vision models that can detect, classify, segment, and track objects in images and video streams at production scale. From automated quality control on manufacturing lines processing 120 frames per second to retail shelf analytics running on edge cameras, we build systems that generate actionable intelligence from visual data your organization is already collecting but not fully exploiting.',
    features: [
      {
        icon: 'bullseye',
        title: 'Object Detection & Instance Segmentation',
        desc: 'State-of-the-art YOLO and Detectron2-based models detect and precisely segment objects of interest in real time, fine-tuned on your specific asset classes and environmental conditions.',
      },
      {
        icon: 'industry',
        title: 'Automated Visual Quality Inspection',
        desc: 'Replace manual inspection bottlenecks with vision models that identify surface defects, dimensional deviations, assembly errors, and labeling issues at line speed with sub-millimeter precision.',
      },
      {
        icon: 'eye',
        title: 'Video Analytics & Behavioral Intelligence',
        desc: 'Track individuals, vehicles, or objects across multi-camera networks. Detect anomalous behaviors, count occupancy, measure dwell time, and generate heatmaps from standard CCTV feeds.',
      },
      {
        icon: 'chart-bar',
        title: 'Document & Image Classification',
        desc: 'Vision transformers (ViT) classify and route images by content, condition, or damage level, enabling automation of workflows that previously required human visual judgment.',
      },
      {
        icon: 'bolt',
        title: 'Edge & Embedded Deployment',
        desc: 'Models are optimized for NVIDIA Jetson, Intel OpenVINO, and ARM Cortex platforms using TensorRT and ONNX, enabling real-time inference at the camera without cloud round-trips.',
      },
      {
        icon: 'arrows-rotate',
        title: 'Active Learning & Continuous Improvement',
        desc: 'A human-in-the-loop active learning pipeline surfaces the most informative unlabeled frames for expert annotation, maximizing model improvement per labeling hour as production conditions evolve.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Use Case Definition & Data Audit',
        desc: 'We review your existing camera infrastructure, image volumes, labeling resources, and performance requirements to design a feasible system architecture and data collection plan.',
      },
      {
        step: 2,
        title: 'Data Labeling & Augmentation',
        desc: 'Our annotation team uses semi-automated labeling tools (CVAT, Label Studio) to produce high-quality ground truth. Augmentation pipelines simulate lighting, rotation, and environmental variation.',
      },
      {
        step: 3,
        title: 'Model Training & Architecture Search',
        desc: 'We train and compare candidate architectures — YOLOv9, RT-DETR, ViT, and EfficientDet — tracking experiments with MLflow to select the best accuracy-latency tradeoff for your constraints.',
      },
      {
        step: 4,
        title: 'Optimization & Hardware Targeting',
        desc: 'Selected models are quantized to INT8 or FP16, compiled for your target hardware, and benchmarked to meet latency SLAs before leaving our test environment.',
      },
      {
        step: 5,
        title: 'Integration, Deployment & Monitoring',
        desc: 'Models are integrated with your camera streams, SCADA systems, or business applications via RTSP, GigE Vision, or REST API. A monitoring stack tracks precision, recall, and data drift continuously.',
      },
    ],
    industries: [
      {
        name: 'Manufacturing & Industrial',
        desc: 'Automated optical inspection, weld quality assessment, robotic guidance, and PPE compliance monitoring that integrate directly with MES and SCADA platforms.',
      },
      {
        name: 'Retail & CPG',
        desc: 'Planogram compliance, on-shelf availability monitoring, checkout automation, and shopper behavior analytics from existing store camera infrastructure.',
      },
      {
        name: 'Agriculture & Food Processing',
        desc: 'Produce grading, pest and disease identification, yield estimation from drone imagery, and foreign object detection on food processing lines.',
      },
      {
        name: 'Healthcare & Life Sciences',
        desc: 'Pathology slide analysis, medical image anomaly detection, surgical instrument tracking, and patient monitoring systems with privacy-preserving processing.',
      },
    ],
    technologies: [
      'YOLOv9',
      'Detectron2',
      'OpenCV',
      'NVIDIA TensorRT',
      'ONNX Runtime',
      'PyTorch',
      'CVAT',
      'NVIDIA Jetson',
    ],
    results: [
      {
        value: '99.2%',
        label: 'Detection Precision',
        desc: 'Custom-trained models achieve 99%+ precision on client-specific object classes in controlled production environments.',
      },
      {
        value: '70%',
        label: 'Defect Catch Rate Improvement',
        desc: 'Manufacturing clients report catching 70% more defects compared to manual visual inspection, while reducing false positive rates by over 50%.',
      },
      {
        value: '<15ms',
        label: 'Edge Inference Latency',
        desc: 'Optimized INT8 models on NVIDIA Jetson AGX Orin achieve sub-15ms per-frame latency, enabling true real-time processing at 60+ FPS.',
      },
      {
        value: '3.5x',
        label: 'ROI in Year One',
        desc: 'Across manufacturing deployments, clients average 3.5x return on investment in the first year through defect reduction and labor reallocation.',
      },
    ],
    faq: [
      {
        q: 'How many labeled images do we need to train a custom model?',
        a: 'It depends on task complexity and visual variability. For a focused inspection task with consistent lighting, 500–2,000 labeled images often suffice using transfer learning. For complex multi-class detection in variable conditions, 5,000–20,000 images are typical. We will quantify this during the data audit.',
      },
      {
        q: 'Can the solution work with our existing cameras and infrastructure?',
        a: 'In most cases, yes. We support RTSP, ONVIF, GigE Vision, and USB3 Vision camera protocols. Our edge software runs on NVIDIA Jetson, x86 servers with NVIDIA GPUs, and Intel-based platforms. We will assess camera placement and resolution adequacy during scoping.',
      },
      {
        q: 'What happens when production conditions change and model performance degrades?',
        a: 'Our monitoring stack continuously tracks precision and recall against a held-out test set and alerts when metrics fall below your SLA threshold. The active learning pipeline then surfaces the most informative new production frames for relabeling and incremental model updates.',
      },
      {
        q: 'How do you handle privacy and anonymization for video analytics in public-facing spaces?',
        a: 'We apply on-camera or edge-level face and biometric blurring before any data leaves the capture device. Analytics operate on anonymized representations. We assist with GDPR, CCPA, and BIPA compliance review for all deployments involving individuals.',
      },
    ],
  },
];

export default SOLUTIONS;
