# Motion libraries and reference selection

Read AGENTS.md, Mandatory desktop motion, before implementing. Header entrance, coordinated hero, shared expressive button/button-link hover/focus, and major section entrances are required. Color-only hover and press-only scale are insufficient. Missing motion blocks completed desktop handoff. Verify actual page behavior at normal and slow speed; preserve supplied composition and reduced-motion fallback.

## Required approach

Use library-powered motion during desktop implementation. The starter installs GSAP and @gsap/react with exact versions in package-lock.json. MotionReveal provides ScrollTrigger entrances, child staggering, and a directional clip reveal; MotionShowcase renders replayable examples in /design-system. These are reusable starting patterns, not a claim that the same three effects fit every site. CSS remains appropriate for simple color/focus/press feedback; a desktop finished with only generic CSS fades does not meet the requested motion brief.

Before choosing distinctive effects, inspect relevant live examples from at least two of the sources below and choose a coherent motion direction for the screenshots. Record exact component/demo URLs and the reason for the selection in docs/BRIEF.md. This focused selection can happen alongside the first visible desktop; it must not become a long research prerequisite. If a source cannot be opened, use another and record the limitation. Never claim to have visually evaluated a demo from its title alone.

| Source                                                        | Role in selection                                                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [GSAP documentation](https://gsap.com/docs/v3/)               | Engine installed in this baseline; timelines, ScrollTrigger, text/SVG/layout tools as needed                                               |
| [Anime.js](https://animejs.com/documentation/getting-started) | Evaluate its animation/timeline/SVG tools and React integration for the actual effect; check the installed major-version API               |
| [21st.dev](https://21st.dev/)                                 | Discover community components and animated marketing blocks; inspect the individual author, code, and dependencies                         |
| [Motion Primitives](https://motion-primitives.com/)           | Find coordinated text, transition, and interactive primitive patterns                                                                      |
| [React Bits](https://reactbits.dev/)                          | Explore expressive text, backgrounds, and interactive effects; choose only those that support the brand                                    |
| [Hover.dev](https://www.hover.dev/)                           | Explore button, card, navigation, and section interactions; check usage and redistribution terms for each selection                        |
| [Aceternity UI](https://ui.aceternity.com/components)         | Explore hero, background, card, and scroll patterns                                                                                        |
| [Micro Interactions UI](https://microinteractionsui.com/)     | User-supplied microinteraction reference; availability/content could not be verified in this preparation pass, so inspect before selection |
| [Magic UI](https://magicui.design/)                           | Explore animated components and presentation details                                                                                       |

The catalog links are discovery sources, not a list of packages to install. The specific Motion Primitives page was not retrievable in this pass; inspect it in a browser during selection or use another source. These references do not imply permission to redistribute all of their code in a template. This starter includes its own GSAP patterns; it does not vendor code from these component galleries.

## Choose and integrate

Create a short motion map: element, purpose, reference URL, chosen effect, engine, trigger, token roles, interruption behavior, reduced-motion fallback, implementation status, and observed browser verification status. Cover the first viewport, section entrances, buttons/links, and menus/carousels where present. Implement and inspect each effect with its section or shared control. Include one distinctive brand-appropriate sequence or interaction when the design supports it, together with coordinated section entrances and polished controls. Examples include an orchestrated hero, a masked image reveal, a shared-element tab transition, a restrained interactive card, or a story-driven scroll sequence. Do not add every effect family to every page.

Inspect the selected component's source, dependency versions, and license before integrating it. Paid-only code requires access; choose an available alternative if it is not accessible. Preserve required attribution. Adapt styles to the existing CSS system and token roles; do not import the gallery's typography, gradients, buttons, or unrelated theme. Reuse the project's shared components and place the effect in a reusable client component with a real catalog specimen and a replay control.

Choose the engine after analyzing the project, existing dependencies, target effects, interaction frequency, browser support, bundle cost, and team maintainability. The shipped demo uses GSAP; that is not a requirement to use it on every future site. GSAP is a candidate for coordinated timelines and scroll storytelling; Anime.js for animation/timeline/SVG work when its API fits; Motion for React state/layout/gesture transitions. These are starting heuristics, not exclusive capabilities. A gallery component may provide the strongest fit. Inspect its real implementation before deciding. If selecting another engine, adapt the shared motion layer and remove unused dependencies rather than retaining the demo engine without a purpose. Do not add a second engine for an effect already covered. Use current official documentation for the chosen version; do not mix Anime.js v3 snippets with v4 APIs or Motion import paths from different packages. Two engines must not write transform, opacity, or layout on the same element. Do not replace a chosen library effect with a generic CSS fade simply because it is easier.

## GSAP implementation contract

Follow the official [React integration](https://gsap.com/resources/React/) and [matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>) guidance. Register plugins once; use useGSAP with a root scope, dependency cleanup, and revertOnUpdate where relevant. Scope selectors to the component. Clean up tweens, timelines, media contexts, event handlers, and ScrollTriggers on unmount; use contextSafe for deferred handlers that create animations. Do not kill every ScrollTrigger in the application to clean up one component.

Read shared timing/easing/distance tokens. Durations are authored in integer milliseconds and converted to seconds for GSAP. MotionReveal, MotionText, and FlipGallery read validated shared MotionProvider settings initialized from tokens.json. Apply/replay updates their scoped animations and the root motion variables; saving regenerates source CSS. It owns only transient animation properties and clears them after completion. Do not apply it directly to an element whose authored transform or clip-path must be preserved; add a dedicated wrapper.

Server-rendered content starts visible, and reduced motion bypasses transforms and scroll-driven effects. Automatic generic reveals move already-visible content without concealing it at initialization; offscreen elements are prepared before entry. First-viewport text may settle without concealment. Explicit replay is a deliberate exception that restarts visible specimens. Do not conceal essential content with CSS while waiting for hydration. Keep keyboard controls usable during transitions. Scrub/pin/parallax effects are optional, require a purposeful fit and a static fallback, and must not hijack normal scrolling by default. Adapt mobile motion only after mobile authorization.

Library-written runtime styles are allowed inside reusable animation modules for transient animation properties. Page-local style overrides, raw design values, and a second styling system remain disallowed. The existing static audit covers CSS/JSX conventions, not every imperative GSAP property; review property ownership and runtime behavior during desktop implementation and broaden lifecycle coverage in final QA.

## Required desktop motion review

Implement motion with each section and shared control, and inspect it while building. Do not wait for a reminder about imagery, entrances, or hover states. The first preview may be unfinished; before presenting desktop as complete, finish this review on the real site and its catalog at the desktop reference width in an available browser.

1. Map the actual surfaces: first viewport, section entrances, buttons/links, menus, and carousels/tabs where present. For each, record the trigger, sequence, shared tokens, interruption behavior, and fallback. Mark absent features not applicable; do not invent a carousel to satisfy the checklist.
2. Watch a fresh page load through hydration and image/font arrival. Check the hero sequence and the transition to usable controls. Previously visible content must not disappear and reappear because a reveal initializes late. Prevent flicker, unexpected layout jumps, and stuck hidden states.
3. Scroll down and back up, including fast scrolling past triggers. Watch section headings and content together. Already revealed sections stay visible; one-time reveals must not repeatedly reset when scrolling back. Intentional reversible effects must behave as documented without flashes or stranded content.
4. Exercise repeated pointer entry/exit, quick hover changes, pointer movement where relevant, clicks, keyboard focus/activation, and interruption or reversal before a transition finishes. Check menus, carousels, loading, and disabled states when implemented. Controls stay responsive and settle into the correct state without queued tweens or jumps.
5. Check reduced motion on desktop and replay/route remount where relevant. Content and controls remain visible and usable; event handlers and animations do not accumulate. Inspect property ownership: CSS transitions, entrance wrappers, and interaction timelines must not compete over the same property on the same element. Use separate wrappers or a single coordinated owner where needed.
6. Replay the actual production effects in /design-system using the shared site components and tokens. A generic demo that does not exercise the site's effects is insufficient. Check both the isolated specimen and its page context, then fix confirmed defects and repeat the affected interactions.

Record the route/specimen, browser and viewport, action sequence, observed result, and status (passed / failed / not run / not applicable with reason) in docs/BRIEF.md. Inspect motion over time at normal speed; slow playback or recordings can help diagnose problems. A library dependency, source inspection, successful build, or static screenshot alone is not evidence of motion quality. Do not claim an unobserved scenario passed. If browser access or another dependency blocks a required check, continue unaffected work, show the draft with the precise limitation, and keep motion readiness pending rather than declaring desktop complete.

This review is implementation work and needs no separate QA authorization. Focused browser automation may help reproduce an interaction or regression, but cannot replace watching the movement. The full regression suite and cross-browser/multi-viewport matrix remain stage 4 work after approved desktop and authorized mobile are ready. Mobile deferral does not cancel desktop motion review.

Static formatting, token validation, and compilation keep the starter runnable; report them separately from observed browser motion results.

## Final validation and delivery

Final QA extends the desktop review across the agreed browsers and viewports. It must cover replay, repeated route mounting, interruption, reduced-motion changes, JS-disabled visible content, scrolling, font/image loading, and responsive fallback. Check for leaked triggers, layout shifts, focus loss, excessive CPU/GPU work, and conflicting engines. Record exact checks performed; a successful build is not a visual motion review.

## Studio and reference direction

Read [MOTION-DIRECTION.md](MOTION-DIRECTION.md) during startup to select a project character and inspect Osmo/Codrops alongside the existing galleries. [MOTION-STUDIO.md](MOTION-STUDIO.md) documents the implemented SplitText/Flip specimens, shared playback, editable profile values, and development-only source saving. Six official GSAP skills are routed in SKILL-ROUTING.md. These additions preserve the required observed desktop review above; a preset name never constitutes verification.

## Studied production references

Read [REFERENCE-MOTION-STUDIES.md](REFERENCE-MOTION-STUDIES.md) for Seasats, United Carriers and MakeItShip. Separate DOM/image parallax, pre-rendered Canvas sequences and real-time WebGL before choosing a library. Do not infer real-time 3D from a realistic image or assume every canvas uses WebGL.

## Supplied design boundaries

Follow AGENTS.md, Implementing supplied designs. Add required entrances and hover/active feedback within the supplied composition and interaction patterns. A library demo or motion skill does not authorize new/reordered sections, a different grid, navigation pattern, or scroll-story structure. Present structural motion proposals separately and implement them only when explicitly requested or approved.

## React / Next.js diagnostics when motion is missing

Do not assume version incompatibility from a static page. First verify that the actual header, hero, buttons and section components use the motion implementation. Then check npm ls next react react-dom gsap @gsap/react, peerDependency ranges and duplicate React copies; keep react/react-dom aligned and reproduce from the committed lockfile. Do not upgrade every dependency as the first attempted fix.

Check browser errors and hydration, client boundaries, refs attached before useGSAP, plugin registration, scoped cleanup, Strict Mode mount/cleanup, route remounts and font loading. Inspect prefers-reduced-motion and hover capability, trigger geometry, opacity/clip/transform ownership, and timelines stuck paused/reversed. A positive timeScale can reverse an intentionally backward timeline; preserve direction when toggling slow playback. CSS transforms on a duplicated label can leave a residual pixel offset when animating yPercent; reset the owned translation explicitly. A successful build or compatible peer ranges do not prove runtime motion. Record the reproduced cause and observed fix.

The September 14 baseline resolves next 16.3.4, react/react-dom 19.2.8, gsap 3.15.0 and @gsap/react 2.1.2. npm ls reports one deduplicated React version and compatible declared peers. This describes the bundled lockfile, not every project built from a prior archive.

## Coordinated sequence implementation

Use [MOTION-SEQUENCES.md](MOTION-SEQUENCES.md) for the shared opening/section API and focused behavior checks. Implement header and hero as one planned opening; each major section owns its heading/content sequence. The same implementation must appear in the live catalog. First-screen parallax is excluded: do not add it as a default or inherit it from a reference sandbox. Desktop motion remains required, with full browser/viewport QA at its existing later stage.
