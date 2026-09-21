---
name: site-responsive
description: Adapt an approved desktop design for mobile and tablet after user authorization, then verify reflow during final browser QA.
---

# site-responsive

Read docs/WORKFLOW.md and the phase record in docs/BRIEF.md. Begin adaptation only after desktop approval and the user's authorization for mobile. If authorization is pending or mobile is deferred, preserve the desktop deliverable and do not begin responsive implementation or the browser matrix.

Use the applicable Better layout/type/UI/accessibility/writing/color skills again during authorized adaptation; use animate/apple-design only for actual small-screen motion or gesture needs, under docs/SKILL-ROUTING.md.

Adapt the accepted desktop design using fluid containers, tokenized gutters, minmax(0, 1fr), and wrapping rows. Preserve desktop appearance. Add explicit mobile/tablet token editor scopes; keep shared values and desktop overrides identifiable so a small-screen edit cannot silently change the approved desktop. Base CSS plus media queries is an implementation choice, not permission to reverse the delivery order. Keep breakpoint values in tokens.json and structural media queries aligned with the generated CSS.

During adaptation, show the mobile result and make requested changes. Use ordinary preview inspection to make the layout work; defer the full automated browser suite/matrix until both desktop and mobile are ready. Focused interaction reproduction remains allowed; fix motion defects observed during adaptation without changing the accepted desktop design. Then register all routes and test 320, 375, 390, 767, 768, 769, 1023, 1024, 1025, 1440 and 1920 px, all approved themes, long content, and text scaling. Adjust the demo theme matrix to actual project scope; do not invent a dark theme for tests. Add intermediate cases when content requires them.

Keep actions reachable and preserve DOM reading order. Use min-height for text controls rather than clipping fixed heights. Fix overflowing children instead of masking page overflow. Intentional local table scrolling needs a discoverable affordance.
