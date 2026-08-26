import type { LineId } from "./domain";
import { getFlavor } from "./content";

const processed = (filename: string) => `/processed/${encodeURIComponent(filename)}`;
const heroImg = (filename: string) => `/media/higgsfield/${filename}-hero-v1.webp`;
const previewImg = (filename: string) => `/media/higgsfield/${filename}-preview-v1.webp`;

export const logo = processed("logo.png");

// Базовое имя мастера hero-визуала на вкус/линейку. Из него строятся два WebP:
// hero (крупные визуалы) и preview (лёгкие превью в списках/поиске).
const flavorBases: Record<string, Partial<Record<LineId | "default", string>>> = {
  pera: { default: "pera", burley: "pera" },
  cantalupo: { default: "cantalupo", burley: "cantalupo" },
  taste: { default: "taste", limited: "taste" },
  truth: { default: "truth", limited: "truth" },
  goodness: { default: "goodness", limited: "goodness" },
  beauty: { default: "beauty", limited: "beauty" },
  limoncello: { default: "limoncello", "no-aroma": "limoncello" },
  "wild-strawberry": { default: "wild-strawberry-burley", burley: "wild-strawberry-burley", terror: "wild-strawberry-terror" },
  abricot: { default: "abricot-burley", burley: "abricot-burley", terror: "abricot-terror" },
  jenever: { default: "jenever", "no-aroma": "jenever" },
  kriek: { default: "kriek-burley", burley: "kriek-burley", terror: "kriek-terror" },
  virgin: { default: "virgin", "no-aroma": "virgin" },
  anejo: { default: "anejo", "no-aroma": "anejo" },
  "ruby-grapes": { default: "ruby-grapes", burley: "ruby-grapes" },
  cookies: { default: "cookies", burley: "cookies" },
};

const resolveBase = (slug: string, line?: LineId) =>
  (line ? flavorBases[slug]?.[line] : undefined) ?? flavorBases[slug]?.default;

// Крупный визуал (страница вкуса, постеры видео).
export const getFlavorImage = (slug: string, line?: LineId) => {
  const flavor = getFlavor(slug);
  const image = line ? flavor?.images?.[line] : flavor?.images?.[flavor.lines[0]];
  if (image?.hero) return image.hero;
  const base = resolveBase(slug, line);
  return base ? heroImg(base) : "/media/higgsfield/categories/burley-v1.webp";
};

// Лёгкое превью (список вкусов на главной, поиск, «следующий аромат»).
export const getFlavorPreview = (slug: string, line?: LineId) => {
  const flavor = getFlavor(slug);
  const image = line ? flavor?.images?.[line] : flavor?.images?.[flavor.lines[0]];
  if (image?.preview) return image.preview;
  const base = resolveBase(slug, line);
  return base ? previewImg(base) : "/media/higgsfield/categories/burley-v1.webp";
};

export const flavorCinematics: Partial<Record<string, string>> = {
  pera: "/media/higgsfield/cinematic/pera-cinematic-v1.mp4",
  cantalupo: "/media/higgsfield/cinematic/cantalupo-cinematic-v1.mp4",
  taste: "/media/higgsfield/cinematic/taste-cinematic-v1.mp4",
  truth: "/media/higgsfield/cinematic/truth-cinematic-v1.mp4",
  goodness: "/media/higgsfield/cinematic/goodness-cinematic-v1.mp4",
  beauty: "/media/higgsfield/cinematic/beauty-cinematic-v1.mp4",
  "wild-strawberry": "/media/higgsfield/cinematic/wild-strawberry-terror-cinematic-v1.mp4",
  limoncello: "/media/higgsfield/cinematic/limoncello-cinematic-v1.mp4",
  jenever: "/media/higgsfield/cinematic/jenever-cinematic-v1.mp4",
  kriek: "/media/higgsfield/cinematic/kriek-cinematic-v1.mp4",
  abricot: "/media/higgsfield/cinematic/abricot-cinematic-v1.mp4",
  virgin: "/media/higgsfield/cinematic/virgin-cinematic-v1.mp4",
  anejo: "/media/higgsfield/cinematic/anejo-cinematic-v1.mp4",
  "ruby-grapes": "/media/higgsfield/cinematic/ruby-grapes-cinematic-v1.mp4",
  cookies: "/media/higgsfield/cinematic/cookies-cinematic-v1.mp4",
};

export const getFlavorCinematic = (slug: string) => flavorCinematics[slug];
