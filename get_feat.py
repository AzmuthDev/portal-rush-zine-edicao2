import re
html = open('index_backup.html', encoding='utf-8').read()
m = re.search(r'<div class="feat-card lead".*?</div></div></div>', html, re.DOTALL)
if m:
    print(m.group(0))
else:
    print("Not found")
