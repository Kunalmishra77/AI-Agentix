// Legal pages — content verbatim from content-archive/pages/{privacy,terms,refund}.md
const COMPANY = 'AI Agentix (Santure AI Private Limited)'
const UPDATED = '1 January 2025'
const EMAIL = 'myai@ai-agentix.com'

export const privacy = {
  meta: { title: 'Privacy Policy — AI Agentix', description: 'How AI Agentix collects, uses, and protects your personal data. Compliant with DPDPA 2023.' },
  badge: 'DPDPA 2023 Compliant',
  heading: 'Privacy Policy',
  body: "We believe your data is yours. Here's exactly what we collect, why, and how we protect it — in plain English.",
  updated: UPDATED, appliesTo: COMPANY,
  sections: [
    { title: 'Information We Collect', paragraphs: [
      'We collect information you provide directly — name, email, phone number, company name, and any details you share via our contact forms, booking flows, or voice agent interactions.',
      'We automatically collect technical data including IP address, browser type, device information, pages visited, and session duration via cookies and analytics tools (Google Analytics, Hotjar).',
      'If you interact with our AI Voice Agent, voice data is processed in real-time by our speech-to-text providers and is not stored beyond the session unless you explicitly consent.',
    ] },
    { title: 'How We Use Your Information', paragraphs: [
      'To respond to inquiries, book demos, and deliver the services you requested — including sending you updates, proposals, and automation reports.',
      'To personalise your experience on our platform and improve our AI agent workflows based on usage patterns.',
      'To send transactional emails (booking confirmations, audit reports) and occasional marketing communications. You can unsubscribe at any time.',
      'To comply with Indian laws and regulations, including the Digital Personal Data Protection Act, 2023 (DPDPA).',
    ] },
    { title: 'Data Security', paragraphs: [
      'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our infrastructure is hosted on AWS (Mumbai region) — your data stays within India.',
      'We implement role-based access controls, audit logs, and regular security reviews. No third party has access to your personal data without your explicit consent or legal obligation.',
      'In the event of a data breach that poses risk to you, we will notify you and relevant authorities within 72 hours as required under DPDPA.',
    ] },
    { title: 'Your Rights', paragraphs: [
      'Under the DPDPA 2023 and general data protection principles, you have the right to access, correct, or request deletion of your personal data at any time.',
      'You can withdraw consent for marketing communications by clicking "Unsubscribe" in any email or by writing to us at ' + EMAIL + '.',
      'We will respond to data access or deletion requests within 30 days. Verification of identity may be required before processing such requests.',
    ] },
    { title: 'Third-Party Services', paragraphs: [
      'We use trusted third-party services including Google Analytics (analytics), Razorpay (payments), Twilio (SMS/WhatsApp), and OpenAI / Anthropic (AI processing). Each operates under their own privacy policies.',
      'We do not sell, rent, or trade your personal information to third parties for marketing purposes under any circumstances.',
    ] },
    { title: 'Contact & Updates', paragraphs: [
      'This policy was last updated on 1 January 2025. We may update it periodically — significant changes will be communicated via email or a notice on our website.',
      'For any privacy-related queries, please contact our Data Protection Officer at: ' + EMAIL + ' or write to Santure AI Private Limited, New Delhi, India.',
    ] },
  ],
  finalCta: { heading: 'Questions about your data?', body: 'Email our Data Protection Officer directly.', email: EMAIL },
}

export const terms = {
  meta: { title: 'Terms of Service — AI Agentix', description: 'Terms of Service for AI Agentix. Read our commercial and acceptable-use terms governing AI automation services by Santure AI Private Limited.' },
  badge: 'Legal Agreement',
  heading: 'Terms of Service',
  body: 'Please read these terms carefully before using AI Agentix services. They govern our relationship with every client and visitor.',
  updated: UPDATED, appliesTo: COMPANY,
  sections: [
    { title: 'Acceptance of Terms', paragraphs: [
      'By accessing or using AI Agentix services — including our website, AI voice agents, automation workflows, dashboards, or any related product — you agree to be bound by these Terms of Service.',
      'These terms apply to all visitors, clients, partners, and any other party who engages with Santure AI Private Limited ("AI Agentix," "we," "us," or "our").',
      'If you are entering into these terms on behalf of a company or legal entity, you represent that you have the authority to bind that entity to these terms.',
    ] },
    { title: 'Services Description', paragraphs: [
      'AI Agentix provides AI-powered automation services including but not limited to: voice agents, WhatsApp chatbots, lead automation, document processing, and custom AI workflow development.',
      'All services are delivered as described in individual project scope documents, service agreements, or proposals agreed upon between AI Agentix and the client. Specific deliverables, timelines, and pricing are governed by those agreements.',
      'We reserve the right to modify, suspend, or discontinue any service with reasonable notice. For ongoing engagements, we will provide at least 30 days notice before any significant service changes.',
    ] },
    { title: 'Payment & Billing', paragraphs: [
      'Payment terms are specified in your individual service agreement or proposal. Standard terms require 50% upfront and 50% on delivery for project-based work. Monthly retainer clients are billed at the start of each billing cycle.',
      'All prices are in Indian Rupees (INR) unless otherwise stated. Applicable GST will be charged as per Indian tax laws. Invoices must be paid within the due date specified — late payments may attract an interest of 1.5% per month.',
      'Payments are processed via Razorpay or direct bank transfer. We do not store card details on our servers. Disputes regarding invoices must be raised in writing within 7 days of the invoice date.',
    ] },
    { title: 'Intellectual Property', paragraphs: [
      'Upon full payment, clients receive ownership of all custom-developed code, workflows, and AI configurations built specifically for their project. AI Agentix retains ownership of its proprietary frameworks, reusable components, and underlying platform technology.',
      'All content on this website — including text, graphics, logos, and design — is the property of Santure AI Private Limited and may not be reproduced without prior written consent.',
      'You may not reverse-engineer, disassemble, or create derivative works from our proprietary systems. Any third-party tools used in your project are subject to their respective licenses.',
    ] },
    { title: 'Limitation of Liability', paragraphs: [
      'AI Agentix services are provided "as is." While we strive for reliability and accuracy, AI-generated outputs may occasionally contain errors. Human review is recommended for any business-critical decisions based on AI outputs.',
      'To the maximum extent permitted by law, Santure AI Private Limited shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services, including but not limited to loss of revenue, data, or business opportunity.',
      'Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim in the three months preceding the incident.',
    ] },
    { title: 'Termination & Governing Law', paragraphs: [
      'Either party may terminate a service agreement with 30 days written notice, subject to the termination clauses in the individual service agreement. Work completed up to termination date shall be invoiced and paid.',
      'These terms are governed by the laws of India, and the courts of New Delhi shall have exclusive jurisdiction over any disputes arising from or related to these terms.',
      'If any provision of these terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.',
    ] },
    { title: 'Contact & Updates', paragraphs: [
      'These Terms of Service were last updated on 1 January 2025. We may update them periodically — significant changes will be communicated via email or a prominent notice on our website at least 14 days in advance.',
      'For any questions regarding these terms, please contact us at: ' + EMAIL + ' or write to Santure AI Private Limited, New Delhi, India.',
    ] },
  ],
  finalCta: { heading: 'Questions about our terms?', body: 'Our team is happy to walk you through anything that needs clarification.', email: EMAIL },
}

export const refund = {
  meta: { title: 'Refund Policy — AI Agentix', description: 'AI Agentix refund policy. Understand when refunds apply, the process to request one, and how we resolve disputes fairly.' },
  badge: 'Fair & Transparent',
  heading: 'Refund Policy',
  body: "We stand behind our work. Here's exactly when refunds apply, how to request one, and what to expect from the process.",
  updated: UPDATED, appliesTo: COMPANY,
  sections: [
    { title: 'Our Commitment', paragraphs: [
      'At AI Agentix, we are committed to delivering measurable value. If we fail to deliver the agreed-upon scope of work, we will work to resolve it — including partial refunds where warranted.',
      'Every project begins with a clearly defined scope document. Our refund policy is applied against the deliverables and milestones outlined in that agreement.',
    ] },
    { title: 'Eligible Refunds', paragraphs: [
      'A full refund of the advance/upfront payment is applicable if: (a) AI Agentix fails to initiate work within 14 business days of payment without communication, or (b) both parties mutually agree to cancel the project before any work commences.',
      'A partial refund (proportional to undelivered milestones) is applicable if: (a) AI Agentix is unable to deliver a specific milestone as defined in the scope document, or (b) a project is terminated by AI Agentix without cause.',
      'Refunds for subscription/retainer services: if you cancel a monthly retainer within the first 7 days of a billing cycle and no significant work has been initiated for that cycle, a prorated refund for unused days will be issued.',
    ] },
    { title: 'Non-Refundable Situations', paragraphs: [
      'Refunds will NOT be issued in the following circumstances: (a) work has been completed and delivered as per the agreed scope, (b) the client changes requirements or project direction after work has begun, (c) delays are caused by the client\'s failure to provide timely approvals, content, access, or feedback.',
      'Payments for completed milestones are non-refundable even if subsequent milestones are cancelled. Any third-party costs incurred on your behalf (API credits, tool licenses, server costs) are non-refundable.',
      'Change-of-mind cancellations after project kickoff are not eligible for refunds on work already in progress.',
    ] },
    { title: 'Refund Process & Timeline', paragraphs: [
      'To request a refund, email ' + EMAIL + ' with your project details, invoice number, and the reason for your request. Please include any supporting documentation.',
      'We will acknowledge your request within 2 business days and complete our review within 10 business days. If your refund is approved, the amount will be credited to your original payment method within 7–10 business days after approval.',
      'Refunds are processed via the same payment method used for the original transaction (Razorpay/bank transfer). Processing times may vary depending on your bank or payment provider.',
    ] },
    { title: 'Disputes', paragraphs: [
      'If you are not satisfied with our refund decision, you may escalate by writing to ' + EMAIL + '. We will appoint a senior team member to review your case independently.',
      'We strongly encourage resolving disputes amicably. If a resolution cannot be reached, disputes shall be subject to the jurisdiction of New Delhi, India as specified in our Terms of Service.',
    ] },
    { title: 'Contact for Refund Requests', paragraphs: [
      'This Refund Policy was last updated on 1 January 2025. We may revise it from time to time — updates will be published on this page.',
      'To initiate a refund request or ask questions about this policy, contact us at: ' + EMAIL + ' or write to Santure AI Private Limited, New Delhi, India.',
    ] },
  ],
  finalCta: { heading: 'Need to raise a refund request?', body: 'Email our billing team directly with your invoice number and details.', email: EMAIL },
}
