# English starter validation

Date: September 7, 2026. Environment: macOS ARM64, Node.js 22.16.0.

## September 23 removal of competing motion recipes

Replaced the cumulative animation material with MOTION-DEFAULTS.md and a three-effect motion.example.json: upward masks, reversible GSAP object hovers and ScrollSmoother. Removed five legacy motion documents, the old sequence/text/Flip components and story, and the three runtime presets. The shared reveal now moves an inner layer upward inside a stationary mask. The page now initializes an actual scoped ScrollSmoother before dependent reveals, with native touch/reduced-motion fallback. The token validator rejects obsolete profile and stagger settings.

Removed conflicting CSS/Motion-library recipes from the bundled Better UI, accessibility, interface-routing and design-taste copies. Deleted the two obsolete Better UI recipe resources. SKILL-INVENTORY.json records original hashes and local adaptations; global skills are unchanged. Startup retains 21 skills with 50 required files and a new committed restoration source, so missing resources cannot restore the removed recipes.

Verified: Next.js build/audit, Storybook typecheck/build, six motion unit checks, eight audit checks, five token editor checks and eight setup checks. All six focused Chromium motion scenarios passed in one run: upward travel/clipping/settling and route return; reversible button fill/label hover with stable hit area; link hover and keyboard focus; reduced preview; sampled smooth scrolling, runtime preference switching and anchors; readable content without JavaScript. Test navigation uses native wheel input for the fixed scroll wrapper and waits for route completion before collecting element lists.

Two focused 1440 px light-theme checks also passed for heading hierarchy, repeated spacing and overflow on the home page and token lab. The full cross-browser/viewport matrix was not run. Storybook was typechecked and built; no claim of complete manual visual review of every story is made. Older validation entries describe earlier versions; removed recipes remain available only in Git history.

## September 23 reduced skill set

Reduced the bundled/required set from 28 to 21 with user approval: removed animate, animation-vocabulary and apple-design, and merged the project-specific requirements of site-spacing, site-typography, site-accessibility and site-components into DESIGN-SYSTEM.md. Routing now applies better-layout, better-typography, better-accessibility and better-ui with that contract. Integer tokens, repeated spacing, H1-H6 consistency, no-dimming accessibility, shared components, Storybook and the GSAP motion contract remain required. Global skill installations are unchanged.

Updated startup counts, active references, upstream inventory and the commit-pinned restoration manifest. All 21 retained entrypoints validate; all 46 retained upstream files remain byte-identical. The manifest covers 52 files. Eight setup tests passed, including restoring the complete shipped set into an empty directory, checking each file against the source and skipping installation on a second pass. Actual setup reports READY for 21 skills and skips already installed dependencies. Historical validation entries below describe their original releases.

Only template instructions, skill packaging and the setup regression test changed. Application UI and dependencies are unchanged. Formatting and local Markdown links were checked; no local production builds or visual/browser QA were rerun for this reduction. CI retains its static checks and builds, fetching the pinned skill history for offline restoration tests.

## September 23 install-first startup

Added dependency-free `npm run setup`, automatic predev/prestorybook hooks and a pinned restoration manifest covering all 28 skills / 60 resource files. Existing valid skill files and installed packages are skipped; missing skill resources restore from the recorded Git commit or verified GitHub bytes. Missing/invalid dependencies install through npm ci with devDependencies included. Setup verifies the Graft executable separately from its SKILL.md and exits unsuccessfully on a blocker instead of marking the environment ready. Concurrent preview starts serialize setup.

Verified locally: seven setup tests for restore/idempotence/customization preservation, supporting-file recovery, network/hash failures, missing Graft installation, failed installation and broken executable handling; three existing Graft tests; actual repeated setup skipped installation. Both predev/prestorybook hooks ran successfully and Next.js/Storybook returned HTTP 200 after permitted localhost binding (the initial sandboxed launches were blocked by port permissions). These were startup/HTTP checks, not visual motion or full browser QA. No application UI source or package versions changed.

All 60 manifest files match the pinned source commit; all 50 upstream provenance hashes remain unchanged. Formatting and local Markdown links were checked. CI now performs setup from a clean checkout before its existing static checks/builds; browser QA keeps its existing readiness gate.

## September 23 Graft integration

Added the unmodified official Graft skill and MIT license, pinned CLI `@nanonets/graft@0.19.0`, project-local structural commands, startup/shared-change routing and CI smoke tests. There are 28 skill entrypoints. All 50 inventoried upstream files match their hashes; the previous 48 files and their inventory entries remain unchanged. Existing locked dependency entries are unchanged; Graft and its dependencies were added as development tooling.

Verified locally: structural build/map/check, targeted ask, Button/ButtonLink skeleton and a cross-file useMotion caller query. The structural graph indexed 56 files at validation time. Three Graft smoke tests passed, including rejection of global init/deep commands through the wrapper. The graph is Git-ignored; no global initialization, hooks, MCP configuration or deep/LLM processing was performed.

Formatting, static design audit, eight auditor tests, five motion tests, five token-editor tests, Next.js production build, Storybook TypeScript and Storybook production build passed. Storybook retained its large-chunk build warning. Skill frontmatter validation passed for all 28 entrypoints. Browser/viewport and visual motion checks were not rerun for this tooling integration; application UI source was unchanged. These results do not establish new desktop motion readiness.

## September 23 design-source classification

Added startup classification for structured Figma, flat image and mixed frames. Asset rules now export original images and SVG icons/logos from meaningful structured designs, generate imagery for flat references, and combine both per region for mixed frames. Layer count and ordinary photographic image fills do not establish a flattened source; typography overlays alone do not establish structured layout. Preserve useful copy, source identity, local token normalization and all existing motion/delivery requirements.

This revision changes English documentation and two authored skills only. No Figma frame was supplied for inspection and no assets were exported or generated in this task. Validate formatting, local links, changed skills and unchanged upstream hashes before publishing. Application builds in CI check the existing demo, not execution of this new source-selection workflow.

## September 18 local design tools release

Added a development-only shared token editor with validated preview, persistent source saving, cancellation, explicit baseline reset, and source conflict detection. Added a registered-role spacing inspector and four native Storybook Typography Playground stories. The index now contains 35 stories and 10 Docs entries. Updated startup rules and skills for a short reference passport, annotated corrections, and targeted image editing. The earlier release notes below are historical; the wider token editor is now implemented.

Validation passed: 5 token editor/store tests, 8 auditor tests, 5 motion validation/evidence tests, generated-token/CSS/JSX audit, formatting, Next.js production build and TypeScript, Storybook TypeScript and static build. Token tests cover invalid/fractional input, heading/spacing constraints, unrelated-source preservation, stale-edit conflicts, and rollback after a simulated CSS write failure. Endpoint checks against actual local development/production servers observed foreign-Origin rejection (403), fractional-value rejection (400), production GET/POST denial (404), and no production editor controls.

Focused browser review observed a shared control-height preview from 48 to 56 px; fractional 56.5 rejection with the last valid 56 px preview retained; Save writing source and surviving reload; Cancel restoring 56 from a 64 px draft; baseline reset and Save restoring original 48 px source; accent preview reaching the real button; system serif preview reaching headings; and unsaved color/font drafts surviving Next.js navigation. Source JSON and generated CSS were restored to the original baseline after these checks. Next.js Fast Refresh can fully reload after a source save and close the panel; this is documented.

At 1440 x 900, the inspector matched all registered token-lab blocks after motion settled. Repeated section insets changed together from 64 to 80 CSS px and matched the new token; heading gaps, content gaps and the 120 px centered-container left edge matched. Keyboard-accessible block selection and pointer selection both produced an outline. Browser error logs for this Next.js session were empty. Native Storybook Controls changed the specimen to the editorial system font and a longer headline while keeping documentation chrome unchanged; a screenshot was visually reviewed. Rebuilding the static output during an open session briefly produced a stale chunk request; reloading the completed build restored the stories.

Not run: a full browser/viewport matrix, complete accessibility audit, all motion scenarios, performance profiling, branded font loading, and cross-application unsaved-draft synchronization. Conflict and write-failure paths were verified by Node tests, not browser fault injection. System font fallbacks are platform-dependent. The inspector covers registered section/hero/card roles rather than arbitrary project layouts. Existing deferred QA rules remain in force. Storybook large-chunk/global-settings warnings remain non-blocking.

## September 14 native Storybook release

Implemented real Storybook 10.6.0 with the Next.js Vite adapter, native light manager, Autodocs, Controls, Actions, Interactions, code display, and accessibility inspection addon. The static index contains 31 stories and 9 Docs entries across Foundations, Components, Patterns, Motion, and Pages. Stories import actual production components and token CSS. The preview transform scopes original CSS; no separate imitation of the component library was created. The Next.js /design-system route is retained and labelled as the supporting token lab. Source saving is hidden in Storybook's GSAP controls; its preview controls remain available.

Updated AGENTS.md, startup instructions, workflow, component/token/motion skills, and design-system documentation to make native Storybook the shared project documentation contract. This supersedes the older custom-shell specification. The wider persistent color/size editor remains project work. Controls do not save shared tokens or synchronize unsaved drafts across applications.

Validation: Next.js production build, Storybook static build, Storybook TypeScript check, token/CSS/JSX audit, 8 auditor tests, and 5 motion validation/evidence tests passed. Installed versions: Next.js 16.3.4, React and React DOM 19.2.8, Storybook and Next.js Vite adapter 10.6.0, Vite 8.2.1. These versions built together successfully. Full viewport/browser regression and accessibility certification were not performed.

Focused desktop review used the Codex in-app browser at 1440 x 900. Observed the native category/folder/component/Docs-or-story tree, generated Button Docs and source controls, Canvas, live label edits and reset, disabled=true and secondary variant propagation to the source button, theme changes confined to the project preview, and a passing Click Interaction story. Its click and callback assertion both passed in the Interactions panel; Actions displayed the onClick event. This focused evidence does not claim every story or all production routes were visually audited.

Non-blocking build warnings: local sandbox prevents writing Storybook's global settings file; the static build still completes. Vite reports large Storybook documentation/test-tool chunks. One native manager popover warns about a future Storybook 11 ariaLabel requirement. A deprecated manager layout option found during review was corrected. Rebuilding while a static preview was open invalidated cached chunk URLs; a page reload recovered it. Do not confuse that stale build session with a fresh-build runtime defect.

## September 14 supplied-design policy revision

Replaced creative interpretation with the user's Implementing supplied designs section in AGENTS.md. Synchronized the startup prompt, workflow, skill routing, brief, typography/workflow/motion skills, and system/motion/asset guidance. Structural suggestions require explicit user authorization; local normalization preserves the supplied composition and intentional role differences. Earlier creative-reference notes below are historical and superseded.

This release changes Markdown instructions only. Application source, dependencies, tests, the then-current demo, and all 48 upstream skill snapshot files remained unchanged. No build or browser suite was rerun for this documentation-only revision. Packaging verifies formatting, local Markdown links, all 27 skill entrypoints, upstream hashes, English content, exact archive bytes, and unchanged non-Markdown files.

## September 12 creative-reference documentation revision

Updated startup instructions, workflow, skill routing, brief, design-system rules, and relevant site skills so images default to creative interpretation. Exact reproduction requires an explicit request. Accepted desktop, documentation shell, motion/image policy, and delivery order remain protected. This revision changes documentation and local skill instructions only; application code, dependencies, and tests match the preceding library-motion archive. No build or browser suite was rerun for this policy change. Release verification covers document formatting and links, all 21 skill entrypoints, the 42 unchanged upstream skill snapshot hashes, English content, and ZIP integrity/exact bytes.

## Verified versions

| Tool                | Version |
| ------------------- | ------- |
| Next.js             | 16.3.4  |
| React               | 19.2.8  |
| TypeScript          | 5.9.3   |
| Playwright          | 1.63.0  |
| axe-core/playwright | 4.13.0  |
| Prettier            | 3.9.6   |

## September 8 skill integration

Bundled the eleven requested design/motion skill directories beside the nine site-* skills. Added startup/stage routing, scoped better-interface review calls, conflict resolution, and a file-hash inventory. Skill sources were found in the general Codex folder and the Video Director project; originals are unchanged. Application source, CSS, dependencies, and browser tests are unchanged. No application build or browser suite was run for this skill/documentation update. All 20 entrypoints passed quick_validate.py; npm run format:check passed; all local Markdown references resolved. All 42 copied skill files match their recorded source hashes, including the explicit-only better-interface policy. Copied source packages are excluded from formatting to preserve their exact bytes, while project documents and code remain covered. ZIP contents and English text were checked during packaging; application source remains byte-identical to the verified baseline.

## September 8 documentation shell specification

Added docs/DOCUMENTATION-TEMPLATE.md after visually inspecting the supplied Wix Button documentation. It specifies permanent documentation chrome, reusable component pages, project-specific content, and style/token isolation. Updated project rules and relevant skills to use it. The application shell and editor remain implementation requirements, not delivered runtime features. This revision changes 16 Markdown files only; no application build or browser test suite was run. All nine local skills passed validation, Markdown formatting passed, and local document links resolved. The ZIP was checked for English content, integrity, required skills, and exact source bytes.

## September 8 documentation revision

The rules now require screenshot-led desktop refinement, entrance/interaction motion, consistent shared roles and spacing, and a synchronized design system with a live token editor before desktop acceptance. Mobile still requires authorization after desktop approval; browser QA remains after both layouts are ready. Accessibility guidance preserves the reference theme and forbids automatic dimming or unsolicited recoloring.

This revision changes documentation and nine local skill instructions only. The demo's read-only catalog, OS/saved-preference theme logic, source code, dependencies, and browser tests remain unchanged. The editor is a documented implementation requirement, not an implemented or tested feature. The previous browser results below cannot validate it. No application build or browser suite was run for this documentation change. The nine local skills passed quick_validate.py, Markdown formatting passed Prettier, and local Markdown file links resolved. Only 19 Markdown files differ from the previous desktop-first archive; application implementation is unchanged. The release archive was checked for English content, ZIP integrity, required skills, and exact file bytes.

## Previous workflow-only revision

The delivery rules, nine skills, documentation, and CI schedule now follow docs/WORKFLOW.md. Desktop implementation and user revisions precede mobile authorization; browser QA follows completion of both layouts. Source components, CSS, tokens, and browser test code were not changed by this revision.

The 150 browser results and screenshots below belong to the previously verified English demo build. Browser suites were not rerun for this documentation/CI change. They are not evidence of approval or completion for a new site. Skill structure, document formatting, local references, archive contents, and CI browser conditions were checked for this revision; the hosted GitHub workflow was not executed.

## Previous English demo results

| Check                                                        | Result                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------- |
| Generated tokens.css is up to date                           | PASS                                                                |
| Static token, CSS, and JSX audit                             | PASS                                                                |
| Negative auditor tests                                       | 7 / 7 PASS                                                          |
| Nine SKILL.md files validated with quick_validate.py         | 9 / 9 PASS                                                          |
| Prettier                                                     | PASS                                                                |
| Next.js production build and TypeScript                      | PASS                                                                |
| Chromium                                                     | 50 / 50 PASS                                                        |
| Firefox                                                      | 50 / 50 PASS                                                        |
| WebKit                                                       | 50 / 50 PASS                                                        |
| Browser matrix total                                         | 150 PASS, 0 failed, 0 skipped, 0 flaky                              |
| Source and documentation scan for remaining Cyrillic         | PASS: no matches                                                    |
| Representative mobile/desktop screenshot review, both themes | PASS: no evident clipping, alignment drift, or broken text wrapping |

The interface, accessibility labels, metadata, form messages, test examples, instructions, documentation, and prompts are in English. The nine local skills were already in English. The HTML language is `en`. All eight evidence screenshots were regenerated from the English build.

Final browser command: `npm run test:browsers -- --max-failures=3`, completed in 29.4 seconds. Browsers were installed in a temporary environment directory; that path is not required on another machine. Use START-HERE.md for normal setup.

Each engine ran 44 geometry checks (2 pages × 11 widths × 2 themes) and 6 scenarios: keyboard/form/theme, loading/reduced motion, text enlargement, hover/active, expanded token groups, and 404 navigation. Axe checks both pages in both themes at 390 and 1440 px, plus the expanded catalog.

Measurements include heading font-size, line-height, weight, and family; container width and gutters; heading left alignment; section top/bottom padding; actual heading and content gaps; card padding; and button radius, minimum height, padding, and colors.

Negative tests intentionally supply fractional dimensions, raw spacing, unknown tokens, raw colors, local heading/button overrides, transition:all, removed focus outlines, inline styles, and native buttons that bypass the shared component. The auditor detects these violations.

## Screenshots

| Page           | Desktop                                   | Mobile                                  |
| -------------- | ----------------------------------------- | --------------------------------------- |
| Home, light    | [1440 px](evidence/home-1440-light.png)   | [390 px](evidence/home-390-light.png)   |
| Home, dark     | [1440 px](evidence/home-1440-dark.png)    | [390 px](evidence/home-390-dark.png)    |
| Catalog, light | [1440 px](evidence/system-1440-light.png) | [390 px](evidence/system-390-light.png) |
| Catalog, dark  | [1440 px](evidence/system-1440-dark.png)  | [390 px](evidence/system-390-dark.png)  |

Aggregated results: [summary.json](evidence/summary.json).

## Scope and limitations

- Tests use Playwright WebKit, not the complete Safari application. On macOS, the keyboard test uses Option+Tab to include links.
- Text enlargement at 200% was tested automatically. Real browser zoom, physical devices, a screen reader, and forced-colors were not manually tested.
- Lighthouse, field Web Vitals, SEO on a real domain, CMS integration, and server-side form submission were not tested. The demo has no such integrations and labels its form as local.
- New pages, fonts, data, and components require another audit and visual review. Screenshots are evidence for this revision; comparison against approved visual baselines is not configured.
