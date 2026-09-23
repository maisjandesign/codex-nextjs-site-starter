# Website brief

Capture the essentials from the user's request, then start the desktop draft. Do not turn completion of this brief into a lengthy prerequisite. Record assumptions and update the phase record as work progresses.

- Name and product:
- Audience and its main task:
- Website goal and primary action:
- Pages and user flows:
- Available copy and languages:
- Supplied screenshot/mockup references, section inventory/order, page mapping, and capture widths:
- Reference policy: preserve supplied designs; normalize isolated inconsistencies through shared tokens/components
- Uncertain intent/measurements and preserved composition:
- Structural suggestions (not authorized by default):
- Explicitly requested/approved structural changes, scope, and user evidence:
- Explicitly locked content, flows, brand/assets/theme, and layout elements:
- Source mode: structured Figma / flat image / mixed / unverified access:
- Inspected Figma file/frame/node or supplied reference identity:
- Evidence: meaningful structure, Auto Layout, spacing, components, original image fills, vectors, flattened regions:
- Mixed-region map: section -> reliable layout evidence -> original export / generated imagery -> reason:
- Confirmed Figma measurements versus inferred screenshot values:
- Missing layer access or exports and the working fallback:
- Figma / approved assets:
- Reference theme and any explicitly requested additional themes:
- Missing or inferred fonts/assets:
- Normalized inconsistencies, reference values chosen, and shared rules applied for desktop review:
- Intentional role differences preserved:
- Reference passport (5-6 sentences; observed values versus estimates):
- Project token baseline file and when it was established:
- Annotated corrections: mark -> route/component/token -> repeated instances -> observed result:
- Character: editorial, technical, calm, expressive, or another direction:
- Fonts and file licenses:
- Content and integration constraints:
- Devices and browsers:
- SEO and indexing requirements:
- Already approved decisions:
- Codex assumptions:

Do not present invented testimonials, metrics, client logos, or benefits as verified facts. Empty fields are acceptable in the working brief; unfinished placeholders must not accidentally appear on published pages.

## Motion and image plan

- Motion direction and actual inspected demo URLs:
- Header entrance: component/trigger, implemented status, observed normal/slow result:
- Hero headline/copy/actions/visual sequence: implementation and observed load result:
- Shared GSAP button/button-link hover/focus beyond color, exit reversal, press, disabled/loading: implementation and observed result:
- Existing tabs: shared GSAP hover/focus, selected indicator, interruption and keyboard/activation behavior; implementation and observed result (not applicable if absent):
- Major section coverage: section name, heading/content/media effect, scroll-entry/back observation:
- Required motion exceptions: explicit user instruction or applicable reduced-motion state; never assume an exception from a static screenshot:
- Motion map: surface (hero / section / control / carousel if present), effect, purpose, engine, trigger, token roles, interruption behavior, fallback, implementation status:
- Desktop motion review: route/specimen, browser/viewport, action sequence, observed result, passed / failed / not run / not applicable (reason):
- Motion defects, affected states rechecked, and remaining unverified scenarios:
- Catalog specimens use actual site effects and replay:
- Needed original exports and generated assets, source mode, target aspect ratios/display sizes:
- Asset origin, node/reference, export method or generation prompt, actual dimensions/SVG viewBox and saved files: docs/ASSET-INVENTORY.json
- Pending exports/generation or unavailable references:

## Skill use record

Check docs/SKILL-ROUTING.md at startup. Availability is not evidence of use.

- Eleven requested entrypoints: pending verification in this project
- Skills actually loaded, source paths, stage, and purpose:
- Deferred / not-applicable skills and reason:
- Missing optional dependencies or references:
- Project-rule conflicts resolved and selected shared tokens:
- better-interface quick: pending desktop implementation
- better-interface full: deferred until final QA

## Delivery phase record

Reset this section for each new website; historical demo checks are not approval of a new design. Follow docs/WORKFLOW.md and record actual user instructions, not inferred consent.

- Current phase: desktop draft
- Desktop preview URL / reference width:
- Desktop animations and interaction states implemented: pending
- Required desktop browser motion review: pending (implementation/build alone cannot mark this complete)
- Shared typography/components/spacing: pending
- Documentation template version: 2 (native Storybook 10.6.0 included; populate project inventory)
- Documentation navigation/search and style isolation: pending
- Design-system catalog: pending
- Local token editor and spacing inspector: implemented; project baseline, roles, and review evidence pending
- Editor preview/save/reload demonstration: pending
- Outstanding desktop changes:
- Desktop approval: pending
- Desktop approval evidence (user message / date / accepted version):
- Mobile decision: pending (authorized / deferred / pending)
- Mobile authorization evidence:
- Mobile readiness: not started
- Outstanding mobile changes:
- Browser QA: deferred until approved desktop and authorized mobile are ready
- Explicit exceptions requested by the user:

## Motion direction record

- Chosen character and fit to the brief (editorial / portfolio / experimental / custom):
- Exact inspected Osmo/Codrops/other demo URLs and selected mechanics:
- Six official GSAP entrypoints: pending verification
- GSAP skills actually loaded and purpose:
- ScrollSmoother owner, token and route/anchor behavior (required):
- Masked heading/content/media variants and role coverage (required):
- Reduced-motion/native-touch fallbacks and visible-content exceptions:
- Observed smoothing/mask scenarios and outstanding checks:
- Property ownership and optional WebGL decision:
- Motion studio source save/reload result:
- Full color/size editor readiness (separate from motion editor):
- Project Storybook inventory, Controls, Docs, and motion review readiness:

### Sequence coverage

Record the owner, order and observed states for the opening, each section and link/button interactions using MOTION-SEQUENCES.md. No first-screen parallax by default. For long sections, give meaningful distant content groups their own nested sequence rather than revealing an entire long page at once.
