---
name: plan
description: Create a grounded, executable plan for a task when planning is requested or needed before implementation.
---

# Plan

Planning is read-only. Use the `planner` subagent to inspect the workspace and return one compact Markdown plan. The main agent owns the task, validates the returned plan against the user's authorization and acceptance criteria, and persists it. The planner cannot write the plan or project files.

1. Resolve objective, scope, constraints, known evidence, and all supplied decision materials (Objective, Scope, Constraints, Evidence / Context, Expected Result, Verification, Done When). Ask only for a material missing decision unavailable from context/source.
2. Invoke the installed `planner` in the inherited workspace with that complete packet. Require grounded existing-solution/reuse/simple-option analysis, affected files, ordered changes, verification, unknowns, and Done When. Request plan Markdown only. Invocation starts asynchronous work, not a finished plan: wait for the planner's result using native waiting/message handling before continuing. Do not finalize with "standing by" while required work is running. If the named agent fails to start, report that error; do not define a replacement or perform its work yourself.
3. Review every step for scope authorization, dependency order, existing patterns, safe verification and observable completion. Reject unsupported assumptions and revise the packet if needed; do not delegate implementation.
4. Persist the validated Markdown as an ordinary workspace file under `.workflow/plans/<SEQ>-YYYYMMDD-<slug>.md`. Inspect existing names and choose the next available sequence without overwriting. No tier label is required. Do not modify historical artifacts. Do not create a second native implementation-plan artifact or request artifact feedback for this planning-only result: native feedback auto-approval can trigger execution. If artifact metadata is required, set `RequestFeedback: false`.
5. For a planning-only invocation, report the saved path and summary and finish. Do not invoke executor, run implementation verification, or edit project source. Artifact approval is not execution authorization. The separate `/execute` or `/orchestrate` request owns execution consent. When this procedure is composed by an already-authorized `/orchestrate`, return the saved path to that composition instead.

For `/plan`, note that Antigravity has a built-in command of the same name. Explicitly read and follow this skill and invoke the planner for planning-only requests; do not claim this skill overrides native command expansion. If native mode prevents writing the artifact, return the validated plan and explain the limitation rather than lowering safety settings.

Plans are instruction artifacts, not proof of execution. Verification commands must be appropriate to the environment and user constraints. A one-step plan is valid when sufficient.
