# Local design tools

The starter includes a persistent token editor, spacing inspector, and Storybook Typography Playground. They support the existing desktop-first delivery order and native Storybook documentation contract. The inspiration is Google's [AI UI design guide](https://aistudio.google.com/learn/ai-ui-design-google-ai-studio); the implementation uses this project's own React components and token pipeline, not Google's proprietary editor.

## Open and edit

Run `npm run dev`, open the site or `/design-system`, and select **Design tools**. The panel is available only in Next.js development mode; its APIs return 404 in production. Storybook remains the canonical component catalog. Run it separately with `npm run storybook`.

The editor exposes semantic colors for the existing themes, default/compact control minimum heights, container width, radii, body/label sizes, font family, desktop H1-H6 sizes, and desktop layout spacing. Shared values affect all viewports; mobile/tablet override values cannot be edited here. The existing Motion Studio owns duration, delay, stagger, distance and easing. Additional token groups or component aliases require explicit schema and UI support rather than accepting arbitrary CSS.

Colors are labeled by their actual semantic scope. For example, accent affects all consumers of that shared color, not only one button. Add a dedicated component token when a project needs an independently editable button color. Source values are integer dimensions; layout choices come from the project's spacing scale, and heading sizes must remain descending. Invalid input retains the last valid preview and disables Save until corrected. No automatic recoloring or dimming occurs.

- **Preview:** valid edits immediately update the application's shared generated stylesheet and the token lab's displayed values. Draft state survives Next.js client navigation because the provider lives at the app root. Hard refresh discards unsaved drafts.
- **Save tokens:** sends an allowlisted patch and its original values to `/api/tokens`. The server validates it against current source, preserves unrelated changes, detects conflicts on edited values, writes `tokens.json`, and regenerates `tokens.css`. Both original files are restored if a write fails and rollback succeeds; rollback failure is reported explicitly. The draft is retained on failure. Next.js Fast Refresh may reload the page after saving these shared modules; saved source values survive that reload, while the panel may close.
- **Cancel draft:** restores the last saved values known to the editor. If another process changed source, use Reload saved.
- **Reset baseline:** loads editable values from `src/design/tokens.baseline.json` into a draft. Save is still required. This baseline is explicit and remains unchanged by ordinary saves. When deriving a new project from screenshots, deliberately update this file to the project's initial normalized token system; never silently reset a project to the starter's visual defaults.
- **Reload saved:** discards the current draft and loads current source values. Use it after resolving a source conflict. It does not replace the baseline.

The write endpoint requires development mode, a loopback Host, same-origin HTTP Origin, JSON input, a bounded request body, known editable paths, and validated values. Never expose the development server publicly. This is a synchronous local two-file transaction with rollback, not crash-proof storage or a multi-process locking service. Use normal project version control for recovery.

## Storybook and persistence

Controls in Storybook still change local story props only. The new editor runs in Next.js, not in a Storybook iframe. Source saves flow to Storybook through source reload/HMR or a new static build; unsaved drafts are not broadcast across applications. Native Storybook chrome remains unchanged. Verify actual preview behavior and source files before claiming a change is saved.

## Spacing inspector

Open **Spacing inspector**, then use **Pick a block** or the keyboard-accessible **Choose block** selector. The selected section, hero, or card receives an outline. Pick mode consumes only the selection click and can be cancelled with Escape. It never deletes or restyles the block.

The inspector lists repeated roles and their top inset, content gap, heading gap where applicable, left edge, and expected values from the active token scope. It also compares the centered container's actual left edge against the gutter and maximum-width calculation. Sections use rendered head-to-content geometry; cards and hero use computed padding and grid gap. The hero's desktop column gap is a distinct role. Measured values may be fractional because of font scaling and browser layout, even though authored dimensions are integers.

**Settle motion and measure** finishes registered entrance sequences before measuring. Mid-animation results can temporarily differ. Resize observation and route changes refresh readings. A match is local evidence for these registered roles, not a complete spacing audit: custom layouts must extend the mapping and other geometry still needs normal visual review. Keep the full browser/viewport matrix at its existing final QA stage.

## Typography Playground

Open `Foundations / Typography Playground` in Storybook. Sans, Serif, Mono, and Long Heading stories render the real heading scale, Card, and Button. Controls select the font stack and sample headline; check wrapping and hierarchy with real copy. The specimen's font variable is scoped to its wrapper, preserving the documentation interface.

These are local system font stacks with platform-dependent fallbacks. No Google Fonts integration, remote downloads, licensed font files, or guaranteed Inter installation are included. Load the exact project's fonts explicitly before claiming a match. To apply a stack across the site, use `font.family` in the development editor and Save tokens. TypographyPreview's scoped font variable and DesignProvider's validated generated stylesheet are deliberate centralized preview mechanisms; normal page components must still use shared styles.

## Reference passport and annotated corrections

First inspect and classify the source under [DESIGN-SOURCE.md](DESIGN-SOURCE.md). Use actual Figma layout values where available; distinguish confirmed measurements from estimates. At startup, summarize the supplied reference in 5-6 sentences in BRIEF.md: palette, type hierarchy, grid/alignment, spacing density, component treatments, and intended visual character. Mark approximate measurements and inferred fonts. Preserve composition and intentional role differences. This short record must not postpone the first desktop preview.

For a marked-up screenshot, map each mark to its actual route, section/component, and shared role. Record the requested correction, affected equivalents, and what was observed after the fix. Fix repeated inconsistencies in the shared source; preserve a deliberately unique role. Circling a visual bug is not blanket permission to remove or redesign its section. Only explicit deletion/redesign instructions authorize structural changes. This workflow accepts user-provided annotated screenshots; an in-app drawing editor is not included.

For image corrections, preserve the source mode: re-export/correct originals or edit/regenerate generated assets under IMAGE-ASSETS.md while retaining the layout slot, aspect ratio, focal intent and series art direction. Record actual output dimensions. Use design variations only when explicitly requested; never apply an automatic full-page redesign or reskin Storybook.

## Verification

Run `npm run test:tokens` for input, merge, conflict, and rollback tests. Check actual color/size preview, save/reload, cancellation, baseline reset, invalid input, and source conflicts in a development browser. Verify production GET/POST denial and absence of editor controls. Typecheck and build both Next.js and Storybook. Keep observed results separate from unrun full browser/accessibility coverage.
