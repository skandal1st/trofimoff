import { catalogFlavors } from "./catalog.generated";
import type { Flavor, FlavorScores, Line, LineId } from "./domain";

export const lines: Line[] = [
  { id: "burley", name: "BURLEY", number: "01", description: "В основе табачный лист Burley средней или выше средней крепости. По желанию, можно сделать пониже, если поэкспериментировать со способами забивки и миксологией.", accent: "#d84a45" },
  { id: "terror", name: "TERROR", number: "02", description: "В основе табачный лист Burley запредельной крепости, дополнительно прошедший процесс ферментации cavendish. Насыщенная ароматика, стабильная крепость на протяжении всего курения.", accent: "#2a1112" },
  { id: "no-aroma", name: "NO AROMA", number: "03", description: "В основе табачный лист Burley глубокой ферментации на алкогольных варках. Крепкая, насыщенная, дымная. Для каждого раскрывается с разных сторон. Отлично дополняет ароматику!", accent: "#b99a62" },
  { id: "cigarro", name: "CIGARRO", number: "04", description: "Сигарная линейка на ферментированном Burley: от мягких карамельно-фруктовых профилей до плотных копчёных, древесных и кожаных оттенков.", accent: "#6d4a32" },
  { id: "limited", name: "LIMITED", number: "05", description: "Экспериментальные композиции со свободным арт-дирекшном.", accent: "#a42d3b" },
];

const limitedFlavors: Flavor[] = [
  { id: 57, slug: "taste", name: "Taste", displayName: "Вкус (Taste)", lines: ["limited"], profile: "Напиточный · тропический", shortDescription: "Фестивальный твист на «Фернандиту»: живая коктейльная композиция на базе Burley.", fullDescription: "Многогранная фестивальная композиция, созданная как вкус-воспоминание о JC2026 и вдохновлённая коктейлем «Фернандита».", notes: ["коктейльный профиль", "тропический характер", "фестивальная композиция"], scores: { sweetness: 3, acidity: 3, freshness: 3, spice: 2, tobacco: 2 }, archetype: "Drink / Limited", images: { limited: { hero: "/media/higgsfield/taste-hero-v1.webp", preview: "/media/higgsfield/taste-preview-v1.webp" } } },
  { id: 58, slug: "truth", name: "Truth", displayName: "Правда (Truth)", lines: ["limited"], profile: "Неароматика", shortDescription: "Честная, насыщенная неароматика на плотном Burley: объём и крепость без прикрас.", fullDescription: "Увесистый Burley, приготовленный так, чтобы сохранить первобытность табачного вкуса, его объём и насыщенность.", notes: ["Burley", "плотный табачный вкус", "насыщенность"], scores: { sweetness: 1, acidity: 1, freshness: 1, spice: 3, tobacco: 5 }, archetype: "Tobacco Raw", images: { limited: { hero: "/media/higgsfield/truth-hero-v1.webp", preview: "/media/higgsfield/truth-preview-v1.webp" } } },
  { id: 59, slug: "goodness", name: "Goodness", displayName: "Добро (Goodness)", lines: ["limited"], profile: "Неароматика", shortDescription: "Сбалансированная неароматика на итальянском Burley, вываренном на хересе Ореанда.", fullDescription: "Глубокий и спокойный профиль итальянского Burley с благородной выдержкой и многогранным хересным характером.", notes: ["итальянский Burley", "херес Ореанда", "выдержка", "глубина"], scores: { sweetness: 2, acidity: 1, freshness: 1, spice: 3, tobacco: 5 }, archetype: "Tobacco Alcohol", images: { limited: { hero: "/media/higgsfield/goodness-hero-v1.webp", preview: "/media/higgsfield/goodness-preview-v1.webp" } } },
  { id: 60, slug: "beauty", name: "Beauty", displayName: "Красота (Beauty)", lines: ["limited"], profile: "Неароматика", shortDescription: "Красный виноград, сухофрукты, медовуха, специи и шоколад поверх итальянского Burley.", fullDescription: "Многослойная композиция: красный виноград и сухофрукты переходят в медовуху, специи и шоколад на основе классического Burley.", notes: ["красный виноград", "сухофрукты", "медовуха", "специи", "шоколад"], scores: { sweetness: 4, acidity: 2, freshness: 1, spice: 4, tobacco: 5 }, archetype: "Tobacco Complex", images: { limited: { hero: "/media/higgsfield/beauty-hero-v1.webp", preview: "/media/higgsfield/beauty-preview-v1.webp" } } },
];

export const flavors: Flavor[] = [...catalogFlavors, ...limitedFlavors];
export const getFlavor = (slug: string) => flavors.find((flavor) => flavor.slug === slug);
export const getFlavorDescription = (flavor: Flavor, line?: LineId) => (line ? flavor.descriptions?.[line] : undefined) ?? flavor.fullDescription;
export const getFlavorShortDescription = (flavor: Flavor, line?: LineId) => (line ? flavor.shortDescriptions?.[line] : undefined) ?? flavor.shortDescription;
export const getFlavorNotes = (flavor: Flavor, line?: LineId) => (line ? flavor.notesByLine?.[line] : undefined) ?? flavor.notes;
export const getFlavorArchetype = (flavor: Flavor, line?: LineId) => (line ? flavor.archetypes?.[line] : undefined) ?? flavor.archetype;
export const getFlavorScores = (flavor: Flavor, line?: LineId): FlavorScores | undefined => (line ? flavor.scoresByLine?.[line] : undefined) ?? flavor.scores;
