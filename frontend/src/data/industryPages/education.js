// Education industry page — content verbatim from
// content-archive/pages/industries/education.md

export default {
  slug: 'education',
  heroImage: '/images/hero-ind-education.webp',
  meta: {
    title: 'AI for Education | AI Agentix',
    description: 'From admissions to alumni engagement, AI Agentix automates every touchpoint so educators can focus on what matters — inspiring students.',
  },
  hero: {
    eyebrow: 'AI for Education',
    heading: 'Transform Learning with Intelligent Automation',
    subheading: 'From admissions to alumni engagement, AI Agentix automates every touchpoint so educators can focus on what matters — inspiring students.',
    ctas: [
      { label: 'Book a Demo', to: '/contact', primary: true },
      { label: 'View Case Studies', to: '/case-studies', primary: false },
    ],
    tags: ['Admissions', 'Student Support', 'Personalized Learning', 'Faculty Tools', 'Alumni Engagement'],
  },
  stats: [
    { value: '94%', label: 'Enrollment Conversion', sub: 'lead to enrollment rate' },
    { value: '89%', label: 'Student Retention', sub: 'year-over-year improvement' },
    { value: '38 hrs/wk', label: 'Admin Time Saved', sub: 'per faculty member' },
    { value: '4.8/5', label: 'Student Satisfaction', sub: 'average CSAT score' },
  ],
  challenges: {
    eyebrow: 'Challenges We Solve',
    heading: 'Challenges We Solve',
    items: [
      { title: 'Student Engagement', desc: 'Keeping students engaged in hybrid and online learning environments remains a persistent challenge for educators worldwide.' },
      { title: 'Administrative Burden', desc: 'Faculty spend 40% of their time on administrative tasks — grading, scheduling, reporting — leaving less time for actual teaching.' },
      { title: 'Enrollment & Retention', desc: 'Institutions struggle to convert leads to enrollments and retain students through graduation amid growing competition.' },
      { title: 'Personalized Learning', desc: 'One-size-fits-all curricula fail diverse learners. Adapting content to individual pace and style at scale is nearly impossible manually.' },
    ],
  },
  solutions: {
    eyebrow: 'Our AI Solutions for Education',
    heading: 'Purpose-built modules for your institution',
    items: [
      { name: 'AI Admissions Automation',
        desc: 'Automate inquiry responses, application follow-ups, document collection, and enrollment workflows. AI agents handle thousands of prospective student conversations simultaneously.',
        points: ['Inquiry response automation', 'Application follow-ups', 'Document collection', 'Enrollment workflows'] },
      { name: 'Student Support Chatbot',
        desc: '24/7 AI assistant answers FAQs about courses, deadlines, financial aid, and campus resources. Escalates complex cases to human counselors with full context.',
        points: ['24/7 FAQ resolution', 'Financial aid queries', 'Campus resource guidance', 'Context-rich escalation'] },
      { name: 'Learning Path Personalization',
        desc: 'AI analyzes student performance data to recommend tailored content, flag at-risk learners early, and suggest interventions before students drop out.',
        points: ['Tailored content recommendations', 'At-risk learner detection', 'Early intervention alerts', 'Adaptive learning paths'] },
      { name: 'Faculty Productivity Tools',
        desc: 'Automate grading rubrics, generate quiz questions from lecture content, summarize student feedback, and produce progress reports in seconds.',
        points: ['Automated grading rubrics', 'Quiz question generation', 'Feedback summarization', 'Instant progress reports'] },
      { name: 'Alumni Engagement Engine',
        desc: 'Re-engage alumni through automated donation campaigns, event invitations, and mentorship matching — powered by AI personalization at scale.',
        points: ['Automated donation campaigns', 'Event invitations', 'Mentorship matching', 'Personalized outreach'] },
    ],
  },
  segments: {
    eyebrow: 'Built for Every Type of Institution',
    heading: 'From K-12 to universities and online academies',
    items: [
      { name: 'K-12 Schools', desc: 'Parent communication automation, student progress alerts, and attendance management.' },
      { name: 'Universities', desc: 'End-to-end admissions automation, student services, and alumni engagement.' },
      { name: 'EdTech Platforms', desc: 'AI-powered student success tools, churn prediction, and personalized learning paths.' },
      { name: 'Vocational Training', desc: 'Industry placement automation, skills tracking, and employer partnership management.' },
    ],
  },
  integrations: {
    eyebrow: 'Integrations',
    heading: 'Integrates with your education stack',
    body: 'Pre-built connectors for the platforms your institution already uses.',
    tools: ['Canvas LMS', 'Blackboard', 'Moodle', 'Salesforce Edu', 'Banner ERP', 'Ellucian', 'Google Workspace', 'Microsoft Teams', 'Zoom', 'Slate CRM'],
  },
  proof: {
    eyebrow: 'Real Results',
    heading: 'Real results from real institutions',
    items: [
      { tag: 'Horizon University', stat: '62% increase in enrollment conversions', text: 'Automated admissions follow-ups and AI chat reduced drop-off from inquiry to application.', meta: '+62% conversions' },
      { tag: 'Global EdTech Academy', stat: '89% student retention rate', text: 'AI early-warning system flagged at-risk students 6 weeks before withdrawal, enabling timely intervention.', meta: '89% retention' },
      { tag: 'TechSkills Institute', stat: '38 hours saved per faculty/week', text: 'Automated grading, feedback generation, and reporting freed instructors for mentorship.', meta: '38 hrs/week saved' },
    ],
  },
  faq: {
    heading: 'Education AI — Questions Answered',
    items: [
      { q: 'Is student data kept secure and FERPA-compliant?', a: 'Yes. AI Agentix is FERPA-compliant with role-based access, data encryption, audit logs, and zero-retention policies for sensitive student information.' },
      { q: 'Can AI replace teachers or counselors?', a: 'No. AI handles repetitive administrative tasks so educators can focus on high-value interactions. Human oversight is always maintained for critical decisions.' },
      { q: 'How long does implementation take for a university?', a: 'Most institutions go live within 4-8 weeks with phased rollout starting from admissions workflows, then expanding to student services.' },
      { q: 'Does it integrate with our existing LMS?', a: 'Yes — we integrate with Canvas, Blackboard, Moodle, Salesforce Education Cloud, Banner, Ellucian, and 50+ other platforms.' },
      { q: 'How do you measure ROI for education institutions?', a: 'We track enrollment conversion rates, student retention, staff time saved, support ticket volume, and alumni engagement metrics with monthly reporting.' },
    ],
  },
  cta: {
    heading: 'Ready to Transform Your Institution?',
    body: 'Join 200+ educational institutions already using AI Agentix to improve enrollment, retention, and student outcomes.',
    ctas: [
      { label: 'Get Started Today', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
