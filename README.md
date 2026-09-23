# Foundation · Next.js Site Starter

## How to use this template

### 1. Create your own project

On this GitHub page, click **Use this template → Create a new repository**, choose a name and visibility, then create the repository. Clone **your new repository**, replacing the example owner and name below:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-PROJECT.git
cd YOUR-PROJECT
```

Alternatively, use **Code → Download ZIP**, extract the entire archive, and keep hidden folders such as `.agents` and `.storybook`. Open the extracted project root, where `AGENTS.md` and `package.json` are located.

### 2. Open the project in Codex and provide the design

Open your project folder in Codex and start a task in that folder. Supply your brief, page content and design references:

- **Structured Figma:** provide the frame/node link or identify the selected frame through an available Figma integration. Original images, SVG icons and logos are exported and reused.
- **Screenshot or flat mockup:** attach the image. Codex analyzes the layout and generates similar high-resolution imagery for the required slots.
- **Mixed Figma frame:** provide the frame; Codex classifies individual regions and combines original exports with generated assets.

Figma layer access and image generation depend on the tools available in your Codex environment. A preview image alone does not provide access to editable layers. Include original brand assets and font files when available.

### 3. Send this starting prompt

> Use this repository as the starter for my website. First run npm run setup under docs/STARTUP.md: install missing required local skills and dependencies, skip installed ones, and resolve/report setup failures before dependent work. Read AGENTS.md, START-HERE.md, docs/DESIGN-SOURCE.md and docs/SKILL-ROUTING.md before implementation. Use the bundled Graft skill under docs/GRAFT.md for initial code orientation and dependency checks before shared implementation changes. Inspect my references and classify them as structured Figma, flat image or mixed. Preserve the supplied composition and normalize repeated elements through shared tokens. Export original Figma assets where available; generate imagery for flat reference regions. Build desktop first with real Storybook, the token editor, GSAP ScrollSmoother, masked entrances and expressive GSAP button hovers. Follow the documented fallbacks and do not add first-screen parallax. Show a working desktop early, apply my revisions, and verify its motion before completion. After I approve desktop, ask before adapting mobile unless I have already authorized it. Run the full browser/viewport QA after both layouts are ready. My brief and references: [add them here].

The full starting prompt and workflow are in [START-HERE.md](START-HERE.md). The bundled demo is a starting point; the rules describe the project-specific work to complete, not proof that every required effect is already implemented.

### 4. Install missing skills/dependencies, then run locally

Use **Node.js 22.12 or newer** and npm. From the project root:

```bash
npm run setup
npm run graft:build
npm run graft:map
npm run dev
```

`setup` checks all 28 project-local skills and the locked packages, restores/installs missing items and skips existing valid ones. It runs automatically before `dev` and `storybook` too. See [STARTUP.md](docs/STARTUP.md) for blocked installation handling.

In a second terminal, from the same project folder:

```bash
npm run storybook
```

- Website: [http://127.0.0.1:3000](http://127.0.0.1:3000)
- Token lab: [http://127.0.0.1:3000/design-system](http://127.0.0.1:3000/design-system)
- Storybook: [http://127.0.0.1:6006](http://127.0.0.1:6006)

Use **Design tools** in the Next.js development preview to edit shared tokens and inspect spacing. **Save tokens** writes the source values. Storybook Controls preview individual story props; they do not save shared tokens. Run `npm run tokens` after manually editing `src/design/tokens.json`.

### 5. Review and continue

Review desktop and request corrections first. After desktop approval, authorize mobile adaptation when ready. Focused desktop motion checks happen during development; the full browser/viewport matrix follows completed desktop and mobile layouts. Follow [WORKFLOW.md](docs/WORKFLOW.md) for the exact order.

Commit your website changes to **your own repository**. Future updates to this template are published here; they are not automatically applied to projects created from it. See [MAINTENANCE.md](docs/MAINTENANCE.md).

## What the starter includes

Motion policy: **GSAP ScrollSmoother + element masks + expressive GSAP button hovers**. Follow [MOTION-DEFAULTS.md](docs/MOTION-DEFAULTS.md) as the single motion contract.

A portable foundation for building websites in Codex: a working Next.js project, local skills, a shared token system, and executable quality checks.

Begin with **START-HERE.md** and the required stage map in **docs/SKILL-ROUTING.md**. The eleven requested design/motion skills and their supporting files are included locally, alongside ten site-* skills. Original global/project installations are unchanged. Verified versions and test results are recorded in **docs/VALIDATION.md**.

## Delivery order

Implement and show the desktop first, even if the first draft needs polish. Build Storybook stories and the /design-system token lab alongside the pages. Complete reference-led refinements, entrance/interaction animations, shared components and spacing, and the live token editor before desktop acceptance. Apply the user's desktop changes until approval. Then ask whether to create the mobile adaptation and wait for authorization. Build mobile/tablet if requested. Only after both layouts are ready, run browser QA and fix confirmed defects.

See **docs/WORKFLOW.md** for the phase boundaries, mobile deferral, and permitted draft checks. Keep the current phase and approval evidence in **docs/BRIEF.md**. Token consistency is an implementation convention from the start; a finished catalog is not a prerequisite to the first preview, but its synchronized components and working token editor are required for desktop completion. Desktop motion and interactive-state review in the browser is required during implementation under **docs/MOTION-LIBRARIES.md**. Watch load, scroll down/back, repeated hover, interruption, and actual catalog replay; fix observed defects before a completed desktop handoff. The full browser regression suite and cross-browser/multi-viewport matrix remain the final stage. Report checked and unverified states separately; a dependency, successful build, or static screenshot is not motion verification.

## Structure

```text
.agents/skills/          28 skills: 10 site-* + 11 design/motion + 6 official GSAP + Graft
.github/workflows/      CI: static checks; manually enabled browser QA
AGENTS.md               required project rules
START-HERE.md           setup and a ready-to-use prompt
src/app/                App Router: layout, home, design-system, 404
src/components/         Button, ButtonLink, Field, Card, Section
src/design/tokens.json  the single source of design values
src/styles/             tokens.css → base.css → components.css → layout.css
src/screens/            page content and the live catalog
scripts/                CSS generator, CSS/JSX audit, auditor tests
tests/                  browser checks and registered routes
docs/                   brief, Storybook contract, system contract, QA
.storybook/             native manager, preview isolation, Next.js Vite adapter
stories/                typed stories importing actual site components
package-lock.json       reproducible dependency versions
```

## Graft is included

The official Graft skill and pinned local CLI are included for code orientation at startup and dependency checks before shared-component changes. Follow [GRAFT.md](docs/GRAFT.md). Structural mode needs no LLM API key; it does not replace design skills or browser motion review. No global hooks or MCP setup is required.

## Motion and imagery

GSAP and @gsap/react are installed, with reusable ScrollTrigger rise/stagger/mask patterns and replayable examples in /design-system. Use **docs/MOTION-LIBRARIES.md** to select distinctive effects from the supplied sources for each project. Simple CSS feedback remains useful, but it is no longer the complete motion layer. **docs/DESIGN-SOURCE.md** requires inspecting structured Figma, flat or mixed sources first. **docs/IMAGE-ASSETS.md** routes original Figma images/SVG icons/logos to export and flat reference imagery to high-resolution generation, with per-region decisions for mixed frames and verified local assets. No unrelated sample imagery was generated for this template.

## Permanent documentation style

Real Storybook is included. Use **docs/DOCUMENTATION-TEMPLATE.md**: native Foundations / Components / Patterns / Motion / Pages hierarchy, Docs, Canvas, Controls, event callbacks, source examples, and search. Its light interface stays consistent across projects; stories import actual site components and tokens. `/design-system` remains a supporting Next.js token lab.

## How consistency is enforced

| Area              | Mechanism                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| H1–H6             | Shared mobile/tablet/desktop scale, no local font-size overrides, computed-style checks                          |
| Spacing           | Named layout tokens, a shared Section, and real browser geometry comparisons                                     |
| Buttons           | One component, typed variants, shared dimensions and colors, state checks                                        |
| CSS               | CSS/JSX AST checks for unknown tokens, hardcoded dimensions/colors, inline styles, and raw button/input elements |
| Tokens            | Integer dimensions, a complete heading scale, generated CSS, and drift detection                                 |
| Responsive layout | 11 widths from 320 to 1920, both themes, breakpoint boundaries, long copy, and enlarged text                     |
| Accessibility     | axe, keyboard flows, focus, form errors, and prefers-reduced-motion                                              |

The aim is a repeatable quality process. Neither a prompt nor a collection of skills guarantees perfect design for every brief. Visual judgment, real content, and user-flow verification remain necessary.

## Adapting the starter

Inspect and classify the supplied Figma frame or image reference under docs/DESIGN-SOURCE.md, capture the essential brief, then start desktop using the tokens it needs. Treat supplied screenshots and mockups as the design to implement. Preserve their composition, sections/order, content hierarchy, palette, imagery placement, and user flows. Derive shared tokens/components from the references and normalize isolated inconsistencies while preserving intentional role differences. Structural changes require an explicit user request or approval. Record normalized inconsistencies and shared rules for desktop review; preserve the accepted desktop during subsequent adaptation and QA. Do not automatically select dark mode or alter the palette as an accessibility fix. Derive coherent roles, palette, fonts, density, and repeated patterns from the supplied design; add motion within its composition and interaction patterns. Sites built from this starter do not need to look identical. When adding a font, use `next/font/local` with licensed WOFF2 files. The baseline uses system fonts and requires no font downloads during the build.

Implementation status: the motion editor supports live preview and local source saving. The local color/size/typography editor and spacing inspector are included under **docs/DESIGN-TOOLS.md**. The demo still selects OS/saved theme preferences; use the approved reference theme during screenshot-led project work. Its existing two-theme tests cover the demo; adapt theme coverage to the actual project scope without inventing extra themes.

The project deliberately uses one CSS system. Next.js and strict typing are configured; Tailwind and a UI kit are not required. An intentional migration to another styling system must also update the audit.

## Commands

| Command                 | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `npm run graft:build`   | Build the local structural code graph                         |
| `npm run graft:map`     | Inspect the code map at coding startup                        |
| `npm run graft:check`   | Check graph freshness after changes                           |
| `npm run test:graft`    | Verify real symbol and dependency queries                     |
| `npm run format`        | Format source files and CSS consistently                      |
| `npm run dev`           | Start local development                                       |
| `npm run tokens`        | Regenerate tokens.css from JSON                               |
| `npm run audit`         | Run the static system audit                                   |
| `npm run test:audit`    | Run negative tests that ensure violations are detected        |
| `npm run typecheck`     | Generate Next.js types and check TypeScript                   |
| `npm run build`         | Audit and create a Next.js production build                   |
| `npm run check`         | Check formatting, run auditor tests, build, and test Chromium |
| `npm run test:browsers` | Run the full matrix in three browsers after building          |
| `npm run start`         | Start the production server                                   |

`npm run build` checks types through Next.js. `npm run check` is a final-stage quality gate that includes browser tests; do not run it during desktop review or unfinished mobile work. CI runs static checks on push/PR and all three browser engines only through a manual dispatch with the readiness input enabled. Screenshots are saved in test-results and the HTML report in playwright-report. The archive excludes node_modules, the .next cache, and secrets; dependencies and build output are created on the destination machine.

Audit limits: only registered routes and tested states are covered. The CSS checks do not analyze every possible JavaScript mutation, external widget, or dynamic dataset. Register new states in the tests; an absence of reported errors does not prove complete accessibility.

## Motion studio release

The starter now includes working SplitText headings, Flip layout/reorder interactions, three editable motion starting profiles, and shared replay/pause/resume/finish/slow/reduced-motion preview controls. The same components run on the home page and in the catalog. Use docs/MOTION-DEFAULTS.md for required behavior; docs/MOTION-DIRECTION.md and docs/MOTION-STUDIO.md describe optional references and existing demo controls. Six official GSAP skills are included alongside the original 21 skills and Graft (28 total); load them by task under docs/SKILL-ROUTING.md. Profiles are starting values, not a requirement to make all sites look or move alike. WebGL and additional effect libraries remain project-specific choices. ScrollSmoother is the required smoothing baseline; Lenis is an alternative only when the user explicitly requests or approves replacing it.

Real Storybook documentation and the motion editor are implemented. The local color/size/typography editor and spacing inspector are implemented under docs/DESIGN-TOOLS.md; extend their registered roles for each project. Storybook Controls preview props; they do not persist shared token changes. Follow docs/DOCUMENTATION-TEMPLATE.md for the canonical catalog and token-lab boundary.

## Run the component catalog

After `npm run setup`, run `npm run storybook` and open http://127.0.0.1:6006. Run `npm run dev` in another terminal for the Next.js site and token lab on port 3000. `npm run typecheck:storybook` checks story types; `npm run build:storybook` produces the independent static catalog in `storybook-static/`. Controls edit local story props; persistent shared changes go through source tokens.

## Included visual refinement tools

Run npm run dev and open Design tools on the site or /design-system for live token preview, save/cancel/baseline reset, and spacing inspection. Storybook includes Foundations / Typography Playground. Read docs/DESIGN-TOOLS.md at startup for scope, baseline setup, reference passports, and annotated screenshot corrections. These tools preserve the native Storybook catalog and the desktop-first delivery order.

## Canonical repository

The maintained template lives at [maisjandesign/codex-nextjs-site-starter](https://github.com/maisjandesign/codex-nextjs-site-starter). Use **Use this template** to create a new project. See [repository maintenance](docs/MAINTENANCE.md) for updates and the boundary between template changes and individual project work.
