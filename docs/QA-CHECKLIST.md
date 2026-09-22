# Final QA checklist

## Skill coverage

- [ ] Startup skill resolution and actual use are recorded in docs/BRIEF.md; names alone are not claimed as completed work.
- [ ] better-interface quick covered the implemented desktop before its handoff, with mobile/browser work explicitly deferred.
- [ ] At final QA, better-interface full consolidates all six available domains with evidence and unverified checks identified. Its verdict does not replace user approval.

## Desktop implementation review (before final QA)

- [ ] The required desktop motion review in docs/MOTION-LIBRARIES.md has observed page load, scrolling down/back, repeated hover, interrupted transitions, applicable control/keyboard states, reduced motion, and replay of actual site effects in the catalog.
- [ ] Flicker, disappearing already-visible content, and conflicting property animations are resolved; affected scenarios were rechecked.
- [ ] docs/BRIEF.md identifies the browser, viewport, routes/specimens, actual observations, and failed/unverified states. A dependency, build, or static screenshot alone is not evidence.

This implementation review is required before declaring desktop complete, even if mobile is deferred. Early unfinished previews remain allowed. Focused interaction automation may support observation; it does not authorize the full matrix.

## Full browser QA entry conditions

- [ ] The desktop includes reference-led polish, entrance/interaction animations, consistent shared roles, and the synchronized catalog with a working token editor (or an explicit user-approved exception).
- [ ] The user has explicitly approved the desktop.
- [ ] Mobile adaptation has been authorized and implemented.
- [ ] Both layouts are ready and known requested changes are complete.

Until these conditions are met, defer the full browser regression suite and cross-browser/multi-viewport matrix. Perform the desktop implementation review above and fix its findings now. If mobile is deferred, do not run the combined matrix; an additional full desktop-only QA pass needs a user request. See docs/WORKFLOW.md.

## Motion and assets

- [ ] Library effects match the recorded motion direction and can be replayed in the catalog.
- [ ] GSAP timelines/media contexts/ScrollTriggers clean up on repeated route changes and reduced-motion changes.
- [ ] Essential content stays visible without JavaScript; focus and interactions remain usable during motion.
- [ ] Needed images are generated, inspected, and recorded with actual dimensions; no final screenshot crops.
- [ ] Responsive image sizes, focal crops, reserved space, and alt text are verified.

## Automated checks

- [ ] `npm run check` completes without errors.
- [ ] `npm run test:browsers` passes in Chromium, Firefox, and WebKit.
- [ ] All new pages are registered in tests/site.config.ts; meaningful states have tests.
- [ ] Shared H1–H6 styles, container gutters, padding, and actual gaps match the contract.
- [ ] No runtime errors or axe violations occur in the tested states.
- [ ] No horizontal page overflow occurs across 320–1920 px, including breakpoint boundaries.
- [ ] Native Storybook hierarchy and light chrome stay consistent. Stories import actual project components; Docs, Canvas, Controls, event callbacks, search/deep links, and required motion replay work. Token source edits update both builds; temporary args are not represented as saved tokens.
- [ ] Documentation search, deep-link refresh, active navigation, tabs, code disclosure/copy, and example reset work.
- [ ] Project token edits update site/specimens and tables while documentation chrome typography, colors, spacing, and controls remain unchanged.
- [ ] Documentation and specimen heading/spacing scopes are verified separately; new routes are registered.
- [ ] New tokens, navigation/menu roles, component variants, and states appear in the catalog.
- [ ] Editor color and size changes propagate to all dependent instances and catalog values; unrelated roles remain unchanged.
- [ ] Invalid edits and failed saves are handled; cancel/reset behave as documented.
- [ ] Saved source tokens and generated CSS agree after reload/build; localStorage is not the only persistence.
- [ ] The development write endpoint is unavailable in production; public pages do not expose editor controls.
- [ ] Theme behavior matches the reference scope, including after hydration and reload; no unintended dimming occurs.

## Visual and manual checks

- [ ] Open full-page screenshots at 390 and 1440 px or more, in all approved themes. Do not add a theme solely to satisfy the demo matrix.
- [ ] Compare the implementation with the accepted desktop baseline and recorded goals/improvements. Differences from the original rough sketch are not defects by themselves. Use exact-reference comparisons only for an explicitly requested scope; preserve the accepted composition during QA.
- [ ] Compare equivalent sections: left edge, heading inset, content gap, and section rhythm.
- [ ] Check long headings, real copy, font loading, and images.
- [ ] Verify that 200% browser zoom and text-only scaling preserve content and actions. The automated text test does not replace real browser zoom.
- [ ] Test Tab / Shift+Tab / Enter / Space, visible focus, and opening/closing interactive elements.
- [ ] Check hover, active, disabled, loading, error, empty, and success states where applicable.
- [ ] Ensure animations can be interrupted without jumps, avoid distracting repetition, and respect reduced motion.
- [ ] Verify screen-reader and forced-colors behavior when included in the target matrix. axe does not replace these checks.
- [ ] Check contrast against actual background layers, including hover, focus, and error states.
- [ ] Replace technical placeholders, unsupported claims, and broken links.

## Before publication

Check metadata for every public page, robots/sitemap for the real domain, OG data, image dimensions and alt text, LCP/CLS/INP on target devices, real form submissions, 404 behavior, and error handling. Core Web Vitals reference targets are LCP ≤2.5 s, CLS ≤0.1, and INP ≤200 ms. These are field metrics, not guarantees from a local build. Keep secrets in the server environment, never in NEXT_PUBLIC_* variables.

After verification, update `docs/VALIDATION.md` with the environment, versions, commands, results, screenshots, and checks that remain not run. Do not check items in advance.

## Required motion coverage

Follow AGENTS.md, Mandatory desktop motion: header, hero, shared buttons/button-links and each major section must have implemented, observed motion before desktop completion. Color-only hover, press-only scale, an installed library or an isolated catalog demo does not satisfy it. Implement motion alongside the supplied layout; preserve its composition. Record actual role-by-role browser evidence and unverified states in BRIEF.md. Reduced-motion fallbacks remain required; the full cross-browser/viewport matrix stays in final QA.

## Coordinated sequence implementation

Use [MOTION-SEQUENCES.md](MOTION-SEQUENCES.md) for the shared opening/section API and focused behavior checks. Implement header and hero as one planned opening; each major section owns its heading/content sequence. The same implementation must appear in the live catalog. First-screen parallax is excluded: do not add it as a default or inherit it from a reference sandbox. Desktop motion remains required, with full browser/viewport QA at its existing later stage.

## Required smoothing and mask checks

During desktop implementation, apply [MOTION-DEFAULTS.md](MOTION-DEFAULTS.md): observe ScrollSmoother on wheel/trackpad input, scroll reversal, anchors, keyboard/focus navigation, route changes and cleanup. Observe actual text/content/media masks, fast scroll past triggers, replay/interruption, font reflow and already-revealed content. Confirm native scrolling and fully readable unclipped content with reduced motion. Extend these checks to the agreed browser/viewport matrix at final QA; do not defer desktop observations or mark library presence as visual proof.

## Required GSAP button and tab hovers

Before desktop acceptance, observe actual GSAP hover entry/exit on primary/secondary buttons, button-links and every existing tab variant. Color-only feedback, CSS-only transitions or selected-indicator movement alone do not pass. Check rapid enter/leave, keyboard focus remaining after pointer exit, tab selection during hover, press/release, disabled/loading, stable hit areas and static reduced-motion feedback. Hover must not activate tab panels. Inspect the shared Storybook stories and real page; absent tabs are not applicable, not a reason to invent them. Full browser/viewport coverage stays at final QA.
