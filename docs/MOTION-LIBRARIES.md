# Motion implementation support

[MOTION-DEFAULTS.md](MOTION-DEFAULTS.md) is the single required contract: GSAP ScrollSmoother, element masks and expressive shared button hovers. This file provides diagnostics and optional references; it adds no mandatory effects or research quota.

## React / Next.js diagnostics

When motion is missing or incorrect, reproduce it on the affected route/control first. Inspect the actual runtime error and moving layers, then fix the observed cause. Do not assume a framework version conflict from a static page.

- Confirm that the rendered components use the intended GSAP primitives and the refs point to live elements.
- Check client boundaries, plugin registration, initialization order, hydration errors, Strict Mode setup/cleanup, route remounts and pending font/image work.
- Verify there is one ScrollSmoother and that dependent ScrollTriggers initialize after it. Inspect its wrapper/content, fixed UI placement, trigger geometry and relevant refreshes.
- Inspect reduced-motion settings, hover capability, paused/reversed timelines, mask bounds and final states. A reduced-motion fallback is expected behavior, not evidence that GSAP failed.
- Identify every writer of transform, opacity and clip-path on the affected node. Remove overlapping demo animation/transition ownership; keep scroll transforms, entrance masks and hover layers separate.
- For buttons, check rapid entry/exit and focus together; avoid queued tweens, clipped focus rings and duplicated accessible labels. Preserve reverse direction when changing playback speed.
- If there is version evidence, run `npm ls next react react-dom gsap @gsap/react`, inspect declared peer ranges and duplicate React, and reproduce with the committed lockfile. Do not upgrade all packages as the first fix.

Record the reproduced cause, changed owner/component and observed result in BRIEF.md. Use the desktop review in MOTION-DEFAULTS.md; focus checks on the affected runtime behavior. Full multi-browser/viewport regression remains at the stage set by WORKFLOW.md.

## Optional references

Research a specific effect when the brief or an unresolved implementation choice needs it. There is no minimum number of galleries to visit and no requirement to invent a signature sequence. Preserve supplied composition and user-authored animation intent. Record exact inspected sources when used; a title or screenshot does not verify movement.

| Source                                                        | Role in selection                                                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [GSAP documentation](https://gsap.com/docs/v3/)               | Engine installed in this baseline; timelines, ScrollTrigger, text/SVG/layout tools as needed                                               |
| [Anime.js](https://animejs.com/documentation/getting-started) | Evaluate its animation/timeline/SVG tools and React integration for the actual effect; check the installed major-version API               |
| [21st.dev](https://21st.dev/)                                 | Discover community components and animated marketing blocks; inspect the individual author, code, and dependencies                         |
| [Motion Primitives](https://motion-primitives.com/)           | Find coordinated text, transition, and interactive primitive patterns                                                                      |
| [React Bits](https://reactbits.dev/)                          | Explore expressive text, backgrounds, and interactive effects; choose only those that support the brand                                    |
| [Hover.dev](https://www.hover.dev/)                           | Explore button, card, navigation, and section interactions; check usage and redistribution terms for each selection                        |
| [Aceternity UI](https://ui.aceternity.com/components)         | Explore hero, background, card, and scroll patterns                                                                                        |
| [Micro Interactions UI](https://microinteractionsui.com/)     | User-supplied microinteraction reference; availability/content could not be verified in this preparation pass, so inspect before selection |
| [Magic UI](https://magicui.design/)                           | Explore animated components and presentation details                                                                                       |

These are discovery links, not dependencies to install. Check each selected implementation's license, access requirements and current API before reuse. Adapt its mechanics to shared project tokens/components without copying an unrelated design system. Keep GSAP for the three defaults. Use supplementary libraries only for an actual distinct project need, never as a second owner of the same effect. Native Storybook chrome stays unchanged.

## Existing demo references

[MOTION-SEQUENCES.md](MOTION-SEQUENCES.md) describes the current sequence specimens; [MOTION-STUDIO.md](MOTION-STUDIO.md) describes playback and token editing. They are reusable examples, not a mandate to wrap every new primitive in the demo's sequence system. [MOTION-DIRECTION.md](MOTION-DIRECTION.md) and [REFERENCE-MOTION-STUDIES.md](REFERENCE-MOTION-STUDIES.md) provide optional reference research. Historical observations do not verify a new site's motion.
