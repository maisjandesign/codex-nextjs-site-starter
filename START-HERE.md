# Start here

1. Extract the entire ZIP, including the hidden `.agents` directory, into a separate project folder.
2. Open that folder as a project in Codex. If needed, initialize Git with `git init`.
3. The ZIP includes the eleven requested design/motion skills plus ten site-* skills. Codex must read docs/SKILL-ROUTING.md at startup and use the mapped skills when their stage begins.
4. Use the prompt below with your website screenshots, brief, copy, and available original assets.
5. Codex reads the root `AGENTS.md`; local skills are in `.agents/skills`. If they do not appear, open a new task in this folder. AGENTS.md also provides their paths.

## The delivery order

1. **Desktop draft:** implement real pages and show a desktop preview quickly. Some rough edges are acceptable.
2. **Complete desktop and design system:** use real Storybook and its native hierarchy in docs/DOCUMENTATION-TEMPLATE.md, populated with this project's real components and tokens; refine the screenshots, finish animations and shared typography/components/spacing, and complete the live catalog with a token editor. Apply your changes until you explicitly accept the desktop.
3. **Mobile decision:** Codex asks whether to adapt mobile now and waits for your answer. If you say yes, it builds mobile/tablet while preserving the accepted desktop. If you say no or later, adaptation and combined browser QA stay deferred.
4. **Final QA:** once desktop and mobile are ready, run browser tests, fix findings, and verify the fixes.

The complete rules are in [docs/WORKFLOW.md](docs/WORKFLOW.md). Tokens and shared components support implementation from the start; the catalog and editor are built alongside the site and completed before desktop acceptance, without delaying the first visible draft.

## Ready-to-use prompt

> Build a Next.js website from my supplied Figma design or image references. First read docs/DESIGN-SOURCE.md and inspect the actual selected Figma frame/node when available. Classify the source as structured Figma, flat image or mixed based on meaningful hierarchy, Auto Layout, spacing, editable components and assets, not layer count alone. Export original images and SVG icons/logos from structured designs. Generate similar high-resolution imagery for flat references. In mixed frames, apply both paths per region; typography overlays over a screenshot do not make it a structured layout. Preserve useful originals and copy, and record unavailable access rather than claiming inspection. Read AGENTS.md, docs/WORKFLOW.md, docs/SKILL-ROUTING.md, and .agents/skills/site-workflow/SKILL.md. Use the bundled Graft skill under docs/GRAFT.md at coding startup and before shared implementation changes; verify actual source and affected consumers. Verify the eleven original design/motion entrypoints and the six official GSAP entrypoints. Read docs/MOTION-DEFAULTS.md and implement GSAP ScrollSmoother, masked text/content/media entrances, and expressive GSAP hover/focus interactions on shared buttons/button-links as the three desktop defaults, with reduced-motion/native-touch fallbacks and no first-screen parallax. Choose consistent pacing under docs/MOTION-DEFAULTS.md; optional reference research must not delay implementation. Use gsap-core and gsap-react for implementation, gsap-timeline for coordinated sequences, gsap-scrolltrigger for scroll work, gsap-plugins for ScrollSmoother and optional SplitText/Flip, and gsap-performance during implementation and review. Use gallery references only when they help a specific effect; no research quota applies. Use better-layout, better-typography, better-colors, better-ui, better-writing, and better-accessibility from initial implementation; use design-taste-frontend for applicable marketing/portfolio surfaces, animate for desktop motion, animation-vocabulary for naming unclear effects, and apple-design for relevant fluid interactions. Explicitly run better-interface quick on the implemented desktop before presenting it as complete, and better-interface full in the final QA stage; defer the full regression suite and cross-browser/multi-viewport matrix until then; focused desktop interaction checks are allowed earlier. Start desktop promptly and show a working preview. Treat AGENTS.md, Mandatory desktop motion, as a completion requirement: implement one GSAP ScrollSmoother, shared masks for first-screen and section elements, and expressive GSAP button/button-link hovers beyond color changes. Preserve existing tab feedback where present. Keep each property under one owner; do not stack the demo reveal/sequence system on new primitives. A separate header/hero timeline is not required. Use the selected library and shared tokens. Apply the documented first-viewport hydration fallback only where needed; do not silently disable all page motion or infer that a static screenshot requests a static page. Preserve the supplied composition. Missing or unobserved required motion means the desktop is unfinished. If motion fails, follow the React/Next.js diagnostics in MOTION-LIBRARIES.md; check integration and browser errors as well as peer versions before blaming compatibility. Treat my supplied screenshots and mockups as the design to implement under AGENTS.md. Preserve their sections and order, content hierarchy, layout, grid, alignment, image placement, visual character, palette, and user flows. Derive shared tokens and components from that design and correct only isolated inconsistencies. Preserve intentional role differences. Do not add, remove, merge, reorder, or redesign sections, or substitute another composition or interaction pattern. If intent is uncertain, preserve the supplied composition. Present structural suggestions separately and implement them only when I explicitly request or approve them. Before desktop review, briefly record the inconsistencies normalized and shared rules applied. Apply the conflict-resolution rules in docs/SKILL-ROUTING.md and keep the Next.js stack and shared tokens. Follow docs/MOTION-DEFAULTS.md for implementation and browser observation; use docs/MOTION-LIBRARIES.md for diagnostics and optional references. Follow docs/IMAGE-ASSETS.md: reuse exported original images and SVG icons/logos from structured Figma; generate similar imagery for flat reference regions. Preserve source crops and identity, inspect actual dimensions and deliver optimized local assets. Do not substitute flattened UI screenshots for real components. Implement coordinated block entrances and polished hover/active states alongside each section and shared control, without waiting for reminders. Before presenting desktop as complete, follow the required browser motion review in docs/MOTION-DEFAULTS.md: watch page load, scrolling down and back, repeated hover, interrupted transitions, applicable keyboard/control states, reduced motion, and replay of actual effects in the catalog. Fix flicker, disappearing visible content, and competing animations; recheck affected states. Record observed results and label untested states explicitly. An installed library, passing build, or static screenshot does not prove motion quality; keep readiness pending when required checks remain unverified. Start real Storybook with npm run storybook alongside the Next.js desktop. Follow docs/DOCUMENTATION-TEMPLATE.md: native Foundations / Components / Patterns / Motion / Pages tree, Docs and named state stories under each component, typed Controls, event callbacks, and real source components. Preserve the native light interface across projects. Update stories with every shared component and demonstrate required motion there and on the page before desktop acceptance. Keep /design-system as the Next.js token lab and complete its token editor with validated preview, save, cancel/reset, and source persistence. Storybook Controls preview props and do not save tokens. Keep integer source dimensions and consistent H1-H6 roles and repeated spacing. Do not automatically darken or recolor the site. Apply my changes until I approve desktop, then ask whether to adapt mobile and wait unless I have already authorized that step. After both layouts are ready, run browser QA, fix findings, and verify the fixes. My website: [screenshots, content, assets, and brief].

## Graft is part of startup

For coding tasks, read docs/GRAFT.md and .agents/skills/graft/SKILL.md at startup. After npm ci, run npm run graft:build and npm run graft:map. Query relevant symbols and callers before shared implementation changes, confirm their source and consumers, and check graph freshness afterward. Use rg for text search and fall back to source inspection if Graft is unavailable. Keep source classification and the first desktop preview moving; no global init/hooks or deep/LLM setup is required.

## Start the desktop preview

Use Node.js 22.12+ and npm. Install project dependencies, then start development:

```bash
npm ci
npm run graft:build
npm run graft:map
npm run dev
```

Home: http://localhost:3000. Catalog: http://localhost:3000/design-system.

Run `npm run tokens` after changing token values. Formatting and targeted type/compile checks can help keep the draft runnable. Do not install test browsers or run the combined check command as a prerequisite to showing desktop.

## Final QA — after desktop and mobile are ready

```bash
npx playwright install chromium firefox webkit
npm run check
npm run test:browsers
```

Linux may require `npx playwright install --with-deps`. `npm run check` includes a production build and Chromium tests. `npm run start` starts the production server after building.

Browser tests use a separate server on port 4179 and never reuse an unrelated server. If that port is occupied, free it or update both the URL and command in playwright.config.ts.

In GitHub Actions, static checks run on pushes and pull requests. To run browser QA at the final stage, manually dispatch **Frontend quality** and enable **Desktop and mobile are ready for browser QA**. This confirms that desktop approval, mobile authorization, and layout completion have already happened.

## Included

Next.js App Router, TypeScript, light/dark themes, a home page, a design system catalog, a 404 page, shared buttons, fields, cards, sections, local form validation, disclosure elements, motion and spacing tokens, a lockfile, audit scripts, browser tests, and CI.

Implementation status: the demo includes an editable motion studio and local source saving. The local token editor is included; adapt its baseline and lock the project theme to the reference during project work. The demo retains OS/saved-preference theme selection.

The demo already contains responsive styles as examples. They do not authorize early mobile adaptation of a new design. The starter does not change global Codex settings or require third-party skills. Figma connections depend on your environment; Playwright runs from this project.

## Motion studio release

The starter now includes working SplitText headings, Flip layout/reorder interactions, three editable motion starting profiles, and shared replay/pause/resume/finish/slow/reduced-motion preview controls. The same components run on the home page and in the catalog. Use docs/MOTION-DEFAULTS.md for required behavior; docs/MOTION-DIRECTION.md and docs/MOTION-STUDIO.md describe optional references and existing demo controls. Six official GSAP skills are included alongside the original 21 skills and Graft (28 total); load them by task under docs/SKILL-ROUTING.md. Profiles are starting values, not a requirement to make all sites look or move alike. WebGL and additional effect libraries remain project-specific choices. ScrollSmoother is the required smoothing baseline; Lenis is an alternative only when the user explicitly requests or approves replacing it.

Real Storybook documentation and the motion editor are implemented. The local color/size/typography editor and spacing inspector are implemented under docs/DESIGN-TOOLS.md; extend their registered roles for each project. Storybook Controls preview props; they do not persist shared token changes. Follow docs/DOCUMENTATION-TEMPLATE.md for the canonical catalog and token-lab boundary.

## Storybook is included

Run `npm run storybook` after installation to open the native component catalog on port 6006. Run the Next.js preview separately with `npm run dev`. Use the hierarchy and authoring rules in docs/DOCUMENTATION-TEMPLATE.md from the first shared component onward. Do not replace it with a custom catalog page.

## Included visual refinement tools

Run npm run dev and open Design tools on the site or /design-system for live token preview, save/cancel/baseline reset, and spacing inspection. Storybook includes Foundations / Typography Playground. Read docs/DESIGN-TOOLS.md at startup for scope, baseline setup, reference passports, and annotated screenshot corrections. These tools preserve the native Storybook catalog and the desktop-first delivery order.
