const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function getDimensions() {
  const mediaFiles = [
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.06.48-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.06.59-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.07.09-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.08.19-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.08.24-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.07.33-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.07.41-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.07.50-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.08.33-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.08.46-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.09.02-PM.jpg',
    '/assets/design/IHS/Screenshot-2026-04-02-at-5.09.10-PM.jpg'
  ];

  for (const fileUrl of mediaFiles) {
    const file = path.join(process.cwd(), 'public', fileUrl);
    if (fs.existsSync(file)) {
      if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp')) {
         const metadata = await sharp(file).metadata();
         console.log(`${fileUrl}: ${metadata.width}x${metadata.height} (Ratio: ${(metadata.width / metadata.height).toFixed(2)})`);
      } else {
         console.log(`${fileUrl}: Video`);
      }
    } else {
      console.log(`${fileUrl}: Not found`);
    }
  }
}
getDimensions();
