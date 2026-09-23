---
name: gsap-next-motion
description: Apply or refine this template's GSAP smooth scroll, masked line/block/image reveals and button hover effects in Next.js App Router, including route lifecycle, touch behavior and reduced-motion handling.
---

# Default motion

Read `src/components/motion/` and `src/lib/motion-config.ts` before introducing new animation code. Reuse the infrastructure; do not start a second scroll engine.

| Need | Use |
| --- | --- |
| Page-wide scroll | One `MotionRoot` in root `layout.tsx`; GSAP ScrollSmoother when any fine pointer can hover, including hybrid devices |
| Heading / plain text | `RevealText as="h1"` or `h2` / `h3` / `p`; SplitText line masks |
| Block / linked text | `Reveal`; one immediate `data-reveal-inner` child |
| Image reveal | `RevealMedia` around the actual image or visual wrapper |
| Button | `MotionButton`; independent GSAP fill, masked label roll and arrow movement |
| Navigation text link | `MotionLink`; independent GSAP underline draw and label shift |
| Same-page anchor | `AnchorLink href="#id"`; shared link hover, real target and hash |
| Image hover | `data-hover-media` on its clipping wrapper |

Use small groups, never nested reveal transforms or a mask around an entire section of controls. Preserve descenders and focus rings. SplitText is for plain text; interactive descendants need `Reveal` instead. Don't hide elements with `opacity:0` in base CSS. SSR and no-JS HTML must remain readable.

Motion defaults are intentional: 1.2s smooth-scroll catch-up, ~0.85s reveal, ~0.075s line stagger, ~0.4s hover. Fractional seconds and interpolation are animation values, not layout dimensions. Don't quantize animation frames to 8px. Design-space translations that are authored explicitly use the grid.

Buttons and text links own their GSAP lifecycle. They must animate without MotionRoot in ordinary component stories, Docs, and portals. Use reversible timelines, keep the pointer hit area stationary, and preserve keyboard focus feedback and the accessible name. Disable decorative hover for reduced motion and disabled controls. Hover state and keyboard focus state must not cancel each other prematurely.

All animation resources must clean up on unmount, route changes and media changes. Keep component-scoped GSAP contexts; never `ScrollTrigger.killAll()` in shared code. When adding async work, verify cancellation after unmount. Avoid per-frame React state and global perpetual RAF loops.

Keep fixed headers, portals and dialogs outside transformed content. Adapt sticky elements with a verified pinning strategy if the source requires them. Avoid ScrollSmoother on touch-only devices, honor reduced-motion changes at runtime, retain native scrollbars and keyboard focus. Parallax, cursor followers and scroll-pinned storytelling are optional only if the reference/brief warrants them.

Verify: refresh/resizing after fonts and images, initial/deep hashes, keyboard tab into unrevealed controls, route forward/back, repeated navigation without duplicate triggers, HMR/StrictMode, reduced-motion on/off, touch and narrow screens. Storybook defaults to static specimens; set `parameters.motion: true` for intentional animation stories, never wrap twice.
