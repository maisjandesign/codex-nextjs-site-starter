---
name: site-motion
description: Implement or repair GSAP smooth scrolling, masked element entrances and expressive shared button hovers in Next.js sites, preserving the supplied design.
---

# site-motion

Read `AGENTS.md` and `docs/MOTION-DEFAULTS.md`. That document is the single motion contract; older demo recipes and upstream skills do not add mandatory effects.

Implement GSAP ScrollSmoother, shared masks for text/content/media, and interesting GSAP Button/ButtonLink hovers during desktop work. Color-only feedback is insufficient for the button hover. Preserve user-authored effects where supplied; resolve overlapping ownership instead of adding another animation on top.

Start with one working scroll boundary, a masked text/media example and one button hover. Verify them together on the page before propagating the shared primitives. Give scroll, reveal and interactive layers separate owners. Use scoped React cleanup, shared integer duration/distance tokens, visible reduced-motion/no-JavaScript fallbacks and no first-screen parallax.

Load gsap-core/gsap-react for implementation, gsap-scrolltrigger/gsap-plugins for scrolling and masks, gsap-timeline when sequencing is useful, and gsap-performance for relevant diagnostics. Use better-ui for refinement within this contract. Do not require gallery research, extra engines, SplitText, Flip or a separate header/hero timeline to start the site.

Use actual components in Storybook, with replay for masks and hover/focus/state examples for buttons. Follow WORKFLOW.md: early desktop preview, observed desktop motion before completion, desktop approval, mobile decision, then full browser/viewport QA. For implementation failures consult docs/MOTION-LIBRARIES.md; never mark a build or import as browser motion verification.
