/**
 * Downscale WebP covers (disc UI ~200px); run after convert-love-covers-to-webp.cjs
 * Run: node scripts/resize-love-covers-webp.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = path.join(__dirname, "../public/assets/love-track-covers");
const MAX = 640;

async function main() {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".webp"));
  for (const f of files) {
    const input = path.join(dir, f);
    const before = fs.statSync(input).size;
    const buf = await sharp(input)
      .resize(MAX, MAX, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toBuffer();
    fs.writeFileSync(input, buf);
    const after = fs.statSync(input).size;
    console.log(`${f}: ${(before / 1024).toFixed(0)} → ${(after / 1024).toFixed(0)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
