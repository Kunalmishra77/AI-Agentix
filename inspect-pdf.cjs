const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('Agentix_Tool_Workspace_Table_Replacements.pdf');

pdf(dataBuffer).then(function(data) {
  const text = data.text;
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  console.log("First 100 lines:");
  console.log(lines.slice(0, 100).join('\n'));
});