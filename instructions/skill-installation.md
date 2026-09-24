# Required skills: install before the project process

This is an execution rule for Codex, not a list of recommended links.

## Required order

1. Run `npm run setup` in this project before reference analysis, asset work, UI implementation, or preview startup.
2. Run `npm run setup:check`. Continue only after every required skill and supporting file, the pinned bundles, project marker, lockfile, and Graft CLI/index verify.
3. Load the installed SKILL.md files and references for the current stage. Read them directly from `.agents/skills/` if automatic discovery has not refreshed. Installation and reading are separate steps.
4. Immediately start the supplied design workflow. Do not ask for another go-ahead. If the reference is missing, request it after setup.

Do not treat a global skill, an available plugin, a repository URL, or a claim that a skill is installed as proof of this project's installation. Do not bypass the gate by invoking framework executables directly. Setup preparation and diagnosis may run before verification; dependent project work may not.

## Sources and pinned versions

Verified September 24, 2026. Both requested upstream collections are included in full, with their references and agent metadata. The source commit and path of each skill, and SHA-256 hashes of every file, are recorded in `tooling/required-skills.json`.

| Source | Pinned commit | Required folders |
| --- | --- | --- |
| [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | [267330e1adfc66a718fb65fa6918c1f06d0a689e](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e) | 11 |
| [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | [aed9cfd3277740755f6bfc1155c7aa645403b760](https://github.com/greensock/gsap-skills/tree/aed9cfd3277740755f6bfc1155c7aa645403b760) | 8 |
| [Graft](https://github.com/trailhq/Graft) | Existing verified bundle retained without an upstream update | 1 |

The installer copies the pinned files from `tooling/skills/` into `.agents/skills/`. It does not fetch a moving `main` branch or run an unpinned `npx skills add` during each project startup. The upstream licenses are retained under `tooling/licenses/`.

### Jakub collection

- `better-accessibility`
- `better-colors`
- `better-interface`
- `better-layout`
- `better-typography`
- `better-ui`
- `better-writing`
- `interface-review`
- `explain-interface`
- `break`
- `variant`

### Official GSAP collection

- `gsap-core`
- `gsap-timeline`
- `gsap-scrolltrigger`
- `gsap-plugins`
- `gsap-utils`
- `gsap-react`
- `gsap-performance`
- `gsap-frameworks`

Graft remains mandatory, including its pinned local executable. The three template workflow skills (`reference-site`, `gsap-next-motion`, `site-component-system`) are tracked directly and accompany these 20 installed skills.

## Apply the skills at the relevant stage

| Stage | Instructions to use |
| --- | --- |
| Code orientation | `graft` and its local index |
| Reference structure and type system | `better-layout`, `better-typography` |
| Palette and English interface copy | `better-colors`, `better-writing` |
| Components and interactive details | `better-ui`, `better-accessibility` |
| GSAP in Next.js | `gsap-react`, `gsap-core`, `gsap-timeline` |
| Smooth scroll and masked reveals | `gsap-scrolltrigger`, `gsap-plugins` |
| Animation helpers and performance | `gsap-utils`, `gsap-performance` when applicable |
| Scoped interface review | `better-interface` when a cross-domain review is appropriate |

Do not load every skill into context for every operation. Installing all required files is mandatory; applying a skill depends on its trigger and the current task.

Upstream explicit-only policies are preserved for `interface-review`, `explain-interface`, `break`, and `variant`. Run them only when the user explicitly invokes or requests the corresponding workflow. Their installation does not authorize redesigns, variant generation, stress testing, or a new review phase. `gsap-frameworks` covers other frameworks and is included for package completeness; the website remains Next.js App Router and uses `gsap-react`.

## Project rules override conflicting general advice

- Preserve the supplied design's composition and character. Skills do not authorize a redesign.
- Use Next.js App Router, TypeScript, and a separate Storybook of production components.
- Keep shared H1/H2/H3 styles and the 8px authored grid, with the technical exceptions documented in AGENTS.md.
- Implement the requested smooth scroll, upward masks, and expressive button/link hovers with GSAP. Generic CSS-transition or alternate-library suggestions do not replace this requirement.
- Honor reduced motion, keyboard focus, touch behavior, and lifecycle cleanup.
- Keep project work and documents in English; reply in the user's language in chat.

## Repair and verification

Setup validates bundle bytes before installing. It skips current verified files, restores missing files, and can update unchanged files from the explicitly recorded previous template snapshot. It preflights all installed files before writing any repair. Unknown local modifications cause a clear conflict and remain untouched; resolve them before continuing.

The success marker is removed before a setup attempt and recreated only after the complete installation and Graft preparation succeed. A missing skill, changed reference file, changed manifest, changed lockfile, or marker from another project makes `setup:check` fail. The `dev`, `build`, `storybook`, and `build-storybook` npm hooks enforce that check.

Run `npm run test:setup` to verify complete installation, idempotence, reference-file repair, known-version migration, protection of user edits, bundle integrity, and failed readiness. These checks also run in GitHub Actions.

Skills become available through normal discovery on a subsequent turn; direct file reads let Codex use the verified instructions immediately after setup. Account connections for Figma and image generation remain separate environment capabilities.
