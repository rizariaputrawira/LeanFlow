---
name: orchestrate
description: Plan and execute a user-authorized task end to end using the native planner and executor roles.
---

# Orchestrate

The main agent owns the task, approvals, plan, and final acceptance. This composes the canonical [`../plan/SKILL.md`](../plan/SKILL.md) and [`../execute/SKILL.md`](../execute/SKILL.md); those files own their respective procedures.

An explicit `/orchestrate <task>` authorizes this plan-then-execute composition, subject to real safety boundaries. Read both canonical skill bodies. Complete each asynchronous handoff before starting its dependent phase: wait for planner output, save the validated plan, wait for executor evidence, then accept. A launch receipt or "standing by" is not a final result. Use installed named agents, never transient replacements or main-session implementation if an agent fails.

1. Resolve the user's objective, scope, constraints, and Done When. Ask only for material missing information that cannot be resolved from supplied context or source.
2. Run the plan workflow: invoke the read-only planner, validate the returned plan against authorization and evidence, and persist it without overwriting existing plans.
3. Continue to execution only when the user's request authorizes both planning and implementation. Invoke the executor against that exact saved plan; no extra approval prompt is required when already authorized.
4. Assess actual changed files and verification evidence against the current plan's Done When. Report outcomes and limitations honestly.

A `REPLAN_REQUIRED` response permits at most one automatic planner revision. Include the original objective, current changes, completed work, and decisive evidence. Preserve the old plan, do not replay completed work, and validate the revised scope against original authorization. If it exceeds that authorization, stop for the user. A second material invalidation stops the workflow. Never suppress failures with retries or add commits, FSMs, ledgers, or evidence directories by default.

An optional read-only reviewer may be used when requested or when a concrete risk merits it; review is not a mandatory stage. Do not spawn or nest agents except the planner, executor, and optional reviewer roles. Native custom-agent declarations and guidance do not establish OS containment. Ambient MCP access can remain available; `mcpServers: []` does not promise suppression of inherited MCP. Follow intended permissions behaviorally, especially for shell and inherited MCP actions.

For `/plan`, Antigravity's built-in command may expand instead of this skill. Explicitly load the plan skill for planning-only intent; do not claim override. If native mode blocks persistence, return the validated plan with the limitation and do not lower safety settings.
