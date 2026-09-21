# Skills and extensions

The archive includes 21 local skills: ten site-* workflow skills and all eleven design/motion skills requested by the user, with available supporting files. Use [SKILL-ROUTING.md](SKILL-ROUTING.md) at startup for the required stage map and conflict rules. These eleven are already bundled, not optional future installations.

The set is better-accessibility, better-colors, better-interface, better-layout, better-typography, better-ui, better-writing, design-taste-frontend, animate, animation-vocabulary, and apple-design. Their availability and source hashes are recorded in [SKILL-INVENTORY.json](SKILL-INVENTORY.json). Keep original snapshots intact; project integration rules live in this starter's documents.

Use initial design skills while building desktop, the motion skills while implementing relevant effects, better-interface quick for the implemented desktop, and better-interface full for final QA. Required desktop motion/interaction observation happens during implementation under docs/MOTION-LIBRARIES.md. Mobile and the full browser suite/matrix stay at their authorized stages. Fixed documentation chrome, the supplied-design preservation and local-normalization policy in AGENTS.md, the single CSS system, token consistency, and the no-dimming rule take precedence over conflicting recommendations.

Optional additions such as interface-design (a separate skill from better-interface), design-qa-checklist, design-debt-audit, figma-implement-design, and handoff-spec are not included by this revision. Use them only when a project's needs justify them; check actual availability rather than assuming installation.

## Useful next additions

| Priority | Extension                    | Purpose and conditions                                                                                                                                                                    |
| -------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | Playwright visual regression | Capture approved baselines and compare changes. Update baselines only after reviewing the diff. The starter currently saves screenshots as evidence without baseline comparison.          |
| 1        | site-content-seo skill       | Metadata, OG data, sitemap, real copy, and page structure for public websites. This is a proposed skill and is not included yet.                                                          |
| 1        | site-performance skill       | Images, fonts, lazy loading, bundle size, and Web Vitals after adding real content. This is a proposed skill.                                                                             |
| 2        | Storybook                    | Develop a complex component library and its states in isolation. The starter's /design-system page covers the initial need.                                                               |
| 2        | Figma token sync             | Synchronize approved variable collections with JSON. Establish one source-of-truth direction and validate exports.                                                                        |
| 2        | Localization and RTL         | Handle long strings, plurals, dates, bidirectional text, and layout direction. Logical CSS properties already make adaptation easier.                                                     |
| 2        | Lighthouse CI / Web Vitals   | Measure performance after adding real media and integrations.                                                                                                                             |
| 3        | CMS and content constraints  | Add when editors need it. Content schemas should account for long headings and required alt text.                                                                                         |
| 3        | Additional motion runtime    | Use for complex sequences and layout transitions. GSAP is now included. Follow MOTION-LIBRARIES.md to select effects and justify any additional runtime; do not install entire galleries. |

For each addition: define its purpose → limit the scope → integrate with tokens → add a live example → verify automatically and manually. Install what is needed; having a tool is not evidence that its checks have passed.

Read MOTION-DIRECTION.md for Osmo/Codrops research and optional Lenis/OGL/Three.js choices. Six official GSAP skills are now bundled (27 total skills), including gsap-core, gsap-react, gsap-timeline, gsap-scrolltrigger, gsap-plugins and gsap-performance; do not reinstall them as optional suggestions.
