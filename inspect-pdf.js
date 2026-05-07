import fs from 'fs';
import pdf from 'pdf-parse';

let dataBuffer = fs.readFileSync('Agentix_Tool_Workspace_Table_Replacements.pdf');

pdf(dataBuffer).then(function(data) {
  console.log("SUCCESS");
  console.log(data.text.substring(0, 500));
}).catch(err => {
  console.error("ERROR", err);
});