/**
 * Cinematic Category-Based Motion Families for AI AGENTIX.
 * Consolidated on the single ultra-stable verified JSON asset to guarantee 0 errors.
 */

// The only URL confirmed to bypass all 403 restrictions and serve reliably
const STABLE_CORE = 'https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json'; 

export const CATEGORY_FAMILIES = {
  content: [STABLE_CORE],
  marketing: [STABLE_CORE],
  sales: [STABLE_CORE],
  cx: [STABLE_CORE],
  research: [STABLE_CORE],
  ops: [STABLE_CORE],
  systems: [STABLE_CORE],
  product: [STABLE_CORE],
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
