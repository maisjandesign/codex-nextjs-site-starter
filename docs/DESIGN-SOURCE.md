# Inspect the design source before implementation

Start every website task by identifying the supplied source: a structured Figma design, a flat reference image, or a mixed Figma frame. Record the result briefly in BRIEF.md, then begin desktop implementation. This inspection selects layout evidence and asset sourcing; it does not change the desktop-first workflow, shared design system, Storybook or mandatory GSAP motion.

## Inspect the actual selection

When the user supplies a Figma selection or node link, inspect that exact frame with an available Figma integration and its required skill instructions. Record the file/node identity and capture a visual reference. Inspect the meaningful hierarchy, editable text, components/instances, Auto Layout, constraints, grid, spacing, styles/variables, image fills, masks and vector assets. Distinguish native editable site structure from a screenshot placed inside a frame. Do not claim to have inspected layers based only on a flattened preview.

Layer count is not the decision criterion. Many text/vector fragments or redundant groups can overlay one flattened page without describing its layout. Conversely, a fully structured layout can legitimately contain large photographs as image fills. Judge whether the hierarchy explains actual sections, alignment, dimensions, repeated components and asset placement. Keep useful copy even if its surrounding groups provide no reliable layout evidence.

If layer access is unavailable, mark classification as unverified. Continue from an available preview where possible and state which measurements/exports are unavailable. Do not silently label an inaccessible frame as a flat image or invent exported assets. Ask for a node link or source export only when the missing information blocks the next step. Never alter the original Figma file just to classify or export it.

## Three source modes

| Mode             | Layout evidence                                                                                 | Asset policy                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Structured Figma | Meaningful editable sections, components, text and layout relationships are available           | Export and reuse original images, icons and logos from the design                                                          |
| Flat image       | A supplied screenshot, raster mockup, or a flattened page inside Figma provides the composition | Generate similar high-resolution imagery for photographic/illustrative slots; preserve separately supplied official assets |
| Mixed Figma      | Some regions are structured; others are flattened or have only superficial overlays             | Classify each region and combine original exports with generated replacement imagery where needed                          |

### Structured Figma

Implement the actual design: section inventory/order, composition, hierarchy, grid, alignment, image placement, content and interactions. Derive tokens from real source values and repeated roles. Normalize isolated inconsistencies in spacing, heading sizes, dimensions, radii and equivalent components under AGENTS.md; preserve deliberate differences. Do not replace the supplied design with a new composition or regenerate its finished imagery by default.

Export original raster images at sufficient available resolution, preserving crop/mask intent and transparency. Export vector icons and logos as SVG when a real vector source exists. Preserve vector geometry and brand identity; do not rasterize them unnecessarily or wrap a bitmap in an SVG and call it vector. Keep export masters and optimized delivery files. Exact unavailable brand assets stay marked missing rather than becoming invented lookalikes. Read IMAGE-ASSETS.md for inventory and integration.

### Flat image

Analyze composition and estimate dimensions, spacing, hierarchy and typography, clearly separating estimates from known values. Rebuild the page as real components and editable text. Generate new high-resolution photos, illustrations or decorative raster assets inspired by the reference's subject, framing and art direction. Do not crop the flattened page into production photos, reuse it as the whole website or generate a flattened replacement UI.

Use separately supplied official logos/icons/product identity files when available. Recreate simple generic interface icons as vector components where appropriate; do not generate raster substitutes for vector UI. Request or record missing exact identity assets instead of fabricating them.

### Mixed Figma

Map each meaningful section or region to structured or image-led implementation. A region with real layout, usable components and original image fills follows structured Figma rules. A large flattened section with text overlays, numerous fragmented paths or decorative groups that do not describe its actual layout follows flat-image rules. If almost the whole frame is flattened, use image-led implementation overall while retaining reliable text and genuine source assets.

Do not discard all originals because one region is flat, or regenerate genuine photos simply because photos are raster layers. Export usable original images and vectors from structured regions; generate imagery for flattened reference regions when original assets are not available. Distinguish a real standalone photographic asset from a screenshot of a section that contains UI. Keep one shared token/component system and consistent art direction across both paths. No numeric layer-count threshold substitutes for this inspection.

## Record and verify

In BRIEF.md, record source mode, inspected file/frame/node, short evidence, structured versus flattened regions, confirmed versus inferred measurements, and missing access/assets. In ASSET-INVENTORY.json record each used asset's origin and source node/reference, export or generation method, local paths, actual dimensions or SVG viewBox, intended crop, identity constraints and inspection status. Generation prompts apply only to generated assets.

Before desktop acceptance, compare implementation against the supplied design, verify original asset fidelity or generated-reference fit, inspect crops and resolution, and record normalized inconsistencies. Missing exports must not be disguised as completed work. Full browser/viewport QA remains at its existing later stage.
