# Generated imagery for screenshot-led sites

## Default rule

When a site needs photos, illustrations, textures, or decorative raster artwork, generate new high-resolution assets inspired by the supplied screenshot. The reference defines subject, mood, palette, framing, focal point, and negative space; it is not the file to crop, extract, upscale, or hotlink into the site. Do not reuse screenshot crops as production imagery. This is the user's default authorization to generate the relevant assets during desktop work, without asking again for every image.

Preserve the supplied image placement, aspect-ratio role, crop intent, and relationship to surrounding content when generating replacement imagery. Asset generation does not authorize a different page composition. Keep site layout, real copy, and interactive UI in code. Do not generate a flattened screenshot of the whole page as a replacement for implementation. Preserve separately supplied official logos, icons, exact product identity, or other explicitly locked assets rather than inventing a lookalike brand. This exception concerns identity/source accuracy, not permission to extract raster photos from a screenshot. When identity must be exact but its source is missing, record the gap instead of inventing a purported real team member, customer, or product detail.

## Initial workflow

1. Inventory needed image slots while interpreting the screenshots: purpose, target aspect ratio, maximum rendered size, focal point, palette, lighting, copy-safe area, and identity constraints. Generate only imagery the site actually needs.
2. Load the available imagegen skill and use the built-in image generation tool. Label screenshots as visual references. Prompt for a new coherent image with a similar compositional role and mood; exclude captured UI, screenshot text, watermarks, accidental lettering, and unintended logos. Improve weak framing or composition when it serves the brief; reference inspiration does not require an identical crop. Use the same art direction across related images.
3. Generate while desktop layout proceeds. Temporary placeholders must be labeled as pending in the working brief; replace them before desktop acceptance. If the tool is unavailable, report the missing assets and continue independent layout work. Do not silently fall back to screenshot crops or stock downloads; use an API/CLI fallback only when the user authorizes that path.
4. Inspect the generated result for composition, subject defects, lighting, unwanted text, and usable crops. Refine through the image tool when needed. Save selected assets inside the project, not only in a tool cache or temporary directory.
5. Integrate the real file, inspect its desktop crop, and record it in docs/ASSET-INVENTORY.json. Finish assets as part of the polished desktop milestone. Generate alternate mobile crops or compositions only after adaptation is authorized.

## Resolution and delivery

Plan for roughly twice the maximum displayed width when feasible: a 1200 CSS-pixel image area benefits from a 2400-pixel-wide source; full-width hero artwork may need a 2560-3840 px long edge depending on its crop. These are output targets, not claims about what a tool can produce. Request the best supported quality/resolution and inspect the actual pixel dimensions returned. Do not claim 4K based on a prompt or rename; simple interpolation does not add original detail. If the generated size is insufficient, use an available image-generation/editing capability for refinement or report the actual limit.

Keep a high-quality master and optimized delivery files under public/images/generated/. Choose WebP/AVIF when appropriate, preserve alpha when required, and use next/image with accurate width/height and sizes (or a dimensioned fill container). Reserve image space to avoid layout shifts. Serve responsive sizes rather than the full master to every device. The hero should not be lazy-loaded if it is the main visible image; load offscreen imagery lazily. Choose focal crops that preserve the subject and readable copy space.

The inventory records role, reference description, prompt, generation date/tool, master and delivery paths, actual dimensions, intended display size/crop, alt text, and approval status. Do not store secrets or mislabel generated imagery as documentary evidence. This template has no required photographic scene, so this revision defines the workflow and inventory rather than generating unrelated sample artwork.

## Targeted image corrections

For an annotated or written correction, edit or regenerate only the affected asset. Preserve its layout slot, aspect-ratio role, focal intent and the shared art direction of the image series. Keep the previous selected asset until the replacement has been inspected, record the new prompt and actual dimensions, and recheck the rendered crop. An image edit does not authorize redesigning the surrounding section.
