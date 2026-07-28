import re
import json

path = r'c:\Users\JEduardo\OneDrive\Documentos\Portalrush zine 2ª edicao\PortalRush_zine_edicao2\halide.aura.build\index.html'

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'>([^<]{2,})<', content)
texts = [m.strip() for m in matches if m.strip()]

with open('texts.json', 'w', encoding='utf-8') as out:
    json.dump(texts, out, indent=2, ensure_ascii=False)
