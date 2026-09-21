# Design system contract

## When to apply this contract

Follow docs/WORKFLOW.md: show the desktop draft first, complete user revisions, obtain desktop approval and mobile authorization, finish adaptation, then run browser QA. Use shared tokens and components from the start. Build the catalog alongside the site and complete it, including the live token editor, before presenting desktop for acceptance. It is not a prerequisite for the first rough preview. The mobile tables below describe the finished system, not permission to build mobile early.

## Documentation presentation

Use real Storybook under [DOCUMENTATION-TEMPLATE.md](DOCUMENTATION-TEMPLATE.md). Keep its native hierarchy, Docs, Canvas, Controls, and light chrome stable across projects. Stories import actual components and source tokens; project styles are scoped to specimens. The canonical component catalog is implemented in Storybook; /design-system is a supporting Next.js token lab.

## Source of truth

`src/design/tokens.json` → `npm run tokens` → `src/styles/tokens.css`. The bundled `/design-system` catalog imports the same JSON; its motion editor also reads shared session state. The Next.js token lab and pages share the editor draft. Storybook is a separate application: it reflects saved/regenerated tokens after rebuild/reload, while transient lab drafts require an explicitly implemented bridge. Its Controls change props only. CSS is derived output, not a second source of values.

Layers: foundational values (space, font, color) → semantic roles (layout, theme) → components. This compact version does not use JSON token references; the generator defines types and allowed units. This is an internal format, not a claimed DTCG-compatible format.

## Integer values

All authored dimensions are integer px values in JSON. The spacing scale uses a 4 px step; 1/2 px borders, 14/18 px text, and other intentional integer sizes do not have to be multiples of four. Layout values must come from the spacing scale. A line-height of 1.5, opacity of 0.5, scale of 0.98, and cubic-bezier coordinates are unitless coefficients.

CSS uses `calc(40 * 1rem / 16)` to preserve text scaling. At a 16 px root size, font and token dimensions resolve to integer px values. System font scaling, zoom, fr grids, and device pixel ratios may produce fractional coordinates. Do not round every DOMRect: that can break responsive behavior. Browser geometry comparisons use a tolerance below 1 CSS px.

## Typography

| Role | Mobile <768 | Tablet 768–1023 | Desktop ≥1024 |
| ---- | ----------- | --------------- | ------------- |
| H1   | 40          | 48              | 64            |
| H2   | 32          | 36              | 48            |
| H3   | 24          | 28              | 32            |
| H4   | 20          | 24              | 24            |
| H5   | 18          | 20              | 20            |
| H6   | 16          | 18              | 18            |

This initial scale can be adapted to the brief. Compare sizes at the same viewport and text scale. Body is 16, small 14, label 12, and lead 20. Use one real H1 per page; Storybook typography specimens use their isolated preview scope, separate from the Docs heading. Review the actual page heading outline in the Next.js application. Each text size has a role, and each heading level has a shared style.

## Spacing

| Role            | Mobile | Tablet | Desktop |
| --------------- | ------ | ------ | ------- |
| page-gutter     | 16     | 24     | 32      |
| section-padding | 48     | 48     | 64      |
| heading-gap     | 12     | 12     | 12      |
| content-gap     | 32     | 32     | 32      |
| card-padding    | 24     | 24     | 24      |
| hero-padding    | 64     | 64     | 96      |

The centered container is at most 1200 px wide. On wide screens, the actual distance from the viewport edge is greater than the minimum gutter. Standard section headings share a left edge. The section-to-heading-group inset equals section-padding, the group uses heading-gap internally, and the group-to-content distance equals content-gap. Descriptions may wrap: consistency applies to spacing, not the absolute vertical position of the next block.

Use `Section` with kicker, title, description, and children. Hero has a separate role and intentionally different spacing. Introduce new section types for meaningful content needs, not to justify arbitrary local adjustments. Comparing padding alone is insufficient: tests also measure DOMRect geometry and heading alignment.

## Components and motion

Button supports primary / secondary / ghost and default / small. Minimum heights are 48 / 44; enlarged text may increase the actual height. Radius and padding are shared. ButtonLink uses the same CSS while preserving link semantics. Loading retains the label and accessible name while preventing duplicate activation.

Motion uses the current values in src/design/tokens.json. Shared GSAP button fill and label roll, coordinated opening/section sequences, and reduced-motion fallbacks are implemented. Color-only hover does not satisfy the motion contract. Visible feedback must not depend on animation alone.

## Adding a token

1. Look for an existing role with the right meaning.
2. If none exists, add a named token and explain its intended use.
3. Update the schema/generator, catalog, and tests when adding a group.
4. Regenerate CSS for the current preview. Run the full audit and inspect all approved themes across all routes during final QA, after desktop and mobile are ready.
5. For a new spacing role, add a dedicated geometry comparison group instead of excluding all sections from verification.

## Reference interpretation and theme policy

Derive the desktop scale, palette, typography, and component roles from the supplied design; the tables above describe demo defaults, not a universal look. Preserve composition, hierarchy, section inventory/order, grid, image placement, visual character, and user flows. Normalize isolated inconsistencies through shared tokens and components while preserving intentional role differences. Structural changes require an explicit user request or approval. Record normalized values, shared rules, and inferred fonts/assets before desktop review. The native Storybook documentation remains governed by DOCUMENTATION-TEMPLATE.md. Use shared navigation/menu roles and controlled component variants instead of duplicating markup and CSS per page.

Use the approved reference theme on first render and after hydration. Do not derive a new site's theme from the OS or a saved demo preference. Additional themes require project scope; no global dimming, brightness filter, or decorative overlay is an accessibility remedy. Keep keyboard support, semantics, focus, and reduced motion. Report contrast conflicts and suggest a targeted correction before materially altering reference colors.

## Live token editor: required desktop deliverable

Implementation status: motion controls support validated preview and local source persistence. The local token editor is implemented for registered desktop/shared roles under [DESIGN-TOOLS.md](DESIGN-TOOLS.md). Extend the allowlist for additional project roles.

Provide an Edit mode on /design-system for the actual site's semantic colors, button sizes, typography, spacing, radii, and motion. Show real component variants and states; reuse site components rather than reproducing their appearance in a separate demo. Group controls by meaning and show units, current values, and affected roles. A button-background edit should affect that button role; changing a global brand token may intentionally affect more components. Add explicit semantic aliases if needed, with generator/schema support; do not infer relationships from equal current values.

Use one shared token state at the application root. Draft edits update validated root CSS custom properties and catalog labels immediately, so navigating between preview and catalog retains the same draft and every project component using the token responds. Storybook chrome remains unchanged by project edits; separate application drafts require an explicit bridge to synchronize. Keep values out of page-local inline styles. Cross-tab live synchronization is optional and must be implemented explicitly if offered.

Provide these actions:

- Preview: validate proposed values and update every dependent instance without persisting invalid input. Show field errors; preserve the last valid preview.
- Save: persist validated tokens to src/design/tokens.json and regenerate src/styles/tokens.css. Keep the JSON/CSS pair consistent; report success only after both operations succeed. On failure retain a recoverable draft and explain the error. Never rely on localStorage as source persistence.
- Cancel: discard unsaved edits and restore the last saved values.
- Reset: restore the documented project baseline into the draft; apply the normal Save action to persist that change. Make the reset scope clear and retain the last saved version for recovery.

Choose a local development save implementation with a fixed token path, validated schema, same-origin checks, and no arbitrary filesystem writes. Disable the write endpoint outside local development and exclude editor controls from the public site by default. If the environment cannot save files, provide validated JSON export/import and explain that export alone has not updated the source: applying it and regenerating CSS are required. Record any user-approved limitation in the brief instead of marking a read-only preview as a complete editor.

Require integer source dimensions and durations, valid colors, valid ranges, and known token names. Layout values must use the spacing scale; extend the scale intentionally rather than silently rounding user input. Unitless line-height, opacity, easing, and scale may be fractional. Preview may flag contrast issues but must not automatically recolor or dim the site.

During desktop work, expose desktop/shared values. Add explicit mobile/tablet overrides only after adaptation is authorized, and identify whether a control changes shared values or one viewport range. Protect accepted desktop values from accidental mobile edits.

During desktop review, manually demonstrate a color edit and a button-size edit affecting real site instances, saving, reloading, and cancellation/reset. This is required desktop preview inspection; focused interaction reproduction is allowed, while full automated browser regression coverage waits for stage 4. Final QA must verify propagation, invalid input, failed saves, persisted source/regenerated CSS after reload/build, and exclusion of the write endpoint from production. Existing browser tests do not cover this new editor until those scenarios are added.

## Implemented GSAP baseline

The September 12 revision installs GSAP and @gsap/react and adds MotionReveal (rise, child stagger, and directional mask) plus MotionShowcase with replay. The homepage uses GSAP staging and the catalog includes motion specimens. Generated variables include motion.stagger, motion.distance, and motion.library-ease. See MOTION-LIBRARIES.md for ownership, token replay, and project-specific effect selection. The September 13 studio adds editable motion values and source saving; the September 18 Design tools panel adds registered color/size/typography and spacing editing.

The motion-specific editor is now implemented under MOTION-STUDIO.md, including local source saving. Real Storybook is included; registered color/size editing is included in the local Design tools panel. Do not count motion-only controls as completion of the full editor contract.
