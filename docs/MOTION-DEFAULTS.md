# GSAP motion contract

This is the single motion policy for new sites and motion fixes in this template. It replaces the earlier cumulative animation rules. Implement three defaults during desktop work: **GSAP ScrollSmoother, masked element entrances, and expressive GSAP button/button-link hovers**. Other motion documents describe examples, diagnostics or optional research; they do not add mandatory effects. The user's project-specific animation instructions take priority. Preserve working user-authored GSAP effects and adapt their lifecycle/ownership rather than layering another reveal system over them.

## 1. Smooth scrolling

Use one **GSAP ScrollSmoother** with ScrollTrigger for the site. Keep one wrapper/content pair, create the smoother before dependent triggers, and place viewport-fixed controls outside the transformed content. Disable parallax effects (`effects: false`) and touch smoothing (`smoothTouch: false`). Do not combine page smoothing with Lenis, CSS `scroll-behavior: smooth`, another scroll owner or custom wheel interception. Preserve native scrolling when reduced motion is enabled, for touch-only input and without JavaScript. See the official [ScrollSmoother setup](https://gsap.com/docs/v3/Plugins/ScrollSmoother/).

In Next.js, give the client scroll boundary explicit ownership of initialization and teardown. Do not assume parent and child effect order guarantees that the smoother exists first: coordinate dependent reveals through readiness or one scoped setup. Keep the scroll-content transform exclusive to ScrollSmoother. Verify route changes, scroll restoration, anchors, skip links, keyboard scrolling and focus. Refresh measurements after relevant layout changes, including fonts and images; do not refresh on every animation frame. Do not add first-screen parallax. Pinning and scroll-driven scenes are optional only when the project brief calls for them.

## 2. Masked element entrances

Use a shared GSAP mask primitive for headings, meaningful content groups and media. Include the header/hero and major sections in the motion plan, using the same primitives rather than mandatory separate opening timelines. Animate actual elements or short related groups; do not reveal an entire long page as a single block.

- **Text:** move a line or block through a clipping wrapper. Use SplitText only where line splitting is useful; ordinary block masks do not need it.
- **Media and panels:** reveal a dedicated visual layer through a directional `clip-path` or mask wrapper.
- **Content groups:** use a shared block mask with restrained stagger where appropriate. Do not clip an entire interactive section just to animate its heading.

A real clipping edge must be visible during normal entrance playback. Opacity or translation alone is not a mask. Choose direction and pacing from the supplied design, keeping one consistent language across equivalent roles. Preserve typography, image placement and layout. Small utility controls and dense form content do not each need a separate entrance.

Prepare unrevealed offscreen elements before they enter, then reveal once. Do not hide them again when scrolling back. Fast scrolling, route return and interruption must leave content in its readable final state. Keep SSR/no-JavaScript content visible. For above-the-fold content, use a mask entrance only if it can initialize without concealing already-painted content; otherwise leave that element settled and record the narrow hydration fallback. Do not use this fallback to disable all entrances. Explicit catalog replay may restart a specimen.

Keep masks off the focus ring and hit area. Allow room for text descenders; release temporary clipping after completion when it would cut off focus, shadows or content. When using SplitText, handle font/width resplitting without replaying content already seen. Consult the [SplitText documentation](https://gsap.com/docs/v3/Plugins/SplitText/) for the installed API. Reduced motion shows the final unclipped state immediately.

## 3. Expressive button hovers

Buttons and button-links must have a recognizable **GSAP hover interaction beyond a color change**. Select one coherent treatment for each shared button variant, such as a directional fill with masked label roll, an expanding fill with coordinated icon travel, or another user-supplied effect. These are choices, not effects to stack together. A static shadow, cursor change or press-only scale is insufficient.

Implement the treatment once in the shared Button/ButtonLink primitives. Keep the outer hit area, size and focus ring stable; animate dedicated inner fill, label and icon layers. Decorative duplicate labels must be hidden from assistive technology. Reverse a reusable timeline or replace owned tweens so rapid entry/exit does not queue work or jump. Pointer exit must preserve feedback while keyboard focus remains. Disabled/loading controls stay stable and readable; touch and reduced motion retain immediate static feedback. Pointer hover runs only on hover-capable input.

Existing tabs retain shared GSAP hover/focus feedback and selected-state movement where applicable, using these same ownership and interruption rules. Hover must not activate a panel. Do not add tabs or a second mandatory effect family to satisfy the starter. Menus, links and other controls follow the actual design and interaction brief.

## Ownership and React lifecycle

| Layer                                                 | Owner                              |
| ----------------------------------------------------- | ---------------------------------- |
| Page scroll-content transform                         | ScrollSmoother only                |
| Element entrance mask and moving content              | One shared reveal timeline         |
| Button fill, label and icon                           | Shared button interaction timeline |
| Layout, typography, resting appearance and focus ring | Shared CSS and design tokens       |

A property on a given DOM node has one animation owner. Separate scroll, entrance and hover layers. Before attaching a new primitive, remove or adapt overlapping demo MotionSequence/MotionReveal/MotionText behavior and CSS transitions on its animated properties. Do not globally remove unrelated animations. Do not animate both a long section wrapper and the same child properties independently.

Use scoped `useGSAP`/GSAP contexts, cleanup on unmount and intentional dependency updates. Event-created animations need lifecycle ownership too; cancel pending asynchronous work and remove listeners. Avoid application-wide `killAll` cleanup. Handle runtime reduced-motion changes through a scoped media context. See official [React integration](https://gsap.com/resources/React/) and [matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>).

Use shared motion tokens for easing, distance, duration and stagger. Author dimensions and durations as integers, converting milliseconds to GSAP seconds at the boundary. Unitless progress, scale and easing may be fractional. Inspect actual supported APIs before changing dependencies; a missing animation alone does not establish a React/Next.js version conflict.

## Build and verify

Start with one working scroll boundary, one masked text/media example and one shared button hover on the real desktop. Observe them together, then apply the same primitives to the remaining roles. Load site-motion, gsap-core, gsap-react, gsap-scrolltrigger and gsap-plugins as relevant; use gsap-timeline for sequences and gsap-performance for measured problems. Reference galleries, SplitText, Flip, WebGL and extra engines are optional, not startup prerequisites or a checklist of effects to add.

Populate real Storybook stories with the same mask/button components and replay controls. Keep smoothing inside an isolated full-page preview or the Next.js page, never Storybook's manager. Record the owner, variants, tokens, exceptions and actual observations in BRIEF.md.

Before completed desktop handoff, observe fresh load, wheel/trackpad movement and reversal, mask start/intermediate/end, fast scroll down/back, rapid button entry/exit, focus/activation, applicable disabled/loading states, route return and reduced motion. Verify that no element stays hidden, flickers, loses its hit area or accumulates triggers. Inspect page context as well as replayable specimens. Fix observed defects and recheck the affected behavior. Report unobserved states honestly; imports, builds and screenshots alone are not motion evidence.

A rough early preview is allowed. Focused desktop motion checks happen during implementation; the full browser/viewport matrix still follows approved desktop and authorized mobile under WORKFLOW.md. Never delay all motion verification until mobile.

## Template status

This revision rewrites instructions; it does not repair animations in a previously generated website. The demo includes GSAP masks and button interactions, but has no ScrollSmoother integration or tab component yet. Integrate the three defaults in each actual site and verify them before claiming completion. Historical demo builds and recordings are not evidence for a new project.
