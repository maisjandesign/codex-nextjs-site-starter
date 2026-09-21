---
name: site-qa
description: Run browser QA after the desktop is approved and authorized mobile adaptation is complete; fix and document confirmed implementation defects.
---

# site-qa

First read docs/WORKFLOW.md and the phase record in docs/BRIEF.md. Full browser QA starts only after desktop approval, mobile authorization, and completion of both layouts with known requested changes resolved. If the project is still in desktop review or mobile work, defer this skill's full browser suite and matrix, while performing the required desktop motion/interaction review under docs/MOTION-LIBRARIES.md. If mobile was declined, do not run the combined matrix; run an additional full desktop-only QA pass only when the user explicitly requests that scope. Mobile deferral does not cancel the required desktop motion review.

The synchronized catalog and editor belong to desktop completion. At stage 4, explicitly invoke better-interface full under docs/SKILL-ROUTING.md, consolidate its six domain reviews, recheck the catalog/editor, register editor validation/propagation/save/reset and production-exclusion scenarios along with routes and states, then run npm run check and npm run test:browsers after installing the required browsers. No extra permission question is needed at this point. These checks cover static style rules, token drift, type/build errors, actual spacing geometry, headings, buttons, overflow and selected accessibility flows.

Also verify docs/DOCUMENTATION-TEMPLATE.md: stable chrome across routes, working search/deep links/tabs/code controls, correct component metadata, and project-token edits leaving shell typography, colors, and geometry unchanged. Check documentation and project/specimen scopes independently.

Inspect full-page screenshots for 390 and 1440 px in all approved themes, compare to the actual brief/reference, and look for alignment drift, awkward wraps and missing states. Screenshot generation alone is not visual review. If a browser/tool is unavailable, finish unaffected checks and label that check not run.

Fix confirmed implementation defects while preserving the approved design, and rerun checks affected by the fix. QA does not authorize an unsolicited redesign. Explain any necessary change that materially conflicts with the approved desktop and return that decision to the user. Never remove assertions, widen tolerances or bulk-accept visual baselines merely to make the suite green. Document an intentional role change before updating its expected values.

Update docs/VALIDATION.md with environment, versions, commands, pass/fail, screenshots and remaining manual checks. Report evidence and limitations plainly; do not claim perfection. Treat performance, SEO and integration checks as required when the actual site scope includes them.
