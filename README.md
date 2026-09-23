# Reference — a Next.js template for Codex

A fresh, reusable workspace for building websites from Figma or screenshots: **Next.js App Router + TypeScript + GSAP + a separate Storybook**. All template content and instructions are in English. Typography and layout use shared integer 8px tokens.

**First time here? Read [START-HERE.md](START-HERE.md)** for the complete walkthrough, ready-to-use prompts, commands, and troubleshooting.

## Get the template

On [GitHub](https://github.com/maisjandesign/codex-nextjs-site-starter), choose **Use this template → Create a new repository**, then clone your new repository. You can also choose **Code → Download ZIP** and extract it with hidden folders intact.

For a local test of the starter itself:

```bash
git clone https://github.com/maisjandesign/codex-nextjs-site-starter.git
cd codex-nextjs-site-starter
npm run setup
npm run dev
```

Run `npm run storybook` in a second terminal. Website: [localhost:3000](http://localhost:3000). Storybook: [localhost:6006](http://localhost:6006).

## Start a new project

1. Create a clean copy with `npm run new-project -- /absolute/path/to/new-site`, or extract a fresh copy of the template archive. The helper refuses to overwrite an existing folder.
2. Open the new project folder in Codex and attach a Figma frame URL or screenshot.
3. Send this prompt:

> Follow AGENTS.md. First run the mandatory setup and verify GSAP, better-ui, and Graft. As soon as setup succeeds, build this reference without asking for another go-ahead. Use Next.js, consistent typography, the 8px grid, default GSAP motion, and a separate Storybook containing every component. Keep project work and documents in English; reply in my language in chat. Verify both apps in the browser.

The required order is **install skills → verify setup → start layout work**. Installation is part of the workflow, not an optional recommendation.

## Mandatory setup

```bash
npm run setup
npm run setup:check
```

This works before `node_modules` exists. The setup script:

1. Validates and installs the bundled skill snapshots into `.agents/skills/`.
2. Runs `npm ci` to restore pinned dependencies, including the local Graft CLI.
3. Adds Graft's local AGENTS.md integration and indexes `src/` and `scripts/`.
4. Verifies the installed skills and writes a readiness marker for this exact project.

A new copy cannot reuse another project's readiness marker. If installation fails or conflicts with an existing modified skill, the gate fails and layout work must wait. Development and build commands also check the gate. Existing global Codex settings, MCP servers and hooks are left untouched.

The installed instructions can be read immediately by file path. They also become available to normal skill discovery when Codex refreshes its catalogue; no extra user confirmation is needed to continue.

### Required skills

| Requirement | Installed package |
| --- | --- |
| GSAP | Official `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-performance` skills |
| better-ui | A complete snapshot of your installed better-ui skill, including its references |
| Graft | Upstream `graft` skill plus pinned `@nanonets/graft` CLI and a local source graph |

Bundles and checksums live in `tooling/skills/` and `tooling/required-skills.json`. The template includes three additional local workflow skills: `reference-site`, `gsap-next-motion`, and `site-component-system`.

## Run the website and Storybook

Requires Node.js 22.14+ and npm. After setup:

```bash
npm run dev
```

Website: http://localhost:3000. In another terminal:

```bash
npm run storybook
```

Storybook: http://localhost:6006. It is the actual [Storybook](https://storybook.js.org), running separately from the Next.js site. The `/system` page is only a small additional specimen page; it does not replace Storybook.

```bash
npm run check
npm run build
npm run build-storybook
```

`npm run start` serves the production Next.js build. The independent Storybook build is written to `storybook-static/`. Nothing is published automatically.

## Included behavior

- GSAP ScrollSmoother with 1.2s catch-up on desktop and hybrid devices with a hover-capable fine pointer; native scrolling on touch-only devices.
- Upward line masks, block masks and image reveals.
- Self-contained GSAP button hovers: rising fill, masked rolling label and diagonal arrow movement. Text links draw their underline and shift their label. Hovers work in isolated stories and Docs without a scroll wrapper.
- Reduced-motion support, accessible focus and real native links/buttons.
- Server-rendered HTML that remains visible without JavaScript.
- Shared fonts, typography, colors and spacing for the site and Storybook.
- 26 initial stories covering foundations, buttons, navigation, cards, sections and motion.
- Agent role briefs for reference analysis, assets, implementation, component documentation and visual review.

The demo is not the target site's identity. Replace its lime palette, Manrope font, copy and geometric artwork with the supplied reference's design.

## Typography and the 8px grid

Every H1 shares one family, weight, size and line-height at a given breakpoint; the same applies to H2, H3 and H4. Set these once in `src/styles/tokens.css`. Responsive changes apply to the shared tokens, not to individual headings.

Authored font sizes, line heights, spacing, gaps, padding, radii and fixed layout dimensions are integer multiples of 8px. For example, 23 becomes 24 and 61 becomes 64. Record meaningful source-to-token differences in `design/decisions.md`. No fractional rem/vw or fluid clamp typography.

Hairline borders of 1px and focus outlines of 2px are technical exceptions. Original SVG geometry and image aspect ratios remain intact. Percentage layouts and animation interpolation can produce fractional browser coordinates; they are not fractional design tokens.

## Project map

| Location | Purpose |
| --- | --- |
| `AGENTS.md` | Setup gate, implementation rules, definition of done |
| `tooling/` | Required skill bundles, sources and integrity manifest |
| `.agents/skills/` | Installed skills and local workflow instructions |
| `instructions/agent-roles.md` | Bounded task briefs for available agents |
| `src/styles/tokens.css` | Shared type, color, spacing and breakpoint tokens |
| `src/components/motion/` | Reusable GSAP primitives |
| `src/lib/motion-config.ts` | Duration, easing and stagger defaults |
| `src/stories/`, `.storybook/` | Separate component catalogue |
| `public/assets/` | Project-local images and SVGs |
| `design/` | Reference brief, asset provenance and design decisions |
| `verification/` | Browser evidence and checked results; excluded from clean copies |

## Use the motion primitives

```tsx
import { Reveal, RevealText } from '@/components/motion/reveal';
import { MotionButton } from '@/components/motion/motion-button';
import { MotionLink } from '@/components/motion/motion-link';

<RevealText as="h1">Your reference heading</RevealText>
<Reveal><p>Section copy</p></Reveal>
<MotionButton href="/contact">Discuss a project</MotionButton>
<MotionLink href="/about" className="text-link">Meet the team ↗</MotionLink>
```

`MotionRoot` is already connected once in the root layout. New content uses the provided primitives or documented attributes to receive motion. Text containing interactive links uses `Reveal`, not `RevealText`. Fixed headers and modal portals belong outside transformed content.

Storybook shares production components and styles. Button and link hovers work in every story and Docs page. Scroll and entrance effects opt in with `parameters.motion: true`; Docs pages do not instantiate ScrollSmoother. Add a story in the same change as each new component.

## Graft and external capabilities

Use `npm run graft -- map` for orientation, `npm run graft -- ask "your question" --source` for code context, and other commands documented by the installed skill. Default indexing is local and requires no model API key; deep LLM indexing is not enabled.

Figma still requires an available connector and permission to read the supplied file. Screenshot imagery requires an available image-generation tool. Skill installation cannot create those account connections. No target reference has been supplied for this starter, so its Figma and screenshot workflows are prepared instructions rather than a claimed reconstruction.

Sources: [GSAP skills](https://github.com/greensock/gsap-skills), [Graft](https://github.com/trailhq/Graft), [Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components), [ScrollSmoother](https://gsap.com/docs/v3/Plugins/ScrollSmoother/), [Storybook for Next.js](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite), [Codex instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
