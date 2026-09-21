---
name: site-tokens
description: Maintain integer design tokens, generated CSS and a live design-system editor with validated preview and source persistence.
---

# site-tokens

Use the bundled better-colors skill(s) at the current stage under docs/SKILL-ROUTING.md. Project scope and the workflow resolve conflicting defaults.

Follow docs/WORKFLOW.md and read docs/DESIGN-SYSTEM.md. Use src/design/tokens.json as the authoring source; generated CSS and catalog are derived. Build only what the early preview needs, then complete the synchronized catalog and editor before desktop acceptance, not during final QA.

Follow docs/DOCUMENTATION-TEMPLATE.md: Storybook owns its light documentation chrome; project token CSS is consumed by the actual specimens. Update Foundations stories when token groups change. Storybook Controls edit args only. Persistent token edits use the existing JSON/generator pipeline; cross-application draft synchronization requires explicit implementation. Do not create a second set of project tokens inside stories.

Reuse names by meaning, not equal numeric values. Use foundational, semantic, and component roles so edits affect the intended instances. A component background edit must not unexpectedly recolor the whole brand. Extend schema/generator support when introducing aliases or groups.

Dimensions, spacing, radii, borders, breakpoints, and millisecond durations are integers. Unitless line-height, opacity, easing, and scale may be fractional. Use the spacing scale for layout. Generated rem math supports text resizing; do not round browser geometry caused by zoom or responsive grids.

Run npm run tokens after source changes. Implement the editor's shared root preview, validation, save, cancel/reset, and source persistence according to the contract. Catalog values and rendered pages must share draft state. LocalStorage alone is not a source save; do not report Save success if CSS regeneration fails. Keep the fixed-path development write mechanism unavailable in production.

Preserve reference colors and theme. Report contrast conflicts without automatic recoloring or dimming. Expose desktop/shared values first; add explicitly scoped responsive overrides only after mobile authorization.

Manually demonstrate editing and persistence during desktop review. Run full audits and automated editor/browser scenarios in stage 4. The included test:tokens checks validation, source conflicts and rollback; focused browser evidence is still required for each project. Fix audit failures at their source, not by editing generated CSS or excluding whole files.

Use the implemented DesignProvider and /api/tokens allowlist under docs/DESIGN-TOOLS.md. Keep tokens.baseline.json as an explicit project baseline, separate from ordinary saves. Extend fields and validation together when adding roles. Preserve last-valid preview on invalid input and show source conflicts rather than overwriting newer values.
