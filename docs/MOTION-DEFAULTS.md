# GSAP: the three retained effects

This file is the only project animation specification. Implement exactly these three families during desktop work: **upward masked entrances, GSAP object hovers and GSAP ScrollSmoother**. Generic skill examples are API reference only; they do not authorize additional effects. Use this contract when old archives or project copies contain a conflicting motion recipe. A new effect requires a specific user request.

## 1. Upward entrance inside a mask

Use one shared `MotionReveal`: a stationary clipping wrapper and a separate inner layer moving upward from positive Y to zero. Apply it to header elements, headings, text, media and local content groups. Reveal once on first entry with ScrollTrigger; returning to an already seen element must not hide it again. No opacity-only replacement or horizontal wipe.

Keep SSR/no-JavaScript content visible. If content was already painted before initialization, retain its visibility and use a short upward movement inside the mask rather than hide it again. Explicit replay may restart the full mask. Release clipping when complete so focus rings, shadows and descenders remain intact. Reduced motion shows the final unclipped state immediately. Do not mask a whole page or animate nested wrappers over the same content.

## 2. GSAP hovers on interactive objects

Use a shared reversible GSAP interaction for each existing interactive role: buttons, button-links, navigation links, tabs and clickable cards when present. Buttons use a fill sweep and label movement; an object's visual layer can move while its hit area stays fixed. Color changes alone do not satisfy the requirement. Do not invent controls or make static content focusable to demonstrate hover.

Pointer enter/leave and keyboard focus/blur control the same timeline. Quick repeated entry/exit must reverse from the current position, without stacked tweens. Preserve keyboard focus feedback after pointer exit. Disabled/loading controls do not play an active hover. On touch and reduced motion, preserve static state feedback. Hover never changes a tab's selected panel.

## 3. GSAP smooth scrolling

Use one `ScrollSmoother` instance with `ScrollTrigger` for the page, created before dependent reveal triggers. Keep its content wrapper transform under its sole ownership. Use `effects: false`, native touch scrolling and native scrolling for reduced motion. Keep fixed overlays outside the transformed content. Native anchors, skip links, keyboard focus and route restoration must remain usable.

Use scoped React lifecycle cleanup and refresh measurements after fonts, images or relevant layout changes. Do not add another scroll engine or another scroll loop.

## Shared implementation and settings

- Read `.agents/skills/site-motion/SKILL.md`; use the relevant GSAP references only to implement these three families.
- Use shared settings in `src/design/tokens.json`, generated CSS and the validated GSAP controls in the token lab. Author durations and distances as integers; convert milliseconds to GSAP seconds at the boundary.
- Give scrolling, reveal and hover separate DOM layers and property ownership. Use `useGSAP` and scoped media contexts; remove listeners and revert owned animations on unmount. Do not globally kill other components' triggers.
- `docs/motion.example.json` is a scope/example manifest for these three families, not another runtime configuration or a source of numeric tokens. Never copy an older exact-port manifest into a project.

## Verify during desktop implementation

Show an early desktop draft. Before calling it complete, observe the real page and its Storybook specimens: upward travel inside a stationary mask, settled content after scrolling back, interrupted/repeated hover, focus, smooth scrolling, anchors and route changes. Check runtime reduced-motion switching and readable no-JavaScript content. Fix flicker, clipping and overlapping property owners.

Record observed results and unverified states in BRIEF.md. Installed packages, valid JSON, a build or static screenshots do not prove these effects work. Full browser/viewport QA still follows approved desktop and authorized mobile under WORKFLOW.md.

## API references

- [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/)
- [GSAP React lifecycle](https://gsap.com/resources/React/)
