# Template repository maintenance

The canonical template repository is https://github.com/maisjandesign/codex-nextjs-site-starter. Its default branch is `main`. The local source checkout used to maintain it is `work/site-starter` in the original authoring workspace.

## Updating this template

For user-requested template changes in this repository, update source and the relevant English documentation together, run checks appropriate to the change, review the diff, commit, and push to the canonical origin. Verify the remote commit after pushing. Preserve the 28 bundled skills and the recorded upstream snapshot hashes unless a skill update was explicitly requested. Keep generated token CSS synchronized with token JSON.

Use a feature branch when requested or when collaborating on a change that needs a pull request. Never force-push, rewrite shared history, or overwrite unrelated local work to publish an update. If GitHub CI fails, report and fix the failure rather than describing the release as passing. Full browser/viewport QA retains the readiness conditions in WORKFLOW.md.

Updates happen as part of an authorized task; no unattended scheduler or background sync is installed. Generated output, dependencies, local secrets, and browser reports are excluded from Git. GitHub can provide a ZIP of any committed version.

## Creating a project from the template

Use GitHub's **Use this template** action to create a separate project repository, then clone that new repository. Keep its own Git remote and derive its tokens, baseline, brief, and component stories from the project's references. This maintenance policy applies only to the canonical template repository: do not push client-project changes to the template's origin. Template improvements are not automatically merged into derived projects.
