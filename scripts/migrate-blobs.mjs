// One-shot migration: copy every image from the old public Vercel Blob store
// to the new one keyed by IMAGES_READ_WRITE_TOKEN. Idempotent — re-running
// overwrites existing blobs at the same path.
//
// Usage:
//   IMAGES_READ_WRITE_TOKEN=vercel_blob_rw_xxx node scripts/migrate-blobs.mjs

import { put } from "@vercel/blob";

const OLD_BASE = "https://hflb0i32sg7a4vfl.public.blob.vercel-storage.com";

const PATHS = [
  "images/hero/DSC00727.jpg",
  "images/hero/DSC00789.jpg",
  "images/hero/DSC00995.jpg",
  "images/hero/DSC06067.JPG",
  "images/birthday/DSC00546.jpg",
  "images/birthday/DSC00549.jpg",
  "images/birthday/DSC00555.jpg",
  "images/birthday/DSC00556.jpg",
  "images/birthday/DSC00557.jpg",
  "images/birthday/DSC00559.jpg",
  "images/birthday/DSC00703.jpg",
  "images/birthday/DSC00727.jpg",
  "images/birthday/DSC00728.jpg",
  "images/birthday/DSC00766.jpg",
  "images/birthday/DSC00771.jpg",
  "images/birthday/DSC00789.jpg",
  "images/birthday/DSC00808.jpg",
  "images/birthday/DSC00821.jpg",
  "images/birthday/DSC00824.jpg",
  "images/birthday/DSC00995.jpg",
  "images/birthday/DSC06037 2.JPG",
  "images/birthday/DSC06039.JPG",
  "images/birthday/DSC06056 2.JPG",
  "images/birthday/DSC06057.JPG",
  "images/birthday/DSC06065.JPG",
  "images/birthday/DSC06067.JPG",
  "images/birthday/DSC06085.JPG",
  "images/camps/hero.jpg",
  "images/camps/training-1.jpg",
  "images/camps/training-2.jpg",
  "images/events/hero.jpg",
  "images/events/action-1.jpg",
  "images/events/venue-1.jpg",
  "images/gallery/DSC00789.jpg",
  "images/gallery/DSC00808.jpg",
  "images/gallery/DSC00995.jpg",
  "images/gallery/DSC06057.JPG",
  "images/backgrounds/about-bg.jpg",
  "images/backgrounds/cta-bg.jpg",
  "images/backgrounds/hero-bg.jpg",
  "images/backgrounds/programs-bg.jpg",
];

const token = process.env.IMAGES_READ_WRITE_TOKEN;
if (!token) {
  console.error("IMAGES_READ_WRITE_TOKEN is not set. Aborting.");
  process.exit(1);
}

const contentTypeFor = (path) => {
  const ext = path.split(".").pop().toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "avif") return "image/avif";
  if (ext === "gif") return "image/gif";
  return "application/octet-stream";
};

const failures = [];
let migrated = 0;

for (const path of PATHS) {
  const sourceUrl = `${OLD_BASE}/${path.split("/").map(encodeURIComponent).join("/")}`;
  try {
    const res = await fetch(sourceUrl);
    if (!res.ok) {
      throw new Error(`fetch failed: ${res.status} ${res.statusText}`);
    }
    const body = Buffer.from(await res.arrayBuffer());
    const result = await put(path, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: contentTypeFor(path),
      token,
    });
    migrated++;
    console.log(`[${migrated}/${PATHS.length}] ${path} -> ${result.url}`);
  } catch (err) {
    failures.push({ path, error: err.message });
    console.error(`FAILED ${path}: ${err.message}`);
  }
}

console.log(`\nDone. ${migrated}/${PATHS.length} migrated.`);
if (failures.length) {
  console.error(`${failures.length} failures:`);
  for (const f of failures) console.error(`  - ${f.path}: ${f.error}`);
  process.exit(1);
}
