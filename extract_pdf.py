import pypdf
import os

pdf_path = 'Agentix_Tool_Workspace_Table_Replacements.pdf'
output_path = 'ocr_text.txt'

reader = pypdf.PdfReader(pdf_path)
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(text)

print(f"Extracted {len(reader.pages)} pages to {output_path}")