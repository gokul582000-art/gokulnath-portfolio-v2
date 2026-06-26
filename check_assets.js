const fs = require('fs');
const path = require('path');

const tsFile = fs.readFileSync('./lib/data/design-projects.ts', 'utf8');
const photoFile = fs.readFileSync('./lib/data/photography-projects.ts', 'utf8');
const matches = [...tsFile.matchAll(/thumbnail:\s*"([^"]+)"/g), ...photoFile.matchAll(/thumbnail:\s*"([^"]+)"/g)];

let missing = 0;
let total = 0;
for (const match of matches) {
  total++;
  const src = match[1];
  const filepath = path.join(__dirname, 'public', decodeURIComponent(src));
  if (!fs.existsSync(filepath)) {
    console.log('Missing:', src);
    missing++;
  }
}
console.log(`Total checked: ${total}, Missing: ${missing}`);
