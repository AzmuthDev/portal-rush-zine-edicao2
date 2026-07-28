const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of Portal/PORTAL in the HTML with line numbers
const lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lower = line.toLowerCase();
  if (lower.includes('portal') && lower.includes('rush')) {
    console.log(`Line ${i+1}: ${line.substring(0, 300)}`);
  }
}
