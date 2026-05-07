import fs from 'fs';

const slugify = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const text = fs.readFileSync('ocr_text.txt', 'utf8');
const lines = text.split('\n').map(l => l.trim());

const workspaces = {};
let currentTool = null;
let currentSlug = null;
let currentLabel = null;

const labels = [
  "Left panel heading",
  "Status pill",
  "Field 1 label",
  "Field 1 value",
  "Field 2 label",
  "Field 2 value",
  "Field 3 label",
  "Field 3 value",
  "Field 4 label",
  "Field 4 value",
  "Right panel heading",
  "Indicator text",
  "Workspace title",
  "Workspace body",
  "Checked status line"
];

const boilerplates = [
  "UI area",
  "Replace visible text with",
  "Highlighted table replacements for this category.",
  "Agentix Tool Workspace Table Replacements",
  "Generated:",
  "Scope:",
  "Category",
  "Tools",
  "Content & Creative Production",
  "Marketing & Growth",
  "Sales & Revenue",
  "Customer Experience & Support",
  "Market Research & Strategy",
  "Operations & Workflow Automation",
  "Business Systems & Knowledge",
  "Product, Project & Delivery",
  "Finance, Admin & Compliance"
];

const toolRegex = /^(\d+)\.\s+(.*)$/;

let tempStore = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;

  // Skip boilerplates
  if (boilerplates.some(b => line.startsWith(b))) continue;
  if (line.startsWith('Subcategory:')) continue;
  if (/^\d+$/.test(line) && lines[i-1] === '') continue; // Likely a page number or tool count in table

  const toolMatch = line.match(toolRegex);
  if (toolMatch) {
    if (currentSlug) {
      workspaces[currentSlug] = finalizeTool(tempStore);
    }
    const toolName = toolMatch[2];
    currentSlug = slugify(toolName);
    tempStore = {};
    currentLabel = null;
    continue;
  }

  if (labels.includes(line)) {
    currentLabel = line;
    tempStore[currentLabel] = "";
    continue;
  }

  if (currentLabel) {
    if (tempStore[currentLabel] === "") {
      tempStore[currentLabel] = line;
    } else {
      tempStore[currentLabel] += " " + line;
    }
  }
}

// Don't forget the last tool
if (currentSlug) {
  workspaces[currentSlug] = finalizeTool(tempStore);
}

function finalizeTool(data) {
  return {
    leftHeading: data["Left panel heading"] || "",
    statusPill: data["Status pill"] || "",
    fields: [
      { label: data["Field 1 label"] || "", value: data["Field 1 value"] || "" },
      { label: data["Field 2 label"] || "", value: data["Field 2 value"] || "" },
      { label: data["Field 3 label"] || "", value: data["Field 3 value"] || "" },
      { label: data["Field 4 label"] || "", value: data["Field 4 value"] || "" }
    ],
    rightHeading: data["Right panel heading"] || "",
    indicatorText: data["Indicator text"] || "",
    workspaceTitle: data["Workspace title"] || "",
    workspaceBody: data["Workspace body"] || "",
    checkedStatus: data["Checked status line"] || ""
  };
}

const outContent = `const toolWorkspaces = ${JSON.stringify(workspaces, null, 2)};\n\nexport default toolWorkspaces;\n`;
fs.writeFileSync('frontend/src/data/toolWorkspaces.js', outContent);

console.log(`Successfully generated toolWorkspaces.js with ${Object.keys(workspaces).length} tools.`);
