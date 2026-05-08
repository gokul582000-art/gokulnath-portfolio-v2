import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const THUMBNAIL_WIDTH = 400;
const ASSETS_DIR = path.join(process.cwd(), "public/assets");
const OUTPUT_DIR = path.join(process.cwd(), "public/assets/thumbnails");

interface ImageInfo {
  filename: string;
  src: string;
  width: number;
  height: number;
}

async function getAllImages(dir: string, baseDir: string = dir): Promise<ImageInfo[]> {
  const images: ImageInfo[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
        const relativePath = path.relative(baseDir, fullPath);
        images.push({
          filename: entry.name,
          src: `/assets/${relativePath.replace(/\\/g, "/")}`,
          width: 0,
          height: 0,
        });
      }
    }
  }

  await walk(dir);
  return images;
}

async function generateThumbnail(
  srcPath: string,
  destPath: string
): Promise<{ width: number; height: number }> {
  const fullSrcPath = path.join(process.cwd(), "public", srcPath);
  const fullDestPath = path.join(OUTPUT_DIR, destPath);

  await fs.mkdir(path.dirname(fullDestPath), { recursive: true });

  const metadata = await sharp(fullSrcPath).metadata();
  const width = metadata.width || 1200;
  const height = metadata.height || 800;

  await sharp(fullSrcPath)
    .resize(THUMBNAIL_WIDTH, null, { withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(fullDestPath);

  return { width, height };
}

async function main() {
  console.log("Starting thumbnail generation...\n");

  const designDir = path.join(ASSETS_DIR, "design");
  const photographyDir = path.join(ASSETS_DIR, "photography");

  const designImages = await getAllImages(designDir);
  const photographyImages = await getAllImages(photographyDir);

  console.log(`Found ${designImages.length} design images`);
  console.log(`Found ${photographyImages.length} photography images\n`);

  const allImages = [
    ...designImages.map((img) => ({ ...img, category: "design" })),
    ...photographyImages.map((img) => ({ ...img, category: "photography" })),
  ];

  let processed = 0;
  let failed = 0;

  for (const image of allImages) {
    try {
      const thumbName = `${path.parse(image.filename).name}_thumb.jpg`;
      const thumbPath = `${image.category}/${path.parse(image.src).dir.split("/").pop()}/${thumbName}`;

      await generateThumbnail(image.src, thumbPath);
      processed++;

      if (processed % 50 === 0) {
        console.log(`Processed ${processed}/${allImages.length} images...`);
      }
    } catch (error) {
      failed++;
      console.error(`Failed: ${image.src}`);
    }
  }

  console.log(`\nDone! Generated ${processed} thumbnails, ${failed} failed.`);
}

main().catch(console.error);