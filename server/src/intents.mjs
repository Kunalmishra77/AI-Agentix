// Answers used when no language model is configured (or it is unavailable).
// Every answer below is taken from the website's own content; keep it in sync with
// frontend/src/data/*.js when those facts change.

const WA = 'WhatsApp us using the green button at the bottom-left'

// Rough language detection so the reply matches how the visitor wrote.
export function detectLang(text) {
  if (/[ऀ-ॿ]/.test(text)) return 'hi'
  const hinglish = /\b(kya|hai|hain|kaise|kitna|kitne|kitni|mujhe|aap|apka|aapka|karte|karna|chahiye|batao|bataye|hoga|kab|kaun|nahi|kuch|mera|hamara|hum|ke|ki|ko|se)\b/i
  return (text.match(new RegExp(hinglish, 'gi')) || []).length >= 2 || /\b(kya|kitna|kaise|batao|chahiye)\b/i.test(text) ? 'hinglish' : 'en'
}

const INTENTS = [
  {
    key: 'greeting',
    test: /^(hi+|hello|hey|hii+|namaste|namaskar|hola|good (morning|afternoon|evening))\b[\s!.]*$|^(नमस्ते|हेलो)/i,
    reply: {
      en: "Hi! I can tell you about our AI automation solutions, industries we serve, pricing, or help you book a free AI audit. What would you like to know?",
      hinglish: 'Hi! Main aapko hamare AI automation solutions, industries, pricing ke baare me bata sakta hoon, ya free AI audit book karne me help kar sakta hoon. Aap kya jaanna chahte hain?',
      hi: 'नमस्ते! मैं आपको हमारे AI automation solutions, industries, pricing के बारे में बता सकता हूँ, या free AI audit book करने में मदद कर सकता हूँ। आप क्या जानना चाहेंगे?',
    },
  },
  {
    key: 'timeline',
    test: /how long|timeline|kitna time|kitne din|kab tak|duration|implement|deliver|time lag|समय|कितने दिन/i,
    reply: {
      en: 'It depends on scope: a single AI voice agent typically takes 2–3 weeks, and a full multi-system integration 8–10 weeks. We give you a precise timeline after the free discovery audit.',
      hinglish: 'Scope par depend karta hai: ek AI voice agent aam taur par 2–3 hafte me, aur full multi-system integration 8–10 hafte me. Free discovery audit ke baad hum exact timeline dete hain.',
      hi: 'यह scope पर निर्भर करता है: एक AI voice agent आमतौर पर 2–3 हफ्ते में, और पूरा multi-system integration 8–10 हफ्ते में। Free audit के बाद हम सटीक timeline देते हैं।',
    },
  },
  {
    key: 'pricing',
    test: /pric|cost|charge|fee|plan|package|budget|paisa|paise|rate|kharcha|lagega|kitne ka|kitna paisa|कीमत|प्राइस|खर्च|कितने का/i,
    reply: {
      en: 'Our plans: Starter ₹25,000/mo, Growth ₹49,000/mo and Enterprise ₹89,000/mo+. Each includes automation workflows plus ongoing support, with custom pricing for large deployments. Book a free AI audit and we\'ll recommend the right plan.',
      hinglish: 'Hamare plans: Starter ₹25,000/mahina, Growth ₹49,000/mahina aur Enterprise ₹89,000/mahina+. Har plan me automation workflows aur ongoing support included hai; bade projects ke liye custom pricing. Free AI audit book karein, hum sahi plan suggest karenge.',
      hi: 'हमारे plans: Starter ₹25,000/महीना, Growth ₹49,000/महीना और Enterprise ₹89,000/महीना+। हर plan में automation workflows और ongoing support शामिल है। Free AI audit book करें, हम सही plan बताएँगे।',
    },
    action: { navigate: '/contact', anchor: null, highlight: false },
  },
  {
    key: 'industries',
    test: /industr|sector|hospital|clinic|health|real estate|school|college|education|hotel|hospitality|retail|ecommerce|e-commerce|manufactur|factory|logistic|transport/i,
    pick: (text) => {
      const map = [
        [/hospital|clinic|health|doctor|patient/i, '/industries/healthcare', 'Healthcare'],
        [/real estate|property|builder/i, '/industries/real-estate', 'Real Estate'],
        [/school|college|education|coaching|admission/i, '/industries/education', 'Education'],
        [/hotel|hospitality|restaurant|resort/i, '/industries/hospitality', 'Hospitality'],
        [/retail|ecommerce|e-commerce|store|shop/i, '/industries/retail-ecommerce', 'Retail & E-commerce'],
        [/manufactur|factory|plant/i, '/industries/manufacturing', 'Manufacturing'],
        [/logistic|transport|delivery|fleet/i, '/industries/logistics', 'Logistics'],
      ]
      return map.find(([re]) => re.test(text)) || null
    },
    reply: {
      en: 'We build AI automation for Healthcare, Education, Hospitality, Real Estate, Retail & E-commerce, Manufacturing and Logistics.',
      hinglish: 'Hum Healthcare, Education, Hospitality, Real Estate, Retail & E-commerce, Manufacturing aur Logistics ke liye AI automation banate hain.',
      hi: 'हम Healthcare, Education, Hospitality, Real Estate, Retail & E-commerce, Manufacturing और Logistics के लिए AI automation बनाते हैं।',
    },
    action: { navigate: '/industries', anchor: null, highlight: false },
  },
  {
    key: 'topic',
    test: /./,
    pick: (text) => {
      const map = [
        [/gst|invoice|account|reconcil|finance|tally|payment|billing|इनवॉइस/i, '/solutions/finance-accounts', 'finance & accounts (invoicing, reconciliation, GST)'],
        [/\bhr\b|hrms|hiring|recruit|resume|candidate|onboard|payroll|attendance|भर्ती/i, '/solutions/hrms-hiring', 'HR & hiring'],
        [/voice|call(ing)? agent|ivr|whatsapp (bot|chatbot|automation)|chat ?bot|chatbot|बॉट|bot/i, '/solutions/ai-voice-chat', 'AI voice & chat agents (including WhatsApp bots)'],
        [/sales|lead|crm|follow.?up|लीड/i, '/solutions/sales-automation', 'sales & lead automation'],
        [/marketing|campaign|seo|ads|email marketing/i, '/solutions/marketing-automation', 'marketing automation'],
        [/supply chain|inventory|procure|warehouse|stock/i, '/solutions/supply-chain', 'supply chain'],
        [/content|video|social media|instagram|reel|blog|studio/i, '/ai-studio', 'AI content (videos, social, email)'],
        [/operation|workflow|process|back.?office/i, '/solutions/operations', 'operations automation'],
      ]
      return map.find(([re]) => re.test(text)) || null
    },
    reply: null,
  },
  {
    key: 'about',
    test: /\b(ceo|founder|co-?founder|owner|team|leadership|who are you|about (you|the company|ai agentix)|company)\b|kaun ho|कौन/i,
    reply: {
      en: 'AI Agentix is a product of Santure AI Private Limited, based in New Delhi. You can read about our mission, journey and leadership team on the About page — taking you there.',
      hinglish: 'AI Agentix, Santure AI Private Limited (New Delhi) ka product hai. Hamari mission, journey aur leadership team ke baare me About page par padh sakte hain — main aapko wahan le ja raha hoon.',
      hi: 'AI Agentix, Santure AI Private Limited (New Delhi) का product है। हमारी mission, journey और leadership team के बारे में About page पर पढ़ें — मैं आपको वहाँ ले जा रहा हूँ।',
    },
    action: { navigate: '/about', anchor: null, highlight: false },
  },
  {
    key: 'contact',
    test: /demo|book|audit|schedule|meeting|appointment|consult|contact|reach|talk to|speak|baat|sampark|milna|संपर्क|डेमो|बात/i,
    reply: {
      en: 'You can book a free AI audit or a live demo on our Contact page — it takes a minute. Our team usually replies within 4 business hours. You can also ' + WA + '.',
      hinglish: 'Contact page par aap free AI audit ya live demo book kar sakte hain — 1 minute lagta hai. Hamari team aam taur par 4 business hours me reply karti hai. Aap WhatsApp bhi kar sakte hain (neeche left me green button).',
      hi: 'Contact page पर आप free AI audit या live demo book कर सकते हैं। हमारी team आमतौर पर 4 business hours में जवाब देती है। आप WhatsApp भी कर सकते हैं (नीचे बाईं ओर green button)।',
    },
    action: { navigate: '/contact', anchor: null, highlight: false },
  },
  {
    key: 'phone',
    test: /\b(your|aapka|apka|contact|whatsapp) (number|no\.?)|\bnumber (kya|do|bhejo|please)|phone|mobile|e-?mail|address|office|location|नंबर|ईमेल|फ़ोन|पता/i,
    reply: {
      en: 'Phone: +91 92170 64245 · WhatsApp: +91 92171 67347 · Email: myai@ai-agentix.com · Office: T-1, Pankaj Arcade, Plot No. 16, Sector 5, Dwarka, New Delhi 110075.',
      hinglish: 'Phone: +91 92170 64245 · WhatsApp: +91 92171 67347 · Email: myai@ai-agentix.com · Office: New Delhi. Sabse jaldi reply ke liye WhatsApp karein (neeche left me green button).',
      hi: 'Phone: +91 92170 64245 · WhatsApp: +91 92171 67347 · Email: myai@ai-agentix.com · Office: New Delhi। सबसे जल्दी जवाब के लिए WhatsApp करें (नीचे बाईं ओर green button)।',
    },
  },
  {
    key: 'services',
    test: /service|solution|offer|what do you do|what you do|kya karte|kya kya|provide|capabilit|automat|agent|chatbot|voice|सेवा|क्या करते/i,
    reply: {
      en: 'We build end-to-end AI automation: sales & lead follow-up, marketing, HR & hiring, operations, supply chain, finance & accounts, AI voice and WhatsApp/chat agents, plus our AI content studio. Tell me your industry or the task you want to automate and I\'ll point you to the right page.',
      hinglish: 'Hum end-to-end AI automation banate hain: sales & lead follow-up, marketing, HR & hiring, operations, supply chain, finance & accounts, AI voice aur WhatsApp/chat agents, aur AI content studio. Apni industry ya jo kaam automate karna hai woh bataiye, main sahi page dikha dunga.',
      hi: 'हम end-to-end AI automation बनाते हैं: sales और lead follow-up, marketing, HR और hiring, operations, supply chain, finance और accounts, AI voice और WhatsApp/chat agents, और AI content studio। अपनी industry या काम बताइए, मैं सही page दिखाऊँगा।',
    },
    action: { navigate: '/solutions', anchor: null, highlight: false },
  },
]

const PAGE_NAMES = {
  '/': 'our home page', '/about': 'About us', '/solutions': 'Solutions', '/industries': 'Industries', '/technology': 'Technology',
  '/ai-studio': 'AI Studio', '/case-studies': 'Case Studies', '/contact': 'Contact', '/privacy': 'Privacy Policy', '/terms': 'Terms of Service', '/refund': 'Refund Policy',
}
const pageName = (route) => PAGE_NAMES[route] || route.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/** Best non-AI answer for a message: an intent answer, else a link to the best-matching page. */
export function ruleBasedReply(message, retrieved = []) {
  const lang = detectLang(message)
  for (const intent of INTENTS) {
    if (!intent.test.test(message)) continue
    if (intent.pick) {
      const hit = intent.pick(message)
      if (hit) {
        const [, route, name] = hit
        const r = { en: `Yes — we build AI automation for ${name}. I'm taking you to that page.`, hinglish: `Haan — hum ${name} ke liye AI automation banate hain. Main aapko woh page dikha raha hoon.`, hi: `हाँ — हम ${name} के लिए AI automation बनाते हैं। मैं आपको वह page दिखा रहा हूँ।` }
        return { reply: r[lang], action: { navigate: route, anchor: null, highlight: true } }
      }
    }
    if (!intent.reply) continue
    return { reply: intent.reply[lang], action: intent.action || null }
  }

  const top = retrieved.find((r) => r.score > 0.3)
  if (top?.route && top.route !== '/') {
    const r = {
      en: `I think ${pageName(top.route)} has what you're looking for — I'm taking you there. For anything specific, ${WA} or book a free call on the Contact page.`,
      hinglish: `Mujhe lagta hai ${pageName(top.route)} page par aapko yeh mil jayega — main aapko wahan le ja raha hoon. Kuch specific poochna ho to WhatsApp karein ya Contact page par free call book karein.`,
      hi: `मुझे लगता है ${pageName(top.route)} page पर आपको यह मिल जाएगा — मैं आपको वहाँ ले जा रहा हूँ। कुछ खास पूछना हो तो WhatsApp करें या Contact page पर free call book करें।`,
    }
    return { reply: r[lang], action: { navigate: top.route, anchor: null, highlight: true } }
  }
  const r = {
    en: `I don't have that detail on our site. Our team can answer directly — ${WA} or book a free call on the Contact page.`,
    hinglish: 'Yeh detail hamari site par nahi hai. Hamari team seedha jawab de degi — WhatsApp karein (neeche left me green button) ya Contact page par free call book karein.',
    hi: 'यह जानकारी हमारी site पर नहीं है। हमारी team सीधे जवाब देगी — WhatsApp करें या Contact page पर free call book करें।',
  }
  return { reply: r[lang], action: null }
}
