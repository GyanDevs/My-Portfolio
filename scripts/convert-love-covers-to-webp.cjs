/**
 * One-shot: JPG → WebP for public/assets/love-track-covers/
 * Run: node scripts/convert-love-covers-to-webp.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const dir = path.join(__dirname, "../public/assets/love-track-covers");

async function main() {
  const files = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f));
  for (const f of files) {
    const input = path.join(dir, f);
    const outName = f.replace(/\.jpe?g$/i, ".webp");
    const output = path.join(dir, outName);
    await sharp(input)
      .webp({ quality: 85, effort: 6 })
      .toFile(output);
    fs.unlinkSync(input);
    const o = fs.statSync(output).size;
    console.log(`${outName} (${(o / 1024).toFixed(0)} KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
