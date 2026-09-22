# Motion direction and reference selection

Choose a coherent movement character from the actual brief at startup. Do not ask the user to select a technical stack or wait for another reminder to implement entrances, controls, and necessary imagery. Keep a short rationale in BRIEF.md and begin the desktop promptly. Supplied screenshots and mockups are the design to implement under AGENTS.md. Motion must preserve their composition, section inventory/order, content hierarchy, and interaction patterns; a scene concept does not authorize structural redesign.

## Starting profiles

The three profiles in src/design/tokens.json are editable starting values for the studio, not universal visual recipes. Choose intensity and pacing for the content, reading time, interaction frequency, and hardware budget. Reduced-motion fallbacks are mandatory for all profiles.

| Character    | Fit and motion direction                                                                                     | Baseline and additions                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Editorial    | Architecture, editorial, professional brands: clear line reveals, restrained image masks, deliberate spacing | Required ScrollSmoother and masks; tune restrained pacing                     |
| Portfolio    | Agencies, designers, visual work: coordinated hero, connected card/detail transitions, distinctive galleries | Required ScrollSmoother and masks; tune expressive pacing                     |
| Experimental | Campaigns and expressive product stories: one purposeful signature sequence, carefully paced scenes          | OGL for shader effects or Three.js/R3F for 3D, only when the idea requires it |

Profile timing/distance values live in tokens.json. Current starter defaults remain the source motion values; selecting a profile in the studio loads a draft, and Apply commits the preview. Do not treat a larger duration or distance as a quality upgrade. The motion map should cover hero, section text/media, repeated controls, navigation, and carousels only when present. Connect related elements through shared timing and direction; avoid a collection of unrelated demonstrations.

## Sources to inspect

- [GSAP Showcase](https://gsap.com/showcase/): discover complete motion systems.
- [Osmo Vault](https://www.osmo.supply/vault): inspect specific menus, galleries, masks, hover and page transitions. Many resources require membership. No Osmo implementation is bundled here; use accessible alternatives when code is unavailable. Adapt HTML/Webflow lifecycle assumptions to React before integration.
- [Codrops GSAP](https://tympanus.net/codrops/tag/gsap/): read author tutorials and inspect their linked demonstrations. Check the specific code license before reuse.
- [INK Games / ToyFight](https://tympanus.net/codrops/2025/11/21/one-canvas-to-rule-them-all-how-ink-games-new-site-handles-complex-3d/): author breakdown of a Next.js, GSAP, Lenis and React Three Fiber site with shared WebGL canvas architecture.
- [Arnaud Rocca](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/): author breakdown of GSAP, SplitText, ScrollTrigger, Lenis and OGL in a portfolio.

Keep the previous galleries in MOTION-LIBRARIES.md as additional discovery sources. Inspect a small relevant set of live examples; record exact URLs and the mechanism selected, not just a library name. Reference research must not postpone the first working desktop for a full research report.

## Engine and ownership decisions

GSAP + ScrollTrigger are the installed base. SplitText and Flip ship in the installed GSAP package and are used by the starter. Read official [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/) and [Flip](https://gsap.com/docs/v3/Plugins/Flip/) docs for the current APIs. GSAP ScrollSmoother and masked entrances are mandatory defaults under [MOTION-DEFAULTS.md](MOTION-DEFAULTS.md). Motion and Anime.js may supplement distinct effects; baseline replacement requires explicit user direction or approval.

Use ScrollSmoother as the single smoothing system. [Lenis](https://github.com/darkroomengineering/lenis) is an alternative only if the user explicitly requests or approves replacing ScrollSmoother. Follow MOTION-DEFAULTS.md for native touch/reduced-motion fallbacks and lifecycle checks.

Choose [OGL](https://github.com/oframe/ogl) for focused shader effects or [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for a React-managed Three.js scene when justified. Load expensive scenes only where needed, reuse resources, pause inactive work, and supply a static alternative. Do not require WebGL on every site. Avoid adding a second page router from a copied vanilla/Webflow transition demo to Next.js; design navigation transitions around the app's actual router and loading/error behavior.

One element/property has one motion owner. Use separate wrappers for an entrance and an independently interactive surface. Centralize timing/distance/easing, release contexts/listeners on unmount, and preserve text wrapping when fonts or widths change. The required browser observation in MOTION-LIBRARIES.md remains the completion gate; no engine or profile guarantees award-quality results.

## Studied production references

Read [REFERENCE-MOTION-STUDIES.md](REFERENCE-MOTION-STUDIES.md) for Seasats, United Carriers and MakeItShip. Separate DOM/image parallax, pre-rendered Canvas sequences and real-time WebGL before choosing a library. Do not infer real-time 3D from a realistic image or assume every canvas uses WebGL.

## Coordinated sequence implementation

Use [MOTION-SEQUENCES.md](MOTION-SEQUENCES.md) for the shared opening/section API and focused behavior checks. Implement header and hero as one planned opening; each major section owns its heading/content sequence. The same implementation must appear in the live catalog. First-screen parallax is excluded: do not add it as a default or inherit it from a reference sandbox. Desktop motion remains required, with full browser/viewport QA at its existing later stage.
