export type LineId = "burley" | "terror" | "no-aroma" | "cigarro" | "limited";

export type FlavorScores = {
  sweetness: number;
  acidity: number;
  freshness: number;
  spice: number;
  tobacco: number;
};

export type Flavor = {
  id: number;
  slug: string;
  name: string;
  displayName: string;
  lines: LineId[];
  profile: string;
  shortDescription: string;
  fullDescription: string;
  notes: string[];
  archetype: string;
  descriptions?: Partial<Record<LineId, string>>;
  shortDescriptions?: Partial<Record<LineId, string>>;
  notesByLine?: Partial<Record<LineId, string[]>>;
  archetypes?: Partial<Record<LineId, string>>;
  images?: Partial<Record<LineId, { hero: string; preview: string; master?: string }>>;
  scores?: FlavorScores;
  scoresByLine?: Partial<Record<LineId, FlavorScores>>;
};

export type Line = {
  id: LineId;
  name: string;
  number: string;
  description: string;
  accent: string;
};
