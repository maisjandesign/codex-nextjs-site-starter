# Build a website with this template

This guide takes you from a clean project folder to a reference-based Next.js website with GSAP motion and a separate Storybook. All project work, UI copy, instructions, and documents stay in English. Chat replies follow the language you use.

## 1. Create your project

Open [codex-nextjs-site-starter](https://github.com/maisjandesign/codex-nextjs-site-starter) and choose **Use this template → Create a new repository**. Choose your project's name and visibility, then clone the new repository:

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-PROJECT.git
cd YOUR-PROJECT
```

Replace both placeholders with your actual account and repository. Work in this new project so its design and commits stay separate from the canonical starter.

Alternatively, download the starter using **Code → Download ZIP**, extract it, and open the extracted folder. Keep `.agents`, `.storybook`, `.gitignore`, and the other hidden files. The correct project root contains `package.json`, `AGENTS.md`, and this guide.

If you already have a local starter copy, create a clean project without dependencies or readiness markers:

```bash
npm run new-project -- /absolute/path/to/my-new-site
```

The destination must not exist and must be outside the starter directory. This helper creates the folder; it does not create a GitHub repository or initialize Git.

## 2. Check the requirements

- Node.js 22.14 or newer, and npm. `.nvmrc` selects Node 22 if you use nvm.
- Network access to install locked npm packages.
- Codex with access to your project folder and permission to run its setup commands.
- For Figma work: a connected Figma integration with access to the supplied file.
- For screenshot imagery: an available image-generation tool. Supply original brand assets and fonts separately when available.

Check your local runtime:

```bash
node --version
npm --version
```

The project installs skill instructions locally. This does not sign in to Figma, install account-wide plugins, or create an image-generation connection.

## 3. Open the folder in Codex and attach the reference

Start a task in the project root. Attach a Figma frame/node URL or a screenshot. Include required page content, target pages, and any supplied fonts, logos, or images. When mobile designs exist, include them too.

Opening the folder alone does not run setup. Send the task below to start work.

### Starting prompt

```text
Follow AGENTS.md in this project.

Before reference analysis or layout work, run npm run setup and npm run setup:check.
Install and verify all 11 skills from jakubkrehel/skills, all 8 official
GSAP skills from greensock/gsap-skills, and Graft. Read
instructions/skill-installation.md and apply the installed skills for
the current stage. Preserve explicit-only invocation policies.

As soon as setup succeeds, implement the attached reference without
asking for another go-ahead. Use Next.js App Router and TypeScript.
Preserve the reference's composition, visual character, and assets.
Keep heading styles consistent at each breakpoint and normalize authored
dimensions and spacing to the shared 8px grid. Record material deviations.

Include GSAP smooth scrolling, upward masked reveals, expressive button
hovers, and animated text links. Use the production motion primitives.
Create a separate Storybook containing every reusable component and state.
Verify the site and Storybook, including responsive layouts and motion.

Keep project work, UI, and documents in English. Reply in my language in chat.

My brief and references:
[Describe the website and attach the reference here.]
```

### Figma reference

Provide a link to the actual frame or node. Codex should inspect the design structure, typography, spacing, and screenshots, then export available original images, icons, and SVGs to `public/assets/`. It records asset provenance in `design/assets.json` and normalization decisions in `design/decisions.md`.

If Figma access is unavailable, Codex must identify the access gap. A screenshot cannot establish measurements from editable Figma layers or provide the original asset files.

### Screenshot reference

Attach the clearest available image, preferably at its original size. Codex reconstructs the interface as real HTML and components, measures visible relationships, and generates missing raster imagery to match the reference's subject, crop, and mood. Text, controls, and layout are implemented in code.

Supply official logos and icons when available. Generated imagery should not be described as an original exported asset. Record inferred layout details and asset substitutions.

## 4. Mandatory setup

Codex runs these commands before editing the design. You can run them yourself too:

```bash
npm run setup
npm run setup:check
```

Setup validates the bundled files, installs 20 required skill folders into `.agents/skills/`, restores pinned dependencies with `npm ci`, and prepares the local Graft CLI and code index. The required set contains all 11 skills from [jakubkrehel/skills](https://github.com/jakubkrehel/skills), all 8 from [greensock/gsap-skills](https://github.com/greensock/gsap-skills), and Graft. Three additional workflow skills are already included. See [the installation rules and complete inventory](instructions/skill-installation.md).

Both requested source collections are pinned to exact commits with full file hashes. Setup skips verified current files, restores missing references, and upgrades unchanged known older snapshots. Unknown user edits are preserved and reported as conflicts. Installation does not activate explicit-only review, explanation, variant, or stress-test skills; those still need the corresponding user request.

The readiness marker belongs to this exact folder and dependency lockfile. Each new clone, extracted ZIP, or copied project needs its own setup. Installed skill copies and local caches are ignored by Git; their reproducible bundles are tracked under `tooling/`.

After successful setup, Codex starts the supplied design immediately. If no reference is attached, it asks for one. If setup fails, it resolves or reports the actual failure before dependent layout work.

## 5. Run both previews

In the first terminal:

```bash
npm run dev
```

Open [the website](http://localhost:3000). The additional [system specimen page](http://localhost:3000/system) shows shared styles.

In a second terminal in the same project folder:

```bash
npm run storybook
```

Open [Storybook](http://localhost:6006). It is a separate application built from the site's real components and shared styles.

Stop a server with `Ctrl+C` in its terminal. Stop development servers before building and serving production previews, then reload the browser to clear stale development modules and prefetched pages.

## 6. Verify the default motion

| Interaction | Expected behavior | Where to check |
| --- | --- | --- |
| Desktop scroll | Content gradually catches up to native scrolling; default 1.2 seconds | Scroll the website or open Motion / Presets / Scroll |
| Heading or block entrance | Content rises from below inside a stationary mask | Scroll through the page or open Motion / Presets |
| Button hover | Fill rises, label rolls through a mask, arrow moves diagonally | Any button story; Components / Button / Hover And Focus |
| Text-link hover | Underline draws and the label shifts 8px | Components / Navigation / Link Hover |
| Keyboard focus | Visible focus plus the supported GSAP interaction | Use Tab on buttons and links |
| Pointer exit | Animation reverses from its current progress | Move in and out before a hover finishes |
| Disabled button | No GSAP hover and no activation | Components / Button / Disabled |

Button and link hovers work without MotionRoot, including ordinary Storybook stories and Docs. Page scrolling and entrance previews need MotionRoot; the website already has one in `src/app/layout.tsx`. Do not add another scroll engine.

Touch-only devices use native scrolling. Reduced-motion preferences disable decorative animation. Hybrid devices with a hover-capable fine pointer can use smooth scrolling. Change shared durations and easing in `src/lib/motion-config.ts`.

## 7. Keep the design system consistent

Edit shared typography, color, spacing, and size tokens in `src/styles/tokens.css`. Every H1 has one style at a given breakpoint; the same applies to each other heading level.

Authored layout dimensions, font sizes, line heights, spacing, and radii use integer multiples of 8px. For example, 23px becomes 24px and 61px becomes 64px. Borders of 1px and focus outlines of 2px are technical exceptions. Original SVG geometry, intrinsic image ratios, and intermediate animation coordinates keep their natural values.

Use `MotionButton` for actions, `MotionLink` for navigation text links, and `AnchorLink` for same-page navigation. Use `RevealText` for plain text and `Reveal` for blocks containing interactive elements. Create stories when adding components, using the production implementation rather than copied markup.

Replace the demo's lime palette, Manrope typeface, artwork, and content with the supplied design. The demo is an implementation example, not a mandatory visual style.

## 8. Check and build

```bash
npm run check
npm run test:setup
npm run build
npm run build-storybook
```

`check` runs TypeScript, ESLint, and the authored CSS grid/component-story checks. These checks do not replace visual comparison, actual motion testing, or accessibility review.

For a production website preview after a successful build:

```bash
npm run start
```

The Storybook production build is written to `storybook-static/`; serve that folder with a static web server. Do not open its HTML directly using a `file://` URL.

On GitHub, the Frontend quality workflow runs setup, installation regression tests, checks, and both builds after pushes and pull requests. It does not run browser visual QA or publish either app. Codex should still inspect the reference viewport and relevant desktop, tablet, and mobile widths, and report actual results under `verification/`.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Setup gate says the marker is missing or belongs to another folder | Run `npm run setup`, then `npm run setup:check` in this project |
| A required skill/reference file is missing | Run `npm run setup` to restore missing files from the verified bundles |
| Skill integrity mismatch caused by local edits | Compare the named installed folder with `tooling/skills/`; preserve deliberate edits, resolve the conflict, then rerun setup |
| npm installation fails | Read the actual error; check Node version, package-registry/network access, and filesystem permissions. Keep the committed lockfile |
| Graft index is missing | Rerun `npm run setup` to recreate and verify the local index |
| Port 3000 or 6006 is occupied | Use `npm run dev -- --port 3100` or `npm run storybook -- -p 6106` and open that port |
| Smooth scroll or hover appears absent | Check reduced-motion settings and input capabilities; check the correct story and browser console; confirm shared components are used |
| Old content appears after edits or switching builds | Stop the previous server, start the intended preview, and reload the browser |
| Figma cannot be inspected | Connect the available Figma integration and verify access to the exact file/node |
| Screenshot imagery cannot be generated | Make an image-generation tool available or supply usable original assets; record the limitation |

## Maintaining the starter

Changes to this canonical template are separate from websites created from it. Review and verify a template change before committing and pushing it. Preserve shared Git history; use normal commits and avoid force pushes. Check the remote commit and GitHub Actions result after publishing.

The prior implementation is retained in the `archive/before-reference-starter-20260923` branch of the canonical repository. New projects should start from the current `main` branch. Updates to the template are not automatically merged into projects created from it.

Reference: [GitHub template repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository).
