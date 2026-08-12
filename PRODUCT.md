# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite, React, TypeScript. Local typed content repository for the MVP; no CMS or backend. The architecture must allow a later CMS adapter without changing presentation components.

## Users

Primary visitors are adult customers and trade partners exploring the Trofimoff’s assortment. A second audience is the manufacturer evaluating the project as a transferable standalone brand platform.

## Product Purpose

An interactive promotional catalogue for Trofimoff’s. It presents product lines and flavors through premium editorial storytelling rather than consumer ecommerce, and demonstrates a commercially credible digital brand experience.

## Positioning

The catalogue combines a structured, searchable flavor system with reusable cinematic visual archetypes. Each flavor feels distinct while remaining maintainable through one data-driven frontend engine.

## Operating Context

Visitors browse lines, search by flavor name, notes or category, open a flavor experience, compare available line variants and may follow an optional external B2B link. There is no cart, checkout or payment flow.

## Capabilities and Constraints

- MVP covers the supplied 15-flavor reference dataset, not all 79 SKUs.
- Routes include the catalogue and `/flavors/:slug` experiences.
- Content is local and typed for MVP; edits require a rebuild and deployment.
- External B2B links are configurable and can be disabled globally.
- Strength must not be invented when the source data does not provide it.
- Editorial characteristic scores, archetypes and cinematic concepts are interpretations, not official manufacturer claims.
- Mobile and reduced-motion fallbacks are required.
- WebGL/Three.js is permitted only when simpler rendering cannot achieve the approved effect.

## Brand Commitments

- Use the supplied Trofimoff’s logo as the source of truth and preserve its proportions.
- Core palette: warm beige, deep burgundy, off-white and black; flavor-specific accents may extend it.
- The experience must feel premium, editorial and image-led, closer to fashion, fragrance or spirits art direction than SaaS or ecommerce.
- Avoid generic cards, dashboard styling, glassmorphism, decorative gradients, ubiquitous rounded containers and conventional landing-page section formulas.
- Motion is controlled, tactile and calm rather than flashy.

## Evidence on Hand

- `promt.md`: product, experience, architecture and quality brief.
- `trofimoffs_cms_15_flavors.xlsx`: 15 reference flavors, descriptions, notes, editorial characteristics, archetypes, cinematic concepts and proposed schema.
- `images/`: supplied logo and product/line packshots. These are source product visuals, not finished cinematic assets.
- No verified testimonials, sales claims, prices, public B2B URLs or complete strength data are supplied and none may be fabricated.

## Product Principles

1. Art direction leads; interface chrome recedes.
2. One data-driven system creates many distinctive flavor experiences.
3. Product identity and factual accuracy survive every visual transformation.
4. Cinematic ambition scales down gracefully for mobile, reduced motion and constrained devices.
5. The project remains independent, portable and free of hardcoded commerce dependencies.

## Accessibility & Inclusion

Keyboard navigation, visible focus states, semantic content, sufficient contrast and a complete `prefers-reduced-motion` experience are required. Tobacco-related age gates and statutory warnings remain an open deployment decision dependent on target market.
