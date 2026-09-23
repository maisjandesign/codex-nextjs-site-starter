# Graft code orientation

Graft is included as a project-local code navigation skill and development tool. Use it at the start of coding work and before changing shared implementations. It helps locate symbols and relationships; it does not design layouts, create animations, inspect Figma, or replace browser verification.

## Start a coding task

1. Read this integration policy and [the official skill](../.agents/skills/graft/SKILL.md). Apply the boundaries below when the upstream instructions conflict with this project's workflow.
2. First run `npm run setup` under [STARTUP.md](STARTUP.md); install/verify skills and the actual CLI before implementation. After setup succeeds, run `npm run graft:build` for a new checkout or after a substantial source change. Run `npm run graft:map` once to orient yourself in the current project.
3. Query the relevant component or subsystem before implementation. Inspect the actual source and its related styles, tokens, consumers and Storybook stories before editing.
4. Before changing a shared component, hook or motion primitive, inspect its callers and imports. Record relevant affected surfaces in the brief, then implement and verify the change at the current delivery stage.
5. After code changes, run `npm run graft:check`. Rebuild if stale. Query commands also refresh the graph, but a successful command is not proof that every relationship was indexed.

Keep this orientation brief and begin the desktop promptly. Documentation-only edits and visual reference analysis do not need a graph build. If Graft cannot run, resolve installation first under STARTUP.md. A missing CLI is not an optional fallback: record blocked setup, request environment permissions when required and continue only independent work until resolved or the user explicitly authorizes an exception.

## Commands

Run these from the project root. The wrapper uses the installed, pinned CLI and keeps its graph inside this checkout.

```bash
npm run graft:build
npm run graft:map
npm run graft -- ask "motion provider and button interactions" --source -n 4
npm run graft -- skeleton src/components/Button.tsx --json
npm run graft -- callers useMotion --depth 2 --json
npm run graft:check
npm run test:graft
```

Use `skeleton` to inspect declarations and `callers` for candidate dependency impact. Use `ask` for structural search, not an LLM answer. Search text with `rg` first, particularly documentation, configuration, CSS selectors and token JSON. Follow the token source through its generator, CSS variables, component styles, consuming pages and stories with ordinary source inspection; a symbol graph alone cannot establish that whole chain.

The local wrapper accepts `build`, `check`, `map`, `ask`, `grep`, `skeleton`, `callers` and `version`. `npm run test:graft` rebuilds the graph and verifies actual component declarations and a known motion-hook dependency. The graph is disposable and ignored by Git; every new project creates its own graph rather than inheriting template results.

## Project integration boundaries

These rules qualify the preserved upstream skill:

- Use Graft for relevant code orientation, not indiscriminately before every task or text search. It does not supersede required design-source classification, the design skills or the desktop-first sequence.
- Source files are the ground truth. Confirm declarations, current line locations and behavior before editing. Tree-sitter relationships can be incomplete, especially for dynamic calls and JSX usage; an empty callers result does not prove that a component is unused. Inspect imports and actual consumers too.
- The default is structural parsing with no model credentials or LLM processing. A missing meaning/deep tier in `graft check` is expected and is not a failed setup. Do not enable `--deep`, external providers or upload/connect operations without a separate explicit request.
- Do not run `graft init`, add global skills, modify Codex/Claude settings, install hooks, or configure MCP as part of this template's startup. None is needed for the local commands. This is a project integration, not a machine-wide installation.
- The wrapper sets `DO_NOT_TRACK=1` for Graft commands and prevents Graft from modifying ignore files. The CLI may still check npm for a newer version; structural mode is not a guarantee of zero network traffic. The setup command also sets DO_NOT_TRACK=1 for dependency installation.
- Treat upstream savings, speed and accuracy claims as estimates, not measured project results. Do not add a mandatory token-savings footer or report a successful graph query as visual, motion or accessibility evidence.
- The wrapper limits supported workflow commands; it is not a security sandbox. Read source and review dependencies as usual. Graft remains a dev dependency and must not be imported into the site's client or server runtime.

## Provenance

The unmodified skill is from [trailhq/Graft](https://github.com/trailhq/Graft/tree/597d82f8c2f6b1dfa2daf547073a8424b5535eb2/.claude/skills/graft), revision `597d82f8c2f6b1dfa2daf547073a8424b5535eb2`. Its [MIT license](../.agents/skills/graft/LICENSE) is included. [SKILL-INVENTORY.json](SKILL-INVENTORY.json) records snapshot hashes. The CLI is separately pinned as `@nanonets/graft@0.19.0` in package.json and package-lock.json; the skill revision and npm version are separate provenance records.

There are now 21 bundled skills: six site workflow skills, eight design snapshots, six official GSAP snapshots, and Graft. Open a fresh task in the project if automatic skill discovery has not refreshed; the exact local skill path can also be read directly.
