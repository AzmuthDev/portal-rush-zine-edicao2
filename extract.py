import re

html = open('index_backup.html', encoding='utf-8').read()
# Remove scripts and styles
html = re.sub(r'<script[\s\S]*?</script>', '', html)
html = re.sub(r'<style[\s\S]*?</style>', '', html)

# find all texts
texts = re.findall(r'>([^<]+)<', html)
texts = [t.strip() for t in texts if len(t.strip()) > 3]

with open('texts.txt', 'w', encoding='utf-8') as f:
    for t in texts:
        f.write(t + '\n')
