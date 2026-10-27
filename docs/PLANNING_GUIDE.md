# LeanFlow Planning and Execution Guide

The five sibling packages under [`skills/`](../skills/) contain four primary workflow skills and `leanflow-to-spec`. They own LeanFlow's procedures. Specification capture is optional for standalone planning but required first within orchestration. This guide explains how to use them; native adapters bind host tools and roles, not alternative workflow implementations.

- [`leanflow-brainstorm`](../skills/leanflow-brainstorm/SKILL.md): unresolved goals, choices, and tradeoffs.
- [`leanflow-plan`](../skills/leanflow-plan/SKILL.md): planning methods, canonical plan format, and artifact privacy.
- [`leanflow-execute`](../skills/leanflow-execute/SKILL.md): exact-plan implementation, verification, and resumption.
- [`leanflow-orchestrate`](../skills/leanflow-orchestrate/SKILL.md): explicit specification-first coordination, planning, execution, integration, and acceptance.
- [`leanflow-to-spec`](../skills/leanflow-to-spec/SKILL.md): conversation or supplied-design synthesis into a reference specification, explicitly requested standalone or invoked as orchestration's required first stage.

The current assistant plans and executes directly by default. Skills cannot supply tools, change model routing or permissions, register themselves, or enforce containment. The host's actual capabilities and approval boundaries remain authoritative.

## Load the workflows

Use a [native adapter](../README.md#install-a-host-adapter), or consult your host's documentation and copy the five complete `skills/leanflow-<name>/` directories into its documented skill root. Preserve their sibling layout and inspect existing ownership before replacing anything. Packaging alone does not invoke `leanflow-to-spec`: a standalone specification request or explicit orchestration selects it. Native registration, file readability, command routing, and behavioral correctness are separate properties; see [compatibility](../COMPATIBILITY.md).

For plain-file use, ask the assistant to read the actual skill and resolve links from its containing directory:

```text
Read skills/leanflow-plan/SKILL.md with skills/leanflow-plan/ as the base
for relative references. Plan this change; do not implement it.
```

This does not create slash commands or install agents. A skill name or invocation receipt is not evidence that the instructions ran. The core needs neither `config/`, MCP servers, optional packages, nor named agents. Node.js is needed for the adapter installer, not for reading the Markdown workflows.

## Brainstorm when choices remain

Use `leanflow-brainstorm` for unresolved goals, tradeoffs, or design decisions; skip it when the task is clear. Brainstorming alone does not authorize implementation or broader changes. A request explicitly authorizing brainstorming, planning, and implementation may flow through those stages without redundant approval ceremonies, but material ambiguity and real permission boundaries still stop dependent work.

## Capture a reference specification

Invoke [`leanflow-to-spec`](../skills/leanflow-to-spec/SKILL.md) when requested to synthesize supplied design material or conversation into a reference specification, or as the required first stage of explicitly selected orchestration. It preserves actual decisions, requirements, constraints, unknowns, and exclusions without inventing missing requirements. Relevant original template sections, including the settled-decision table when decisions exist, organize the reference; generated output contains concrete content rather than placeholders.

Standalone planning does not require a specification. Saving a specification requires write authorization and the canonical [`leanflow-plan` privacy procedure](../skills/leanflow-plan/SKILL.md). Create `.workflow/specification/` if absent and save only to a new, non-colliding `.workflow/specification/<SEQ>-YYYYMMDD-<slug>-spec.md` when those conditions hold. Preserve existing artifacts in other directories without automatically migrating them. Otherwise return the complete specification through a permitted channel and disclose the limitation; do not persist elsewhere or lower permissions. Under orchestration this is a blocker: the required saved file cannot be replaced by inline evidence, so dependent planning and implementation stop.

For standalone use, offer the exact saved path or complete inline specification to canonical `leanflow-plan` as an optional handoff. A specification-only request stops after the specification. Writing a specification alone never authorizes planning, implementation, delegation, commits, or host configuration changes; any further stages need existing user authorization. An orchestration request authorizes its ordered stages only within the requested task and actual permissions, and material unresolved design still blocks dependent work.

```text
Read skills/leanflow-to-spec/SKILL.md with skills/leanflow-to-spec/ as the base
for relative references. Turn this supplied design into a reference specification.
Do not plan or implement it.
```

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

For a saved plan, read the full supplied file. For an inline plan, validate the exact supplied content for its goal, scope, constraints, steps, and acceptance criteria; equivalent headings are acceptable, and a missing Method alone is not a blocker. When authorized and possible, materialize that exact content as a local plan under the privacy procedure; preserve its meaning and disclose any path used. If persistence is unavailable, execute within existing permissions from the exact inline plan and keep status and evidence in chat. Missing material information requires a precise blocker or `REPLAN_REQUIRED`, not invented scope.

Direct execution is the default: reconcile current source and evidence, implement pending steps in dependency order, exercise relevant changed consumer paths, and report real results. A sequential direct executor may update its plan. Record:

- `[ ]` pending;
- `[x]` verified complete, with actual checks and outcomes;
- `[!]` blocked, with decisive evidence.

Tool, network, permission, and unrun-check limitations remain visible. A worker's assertion, proposed command, or successful launch is not verification. No execution FSM, ledger, evidence directory, automatic retries, or automatic Git actions are required.

Material changes to goal, scope, architecture, public interface, data, security, or irreversible effects require `REPLAN_REQUIRED`. Stop affected work and preserve completed work rather than silently redesigning, replaying irreversible operations, or rolling back unrelated changes. Ordinary implementation details within the accepted scope need not become artificial replanning gates.

## Orchestrate only when selected

`leanflow-orchestrate` composes **a saved specification, then planning, then execution** within the requested scope. It does not authorize destructive operations, external actions, installation, or Git publishing beyond existing consent. Planning-only orchestration creates the specification and plan, then stops without implementation; read-only and delegation-only limits remain binding.

1. Resolve scope, constraints, acceptance criteria, and material design choices. Discover the host's real delegation interface and available roles before drafting. Optional native `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` bindings are procedural conveniences, not mandatory core dependencies or new workflows. Do not invent tools or model tiers.
2. Read and follow actual canonical `leanflow-to-spec` and the `leanflow-plan` privacy procedure. Research or drafting may be delegated read-only; the coordinator validates the source-grounded specification and alone creates the required non-colliding `.workflow/specification/<SEQ>-YYYYMMDD-<slug>-spec.md`. Missing write/privacy authorization means return a permitted draft and blocker, then stop dependent planning and execution. Unresolved material design also stops dependent work.
3. Read the exact saved specification and complete canonical `leanflow-plan` planning, including method selection and validation. A supplied exact plan does not bypass specification creation: validate it against that specification, current evidence, and consent during planning, without silently replacing it. Material inconsistencies use the existing blocker/`REPLAN_REQUIRED` boundaries. The coordinator validates delegated drafts and alone persists the resulting plan, or retains exact inline plan content when canonical planning permits it.
4. Execute only that exact resulting or validated supplied plan after the specification file and planning stage are complete and only within implementation consent. Split independent work with bounded nonoverlapping ownership, sequence actual dependencies, and retain one integration owner.
5. Every worker receives the canonical [assignment packet](../skills/leanflow-orchestrate/SKILL.md#assignment-packet): stage, scope, exact specification source and access instructions, exact plan path or complete content when one exists, assigned step IDs when available, constraints, ownership, source-resolution bases, applicable actual skill bodies, and required evidence. A specification draft receives the exact source material instead; research/specification/planning drafts may explicitly state **no plan exists yet**, never invent a plan path. Standalone planning may state that no specification was requested. Orchestrated planning/execution workers require the exact saved specification.
6. The **coordinator is the sole writer of the specification and shared-plan state**. Workers return draft content or assigned step IDs, changed paths/results, verification performed and unrun, and blockers; they do not save shared artifacts or race to update checkboxes. A delegated executor reads canonical execution for its assignment and does not recursively launch workers or orchestration. Planner/reviewer bindings likewise do not grant permission to implement.
7. Wait for actual worker completion before dependent handoffs or acceptance. Resolve status and partial effects after failure before takeover; do not blindly retry or duplicate running work.
8. Integrate changes and exercise the combined consumer path with authorized checks. The coordinator owns final acceptance against Done When; worker status alone is insufficient. Report the exact specification and plan sources with observed outcomes and limitations.

If delegation is unavailable, disclose the limitation and perform the authorized ordered flow directly when allowed. If the user requires delegation-only work, stop the dependent work rather than silently substituting direct execution. A launched worker's failure does not justify pretending no work occurred.

Review is optional when requested or justified by concrete risk, not a mandatory role stage. On `REPLAN_REQUIRED`, orchestration permits at most one automatic revision within the original authorization when replanning is permitted, preserving the old plan and completed work. Broader scope requires the user; a second material invalidation stops dependent work. Do not replay verified steps.

## Resume carefully

Resume only the exact explicitly supplied plan, reconciling its status with current code and evidence before acting. Preserve historical artifacts, but do not consume old execution state, notes, or ledgers as a workflow. Status alone does not authorize replaying irreversible work. If material scope, checks, or acceptance criteria are missing, report the precise blocker or `REPLAN_REQUIRED`; preserve the original and prepare a separate grounded revision only within authorization.

The retired `flashplan`, `superplan`, and `hyperplan` packages have no compatibility aliases; use methods of `leanflow-plan`. All shipped user-invoked skills use the `leanflow-` prefix. A name match does not prove ownership or justify deletion.

The former `config/skills/` package tree remains retired, not an available optional package collection. The to-spec procedure is the sole exception promoted into a canonical fifth package at `skills/leanflow-to-spec/`; its old path is historical provenance, not a compatibility alias. Historical helper flags, Git/PR workflows, and host dependencies are not core requirements. See [legacy configuration](LEGACY_CONFIGURATION.md) for historical context and the separate legacy configuration assets.

## Verification and evidence limits

Current native compatibility and any newly observed evidence belong in [`COMPATIBILITY.md`](../COMPATIBILITY.md). The [historical record](LEGACY_CONFIGURATION.md#historical-verification-record) preserves prior source-loaded method smokes, old namespace/installer checks, and Antigravity observations with their limitations. Those results predate the new adapters and do not verify their current registration, delegation, or safety behavior. Earlier four-skill evidence remains four-skill evidence; it does not establish validation of the restored fifth package.

File readability, relative links, native discovery, command routing, delegation, instruction following, and safety enforcement require distinct evidence. LeanFlow supplies guidance, not a runtime enforcement layer or a demonstrated all-host effectiveness guarantee.
