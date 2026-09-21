# Motion reference studies

Inspected September 13, 2026. Evidence combines public HTML/JavaScript/CSS with focused desktop browser observations. A bundled library is not proof that every effect uses it. These are implementation studies, not copied source, exhaustive performance audits, or components already shipped in this starter.

## Seasats

[Reference: product introduction](https://www.seasats.com/#products).

Confirmed stack: Next.js/React; GSAP with ScrollTrigger, SplitText-style line/word splitting implementation and CustomEase; Lenis; Three.js and React Three Fiber; Swiper in the loaded bundle. The minified text plugin exposes GSAP 3.15-era autoSplit, masks, onSplit, revert, and version 3.15.0; names are partially minified, so distinguish this evidence from a package manifest.

The exact #products illustration is one transparent WebP image, not an interactive 3D model. Its dedicated visual wrapper animates yPercent from 12.5 to -12.5 and scale from 1.1 to 1 under a scrubbed ScrollTrigger with sine.inOut easing. Both the DOM image and changing wrapper transform were inspected. The heading and description enter through line masks. Section colors and navigation progress use shared scroll progress and CSS custom properties.

Other parts of the page contain Canvas frame sequences, Three.js globe rendering, custom shader materials, and a boat GLB in the scene code. Product story canvases use the AnimateFrames and ProductStoryFrames components; do not call every canvas a WebGL scene. The product introduction was inspected while scrolling. The complete 3D/X-ray flow was not exercised, and some videos reported unavailable playback in this browser.

Source evidence: [application scene code](https://www.seasats.com/_next/static/chunks/3067-5a2774561866c038.js), [React Three Fiber, text plugin, CustomEase and Swiper code](https://www.seasats.com/_next/static/chunks/9297-dbee6a385ac69d9c.js), [Lenis and scroll integration](https://www.seasats.com/_next/static/chunks/2954-8a3d3355581ae6d9.js). Hashed URLs may change with deployment.

Transferable pattern: use a high-quality generated transparent product illustration plus a restrained scroll transform when the scene only needs position/scale. Use real 3D only for camera movement, lighting, rotation, or configuration that changes the view. A recognizable locked product requires approved accurate assets.

## United Carriers

[Reference](https://unitedcarriers.com/).

Confirmed stack: Webflow with jQuery and a separately hosted custom JavaScript bundle; GSAP 3.15.0 with ScrollTrigger, CustomEase and MotionPathPlugin; Lenis; Barba; Three.js. Swiper is referenced for other site features. MotionPathPlugin is registered in the entrypoint, but its presence alone does not establish which homepage scene uses it. Barba handles site navigation; do not transplant it into this Next.js starter as a second router.

The page mixes several rendering techniques. The opening globe uses Canvas/WebGL. Crane and truck sequences use a custom FrameSequence implementation with a 2D canvas and pre-rendered AVIF frames. Other truck/container/wheel elements are separate images animated by GSAP: wheel rotation and translations share timelines. Long scroll scenes scrub between stages, reveal text, change masks, and transition between light and dark scenes. Sticky layout provides holding regions; the inspected homepage code does not require assuming pin:true for each one.

The OceanScene module builds a Three.js ocean and custom shader uniforms. WakeSimulation updates the ship wake, with controls for width, speed, intensity, camera zoom and field of view. This is purpose-built scene code, not a generic water card from a component gallery. The global script also implements cursor following/trails, circular scroll progress and animated route/loader masks. Cursor behavior and transitions are source-confirmed here; every hover and route was not exercised.

Browser observations covered the globe, scroll progression through the text/metrics and crane/truck composition. The complete ocean interaction and all route transitions were not visually validated.

Source evidence: [entrypoint and dependency imports](https://united-carriers.netlify.app/main.js), [GSAP plugins](https://united-carriers.netlify.app/chunks/vendor-gsap-GRoENYFU.js), [home timelines and frame URLs](https://united-carriers.netlify.app/chunks/Home-CZ3JhV-m.js), [2D frame player](https://united-carriers.netlify.app/chunks/frame-sequence-DVzLzLQ6.js), [ocean](https://united-carriers.netlify.app/chunks/OceanScene-CggVSafL.js), [wake simulation](https://united-carriers.netlify.app/chunks/WakeSimulation-BBrDm1Iz.js).

Transferable pattern: storyboard one continuous product journey, then choose the renderer per scene. Pre-rendered sequences need a frame/transfer-memory budget, loading strategy and static fallback. A generated still image is not a temporally coherent frame sequence. Commission/render coherent frames or use real geometry when that continuity is required. Do not copy the site's source or media.

## MakeItShip / Ship

[Reference](https://artemhalo.github.io/Ship/).

Confirmed delivery: static HTML, local script.js and styles.css. The inspected entrypoint contains no GSAP, Lenis, Anime.js, Motion or Three.js imports. Font Awesome supplies icons; Google Fonts supplies typefaces. These are not animation engines.

Motion is authored with CSS transitions/keyframes, IntersectionObserver and requestAnimationFrame. Buttons contain two letter-split labels, an overflow mask and per-character delays for a rolling wave on hover/focus. Observer-driven sections reveal once with staggered delays. Background layers use scroll-derived translations. Pricing and booking surfaces animate inset/radius variables as they enter. The hero-cover treatment combines CSS sticky with scroll-derived opacity, scale and translation, and enables only when desktop dimensions allow it. The final section blends toward the footer.

The green background is a local raster image, not a WebGL fluid simulation. Browser observation covered the initial composition and scrolling into the process section; the complete pricing/footer sequence and repeated hover were not visually tested. Source includes reduced-motion branches, but that is not a complete accessibility audit.

Source evidence: [JavaScript](https://artemhalo.github.io/Ship/script.js), [CSS](https://artemhalo.github.io/Ship/styles.css).

Transferable pattern: controlled image parallax, layered section handoff and reusable letter-roll controls. For this starter, implement substantial sequences in the selected shared engine for interruption, cleanup, replay and token editing. Keep simple color/focus feedback in CSS. Quality depends on composition, assets and timing as well as library choice.

## Apply during startup

Choose the scene before the library. Classify each proposed effect as DOM/SVG, image-layer parallax, frame sequence, or real-time 3D/shader. Record its purpose, scroll/interaction trigger, property owner, media requirements, fallback, and browser observations in BRIEF.md. Use the smallest coherent implementation that delivers the intended scene. These references expand the decision library; they do not install Lenis, Three.js, Barba, Swiper or a frame renderer in the baseline.
