# Coordinated motion

Use MotionSequence for opening compositions and major sections. Use MotionReveal for independent specimens or intentional subgroups, not as another transform owner on sequence targets. The opening has no parallax, scroll-driven translation or sticky-cover behavior. Do not add hero parallax by default; it requires an explicit project request.

## Composition ownership

`App` owns an opening sequence keyed by the route. It coordinates the header and the Overview hero; each shared Section owns its own sequence and scroll trigger. The catalog includes the same MotionSequence in a replayable specimen. Nested sequences isolate their targets from the parent and support long sections with separate meaningful entry regions. Keep targets out of an animated parent part: animating both a wrapper and its descendants adds conflicting motion.

Mark a heading with `data-sequence-part="heading"` and plain text; SplitText handles lines and accessible naming. Other role names describe groups such as eyebrow, copy, actions, visual or content. `data-sequence-step` is an integer index multiplied by the shared stagger token, not a page-local duration. The default opening uses header steps 0–2, eyebrow 1, heading 2, visual 3, copy 4 and actions 5. Standard sections use eyebrow 0, heading 1, copy 3 and content 4. These are a starting composition; select project ordering deliberately.

SplitText line movement and all group tweens belong to the same timeline. Equivalent roles use shared tokens. The initial source profile is 600 ms duration, 90 ms stagger and 32 px travel at a 16 px root; edit these through the existing motion editor and source-save workflow. Motion timings and distances are independent of layout spacing.

## Safe initial content and lifecycle

Already-visible server-rendered content enters with visible translation rather than being hidden again after hydration. Visible headings now use the full shared distance, replacing the old 8 px cap. Offscreen headings use line masks. Content above the viewport is left settled. The sequence runs once on scroll entry; scrolling past it quickly finishes it. Previously seen text settles on font/width resplitting instead of replaying.

Do not wait for the whole window load event, introduce a page-wide hidden class or transplant the reference's document-wide observer. Scope targets and cleanup through useGSAP. Revert SplitText, timeline and ScrollTrigger on route/unmount/settings changes. Reduced-motion preview and the OS media preference bypass movement while preserving readable content. First-screen parallax is excluded from this starter.

## Links and buttons

MotionLink provides a shared reversible GSAP underline. The text and hit area remain stationary during the interaction; the current page has a static underline. Hover requires a fine, hover-capable pointer; keyboard focus receives the same feedback. The local reduced preview uses a static underline. Button and ButtonLink retain their shared reversible GSAP fill sweep and label roll. Slow playback preserves forward/reverse direction for both implementations.

## Review and regression coverage

Inspect actual normal and slow playback, not just a screenshot. The catalog's Replay, Pause, Resume, Finish and Reduced motion preview operate on sequences as well as independent motion examples. Use Overview to inspect the real header/hero together. Record actual observations in VALIDATION.md or the project brief.

`npm run test:motion` includes negative evidence tests. `checkMotionFrames` rejects frozen values, trivial noise, missing intermediate samples and an unfinished final position. It validates numeric observations from a moving layer; callers must collect those observations during a real interaction. It does not infer design quality or inspect the browser itself.

`npm run test:motion:browser` runs focused Playwright scenarios for opening/section movement, route return, reversible button hover and stable bounds, link/focus movement and reduced preview. Build first. These are permitted focused desktop checks during implementation; the full browser/viewport suite stays at final QA after desktop approval and authorized mobile work. Do not claim the browser tests passed merely because their source type-checks or the unit tests pass.

For each new project, extend the scenarios to every actual motion role. Include visible start/intermediate/end states, interrupted hover, return scrolling, route transitions, changed fonts and real OS reduced-motion switching. A library import, valid manifest, CSS transition declaration or duplicated label does not prove working animation.

## Reference adaptation

Adapted the supplied sandbox's shared section trigger, line masks, grouped content, stable link/button geometry and behavioral evidence approach. Kept our Next.js/GSAP architecture, source token pipeline, editable timing and supplied-design boundaries. Did not import its Vite app, global class startup, mandatory fixed timing, hard-coded navigation pattern, hero parallax or project assets. Design-system audit and grid-overlay integration are separate work, not delivered by this motion revision.
