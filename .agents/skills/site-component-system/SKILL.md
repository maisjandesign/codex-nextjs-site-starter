---
name: site-component-system
description: Maintain shared 8px typography/layout tokens and a separate Storybook of production Next.js components, with component coverage, responsive states, builds and visual fidelity checks.
---

# A single component system

The website and Storybook import the same components and `src/app/globals.css`, which imports `src/styles/tokens.css`. Do not duplicate JSX or CSS to make a story match. Extract reusable sections before documenting them. Every exported UI component in `src/components/` needs a meaningful story.

## Typography and grid

Pick the source family/weights first; normalize sizes to the grid second. There is one H1/H2/H3/H4 definition for each responsive range. Change only shared role tokens to resize headings. Avoid component selectors overriding `font-size`, inline `fontSize`, arbitrary utility sizes, fluid `clamp`/`vw` typography or letter-spacing nudges. If two source headings of the same level differ, reconcile them globally and record why.

Use `--space-*` for spacing. Author sizes and line heights as integer multiples of 8px. Text remains at least 16px. Responsive media queries switch shared tokens as a group. Intrinsic ratios and percentage layout widths can yield subpixels in the browser; that is not an authored fractional design token. Source SVG geometry is not rounded. Hairline/focus technical exceptions are in `AGENTS.md`.

## Storybook coverage

- Foundations: actual font family/weights, H1–H4, paragraphs, labels, colors, full spacing scale, icons, brand marks, all used raster/SVG graphics.
- Components: buttons, links, form controls, navigation, cards and any additional reusable UI. Include supported variants, disabled/loading/error/empty states when the component supports them, and long content.
- Sections: real hero, content sections, footer and responsive compositions as the new site is built. Do not leave them documented only by full-page screenshots.
- Motion: block/line/media reveals, hover/keyboard focus, a scrollable example. Use actual gestures for hover/focus; do not fabricate states by passing unsupported props.
- Components that fetch data should have presentational components with serializable story fixtures. Don't turn server pages client-side just to accommodate Storybook.

Run the coverage check after additions. It checks imports of exported components, not that a story is visually meaningful; review quality yourself. Asset inventory is `design/assets.json`, and the Graphics story must be updated with new assets.

## Completion gate

1. `npm run check`: types, lint, grid and story import coverage. Fix failures; don't weaken rules to silence them.
2. `npm run build` and `npm run build-storybook`: both must pass. Storybook is a separate app/output, not `/system` (the demo page is just a sample).
3. Browser comparisons at reference width and responsive widths, including 320px reflow. Check all sections, missing fonts/assets, repeated heading metrics, no horizontal overflow, and image aspect ratios.
4. Pointer/keyboard navigation, visible focus, useful link targets, forms if present, reduced-motion, touch behavior and route cleanup. Test several actual Storybook stories, not only its sidebar.
5. Save a short `verification/report.md` listing actual viewport/state, screenshot paths, commands, mismatches fixed and known limits. No invented Lighthouse/accessibility/performance scores. If no browser is available, mark visual QA unverified.

Read browser tooling instructions before automation. Use only the active supported surface. Do not claim screenshot-to-reference accuracy unless a reference was provided and compared.
