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

> Build a Next.js website from my screenshots. Read AGENTS.md, docs/WORKFLOW.md, docs/SKILL-ROUTING.md, and .agents/skills/site-workflow/SKILL.md. Verify the eleven original design/motion entrypoints and the six official GSAP entrypoints. Read docs/MOTION-DEFAULTS.md and implement GSAP ScrollSmoother, masked text/content/media entrances, and GSAP hover/focus interactions on buttons, button-links and existing tabs as mandatory desktop defaults, with reduced-motion/native-touch fallbacks and no first-screen parallax. Read docs/MOTION-DIRECTION.md, infer a suitable motion character from the brief, and record why it fits. Use gsap-core and gsap-react for implementation, gsap-timeline for coordinated sequences, gsap-scrolltrigger for scroll work, gsap-plugins for ScrollSmoother/SplitText/Flip, and gsap-performance during implementation and review. Use Osmo and Codrops as discovery sources alongside the existing galleries; inspect selected demos and adapt the mechanics to the project. Use better-layout, better-typography, better-colors, better-ui, better-writing, and better-accessibility from initial implementation; use design-taste-frontend for applicable marketing/portfolio surfaces, animate for desktop motion, animation-vocabulary for naming unclear effects, and apple-design for relevant fluid interactions. Explicitly run better-interface quick on the implemented desktop before presenting it as complete, and better-interface full in the final QA stage; defer the full regression suite and cross-browser/multi-viewport matrix until then; focused desktop interaction checks are allowed earlier. Start desktop promptly and show a working preview. Treat AGENTS.md, Mandatory desktop motion, as a completion requirement: implement header entrance, coordinated hero text/actions/visual, expressive shared GSAP button/button-link and existing-tab hover/focus beyond color changes, and entrances for every major section. Use the selected library and shared tokens. Do not silently skip initial-viewport motion or infer that a static screenshot requests a static page. Preserve the supplied composition. Missing or unobserved required motion means the desktop is unfinished. If motion fails, follow the React/Next.js diagnostics in MOTION-LIBRARIES.md; check integration and browser errors as well as peer versions before blaming compatibility. Treat my supplied screenshots and mockups as the design to implement under AGENTS.md. Preserve their sections and order, content hierarchy, layout, grid, alignment, image placement, visual character, palette, and user flows. Derive shared tokens and components from that design and correct only isolated inconsistencies. Preserve intentional role differences. Do not add, remove, merge, reorder, or redesign sections, or substitute another composition or interaction pattern. If intent is uncertain, preserve the supplied composition. Present structural suggestions separately and implement them only when I explicitly request or approve them. Before desktop review, briefly record the inconsistencies normalized and shared rules applied. Apply the conflict-resolution rules in docs/SKILL-ROUTING.md and keep the Next.js stack and shared tokens. Follow docs/MOTION-LIBRARIES.md: inspect relevant examples from the supplied galleries and keep the required GSAP ScrollSmoother and masking baseline, selecting supplementary library effects only where they serve a distinct purpose, and build project-specific motion, not only generic CSS fades. Follow docs/IMAGE-ASSETS.md: generate new high-resolution imagery inspired by screenshot composition instead of extracting screenshot photos; inspect actual dimensions and deliver optimized project assets. Implement coordinated block entrances and polished hover/active states alongside each section and shared control, without waiting for reminders. Before presenting desktop as complete, follow the required browser motion review in docs/MOTION-LIBRARIES.md: watch page load, scrolling down and back, repeated hover, interrupted transitions, applicable keyboard/control states, reduced motion, and replay of actual effects in the catalog. Fix flicker, disappearing visible content, and competing animations; recheck affected states. Record observed results and label untested states explicitly. An installed library, passing build, or static screenshot does not prove motion quality; keep readiness pending when required checks remain unverified. Start real Storybook with npm run storybook alongside the Next.js desktop. Follow docs/DOCUMENTATION-TEMPLATE.md: native Foundations / Components / Patterns / Motion / Pages tree, Docs and named state stories under each component, typed Controls, event callbacks, and real source components. Preserve the native light interface across projects. Update stories with every shared component and demonstrate required motion there and on the page before desktop acceptance. Keep /design-system as the Next.js token lab and complete its token editor with validated preview, save, cancel/reset, and source persistence. Storybook Controls preview props and do not save tokens. Keep integer source dimensions and consistent H1-H6 roles and repeated spacing. Do not automatically darken or recolor the site. Apply my changes until I approve desktop, then ask whether to adapt mobile and wait unless I have already authorized that step. After both layouts are ready, run browser QA, fix findings, and verify the fixes. My website: [screenshots, content, assets, and brief].

## Start the desktop preview

Use Node.js 22.12+ and npm. Install project dependencies, then start development:

```bash
npm ci
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

The starter now includes working SplitText headings, Flip layout/reorder interactions, three editable motion starting profiles, and shared replay/pause/resume/finish/slow/reduced-motion preview controls. The same components run on the home page and in the catalog. Read docs/MOTION-DIRECTION.md at startup and docs/MOTION-STUDIO.md for controls and persistence. Six official GSAP skills are included alongside the existing 21 skills (27 total); load them by task under docs/SKILL-ROUTING.md. Profiles are starting values, not a requirement to make all sites look or move alike. WebGL and additional effect libraries remain project-specific choices. ScrollSmoother is the required smoothing baseline; Lenis is an alternative only when the user explicitly requests or approves replacing it.

Real Storybook documentation and the motion editor are implemented. The local color/size/typography editor and spacing inspector are implemented under docs/DESIGN-TOOLS.md; extend their registered roles for each project. Storybook Controls preview props; they do not persist shared token changes. Follow docs/DOCUMENTATION-TEMPLATE.md for the canonical catalog and token-lab boundary.

## Coordinated sequence implementation

Use [MOTION-SEQUENCES.md](docs/MOTION-SEQUENCES.md) for the shared opening/section API and focused behavior checks. Implement header and hero as one planned opening; each major section owns its heading/content sequence. The same implementation must appear in the live catalog. First-screen parallax is excluded: do not add it as a default or inherit it from a reference sandbox. Desktop motion remains required, with full browser/viewport QA at its existing later stage.

## Storybook is included

Run `npm run storybook` after installation to open the native component catalog on port 6006. Run the Next.js preview separately with `npm run dev`. Use the hierarchy and authoring rules in docs/DOCUMENTATION-TEMPLATE.md from the first shared component onward. Do not replace it with a custom catalog page.

## Included visual refinement tools

Run npm run dev and open Design tools on the site or /design-system for live token preview, save/cancel/baseline reset, and spacing inspection. Storybook includes Foundations / Typography Playground. Read docs/DESIGN-TOOLS.md at startup for scope, baseline setup, reference passports, and annotated screenshot corrections. These tools preserve the native Storybook catalog and the desktop-first delivery order.
