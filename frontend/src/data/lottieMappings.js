/**
 * Cinematic Category-Based Motion Families for AI AGENTIX.
 * Using only ultra-stable verified JSON assets to prevent 403 errors.
 * 
 * DESIGN PRINCIPLES:
 * - Abstract, intelligent, futuristic visuals.
 * - Verified stable CDNs only.
 */

// The master verified stable animation
const STABLE_CORE = 'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json'; 
const STABLE_ALT = 'https://assets8.lottiefiles.com/packages/lf20_kz9s9e.json';

export const CATEGORY_FAMILIES = {
  content: [STABLE_CORE],
  marketing: [STABLE_ALT],
  sales: [STABLE_CORE],
  cx: [STABLE_ALT],
  research: [STABLE_CORE],
  ops: [STABLE_ALT],
  systems: [STABLE_CORE],
  product: [STABLE_ALT],
  finance: [STABLE_CORE]
};

export const DEFAULT_ANIMATION = STABLE_CORE;

/**
 * Deterministically pick an animation from a family.
 */
export const getCategoryAnimation = (categoryId, toolId = '') => {
  const family = CATEGORY_FAMILIES[categoryId] || [DEFAULT_ANIMATION];
  const hash = toolId ? Math.abs(toolId.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)) : 0;
  const index = hash % family.length;
  return family[index] || DEFAULT_ANIMATION;
};

// Legacy support
export const getLottieUrl = (name, categoryId) => getCategoryAnimation(categoryId, name);
