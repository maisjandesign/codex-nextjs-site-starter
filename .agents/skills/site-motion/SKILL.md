---
name: site-motion
description: Implement upward masked entrances, reversible GSAP object hovers and GSAP ScrollSmoother in this Next.js starter.
---

# site-motion

Read `docs/MOTION-DEFAULTS.md`. It is the sole animation specification: upward movement inside a stationary mask, GSAP hovers on existing interactive objects, and one ScrollSmoother. Do not load an older recipe, select a profile, or add effects from a gallery or generic skill example.

Use the actual shared components and `src/design/tokens.json`. Keep scroll, reveal and hover property owners separate; preserve visible content, reduced-motion/native-touch fallbacks and scoped React cleanup. Read gsap-react/core for lifecycle and tweens, gsap-scrolltrigger for entrance triggers, and only the ScrollSmoother part of gsap-plugins. Consult timeline/performance references only to implement or diagnose the three retained families.

Implement and observe these effects on the desktop and in their real Storybook specimens before desktop completion. A build or imported library is not browser verification. Follow WORKFLOW.md for desktop approval, mobile authorization and the later full browser/viewport QA.
