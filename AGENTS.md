# Reference-first Next.js workspace

## Mandatory setup gate — before the project process

All template instructions, generated UI, copy, stories, comments, metadata and reports must be in English unless the user explicitly changes the language for a later project.

In chat, reply in the language the user uses. This does not change the English-only requirement for project work and documents.

1. Before reference analysis, asset work, layout implementation or preview startup, run `npm run setup` from this project root. Installation is mandatory: all 11 skills from [jakubkrehel/skills](https://github.com/jakubkrehel/skills), all 8 from [greensock/gsap-skills](https://github.com/greensock/gsap-skills), and the existing Graft skill. The installer uses pinned, complete upstream bundles, installs them into `.agents/skills/`, restores locked npm dependencies and prepares the local Graft CLI/index. A link, a global installation, or a SKILL.md without its references does not satisfy this requirement.
2. Run `npm run setup:check`. All 20 required skill folders and their files must verify before project work starts. The check also verifies bundled hashes, Graft, the project-specific readiness marker and the lockfile. Missing files are repaired by setup; unchanged known older snapshots can upgrade. Unknown local modifications block setup and are preserved. Do not skip a skill or weaken the gate to proceed.
3. Read [the installation and usage rules](instructions/skill-installation.md), then load the installed instructions for the current stage. Start with Graft for code orientation, the applicable Better domain skills for the reference, and GSAP React/ScrollTrigger/plugins for motion. Read files by path immediately if the session catalogue has not refreshed. Installation is not the same as invocation: preserve explicit-only skill policies and do not automatically start variant generation, stress testing, or change reviews.
4. Once setup is verified, immediately begin the supplied Figma/screenshot workflow below. Do not ask for a second go-ahead or stop after installation. If no reference exists yet, ask for the reference after setup.

Setup is project-local: no global plugins, account-wide Codex configuration, global MCP registration or global hooks. Use `npm run graft -- <command>` for the verified local Graft CLI. Index `src/` and `scripts/` only, keeping generated Storybook bundles out of the graph.

Required skills are installed before the process, then applied at the relevant stage. They are not optional recommendations. The user's Next.js, GSAP hover/scroll/mask, reference fidelity, English deliverables and 8px rules take precedence over conflicting general skill advice.

## Start here

This is a reusable template, not the target site's visual identity. Build the user's page from the attached Figma URL or screenshot. Keep Next.js App Router + TypeScript, the shared GSAP infrastructure, and a separate Storybook. Replace the demo's content, colors, typeface, and composition with the reference. Do not carry the lime palette or demo graphics into unrelated projects.

Read the project-local skill `.agents/skills/reference-site/SKILL.md` before new site work. It selects the Figma or screenshot workflow. Read `.agents/skills/gsap-next-motion/SKILL.md` when wiring motion and `.agents/skills/site-component-system/SKILL.md` when creating components, tokens, stories, or running QA. These local instructions accompany the mandatory installed skills; connector tools remain environment-dependent.

## User's non-negotiable defaults

- Next.js App Router, TypeScript, server components for layouts/content; client islands only for interaction. No migration to Vite/SPA. Storybook uses its Next.js adapter; its internal builder does not change the website framework.
- Figma/screenshot determines composition and visual character. Export original Figma photos, icons and SVGs. For a screenshot, generate missing raster imagery inspired by the visible asset, then rebuild the actual interface in code.
- One typography system: every H1 has the same font family, weight, size and line-height at the same breakpoint; same for H2/H3/H4. Never introduce a section-specific heading size. Change semantic role or shared tokens, not one heading's CSS.
- Author design sizes, typography sizes/line-heights, spacing, gaps, padding, radii and fixed layout dimensions as integer multiples of 8px. Normalize reference values to the nearest 8px, ties upward; body text minimum 16px. One shared value wins across repeated components. Use integer px tokens, no fractional rem/vw/clamp font sizes.
- Fidelity is measured after this explicit 8px normalization. Record material source → token differences in `design/decisions.md`, and match everything else. Do not silently claim pixel identity after normalization.
- The grid applies to authored design tokens, not the browser's intermediate percentage/flex coordinates, intrinsic asset geometry, SVG paths, animation interpolation, opacity, durations, weights, ratios or z-index. Hairline borders 1px and focus outlines 2px are technical exceptions; do not thicken exported SVG strokes to 8px. If the user wants even strokes on the grid, follow that explicit request.
- GSAP smooth scroll, upward masked reveals and expressive button/link hovers are default implementation work. Buttons use a rising fill, masked rolling label and moving arrow; text links draw an underline and shift their label. Hover components own their GSAP lifecycle and work in isolation, including every Storybook variant and Docs. Do not make hovers depend on MotionRoot. Touch-only devices use native scrolling; reduced-motion skips nonessential motion; never hide content in base CSS.
- Deliver a separate, working Storybook containing every reusable component actually used on the site: buttons and states, links/navigation, headings/body/fonts, graphics/icons, cards, forms, section compositions and motion presets. Stories import production components and shared styles; never maintain a copied implementation.
- A site is not finished until both site and Storybook build and the visual review is complete. The original user requests browser visual testing and responsive review as part of this reusable workflow. Store evidence under `verification/` and report real limitations.

## Work sequence

1. Complete the mandatory setup gate above. Then inspect existing files, supplied reference and accessible tools. Choose the relevant local skill and available specialist skills. Do not load every installed skill.
2. Create `design/brief.md`, `design/assets.json`, `design/decisions.md` from observed evidence. Identify content, sections, interactive behavior, grid normalization, missing fonts/assets and target viewports. Keep these concise and current.
3. Obtain actual assets early. Set type, spacing and color tokens in `src/styles/tokens.css`. Use matching local fonts; do not silently substitute unavailable proprietary fonts.
4. Build the reference at its original viewport width, then derive coherent mobile/tablet layouts. Responsive sizes change only through shared breakpoint tokens. Read DOM order for semantic hierarchy; use Grid/Flex, not a canvas of absolute positions.
5. Use `RevealText` for plain heading text, `Reveal` for text/blocks, `RevealMedia` for visual assets, `MotionButton` for actions, and `MotionLink` for navigation text links. Keep one `MotionRoot` in root layout. `AnchorLink` combines link hover with same-page scroll and focus; set `animate={false}` for skip links. Fixed headers/modals live outside the transformed content.
6. Add stories in the same change as each component; include real states and a long-content example where relevant. Add actual site graphics to Foundations/Graphics. Build section stories by composing real components.
7. Run `npm run check`, `npm run build`, `npm run build-storybook`. Then visually inspect site + Storybook at reference width, 1440, 768, 390 and 320px as relevant. Compare screenshots, fix demonstrated mismatches and rerun affected checks.
8. Return runnable site, Storybook entry point, reference deviations, and a short verified QA result. Do not publish, upload, or send messages unless the user asks.

## Agent roles

Use `instructions/agent-roles.md` for bounded role briefs. On substantial multi-section work, parallel agents may handle independent asset analysis and component stories while the lead builds the page. Delegate only when the current environment and user permit it; otherwise execute the same roles sequentially. Files in `instructions/` describe roles, they do not create or configure runtime agents. The lead integrates, compares and verifies the final result.

## Commands and boundaries

`npm ci` installs the lockfile; `npm run dev` serves the site; `npm run storybook` serves the component library. Prefer the lockfile over arbitrary package upgrades. Use the active browser skill before browser tools. Use active Figma/imagegen tool schemas, never invented tool names or downloaded secrets. No full-page screenshot as implementation, fake controls, permanent temporary Figma URLs, arbitrary stock assets, or unsupported claims of exactness.

Use semantic HTML, accessible names, visible keyboard focus, correct alt text, real link destinations and actual form behavior. Scope changes to the requested site. Ask only for missing information that cannot be recovered and materially blocks fidelity; keep independent work moving.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- graft:start -->
## Graft — repo context graph

This repo is indexed in `graft/`: small linked markdown nodes that explain each
system and carry exact file:line spans, kept in sync with the code through git.

For ANY task here — understanding how something works, finding where code lives,
or scoping a change — get context from the graph before grepping or opening
source files. Re-ask freely (it's cheap) and reuse literal identifiers you
already have (symbol, error string, file name) as the query. New to this repo?
Run `graft map` first — a token-budgeted orientation (dir clusters, hubs,
hotspots), no LLM, no key.

- Run `graft ask "<your question>" --source` → ranked nodes with the relevant
  code spans inlined (each hit's ≤8-line crux by default; `--full` for whole
  definitions when the crux isn't enough). Match the tool to the task shape:
  for understanding or editing, the top node IS the answer — cite its
  `covers:` file:line spans and edit straight from `--source`. For
  exhaustive tasks ("every occurrence / every caller of this pattern"), ranked
  results are top-N, not complete — run `graft grep "<literal>"` instead
  (exhaustive over indexed files, grouped by enclosing symbol), falling back
  to raw `grep -rn` only for unindexed files.
- `graft skeleton <file>` → every definition's signature + span, ~10× cheaper
  than reading the file; use it to skim an API surface.
- `graft callers <symbol>` gives precomputed, exact edges — who calls this.
  Add `--direction out` for what it calls, or `--depth N` to walk
  transitively for the full blast radius. For structural questions, skip
  ranking and use this directly.
- Or browse: `graft/INDEX.md` lists every node; follow the links.
- Monorepos and folders of multiple repos rank fairly across sub-projects —
  hits carry `[scope/]` labels naming which one they're from. Narrow with
  `graft ask "<task>" --in <scope>/` once you know where you're working.

If a returned span is truncated ("+N more lines"), open the file at that exact
range before finalizing. Only open source files when a node genuinely lacks a
needed detail, and then at the exact file:line the node points to — never
re-read whole files.

After big code changes, refresh the graph with `graft build` (deterministic,
no API key, $0).
<!-- graft:end -->
