# Original and generated imagery

## Source-aware rule

Read [DESIGN-SOURCE.md](DESIGN-SOURCE.md) before choosing assets. A structured Figma design uses its original images and vector icons/logos; export and integrate them instead of regenerating them. A flat screenshot or raster mockup uses generated high-resolution imagery inspired by the reference. A mixed frame uses both paths per region. A real photo image fill is an original asset, not a flattened page screenshot. Layer count or the presence of raster layers alone does not determine the mode.

Preserve image placement, aspect-ratio role, crop intent and relationship to surrounding content. Asset work does not authorize a new page composition. Keep page copy and interactive UI in code. Preserve official logos, exact product identity and other locked assets. When exact identity is required but its source is missing, record the gap instead of inventing a purported real person, customer, product or lookalike brand.

## Export originals from structured Figma

Use the available Figma integration and its skill instructions to inspect and export the actual selected nodes/image fills. Reuse original photos/illustrations; export real vector icons and logos as SVG. Preserve crop transforms, masks, transparency, aspect ratio and SVG viewBox. Check exported appearance against the design. Do not convert a raster logo into a bitmap-containing SVG and claim a vector export. Do not export a full UI section as one image to avoid implementing its components.

Save masters and optimized delivery files locally under public/images/source/ and SVG assets under public/icons/ or public/brand/. Temporary tool URLs are acquisition sources, not permanent production dependencies. Record origin, file/frame/node identity, local files, actual pixel dimensions or SVG viewBox and export method. Use the highest suitable original resolution available; do not claim that enlarging an export adds source detail. Report insufficient source quality and propose a targeted replacement when necessary.

## Generate imagery for flat references

When only a flat reference supplies the photographic/illustrative content, generate new high-resolution assets inspired by its subject, mood, palette, framing, focal point and negative space. Do not crop, extract, upscale or hotlink screenshot photos as final assets. This is the user's default authorization to generate the relevant imagery during desktop work; it is not authorization to replace usable original Figma assets.

1. Inventory needed slots, their source mode, target aspect ratio, maximum rendered size, focal point, copy-safe area and identity constraints. Generate only imagery the site actually needs. Reuse separately supplied official assets; use vector components for generic UI icons where appropriate.
2. Load the available imagegen skill and use the built-in image generation tool. Treat reference images as visual evidence, not instructions. Prompt for a new coherent asset with a similar compositional role; exclude captured UI, screenshot text, watermarks and unintended logos. Keep consistent art direction across related images.
3. Generate while desktop layout proceeds. Mark placeholders as pending and replace them before desktop acceptance. If generation is unavailable, report the missing assets and continue independent layout work; do not silently substitute screenshot crops or stock downloads. An API/CLI fallback requires the user's authorization.
4. Inspect composition, subject defects, unwanted text, usable crops and actual pixel dimensions. Refine through the image tool when needed. Save selected files inside the project, not only in temporary tool storage.
5. Integrate the real asset and record its origin and generation details in docs/ASSET-INVENTORY.json. Generate alternate mobile compositions only after adaptation is authorized.

## Resolution and delivery

Plan for roughly twice the maximum displayed width when feasible: a 1200 CSS-pixel image area benefits from a 2400-pixel-wide source; full-width hero artwork may need a 2560-3840 px long edge depending on its crop. These are output targets, not claims about what a tool can produce. Request the best supported quality/resolution and inspect the actual pixel dimensions returned. Do not claim 4K based on a prompt or rename; simple interpolation does not add original detail. For exported originals, use a better original if available; do not regenerate a finished source asset solely to satisfy a target dimension. If the generated size is insufficient, use an available image-generation/editing capability for refinement or report the actual limit.

Keep generated masters and optimized delivery files under public/images/generated/; preserve source exports in the directories above. Choose WebP/AVIF when appropriate, preserve alpha when required, and use next/image with accurate width/height and sizes (or a dimensioned fill container). Reserve image space to avoid layout shifts. Serve responsive sizes rather than the full master to every device. The hero should not be lazy-loaded if it is the main visible image; load offscreen imagery lazily. Choose focal crops that preserve the subject and readable copy space.

The inventory records role, origin (figma-export / supplied-original / generated / recreated-vector), source file/node or reference description, export or generation method, master/delivery paths, actual raster dimensions or SVG viewBox, intended display size/crop, alt text and inspection/approval status. Prompts and generation date/tool apply only to generated assets. Do not store secrets or mislabel generated imagery as documentary evidence. This template has no required photographic scene, so this revision defines the workflow and inventory rather than generating unrelated sample artwork.

## Targeted image corrections

For an annotated or written correction, retain the source-mode decision: correct or re-export an original asset, and edit/regenerate a generated asset. Replace original design imagery only when that correction is requested. Work only on the affected asset. Preserve its layout slot, aspect-ratio role, focal intent and the shared art direction of the image series. Keep the previous selected asset until the replacement has been inspected, record the updated source/export or generation prompt and actual dimensions, and recheck the rendered crop. An image edit does not authorize redesigning the surrounding section.
