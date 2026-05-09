/**
 * Cinematic Category-Based Motion Families for AI AGENTIX.
 * Maps strategic business categories to abstract, high-fidelity motion styles.
 * Each family contains variations to prevent visual monotony across tools.
 * 
 * DESIGN PRINCIPLES:
 * - Abstract, intelligent, futuristic visuals.
 * - Enterprise-grade cinematic motion.
 * - Transparent backgrounds for seamless blending.
 */

const STABLE_FALLBACK = 'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json';

export const CATEGORY_FAMILIES = {
  // 1. Content: Floating typography, media fragments, waveforms
  content: [
    'https://assets9.lottiefiles.com/packages/lf20_al36vcz9.json', // Waves
    'https://assets2.lottiefiles.com/packages/lf20_w6sre9.json'    // Abstract pulse
  ],
  // 2. Marketing: Animated analytics, conversion funnels
  marketing: [
    'https://assets3.lottiefiles.com/packages/lf20_h999it7v.json', // Chart growth
    'https://assets10.lottiefiles.com/packages/lf20_q5pk6pjy.json' // Funnel/Rocket
  ],
  // 3. Sales: CRM pipeline flows, connected nodes
  sales: [
    'https://assets1.lottiefiles.com/packages/lf20_u79jt6.json',    // Connectivity
    'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json' // Dynamic nodes
  ],
  // 4. CX: Conversational motion, connection systems
  cx: [
    'https://assets1.lottiefiles.com/packages/lf20_u79jt6.json',    // Interaction
    'https://assets2.lottiefiles.com/packages/lf20_w6sre9.json'    // Soft pulse
  ],
  // 5. Research: Holographic scanners, radar systems
  research: [
    'https://assets5.lottiefiles.com/packages/lf20_m6vL10T0Vf.json', // Scanner
    'https://assets8.lottiefiles.com/packages/lf20_kz9s9e.json'    // Data scan
  ],
  // 6. Ops: Workflow chains, trigger systems
  ops: [
    'https://assets2.lottiefiles.com/packages/lf20_w6sre9.json',    // Orchestration
    'https://assets5.lottiefiles.com/packages/lf20_m6vL10T0Vf.json' // Workflow grid
  ],
  // 7. Systems: Neural knowledge graphs, infrastructure
  systems: [
    'https://assets8.lottiefiles.com/packages/lf20_kz9s9e.json',    // Knowledge graph
    'https://assets5.lottiefiles.com/packages/lf20_m6vL10T0Vf.json' // System nodes
  ],
  // 8. Product: Roadmap motion, execution visuals
  product: [
    'https://assets4.lottiefiles.com/packages/lf20_p6vL10T0Vf.json', // Roadmap
    'https://assets3.lottiefiles.com/packages/lf20_h999it7v.json'    // Delivery pulse
  ],
  // 9. Finance: Governance shields, approval pipelines
  finance: [
    'https://assets7.lottiefiles.com/packages/lf20_q6vL10T0Vf.json', // Governance
    'https://assets8.lottiefiles.com/packages/lf20_kz9s9e.json'    // Secure layers
  ]
};

export const DEFAULT_ANIMATION = STABLE_FALLBACK;

/**
 * Deterministically pick an animation from a family.
 * Robust implementation to prevent undefined errors.
 */
export const getCategoryAnimation = (categoryId, toolId = '') => {
  const family = CATEGORY_FAMILIES[categoryId] || [DEFAULT_ANIMATION];
  // Simple deterministic hash
  const hash = toolId ? Math.abs(toolId.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)) : 0;
  const index = hash % family.length;
  return family[index] || DEFAULT_ANIMATION;
};

// Ensure legacy code doesn't break
export const getLottieUrl = (name, categoryId) => getCategoryAnimation(categoryId, name);
