const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const file = "public/assets/design/GRUNDFOS/Grundfos-80th-Anniversary---High-Res_1.mp4";
const fullPath = path.join(__dirname, file);
const tempPath = fullPath.replace('.mp4', '-compressed2.mp4');

console.log(`Re-compressing ${file} to fit under 100MB...`);
try {
  // Use scale 1280x720 and crf 30
  execSync(`"${ffmpeg}" -i "${fullPath}" -vcodec libx264 -crf 30 -preset fast -vf "scale='min(1280,iw)':-2" -acodec aac -b:a 128k "${tempPath}" -y`, { stdio: 'inherit' });
  
  const newSize = fs.statSync(tempPath).size;
  console.log(`New size: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
  
  fs.renameSync(tempPath, fullPath);
} catch (e) {
  console.error(e.message);
}
console.log('Done.');
