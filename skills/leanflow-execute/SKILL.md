---
name: leanflow-execute
description: Execute a user-authorized, explicitly supplied plan and report evidence for each step.
---

# LeanFlow Execute

Use the current host's permitted tools. Execute directly by default; no named role, model, tool API, or runtime is required. This skill does not grant permissions.

1. Read the exact supplied plan fully. Check Goal, Scope, Constraints, Steps, and Done When against current authorization. Do not select a plan implicitly. Missing material information requires a precise blocker or `REPLAN_REQUIRED`, not broadened scope.
2. Before updating artifacts, follow the privacy procedure in [`../leanflow-plan/SKILL.md`](../leanflow-plan/SKILL.md), step 5. Both `.workflow/` and `workflow/` stay untracked by default. If a supplied plan elsewhere is tracked, report that and obtain authorization to untrack it or create a separate local plan without overwriting the original.
3. Reconcile status with current source and evidence before resuming. Explicit legacy `.planning/` and `.ar-wf/` paths remain usable; inspect relevant state/notes/evidence as needed. Status alone does not authorize replaying irreversible work. Preserve historical artifacts.
4. Implement pending steps directly in dependency order within authorized scope. When explicit orchestration requests delegation, use available permitted host workers with exact plan path, complete constraints, assigned ownership, and required evidence; do not recursively invoke this workflow. If delegation is unavailable before launch, disclose and execute directly. Resolve launched worker status and partial effects before takeover; do not conceal failed work or duplicate running tasks.
5. Verify meaningful changes with relevant checks and exercise the changed consumer path when practical. Observe actual output; tests or worker status alone do not prove all acceptance criteria. Record commands/interactions, outcomes, and unrun checks without credentials.
6. Update the supplied plan inline: `[ ]` pending, `[x]` verified with evidence, `[!]` blocked with decisive evidence. Note minor adaptations inline. Material changes to goal, scope, architecture, public interface, data, security, or irreversible effects require `REPLAN_REQUIRED`; do not independently replan or broaden authority.
7. Check combined changes and evidence against Done When. Report changed paths, observed behavior, blockers, and verification limits. Finish when authorized acceptance criteria are met or a specific blocker prevents dependent work.

Respect the host's real permissions. A plan or runtime auto-approval does not replace required authorization for destructive effects. Do not add automatic commits, pushes, branches, worktrees, retries, FSMs, ledgers, host configuration changes, or evidence directories.
