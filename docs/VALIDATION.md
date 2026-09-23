# English starter validation

Date: September 7, 2026. Environment: macOS ARM64, Node.js 22.16.0.

## September 23 design-source classification

Added startup classification for structured Figma, flat image and mixed frames. Asset rules now export original images and SVG icons/logos from meaningful structured designs, generate imagery for flat references, and combine both per region for mixed frames. Layer count and ordinary photographic image fills do not establish a flattened source; typography overlays alone do not establish structured layout. Preserve useful copy, source identity, local token normalization and all existing motion/delivery requirements.

This revision changes English documentation and two authored skills only. No Figma frame was supplied for inspection and no assets were exported or generated in this task. Validate formatting, local links, changed skills and unchanged upstream hashes before publishing. Application builds in CI check the existing demo, not execution of this new source-selection workflow.

## September 22 GSAP hover clarification

Explicitly require GSAP-powered hovers for buttons, button-links and existing tabs in the baseline, root rules, startup prompt, skill routing and desktop acceptance checks. Cover reversible entry/exit, keyboard focus, selected-tab indicators, interruption, disabled/loading and static reduced-motion feedback. Hover does not activate panels; absent tabs remain not applicable. This is a documentation/skill-only correction, not a new tab implementation or new runtime verification. Validate changed skill entrypoints, local links, formatting and unchanged upstream hashes before publishing; CI checks the existing implementation separately.

## September 22 required motion defaults

Documentation and authored skill routing now require GSAP ScrollSmoother and masked text/content/media entrances during desktop implementation. Removed conflicting optional-smoothing and freely interchangeable baseline-engine guidance. Preserved native touch/reduced-motion fallbacks, visible server-rendered content, supplied composition, no first-screen parallax and the deferred full browser matrix. See MOTION-DEFAULTS.md for the implementation and observation requirements.

This change does not modify application source, dependencies or tests. ScrollSmoother is not initialized by the shipped demo yet; existing mask examples do not establish full role coverage. New runtime behavior and visual motion checks were not run or claimed. Documentation formatting/links, authored skill validation and upstream snapshot hashes are checked before publishing; repository CI runs the existing static/build checks separately.

## September 18 local design tools release

Added a development-only shared token editor with validated preview, persistent source saving, cancellation, explicit baseline reset, and source conflict detection. Added a registered-role spacing inspector and four native Storybook Typography Playground stories. The index now contains 35 stories and 10 Docs entries. Updated startup rules and skills for a short reference passport, annotated corrections, and targeted image editing. The earlier release notes below are historical; the wider token editor is now implemented.

Validation passed: 5 token editor/store tests, 8 auditor tests, 5 motion validation/evidence tests, generated-token/CSS/JSX audit, formatting, Next.js production build and TypeScript, Storybook TypeScript and static build. Token tests cover invalid/fractional input, heading/spacing constraints, unrelated-source preservation, stale-edit conflicts, and rollback after a simulated CSS write failure. Endpoint checks against actual local development/production servers observed foreign-Origin rejection (403), fractional-value rejection (400), production GET/POST denial (404), and no production editor controls.

Focused browser review observed a shared control-height preview from 48 to 56 px; fractional 56.5 rejection with the last valid 56 px preview retained; Save writing source and surviving reload; Cancel restoring 56 from a 64 px draft; baseline reset and Save restoring original 48 px source; accent preview reaching the real button; system serif preview reaching headings; and unsaved color/font drafts surviving Next.js navigation. Source JSON and generated CSS were restored to the original baseline after these checks. Next.js Fast Refresh can fully reload after a source save and close the panel; this is documented.

At 1440 x 900, the inspector matched all registered token-lab blocks after motion settled. Repeated section insets changed together from 64 to 80 CSS px and matched the new token; heading gaps, content gaps and the 120 px centered-container left edge matched. Keyboard-accessible block selection and pointer selection both produced an outline. Browser error logs for this Next.js session were empty. Native Storybook Controls changed the specimen to the editorial system font and a longer headline while keeping documentation chrome unchanged; a screenshot was visually reviewed. Rebuilding the static output during an open session briefly produced a stale chunk request; reloading the completed build restored the stories.

Not run: a full browser/viewport matrix, complete accessibility audit, all motion scenarios, performance profiling, branded font loading, and cross-application unsaved-draft synchronization. Conflict and write-failure paths were verified by Node tests, not browser fault injection. System font fallbacks are platform-dependent. The inspector covers registered section/hero/card roles rather than arbitrary project layouts. Existing deferred QA rules remain in force. Storybook large-chunk/global-settings warnings remain non-blocking.

## September 14 native Storybook release

Implemented real Storybook 10.6.0 with the Next.js Vite adapter, native light manager, Autodocs, Controls, Actions, Interactions, code display, and accessibility inspection addon. The static index contains 31 stories and 9 Docs entries across Foundations, Components, Patterns, Motion, and Pages. Stories import actual production components and token CSS. The preview transform scopes original CSS; no separate imitation of the component library was created. The Next.js /design-system route is retained and labelled as the supporting token lab. Source saving is hidden in Storybook's motion studio; its preview controls remain available.

Updated AGENTS.md, startup instructions, workflow, component/token/motion skills, and design-system documentation to make native Storybook the shared project documentation contract. This supersedes the older custom-shell specification. The wider persistent color/size editor remains project work. Controls do not save shared tokens or synchronize unsaved drafts across applications.

Validation: Next.js production build, Storybook static build, Storybook TypeScript check, token/CSS/JSX audit, 8 auditor tests, and 5 motion validation/evidence tests passed. Installed versions: Next.js 16.3.4, React and React DOM 19.2.8, Storybook and Next.js Vite adapter 10.6.0, Vite 8.2.1. These versions built together successfully. Full viewport/browser regression and accessibility certification were not performed.

Focused desktop review used the Codex in-app browser at 1440 x 900. Observed the native category/folder/component/Docs-or-story tree, generated Button Docs and source controls, Canvas, live label edits and reset, disabled=true and secondary variant propagation to the source button, theme changes confined to the project preview, and a passing Click Interaction story. Its click and callback assertion both passed in the Interactions panel; Actions displayed the onClick event. Motion Opening Sequence was replayed in slow mode and sampled over time: heading translation 32 px -> 17.5858 px -> 4.3824 px -> none, with opacity 1 throughout. Reduced story showed opaque untransformed text with no split children. This focused evidence does not claim every story or all production routes were visually audited.

Non-blocking build warnings: local sandbox prevents writing Storybook's global settings file; the static build still completes. Vite reports large Storybook documentation/test-tool chunks. One native manager popover warns about a future Storybook 11 ariaLabel requirement. A deprecated manager layout option found during review was corrected. Rebuilding while a static preview was open invalidated cached chunk URLs; a page reload recovered it. Do not confuse that stale build session with a fresh-build runtime defect.

## September 14 coordinated sequence release

Implemented MotionSequence for the shared header/hero opening and each standard Section, with a real catalog specimen, scoped SplitText lines, shared ordering and ScrollTrigger ownership. Added MotionLink with reversible GSAP underline. Raised source entrance values to 600 ms, 90 ms stagger and 32 px travel; removed the separate visible-text 8 px cap. Preserved supplied composition and the current desktop-first workflow. First-screen parallax is excluded at the user's request. This release does not implement the separate design-system audit or grid-overlay proposals.

Checks: production build and TypeScript passed; static token/CSS/JSX audit passed; 8/8 auditor tests and 5/5 motion validation/evidence tests passed. The evidence checker rejects stationary, endpoint-only, non-finite, trivial-noise and unfinished samples. All upstream skill snapshots and installed dependency versions remain unchanged.

Focused browser review used the final production build in the Codex in-app browser at 1280 x 720. Observed initial header/hero translations, different intermediate heading-line positions and subsequent group entrances at normal and slow playback, natural settling, section entry and return scroll, route re-entry, catalog replay/pause/resume/finish, retained button fill/label motion and link keyboard/pointer response. Pause held the same observed transforms across observations. Reduced preview removed sequence transforms and left all inspected parts opaque; button moving duplicates were hidden. Final tab logs returned no warnings/errors.

[Recorded sequence frames](evidence/sequence-motion.json) contain three actual layer positions: replay, an intermediate frame, and the explicit Finish result. The new checker accepted them. This validates observed travel and the finish control; natural completion was observed separately, not inferred from that forced finish. Native browser geometry may be fractional even though authored token dimensions are integers.

Added four focused Playwright scenarios in tests/motion.spec.ts and the test:motion:browser command. Their TypeScript compiled, but the Playwright runner was not executed in this release. In-app browser observations above are separate evidence and do not count as a passing Playwright run. Full cross-browser/viewport QA, actual OS reduced-motion switching, font-replacement/resize stress, JavaScript-disabled runtime and performance profiling were not run. The full documentation shell and color/size editor remain separate project requirements.

## September 14 required desktop motion release

Strengthened AGENTS.md, the startup prompt, workflow, skill routing and authored skills: header, hero, expressive shared buttons and major-section motion are required desktop work. Implemented the baseline effects as well as their rules. Supplied-design composition, layout tokens and upstream skill snapshots are preserved.

Implemented a shared GSAP fill sweep and label roll for Button and ButtonLink, including keyboard focus, reversible pointer interaction and disabled/loading fallbacks. Header and hero groups enter in sequence. Initially visible server-rendered content now settles visibly instead of skipping all movement; offscreen section content uses shared scroll entrances. Existing SplitText, Flip and motion editor remain in use.

Checks: production build with TypeScript passed; static token/CSS/JSX audit passed; 8/8 auditor tests and 3/3 motion-validator tests passed. Focused runtime review used the production build in the Codex in-app browser at 1280 x 720. Formatting, skill validation, upstream hashes, local Markdown links and exact ZIP contents are checked during packaging.

Observed in the browser:

- Fresh header load produced changing logo/navigation/action transforms while retaining visible content. Hero copy/actions and visual entered in a coordinated sequence.
- Slow pointer hover showed intermediate fill and label positions. At completion the replacement label occupied the original text position; pointer exit reversed to the resting state. Repeated entry/exit was exercised. Keyboard Tab focused Secondary and started the same effect.
- Slow playback left untouched controls at rest. Disabled and loading examples retained readable labels without the interaction timeline. The local reduced-motion preview removed the library button effects; this is not an OS preference test.
- Section content was pending offscreen, then showed intermediate stagger opacity/transforms during scroll entry. Scrolling down and back left previously revealed content visible.
- No warning/error entries were returned by the production tab after these interactions and route changes.

Fixed two defects discovered during this review: the rolled label inherited an extra CSS translation, and changing timeScale to a positive value reversed resting button timelines into an unintended hover. The implementation now resets the copied label's pixel offset and preserves playback direction when slowing it.

Dependency inspection: npm ls next react react-dom gsap @gsap/react reports one deduplicated React tree. Installed Next.js 16.3.4, React/React DOM 19.2.8, GSAP 3.15.0 and @gsap/react 2.1.2 satisfy their declared peer ranges. No dependency or lockfile change was required. This verifies this starter's declared compatibility and observed runtime, not an unrelated derived project's dependencies. MOTION-LIBRARIES.md now includes React/Next.js integration diagnostics.

Not run for this release: the full Playwright/axe or cross-browser/multi-viewport matrix, mobile adaptation, actual OS reduced-motion switching, JavaScript-disabled runtime, performance profiling and exhaustive route/StrictMode stress tests. The final-QA hover assertion was updated but its Playwright suite was not run. The fixed documentation shell and wider color/size token editor remain implementation requirements for each project. These focused starter checks do not approve a new project's desktop or certify all possible interactions.

## September 14 supplied-design policy revision

Replaced creative interpretation with the user's Implementing supplied designs section in AGENTS.md. Synchronized the startup prompt, workflow, skill routing, brief, typography/workflow/motion skills, and system/motion/asset guidance. Structural suggestions require explicit user authorization; local normalization preserves the supplied composition and intentional role differences. Earlier creative-reference notes below are historical and superseded.

This release changes Markdown instructions only. Application source, dependencies, tests, motion studio, and all 48 upstream skill snapshot files remain byte-identical to the motion-studio archive. No build or browser suite was rerun for this documentation-only revision. Packaging verifies formatting, local Markdown links, all 27 skill entrypoints, upstream hashes, English content, exact archive bytes, and unchanged non-Markdown files.

## September 13 motion studio release

Implemented shared MotionProvider playback/settings, SplitText headings, Flip layout/reordering, three source-defined starting profiles, validated motion editing and a development-only source-save endpoint. Added six official GSAP skill snapshots (27 total local skills), startup routing, direction selection and three researched site studies. No additional runtime animation dependency was installed. The wider color/size editor and fixed documentation shell remain project implementation requirements.

Release checks: production Next.js build including TypeScript passed; token/CSS/JSX audit passed; 8/8 auditor tests and 3/3 motion-validator tests passed. Source motion duration is restored to 400 ms after save testing. Skill validation, snapshot hashes, Markdown links, formatting and exact ZIP contents are verified during packaging.

Focused browser evidence: Codex in-app desktop browser, development at 1440 x 1000 and final production at 1280 x 720. These are implementation observations, not the full multi-viewport matrix.

- Observed SplitText line movement and stagger/mask examples during explicit replay. Slow playback exposed intermediate transforms/opacity; pause held the same values across subsequent observations, then resume/finish settled the effects.
- Repeated Flip layout changes interrupted active motion. Reordering during a transition retained all card identities; Enter activated the reorder control on the home page.
- Applied Portfolio settings in the catalog and navigated to Overview; shared root duration remained 800 ms. The source remained unchanged by preview.
- Fractional duration 600.5 was rejected visibly; active settings remained unchanged. Valid save at 640 ms updated JSON and generated CSS, passed the audit, and survived a browser reload. Restored and saved 400 ms afterward.
- Fixed a real local-save origin mismatch caused by Next.js URL normalization. Local origin now compares against the actual Host header. Foreign origin returned 403; an invalid same-origin body returned 400. Final production POST returned 404 and the Save control was absent.
- Local reduced-motion preview left inspected library specimens readable with no hidden/transformed remnants after replay and layout changes. This tests the studio fallback, not OS preference emulation.
- Final production home was scrolled down and back; inspected visible motion elements remained visible. Home and catalog navigation plus Apply/replay produced no warning/error entries in the fresh production browser tab.
- Development initially hit OS file-watcher exhaustion; polling allowed the preview to run. A transient hydration error during a live component edit was observed. Fresh final production load/navigation did not reproduce it.

[Production motion editor screenshot](evidence/motion-studio-production.png) documents the UI, not animation quality by itself.

Not run: full Playwright/axe and cross-browser matrix, mobile adaptation, repeated pointer-hover stress, actual OS reduced-motion switching, JavaScript-disabled browser runtime, performance/memory profiling, exhaustive route-leak checks, full typography/spacing comparison and better-interface quick/full review. Desktop completion for a new website remains pending its required review and user approval; these focused starter observations do not grant that approval. Reference-site inspection limits are separately recorded in REFERENCE-MOTION-STUDIES.md.

## Desktop motion review policy revision

Strengthened desktop readiness, startup routing, and first-party skills with a required observed browser motion/interaction review. Focused desktop checks now explicitly precede handoff; the full regression suite and cross-browser/multi-viewport matrix remain deferred. The brief records implementation and verification separately, and required unverified states keep readiness pending. No website code, motion implementation, dependencies, or browser tests changed from the creative-reference archive. The separate project's reported flicker fix and cursor-reactive buttons were not inspected or incorporated in this documentation revision.

Release checks cover Markdown formatting/links, all 21 skill entrypoints, the 42 unchanged upstream snapshot hashes, unchanged application bytes, English text, and archive integrity. No application build or live browser motion review was run for this documentation-only change. Historical motion observations below do not satisfy the new readiness checklist.

## September 12 creative-reference documentation revision

Updated startup instructions, workflow, skill routing, brief, design-system rules, and relevant site skills so images default to creative interpretation. Exact reproduction requires an explicit request. Accepted desktop, documentation shell, motion/image policy, and delivery order remain protected. This revision changes documentation and local skill instructions only; application code, dependencies, and tests match the preceding library-motion archive. No build or browser suite was rerun for this policy change. Release verification covers document formatting and links, all 21 skill entrypoints, the 42 unchanged upstream skill snapshot hashes, English content, and ZIP integrity/exact bytes.

## September 12 library motion and generated-asset revision

Implemented GSAP 3.15.0 and @gsap/react 2.1.2, shared MotionReveal rise/stagger/mask patterns, a replayable catalog showcase, and new validated timing/distance/easing tokens. Removed the previous CSS-only .enter effect and migrated its reduced-motion test to the actual library specimens. Engine selection now follows project analysis, including Anime.js/Motion and the user's component galleries as candidates; only GSAP and its React integration are installed in this baseline.

Added site-assets, IMAGE-ASSETS.md, and an empty ASSET-INVENTORY.json for generating necessary high-resolution project imagery inspired by reference composition, without shipping screenshot crops. There are now 21 bundled skills. No unrelated sample image was generated. The fixed documentation shell and live token editor remain specified future project work; this revision implements motion, not those larger features.

Checks for this revision: generated token audit passed; 8/8 static auditor tests passed; production Next.js build and TypeScript passed. The design-system page was opened in the in-app desktop browser and Replay motion was exercised; visible specimens rendered correctly. This was ordinary desktop preview inspection, not a browser matrix or exhaustive motion-feel review. Full Playwright/axe suites, mobile motion, JS-disabled runtime, dynamic reduced-motion changes, route-leak checks, and performance profiling were not run. The updated browser assertion is included for final QA but not reported as passed. Skill structure, document links, source snapshot hashes, formatting, and archive integrity are checked for the packaged release.

All earlier browser results and screenshots below are historical baseline evidence. They do not validate this GSAP revision or the still-unimplemented editor/documentation shell.

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
