---
name: site-assets
description: Export original Figma images and SVG assets or generate high-resolution imagery from flat references, according to the inspected design source.
---

# site-assets

Read [DESIGN-SOURCE.md](../../../docs/DESIGN-SOURCE.md), docs/IMAGE-ASSETS.md and the phase record before sourcing imagery. Inspect the actual supplied selection when Figma access is available. Classify structured, flat or mixed sources by meaningful layout evidence, not layer count or the mere presence of raster photos. Record unavailable access instead of claiming inspection.

For structured Figma, export original images and real vector icons/logos as SVG through the available integration and its required skill instructions. Preserve crop/mask intent, brand identity and source geometry. Save local originals and optimized delivery files. Do not regenerate finished source assets by default or export a whole UI section to replace implementation.

For flat reference regions, use the available imagegen skill and built-in generation tool to create similar high-resolution photographic/illustrative assets; generation is authorized by this workflow. Do not use screenshot crops as production photos. Preserve separately supplied official assets and use vector components for generic UI icons. Do not invent documentary identities or claims.

For mixed frames, combine export and generation per region. Text overlays or redundant groups over a flattened section do not establish editable layout. Preserve reliable copy and usable originals even when most of the frame follows the flat-image path. Keep one design system and coherent art direction.

Inspect each asset's appearance, crop and actual dimensions or SVG viewBox. Record origin, source node/reference, method, local files and verification in docs/ASSET-INVENTORY.json; generation prompts apply only when generated. Do not claim high resolution from a requested size alone. If source export or generation is unavailable, record the specific gap and continue independent layout; do not invent successful exports or silently substitute assets.

Complete desktop assets before acceptance. Defer mobile art direction until authorized and the full browser/image-layout matrix until final QA. Observe desktop image arrival with required motion; fix flicker and layout shifts during implementation. This skill does not require actual export or image generation for a documentation-only task.
