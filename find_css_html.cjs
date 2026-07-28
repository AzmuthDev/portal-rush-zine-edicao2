const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const styles = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
for (const style of styles) {
  if (style.includes('hero') || style.includes('h1') || style.includes('hl-ch')) {
    const rules = style.split('}');
    for (const rule of rules) {
      if (rule.includes('.hero') || rule.includes('h1') || rule.includes('.hl-ch')) {
        console.log(rule.trim().replace(/\n/g, '') + '}');
      }
    }
  }
}
