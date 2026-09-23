---
name: reference-site
description: Build a reference-led Next.js website from a supplied Figma URL or screenshot in this template. Preserve the source composition, normalize its typography and spacing to shared 8px tokens, obtain real assets, and deliver the site plus Storybook.
---

# Reference site

Read root `AGENTS.md`. Complete `npm run setup` and `npm run setup:check` before inspecting or implementing a new layout. GSAP, better-ui and Graft installation is mandatory. Read their installed instructions by path, then immediately begin the supplied reference without requesting another go-ahead. Use English for all output and content unless the user explicitly changes the language.

## Choose the source workflow

- Figma URL: read [Figma workflow](references/figma.md). If both Figma and a screenshot are provided, Figma supplies structure/assets and the screenshot indicates the requested visible state unless the user specifies otherwise.
- Screenshot only: read [Screenshot workflow](references/screenshot.md).
- No reference yet: ask the user to attach the screenshot or provide the Figma frame link. Do not invent a target site. You may set up dependencies and explain the ready template.

## Skill selection

GSAP, better-ui and Graft must be installed and verified first. Discover additional tools and skills from the active session; optional entries below depend on availability. Load only what is applicable.

| Work | Preferred available skill | Fallback |
| --- | --- | --- |
| Read Figma + exports | `figma:figma-design-to-code` before `get_design_context`; `figma` / `figma-implement-design` as applicable | Use another available read/export connector following its own skill. If no access, request access or an exported reference; do not pretend to inspect layers. |
| Missing screenshot raster | `imagegen` | Report unavailable generation and preserve explicit missing-asset slots; do not silently switch to billed CLI/API. |
| Layout/typography | `better-layout`, `better-typography` | Follow local tokens and compare reference geometry. |
| Motion/craft | local `gsap-next-motion`, optionally `better-ui` | The local implementation and checklist are sufficient. |
| Semantics/focus | `better-accessibility` | Use native controls and keyboard review. |
| Visual review | active `browser:control-in-app-browser` + `design-qa-checklist` if available | Report the browser limitation; static build is not visual evidence. |
| Creative gaps explicitly left by user | `design-taste-frontend` or `interface-design` for product UI | Infer conservative additions consistent with the reference. |

Reference fidelity and the user's Next.js/GSAP/Storybook/8px requirements override aesthetic defaults in specialist skills. Do not import a new motion library, swap fonts, add gradients or redesign sections merely because a style skill prefers it. The required skills install locally from the verified bundles; global installation is unnecessary.

## Keep evidence small

Populate `design/brief.md` with source, frame/viewport, section order, known states and unknowns. In `design/assets.json`, record each asset's source, local path, dimensions, usage slot and status. Record grid/font/layout deviations in `design/decisions.md`. Describe generated imagery as similar, not original. Save reference screenshots and QA comparisons in `verification/`, not runtime assets.

Implement → compare → fix demonstrated differences → build both deliverables. Read local `site-component-system` for the completion gate.
