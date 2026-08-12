import { mkdir, writeFile } from "node:fs/promises";

const products = [
  ["pera", "Pera", "burley"],
  ["cantalupo", "Cantalupo", "burley"],
  ["taste", "Taste", "limited"],
  ["truth", "Truth", "limited"],
  ["goodness", "Goodness", "limited"],
  ["beauty", "Beauty", "limited"],
  ["limoncello", "Limoncello", "no-aroma"],
  ["wild-strawberry-burley", "Wild Strawberry", "burley"],
  ["wild-strawberry-terror", "Wild Strawberry", "terror"],
  ["abricot-burley", "Abricot", "burley"],
  ["abricot-terror", "Abricot", "terror"],
  ["jenever", "Jenever", "no-aroma"],
  ["kriek-burley", "Kriek", "burley"],
  ["kriek-terror", "Kriek", "terror"],
  ["virgin", "Virgin", "no-aroma"],
  ["anejo", "Anejo", "no-aroma"],
  ["ruby-grapes", "Ruby Grapes", "burley"],
  ["cookies", "Cookies", "burley"],
];

const palettes = {
  burley: { label: "#d74f55", deep: "#8d252e", line: "BURLEY" },
  terror: { label: "#351519", deep: "#11090a", line: "TERROR" },
  "no-aroma": { label: "#b69b68", deep: "#725d38", line: "NO AROMA" },
  limited: { label: "#9c3042", deep: "#551522", line: "LIMITED" },
};

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const makeSvg = (name, lineId) => {
  const p = palettes[lineId];
  const safeName = escapeXml(name);
  const fontSize = name.length > 14 ? 188 : name.length > 9 ? 230 : 310;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="2880" height="2880" viewBox="0 0 2880 2880">
  <defs>
    <clipPath id="label"><path d="M690 1100 Q1440 1065 2150 1100 Q2200 1545 2150 1995 Q1440 2045 690 1995 Q640 1545 690 1100 Z"/></clipPath>
    <linearGradient id="wrap" x1="0" x2="1">
      <stop offset="0" stop-color="${p.deep}"/>
      <stop offset="0.12" stop-color="${p.label}"/>
      <stop offset="0.5" stop-color="${p.label}"/>
      <stop offset="0.88" stop-color="${p.label}"/>
      <stop offset="1" stop-color="${p.deep}"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" x2="1">
      <stop offset="0" stop-color="#000" stop-opacity=".24"/>
      <stop offset=".18" stop-color="#fff" stop-opacity=".08"/>
      <stop offset=".5" stop-color="#fff" stop-opacity=".02"/>
      <stop offset=".84" stop-color="#000" stop-opacity=".03"/>
      <stop offset="1" stop-color="#000" stop-opacity=".3"/>
    </linearGradient>
  </defs>
  <g clip-path="url(#label)">
    <rect x="640" y="1070" width="1560" height="975" fill="url(#wrap)" opacity=".94" style="mix-blend-mode:multiply"/>
    <rect x="640" y="1070" width="245" height="975" fill="#eee6cf" opacity=".98"/>
    <rect x="640" y="1070" width="1560" height="975" fill="url(#shade)"/>
    <text x="762" y="1570" fill="#171414" font-family="Manrope, Arial, sans-serif" font-size="34" letter-spacing="9" text-anchor="middle" transform="rotate(-90 762 1570)">SAINT-PETERSBURG</text>
    <text x="1515" y="1250" fill="#171414" font-family="Georgia, serif" font-size="46" font-style="italic" text-anchor="middle">Trofimoff's · EST. 2020</text>
    <text x="1515" y="1570" fill="#111" font-family="Segoe Script, Brush Script MT, cursive" font-size="${Math.round(fontSize * .72)}" font-style="italic" text-anchor="middle">${safeName}</text>
    <text x="1515" y="1790" fill="#111" font-family="Manrope, Arial, sans-serif" font-size="58" letter-spacing="14" text-anchor="middle">${p.line}</text>
    <text x="762" y="1900" fill="#171414" font-family="Manrope, Arial, sans-serif" font-size="28" letter-spacing="5" text-anchor="middle">125 ГРАММ</text>
  </g>
</svg>`;
};

await mkdir("public/products", { recursive: true });
const requestedSku = process.argv[2];
const selectedProducts = requestedSku ? products.filter(([slug]) => slug === requestedSku) : products;
if (requestedSku && selectedProducts.length === 0) throw new Error(`Unknown SKU: ${requestedSku}`);
await Promise.all(selectedProducts.map(([slug, name, line]) => writeFile(`public/products/${slug}.svg`, makeSvg(name, line), "utf8")));
await writeFile("public/products/render.html", `<!doctype html><html><head><style>*{box-sizing:border-box}html,body{margin:0;width:2880px;height:2880px;overflow:hidden;background:#fff}.asset{position:absolute;inset:0;width:2880px;height:2880px}#label{mix-blend-mode:multiply}</style></head><body><img class="asset" src="/masters/candidates/jar-blank-higgsfield-v1.png"><img class="asset" id="label"><script>const p=new URLSearchParams(location.search);document.querySelector('#label').src='/products/'+p.get('sku')+'.svg';</script></body></html>`, "utf8");
console.log(`Generated ${selectedProducts.length} deterministic product master(s).`);
