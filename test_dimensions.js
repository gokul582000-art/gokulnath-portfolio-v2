const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function getDimensions() {
  const mediaFiles = [
    'public/assets/design/IHS/1-copy.jpg',
    'public/assets/design/IHS/5-copy.jpg',
    'public/assets/design/IHS/8-copy.jpg',
    'public/assets/design/IHS/Black-copy.jpg',
    'public/assets/design/IHS/Coolie-copy.jpg',
    'public/assets/design/IHS/statue-of-unity-copy.jpg',
    'public/assets/design/IHS/V10-copy.mp4',
    'public/assets/design/IHS/v12-copy.mp4',
    'public/assets/design/IHS/v13-copy.mp4',
    'public/assets/design/IHS/v15-copy.mp4'
  ];

  for (const file of mediaFiles) {
    if (fs.existsSync(file)) {
      if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) {
         const metadata = await sharp(file).metadata();
         console.log(`${file}: ${metadata.width}x${metadata.height} (Ratio: ${(metadata.width / metadata.height).toFixed(2)})`);
      } else {
         console.log(`${file}: Video`);
      }
    } else {
      console.log(`${file}: Not found`);
    }
  }
}
getDimensions();
