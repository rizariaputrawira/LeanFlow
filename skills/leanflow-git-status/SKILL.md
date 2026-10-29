---
name: leanflow-git-status
description: "Report local Git changes and distinguish uncommitted, unpushed, unmerged, unreleased, and released work."
---

# Evidence-qualified Git status

Produce a nonmutating, evidence-qualified report. Never stage, commit, push, tag, publish, merge, checkout, stash or edit a changelog. Do not fetch implicitly: fetching changes refs and the evidence snapshot. Disclose potentially stale remote refs. Read-only commands below are procedures to use only when current assignment/tool permissions allow execution; under a no-command boundary, inspect supplied evidence and mark missing facts unknown.

1. **Define scope and refs.** Establish repository, branch, worktree and explicit comparison baseline from accessible facts. Without a defensible baseline, state the limit rather than inventing one. Use `git --no-optional-locks status` to avoid optional index refresh, relevant read-only `git diff` for staged/unstaged content, `git log` and `git rev-list` evidence as needed. Inspect untracked paths only within scope. Do not invoke external diff/textconv helpers or execute hooks, repository scripts or aliases; use read-only tooling that does not execute repository-provided comparison code.
2. **Separate dimensions.** Report unstaged, staged, untracked, local commits ahead/behind the selected upstream, pushed-but-unmerged, merged-but-unreleased and released work separately. Missing upstream/tracking means ahead/behind unknown, not zero. Ahead commits alone do not prove unmerged work. Remote claims describe the local-ref snapshot unless fresh, explicitly authorized evidence exists.
3. **Support merge/publication claims.** Inspect available tracking refs and, when permitted and available, relevant supplied/open PR base/head and state. Do not infer PR state solely from hashes: squash merges, cherry-picks, rebases and equivalent changes can alter ancestry. State unavailable API/PR evidence. Network lookup is not implicit permission to fetch, authenticate or publish.
4. **Support release claims.** Use an explicitly selected release line and ancestry. Tags, release records and changelog entries are optional evidence, not guaranteed inventory. Do not select nearest tags or sort dates blindly; a tag is not proof of deployment. No defensible release baseline means unknown, with the missing fact named.
5. **Return a bounded report.** For each dimension give present/absent/unknown, baseline/ref, supporting evidence and confidence/limits. Separate local/index/untracked content from commits and remote publication, and released identity from actual deployment. Report only requested-scope evidence, not unrelated repository content or secret values.

## Commit and PR use

When a commit-message task needs the exact change/publication basis, supply this report to [leanflow-commit-message](../leanflow-commit-message/SKILL.md); status does not authorize a commit. When PR preparation needs branch, WIP or publication context, supply it to [leanflow-pr-work](../leanflow-pr-work/SKILL.md); it does not authorize staging, synchronization, PR posting or a push. These are conditional composition points, not automatic workflow stages. If the surrounding task is read-only/planning-only, helpers preserve that boundary.
