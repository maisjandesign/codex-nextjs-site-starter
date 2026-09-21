---
name: site-typography
description: Maintain one responsive H1–H6 scale, readable text and consistent wrapping throughout this starter.
---

# site-typography

Use the bundled better-typography skill(s) at the current stage under docs/SKILL-ROUTING.md. Project scope and the workflow resolve conflicting defaults.

Follow docs/WORKFLOW.md. Apply these design conventions while implementing the current phase; the full browser regression suite and cross-browser/multi-viewport matrix belong to stage 4, after the desktop is approved and the authorized mobile adaptation is complete. Desktop motion and interactive-state browser review is required earlier under docs/MOTION-LIBRARIES.md; focused automated reproduction is allowed. Do not delay the first desktop preview for a complete audit or catalog. Finish the relevant design-system examples alongside the polished desktop before acceptance.

Derive a coherent integer desktop scale from the supplied design. Normalize slightly inconsistent sizes and repeated text roles while preserving the content hierarchy, layout, and intentional role differences. When a measurement or intent is uncertain, choose the value most consistent with surrounding references without recomposing the design. The demo sizes are not mandatory for every site. Use semantic h1–h6 and central base.css styles. One page-level H1; properly nested section headings. For the same viewport, root font size and theme, each project heading level must have the same computed font-size, line-height, weight and family across routes.

Documentation chrome follows the separate fixed scale in docs/DOCUMENTATION-TEMPLATE.md. Scope its rules to Docs* roles and compare them across documentation pages; project specimens retain the site scale. Do not let either scope leak into the other or disable heading checks to accommodate them.

Do not choose the HTML heading level just for appearance. Add a named decorative text role separately if needed, without overriding headings locally. Source font sizes must remain integers; keep unitless line-height. Do not set root font-size in px or disable zoom.

Use real language and readable wrapping in the desktop draft. Adapt mobile form typography only in the authorized mobile phase. During final QA, check long headings, links, 200% text resize and mobile form inputs. Prefer natural wrapping and max line measure; avoid manual line breaks as layout patches. Font changes require reviewing wrapping and page heights. License and self-host font files with next/font/local if added; loading a font name in CSS does not bundle that font.
