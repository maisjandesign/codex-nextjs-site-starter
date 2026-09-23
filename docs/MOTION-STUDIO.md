# Motion studio

## Included implementation

Open /design-system and the Motion studio section. Its components are also used on the home page: MotionText for the page title and section titles, MotionReveal for coordinated card entrances, and FlipGallery for layout changes and reordering. There are no copied paid-gallery components or generated sample raster images in this revision.

- Editorial, Portfolio, Experimental: load source-defined values into the draft.
- Duration, Delay, Stagger, Distance, Easing: edit integer milliseconds/pixels and an allowed GSAP ease. Invalid/empty/fractional/out-of-range values do not reach live preview or source files.
- Apply and replay: update the shared session settings and restart eligible motion. Preview carries across Next.js client navigation in the same tab.
- Reset to source: discard the preview and restore the currently loaded source values.
- Replay motion, Pause/Resume, Finish motion, Slow playback: control registered site animations. Slow playback is 10% speed for inspection, not a source-token change. Finish settles registered effects into their end state.
- Reduced motion preview: bypass library movement for inspection. Turning it off never overrides an actual operating-system reduced-motion preference.
- Toggle featured layout / Rotate cards: trigger real Flip transitions. Repeat while the transition is running to inspect interruptions.

## Persistence

Save motion to source is available only in npm run dev. A same-origin local POST /api/motion validates the complete editable subset, updates only tokens.motion in src/design/tokens.json, and regenerates src/styles/tokens.css. The route rejects foreign/missing origins and invalid bodies, uses fixed source paths, and returns 404 in production. Keep the development server bound to loopback. Source saving is intentionally limited to motion values; it is not the full color/size design-token editor specified in DESIGN-SYSTEM.md.

Without Save, settings are a session preview and a hard reload restores source values. After saving, reload and verify the fields and replay. Profile definitions remain in tokens.motionProfiles. Change those in source if the project needs different presets; npm run tokens validates them. No localStorage-only save is presented as source persistence.

## Initialization and lifecycle

SSR text/content are visible. Automatic generic reveals move already-visible elements without concealing them and prepare offscreen elements before entry; scrolling back does not hide them again. The first-viewport text uses a small visible settling motion, while offscreen/replayed lines use masks. A deliberate catalog replay may restart visible examples. SplitText resplits for font/width changes without restarting content already seen. Reduced motion reverts contexts and leaves readable static content. Shared provider registration coordinates playback and unregisters on component/media cleanup.

Flip captures current visual geometry before a layout mutation and uses dedicated card surfaces, with no competing CSS transform transition. Catalog controls use the existing shared Button/Field styles. The permanent neutral documentation shell and full non-motion editor remain project requirements, not completed features of this demo.

## Verification

Follow MOTION-DEFAULTS.md for observed desktop scenarios and QA-CHECKLIST.md for final matrix coverage. Record observed evidence in VALIDATION.md. Run npm run test:motion for validator coverage; static tests do not establish motion quality. If the local OS exhausts file watchers, WATCHPACK_POLLING=1000 npm run dev -- --webpack can be used for that preview session; it is not a mandatory setting for every installation.

## Existing demo implementation

These notes describe the demo; MOTION-DEFAULTS.md governs new implementation. Do not retain overlapping demo owners when integrating the current primitives.

Button and ButtonLink share ButtonMotion: a reversible GSAP fill sweep and vertical label roll for pointer entry/exit and keyboard focus. Press scale stays on the outer control; the GSAP timeline owns separate decorative/label layers. Duplicate labels are aria-hidden. Disabled/loading and reduced-motion states bypass library movement. Button timings use motion.normal/library-ease source tokens; the studio Slow playback control also slows buttons. Global pause/finish controls govern entrance/layout timelines; interactive button states follow pointer/focus and are not forced into a hover state by Finish.

The header uses semantic MotionReveal with staggered logo, navigation and action wrapper. Hero copy/actions and visual use staged movement; MotionText retains headline ownership. Section handles its heading group and content entrance. contentMotion=false is used when the actual child already implements entrance motion or when catalog specimens own their examples; it is not a blanket opt-out for project sections. Initial visible content settles instead of being skipped or hidden after hydration.

Real Storybook documentation is included. The local Design tools panel now implements registered color/size/typography editing and a spacing inspector; see DESIGN-TOOLS.md. In Storybook, Studio previews and replays motion; save source values in the Next.js development token lab.
