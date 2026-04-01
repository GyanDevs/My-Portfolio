/**
 * Fetch book cover thumbnails from the internet (Open Library) and convert to WebP.
 *
 * Output:
 *   public/assets/books/<id>.webp
 *
 * Run:
 *   node scripts/fetch-books-covers-to-webp.cjs
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const books = [
  { id: "dont-make-me-think", title: "Don't Make Me Think", author: "Steve Krug" },
  { id: "design-of-everyday-things", title: "The Design of Everyday Things", author: "Don Norman" },
  {
    id: "microcopy",
    title: "Microcopy",
    author: "Kinneret Yifrah",
    isbn: "9655721086",
  },
  { id: "articulating-design-decisions", title: "Articulating Design Decisions", author: "Tom Greever" },
  { id: "sprint", title: "Sprint", author: "Jake Knapp" },
];

const outDir = path.join(__dirname, "../public/assets/books");
const MIN_VALID_BYTES = 2500;

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function computeIsbn13FromIsbn10(isbn10) {
  // ISBN-10: 9 digits + 1 check digit (0-9 or X)
  if (!isbn10 || typeof isbn10 !== "string" || isbn10.length !== 10) return null;

  const core = isbn10.slice(0, 9);
  if (!/^\d{9}$/.test(core)) return null;

  // ISBN-13 first 12 digits: 978 + ISBN-10 first 9 digits
  const first12 = `978${core}`;
  const digits = first12.split("").map((d) => parseInt(d, 10));
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const weight = i % 2 === 0 ? 1 : 3; // positions: 1,3,5... weight 1; 2,4,6... weight 3
    sum += digits[i] * weight;
  }
  const check = (10 - (sum % 10)) % 10;
  return `${first12}${check}`;
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }

        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (raw += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

function getBuffer(url, depth = 0) {
  return new Promise((resolve, reject) => {
    if (depth > 4) return reject(new Error(`redirect depth exceeded for ${url}`));

    https
      .get(url, (res) => {
        const status = res.statusCode ?? 0;
        const contentType = res.headers["content-type"] ?? "";

        if (status >= 300 && status < 400 && res.headers.location) {
          // Follow redirects (covers endpoints may redirect).
          const nextUrl = res.headers.location.startsWith("http")
            ? res.headers.location
            : new URL(res.headers.location, url).toString();
          res.resume();
          return resolve(getBuffer(nextUrl, depth + 1));
        }

        if (status >= 400) {
          res.resume();
          return reject(new Error(`HTTP ${status} for ${url}`));
        }

        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const buf = Buffer.concat(chunks);
          if (!buf || buf.length < 1000) {
            return reject(new Error(`downloaded buffer too small (${buf ? buf.length : 0} bytes)`));
          }
          // If we didn't get an image, sharp will fail; fail fast with useful info.
          if (typeof contentType === "string" && contentType && !contentType.startsWith("image/")) {
            const preview = buf.subarray(0, 200).toString("utf8").replace(/\s+/g, " ").slice(0, 200);
            return reject(new Error(`non-image response (${contentType}): ${preview}`));
          }
          resolve(buf);
        });
      })
      .on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const book of books) {
    const outPath = path.join(outDir, `${book.id}.webp`);
    if (fs.existsSync(outPath)) {
      const size = fs.statSync(outPath).size;
      if (size >= MIN_VALID_BYTES) {
        console.log(`skip (exists): ${book.id}`);
        continue;
      }
      // Purge tiny/invalid outputs so we can retry.
      try {
        fs.unlinkSync(outPath);
      } catch {
        /* ignore */
      }
    }

    // Open Library search for a matching document with a cover_i.
    let coverId = null;
    let workKey = null;

    // Prefer ISBN endpoint: deterministic, avoids search edge cases.
    const isbnCandidates = book.isbn ? [book.isbn] : [];
    const isbn13 = book.isbn ? computeIsbn13FromIsbn10(book.isbn) : null;
    if (isbn13) isbnCandidates.push(isbn13);

    if (book.isbn) {
      try {
        for (const isbn of isbnCandidates) {
          console.log(`isbn lookup: ${book.id} (${isbn})`);
          try {
            const isbnJson = await getJson(
              `https://openlibrary.org/isbn/${encodeURIComponent(isbn)}.json`,
            );
            const covers = Array.isArray(isbnJson?.covers) ? isbnJson.covers : [];
            const first = covers.find((c) => typeof c === "number");
            if (typeof first === "number") {
              coverId = first;
              break;
            }
          } catch (e) {
            // Try next ISBN candidate.
          }
        }
      } catch (e) {
        console.error(`isbn lookup failed for ${book.id}:`, e.message);
      }
    }

    if (!coverId) {
      // ISBN search fallback (sometimes returns cover_i even when isbn JSON is 404).
      if (book.isbn) {
        for (const isbn of isbnCandidates) {
          const isbnSearchUrl = `https://openlibrary.org/search.json?isbn=${encodeURIComponent(isbn)}&limit=20`;
          try {
            console.log(`isbn search fallback: ${book.id} (${isbn})`);
            const isbnSearchJson = await getJson(isbnSearchUrl);
            const docs = Array.isArray(isbnSearchJson?.docs) ? isbnSearchJson.docs : [];
            const coverDoc = docs.find((d) => typeof d?.cover_i === "number");
            if (typeof coverDoc?.cover_i === "number") {
              coverId = coverDoc.cover_i;
              break;
            }
          } catch (e) {
            // Try next ISBN candidate.
          }
        }
      }

      const queryCandidates = [
        {
          q: `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(
            book.author,
          )}&limit=20`,
        },
        {
          q: `https://openlibrary.org/search.json?title=${encodeURIComponent(book.title)}&limit=30`,
        },
      ];

      for (const candidate of queryCandidates) {
        console.log(`searching: ${book.id}`);
        let json;
        try {
          json = await getJson(candidate.q);
        } catch (e) {
          console.error(`search failed for ${book.id}:`, e.message);
          continue;
        }

        const docs = Array.isArray(json?.docs) ? json.docs : [];
        const coverDoc = docs.find((d) => typeof d?.cover_i === "number");
        if (typeof coverDoc?.cover_i === "number") {
          coverId = coverDoc.cover_i;
          workKey = coverDoc?.key ?? null;
          break;
        }

        // Remember the first work key (if present) for a later fallback.
        workKey = workKey ?? docs[0]?.key ?? null;
      }

      // Fallback: use work JSON `covers[]` when search doesn't provide cover_i.
      if (!coverId && workKey) {
        try {
          console.log(`fallback work lookup: ${book.id}`);
          const workJson = await getJson(`https://openlibrary.org${workKey}.json`);
          const covers = Array.isArray(workJson?.covers) ? workJson.covers : [];
          const first = covers.find((c) => typeof c === "number");
          if (typeof first === "number") coverId = first;
        } catch (e) {
          console.error(`work lookup failed for ${book.id}:`, e.message);
        }
      }
    }

    // If coverId is still missing, try the direct cover endpoint by ISBN.
    // This bypasses Open Library metadata and often works directly.
    if (!coverId && book.isbn) {
      const isbnCoverCandidates = [
        // Open Library covers API patterns (we try both ISBN-10 and ISBN-13 variants).
        ...isbnCandidates.flatMap((isbn) => [
          `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-L.jpg`,
          `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-M.jpg`,
          `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-S.jpg`,
          `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-L.png`,
          `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-M.png`,
          `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(isbn)}-S.png`,
          `https://covers.openlibrary.org/isbn/${encodeURIComponent(isbn)}-L.jpg`,
          `https://covers.openlibrary.org/isbn/${encodeURIComponent(isbn)}-M.jpg`,
          `https://covers.openlibrary.org/isbn/${encodeURIComponent(isbn)}-S.jpg`,
        ]),
      ];

      let wrote = false;
      for (const coverUrl of isbnCoverCandidates) {
        try {
          console.log(`isbn cover download: ${book.id}`);
          const buf = await getBuffer(coverUrl);
          await sharp(buf)
            .resize(400, 533, { fit: "cover", position: "center" })
            .webp({ quality: 82, effort: 6 })
            .toFile(outPath);
          const size = fs.statSync(outPath).size;
          if (size < MIN_VALID_BYTES) {
            try {
              fs.unlinkSync(outPath);
            } catch {
              /* ignore */
            }
            throw new Error(`converted output too small (${size} bytes)`);
          }
          const kb = Math.round(size / 1024);
          console.log(`wrote: ${path.relative(process.cwd(), outPath)} (${kb} KB)`);
          wrote = true;
          break;
        } catch (e) {
          console.error(`isbn cover attempt failed for ${book.id}:`, e.message);
        }
      }

      if (wrote) {
        await delay(350);
        continue;
      }
    }

    if (!coverId) {
      console.error(`no cover_i found for ${book.id}`);
      continue;
    }

    // Try multiple image formats/sizes to avoid edge cases.
    const coverUrlCandidates = [
      `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
      `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
      `https://covers.openlibrary.org/b/id/${coverId}-S.jpg`,
      `https://covers.openlibrary.org/b/id/${coverId}-L.png`,
      `https://covers.openlibrary.org/b/id/${coverId}-M.png`,
      `https://covers.openlibrary.org/b/id/${coverId}-S.png`,
    ];

    let wrote = false;
    for (const coverUrl of coverUrlCandidates) {
      if (wrote) break;
      console.log(`downloading cover: ${book.id}`);
      try {
        const buf = await getBuffer(coverUrl);
        await sharp(buf)
          .resize(400, 533, { fit: "cover", position: "center" })
          .webp({ quality: 82, effort: 6 })
          .toFile(outPath);
        const size = fs.statSync(outPath).size;
        if (size < MIN_VALID_BYTES) {
          try {
            fs.unlinkSync(outPath);
          } catch {
            /* ignore */
          }
          throw new Error(`converted output too small (${size} bytes)`);
        }
        const kb = Math.round(size / 1024);
        console.log(`wrote: ${path.relative(process.cwd(), outPath)} (${kb} KB)`);
        wrote = true;
      } catch (e) {
        console.error(`cover attempt failed for ${book.id}:`, e.message);
      }
    }

    // Be nice to upstream.
    await delay(350);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

