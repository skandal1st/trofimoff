import type { LineId } from "./domain";

const processed = (filename: string) => `/processed/${encodeURIComponent(filename)}`;
const product = (filename: string) => `/media/higgsfield/${filename}-hero-v1.png`;

export const logo = processed("logo.png");

export const flavorImages: Record<string, Partial<Record<LineId | "default", string>>> = {
  pera: { default: product("pera"), burley: product("pera") },
  cantalupo: { default: product("cantalupo"), burley: product("cantalupo") },
  taste: { default: product("taste"), limited: product("taste") },
  truth: { default: product("truth"), limited: product("truth") },
  goodness: { default: product("goodness"), limited: product("goodness") },
  beauty: { default: product("beauty"), limited: product("beauty") },
  limoncello: { default: product("limoncello"), "no-aroma": product("limoncello") },
  "wild-strawberry": { default: product("wild-strawberry-burley"), burley: product("wild-strawberry-burley"), terror: product("wild-strawberry-terror") },
  abricot: { default: product("abricot-burley"), burley: product("abricot-burley"), terror: product("abricot-terror") },
  jenever: { default: product("jenever"), "no-aroma": product("jenever") },
  kriek: { default: product("kriek-burley"), burley: product("kriek-burley"), terror: product("kriek-terror") },
  virgin: { default: product("virgin"), "no-aroma": product("virgin") },
  anejo: { default: product("anejo"), "no-aroma": product("anejo") },
  "ruby-grapes": { default: product("ruby-grapes"), burley: product("ruby-grapes") },
  cookies: { default: product("cookies"), burley: product("cookies") },
};

export const getFlavorImage = (slug: string, line?: LineId) =>
  (line ? flavorImages[slug]?.[line] : undefined) ?? flavorImages[slug]?.default ?? "";

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
