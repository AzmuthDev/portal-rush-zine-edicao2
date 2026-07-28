import json
html = open('index_backup.html', encoding='utf-8').read()

# let's find the first index of 'feat-card'
idx = html.find('feat-card')
start = html.rfind('<div', 0, idx)
end = html.find('</div></div></div>', start) + 18
print(html[start:end])
