---
name: leanflow-orchestrate
description: Coordinate planning and execution end to end when the user explicitly requests orchestration.
---

# LeanFlow Orchestrate

This explicitly selected strategy composes [`../leanflow-plan/SKILL.md`](../leanflow-plan/SKILL.md) and [`../leanflow-execute/SKILL.md`](../leanflow-execute/SKILL.md). Read both actual bodies; they own method selection, plan format, artifact privacy, implementation, and verification. The current agent coordinates scope, shared-plan state, integration, and acceptance.

1. Resolve objective, scope, constraints, and acceptance criteria. Orchestration authorizes planning followed by implementation only within the requested task and actual permissions; planning-only or read-only consent still stops before implementation. If material choices remain, use [`../leanflow-brainstorm/SKILL.md`](../leanflow-brainstorm/SKILL.md) before committing to an approach; do not repeat settled decisions.
2. Discover the host's available delegation interface and permitted roles. Use supported workers, not invented agent names, model tiers, runtime flags, or tool aliases. If delegation is unavailable, disclose and perform authorized stages directly only when direct work is permitted. An explicit delegation-only constraint makes unavailable or forbidden delegation a blocker; do not silently take over.
3. Complete canonical planning unless an explicit plan was supplied for execution: let `leanflow-plan` choose flash, super, or hyper from evidence unless the user requested a method. Delegate read-only research/drafting when supported, then validate the returned method, plan, and rationale. The coordinator alone saves the plan under canonical privacy rules, or retains its complete content in chat. A launch receipt is not a completed plan.
4. Execute that exact saved plan or inline content under canonical execution. Split only independent work with bounded nonoverlapping write ownership and explicit shared contracts; sequence true dependencies and retain one integration owner. Prepare the **Assignment packet** below for every worker. Workers read the applicable canonical procedure, return results and evidence, and never recursively orchestrate.
5. Keep a single writer for shared-plan state: the coordinator alone updates the shared plan, step status, and aggregate evidence throughout delegated work. Assign stable step IDs to inline steps if absent, without changing their meaning. Workers return their assigned IDs and evidence; no worker receives shared-plan write ownership. For parallel implementation, reserve combined gates for the coordinator after all relevant workers finish; assign any independent worker checks explicitly.
6. Wait for actual results before dependent work or acceptance. On failure, report it and resolve worker status and partial effects before recovery within authorization. Do not blindly retry, replay completed work, or conceal a switch to direct execution; delegation-only constraints still apply.
7. Integrate results and exercise the combined consumer path with authorized checks. Check actual changes and evidence against acceptance criteria, not worker status alone. Use the **Delegated review** procedure when independent source review is requested or justified by concrete risk; it is not mandatory.
8. Report observed outcomes, verification, blockers, and unavailable capabilities. Do not finish at handoff receipts while required work remains running.

## Assignment packet

Provide each worker a self-contained packet, not only a role name or a reference to conversation history:

- **Task and plan:** objective, constraints, acceptance criteria, and the exact selected plan path with access instructions, or its complete inline content. Identify assigned step IDs and pending work; include settled decisions and relevant completed-step evidence.
- **Source resolution:** workspace/source root, base for relative plan references, and actual location or supported discovery route for the relevant canonical skill body. Relative links resolve from the file containing them, not the worker's assumed working directory. Missing access to required content blocks that dependent work.
- **Ownership and dependencies:** exact writable paths/areas, read-only context, exclusions, shared interfaces, prerequisites, and integration owner. Identify the coordinator as sole shared-plan writer; do not assign overlapping writes.
- **Permissions and checks:** read/write/execution limits, destructive/external-effect consent, explicit delegation-only constraints, allowed assigned checks with expected observations, coordinator-reserved gates, and actions requiring a blocker or `REPLAN_REQUIRED`. Role declarations do not widen authority.
- **Return evidence:** assigned step IDs, source citations or changed paths, results, exact checks/observations, unrun checks and reasons, blockers, and partial effects. Require actual results, not a launch receipt. Workers must not invoke other workers or orchestration workflows.

## Delegated review

Give the reviewer the supplied changes or source boundary, plan/acceptance criteria, and relevant evidence through the assignment packet. It inspects source only: no edits, command execution, payload execution, or delegation. Return actionable findings ordered by severity with exact file/line citations, impact, and a concise correction; distinguish unsupported concerns from demonstrated defects. If none are found, state the inspected scope and limitations. Supplied check evidence is not a check the reviewer ran.

`REPLAN_REQUIRED` permits at most one coordinator-led automatic revision within original authorization and only when replanning is permitted. Preserve the old plan, include decisive evidence and completed work, and do not replay verified steps. Broader scope requires the user's decision; a second material invalidation stops dependent work.

Native roles and prose specify intended tool policy, not OS containment or guaranteed suppression of ambient tools. Respect inherited tools and host permissions; do not change model or approval settings. No automatic commits, pushes, FSMs, or ledgers.
