const fs = require('fs');
const gitFiles = fs.readFileSync('git_files.txt', 'utf8').split('\n').filter(Boolean);
const diskFiles = fs.readFileSync('disk_files.txt', 'utf8').split('\n').filter(Boolean);

// Create a map of lowercased git files to original git files
const gitMap = new Map();
for (const f of gitFiles) {
  gitMap.set(f, f);
}

const diskMap = new Map();
for (const f of diskFiles) {
  diskMap.set(f, f);
}

let mismatches = 0;
for (const f of diskFiles) {
  if (!gitMap.has(f)) {
    // Check if it exists with different case
    const lowerF = f.toLowerCase();
    const gitMatch = gitFiles.find(gf => gf.toLowerCase() === lowerF);
    if (gitMatch) {
      console.log(`CASE MISMATCH: Disk says "${f}" but Git tracks "${gitMatch}"`);
      mismatches++;
    } else {
      console.log(`NOT IN GIT: "${f}"`);
      mismatches++;
    }
  }
}
console.log(`Total mismatches: ${mismatches}`);
