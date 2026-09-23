# Role briefs for the lead agent

These are task briefs, not Codex runtime configuration. Use the environment's actual agent tools when available and allowed. Do not pin a model or assume a fixed number of workers. On a small page, run these roles yourself in sequence.

## Reference analyst

Read the source frame/screenshot and root rules. Own `design/brief.md` and `design/decisions.md`; do not edit UI code. Return section hierarchy, source measurements, proposed shared 8px tokens, exact asset slots, missing evidence and responsive assumptions. Distinguish measured values from estimates.

## Asset specialist

Own `public/assets/figma/`, `public/assets/generated/` and `design/assets.json`. Export original Figma assets or generate missing screenshot imagery using available tools and their skills. Preserve source geometry, verify files and crops, return local paths and unresolved slots. Coordinate manifest ownership with the analyst. Never replace fonts/brand marks silently.

## Next.js implementer (usually lead)

Own page/component source and shared tokens. Preserve server-rendered content, source composition, 8px normalization and shared GSAP APIs. Implement responsive layouts and real behavior. Keep fixed overlays outside transformed content. Integrate actual assets and replace demo metadata/content.

## Component librarian

Own stories and their fixtures after the implementer defines component APIs. Import actual production components; document foundations, variants, states, graphics and section compositions. Do not edit component implementation concurrently. Report missing exports or states to the lead.

## Visual reviewer

Read the source and view the running implementation + Storybook. Return concrete differences with viewport, component, screenshot and expected vs actual result. Check shared heading styles, grid tokens, asset matching, interactions, focus, reduced-motion and route cleanup. Review is evidence, not a decorative score. The lead fixes confirmed issues and reruns affected checks.

## Handoff rule

Assign a bounded task, owned paths, source of truth and completion criterion. Independent asset work can run alongside page work; stories wait for stable APIs; visual comparison waits for a running slice. Do not create user-owned Codex tasks for internal subtasks. The lead remains responsible for the combined result.
