# Design decisions

## Starter baseline

- Next.js App Router was selected at the user's request.
- One CSS system and shared components reduce accidental overrides.
- Integer source dimensions and rem calculations preserve both spacing rhythm and text scaling.
- A stepped type scale keeps integer values at the control widths; fluid clamp typography is not used.
- The main container is 1200 px wide, with consistent spacing for standard sections. Hero has a separate role.
- The neutral green palette is a demonstration, not a requirement for future sites.
- System fonts require no network access during the build. Inter is used only if already installed; a licensed local font can be added separately.
- The demo reads OS/saved theme preferences after hydration and initially renders light. This is existing demo behavior, not the rule for new screenshot-led sites: replace it with the approved reference theme during desktop implementation; add alternate themes only when requested.
- The starter interface, metadata, documentation, prompts, skills, and test examples are in English. Future site languages should follow the project brief.

## Delivery sequence

Implement and show desktop promptly, apply desktop revisions, ask about mobile after approval unless already authorized, then run full browser QA when both layouts are ready. Build shared components, tokens and Storybook alongside the site. Observe the three GSAP effects under MOTION-DEFAULTS.md during desktop implementation. See WORKFLOW.md.

## Permanent documentation shell

The earlier Wix-inspired custom shell is superseded by the user's September 14 request for actual Storybook hierarchy and behavior. Version 2 implements native Storybook with Foundations / Components / Patterns / Motion / Pages, Autodocs, Controls, event callbacks, and real source-component stories. The manager stays light and project CSS is scoped to specimens. /design-system remains the Next.js token lab; Controls do not persist tokens. See docs/DOCUMENTATION-TEMPLATE.md.

## Supplied design preservation — September 14, 2026

The user's supplied Implementing supplied designs text in AGENTS.md replaces the September 12 creative-interpretation default. Screenshots and mockups define the design. Derive shared tokens/components from the references, correct only local inconsistencies, and preserve intentional role differences. Keep uncertain composition intact. Structural suggestions require an explicit request or approval before implementation. Record normalized inconsistencies and shared rules before desktop review. Desktop/mobile sequencing, motion review, image-generation rules, and the native Storybook documentation remain in place.

## New decisions

Record the problem, selected role/token, affected components, mobile/desktop impact, and verification method. For an exception, specify its scope and rationale instead of disabling the entire project audit.
