# Project rules for Codex

This is a Next.js App Router + TypeScript starter. Build a coherent site for the specific brief; the demo's visual style is only a starting point.

## Getting started

Read `START-HERE.md`, `docs/BRIEF.md`, `docs/SKILL-ROUTING.md`, and `.agents/skills/site-workflow/SKILL.md`. Verify Graft, the eleven original design/motion skills and six official GSAP skills, and use them at their mapped stages; this is a required startup convention, not an optional recommendation. Do not repeat questions already answered in the task. Make reasonable assumptions for reversible decisions and record them in the brief. The user's requirements take precedence over the starter defaults.

## Code orientation with Graft

For coding tasks, read [GRAFT.md](docs/GRAFT.md) and `.agents/skills/graft/SKILL.md` at startup. After dependencies are installed, build the local graph and inspect its map. Use relevant symbol/caller queries before changing shared components, motion primitives or hooks; verify actual source, tokens, styles, pages and stories before editing. Refresh/check the graph after source changes. Graft is required code orientation when available, not a visual review or an extra approval gate. Use `rg` for text search and as the fallback if Graft is unavailable. Documentation-only work does not need a graph build. The integration boundaries in GRAFT.md override the upstream skill's blanket search, trust, reporting and setup recommendations; do not run global init/hooks or deep/LLM processing by default.

## Delivery sequence

Follow `docs/WORKFLOW.md`: implement the supplied designs on desktop with local consistency corrections, including browser-verified animations and an editable design system → apply desktop revisions until approval → ask about mobile and wait for authorization → complete mobile/tablet → run browser QA and fix findings.

Once desktop is accepted, preserve that baseline during mobile adaptation and QA unless the user requests a redesign; a new image alone does not reset approval. The first visible desktop draft may be rough. Start rendering real pages promptly; do not require a finished token catalog or clean browser audit first. Desktop motion and interactive-state review in the browser is required during implementation and before a completed desktop handoff; follow docs/MOTION-DEFAULTS.md. Fix observed defects immediately. Focused browser automation may reproduce those interactions. The full regression suite and cross-browser/multi-viewport matrix wait until both layouts are ready. If mobile is declined, defer it and the combined matrix; an additional full desktop-only QA pass requires an explicit request, but the required desktop motion review still applies. Honor explicit authorization already given for the mobile step instead of asking twice.

Record the current phase and approvals in `docs/BRIEF.md`. These scheduling rules apply to every skill listed below.

## Classify the source first

Read [DESIGN-SOURCE.md](docs/DESIGN-SOURCE.md) before layout or asset generation. Inspect the actual selected Figma frame/node when supplied: meaningful editable structure, Auto Layout/spacing, text, original image fills and vectors. Classify it as structured Figma, flat image or mixed; layer count alone is insufficient. Structured designs use original exported images and SVG icons/logos. Flat references use generated similar high-resolution imagery while preserving separately supplied official assets. Mixed frames are classified per region: typography overlays and redundant layers over a flattened section do not make it a structured design. Preserve useful originals and copy. Record evidence and unavailable access in BRIEF.md; do not claim layer inspection from a screenshot alone.

## Implementing supplied designs

Treat supplied Figma designs, screenshots and mockups as the design to implement.
Preserve their section inventory and order, content hierarchy, layout,
grid, alignment, image placement, visual character, palette, and user flows.

Your task is to make the supplied design consistent through shared tokens
and components. Correct isolated inconsistencies in spacing, typography,
alignment, sizing, radii, and repeated component states.

Derive the shared system from the supplied design:

- Normalize equivalent elements to the same semantic role and token.
- Use a coherent heading scale and consistent body and label styles.
- Apply consistent gutters, section spacing, content gaps, and card padding
  where the same layout role repeats.
- Preserve intentional differences between roles, such as a large hero
  headline, a compact label, or a distinct full-width section.
- When values differ slightly without an apparent design reason, choose
  the value most consistent with the surrounding references.

Keep corrections local to the inconsistent values or elements. Do not
add, remove, merge, reorder, or redesign sections. Do not substitute a
different grid, composition, content, or interaction pattern merely
because you consider it better.

When intent is uncertain, preserve the supplied composition. Identify
structural improvement suggestions separately; implement them only when
the user explicitly requests or approves them.

Before desktop review, briefly record which inconsistencies were
normalized and which shared rules were applied.

## Visual refinement tools

Read docs/DESIGN-TOOLS.md when starting desktop work or correcting supplied annotations. Capture a short reference passport in BRIEF.md, preserving the supplied structure. Use the local Design tools panel for registered shared/desktop token preview and source saving; update the explicit project baseline after deriving the initial token system. Use the spacing inspector to compare repeated roles after motion settles, and the Storybook Typography Playground to inspect wrapping before committing fonts. Marked screenshots identify the correction target; they do not authorize unrequested structural changes. Edit the affected image asset under IMAGE-ASSETS.md without regenerating the whole page. Design variations remain opt-in.

## Mandatory desktop motion

Follow [MOTION-DEFAULTS.md](docs/MOTION-DEFAULTS.md) as the single motion contract: **GSAP ScrollSmoother, shared masked element entrances, and expressive GSAP button/button-link hovers**. Build and observe these during desktop work. Color-only button hover is insufficient. Use one animation owner per property, separate scroll/reveal/hover layers, scoped React cleanup and shared tokens. Preserve user-supplied GSAP effects rather than layering conflicting defaults over them.

Use the same mask primitives for first-screen and section elements; a separate header/hero timeline, gallery research and supplementary effects are not mandatory. No first-screen parallax. Keep reduced-motion, touch/native-scroll and visible-content fallbacks from the contract. Required unobserved behavior keeps desktop completion pending; early drafts remain welcome. Full browser/viewport QA stays after approved desktop and authorized mobile.

## Required invariants

- Use Next.js App Router and strict TypeScript. Do not replace the stack without a request. Default to Server Components; use client boundaries for state, events, and browser APIs.
- The only source of design values is `src/design/tokens.json`. After changes, run `npm run tokens`. Do not edit `src/styles/tokens.css` manually.
- Use one CSS system: tokens → base → components → layout. Do not add Tailwind, CSS-in-JS, per-element inline style overrides, or another UI kit alongside it. The token editor may update validated CSS custom properties centrally at the root for temporary preview; this is not an escape hatch for page-local values. An explicitly requested migration must also migrate the audit.
- Authored dimensions, spacing, radii, borders, breakpoints, and durations must be integers. Do not adjust individual screens with fractional pixels. Unitless line-height, opacity, scale, and easing may be fractional. Generate rem values with `calc(N * 1rem / 16)`; do not fix the root font size in px. Fractional browser geometry caused by zoom, grids, or device scaling is not a token defect.
- Within the project site and specimens, all H1 elements must have the same style at the same viewport and root font size; likewise H2–H6. Centralize their visual properties in scoped base.css rules. Documentation chrome has a separate fixed heading scale under `docs/DOCUMENTATION-TEMPLATE.md`; verify each scope independently. Use one H1 per page and a coherent heading outline. Give large decorative text a separate role instead of overriding an H2 in one section.
- Use shared `Button`, `ButtonLink`, `Field`, and `Card` components, and shared navigation/menu primitives when those roles exist. Select variants through props. A new component role needs an implementation, a catalog example, and verification. Do not clone buttons into page files.
- Standard sections use the shared `Section` component and layout tokens. Align heading left edges with the container. Repeat the section-to-heading-group inset, internal heading gap, content gap, and card padding across equivalent sections and pages. Hero is a separate named role. Do not align long headings with fixed heights or manual `<br>` elements.
- Follow `docs/MOTION-DEFAULTS.md` for motion; use `docs/MOTION-LIBRARIES.md` only for diagnostics and optional references. GSAP runtime styles belong in shared client primitives and must not compete with CSS or another timeline on the same property.
- Use `site-assets`, `docs/DESIGN-SOURCE.md` and `docs/IMAGE-ASSETS.md` for assets: export original images and SVG icons/logos from structured Figma designs; generate similar high-resolution imagery for flat references; combine both per region for mixed frames. Verify actual dimensions and preserve crop/identity. Original Figma image fills are valid assets; flattened page/section screenshots are not production photo crops. Preserve separately supplied official assets.
- Actions support default, hover, focus-visible, active, disabled, and loading states where applicable. Use the shared masked entrances required by the motion contract. Use motion tokens and enable movement only under `prefers-reduced-motion: no-preference`. Avoid transition:all, scroll hijacking, and essential content hidden until JavaScript runs.
- Use native semantics, keyboard support, visible focus, labeled fields, clear errors, and readable contrast in the approved theme(s). Preserve the reference palette; report conflicts before a material color change. Do not automatically switch to dark mode, dim pages, add decorative scrims, or apply brightness filters as an accessibility fix. Use a modal backdrop only when the requested interaction needs one. Buttons perform actions; links navigate. Do not disable zoom.
- Build real Storybook alongside the desktop, following `docs/DOCUMENTATION-TEMPLATE.md`: Foundations / Components / Patterns / Motion / Pages; category/folder/component/Docs-or-story hierarchy; actual source components, typed args, native Controls, event callbacks, and replayable motion. Preserve native light chrome across projects. Complete the project inventory before desktop acceptance; do not delay the first preview. `/design-system` is the supporting Next.js token lab. Before desktop acceptance, adapt the included local token editor and inspector under `docs/DESIGN-TOOLS.md`; persistent token and motion saving are included. Controls are temporary prop previews, not token persistence. Do not build a custom imitation of Storybook.

## Skills to read

Self-contained local skills live in `.agents/skills/`. `site-workflow` routes to the relevant file. Use `site-tokens` for tokens; `site-spacing` for spacing; `site-typography` for text; `site-components` for primitives; `site-responsive` for responsive layouts; `site-motion` for movement; `site-accessibility` for accessibility; `site-assets` for source-aware asset exports and generation; and `site-qa` for handoff. Load only what the task needs. The eleven requested skills are bundled next to the ten site-* skills. Follow `docs/SKILL-ROUTING.md` for their required stage map, explicit better-interface quick/full calls, and conflict resolution. Use each when its subject applies; keep unneeded references and later-stage checks deferred. Do not substitute `interface-design` for `better-interface` or let general skill guidance override the reference-interpretation policy, the native Storybook documentation, or delivery order.

## Completion

Register new pages in `tests/site.config.ts`. Only after the workflow reaches stage 4, run `npm run check` and `npm run test:browsers`, then inspect mobile/desktop layouts, zoom, and keyboard behavior using `docs/QA-CHECKLIST.md`. Check shared-token changes across every route during this QA phase. For an earlier desktop handoff, report observed desktop motion/interaction results separately from the deferred full browser matrix and mobile work. Dependency presence, a build, and static screenshots cannot establish motion readiness. Required unverified motion states keep desktop readiness pending; show an explicitly unfinished preview with the gap.

Do not weaken tests to obtain a passing result or hide page overflow with global overflow-x:hidden. Fix the source of the inconsistency. Document an intentional new role in `docs/DESIGN-DECISIONS.md`, then add its token, component, example, and test.

Deliver the commands and observed results, screenshots, and remaining limitations. Label checks that were not performed as `not run`, never `passed`. Do not claim perfection or complete WCAG conformance based on an automated test. Do not publish unless publication is part of the user's request.

## Motion studio release

The starter now includes working SplitText headings, Flip layout/reorder interactions, three editable motion starting profiles, and shared replay/pause/resume/finish/slow/reduced-motion preview controls. The same components run on the home page and in the catalog. Use docs/MOTION-DEFAULTS.md for required behavior; docs/MOTION-DIRECTION.md and docs/MOTION-STUDIO.md describe optional references and existing demo controls. Six official GSAP skills are included alongside the original 21 skills and Graft (28 total); load them by task under docs/SKILL-ROUTING.md. Profiles are starting values, not a requirement to make all sites look or move alike. WebGL and additional effect libraries remain project-specific choices. ScrollSmoother is the required smoothing baseline; Lenis is an alternative only when the user explicitly requests or approves replacing it.

Real Storybook documentation and the motion editor are implemented. The local color/size/typography editor and spacing inspector are implemented under docs/DESIGN-TOOLS.md; extend their registered roles for each project. Storybook Controls preview props; they do not persist shared token changes. Follow docs/DOCUMENTATION-TEMPLATE.md for the canonical catalog and token-lab boundary.

## Maintaining the canonical template

When the Git origin is `maisjandesign/codex-nextjs-site-starter` and the user requests a template update, follow [MAINTENANCE.md](docs/MAINTENANCE.md): validate, commit, push the authorized change, and verify the remote result. This convention applies only to the template repository, not projects created from it. No background synchronization is implied.
