// Оптимизация hero-визуалов вкусов.
//
// Источник (мастера, НЕ деплоятся): image-masters/hero/<base>-hero-v1.png (3312x2480, ~10-12 МБ).
// Результат (в public/, deploy): для каждого мастера — два WebP:
//   • <base>-hero-v1.webp     — до 1920px по ширине, для больших визуалов страницы вкуса;
//   • <base>-preview-v1.webp  — до 700px, для превью в списке/поиске.
//
// sharp ставится изолированно (репо/сборку не трогает):
//   npm install --prefix .tooling sharp
//   node scripts/optimize-hero.mjs
import { readdir, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, ".tooling/"));
const sharp = require("sharp");

const SRC = path.join(root, "image-masters/hero");
const OUT = path.join(root, "public/media/higgsfield");

const VARIANTS = [
  { suffix: "hero-v1", width: 1920, quality: 80 },
  { suffix: "preview-v1", width: 700, quality: 80 },
];

const files = (await readdir(SRC)).filter((f) => f.endsWith("-hero-v1.png"));
await mkdir(OUT, { recursive: true });

let totalIn = 0;
let totalOut = 0;
for (const file of files) {
  const base = file.replace(/-hero-v1\.png$/, "");
  const inputPath = path.join(SRC, file);
  const input = sharp(inputPath);
  const meta = await input.metadata();
  totalIn += meta.size ?? 0;
  const sizes = [];
  for (const v of VARIANTS) {
    const outPath = path.join(OUT, `${base}-${v.suffix}.webp`);
    const info = await sharp(inputPath)
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(outPath);
    totalOut += info.size;
    sizes.push(`${v.suffix} ${(info.size / 1024).toFixed(0)}KB`);
  }
  console.log(`${base.padEnd(24)} ${meta.width}x${meta.height} -> ${sizes.join("  ")}`);
}

console.log(
  `\nDone: ${files.length} masters, ${(totalIn / 1048576).toFixed(1)}MB PNG -> ` +
    `${(totalOut / 1048576).toFixed(1)}MB WebP`,
);
