# Design decisions

## Template demonstration

- All template UI, documentation and Storybook examples are in English.
- Skill installation is a required gate. `npm run setup` installs verified project-local GSAP, better-ui and Graft skills, restores the pinned Graft CLI and builds its source index. Only a successful project-specific verification permits layout work.

- This is a fresh reusable code template, not a reconstruction of a supplied Figma file.
- The demo uses Manrope Variable, neutral backgrounds and a lime accent. Replace these with the next reference's identity.
- All authored layout/font tokens use integer multiples of 8px. Borders 1px and focus outlines 2px are technical exceptions. Browser layout/interpolated motion and original SVG geometry are not quantized.
- Typography changes only at shared breakpoints. Desktop H1 96/104, H2 64/72, H3 32/40; tablet H1 64/72, H2 48/56; mobile H1 40/48, H2 32/40, H3 24/32. Body 16/24 everywhere. These are starter values, not universal sizes for every brand.
- Smooth scroll is enabled for a fine pointer and disabled for reduced-motion. Touch stays native.
- The `/system` page demonstrates tokens. The separate Storybook is served with `npm run storybook`.

For the next project add source → normalized token mappings and any unavailable font, generated-image substitution or derived responsive behavior. Do not reuse the demo's decisions as evidence about the new reference.
