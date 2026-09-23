# Sources and scope

Sources were checked during preparation on September 7, 2026.

- [Codex skills](https://developers.openai.com/codex/skills): SKILL.md and the local .agents/skills directory.
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md): project rules and instruction discovery.
- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation): App Router and project structure.
- [Next.js output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output): production builds and output options.
- [Playwright](https://playwright.dev/docs/test-intro): browser tests.
- [Apple: Safari keyboard navigation](https://help.apple.com/safari/mac/8.0/en.lproj/cpsh003.html): Option+Tab includes links in keyboard navigation on macOS.

The local site-* skills were written for this starter. The available better-typography, better-ui, better-layout, better-accessibility, better-colors, and skill-creator guidelines informed the rules. The original release did not bundle their packages. The current release retains eight design skill snapshots, six official GSAP snapshots and Graft, with their available reference files; see SKILL-INVENTORY.json.

The type scale, component dimensions, and spacing rules are starter design decisions, not universal Next.js, Codex, or WCAG requirements.

Additional user reference, visually reviewed in the browser on September 8, 2026: [Wix Design System Button documentation](https://www.wix-pages.com/design-system-documentation/#/component/button). Its grouped navigation, component tabs, live examples, code controls, and usage guidance informed docs/DOCUMENTATION-TEMPLATE.md. The proposed shell values and architecture are starter decisions, not an exact Wix implementation.

The historical September 8 skill-integration revision bundled eleven user-requested skill directories as exact personal snapshots, including available references/agent metadata. This supersedes the earlier packaging note above that Better skill packages were not copied. The current inventory has been reduced with user approval; see SKILL-INVENTORY.json for retained origins/hashes and SKILL-ROUTING.md for current integration. Global originals were not modified.

Current documentation reference (September 14): [Storybook hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy), [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs), and [Next.js Vite integration](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite). The implemented native Storybook contract supersedes the earlier custom Wix-inspired shell.
