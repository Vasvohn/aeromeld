import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const svg = fs.readFileSync(path.join(publicDir, "favicon.svg"));

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "rgba(0,0,0,0)",
  });
  return resvg.render().asPng();
}

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function toIco(pngs) {
  const count = pngs.length;
  let offset = 6 + 16 * count;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  for (const png of pngs) {
    const { w, h } = pngSize(png);
    const entry = Buffer.alloc(16);
    entry[0] = w >= 256 ? 0 : w;
    entry[1] = h >= 256 ? 0 : h;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(entry);
  }
  return Buffer.concat([header, ...entries, ...pngs]);
}

const files = {
  "icon-16.png": 16,
  "icon-32.png": 32,
  "icon-48.png": 48,
  "icon-192.png": 192,
  "icon-512.png": 512,
  "apple-touch-icon.png": 180,
  "logo-mark.png": 512,
  "og.png": 512,
  "aeromeld-square.png": 32,
};

for (const [name, size] of Object.entries(files)) {
  fs.writeFileSync(path.join(publicDir, name), renderPng(size));
}

const icoPngs = [16, 32, 48].map((size) => renderPng(size));
fs.writeFileSync(path.join(publicDir, "favicon.ico"), toIco(icoPngs));
console.log("Wrote Aeromeld square mark favicons from favicon.svg");
