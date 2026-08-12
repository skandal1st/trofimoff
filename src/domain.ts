export type LineId = "burley" | "terror" | "no-aroma" | "limited";

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
  scores: { sweetness: number; acidity: number; freshness: number; spice: number; tobacco: number };
  archetype: string;
};

export type Line = {
  id: LineId;
  name: string;
  number: string;
  description: string;
  accent: string;
};
