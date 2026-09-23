# Reference-led desktop delivery workflow

Motion policy: **GSAP ScrollSmoother + element masks + expressive GSAP button hovers**. Follow [MOTION-DEFAULTS.md](MOTION-DEFAULTS.md) as the single motion contract.

This sequence governs new sites built from this Next.js starter. The user's current instructions take precedence. Start rendering promptly; the first preview and the completed desktop milestone are different deliverables.

## Code orientation at startup

For coding tasks, follow [GRAFT.md](GRAFT.md): build/map the current checkout after dependency installation, use targeted symbol/caller queries before shared changes, verify actual source and check freshness afterward. This supports the current phase and never substitutes for design-source inspection or desktop motion review. Documentation-only work can skip it; unavailable Graft falls back to source inspection and rg.

## 1. Implement the supplied desktop design

Read docs/DESIGN-SOURCE.md, docs/BRIEF.md and docs/SKILL-ROUTING.md. First inspect the actual supplied selection and classify structured Figma, flat image or mixed regions; record evidence and access gaps. Verify the eleven project-local skill entrypoints, load the initial six Better domain skills, apply design-taste-frontend where the page type fits, and plan required motion with animate. Use animation-vocabulary and apple-design for their relevant naming/interaction tasks. Then use the supplied Figma frame or screenshot width, or 1440 px when unknown. Identify the composition, hierarchy, colors, typography, assets, and repeated patterns. Inventory asset slots and export original Figma images/SVG assets or generate imagery for flat regions under docs/IMAGE-ASSETS.md while laying out desktop. Treat screenshots and mockups as the design to implement. Derive measurements and repeated roles from the references; record uncertainty and preserve composition when intent is unclear. Record any explicitly requested or approved structural changes in docs/BRIEF.md. Source production imagery under the asset policy while preserving its placement and layout role. Implement the three GSAP defaults under docs/MOTION-DEFAULTS.md; research extra effects only for a distinct project need. Record missing assets or uncertain measurements as assumptions; do not invent precise matches where evidence is missing.

Follow the supplied-design implementation rules in AGENTS.md. Preserve section inventory/order, content hierarchy, layout, grid, alignment, image placement, visual character, palette, and user flows. Normalize only isolated inconsistencies through shared semantic tokens and components, preserving intentional role differences. When intent is uncertain, keep the supplied composition. Structural suggestions stay separate and require an explicit user request or approval before implementation. Before desktop review, record the normalized inconsistencies and shared rules applied. Once desktop is accepted, preserve that baseline during mobile adaptation and QA unless the user requests a redesign; a new image alone does not reset approval.

For example, equivalent cards with slightly different padding can share the value most consistent with surrounding references. Keep their grid, order, content, and image placement. A deliberately larger hero headline or distinct full-width section retains its own role. Suggest a different hero composition separately; implement it only when explicitly requested or approved.

Show a meaningful working desktop preview early, even if rough. Start npm run storybook alongside npm run dev. Build actual pages, shared component stories, and the /design-system token lab together. Storybook uses the native hierarchy and Docs/Canvas/Controls under docs/DOCUMENTATION-TEMPLATE.md; its specimens import real site components and tokens. Its appearance is stable across projects and isolated from project token edits. The catalog must not delay the first preview, but the completed desktop milestone includes the synchronized catalog and live token editor described in docs/DESIGN-SYSTEM.md. Do not postpone either to final QA.

Include polished hover, focus-visible, active, disabled, and loading feedback where applicable. Add shared, restrained block entrance animations as part of desktop implementation, with reduced-motion and no-JavaScript fallbacks. Implement and inspect motion with each section and shared control. Motion is part of the desktop result, not a finishing task after mobile. Do not wait for separate reminders about generated images, entrances, or hover states.

Use the eleven bundled skills through docs/SKILL-ROUTING.md, not as a list of optional future installations. Keep their work scoped to the current stage and follow that document to resolve conflicting defaults. Retain the reference theme: no automatic dark-mode switching, page dimming, or invented alternate palette. Accessibility work preserves semantics and usability without silently recoloring the reference.

## 2. Complete and review the desktop with the user

Apply desktop revisions until the user explicitly accepts the result. Before presenting the desktop as complete, ensure:

- All requested desktop pages, sections, assets, and interactions are implemented, with known requested changes resolved.
- Typography, repeated section/block spacing, buttons, navigation, and component variants use shared roles and integer source dimensions.
- Source classification and per-region evidence are recorded. Original Figma assets are exported where available; flat reference imagery is generated. All assets are inspected, optimized and recorded with origin and actual dimensions/SVG viewBox; final pages do not use flattened UI crops as photos.
- ScrollSmoother, element masks and expressive shared button hovers follow MOTION-DEFAULTS.md and are demonstrated on the site and in appropriate catalog specimens.
- The required desktop motion review in docs/MOTION-DEFAULTS.md is complete: page load, scrolling down/back, repeated hover, interruption, applicable control states, reduced motion, and actual catalog replay were observed in a browser. Defects are fixed and affected interactions rechecked; no initialization flicker, disappearing visible content, or competing property animations remain in the checked states.
- Storybook contains the current project inventory with native hierarchy, Docs, state stories, working search/deep links, Controls, event callbacks, and motion replay. Specimens import actual site components. The Next.js /design-system token lab provides editable project tokens and source persistence; Storybook args are not saved tokens and separate app drafts are not automatically synchronized. Project CSS leaves native documentation chrome unchanged.
- The reference theme is preserved and the brief records normalized inconsistencies, shared rules, any approved structural changes, and remaining limitations.

Before presenting the desktop as complete, explicitly run better-interface in quick mode across the implemented desktop and documentation surfaces, using its six domain skills with source/ordinary preview evidence. Resolve in-scope findings and record deferred coverage; this review is not user approval. The full browser suite/matrix and mobile remain deferred; focused desktop interaction checks are part of implementation.

Early previews remain welcome, but motion must also be watched over time before a completed desktop handoff; a screenshot is insufficient. Follow the required desktop motion review in docs/MOTION-DEFAULTS.md and record actual scenarios/results in docs/BRIEF.md. Fix rendering, interaction, and motion defects immediately and recheck affected states. Focused browser automation is allowed to reproduce an interaction or regression. The full regression suite and cross-browser/multi-viewport matrix belong to stage 4. If a required motion check cannot be performed, show the draft with its limitation and keep readiness pending; do not present unverified motion as complete.

Partial praise, silence, elapsed time, a successful build, and passing tests are not desktop approval. Record the user's approval and accepted version in docs/BRIEF.md. Keep it as the baseline for adaptation. Do not silently mark the desktop complete with an unfinished editor; report the gap or record the user's explicit scope exception.

## 3. Ask about mobile, then adapt if authorized

After desktop approval, ask: “Would you like me to create the mobile adaptation now?” Wait for the answer before starting mobile or tablet adaptation. If the user has already explicitly authorized this exact next step, continue without asking again. A generic request to build a site is not that authorization.

- If yes: adapt the approved design for mobile, tablet, and intermediate widths. Preserve desktop appearance. Show the mobile result and apply requested changes. Mark it ready once implemented with known requested changes complete; no additional mandatory approval ceremony is needed.
- If no or later: deliver the accepted desktop and mark mobile and combined browser QA as deferred. The required desktop motion review still applies. Run an additional full desktop-only QA pass only if the user explicitly requests it.
- If unanswered: keep the decision pending; do not infer consent.

Shared desktop tokens remain the default. Add scoped responsive overrides only during authorized adaptation, including to the editor. Existing responsive demo CSS is an example, not permission to adapt a new design early. CSS declaration order does not change this delivery sequence.

## 4. Run browser QA after both layouts are ready

Entry conditions: desktop approval, mobile authorization, and both layouts ready with known requested changes complete. Recheck catalog synchronization, register routes and states, and explicitly use better-interface in full mode to consolidate the relevant domain reviews and final quality checks without another permission gate.

Run npm run check and npm run test:browsers. Verify typography, actual repeated spacing, components, editor preview/save/reset behavior, reflow, accessibility, and motion. Test Chromium, Firefox, and WebKit at the matrix widths and breakpoint boundaries in tests/site.config.ts. Test only themes included in the project scope; the demo's two-theme matrix is not a requirement to invent a dark theme. Update its theme configuration and meaningful assertions to match the actual scope. See docs/QA-CHECKLIST.md.

Fix confirmed defects and rerun affected checks. Preserve the accepted design. If a necessary fix materially changes the approved composition, explain the conflict and return that design decision to the user. Later user-requested design changes require the relevant QA to be repeated.

## Checks allowed before final QA

Use npm run dev for preview and npm run tokens after source token changes. Formatting and targeted compile/type checks may keep the draft runnable. Token editor input validation runs on every edit/save; it is product behavior, not a premature browser audit. Do not require a perfectly clean audit before showing the first preview.

Before stage 4, perform the required motion/interaction review in an available desktop browser. Focused automated reproduction of an in-scope interaction is permitted and does not require mobile approval. Do not run the full npm run check, npm run test:e2e, npm run test:browsers, Playwright/axe suites, or automated multi-viewport audits unless explicitly requested by the user. Do not make installing the full test-browser matrix a prerequisite to the first desktop preview.

Static CI may run on pushes and pull requests. Browser CI is manually dispatched with a readiness input only after stage 4 entry conditions. Local commands do not enforce conversation approval state; follow the recorded user instructions.

## Progress and implementation status

Keep stage, desktop/system/editor readiness, approval evidence, mobile decision, and QA status in docs/BRIEF.md. Re-read this record and latest user instructions when resuming. Preserve English starter documentation; a future site's interface language follows its brief.

This documentation defines what to implement for each screenshot-led project. The bundled demo includes a working motion editor and library examples, with OS/saved-preference theme selection. Adapt the included local token editor, project baseline, spacing roles, and approved project theme during desktop work. See MOTION-STUDIO.md for the included controls and their limits.

Historical demo test results do not validate a new site. Report deferred or unperformed work accurately, and update docs/VALIDATION.md with actual final results and limitations.
