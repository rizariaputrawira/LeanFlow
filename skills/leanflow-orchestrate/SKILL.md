---
name: leanflow-orchestrate
description: Coordinate planning and execution end to end when the user explicitly requests orchestration.
---

# LeanFlow Orchestrate

This explicitly selected strategy composes [`../leanflow-plan/SKILL.md`](../leanflow-plan/SKILL.md) and [`../leanflow-execute/SKILL.md`](../leanflow-execute/SKILL.md). Read both bodies; they own method selection, plan format, artifact privacy, implementation, and verification. The current agent owns scope, integration, and acceptance.

1. Resolve objective, scope, constraints, and Done When. Orchestration authorizes planning followed by implementation within the requested task and actual permissions. If material choices remain, use [`../leanflow-brainstorm/SKILL.md`](../leanflow-brainstorm/SKILL.md) before committing to an approach; do not repeat settled decisions.
2. Discover the host's available delegation interface and permitted roles. Use supported workers, not invented agent names, model tiers, runtime flags, or tool aliases. If delegation is unavailable, disclose and perform the same authorized stages directly; delegation is not a prerequisite.
3. Complete canonical planning: let `leanflow-plan` choose flash, super, or hyper from evidence unless the user requested a method. Delegate read-only research/drafting when supported, then validate the selected method, plan, and recorded rationale before saving under its privacy rules. Method depth does not force delegation. A launch receipt is not a completed plan.
4. Execute that exact plan under canonical execution. Delegate implementation when supported. Split only independent work with bounded ownership and explicit shared contracts; sequence dependencies, avoid overlapping edits, and retain one integration owner. Workers return results and evidence, not expanded scope or nested orchestration.
5. Wait for actual results before dependent work or acceptance. On failure, report it and resolve worker status and partial effects before recovery within authorization. Do not blindly retry, replay completed work, or conceal a switch to direct execution.
6. Integrate results and exercise the combined consumer path. Check actual changes and evidence against Done When, not worker status alone. Review is optional when requested or justified by concrete risk, not mandatory.
7. Report observed outcomes, verification, blockers, and unavailable capabilities. Do not finish at handoff receipts while required work remains running.

`REPLAN_REQUIRED` permits at most one automatic revision within original authorization. Preserve the old plan, include decisive evidence and completed work, and do not replay verified steps. Broader scope requires the user's decision; a second material invalidation stops dependent work.

Native roles and prose do not establish OS containment. Respect inherited tools and host permissions; do not change model or approval settings. No automatic commits, pushes, FSMs, or ledgers.
