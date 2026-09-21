---
name: site-motion
description: Apply consistent button feedback and restrained entrance motion using the shared motion tokens.
---

# site-motion

Read AGENTS.md, Mandatory desktop motion, before implementing. Header entrance, coordinated hero, shared expressive button/button-link hover/focus, and major section entrances are required. Color-only hover and press-only scale are insufficient. Missing motion blocks completed desktop handoff. Verify actual page behavior at normal and slow speed; preserve supplied composition and reduced-motion fallback.

Follow docs/WORKFLOW.md. Apply these design conventions while implementing the current phase; the full browser regression suite and cross-browser/multi-viewport matrix belong to stage 4, after the desktop is approved and the authorized mobile adaptation is complete. Desktop motion and interactive-state browser review is required earlier under docs/MOTION-LIBRARIES.md; focused automated reproduction is allowed. Do not delay the first desktop preview for a complete audit or catalog. Finish the relevant design-system examples alongside the polished desktop before acceptance.

Read docs/MOTION-LIBRARIES.md first. GSAP and @gsap/react are installed; use shared MotionReveal patterns and select project-specific library effects from relevant live references. Do not stop at generic CSS fades. Use animate for the desktop implementation sequence and its RECIPES.md for matching effects. Consult animation-vocabulary for ambiguous effect names and apple-design for relevant fluid/gesture interactions. Read docs/SKILL-ROUTING.md first: shared project values, reference theme, and stage boundaries override incompatible recipe defaults. Use src/design/tokens.json motion values. Deliver entrance animations for meaningful blocks and polished hover/active feedback during desktop implementation. Use a shared reveal mechanism with consistent easing, duration, and restrained translate/opacity; reveal once on entry by default and stagger only related items. Do not animate every nested heading or repeatedly restart on scroll. Prefer transform and opacity for movement, name transition properties, and avoid transition:all.

Motion is opt-in inside prefers-reduced-motion:no-preference. Reduced motion must keep all content and state feedback visible without movement. Use static cues such as label, icon or color in addition to animation. Do not hide essential content until a JS observer runs.

Check hover only on hover-capable devices, active on pointer/keyboard, disabled and loading. Replay transitions slowly to check interruption and jumps. Use the selected project engine (GSAP in the shipped demo) for the required motion layer; add another engine only when a selected effect justifies it, without overlapping property ownership. Perform the required desktop motion review in docs/MOTION-LIBRARIES.md before presenting desktop as complete. Watch fresh load, scrolling down/back, repeated hover, interruptions, reduced motion, and actual catalog replay. Fix flicker, disappearing visible content, competing CSS/library property owners, and stuck states; recheck affected interactions. Record actual browser/viewport/scenario results separately from implementation status. If a required check is not run, keep readiness pending and show the draft with the gap. Extend reduced-motion, replay, and lifecycle coverage across browsers/viewports during final QA. No continuous decorative autoplay or scroll hijacking by default.

Motion engine selection: follow docs/MOTION-LIBRARIES.md. GSAP is installed for the demo, but choose GSAP, Anime.js, Motion, or a suitable library component after analyzing each project. No engine is mandatory for every site; keep a coherent shared motion layer and remove unused runtimes.

## Motion studio release

The starter now includes working SplitText headings, Flip layout/reorder interactions, three editable motion starting profiles, and shared replay/pause/resume/finish/slow/reduced-motion preview controls. The same components run on the home page and in the catalog. Read docs/MOTION-DIRECTION.md at startup and docs/MOTION-STUDIO.md for controls and persistence. Six official GSAP skills are included alongside the existing 21 skills (27 total); load them by task under docs/SKILL-ROUTING.md. Profiles are starting values, not a requirement to make all sites look or move alike. Lenis, WebGL, and a second animation engine remain project-specific choices.

Real Storybook documentation and the motion editor are implemented. The local color/size/typography editor and spacing inspector are implemented under docs/DESIGN-TOOLS.md; extend their registered roles for each project. Storybook Controls preview props; they do not persist shared token changes. Follow docs/DOCUMENTATION-TEMPLATE.md for the canonical catalog and token-lab boundary.

## Supplied design boundaries

Follow AGENTS.md, Implementing supplied designs. Add required entrances and hover/active feedback within the supplied composition and interaction patterns. A library demo or motion skill does not authorize new/reordered sections, a different grid, navigation pattern, or scroll-story structure. Present structural motion proposals separately and implement them only when explicitly requested or approved.

## Coordinated sequence implementation

Use [MOTION-SEQUENCES.md](../../../docs/MOTION-SEQUENCES.md) for the shared opening/section API and focused behavior checks. Implement header and hero as one planned opening; each major section owns its heading/content sequence. The same implementation must appear in the live catalog. First-screen parallax is excluded: do not add it as a default or inherit it from a reference sandbox. Desktop motion remains required, with full browser/viewport QA at its existing later stage.
