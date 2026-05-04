const INDUSTRIES = [
  {
    slug: 'healthcare',
    title: 'Healthcare & Life Sciences',
    tagline: 'Accelerating diagnostics, streamlining clinical workflows, and personalizing patient care with enterprise-grade AI.',
    metaDesc: 'AI Agentix delivers AI solutions for healthcare — from predictive diagnostics and NLP-driven documentation to clinical decision support and patient engagement automation.',
    gradient: 'linear-gradient(135deg, #0A4A3A 0%, #0A2818 60%, #0A1628 100%)',
    heroStats: [
      { value: '40%', label: 'Reduction in administrative burden' },
      { value: '3×', label: 'Faster diagnostic analysis' },
      { value: '92%', label: 'Patient engagement improvement' },
    ],
    overview:
      'Healthcare organizations are under mounting pressure — rising costs, staffing shortages, regulatory complexity, and ever-growing data volumes. Traditional IT systems can no longer keep pace with the demand for real-time, evidence-based decisions. AI Agentix brings purpose-built AI to clinical and operational teams, enabling them to focus on what matters most: patient outcomes.',
    challenges: [
      {
        icon: 'hospital',
        title: 'Administrative Overload',
        desc: 'Clinicians spend 40–60% of their time on documentation, scheduling, and billing — time that could be spent with patients.',
      },
      {
        icon: 'clipboard-list',
        title: 'Fragmented Patient Data',
        desc: 'EHR systems, labs, imaging, and wearable devices create data silos that impede holistic patient views and care coordination.',
      },
      {
        icon: 'stethoscope',
        title: 'Clinical Decision Pressure',
        desc: 'Physicians face thousands of decisions daily with limited time to review literature, drug interactions, or comorbidity risks.',
      },
      {
        icon: 'lock',
        title: 'Compliance & Privacy',
        desc: 'HIPAA, GDPR, and FDA regulations demand strict data governance — AI adoption must happen within a secure, auditable framework.',
      },
    ],
    solutions: [
      {
        icon: 'brain',
        title: 'Clinical Decision Support',
        desc: 'AI models that surface evidence-based recommendations, flag contraindications, and support differential diagnosis at the point of care.',
      },
      {
        icon: 'file-lines',
        title: 'NLP Documentation Automation',
        desc: 'Ambient clinical documentation that converts physician-patient conversations into structured EHR notes with zero manual transcription.',
      },
      {
        icon: 'microscope',
        title: 'Predictive Diagnostics',
        desc: 'Deep learning on radiology images, pathology slides, and lab panels to detect anomalies earlier and reduce misdiagnosis rates.',
      },
      {
        icon: 'robot',
        title: 'Patient Engagement AI',
        desc: 'Conversational AI agents for appointment scheduling, medication reminders, post-discharge follow-up, and chronic disease coaching.',
      },
      {
        icon: 'chart-bar',
        title: 'Healthcare Operations Analytics',
        desc: 'Predictive staffing, bed management, supply chain optimization, and revenue cycle analytics for hospital operations teams.',
      },
      {
        icon: 'shield',
        title: 'Compliant AI Governance',
        desc: 'HIPAA-compliant ML infrastructure with audit trails, explainability layers, and bias monitoring built into every model deployment.',
      },
    ],
    useCases: [
      {
        title: 'Radiology AI — Early Cancer Detection',
        desc: 'A regional hospital deployed our deep learning model on 200k+ chest X-rays, flagging early-stage lung nodules missed by initial reads.',
        result: '31% increase in early-stage detection rate',
      },
      {
        title: 'Autonomous Clinical Documentation',
        desc: 'An outpatient clinic eliminated 90% of post-visit note writing by using ambient NLP to auto-populate structured SOAP notes in real time.',
        result: '2.5 hours saved per physician per day',
      },
      {
        title: 'Predictive Readmission Prevention',
        desc: 'A health system reduced 30-day readmissions by deploying an ML model that identified high-risk patients before discharge and triggered care interventions.',
        result: '22% drop in avoidable readmissions',
      },
      {
        title: 'AI-Powered Prior Authorization',
        desc: 'We automated 80% of prior authorization workflows using NLP + rule-based AI, cutting approval cycle times from days to under 4 hours.',
        result: '$4.2M annual administrative savings',
      },
    ],
    technologies: [
      'PyTorch', 'TensorFlow', 'FHIR / HL7', 'AWS HealthLake', 'Azure Health APIs',
      'Hugging Face Transformers', 'Apache Spark', 'Databricks', 'dbt', 'Snowflake',
    ],
    caseStudy: {
      client: 'National Health Network — 28 Hospital System',
      challenge: 'Fragmented EHR data across 28 hospitals prevented population health analytics and led to inconsistent care quality benchmarks across the network.',
      solution: 'We unified 14 EHR data sources into a FHIR-compliant data lake, then built a real-time population health dashboard with ML-driven patient risk stratification.',
      result: 'The network identified 12,000 high-risk patients for proactive intervention in the first quarter, reducing emergency admissions and unlocking $8M in preventable cost avoidance.',
      metrics: [
        { value: '14', label: 'EHR systems unified' },
        { value: '12K', label: 'At-risk patients identified' },
        { value: '$8M', label: 'Cost avoidance in Q1' },
      ],
    },
    results: [
      { value: '40%', label: 'Admin Time Saved', desc: 'Per clinician through NLP automation' },
      { value: '31%', label: 'Earlier Detection', desc: 'Radiology AI vs. baseline reads' },
      { value: '22%', label: 'Fewer Readmissions', desc: 'Predictive discharge intervention' },
      { value: '4hrs', label: 'Auth Turnaround', desc: 'Down from 3–5 business days' },
    ],
    faq: [
      {
        q: 'Is your AI HIPAA compliant?',
        a: 'Yes. All our healthcare AI systems are built with HIPAA compliance by design — including data encryption at rest and in transit, role-based access controls, audit logging, and BAA agreements with cloud providers.',
      },
      {
        q: 'How do you handle EHR integration?',
        a: 'We use HL7 FHIR R4 as the primary interoperability standard and have pre-built connectors for Epic, Cerner, Allscripts, and athenahealth. Custom EHR integrations are handled via our data engineering team.',
      },
      {
        q: 'Can AI models be explained to clinicians?',
        a: 'Absolutely. We implement SHAP and LIME explainability layers on all clinical AI models so physicians understand why a recommendation was made — supporting trust and regulatory acceptance.',
      },
      {
        q: 'How long does a typical healthcare AI project take?',
        a: 'Most PoC engagements run 6–10 weeks. Full production deployments with EHR integration and clinical validation typically take 4–6 months depending on data readiness and compliance requirements.',
      },
    ],
  },

  {
    slug: 'finance',
    title: 'Financial Services & FinTech',
    tagline: 'Transforming risk management, fraud detection, and customer intelligence with AI built for the pace of financial markets.',
    metaDesc: 'AI Agentix delivers AI and machine learning solutions for banks, insurers, and fintechs — from real-time fraud prevention and credit scoring to algorithmic trading and regulatory compliance automation.',
    gradient: 'linear-gradient(135deg, #0A1E4A 0%, #0A1228 60%, #0A1628 100%)',
    heroStats: [
      { value: '98.7%', label: 'Fraud detection accuracy' },
      { value: '60%', label: 'Faster credit decisioning' },
      { value: '$12M', label: 'Average fraud loss prevented annually' },
    ],
    overview:
      'Financial institutions operate at the intersection of opportunity and risk. Regulatory pressure, competitive disruption from fintechs, and the explosion of alternative data demand a fundamentally new approach to analytics and decisioning. AI Agentix helps banks, insurers, wealth managers, and payment platforms deploy AI that is not only powerful but auditable, fair, and built to meet compliance standards.',
    challenges: [
      {
        icon: 'warning',
        title: 'Sophisticated Fraud Patterns',
        desc: 'Traditional rule-based fraud systems miss novel attack vectors. Fraudsters evolve faster than static rulesets can be updated.',
      },
      {
        icon: 'chart-line',
        title: 'Legacy Risk Models',
        desc: 'FICO-era credit scoring excludes thin-file borrowers and fails to capture real-time behavioral signals that predict default risk.',
      },
      {
        icon: 'scroll',
        title: 'Regulatory Complexity',
        desc: 'Basel IV, SR 11-7, GDPR, and AML/KYC requirements mandate model documentation, fairness testing, and explainability for every AI decision.',
      },
      {
        icon: 'briefcase',
        title: 'Customer Churn & Lifetime Value',
        desc: 'High-net-worth and retail banking customers are shifting to neobanks. Personalization at scale is the retention lever institutions are missing.',
      },
    ],
    solutions: [
      {
        icon: 'shield',
        title: 'Real-Time Fraud Detection',
        desc: 'Graph neural networks and anomaly detection models that flag fraudulent transactions in under 50ms with sub-1% false positive rates.',
      },
      {
        icon: 'chart-bar',
        title: 'Next-Gen Credit Scoring',
        desc: 'ML models leveraging alternative data — rent history, utility payments, mobile behavior — to expand credit access and improve default prediction.',
      },
      {
        icon: 'robot',
        title: 'Regulatory AI & Compliance',
        desc: 'Automated AML transaction monitoring, KYC document verification, and model risk management documentation to satisfy SR 11-7 and Basel requirements.',
      },
      {
        icon: 'comments',
        title: 'Personalized Banking AI',
        desc: 'Recommendation engines and conversational AI that deliver hyper-personalized product offers, financial advice, and support at scale.',
      },
      {
        icon: 'chart-up',
        title: 'Quantitative Analytics',
        desc: 'Time-series forecasting, portfolio optimization, and sentiment-driven signal extraction for asset managers and trading desks.',
      },
      {
        icon: 'magnifying-glass',
        title: 'Document Intelligence',
        desc: 'NLP extraction of structured data from loan applications, contracts, regulatory filings, and insurance claims at enterprise scale.',
      },
    ],
    useCases: [
      {
        title: 'Real-Time Payment Fraud Prevention',
        desc: 'A top-10 US bank deployed our GNN-based fraud model on card-not-present transactions, replacing 600+ static rules with adaptive ML.',
        result: '98.7% detection with 62% fewer false declines',
      },
      {
        title: 'Alternative Credit Scoring — Thin File Borrowers',
        desc: 'A digital lender expanded approvals by 34% using our ML model trained on open banking, telecom, and utility payment data.',
        result: '$180M new credit portfolio unlocked in Year 1',
      },
      {
        title: 'Automated AML Suspicious Activity Reports',
        desc: 'We deployed NLP + ML to auto-draft SAR narratives from flagged transaction data, reducing analyst time from 4 hours to 22 minutes per report.',
        result: '91% analyst time reduction on SAR filing',
      },
      {
        title: 'Churn Prediction & Retention Personalization',
        desc: 'A retail bank identified at-risk customers 90 days before churn and triggered personalized retention offers via their mobile app.',
        result: '28% improvement in 12-month customer retention',
      },
    ],
    technologies: [
      'Python', 'XGBoost', 'LightGBM', 'Graph Neural Networks', 'Apache Kafka',
      'Flink', 'Snowflake', 'dbt', 'MLflow', 'AWS SageMaker',
    ],
    caseStudy: {
      client: 'European Tier-1 Bank — Fraud Transformation',
      challenge: 'A €2B+ payments network was suffering €14M in annual fraud losses with a legacy rule engine producing 12% false positive rates that frustrated legitimate customers.',
      solution: 'We replaced the rule engine with a real-time GNN model ingesting 200+ features per transaction, deployed on Kafka Streams with sub-80ms inference latency and full model explainability for regulatory review.',
      result: 'Fraud losses dropped 61% in the first 6 months. False positives fell from 12% to under 1.2%. The model now processes 4M transactions daily with full audit trail compliance.',
      metrics: [
        { value: '61%', label: 'Fraud loss reduction' },
        { value: '<80ms', label: 'Inference latency' },
        { value: '4M', label: 'Transactions/day processed' },
      ],
    },
    results: [
      { value: '98.7%', label: 'Fraud Accuracy', desc: 'Real-time transaction scoring' },
      { value: '60%', label: 'Faster Decisions', desc: 'Credit and underwriting automation' },
      { value: '34%', label: 'Approval Uplift', desc: 'Alternative credit scoring models' },
      { value: '91%', label: 'SAR Time Saved', desc: 'Automated AML narrative generation' },
    ],
    faq: [
      {
        q: 'How do you ensure AI fairness in credit decisions?',
        a: 'We run adversarial debiasing, disparate impact analysis, and fairness constraint optimization on all credit models. Every model is tested against CFPB fair lending guidelines and ECOA requirements before production.',
      },
      {
        q: 'Can your fraud models adapt to evolving attack patterns?',
        a: 'Yes. We use online learning and concept drift detection to continuously retrain fraud models on emerging patterns. Adversarial simulation environments are also used to stress-test models before deployment.',
      },
      {
        q: 'How do you handle SR 11-7 model risk management?',
        a: 'We produce full model documentation packages including conceptual soundness analysis, outcome analysis, sensitivity testing, and ongoing monitoring frameworks that satisfy OCC and Federal Reserve validation requirements.',
      },
      {
        q: 'Do you work with core banking systems?',
        a: 'Yes. We have integration experience with Temenos, FIS, Fiserv, Finastra, and Jack Henry. Our data engineering team handles CDC pipelines from core banking to cloud data platforms.',
      },
    ],
  },

  {
    slug: 'retail',
    title: 'Retail & E-Commerce',
    tagline: 'Powering hyper-personalization, intelligent inventory management, and AI-driven customer journeys for modern retail.',
    metaDesc: 'AI Agentix builds AI solutions for retail and e-commerce — personalization engines, demand forecasting, visual search, dynamic pricing, and conversational commerce at scale.',
    gradient: 'linear-gradient(135deg, #4A1A0A 0%, #2A0A08 60%, #0A1628 100%)',
    heroStats: [
      { value: '35%', label: 'Average revenue lift from personalization' },
      { value: '28%', label: 'Inventory cost reduction' },
      { value: '4.2×', label: 'ROI on AI-driven campaigns' },
    ],
    overview:
      'The retail landscape has fundamentally shifted. Consumers expect Amazon-level personalization everywhere, margins are under pressure from every direction, and the line between physical and digital is disappearing. AI Agentix helps retailers — from global chains to emerging DTC brands — deploy AI that turns data into competitive advantage across every touchpoint of the customer journey.',
    challenges: [
      {
        icon: 'cart-shopping',
        title: 'Generic Customer Experiences',
        desc: 'Most retail personalization is still segment-based. Customers demand 1:1 relevance — the right product at the right moment on the right channel.',
      },
      {
        icon: 'boxes-stacked',
        title: 'Inventory & Supply Chain Volatility',
        desc: 'Demand forecasting errors cost retailers 3.5% of sales annually through overstock, stockouts, and markdowns.',
      },
      {
        icon: 'tag',
        title: 'Pricing Complexity',
        desc: 'With thousands of SKUs and real-time competitive price intelligence, manual pricing strategies are no longer viable.',
      },
      {
        icon: 'arrows-rotate',
        title: 'Customer Churn & Acquisition Costs',
        desc: 'Rising CAC and declining brand loyalty mean retailers must extract more lifetime value from existing customers through smarter retention.',
      },
    ],
    solutions: [
      {
        icon: 'sparkle',
        title: 'Personalization Engine',
        desc: 'Real-time recommendation systems using collaborative filtering, session-based RL, and multi-armed bandits to maximize conversion at every touchpoint.',
      },
      {
        icon: 'chart-bar',
        title: 'Demand Forecasting',
        desc: 'Probabilistic time-series models incorporating external signals — weather, events, social trends — for SKU-level inventory optimization.',
      },
      {
        icon: 'dollar-sign',
        title: 'Dynamic Pricing AI',
        desc: 'Competitive intelligence + demand elasticity models that adjust prices in real time to maximize revenue while protecting brand perception.',
      },
      {
        icon: 'magnifying-glass',
        title: 'Visual Search & Discovery',
        desc: 'Computer vision models enabling "shop the look" and image-based product discovery that drives average session depth and basket size.',
      },
      {
        icon: 'comments',
        title: 'Conversational Commerce',
        desc: 'AI shopping assistants deployed on WhatsApp, SMS, and website chat that guide customers from discovery through post-purchase support.',
      },
      {
        icon: 'bullseye',
        title: 'Customer Lifetime Value Optimization',
        desc: 'ML models predicting CLV segments and triggering automated retention, upsell, and win-back campaigns through your existing marketing stack.',
      },
    ],
    useCases: [
      {
        title: 'Personalized Homepage & Email Recommendations',
        desc: 'A fashion retailer deployed our real-time personalization engine across homepage, email, and push notifications — serving unique product mixes to 8M+ customers.',
        result: '35% uplift in email click-through and 22% higher AOV',
      },
      {
        title: 'AI-Driven Demand Forecasting',
        desc: 'A grocery chain replaced manual forecasting with our ML pipeline, improving forecast accuracy at the store-SKU level across 4,000+ locations.',
        result: '28% reduction in spoilage and overstock write-offs',
      },
      {
        title: 'Dynamic Pricing at Scale',
        desc: 'An electronics marketplace deployed our dynamic pricing engine across 180k SKUs, responding to competitor price changes and demand signals in under 15 minutes.',
        result: '8.4% gross margin improvement in 90 days',
      },
      {
        title: 'Visual Search for Furniture Discovery',
        desc: 'A home décor retailer launched a "snap and shop" visual search feature enabling customers to upload photos and find matching products instantly.',
        result: '3.1× higher conversion vs. text search sessions',
      },
    ],
    technologies: [
      'TensorFlow Recommenders', 'PyTorch', 'Apache Spark', 'Kafka', 'Redis',
      'Snowflake', 'dbt', 'Segment', 'Google Vertex AI', 'AWS Personalize',
    ],
    caseStudy: {
      client: 'Global Apparel Brand — Personalization at Scale',
      challenge: 'A $2B+ apparel retailer had a 1.8% conversion rate on their e-commerce platform despite 15M monthly visitors — every customer saw the same homepage and category pages.',
      solution: 'We deployed a real-time personalization engine using session-based transformers and collaborative filtering, serving unique product rankings to each visitor based on browsing behavior, purchase history, and contextual signals — in under 30ms per request.',
      result: 'Conversion rate increased 41% to 2.54%. Average order value rose 18%. The engine generated an estimated $47M in incremental annual revenue within 6 months of launch.',
      metrics: [
        { value: '41%', label: 'Conversion rate lift' },
        { value: '$47M', label: 'Incremental revenue (Year 1)' },
        { value: '30ms', label: 'Recommendation latency' },
      ],
    },
    results: [
      { value: '35%', label: 'Revenue Lift', desc: 'From AI personalization engines' },
      { value: '28%', label: 'Inventory Savings', desc: 'ML demand forecasting accuracy' },
      { value: '8.4%', label: 'Margin Gain', desc: 'Dynamic pricing optimization' },
      { value: '3.1×', label: 'Visual Search CVR', desc: 'vs. text-based product search' },
    ],
    faq: [
      {
        q: 'How quickly can a personalization engine be deployed?',
        a: 'Most personalization PoCs can be live in 6–8 weeks using your existing product catalog and event data. Full production systems with A/B testing infrastructure typically take 3–4 months.',
      },
      {
        q: 'Do you integrate with existing CDPs and marketing platforms?',
        a: 'Yes. We have pre-built integrations with Segment, Braze, Klaviyo, Salesforce Marketing Cloud, and Adobe Experience Platform. We can also build custom integrations for any martech stack.',
      },
      {
        q: 'How does your demand forecasting handle new products with no history?',
        a: 'We handle cold-start using attribute-based similarity (category, price point, seasonal pattern matching) and transfer learning from comparable products. Bayesian priors ensure stable initial forecasts.',
      },
      {
        q: 'Can AI pricing work alongside promotional calendars?',
        a: 'Yes. Our dynamic pricing models accept hard constraints — promotional floors, MAP agreements, channel-specific pricing rules — so AI optimization always operates within your business guardrails.',
      },
    ],
  },

  {
    slug: 'manufacturing',
    title: 'Manufacturing & Industry 4.0',
    tagline: 'Connecting the factory floor to the intelligence layer — predictive maintenance, quality AI, and autonomous supply chain optimization.',
    metaDesc: 'AI Agentix delivers industrial AI solutions for manufacturers — predictive maintenance, computer vision quality control, digital twins, supply chain optimization, and AI-driven production scheduling.',
    gradient: 'linear-gradient(135deg, #1A2A0A 0%, #0A180A 60%, #0A1628 100%)',
    heroStats: [
      { value: '45%', label: 'Reduction in unplanned downtime' },
      { value: '99.2%', label: 'Defect detection accuracy' },
      { value: '$2.3M', label: 'Average annual maintenance savings' },
    ],
    overview:
      'Manufacturers face intensifying pressure on margins, quality, and delivery windows. The convergence of IoT sensors, edge computing, and AI creates an unprecedented opportunity to move from reactive to predictive operations. AI Agentix bridges the OT/IT divide — bringing machine learning to the factory floor through robust, scalable architectures that work in high-latency, constrained environments.',
    challenges: [
      {
        icon: 'gear',
        title: 'Unplanned Downtime',
        desc: 'Equipment failures cost manufacturers an average of $260,000 per hour. Preventive maintenance schedules are inefficient and often miss actual failure precursors.',
      },
      {
        icon: 'magnifying-glass',
        title: 'Manual Quality Inspection',
        desc: 'Human visual inspection is inconsistent, expensive, and cannot keep pace with modern production line speeds — defect escapes reach customers.',
      },
      {
        icon: 'link',
        title: 'Supply Chain Fragility',
        desc: 'Single-source dependencies, demand volatility, and geopolitical disruptions expose manufacturers to supply shocks that propagate through production schedules.',
      },
      {
        icon: 'chart-bar',
        title: 'OT/IT Data Silos',
        desc: 'Operational technology (SCADA, PLC, MES) data is rarely unified with ERP and business intelligence systems — preventing cross-functional optimization.',
      },
    ],
    solutions: [
      {
        icon: 'chart-line',
        title: 'Predictive Maintenance',
        desc: 'ML models on vibration, temperature, current, and acoustic sensor streams that predict equipment failure 2–4 weeks ahead with >90% accuracy.',
      },
      {
        icon: 'eye',
        title: 'Computer Vision Quality Control',
        desc: 'Real-time defect detection on production lines using custom-trained vision models that inspect at camera speed — replacing manual QC stations.',
      },
      {
        icon: 'industry',
        title: 'Digital Twin Analytics',
        desc: 'Physics-informed ML models that simulate equipment behavior, enabling virtual commissioning, root cause analysis, and what-if optimization.',
      },
      {
        icon: 'boxes-stacked',
        title: 'Supply Chain Optimization',
        desc: 'Multi-echelon inventory optimization, supplier risk scoring, and disruption simulation to build resilient, cost-optimized supply networks.',
      },
      {
        icon: 'calendar',
        title: 'AI Production Scheduling',
        desc: 'Constraint-based optimization and RL-driven scheduling that maximizes throughput, minimizes changeovers, and responds dynamically to disruptions.',
      },
      {
        icon: 'globe',
        title: 'OT/IT Integration Layer',
        desc: 'Industrial IoT data pipelines using OPC-UA, MQTT, and Kafka that unify sensor data from PLC, SCADA, and MES into a cloud analytics platform.',
      },
    ],
    useCases: [
      {
        title: 'Predictive Maintenance — CNC Machining',
        desc: 'A precision parts manufacturer deployed vibration and acoustic sensors on 200 CNC machines, feeding our ML pipeline to predict spindle bearing failure 3 weeks in advance.',
        result: '45% reduction in unplanned downtime events',
      },
      {
        title: 'Computer Vision Weld Inspection',
        desc: 'An automotive supplier replaced 12 manual inspection stations with our CV model running on edge GPUs — detecting micro-cracks, porosity, and bead irregularities at line speed.',
        result: '99.2% defect detection, 0 customer escapes in 18 months',
      },
      {
        title: 'Multi-Echelon Inventory Optimization',
        desc: 'A global electronics manufacturer reduced safety stock by 23% while maintaining 98.5% service levels using our probabilistic demand model across 6 tiers of inventory.',
        result: '$18M working capital released in Year 1',
      },
      {
        title: 'AI-Driven Production Scheduling',
        desc: 'A process chemical plant deployed our RL scheduling agent to dynamically optimize batch sequences, reducing changeover time and energy consumption simultaneously.',
        result: '19% throughput increase with 12% energy savings',
      },
    ],
    technologies: [
      'Python', 'TensorFlow', 'ONNX Runtime', 'Apache Kafka', 'InfluxDB', 'OPC-UA',
      'Azure IoT Hub', 'AWS IoT Greengrass', 'NVIDIA Jetson', 'Databricks',
    ],
    caseStudy: {
      client: 'Tier-1 Automotive Supplier — Quality AI Transformation',
      challenge: 'A Tier-1 supplier to BMW and Nissan was experiencing 2.3% defect escape rate on stamped body panels, resulting in costly recalls and warranty claims exceeding $6M annually.',
      solution: 'We deployed a computer vision pipeline using structured light scanning and custom YOLO-based models on 8 inspection lines, with real-time feedback loops to CNC process parameters — closing the quality loop automatically.',
      result: 'Defect escape rate dropped from 2.3% to 0.08%. Warranty claims fell 96% within two production quarters. The system now runs fully autonomously with weekly model drift monitoring.',
      metrics: [
        { value: '0.08%', label: 'Defect escape rate (was 2.3%)' },
        { value: '96%', label: 'Warranty claim reduction' },
        { value: '8', label: 'Inspection lines automated' },
      ],
    },
    results: [
      { value: '45%', label: 'Less Downtime', desc: 'Predictive vs. preventive maintenance' },
      { value: '99.2%', label: 'Defect Detection', desc: 'Computer vision QC accuracy' },
      { value: '$18M', label: 'Working Capital', desc: 'Released via inventory optimization' },
      { value: '19%', label: 'Throughput Gain', desc: 'AI production scheduling uplift' },
    ],
    faq: [
      {
        q: 'Can AI work with legacy factory equipment and PLCs?',
        a: 'Yes. We use OPC-UA adapters and protocol translators to extract data from legacy Siemens, Rockwell, and Mitsubishi PLCs without disrupting existing production systems. Edge gateways handle local pre-processing.',
      },
      {
        q: 'How long does a predictive maintenance project take?',
        a: 'A typical PoC covering 10–20 machines with existing sensor data takes 8–12 weeks. Full deployment across a plant floor with sensor installation and integration typically runs 4–6 months.',
      },
      {
        q: 'What if we have limited historical failure data?',
        a: 'We use anomaly detection approaches (autoencoders, isolation forest) that do not require labeled failure data — they learn normal operating ranges and flag deviations. This works even with zero historical failures.',
      },
      {
        q: 'How do you deploy AI in environments with limited connectivity?',
        a: 'Our edge AI architectures use ONNX-optimized models on NVIDIA Jetson or industrial PCs, processing data locally with only aggregated insights synced to cloud. This ensures <10ms inference with no dependency on WAN connectivity.',
      },
    ],
  },

  {
    slug: 'education',
    title: 'Education & EdTech',
    tagline: 'Building adaptive learning systems, intelligent tutoring, and institutional analytics that make education more effective and accessible.',
    metaDesc: 'AI Agentix delivers AI solutions for education — adaptive learning platforms, intelligent tutoring systems, student success prediction, content personalization, and institutional analytics for K-12, higher ed, and corporate learning.',
    gradient: 'linear-gradient(135deg, #1A0A4A 0%, #0A0828 60%, #0A1628 100%)',
    heroStats: [
      { value: '38%', label: 'Improvement in learning outcomes' },
      { value: '44%', label: 'Reduction in student dropout risk' },
      { value: '3×', label: 'Faster course content creation with AI' },
    ],
    overview:
      'Education is at an inflection point. Learners expect experiences as personalized and engaging as their consumer apps, while institutions struggle with resource constraints, achievement gaps, and the need to prove ROI on learning investment. AI Agentix works with K-12 districts, universities, online learning platforms, and corporate L&D teams to deploy AI that personalizes learning at scale and gives educators actionable intelligence.',
    challenges: [
      {
        icon: 'graduation-cap',
        title: 'One-Size-Fits-All Learning',
        desc: 'Standardized curriculum and pace ignore individual learning differences — students who need more time fall behind, and advanced students disengage.',
      },
      {
        icon: 'chart-line',
        title: 'Student Retention & Completion',
        desc: 'Online courses see 90%+ dropout rates. Universities face retention challenges that directly impact funding, rankings, and student outcomes.',
      },
      {
        icon: 'book',
        title: 'Content Creation Bottlenecks',
        desc: 'Creating quality instructional content is expensive and time-consuming. Curricula become outdated faster than they can be refreshed.',
      },
      {
        icon: 'chart-bar',
        title: 'Limited Learning Analytics',
        desc: 'Educators lack real-time insight into student comprehension, engagement, and early warning signals that predict academic risk.',  
      },
    ],
    solutions: [
      {
        icon: 'brain',
        title: 'Adaptive Learning Engine',
        desc: 'Knowledge graph + reinforcement learning systems that dynamically adjust content sequence, difficulty, and format to each learner\'s mastery level.',
      },
      {
        icon: 'robot',
        title: 'AI Tutoring Assistant',
        desc: 'Conversational AI tutors trained on curriculum content that provide Socratic dialogue, hint scaffolding, and instant feedback — available 24/7.',
      },
      {
        icon: 'warning',
        title: 'Student Success Prediction',
        desc: 'Early warning ML models that identify at-risk students 4–6 weeks before crisis points, enabling proactive advisor intervention.',
      },
      {
        icon: 'pen',
        title: 'AI Content Generation',
        desc: 'GenAI tools that assist educators in creating assessments, lesson plans, rubrics, and multimedia learning objects — cutting creation time by 70%.',
      },
      {
        icon: 'chart-bar',
        title: 'Learning Analytics Dashboard',
        desc: 'Real-time institutional dashboards giving administrators and educators visibility into engagement, mastery progression, and cohort-level trends.',
      },
      {
        icon: 'lock',
        title: 'Academic Integrity AI',
        desc: 'Intelligent systems that detect AI-generated content, plagiarism patterns, and proctoring anomalies while preserving student privacy.',
      },
    ],
    useCases: [
      {
        title: 'Adaptive Math Learning Platform',
        desc: 'A K-12 edtech company deployed our adaptive engine for a math platform serving 500k students, adjusting problem difficulty and modality in real time based on performance signals.',
        result: '38% improvement in grade-level proficiency scores',
      },
      {
        title: 'University Student Retention System',
        desc: 'A large public university deployed our at-risk prediction model using LMS engagement, grade, and financial data — triggering automated advisor alerts and intervention workflows.',
        result: '44% reduction in first-year dropout rate',
      },
      {
        title: 'AI-Powered Corporate Learning',
        desc: 'A Fortune 500 company replaced static compliance training with our adaptive LMS that personalizes learning paths and reduces time-to-competency for 80,000 employees.',
        result: '52% reduction in training completion time',
      },
      {
        title: 'Curriculum Content Acceleration',
        desc: 'A professional certification provider used our GenAI content suite to rebuild 40 course modules in 6 weeks — work that previously took 18 months with a full content team.',
        result: '3× faster course creation with 94% instructor approval rating',
      },
    ],
    technologies: [
      'Python', 'PyTorch', 'Knowledge Graphs', 'Neo4j', 'xAPI / Tin Can',
      'LTI 1.3', 'OpenAI GPT-4o', 'LangChain', 'PostgreSQL', 'AWS',
    ],
    caseStudy: {
      client: 'Online University — 200k Student Retention Initiative',
      challenge: 'A major online university with 200,000 enrolled students had a 34% first-year dropout rate, costing $28M annually in lost tuition and remediation — with no early warning system in place.',
      solution: 'We built a student success prediction model using LMS log data, grade history, login frequency, assignment patterns, and financial aid status. Automated alert workflows notified advisors within 24 hours of risk flag triggers, enabling proactive outreach.',
      result: 'First-year dropout rate fell from 34% to 19% in two academic years. Advisor workload was reduced through prioritization intelligence, and the university recovered an estimated $12M in retained tuition revenue.',
      metrics: [
        { value: '44%', label: 'Dropout rate reduction' },
        { value: '$12M', label: 'Tuition revenue recovered' },
        { value: '24hrs', label: 'Alert to advisor response time' },
      ],
    },
    results: [
      { value: '38%', label: 'Learning Outcomes', desc: 'Adaptive engine vs. static curriculum' },
      { value: '44%', label: 'Dropout Reduction', desc: 'Early warning + advisor intervention' },
      { value: '3×', label: 'Content Speed', desc: 'GenAI-assisted course creation' },
      { value: '52%', label: 'Training Time', desc: 'Reduction via corporate adaptive LMS' },
    ],
    faq: [
      {
        q: 'Does your adaptive learning engine integrate with existing LMS platforms?',
        a: 'Yes. We integrate with Canvas, Moodle, Blackboard, and D2L via LTI 1.3 and xAPI. Our engine can function as a content activity provider within existing LMS environments without requiring platform migration.',
      },
      {
        q: 'How do you ensure student data privacy compliance?',
        a: 'All student data is handled under FERPA (US), COPPA (for under-13 users), and GDPR (EU) compliance frameworks. We implement data minimization, consent management, and role-based access controls for all educational deployments.',
      },
      {
        q: 'Can AI tutors handle subject-specific technical content?',
        a: 'Yes. We fine-tune base LLMs on curriculum-specific content — textbooks, assessment items, instructor materials — to ensure subject accuracy. Human expert review is built into the fine-tuning pipeline.',
      },
      {
        q: 'How is the at-risk prediction model trained for our institution?',
        a: 'We train on 3–5 years of historical student data (anonymized) from your LMS and SIS. The model is validated against known outcomes before deployment, with institution-specific threshold calibration to match your advising capacity.',
      },
    ],
  },
  {
    slug: 'aviation',
    title: 'Aviation & Aerospace',
    tagline: 'Intelligent systems for safer, more efficient flight operations and passenger experiences.',
    metaDesc: 'AI Agentix builds AI solutions for aviation — luggage tracking, stand assignment optimization, passenger experience bots, and real-time operational analytics.',
    gradient: 'linear-gradient(135deg, #0A1628 0%, #1A3050 60%, #0A1628 100%)',
    heroStats: [
      { value: '34%', label: 'Reduction in turnaround time' },
      { value: '99.1%', label: 'Baggage tracking accuracy' },
      { value: '2.4×', label: 'Faster incident response' },
    ],
    overview: 'Aviation organisations trust AI Agentix to build intelligent systems that optimize every aspect of the airport and flight experience. From computer vision for baggage handling to RL-driven gate assignments.',
    challenges: [{ title: 'Operational Inefficiency', desc: 'Manual processes lead to delays and high costs.' }],
    solutions: [{ title: 'Baggage Tracking', desc: 'AI-powered vision systems for real-time tracking.' }],
    useCases: [{ title: 'Smart Gate Assignment', desc: 'Optimizing turnarounds.' }],
    technologies: ['Computer Vision', 'Python', 'RL'],
    results: [{ value: '34%', label: 'Efficiency' }],
    faq: [{ q: 'Is it real-time?', a: 'Yes.' }]
  },
  {
    slug: 'logistics',
    title: 'Logistics & Supply Chain',
    tagline: 'AI that unifies data and optimises every shipment.',
    metaDesc: 'Logistics operators leverage our AI for intermodal transportation data platforms and demand forecasting.',
    gradient: 'linear-gradient(135deg, #2A1A0A 0%, #1A0A08 60%, #0A1628 100%)',
    heroStats: [
      { value: '31%', label: 'Cost reduction' },
      { value: '94%', label: 'On-time delivery' },
    ],
    overview: 'Logistics is about data movement as much as physical movement. We unify fragmented data into a single source of truth.',
    challenges: [{ title: 'Data Silos', desc: 'Fragmented data prevents optimization.' }],
    solutions: [{ title: 'Route Optimization', desc: 'AI-driven routing for fleets.' }],
    useCases: [{ title: 'Intermodal Tracking', desc: 'Unifying sea, air, and land data.' }],
    technologies: ['Apache Kafka', 'Spark'],
    results: [{ value: '31%', label: 'Savings' }],
    faq: [{ q: 'Do you support multi-modal?', a: 'Yes.' }]
  }
  ];
export default INDUSTRIES;
