export type LineId = "burley" | "terror" | "no-aroma" | "cigarro" | "limited";

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
  images?: Partial<Record<LineId, { hero: string; preview: string; master?: string }>>;
  scores?: { sweetness: number; acidity: number; freshness: number; spice: number; tobacco: number };
};

export type Line = {
  id: LineId;
  name: string;
  number: string;
  description: string;
  accent: string;
};
