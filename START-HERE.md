# Start here

1. Create your own repository with GitHub's **Use this template** action and clone it, or extract the entire ZIP into a separate project folder. Keep hidden folders, including `.agents` and `.storybook`.
2. Open the project root in Codex, where `AGENTS.md`, `START-HERE.md` and `package.json` are located. Initialize Git with `git init` only if the extracted folder is not already a repository.
3. Send the prompt below with your Figma frame or screenshots, brief, copy and original assets. Opening the folder alone does not start installation or implementation.
4. Codex runs `npm run setup` under [docs/STARTUP.md](docs/STARTUP.md) before dependent work. It checks the 21 local skills, restores missing files, installs missing/invalid locked dependencies and verifies the Graft executable. Valid existing copies are skipped. Failed setup remains pending until resolved.
5. After setup, Codex runs `npm run graft:build` and `npm run graft:map`, loads the relevant skills under [docs/SKILL-ROUTING.md](docs/SKILL-ROUTING.md), classifies the design source and starts desktop work. Skills are loaded by stage, not all at once.

The walkthrough in [README.md](README.md#how-to-use-this-template) explains what you do and what Codex does at each step. The `dev` and `storybook` npm hooks repeat the setup check automatically; they do not build the Graft graph. Newly restored skills can be read from their exact `.agents/skills` paths if automatic discovery has not refreshed yet.

## The delivery order

1. **Desktop draft:** implement real pages and show a desktop preview quickly. Some rough edges are acceptable.
2. **Complete desktop and design system:** use real Storybook and its native hierarchy in docs/DOCUMENTATION-TEMPLATE.md, populated with this project's real components and tokens; refine the screenshots, finish animations and shared typography/components/spacing, and complete the live catalog with a token editor. Apply your changes until you explicitly accept the desktop.
3. **Mobile decision:** Codex asks whether to adapt mobile now and waits for your answer. If you say yes, it builds mobile/tablet while preserving the accepted desktop. If you say no or later, adaptation and combined browser QA stay deferred.
4. **Final QA:** once desktop and mobile are ready, run browser tests, fix findings, and verify the fixes.

The complete rules are in [docs/WORKFLOW.md](docs/WORKFLOW.md). Tokens and shared components support implementation from the start; the catalog and editor are built alongside the site and completed before desktop acceptance, without delaying the first visible draft.

## Ready-to-use prompt

> Build a Next.js website from my supplied Figma frame or screenshots using this repository. Read AGENTS.md and complete docs/STARTUP.md first: run setup, restore missing local skills, verify dependencies and Graft, then build/map the code. Load skills by stage under docs/SKILL-ROUTING.md. Classify the source under docs/DESIGN-SOURCE.md; export original assets for structured Figma, generate similar imagery for flat references and decide per region for mixed frames. Preserve the supplied composition and normalize repeated elements through shared tokens. Show desktop early and build real Storybook and the editable token lab alongside it. For animation, follow only docs/MOTION-DEFAULTS.md: upward masked entrances, GSAP hovers on existing interactive objects and GSAP ScrollSmoother. Observe these in the browser while implementing desktop. Apply my revisions until desktop approval, then ask about mobile unless already authorized. Run the full browser/viewport QA after both layouts are ready. My brief and references: [add them here].

## Graft is part of startup

For coding tasks, read docs/GRAFT.md and .agents/skills/graft/SKILL.md at startup. First run npm run setup under docs/STARTUP.md; after it succeeds, run npm run graft:build and npm run graft:map. Query relevant symbols and callers before shared implementation changes, confirm their source and consumers, and check graph freshness afterward. Use rg for text search; if Graft setup is blocked, follow STARTUP.md and continue only independent work without marking startup complete. Keep source classification and the first desktop preview moving; no global init/hooks or deep/LLM setup is required.

## Start the desktop preview

Use Node.js 22.12+ and npm. Codex runs these commands during startup; you can also run them yourself:

```bash
npm run setup
npm run graft:build
npm run graft:map
npm run dev
```

In a second terminal, run `npm run storybook` for the native component catalog at http://localhost:6006. The website runs at http://localhost:3000 and the supporting token lab at http://localhost:3000/design-system. Storybook Controls preview component props; use Design tools in the Next.js preview to save shared tokens.

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

Implementation status: the demo includes an editable GSAP controls and local source saving. The local token editor is included; adapt its baseline and lock the project theme to the reference during project work. The demo retains OS/saved-preference theme selection.

The demo already contains responsive styles as examples. They do not authorize early mobile adaptation of a new design. The starter does not change global Codex settings or require third-party skills. Figma connections depend on your environment; Playwright runs from this project.

## Storybook is included

Run `npm run storybook` after installation to open the native component catalog on port 6006. Run the Next.js preview separately with `npm run dev`. Use the hierarchy and authoring rules in docs/DOCUMENTATION-TEMPLATE.md from the first shared component onward. Do not replace it with a custom catalog page.

## Included visual refinement tools

Run npm run dev and open Design tools on the site or /design-system for live token preview, save/cancel/baseline reset, and spacing inspection. Storybook includes Foundations / Typography Playground. Read docs/DESIGN-TOOLS.md at startup for scope, baseline setup, reference passports, and annotated screenshot corrections. These tools preserve the native Storybook catalog and the desktop-first delivery order.
