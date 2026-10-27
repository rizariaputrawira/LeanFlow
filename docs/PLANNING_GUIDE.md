# LeanFlow Planning and Execution Guide

The four sibling skills under [`skills/`](../skills/) own LeanFlow's procedures. This guide explains how to use them; native adapters bind host tools and roles, not alternative workflow implementations.

- [`leanflow-brainstorm`](../skills/leanflow-brainstorm/SKILL.md): unresolved goals, choices, and tradeoffs.
- [`leanflow-plan`](../skills/leanflow-plan/SKILL.md): planning methods, canonical plan format, and artifact privacy.
- [`leanflow-execute`](../skills/leanflow-execute/SKILL.md): exact-plan implementation, verification, and resumption.
- [`leanflow-orchestrate`](../skills/leanflow-orchestrate/SKILL.md): explicit coordination, integration, and acceptance.

The current assistant plans and executes directly by default. Skills cannot supply tools, change model routing or permissions, register themselves, or enforce containment. The host's actual capabilities and approval boundaries remain authoritative.

## Load the workflows

Use a [native adapter](../README.md#install-a-host-adapter), or consult your host's documentation and copy the four complete `skills/leanflow-<name>/` directories into its documented skill root. Preserve their sibling layout and inspect existing ownership before replacing anything. Native registration, file readability, command routing, and behavioral correctness are separate properties; see [compatibility](../COMPATIBILITY.md).

For plain-file use, ask the assistant to read the actual skill and resolve links from its containing directory:

```text
Read skills/leanflow-plan/SKILL.md with skills/leanflow-plan/ as the base
for relative references. Plan this change; do not implement it.
```

This does not create slash commands or install agents. A skill name or invocation receipt is not evidence that the instructions ran. The core needs neither `config/`, MCP servers, optional packages, nor named agents. Node.js is needed for the adapter installer, not for reading the Markdown workflows.

## Brainstorm when choices remain

Use `leanflow-brainstorm` for unresolved goals, tradeoffs, or design decisions; skip it when the task is clear. Brainstorming alone does not authorize implementation or broader changes. A request explicitly authorizing brainstorming, planning, and implementation may flow through those stages without redundant approval ceremonies, but material ambiguity and real permission boundaries still stop dependent work.

## Plan without implementing

`leanflow-plan` is the single public planning entrypoint. It owns the exact plan format and chooses the least planning depth adequate for the evidence:

| Method | When it fits | Treatment |
| --- | --- | --- |
| **flash** | Clear, bounded, low-risk work | A concise grounded plan with concrete checks and completion criteria. |
| **super** | Integration, dependencies, or moderate uncertainty | Investigate boundaries and dependencies until the plan is actionable. |
| **hyper** | High-risk security, data, public-interface, or irreversible work; unresolved load-bearing alternatives | Five adversarial lenses and one revision; retain unresolved material issues as visible blockers. |

These are methods inside one skill, not separate packages or commands. They do not choose a model, alter permissions, or force delegation. An explicit plain-language method request is honored while risks and limitations remain visible:

```text
Use leanflow-plan with the super method for this integration. Do not implement.
```

Plans contain Goal, Scope, Constraints, Method, Steps, and Done When. Method records the choice, rationale, and limitations. A one-step plan is valid. Proposed checks are not execution evidence. Planning-only consent does not authorize source edits, implementation workers, or a native feedback/approval route that starts execution.

The current assistant normally saves `.workflow/plans/<SEQ>-YYYYMMDD-<slug>.md` without overwriting an existing record. Under orchestration, a planning delegate may return a draft; the coordinator validates and persists it. Planning responsibility does not require a registered agent named `planner`.

### Artifact privacy

Before saving generated artifacts, preserve existing `.gitignore` content and establish both `/workflow/` and `/.workflow/`. Outside a Git repository these rules carry the default forward if Git is initialized later. `.workflow/plans/` remains canonical; ignoring `workflow/` too does not silently migrate old records.

If privacy cannot be established or required writes are forbidden, disclose the limitation and return the plan in chat. Do not lower permissions, silently persist elsewhere, or treat an installer as having configured workspace privacy: the new adapters do not edit workspaces.

Ignore rules only cover untracked paths. For already-tracked generated records, obtain authorization for index-only removal preserving files on disk, or for a separate local plan preserving the original. Neither action erases historical commits or secrets. Ignored files remain readable by local tools and assistants; avoid credentials and unnecessary sensitive data.

## Execute an exact supplied plan

Explicit user authorization and an exact saved **or in-chat** plan are required. Do not implicitly select an unrelated plan because it is newest, nearby, or pending.

For a saved plan, read the full supplied file. For an inline plan, validate the exact supplied content against Goal, Scope, Constraints, Steps, and Done When. When authorized and possible, materialize that content as a local plan under the privacy procedure; preserve its meaning and disclose any path used. If persistence is unavailable, execute within existing permissions from the exact inline plan and keep status and evidence in chat. Missing material information requires a precise blocker or `REPLAN_REQUIRED`, not invented scope.

Direct execution is the default: reconcile current source and evidence, implement pending steps in dependency order, exercise relevant changed consumer paths, and report real results. A sequential direct executor may update its plan. Record:

- `[ ]` pending;
- `[x]` verified complete, with actual checks and outcomes;
- `[!]` blocked, with decisive evidence.

Tool, network, permission, and unrun-check limitations remain visible. A worker's assertion, proposed command, or successful launch is not verification. No execution FSM, ledger, evidence directory, automatic retries, or automatic Git actions are required.

Material changes to goal, scope, architecture, public interface, data, security, or irreversible effects require `REPLAN_REQUIRED`. Stop affected work and preserve completed work rather than silently redesigning, replaying irreversible operations, or rolling back unrelated changes. Ordinary implementation details within the accepted scope need not become artificial replanning gates.

## Orchestrate only when selected

`leanflow-orchestrate` composes planning and execution within the requested scope. It does not authorize destructive operations, external actions, installation, or Git publishing beyond existing consent.

1. Discover the host's real delegation interface and available roles. Optional native `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` bindings are conveniences, not mandatory core dependencies. Do not invent tools or model tiers.
2. Delegate bounded research or drafting where supported. Validate the draft and selected method before saving the canonical plan.
3. Split only independent implementation work, with exact plan content or path, assigned step IDs, constraints, ownership, and required evidence. Sequence actual dependencies and retain one integration owner.
4. During parallel execution, the **coordinator is the sole writer of the shared plan**. Workers return assigned step IDs, changed paths/results, verification performed and unrun, and blockers. They do not race to update checkboxes.
5. A delegated executor reads the relevant canonical execution procedure for its assignment; it does **not** recursively launch execution or orchestration. Planner/reviewer bindings likewise do not grant permission to implement.
6. Wait for actual worker completion before dependent handoffs or acceptance. Resolve status and partial effects after failure before takeover; do not blindly retry or duplicate running work.
7. Integrate changes and exercise the combined consumer path. The coordinator owns final acceptance against Done When; worker status alone is insufficient.

If delegation is unavailable, disclose the limitation and perform the authorized flow directly when allowed. If the user requires delegation-only work, stop the dependent work rather than silently substituting direct execution. A launched worker's failure does not justify pretending no work occurred.

Review is optional when requested or justified by concrete risk, not a mandatory role stage. On `REPLAN_REQUIRED`, orchestration permits at most one automatic revision within the original authorization, preserving the old plan and completed work. Broader scope requires the user; a second material invalidation stops dependent work.

## Resume and migrate carefully

Explicitly supplied legacy `.planning/` and `.ar-wf/` plans remain usable. Inspect relevant state, notes, ledgers, and evidence; reconcile discrepancies with current code before replaying anything. Those records are not required new execution state. A legacy plan missing material scope, checks, or Done When requires `REPLAN_REQUIRED`; preserve the original and prepare a separate grounded revision only within authorization.

The retired `flashplan`, `superplan`, and `hyperplan` packages have no compatibility aliases; use methods of `leanflow-plan`. All shipped user-invoked skills use the `leanflow-` prefix. A name match does not prove ownership or justify deletion.

The 25 packages under `config/skills/` remain legacy optional source, outside the new core installer. Their helper flags, Git/PR workflows, and host dependencies are not core requirements. See [legacy configuration](LEGACY_CONFIGURATION.md) before using old configuration or interpreting old invocation spellings.

## Verification and evidence limits

Current native compatibility and any newly observed evidence belong in [`COMPATIBILITY.md`](../COMPATIBILITY.md). The [historical record](LEGACY_CONFIGURATION.md#historical-verification-record) preserves prior source-loaded method smokes, old namespace/installer checks, and Antigravity observations with their limitations. Those results predate the new adapters and do not verify their current registration, delegation, or safety behavior.

File readability, relative links, native discovery, command routing, delegation, instruction following, and safety enforcement require distinct evidence. LeanFlow supplies guidance, not a runtime enforcement layer or a demonstrated all-host effectiveness guarantee.
