---
name: site-accessibility
description: Preserve semantics, keyboard access, focus, forms and reduced motion while keeping the approved screenshot palette and theme.
---

# site-accessibility

Use the bundled better-accessibility skill(s) at the current stage under docs/SKILL-ROUTING.md. Project scope and the workflow resolve conflicting defaults.

Follow docs/WORKFLOW.md. Apply usability conventions during implementation; verify implemented desktop keyboard/focus and reduced-motion behavior during the motion review in docs/MOTION-DEFAULTS.md; defer the full automated accessibility/browser suites to stage 4. Do not delay the first desktop preview for an audit.

Preserve the approved reference theme. Do not enable OS-driven dark mode, silently change brand colors, dim the page, apply global brightness filters, or add decorative scrims to address accessibility. A backdrop is appropriate only for an actual requested modal interaction. Report a contrast conflict with the affected pair and propose a targeted adjustment; obtain a decision before a material change to reference colors. Never describe an unresolved contrast issue as passed.

Use native interactive elements before ARIA, visible labels for inputs, descriptive names for icon-only controls, visible focus, and keyboard access for every interaction. Associate actionable form errors, set aria-invalid, and focus the first invalid input after submission. Buttons act; links navigate.

Keep a skip link, one main landmark, and a coherent heading outline. Do not communicate status through color alone or disable zoom. Follow the project target-size policy without overlapping targets. Respect reduced motion while keeping content and state feedback visible. Menus/dialogs need correct keyboard and focus behavior.

During stage 4, run axe, keyboard/form tests, and reduced-motion checks for approved themes. Manually verify tab order, focus, browser zoom, and relevant screen-reader behavior. Automated results do not establish complete WCAG conformance.
