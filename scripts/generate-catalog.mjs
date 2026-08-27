import fs from "node:fs";
import path from "node:path";

const rows = JSON.parse(fs.readFileSync(".tooling/catalog_rows.json", "utf8"));
const sourceDir = "images";
const targetDir = "public/products/catalog";
fs.mkdirSync(targetDir, { recursive: true });

const imageFiles = fs.readdirSync(sourceDir).filter((file) => /\.(?:webp|png|jpe?g)$/i.test(file));
const normalize = (value) => value.toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9]+/g, "");
const lineMap = { burley: "burley", terror: "terror", "no aroma": "no-aroma", cigarro: "cigarro" };
const nameFixes = { "сrio": "Crio", "crio": "Crio", "yelow lemon": "Yellow Lemon" };
const slugFixes = { "like-zaghoul": "like-zaghoul", "yellow-lemon": "yellow-lemon" };
const translit = { а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya" };
const slugify = (value) => slugFixes[value.toLowerCase()] ?? value.toLowerCase().split("").map((char) => translit[char] ?? char).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const existingHeroBases = {
  pera: { burley: "pera" }, cantalupo: { burley: "cantalupo" }, cookies: { burley: "cookies" },
  abricot: { burley: "abricot-burley", terror: "abricot-terror" },
  kriek: { burley: "kriek-burley", terror: "kriek-terror" },
  "wild-strawberry": { burley: "wild-strawberry-burley", terror: "wild-strawberry-terror" },
  jenever: { "no-aroma": "jenever" }, limoncello: { "no-aroma": "limoncello" },
  virgin: { "no-aroma": "virgin" }, "ruby-grapes": { burley: "ruby-grapes" },
};

const masterImages = {
  "crio:cigarro": "/products/masters/crio-cigarro-master-v1.webp",
  "connecticut:cigarro": "/products/masters/connecticut-cigarro-master-v1.webp",
  "drama:cigarro": "/products/masters/drama-cigarro-master-v1.webp",
  "pepe:cigarro": "/products/masters/pepe-cigarro-master-v1.webp",
};

const sceneImages = {
  "the-rose:burley": "/products/scenes/the-rose-burley-scene-v1.webp",
  "watermelon:burley": "/products/scenes/watermelon-burley-scene-v1.webp",
  "yellow-lemon:burley": "/products/scenes/yelow-lemon-burley-scene-v1.webp",
  "hazelhut:burley": "/products/scenes/hazelhut-burley-scene-v1.webp",
  "pop-corn:burley": "/products/scenes/pop-corn-burley-scene-v1.webp",
  "red-currant:burley": "/products/scenes/red-currant-burley-scene-v1.webp",
  "regan:burley": "/products/scenes/regan-burley-scene-v1.webp",
  "ruby-grapes:burley": "/products/scenes/ruby-grapes-burley-scene-v1.webp",
  "pan-banan:burley": "/products/scenes/pan-banan-burley-scene-v1.webp",
  "passion-fruit:burley": "/products/scenes/passion-fruit-burley-scene-v1.webp",
  "peche:burley": "/products/scenes/peche-burley-scene-v1.webp",
  "pineapple:burley": "/products/scenes/pineapple-burley-scene-v1.webp",
  "nobilis:burley": "/products/scenes/nobilis-burley-scene-v1.webp",
  "nurr:burley": "/products/scenes/nurr-burley-scene-v1.webp",
  "old-school-orange:burley": "/products/scenes/old-school-orange-burley-scene-v1.webp",
  "opuntia-pear:burley": "/products/scenes/opuntia-pear-burley-scene-v1.webp",
  "kiwi:burley": "/products/scenes/kiwi-burley-scene-v1.webp",
  "lavander:burley": "/products/scenes/lavander-burley-scene-v1.webp",
  "limonata:burley": "/products/scenes/limonata-burley-scene-v2.webp",
  "mangifera:burley": "/products/scenes/mangifera-burley-scene-v1.webp",
  "double-apple:burley": "/products/scenes/double-apple-burley-scene-v2.webp",
  "elder-flowers:burley": "/products/scenes/elder-flowers-burley-scene-v1.webp",
  "grapefruit:burley": "/products/scenes/grapefruit-burley-scene-v1.webp",
  "green-apple:burley": "/products/scenes/green-apple-burley-scene-v1.webp",
  "cocos:burley": "/products/scenes/cocos-burley-scene-v1.webp",
  "coke:burley": "/products/scenes/coke-burley-scene-v1.webp",
  "crespino:burley": "/products/scenes/crespino-burley-scene-v1.webp",
  "dark-plum:burley": "/products/scenes/dark-plum-burley-scene-v1.webp",
  "sri-lanka:burley": "/products/scenes/sri-lanka-burley-scene-v1.webp",
  "baileys:burley": "/products/scenes/baileys-burley-scene-v1.webp",
  "cashmere-guava:burley": "/products/scenes/cashmere-guava-burley-scene-v1.webp",
  "cashmere-nectarine:burley": "/products/scenes/cashmere-nectarine-burley-scene-v1.webp",
  "green-tea:burley": "/products/scenes/green-tea-burley-scene-v1.webp",
  "hurtleberry:burley": "/products/scenes/hurtleberry-burley-scene-v1.webp",
  "tangerine:burley": "/products/scenes/tangerine-burley-scene-v1.webp",
  "wintergreen:burley": "/products/scenes/wintergreen-burley-scene-v1.webp",
  "baileys:terror": "/products/scenes/baileys-terror-scene-v1.webp",
  "coke:terror": "/products/scenes/coke-terror-scene-v1.webp",
  "crespino:terror": "/products/scenes/crespino-terror-scene-v1.webp",
  "dark-plum:terror": "/products/scenes/dark-plum-terror-scene-v1.webp",
  "finlandia-vanila:terror": "/products/scenes/finlandia-vanila-terror-scene-v1.webp",
  "hurtleberry:terror": "/products/scenes/hurtleberry-terror-scene-v1.webp",
  "mangifera:terror": "/products/scenes/mangifera-terror-scene-v2.webp",
  "old-school-orange:terror": "/products/scenes/old-school-orange-terror-scene-v1.webp",
  "pineapple:terror": "/products/scenes/pineapple-terror-scene-v1.webp",
  "red-currant:terror": "/products/scenes/red-currant-terror-scene-v1.webp",
  "cognac:no-aroma": "/products/scenes/cognac-no-aroma-scene-v1.webp",
  "italia:no-aroma": "/products/scenes/italia-no-aroma-scene-v1.webp",
  "like-zaghoul:no-aroma": "/products/scenes/like-zaghoul-no-aroma-scene-v1.webp",
  "ortica:no-aroma": "/products/scenes/ortica-no-aroma-scene-v1.webp",
  "shurale:no-aroma": "/products/scenes/shurale-no-aroma-scene-v1.webp",
  "spirit:no-aroma": "/products/scenes/spirit-no-aroma-scene-v1.webp",
  "crio:cigarro": "/products/scenes/crio-cigarro-scene-v1.webp",
  "connecticut:cigarro": "/products/scenes/connecticut-cigarro-scene-v1.webp",
  "drama:cigarro": "/products/scenes/drama-cigarro-scene-v2.webp",
  "pepe:cigarro": "/products/scenes/pepe-cigarro-scene-v1.webp",
};

const specialImages = {
  "sri-lanka:burley": "srilanka.webp",
  "crio:cigarro": "crio.webp",
  "like-zaghoul:no-aroma": "Like-Zaghoul.webp",
  "yellow-lemon:burley": "Yelow Lemon burley.webp",
  "wintergreen:burley": "wintergreen burley.webp",
};

const parsed = rows.map((row) => {
  const sourceLine = String(row["Линейка"] ?? "").trim().toLowerCase();
  const line = lineMap[sourceLine];
  let product = String(row["Наименование"] ?? "")
    .replace(/^Табак\s*-\s*"Trofimoff(?:'s|"s)"\s*/i, "")
    .trim();
  const descriptor = product.match(/\((.*)\)\s*$/)?.[1]?.trim().replace(/"/g, "") ?? "";
  product = product.replace(/\s*\(.*\)\s*$/, "").replace(new RegExp(`\\s+${sourceLine.replace(" ", "\\s+")}\\s*$`, "i"), "").trim();
  product = nameFixes[product.toLowerCase()] ?? product;
  const slug = slugify(product);
  const description = String(row["Описание для промосайта"] ?? "").trim();
  const shortDescription = description.split(/\r?\n+/).map((part) => part.trim()).find(Boolean) ?? description;
  const notes = String(row["Вкусовые ноты*"] ?? "").split(";").map((note) => note.trim()).filter(Boolean);
  const archetype = String(row["Visual archetype*"] ?? "").trim() || (line === "cigarro" || line === "no-aroma" ? "Tobacco" : "Flavor");
  const score = (column) => Math.max(1, Math.min(5, Number(row[column]) || 1));
  const scores = {
    sweetness: score("Сладость 1–5*"),
    acidity: score("Кислинка 1–5*"),
    freshness: score("Свежесть 1–5*"),
    spice: score("Пряность 1–5*"),
    tobacco: score("Табачность 1–5*"),
  };
  return { product, slug, line, sourceLine, descriptor, description, shortDescription, notes, archetype, scores };
});

const findImage = ({ product, slug, line, sourceLine }) => {
  const special = specialImages[`${slug}:${line}`];
  if (special) return special;
  const candidates = imageFiles.filter((file) => {
    const stem = path.parse(file).name;
    return normalize(stem) === normalize(`${product} ${sourceLine}`) || normalize(stem) === normalize(product);
  });
  return candidates[0];
};

const grouped = new Map();
const missing = [];
for (const item of parsed) {
  const imageFile = findImage(item);
  if (imageFile) fs.copyFileSync(path.join(sourceDir, imageFile), path.join(targetDir, imageFile));
  else missing.push({ flavor: item.product, line: item.line });

  const flavor = grouped.get(item.slug) ?? {
    id: grouped.size + 1,
    slug: item.slug,
    name: item.product,
    displayName: item.descriptor ? `${item.product} — ${item.descriptor}` : item.product,
    lines: [],
    profile: item.line === "cigarro" ? "Сигарный · табачный" : item.line === "no-aroma" ? "Табачный · неароматика" : item.descriptor || "Авторский аромат",
    shortDescription: item.shortDescription,
    fullDescription: item.description,
    notes: item.notes.length ? [...item.notes] : item.descriptor ? [item.descriptor] : [item.line === "cigarro" ? "сигарный профиль" : "табачный профиль"],
    archetype: item.archetype,
    descriptions: {},
    shortDescriptions: {},
    notesByLine: {},
    archetypes: {},
    scoresByLine: {},
    images: {},
  };
  flavor.lines.push(item.line);
  flavor.descriptions[item.line] = item.description;
  flavor.shortDescriptions[item.line] = item.shortDescription;
  flavor.notesByLine[item.line] = item.notes;
  flavor.archetypes[item.line] = item.archetype;
  flavor.scoresByLine[item.line] = item.scores;
  flavor.notes = [...new Set([...flavor.notes, ...item.notes])];
  const sceneImage = sceneImages[`${item.slug}:${item.line}`];
  const masterImage = masterImages[`${item.slug}:${item.line}`];
  const heroBase = existingHeroBases[item.slug]?.[item.line];
  if (sceneImage) {
    flavor.images[item.line] = { hero: sceneImage, preview: sceneImage, ...(masterImage ? { master: masterImage } : {}) };
  } else if (heroBase) {
    flavor.images[item.line] = {
      hero: `/media/higgsfield/${heroBase}-hero-v1.webp`,
      preview: `/media/higgsfield/${heroBase}-preview-v1.webp`,
    };
  } else if (imageFile) {
    const url = `/products/catalog/${encodeURIComponent(imageFile)}`;
    flavor.images[item.line] = { hero: url, preview: url };
  }
  grouped.set(item.slug, flavor);
}

const flavors = [...grouped.values()];
const output = `import type { Flavor } from "./domain";\n\nexport const catalogFlavors: Flavor[] = ${JSON.stringify(flavors, null, 2)};\n`;
fs.writeFileSync("src/catalog.generated.ts", output, "utf8");
fs.writeFileSync(".tooling/catalog-missing.json", JSON.stringify(missing, null, 2), "utf8");
const sitemapSlugs = [...flavors.map((flavor) => flavor.slug), "taste", "truth", "goodness", "beauty"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://trofimoff.tdistina.ru/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
${sitemapSlugs.map((slug) => `  <url><loc>https://trofimoff.tdistina.ru/flavors/${slug}</loc><priority>0.8</priority></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync("public/sitemap.xml", sitemap, "utf8");
console.log(`Generated ${flavors.length} flavors from ${parsed.length} SKU rows.`);
console.log(`Missing images: ${missing.map((item) => `${item.flavor} (${item.line})`).join(", ") || "none"}`);

