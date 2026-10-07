---
name: execute
description: Execute a user-authorized, explicitly supplied plan and report evidence for each step.
---

# Execute

1. Confirm the supplied plan exists and read it fully. Check Goal, Scope, Constraints, Steps, and Done When against user authorization. Missing material information means stop with a precise blocker or `REPLAN_REQUIRED`, not broaden scope.
2. Invoke the installed `executor` with the exact plan path and complete user authorization/constraints. Require it to read the plan, implement pending steps in dependency order, verify each step, and record evidence inline. Do not ask it to load this skill recursively. Invocation is asynchronous: wait for its actual result using native waiting/message handling before acceptance. Do not finalize with "standing by" or only an invocation receipt. A failed agent start is a blocker, not permission to define a replacement or implement in main.
3. Review the executor's actual changed files and verification evidence against plan scope and Done When. Agent status alone is not proof. The main agent owns acceptance, reports limitations, and does not silently widen scope.
4. When executor identifies a material change to goal, scope, architecture, public interface, data, security, or irreversible effects, stop as `REPLAN_REQUIRED` with decisive evidence. Minor adaptations must be noted inline. A blocker is `[!]` with concise evidence; do not retry to hide failures.

Checkboxes in the supplied plan are `[ ]` pending, `[x]` verified complete, `[!]` blocked. The executor updates them only with evidence and records each verification command and outcome inline, redacting secrets. Do not add default FSM, notes, ledger, evidence directory, retries, or commits.

Legacy `.planning/` and `.ar-wf/` paths remain usable when explicitly supplied or needed to resume. Read relevant legacy state, notes, ledger, and evidence as needed. Resolve discrepancies against current source and actual evidence before replaying work; status or checkbox alone does not authorize repeating irreversible actions. Preserve historical artifacts.
