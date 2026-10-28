// Legal pages. Privacy Policy and Terms rewritten 27 Oct 2026 for the Digital Personal
// Data Protection Act, 2023 and DPDP Rules, 2025, describing what this website actually
// does (forms → our server, email + Google Sheet; optional AI assistant). Have counsel
// review before relying on it; update when data flows change (e.g. analytics added).
// Refund Policy is unchanged from content-archive/pages/refund.md.
const COMPANY = 'AI Agentix (Santure AI Private Limited)'
const UPDATED = '1 January 2025'
const POLICY_UPDATED = '27 October 2026'
const EMAIL = 'myai@ai-agentix.com'
const ADDRESS = 'T-1, Pankaj Arcade, Plot No. 16, Sector 5, Dwarka, New Delhi 110075'
const GRIEVANCE_OFFICER = 'Vital Sai (CMO)'

export const privacy = {
  meta: { title: 'Privacy Policy — AI Agentix', description: 'How AI Agentix (Santure AI Private Limited) collects, uses, shares and protects personal data under India’s Digital Personal Data Protection Act, 2023, and how to exercise your rights.' },
  badge: 'DPDP Act, 2023 · DPDP Rules, 2025',
  heading: 'Privacy Policy',
  body: 'What personal data we collect through this website, why, who we share it with, how long we keep it, and how you can control it — in plain language.',
  updated: POLICY_UPDATED, appliesTo: COMPANY,
  sections: [
    { title: 'Who we are', paragraphs: [
      'This website (ai-agentix.com) is operated by Santure AI Private Limited, ' + ADDRESS + ', India ("AI Agentix", "we", "us"). For personal data you share with us through this website, we are the Data Fiduciary under the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Digital Personal Data Protection Rules, 2025.',
      'This policy covers this website, its enquiry forms, the floating consultation form, the newsletter sign-up, the WhatsApp link and the on-site AI assistant. Services we deliver to clients under a contract are governed by that contract and its data processing terms.',
    ] },
    { title: 'Personal data we collect', paragraphs: [
      'Enquiry and consultation forms: your name, phone/WhatsApp number and email address, and — depending on the form — company or agency name, website, industry, team size, the areas you want to automate, preferred demo date and time, number of attendees, client base, and any message you write.',
      'Newsletter: your email address.',
      'Consent record: whether you agreed to be contacted about your enquiry, whether you opted in to marketing updates, the time you agreed and the version of the notice you saw.',
      'Technical data sent with a form: the page you submitted it from, campaign parameters in the link you arrived by (for example utm_source or gclid), your IP address and your browser’s user-agent. We use these to prevent spam and abuse and as evidence of your consent.',
      'AI assistant: the questions you type (or dictate) and the page you are on. Voice input uses your browser’s built-in speech recognition (provided by your browser maker, e.g. Google in Chrome); we receive only the resulting text.',
      'We do not ask for, and please do not share, sensitive information such as government ID numbers, bank or card details, passwords or health records through this website.',
      'Cookies and analytics: with your permission (the cookie banner shown on your first visit), we use Google Analytics 4 to understand how visitors use the site — pages viewed, approximate location (city level), device and browser, and clicks on our contact buttons. These cookies are off unless you accept them, and you can change your choice any time from “Cookie settings” in the footer. We do not use advertising cookies. The site also stores a few non-identifying values in your browser (your cookie choice, scroll position and the campaign that brought you here).',
    ] },
    { title: 'Why we use it', paragraphs: [
      'To respond to your enquiry: reviewing your request, contacting you by phone call, WhatsApp, SMS or email — once or more than once — to understand your needs, schedule a demo or audit, and send you a proposal. We do this on the basis of the consent you give by ticking the box on the form.',
      'To send you updates and offers about AI automation — only if you separately opted in (the optional box on enquiry forms, or the newsletter). This is a separate purpose; saying no does not affect your enquiry.',
      'To answer questions in the AI assistant, using content from this website.',
      'To keep the website secure, stop spam and abuse, and keep records needed to meet legal obligations.',
      'We do not sell your personal data, and we do not use it for any purpose that is not described here without asking you first.',
    ] },
    { title: 'Calls and messages, including DND', paragraphs: [
      'By ticking the consent box you ask us to contact you about your enquiry, and you agree that we may call or message you even if your number is registered on the National Customer Preference Register (DND). We contact you only about the enquiry you made, and about offers only if you opted in to marketing.',
      'You can ask us to stop at any time — reply STOP on WhatsApp, tell us on the call, or email ' + EMAIL + '.',
    ] },
    { title: 'Who we share it with', paragraphs: [
      'We share personal data only with service providers that help us run this website and respond to you, under instructions to use it only for that purpose (Data Processors):',
      '• Our website hosting provider — stores enquiries on our server.',
      '• Google (Gmail / Google Workspace and Google Sheets) — delivers each enquiry to our team’s inbox and our enquiry tracking sheet; and Google Analytics, only if you accept analytics cookies.',
      '• OpenAI — only if the AI assistant is running in AI mode: the text of your question and relevant website content are sent to generate an answer. OpenAI states that API data is not used to train its models and may be retained for up to 30 days for abuse monitoring.',
      '• WhatsApp (Meta) — if you choose to message us on WhatsApp, that conversation is also subject to WhatsApp’s own terms and privacy policy.',
      'We may also disclose personal data where required by law or by a lawful order of a court or government authority.',
      'Some of these providers may process data on servers outside India. Such transfers are permitted under Section 16 of the DPDP Act except to countries the Government of India restricts; we will not transfer data to a restricted country.',
    ] },
    { title: 'How long we keep it', paragraphs: [
      'Enquiries: for as long as needed to respond and follow up, and then for up to 24 months after our last interaction with you, unless you become a client (client records follow our contract and legal record-keeping duties) or you ask us to delete them earlier.',
      'Marketing and newsletter consent: until you withdraw it or unsubscribe.',
      'Consent records: for as long as we hold the related data, and as long after as needed to show that consent was given.',
      'AI assistant: we do not store the content of assistant conversations on our servers. Rate-limiting data (your IP address) is held only in memory for a short time.',
      'When the retention period ends, we delete or anonymise the data.',
    ] },
    { title: 'How we protect it', paragraphs: [
      'This website is served only over HTTPS. Enquiries are stored on our server with access limited to authorised staff, and our credentials for email and other services are kept on the server, never in the website code.',
      'If a personal data breach occurs, we will inform affected individuals and the Data Protection Board of India in the manner and within the time required by the DPDP Act and Rules.',
    ] },
    { title: 'Your rights', paragraphs: [
      'Under the DPDP Act you have the right to: (a) get a summary of the personal data we hold about you and how we use it, and the identities of those we have shared it with; (b) have it corrected, completed, updated or erased; (c) withdraw your consent at any time — as easily as you gave it; (d) have your grievances addressed; and (e) nominate another person to exercise your rights if you die or become incapable.',
      'Withdrawing consent stops further use for that purpose but does not affect what we lawfully did before you withdrew it. If you withdraw consent to be contacted about an enquiry, we will stop contacting you about it.',
      'How to make a request: email ' + EMAIL + ' with the subject “Data request” from the email address, or mentioning the phone number, you used with us — we use it to identify you. We may ask for reasonable verification before acting.',
      'We aim to respond within 30 days, and in any case within the 90 days allowed by the DPDP Rules.',
    ] },
    { title: 'Grievances and complaints', paragraphs: [
      'Grievance Officer: ' + GRIEVANCE_OFFICER + ', Santure AI Private Limited, ' + ADDRESS + '. Email: ' + EMAIL + ' (subject “Grievance”). We acknowledge grievances promptly and resolve them within 30 days, and in any case within the 90 days allowed by the DPDP Rules.',
      'If you are not satisfied with our response, you may file a complaint with the Data Protection Board of India after using our grievance process, as provided under the DPDP Act.',
    ] },
    { title: 'Children', paragraphs: [
      'This website is meant for businesses and adults. We do not knowingly collect personal data from anyone under 18. If you believe a child has shared personal data with us, contact us and we will delete it.',
    ] },
    { title: 'Language and changes to this policy', paragraphs: [
      'You can ask for this notice in Hindi or another language listed in the Eighth Schedule to the Constitution by emailing ' + EMAIL + '.',
      'This policy was last updated on ' + POLICY_UPDATED + '. When we make material changes we will update this page and the date above, and where the law requires, ask for your consent again.',
    ] },
  ],
  finalCta: { heading: 'Questions about your data?', body: 'Email our Grievance Officer, ' + GRIEVANCE_OFFICER + ' — we respond within 30 days.', email: EMAIL },
}

export const terms = {
  meta: { title: 'Terms of Service — AI Agentix', description: 'Terms of Service for the AI Agentix website and services by Santure AI Private Limited: website use, enquiries and communications, the AI assistant, and commercial terms.' },
  badge: 'Legal Agreement',
  heading: 'Terms of Service',
  body: 'Please read these terms carefully before using the AI Agentix website or services. They govern our relationship with every client and visitor.',
  updated: POLICY_UPDATED, appliesTo: COMPANY,
  sections: [
    { title: 'Acceptance of Terms', paragraphs: [
      'By accessing or using AI Agentix services — including our website, AI voice agents, automation workflows, dashboards, or any related product — you agree to be bound by these Terms of Service.',
      'These terms apply to all visitors, clients, partners, and any other party who engages with Santure AI Private Limited ("AI Agentix," "we," "us," or "our").',
      'If you are entering into these terms on behalf of a company or legal entity, you represent that you have the authority to bind that entity to these terms.',
    ] },
    { title: 'Using this website', paragraphs: [
      'You may use this website to learn about our services and to contact us. You agree not to misuse it — for example by submitting false or someone else’s details, sending spam or automated submissions, trying to disrupt or gain unauthorised access to the site or its systems, or scraping it in a way that burdens our servers.',
      'Information on this website, including results, figures and timelines in case studies, describes typical or past outcomes and is not a guarantee of results for your business. Specific commitments are made only in a signed proposal or agreement.',
      'Links to third-party websites and apps (for example WhatsApp) are provided for convenience; their own terms and privacy policies apply.',
    ] },
    { title: 'Enquiries and communications', paragraphs: [
      'When you submit a form you confirm that the details are yours (or that you are authorised to share them) and accurate. With your consent, we will contact you about your enquiry by phone call, WhatsApp, SMS or email, once or more than once, including if your number is on the DND register, and — only if you opted in — send you updates and offers.',
      'You can withdraw consent or opt out at any time as described in our Privacy Policy. How we handle personal data is governed by our Privacy Policy, which forms part of these terms.',
    ] },
    { title: 'AI assistant', paragraphs: [
      'The on-site assistant gives automated answers based on this website’s content. It can make mistakes and its answers are general information, not professional, legal, financial or technical advice, and not an offer. Please confirm anything important with our team.',
      'Do not enter sensitive personal information in the assistant. We may limit or suspend the assistant to prevent misuse.',
    ] },
    { title: 'Services Description', paragraphs: [
      'AI Agentix provides AI-powered automation services including but not limited to: voice agents, WhatsApp chatbots, lead automation, document processing, and custom AI workflow development.',
      'All services are delivered as described in individual project scope documents, service agreements, or proposals agreed upon between AI Agentix and the client. Specific deliverables, timelines, and pricing are governed by those agreements.',
      'We reserve the right to modify, suspend, or discontinue any service with reasonable notice. For ongoing engagements, we will provide at least 30 days notice before any significant service changes.',
      'Where we process personal data on a client’s behalf while delivering services, we do so as the client’s Data Processor under the data processing terms in the service agreement, and the client remains responsible as Data Fiduciary for the consent and notices required for that data.',
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
      'These Terms of Service were last updated on ' + POLICY_UPDATED + '. We may update them periodically — significant changes will be communicated via email or a prominent notice on our website at least 14 days in advance.',
      'For any questions regarding these terms, please contact us at: ' + EMAIL + ' or write to Santure AI Private Limited, ' + ADDRESS + '.',
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
      'To initiate a refund request or ask questions about this policy, contact us at: ' + EMAIL + ' or write to Santure AI Private Limited, ' + ADDRESS + '.',
    ] },
  ],
  finalCta: { heading: 'Need to raise a refund request?', body: 'Email our billing team directly with your invoice number and details.', email: EMAIL },
}
