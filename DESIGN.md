---
name: "Trofimoff's"
description: "A lacquered editorial flavor catalogue where product theatre becomes navigation."
colors:
  warm-paper: "#e8dcc6"
  warm-paper-light: "#f2eadb"
  lacquer-wine: "#4b0713"
  stage-wine: "#55101a"
  wine-deep: "#250508"
  black-ink: "#160b09"
  ink-hairline: "rgba(22, 11, 9, 0.26)"
  dusty-berry: "#ead7d4"
  cured-tobacco: "#b9a07a"
  botanical-khaki: "#d8d5b8"
  burnt-drink: "#a64b36"
  dessert-clay: "#9a7358"
  score-sand: "#d6c4a6"
typography:
  cinematic-statement:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(2.35rem, 3.8vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(6rem, 18vw, 18rem)"
    fontWeight: 400
    lineHeight: 0.72
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 0.82
    letterSpacing: "0.025em"
  title:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(0.9rem, 1.35vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 400
    letterSpacing: "0.18em"
rounded:
  square: "0"
  orbit: "50%"
spacing:
  compact: "1rem"
  control-x: "1.4rem"
  mobile-edge: "1.25rem"
  desktop-edge: "3.6vw"
  section-y: "clamp(4rem, 8vw, 9rem)"
components:
  search-trigger:
    backgroundColor: "transparent"
    textColor: "{colors.warm-paper-light}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 0 0.75rem"
  line-rail-item:
    backgroundColor: "transparent"
    textColor: "rgba(242, 234, 219, 0.42)"
    typography: "{typography.headline}"
    rounded: "{rounded.square}"
    padding: "0"
    width: "100%"
  line-rail-item-active:
    backgroundColor: "transparent"
    textColor: "{colors.warm-paper-light}"
    typography: "{typography.headline}"
    rounded: "{rounded.square}"
    padding: "0"
    width: "100%"
  flavor-row:
    backgroundColor: "transparent"
    textColor: "{colors.black-ink}"
    typography: "{typography.title}"
    rounded: "{rounded.square}"
    padding: "0"
    width: "100%"
  search-field:
    backgroundColor: "transparent"
    textColor: "{colors.lacquer-wine}"
    typography: "{typography.display}"
    rounded: "{rounded.square}"
    padding: "0"
    width: "100%"
  variant-tab:
    backgroundColor: "transparent"
    textColor: "rgba(242, 234, 219, 0.45)"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "1rem 1.4rem"
---

# Design System: Trofimoff's

## Overview

**Creative North Star: "The Lacquered Flavor Index"**

Trofimoff's behaves like an editorial product theatre bound into a working catalogue. Burgundy lacquer creates the immersive field; warm paper and black ink turn the assortment into a rigorous printed index. The product remains the protagonist, while the interface recedes into numbers, hairlines, labels, and monumental condensed words.

Navigation is part of the composition rather than a detached control layer. Full-bleed fields, square seams, cropped scale, and recognizable packshots create tension between physical product staging and archival order. The experience is dense in image and type but sparse in chrome; motion is controlled, tactile, and calm.

**Key Characteristics:**

- Burgundy lacquer, warm paper, off-white, and black ink.
- Monumental condensed display type paired with compact neutral utility copy.
- Product theatre used as navigation, not as a detached hero above a catalogue grid.
- Open full-bleed fields divided by one-pixel rules and hard square seams.
- Flavor-specific material colors that extend, but never replace, the core palette.

## Colors

The palette moves between lacquered burgundy rooms and warm paper indexes, with muted ingredient colors reserved for individual flavor experiences.

### Primary

- **Lacquer Wine:** The dominant immersive field for home and flavor heroes, navigation rails, selection color, and large closing transitions.
- **Stage Wine:** A slightly brighter product-stage ground that keeps the packshot legible inside the main lacquer field.
- **Wine Deep:** The darkest branded surface for long-form copy and low-light editorial passages.

### Secondary

- **Dusty Berry:** A pale red material field for berry experiences.
- **Cured Tobacco:** A dry tan field for tobacco-led experiences.
- **Botanical Khaki:** A muted botanical field for citrus and botanical experiences.
- **Burnt Drink:** A warm russet field for drink-led experiences.
- **Dessert Clay:** An earthy brown field for dessert experiences.
- **Score Sand:** A denser paper tone behind editorial characteristic scores.

### Neutral

- **Warm Paper:** The catalogue canvas, the lower edge of the product stage, and the default page background.
- **Warm Paper Light:** The luminous off-white for text on burgundy, loader surfaces, search, and the footer.
- **Black Ink:** Default text on paper and the basis of dark separators.
- **Ink Hairline:** The restrained rule color used to divide rows and sections without creating boxed containers.

### Named Rules

**The Lacquer-and-Paper Rule.** Every major surface belongs either to the immersive wine world or the archival paper world; flavor colors appear only as controlled material chapters.

**The One-Ink Rule.** On paper, black ink carries copy and structure; on lacquer, warm paper carries both. Do not introduce a separate UI-gray system.

## Typography

**Display Font:** Bebas Neue (with sans-serif fallback)  
**Cinematic Statement Font:** Oswald (with Arial Narrow and sans-serif fallbacks)  
**Body Font:** Manrope (with sans-serif fallback)

**Character:** Bebas Neue supplies narrow, monumental, poster-like compression; Manrope keeps labels and explanatory copy contemporary and quiet. The contrast lets product names become architecture while utility text remains precise.

### Hierarchy

- **Display** (regular, fluid monumental scale, very tight leading): Section titles, flavor heroes, oversized experience words, and next-flavor transitions.
- **Headline** (regular, fluid large scale, tight leading): Line-rail names and other large navigational declarations.
- **Title** (regular, fluid medium-large scale, compact leading): Flavor-row names, stage captions, and search-result names.
- **Body** (regular, fluid reading scale, open leading): Product descriptions and editorial copy; long expressive copy narrows to roughly 33 characters per line.
- **Label** (regular, compact size, wide tracking, predominantly uppercase): Search, profiles, indices, metadata, disclosures, and navigation utilities.

### Named Rules

**The Monument-and-Whisper Rule.** Display type is enormous and compressed; everything operational is small, widely tracked, and visually quiet. Avoid the anonymous middle scale.

**The Two-Face Rule.** Use Bebas Neue for display and named navigation, and Manrope for descriptive and utility copy. Oswald is the single scoped exception for cinematic flavor statements because it preserves the condensed voice across both Cyrillic and Latin glyphs.

## Layout

Desktop surfaces use a fluid edge inset of `3.6vw` and treat the viewport as the primary grid. The home hero is a full-height `58% / 42%` split between the product stage and the line rail; the flavor hero uses a `1.15fr / 0.85fr` editorial split with the packshot occupying the right-hand field. Indexes and content sections use asymmetric two-column grids rather than centered cards.

At `820px` and below, split stages stack into one column, horizontal insets become `1.25rem`, decorative thumbnails and secondary caption copy disappear, and packshots expand relative to the viewport. The home stage becomes `66svh` above the line rail; content grids collapse without changing their order. Sticky flavor experiences retain their full-viewport moment, and reduced motion removes prolonged scrolling and animation behavior.

Spacing is intentionally elastic: major sections use viewport-relative vertical padding, while controls and rows use compact rem-based rhythm. Rows are tall enough to read as editorial bands—roughly `72–148px` depending on surface and viewport—rather than conventional list items.

**The Open-Field Rule.** Use edges, rules, and scale to organize space. Do not put catalogue content into centered max-width cards or rounded shells.

## Elevation & Depth

The interface is flat by default. Depth comes from tonal field changes, full-bleed clipping, overlapping product photography, giant background words, and atmospheric radial falloff—not from elevated UI panels. Shadows are reserved for raster packshots so physical objects separate from their scene; controls, rows, and text surfaces remain unshadowed.

### Shadow Vocabulary

- **Hero Object:** A broad, dark drop shadow below the featured packshot establishes physical weight on lacquer.
- **Row Reveal:** A softer, lower drop shadow appears with the small packshot revealed on flavor-row hover or focus.
- **Next Object:** A broad neutral drop shadow supports the rotated packshot in the next-flavor transition.

### Named Rules

**The Object-Only Shadow Rule.** Shadows belong to products, never to interface containers.

**The Flat-by-Default Rule.** Resting controls and sections are separated by color, one-pixel rules, and composition; no card shadow is used.

## Shapes

The system is overwhelmingly rectilinear: sections meet edge to edge, controls have square corners, and one-pixel seams create a printed, architectural skeleton. Circular geometry is exceptional and semantic—the search loupe and the two fine orbits around the flavor packshot—not a general container treatment. Product images may overlap or rotate, but interface silhouettes stay hard-edged.

**The Square-Seam Rule.** Keep buttons, inputs, rows, overlays, and section boundaries square. Circles belong only to symbols and orbital product framing.

## Components

### Search Trigger

- **Character:** A quiet editorial utility, positioned directly on the lacquer field.
- **Shape:** Borderless and square, with a single underline and an outlined circular loupe.
- **Color:** Warm paper light on the hero; no filled background.
- **Hover / Focus:** Inherits the high-contrast text and uses the browser-visible focus behavior of the button surface; it never becomes a pill.

### Line Rail

- **Character:** Oversized navigation that doubles as the hero's primary composition.
- **Shape:** Full-width rectangular bands divided by one-pixel hairlines.
- **Default:** Monumental number and line name appear in translucent warm paper.
- **Hover / Focus / Active:** Text becomes fully luminous and shifts slightly right; the product thumbnail fades in behind the text. Focus and hover activate the same visual state.

### Flavor Rows

- **Character:** A rigorous printed index with cinematic product reveals.
- **Shape:** Full-width, square rows between ink hairlines; no container background.
- **Content:** Index, condensed flavor name, uppercase notes, directional arrow, and an initially hidden packshot.
- **Hover / Focus:** The name moves right and the packshot resolves from a small rotated scale. Keyboard focus adds a wine outline inside the row.

### Search Field

- **Character:** Search becomes a typographic takeover rather than a compact form control.
- **Shape:** Full-width, borderless, and square with one wine underline.
- **Typography:** Monumental uppercase Bebas Neue with a muted lacquer placeholder.
- **Focus:** The native outline is removed because the persistent underline and active typing context provide the field boundary; the close control remains independently focusable.

### Variant Tabs

- **Character:** Restrained line selectors embedded inside the flavor hero.
- **Shape:** Square, transparent tabs aligned on one shared underline.
- **Default / Active:** Inactive labels are translucent; the active label becomes warm paper and receives a two-pixel inset underline.

### Score Rows

- **Character:** Editorial data, not a dashboard widget.
- **Shape:** Open rows separated by hairlines, with a thin five-pixel track.
- **Color:** Translucent wine track with a solid wine fill; the large condensed score balances the compact tracked label.

### Next Flavor

- **Character:** A full-bleed navigational poster that closes one flavor story and opens the next.
- **Shape:** Large lacquer field with a monumental name and free-floating packshot.
- **Hover:** The packshot rises, straightens, and scales subtly while the field remains flat.

## Do's and Don'ts

### Do:

- **Do** let recognizable packshots dominate hero and transition moments.
- **Do** compose with full-bleed lacquer and paper fields, asymmetric grids, cropped display type, and one-pixel hairlines.
- **Do** pair pointer hover with an equivalent visible keyboard-focus response.
- **Do** preserve the stacked mobile hierarchy and complete reduced-motion fallback at the shipped `820px` breakpoint.
- **Do** use flavor-specific fields as bounded chapters within the core wine-and-paper world.

### Don't:

- **Don't** detach a conventional hero from a generic product-card grid.
- **Don't** introduce rounded cards, pill buttons, glass panels, decorative gradients, or dashboard chrome.
- **Don't** add shadows to interface containers; reserve depth effects for physical product imagery.
- **Don't** shrink the display system into a safe, uniform middle scale.
- **Don't** allow decorative imagery or motion to obscure product identity, navigation, or factual copy.
