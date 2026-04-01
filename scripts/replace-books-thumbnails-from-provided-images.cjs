/**
 * Overwrite `public/assets/books/*.webp` with the higher-quality PNG covers
 * that were uploaded into Cursor's workspaceStorage assets folder.
 *
 * Run:
 *   node scripts/replace-books-thumbnails-from-provided-images.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const outDir = path.join(__dirname, "../public/assets/books");
fs.mkdirSync(outDir, { recursive: true });

const inputBase =
  "C:\\Users\\Gyan\\.cursor\\projects\\c-Users-Gyan-gemini-antigravity-scratch-antigravity-portfolio\\assets\\c__Users_Gyan_AppData_Roaming_Cursor_User_workspaceStorage_2a611977b0badd5981b4ccb6ef668474_images_image-";

const mappings = [
  {
    id: "dont-make-me-think",
    input: `${inputBase}c1ddd1a7-74dc-48cf-966c-c4d490925b23.png`,
  },
  {
    id: "design-of-everyday-things",
    input: `${inputBase}ac052466-a19e-4950-9071-4bba5042273f.png`,
  },
  {
    id: "articulating-design-decisions",
    input: `${inputBase}2c750623-9207-454a-b432-5cdb898e39ac.png`,
  },
  {
    id: "sprint",
    input: `${inputBase}d629df7c-2e0f-40a9-b47b-3ab287b105e0.png`,
  },
  {
    id: "microcopy",
    input: `${inputBase}48836869-610c-4792-b0af-4e4a1eda1983.png`,
  },
];

async function runOne({ id, input }) {
  if (!fs.existsSync(input)) {
    console.error(`missing input: ${input}`);
    return;
  }

  const outPath = path.join(outDir, `${id}.webp`);
  const buf = fs.readFileSync(input);

  await sharp(buf)
    // Generate higher-res webps so the browser downscales crisply.
    .resize(800, 1066, { fit: "cover", position: "center" })
    .webp({ quality: 92, effort: 6 })
    .toFile(outPath);

  const size = fs.statSync(outPath).size;
  console.log(`${id}: wrote ${Math.round(size / 1024)} KB`);
}

async function main() {
  for (const m of mappings) {
    await runOne(m);
    // Small gap to avoid overwhelming filesystem.
    await new Promise((r) => setTimeout(r, 100));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

