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

The user requested desktop-first delivery: implement and show the desktop promptly, allow iterative desktop changes, ask about mobile only after desktop approval, then run browser QA once both layouts are ready. The first preview may be rough, but desktop completion includes reference-informed design improvements, entrance/interaction motion, consistent components/spacing, and a synchronized design system with a working token editor. Build these together without blocking the first preview. This documentation revision specifies the editor; it does not implement it. Browser CI is manually enabled at final readiness; ordinary push/PR checks remain static. See docs/WORKFLOW.md.

## Permanent documentation shell

The earlier Wix-inspired custom shell is superseded by the user's September 14 request for actual Storybook hierarchy and behavior. Version 2 implements native Storybook with Foundations / Components / Patterns / Motion / Pages, Autodocs, Controls, event callbacks, and real source-component stories. The manager stays light and project CSS is scoped to specimens. /design-system remains the Next.js token lab; Controls do not persist tokens. See docs/DOCUMENTATION-TEMPLATE.md.

## Supplied design preservation — September 14, 2026

The user's supplied Implementing supplied designs text in AGENTS.md replaces the September 12 creative-interpretation default. Screenshots and mockups define the design. Derive shared tokens/components from the references, correct only local inconsistencies, and preserve intentional role differences. Keep uncertain composition intact. Structural suggestions require an explicit request or approval before implementation. Record normalized inconsistencies and shared rules before desktop review. Desktop/mobile sequencing, motion review, image-generation rules, and the native Storybook documentation remain in place.

## Desktop motion readiness

A reported project failure showed that checking installed libraries and source components did not establish motion quality. Require observation during desktop implementation and before a completed handoff, including loading, scrolling back, repeated hover, interruption, and real catalog replay. Implement motion alongside sections. Separate implementation status from observed browser results, and do not defer fixes to final QA. Full regression and cross-browser/multi-viewport coverage remain after desktop approval and authorized mobile. This policy update does not assert that the reported flicker or cursor-fill implementation from another project was inspected or fixed here.

## New decisions

Record the problem, selected role/token, affected components, mobile/desktop impact, and verification method. For an exception, specify its scope and rationale instead of disabling the entire project audit.

## Motion studio — September 13, 2026

The user approved the Awwwards-oriented research recommendations. Keep GSAP as the starter engine, implement reusable SplitText and Flip patterns and editable profile values, and add six pinned official GSAP skills with the MIT notice. Osmo/Codrops are discovery sources; their paid code is not redistributed. Lenis and WebGL remain conditional. The motion editor saves only validated motion source values in a local development server; production source writes return 404. Disable Next.js agentRules generation to preserve this template's authored AGENTS.md. Later releases implement native Storybook and the local non-motion Design tools panel; see DOCUMENTATION-TEMPLATE.md and DESIGN-TOOLS.md for current scope.

## Required visible motion — September 14, 2026

A user report showed that a color-only button and absent header/section entrances could survive the previous wording. Header, hero, button/button-link and major-section motion now have explicit acceptance coverage in AGENTS.md and the startup prompt. The baseline also implements a shared reversible fill/label-roll control, header staging and section content entrances. Already-visible generic content now settles instead of skipping movement. Supplied composition remains protected; movement within that composition does not require another approval. Reduced-motion and immediate usability take precedence over decorative movement.

## Coordinated motion revision

Replaced independent header/hero/section entrances with scoped GSAP sequences. Increased source entrance duration to 600 ms, stagger to 90 ms and travel to 32 px; visible text stays readable instead of being hidden after hydration. Added shared link underline motion and actual-frame regression criteria. Preserved layout, content, shared controls and the editable motion pipeline. Excluded first-screen parallax at the user's request. The supplied CSS sandbox informed behavior, not dependency or layout replacement.
