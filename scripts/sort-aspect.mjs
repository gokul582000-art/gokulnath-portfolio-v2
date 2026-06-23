import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetFile = process.argv[2] || 'lib/data/photography-projects.ts';
const filePath = path.join(process.cwd(), targetFile);
const publicDir = path.join(process.cwd(), 'public');

async function processProjects() {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all projects
  const projectRegex = /\{\s*slug:[\s\S]*?media:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
  
  let newContent = content;
  let match;
  
  // We need to collect all replacements first
  const replacements = [];

  while ((match = projectRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const mediaBlock = match[1];
    
    const mediaItemRegex = /\{\s*src:\s*"([^"]+)",\s*type:\s*"([^"]+)"\s*\}/g;
    const mediaItems = [];
    let mediaMatch;
    
    while ((mediaMatch = mediaItemRegex.exec(mediaBlock)) !== null) {
      mediaItems.push({
        fullText: mediaMatch[0],
        src: mediaMatch[1],
        type: mediaMatch[2]
      });
    }
    
    // Process dimensions
    for (let item of mediaItems) {
      if (item.type === 'image') {
        const imagePath = path.join(publicDir, item.src);
        try {
          const metadata = await sharp(imagePath).metadata();
          item.width = metadata.width;
          item.height = metadata.height;
          item.ratio = metadata.width / metadata.height;
          
          if (item.ratio >= 0.95 && item.ratio <= 1.05) {
            item.group = 1; // 1:1
          } else if (item.ratio >= 0.65 && item.ratio < 0.95) {
            item.group = 2; // 4:5
          } else if (item.ratio > 1.05) {
            item.group = 3; // 16:9
          } else if (item.ratio < 0.65) {
            item.group = 4; // 9:16
          }
        } catch (e) {
          console.error(`Error reading ${imagePath}:`, e.message);
          item.group = 99; // Fallback
        }
      } else {
        item.group = 99;
      }
    }
    
    // Sort
    mediaItems.sort((a, b) => {
      if (a.group !== b.group) return a.group - b.group;
      return a.src.localeCompare(b.src);
    });
    
    // Reconstruct media block
    const newMediaBlock = mediaItems.map(item => `      ${item.fullText}`).join(',\n') + ',';
    
    const newMatchText = fullMatch.replace(mediaBlock, `\n${newMediaBlock}\n    `);
    replacements.push({ oldText: fullMatch, newText: newMatchText });
  }
  
  // Apply replacements
  for (const r of replacements) {
    newContent = newContent.replace(r.oldText, r.newText);
  }
  
  fs.writeFileSync(filePath, newContent);
  console.log('Successfully sorted media by aspect ratio.');
}

processProjects().catch(console.error);
