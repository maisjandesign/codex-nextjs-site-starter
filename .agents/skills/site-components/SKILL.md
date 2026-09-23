---
name: site-components
description: Add or modify shared buttons, links, fields, cards and sections without introducing style drift.
---

# site-components

Use the bundled better-ui and better-writing skill(s) at the current stage under docs/SKILL-ROUTING.md. Project scope and the workflow resolve conflicting defaults.

Follow docs/WORKFLOW.md. Apply these design conventions while implementing the current phase; the full browser regression suite and cross-browser/multi-viewport matrix belong to stage 4, after the desktop is approved and the authorized mobile adaptation is complete. Desktop motion and interactive-state browser review is required earlier under docs/MOTION-DEFAULTS.md; focused automated reproduction is allowed. Do not delay the first desktop preview for a complete audit or catalog. Finish the relevant design-system examples alongside the polished desktop before acceptance.

Read docs/DOCUMENTATION-TEMPLATE.md when creating components. Add typed CSF stories in stories/ alongside each implementation, importing the real component. Use native Storybook hierarchy, Autodocs, named supported states, Controls, and fn() event callbacks. Demonstrate real hover/focus and required motion. Preserve the native light manager and scoped project CSS; do not build DocsShell or duplicate component styles. Controls are temporary prop previews, not a source token editor.

Inspect existing src/components and any relevant catalog example before creating a primitive; a complete catalog is not a prerequisite to implementing the desktop draft. Extend the existing component through typed semantic props. Button is for actions; ButtonLink is for navigation. No cloned native buttons in page files, local button CSS or inline style overrides.

Represent default, hover, focus-visible, active, disabled and loading as appropriate. Keep the accessible label in loading; block duplicate submissions, preserve target size and prevent layout jumps. Disabled is not a substitute for validation guidance. Fields need labels, associated errors, and useful name/type/autocomplete.

New variants need a real example in the catalog and updates to size/color/geometry tests. Avoid accepting arbitrary className/style escape hatches on core controls. Build shared navigation/menu primitives for repeated roles; reuse their actual implementations in the catalog. Identical roles share classes and behavior, while semantic variants remain distinct. Composite components can use shared layout wrappers. Token editor root-variable preview is the narrow centralized exception to local style overrides described in docs/DESIGN-SYSTEM.md. Keep one icon family, currentColor, integer icon geometry and accessible names for icon-only controls.

For buttons/button-links, implement the expressive shared GSAP hover from docs/MOTION-DEFAULTS.md. Keep the hit area and focus ring outside animated inner layers; do not let an entrance timeline also own those hover properties.
