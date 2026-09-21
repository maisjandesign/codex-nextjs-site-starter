# Sources and scope

Sources were checked during preparation on September 7, 2026.

- [Codex skills](https://developers.openai.com/codex/skills): SKILL.md and the local .agents/skills directory.
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md): project rules and instruction discovery.
- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation): App Router and project structure.
- [Next.js output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output): production builds and output options.
- [Playwright](https://playwright.dev/docs/test-intro): browser tests.
- [Apple: Safari keyboard navigation](https://help.apple.com/safari/mac/8.0/en.lproj/cpsh003.html): Option+Tab includes links in keyboard navigation on macOS.

The local site-* skills were written for this starter. The available better-typography, better-ui, better-layout, better-accessibility, better-colors, and skill-creator guidelines informed the rules. The original release did not bundle their packages. The current release includes the eleven user-requested skill snapshots and their available reference files; see SKILL-INVENTORY.json.

The type scale, component dimensions, and spacing rules are starter design decisions, not universal Next.js, Codex, or WCAG requirements.

Additional user reference, visually reviewed in the browser on September 8, 2026: [Wix Design System Button documentation](https://www.wix-pages.com/design-system-documentation/#/component/button). Its grouped navigation, component tabs, live examples, code controls, and usage guidance informed docs/DOCUMENTATION-TEMPLATE.md. The proposed shell values and architecture are starter decisions, not an exact Wix implementation.

The September 8 skill-integration revision bundles the eleven user-requested skill directories as exact personal snapshots, including available references/agent metadata. This supersedes the earlier packaging note above that Better skill packages were not copied. See SKILL-INVENTORY.json for origins/hashes and SKILL-ROUTING.md for project-specific integration. Global originals were not modified.

September 12 motion research: [GSAP](https://gsap.com/docs/v3/), [GSAP React](https://gsap.com/resources/React/), [21st.dev](https://21st.dev/), [Motion Primitives](https://motion-primitives.com/), [React Bits](https://reactbits.dev/), [Hover.dev](https://www.hover.dev/), [Aceternity UI](https://ui.aceternity.com/components), [Micro Interactions UI](https://microinteractionsui.com/), and [Magic UI](https://magicui.design/). MOTION-LIBRARIES.md distinguishes discovery references from implemented patterns and records retrieval limits. No gallery component code was copied into this starter.

Additional user reference: [Anime.js getting started](https://animejs.com/documentation/getting-started), reviewed September 12. Consult its installation and React guides for the selected version before integration. Anime.js is a candidate in the selection policy, not an installed dependency in this baseline.

Current documentation reference (September 14): [Storybook hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy), [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs), and [Next.js Vite integration](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite). The implemented native Storybook contract supersedes the earlier custom Wix-inspired shell.
