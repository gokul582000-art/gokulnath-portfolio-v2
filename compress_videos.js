const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const files = [
  "public/assets/design/AI Projects/A2b-thali-box-AI-ad.mp4",
  "public/assets/design/AI Projects/SALEM-RR-1-.mp4",
  "public/assets/design/AI Projects/Thangamayil-ad.mp4",
  "public/assets/design/GRUNDFOS/EHS-_2-(26.02.2026)-F2_1.mp4",
  "public/assets/design/GRUNDFOS/Grundfos-80th-Anniversary---High-Res_1.mp4",
  "public/assets/design/HOTMALE/OUT-1.mp4"
];

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${file}, not found.`);
    continue;
  }
  const tempPath = fullPath.replace('.mp4', '-compressed.mp4');
  console.log(`Compressing ${file}...`);
  try {
    // using -crf 28 and -preset fast for good compression ratio vs quality/speed, and scale to 1080p max to save size
    execSync(`"${ffmpeg}" -i "${fullPath}" -vcodec libx264 -crf 28 -preset fast -vf "scale='min(1920,iw)':-2" -acodec aac -b:a 128k "${tempPath}" -y`, { stdio: 'inherit' });
    
    // Check new size
    const origSize = fs.statSync(fullPath).size;
    const newSize = fs.statSync(tempPath).size;
    console.log(`Original size: ${(origSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Replace original
    fs.renameSync(tempPath, fullPath);
  } catch (e) {
    console.error(`Failed to compress ${file}:`, e.message);
  }
}
console.log('All done.');
