# Required scrolling, masked entrances and GSAP hovers

These defaults are explicitly requested for websites created from this template. Apply them during desktop implementation, together with the existing header/hero sequence. Do not wait for another animation request. A static screenshot does not waive them. Replacing or omitting the baseline requires an explicit user instruction or approval, except for the fallback conditions below.

## GSAP smooth scrolling

Use **GSAP ScrollSmoother with ScrollTrigger** as the page smoothing layer. CSS scroll-behavior, an anchor tween, or installing GSAP alone does not satisfy this requirement. Start the desktop integration early and verify it on the actual page before desktop acceptance.

Implementation follows the official [ScrollSmoother documentation](https://gsap.com/docs/v3/Plugins/ScrollSmoother/): register both plugins, provide one content element inside one wrapper, and create the smoother before dependent ScrollTriggers. Put viewport-fixed UI outside transformed content. ScrollSmoother uses the native scrollbar. Keep effects disabled to avoid implicitly activating data-speed/data-lag parallax. Touch smoothing is off by default; preserve that baseline during authorized mobile work.

In Next.js, own the smoother in a reusable client boundary. Use one instance, scoped lifecycle cleanup, and an intentional route/scroll-restoration policy; Strict Mode and route transitions must not duplicate it. Refresh geometry after relevant font/image/layout changes. Preserve hash links, skip links, keyboard scrolling, focus visibility, browser back/forward and nested scroll areas. Do not combine it with Lenis or a second page-scrolling owner, intercept every wheel event, or force scroll snapping. Keep native scrolling for reduced motion, touch-only input and no-JavaScript fallback. Respond to preference changes during the session. Store configurable smoothing duration as integer milliseconds in shared tokens, converting to seconds at the GSAP boundary.

Smoothing the page does not authorize first-screen parallax. Hero data-speed/data-lag, differential hero scroll movement and sticky-cover effects remain excluded unless explicitly requested.

## Masked entrances

Use **GSAP-powered masking as the standard entrance language** for major section headings, meaningful content groups and media. Text should move through a line or block clipping wrapper; images and panels should reveal through a directional clip-path or dedicated mask wrapper. Fade-only or translate-only entrances do not replace the required masking. Small utility controls and dense form content do not each need separate reveal choreography.

Build shared primitives with named variants and token-based timing, easing, distance and stagger. Choose mask direction and intensity from the supplied design. Keep typography, composition, reading order and accessible text intact. Give a sequence one property owner; avoid nested masks cutting off the same content twice. Account for descenders, focus outlines, shadows and responsive line wrapping. Recalculate text splitting after font/width changes without replaying already-seen content. Release temporary clipping after completion where it would otherwise cut off interaction states.

Reveal once on entry; already-revealed content stays visible when scrolling back. Fast scrolling and interrupted/replayed timelines must settle visibly. SSR and no-JavaScript content must remain readable. Never hide already-painted essential content just to manufacture an entrance after late hydration: use a visible settle for that affected element and record the exception. Prepare offscreen masks before entry. This exception must not silently disable masking across the page. Reduced motion removes clipping and movement immediately; content and controls remain usable.

## GSAP hovers on buttons and tabs

**Buttons, button-links and existing tabs must use GSAP-powered hover interactions by default.** A color swap, static shadow, cursor change, press-only scale or CSS-only transition does not satisfy this requirement. Implement recognizable motion suited to the reference: for example a directional fill with masked label roll, coordinated icon travel, or a tab underline/background sweep. Keep equivalent controls consistent through shared components and motion tokens; tune intensity by role rather than making every control identical.

Buttons need deliberate entry and reversible exit, keyboard-focus feedback, press/release, and correct disabled/loading behavior. Keep the hit area stable and the accessible label readable; decorative duplicate labels must not be announced twice. GSAP owns the animated properties, with no competing CSS transition or entrance timeline on the same property.

Tabs need hover/focus feedback on each enabled tab and a coherent transition of the selected indicator when selection changes. Selection animation alone does not replace hover animation. Keep selected state, keyboard focus and pointer hover visually distinguishable. Pointer hover must not activate a tab panel or change the reference's interaction model. Preserve tablist/tab/tabpanel semantics and the project's keyboard/activation behavior. Do not invent a tab interface for a design that has none; record it as not applicable.

Use reusable client primitives with scoped GSAP cleanup and reusable/reversible timelines or explicit tween replacement. Fast pointer entry/exit, movement between tabs and selection during hover must not queue animations or leave stale highlights. Reconcile hover and focus: pointer exit must not erase a still-focused state. Restrict pointer hover to hover-capable input; preserve activation and state feedback on touch. Under reduced motion, show static hover/focus/selected feedback immediately without animated movement. Keep focus outlines and interactive content outside clipping that could hide them.

## Startup, catalog and acceptance

Record the ScrollSmoother owner, shared smoothing token, route policy, masked text/content/media variants, button/tab hover and focus variants, selected-tab behavior, and fallback conditions in BRIEF.md. Use site-motion, gsap-react, gsap-scrolltrigger, gsap-plugins and gsap-timeline at implementation time. Keep native Storybook chrome untouched: show actual mask and button/tab primitives in replayable stories with default, hover, focus-visible, active, selected and disabled/loading states where applicable, and smoothing in an isolated full-page story or the Next.js page; never attach a smoother to Storybook's manager.

Before desktop acceptance, observe wheel/trackpad smoothing, scroll reversal, anchor/keyboard/focus navigation, route changes, section masks, button/tab pointer entry and exit, keyboard focus/activation, rapid repeated hovers, tab selection during hover, disabled/loading states, repeated replay and reduced-motion behavior. Check visible mask edges during movement and settled content after fast scrolling and font loading. Record implementation and observation separately. Missing or unobserved baseline behavior keeps desktop readiness pending. Full browser/viewport QA still follows approved desktop and authorized mobile work.

## Implementation status

This September 22 update changes rules and skill routing only. The shipped demo has GSAP, line masks and a directional reveal specimen, and shared GSAP button fill/label-roll motion; it has no tab component yet and does not initialize ScrollSmoother or apply masking to every required role. Do not describe the new baseline as implemented or browser-verified until the project integration is completed. Existing successful builds and historical screenshots do not prove it.
