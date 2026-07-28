const fs = require('fs');
const content = fs.readFileSync('assets/b3bd0abfc8f5f0ab_css2.css', 'utf8');
const rules = content.split('}');
for (const rule of rules) {
  if (rule.includes('.hero') || rule.includes('h1') || rule.includes('hl-ch')) {
    console.log(rule.trim() + '}');
  }
}
