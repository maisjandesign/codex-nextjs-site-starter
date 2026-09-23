# Install before implementation

Run `npm run setup` in this project before coding or starting a new site's preview. This is the required preparation step, not an optional check to skip when Graft is missing. It requires Node.js 22.12+ and npm; it uses Node built-ins and works before node_modules exists.

```bash
npm run setup
npm run graft:build
npm run graft:map
npm run dev
# In another terminal:
npm run storybook
```

The `predev` and `prestorybook` hooks run setup automatically, so ordinary project startup cannot silently skip it. Run setup explicitly before agent implementation too; npm hooks cannot run merely because a folder was opened in Codex. Directly invoking `next`/`storybook`, disabling npm lifecycle scripts or reading instructions without executing setup bypasses this preparation.

## What is installed and what is skipped

1. **All 21 required local skills:** `scripts/required-skills.json` lists their complete file sets and a pinned source commit. Complete skills under `.agents/skills` are already installed for this project; print SKIP and leave them intact. Keep valid local customizations. Restore only missing files, from the exact Git commit locally when available, otherwise from the pinned template source on GitHub. Verify downloaded bytes against the recorded SHA-256 before writing. Empty/invalid existing resources are reported for repair rather than silently overwritten.
2. **Project dependencies:** inspect direct dependency versions against package-lock.json, npm's dependency tree, Next.js/Storybook executables and the actual Graft CLI. If valid, skip package installation. If missing or invalid, run `npm ci --include=dev` using the committed lockfile, then check again. This installs the locked dependency set, including native parser dependencies; it does not download only one missing package. The install replaces this project's node_modules as npm ci normally does. It does not upgrade package versions or borrow node_modules from another project.
3. **Tool readiness:** a Graft SKILL.md is instructions, not the executable. Graft also needs `@nanonets/graft` in this project's devDependencies. After setup, build/map the current code under GRAFT.md; a version check does not prove the graph is complete or every source language is parsed.

Setup reports each skill as SKIP or RESTORED, whether packages were installed/skipped, and READY only after verification. Simultaneous preview starts serialize setup with `.starter-setup.lock`; the waiting process verifies again and skips completed installation. If a process was forcibly terminated, check that it has stopped before removing a stale lock and retrying.

## Local skill scope

Keep skills in the project-local `.agents/skills` directory. A global installation does not replace a missing pinned project copy; existing project copies are not reinstalled just to register them globally. This preserves the project's versions and invocation policies without changing other projects. No global Codex/Claude configuration, hooks or Graft init is needed. Optional skills merely mentioned in upstream recipes and environment-provided Figma/image tools are not automatically installed.

A filesystem install and loading instructions are separate steps. After setup, load the skills for the current stage under SKILL-ROUTING.md. Newly restored skills may need a new task/turn to appear in automatic discovery; read their exact local SKILL.md path meanwhile. See the [official skills documentation](https://developers.openai.com/codex/skills/) for discovery and invocation behavior.

## Failed setup is not an optional-tool fallback

If setup fails, capture the exact command/error and distinguish network restrictions, filesystem permissions, registry availability, missing system/native build tools and an invalid lockfile.

- For an environment permission restriction, use its supported permission/escalation mechanism and rerun the same setup command when allowed. A sandbox network denial is not proof that npm or GitHub is unavailable. Do not bypass a denial or keep retrying unchanged failures.
- For an actual registry outage/offline environment, npm may use its existing cache where sufficient. If required files/packages are still unavailable, report setup as blocked and what access is needed. Do not fabricate successful installation, omit Graft from requirements, remove devDependencies or reuse a stale dependency directory as a completed setup.
- Continue only work independent of the missing tools, such as reference analysis and documentation. Do not present the project environment as ready or start dependent implementation under a silent fallback. An explicit user instruction can authorize a documented temporary exception.
- Rerun setup after resolving the cause. Do not claim a skill was used merely because it was found on disk; record actual loaded skills and observed CLI results in BRIEF.md.

`DO_NOT_TRACK=1` is set for setup's npm/Graft subprocesses. Dependency installation and remote skill restoration require network when the required artifacts are not cached. Graft may check npm for updates even when usage telemetry is disabled. No deep/LLM processing or model API key is part of setup.

## Maintaining the manifest

Keep required-skills.json synchronized when bundled skills change: commit the skill snapshot first, then point the manifest at that commit and regenerate its file paths/hashes. Do not use a moving branch or fetch arbitrary newest skill versions during startup. Existing valid customized copies remain untouched; snapshot hashes verify restored bytes, not enforce overwrites of user edits. Keep docs/SKILL-INVENTORY.json for upstream provenance separately. Test setup with `npm run test:setup`; the shipped-manifest restoration test needs the pinned source commit in local Git history. CI fetches history and runs setup from a clean checkout before other checks. Setup itself can still restore missing skills over GitHub when local history is unavailable.
