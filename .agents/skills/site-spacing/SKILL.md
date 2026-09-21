---
name: site-spacing
description: Make section margins, heading alignment, content gaps and card padding repeat consistently across pages.
---

# site-spacing

Use the bundled better-layout skill(s) at the current stage under docs/SKILL-ROUTING.md. Project scope and the workflow resolve conflicting defaults.

Follow docs/WORKFLOW.md. Apply these design conventions while implementing the current phase; the full browser regression suite and cross-browser/multi-viewport matrix belong to stage 4, after the desktop is approved and the authorized mobile adaptation is complete. Desktop motion and interactive-state browser review is required earlier under docs/MOTION-LIBRARIES.md; focused automated reproduction is allowed. Do not delay the first desktop preview for a complete audit or catalog. Finish the relevant design-system examples alongside the polished desktop before acceptance.

Read the layout table in docs/DESIGN-SYSTEM.md. Derive the project rhythm from the screenshots and correct inconsistent repeated spacing. Show spacing roles in the desktop design system, including section-to-section gaps and edge-to-heading insets. Equal spacing applies to equivalent roles, not every unrelated block. Use the common container and Section component. Bind page gutters, section padding, heading gap, content gap and card padding to layout tokens. Standard sections share one left axis, one top inset, one internal heading gap and one content gap at each breakpoint.

During stage 4, compare actual bounding rectangles and computed styles using tests/quality.spec.ts. Measure section border edge to heading-group top excluding border width, heading-group bottom to content top, and container left to title left. Compare padding on all four card sides. Long text may increase block height without changing spacing; do not give headings fixed heights to force identical Y coordinates.

Hero is a separate role. A new dense/inset/full-bleed section can be justified by content: name the role, document it in DESIGN-DECISIONS.md, add its tokens and a dedicated comparison group. Never introduce arbitrary margin-left or transform to align one title, or hide overflow. Include every new route in tests/site.config.ts.

Use the included development Spacing inspector under docs/DESIGN-TOOLS.md to compare registered section/hero/card roles, active gutter tokens, and actual geometry. Settle motion before interpreting differences. Extend its role mapping for custom layouts; a matching inspector row is not a full layout audit.
