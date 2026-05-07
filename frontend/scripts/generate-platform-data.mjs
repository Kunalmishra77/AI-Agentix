import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), '..');
const source = path.join(root, 'Agentix_Platform_Content_Architecture.md');
const outFile = path.join(process.cwd(), 'src', 'data', 'platform.js');
const markdown = fs.readFileSync(source, 'utf8').replace(/\r\n/g, '\n');

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const categoryMeta = {
  'content-and-creative-production': {
    accent: '#ff7a59',
    secondary: '#f7b955',
    video: 'videos/categories/agentix-content-workflow.mp4',
  },
  'marketing-and-growth': {
    accent: '#9be15d',
    secondary: '#00c9a7',
    video: 'videos/categories/agentix-marketing-campaign.mp4',
  },
  'sales-and-revenue': {
    accent: '#45a3ff',
    secondary: '#35e0a1',
    video: 'videos/categories/agentix-sales-pipeline.mp4',
  },
  'customer-experience-and-support': {
    accent: '#62d0ff',
    secondary: '#7ee8c7',
    video: 'videos/categories/agentix-support-resolution.mp4',
  },
  'market-research-and-strategy': {
    accent: '#a78bfa',
    secondary: '#f8c46b',
    video: 'videos/categories/agentix-market-research-insight.mp4',
  },
  'operations-and-workflow-automation': {
    accent: '#48d7e8',
    secondary: '#ff9f43',
    video: 'videos/categories/agentix-operations-workflow.mp4',
  },
  'business-systems-and-knowledge': {
    accent: '#6d7cff',
    secondary: '#58b7ff',
    video: 'videos/categories/agentix-business-knowledge-rag.mp4',
  },
  'product-project-and-delivery': {
    accent: '#4f8cff',
    secondary: '#50e3a4',
    video: 'videos/categories/agentix-product-delivery.mp4',
  },
  'finance-admin-and-compliance': {
    accent: '#34d399',
    secondary: '#f2c94c',
    video: 'videos/categories/agentix-finance-compliance.mp4',
  },
};

const extractField = (block, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`${escaped}:\\s*([\\s\\S]*?)(?=\\n(?:Description|Business relevance|Target users|Problem solved|Why it belongs here|Use case|Target user/business type):|\\n#{2,4}\\s|$)`, 'i');
  const match = block.match(pattern);
  return match ? match[1].replace(/\s+/g, ' ').trim() : '';
};

const sections = [...markdown.matchAll(/^## Category \d+: (.+)$/gm)];
const categories = [];

sections.forEach((match, index) => {
  const title = match[1].trim();
  const start = match.index;
  const end = sections[index + 1]?.index ?? markdown.indexOf('\n## 4.', start);
  const block = markdown.slice(start, end > -1 ? end : markdown.length);
  const slug = slugify(title);
  const meta = categoryMeta[slug] ?? { accent: '#38bdf8', secondary: '#f97316' };

  const subMatches = [...block.matchAll(/^### \d+\.\d+ (.+)$/gm)];
  const subcategories = subMatches.map((subMatch, subIndex) => {
    const subTitle = subMatch[1].trim();
    const subStart = subMatch.index;
    const subEnd = subMatches[subIndex + 1]?.index ?? block.length;
    const subBlock = block.slice(subStart, subEnd);
    const subSlug = slugify(subTitle);

    const toolMatches = [...subBlock.matchAll(/^#### Tool: (.+)$/gm)];
    const tools = toolMatches.map((toolMatch, toolIndex) => {
      const toolName = toolMatch[1].trim();
      const toolStart = toolMatch.index;
      const toolEnd = toolMatches[toolIndex + 1]?.index ?? subBlock.length;
      const toolBlock = subBlock.slice(toolStart, toolEnd);
      const toolSlug = slugify(toolName);

      return {
        slug: toolSlug,
        name: toolName,
        category: slug,
        categoryName: title,
        subcategory: subSlug,
        subcategoryName: subTitle,
        description: extractField(toolBlock, 'Description'),
        useCase: extractField(toolBlock, 'Use case'),
        targetUser: extractField(toolBlock, 'Target user/business type'),
        icon: `icons/tools/${toolSlug}.svg`,
        preview: `images/tools/${slug}/${toolSlug}-preview.svg`,
        sample: `images/tools/${slug}/${toolSlug}-sample-output.svg`,
      };
    });

    return {
      slug: subSlug,
      name: subTitle,
      category: slug,
      categoryName: title,
      description: extractField(subBlock, 'Description'),
      problemSolved: extractField(subBlock, 'Problem solved'),
      rationale: extractField(subBlock, 'Why it belongs here'),
      image: `images/subcategories/${slug}/${subSlug}-workflow.svg`,
      tools,
    };
  });

  categories.push({
    slug,
    name: title,
    shortName: title.replace(/ & /g, ' + '),
    description: extractField(block, 'Description'),
    businessRelevance: extractField(block, 'Business relevance'),
    targetUsers: extractField(block, 'Target users'),
    accent: meta.accent,
    secondary: meta.secondary,
    icon: `icons/categories/${slug}.svg`,
    hero: `images/categories/${slug}/hero.svg`,
    ecosystem: `images/categories/${slug}/ecosystem-map.svg`,
    productPreview: `images/categories/${slug}/product-preview-stage.svg`,
    video: meta.video,
    subcategories,
  });
});

const tools = categories.flatMap((category) =>
  category.subcategories.flatMap((subcategory) =>
    subcategory.tools.map((tool) => ({
      ...tool,
      categoryAccent: category.accent,
      categorySecondary: category.secondary,
    }))
  )
);

const solutions = [
  ['AI Content Studio for B2B Teams', 'Connect brief intake, writing, approval, repurposing, and publishing into one managed content system.'],
  ['Sales Pipeline Automation Stack', 'Generate verified leads, enrich accounts, personalize outreach, qualify conversations, and sync pipeline data.'],
  ['Customer Support Automation Stack', 'Route tickets, draft accurate answers, escalate issues, and turn support signals into product insights.'],
  ['Market Research and Positioning Stack', 'Monitor competitors, analyze audiences, test offers, and create decision-ready strategy briefs.'],
  ['Founder AI Operations Stack', 'Give founder-led teams one operating layer for content, sales, admin, reporting, and follow-up.'],
  ['Agency Delivery Operating System', 'Standardize client onboarding, campaign execution, approvals, reporting, and delivery visibility.'],
  ['SaaS Launch and Growth Stack', 'Plan launch campaigns, validate features, build landing pages, and turn usage signals into growth experiments.'],
  ['Finance and Admin Automation Stack', 'Automate invoices, expenses, contracts, compliance checklists, and recurring business summaries.'],
].map(([name, description]) => {
  const slug = slugify(name);
  return {
    slug,
    name,
    description,
    image: `images/solutions/${slug}-stack-map.svg`,
  };
});

const useCases = [
  'B2B Agencies',
  'SaaS Startups',
  'Founder-Led Businesses',
  'Sales Teams',
  'Operations Teams',
  'Product Teams',
  'Customer Success Teams',
  'Consultants',
  'Local Service Businesses',
  'Education Brands',
].map((name) => {
  const slug = slugify(name);
  return {
    slug,
    name,
    description: `A practical Agentix workspace for ${name.toLowerCase()} that connects tools, workflows, reporting, and assistant guidance around the work they repeat every week.`,
    image: `images/use-cases/${slug}-dashboard.svg`,
  };
});

const integrations = [
  'CRM',
  'Email',
  'Messaging',
  'Calendar',
  'Docs Storage',
  'Spreadsheets',
  'CMS',
  'Support',
  'Analytics',
  'Payments',
  'Databases',
  'APIs Webhooks',
].map((name) => {
  const slug = slugify(name);
  return {
    slug,
    name,
    description: `Connect Agentix workflows with your ${name.toLowerCase()} stack so data moves cleanly between people, tools, and AI agents.`,
    image: `images/integrations/${slug}-data-flow.svg`,
  };
});

const docs = [
  'Getting Started',
  'Tools',
  'Workflows',
  'Assistant',
  'RAG Knowledge Base',
  'Integrations',
  'API Webhooks',
  'Admin Billing',
  'Security',
].map((name) => ({ slug: slugify(name), name, image: `images/docs-help/${slugify(name)}-diagram.svg` }));

const helpTopics = [
  'Account Help',
  'Billing Help',
  'Tool Help',
  'Workflow Help',
  'Assistant Help',
  'Integration Help',
  'Security Help',
  'Troubleshooting',
  'Contact Support',
].map((name) => ({ slug: slugify(name), name, image: `images/docs-help/${slugify(name)}-diagram.svg` }));

const content = `export const MEDIA_BASE = '/agentix-generated-media/';\n\nexport const platformCategories = ${JSON.stringify(categories, null, 2)};\n\nexport const platformTools = ${JSON.stringify(tools, null, 2)};\n\nexport const platformSolutions = ${JSON.stringify(solutions, null, 2)};\n\nexport const platformUseCases = ${JSON.stringify(useCases, null, 2)};\n\nexport const platformIntegrations = ${JSON.stringify(integrations, null, 2)};\n\nexport const docsCollections = ${JSON.stringify(docs, null, 2)};\n\nexport const helpTopics = ${JSON.stringify(helpTopics, null, 2)};\n\nexport const mediaUrl = (asset) => asset ? MEDIA_BASE + asset : '';\n\nexport const findCategory = (slug) => platformCategories.find((category) => category.slug === slug);\nexport const findSubcategory = (categorySlug, subcategorySlug) => findCategory(categorySlug)?.subcategories.find((subcategory) => subcategory.slug === subcategorySlug);\nexport const findTool = (slug) => platformTools.find((tool) => tool.slug === slug);\n`;

fs.writeFileSync(outFile, content);
console.log(`Generated ${categories.length} categories, ${categories.reduce((sum, c) => sum + c.subcategories.length, 0)} subcategories, and ${tools.length} tools.`);
