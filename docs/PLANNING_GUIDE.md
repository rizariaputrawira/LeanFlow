# LeanFlow Planning and Execution Guide

LeanFlow's canonical core is four sibling instruction assets: [`leanflow-brainstorm`](../skills/leanflow-brainstorm/SKILL.md), [`leanflow-plan`](../skills/leanflow-plan/SKILL.md), [`leanflow-execute`](../skills/leanflow-execute/SKILL.md), and [`leanflow-orchestrate`](../skills/leanflow-orchestrate/SKILL.md). The current assistant plans and executes directly by default. Explicit orchestration uses discovered host-native delegation when available, not fixed agent names, model tiers, or tool identifiers.

The skills do not supply a runtime engine, worker pool, model gateway, permissions layer, or sandbox. Host capabilities and approval boundaries remain authoritative. Instructions cannot add tools, grant permissions, enforce OS containment, or register themselves. Loading LeanFlow does not install configuration or authorize automatic commits.

## Load the skills

For host discovery, consult that host's documentation and copy each complete `skills/leanflow-<name>/` directory into its documented skill root. Keep all four directories as siblings so relative references resolve. Check existing skill names and native commands before overwriting anything; no universal paths, collision-free coexistence, or slash-command availability are assumed.

Alternatively, have a file-capable assistant read the actual `SKILL.md` file and supply its containing directory as the base for relative links. For example, load `skills/leanflow-plan/SKILL.md` with base directory `skills/leanflow-plan/`. This conceptual plain-file use does not register a skill, enable discovery, create a command, or establish runtime compatibility. Reading only a label or an invocation receipt is not evidence that the actual instructions ran.

The `config/` tree and installation scripts are an optional Antigravity adapter. They are not needed for portable-core loading; its named agents, hooks, MCP services, settings, and optional skills do not become universal prerequisites.

All shipped user-invoked skills, including optional adapter skills, use the `leanflow-` prefix. This is a package-identity migration, not permission to overwrite another skill. If adapter preflight flags old generic packages, inspect their ownership and explicitly archive or otherwise resolve the flagged packages before retrying; never delete unrelated skills or infer ownership from a generic name. Updating this checkout does not automatically install anything into a live host. The former separate `flashplan`, `superplan`, and `hyperplan` packages have no compatibility aliases; use the methods of `leanflow-plan`.

## Brainstorm

Use `skills/leanflow-brainstorm/SKILL.md` for unresolved goals, tradeoffs, or design decisions. Skip it when the task is clear. Brainstorming alone does not authorize planning changes or implementation beyond the requested scope. A request explicitly authorizing brainstorming, planning, and implementation may flow through the relevant core skills directly without an additional ceremonial approval, while material ambiguity and real permission boundaries still stop dependent work.

## Plan

`skills/leanflow-plan/SKILL.md` is the single public planning entrypoint and owns the canonical plan format. The current assistant researches and persists a plan directly at `.workflow/plans/<SEQ>-YYYYMMDD-<slug>.md`, without overwriting existing artifacts. In explicit orchestration, an available native delegate may return a draft for the coordinating assistant to validate and save. A conceptual planning responsibility is not a requirement for a registered agent named `planner`.

Plans contain Goal, Scope, Constraints, Method, Steps, and Done When. **Method** records the selected method, its rationale, and limitations, including material risks and unknowns. A one-step plan is valid. Proposed verification is not implementation evidence. Planning alone does not authorize project-code changes, implementation delegation, or a host-native feedback/approval path that would start execution.

### Automatic planning depth

`leanflow-plan` chooses the least depth adequate for the task from the available evidence:

| Method | Selection evidence | Planning treatment |
| --- | --- | --- |
| **flash** | Clear, bounded, low-risk work | A concise, grounded plan with concrete verification and completion criteria. |
| **super** | Integration, dependencies, or moderate uncertainty | Investigate relevant boundaries and dependencies; resolve uncertainty enough to produce an actionable plan. |
| **hyper** | High-risk security, data, public-interface, or irreversible work; or load-bearing unresolved alternatives | Apply five adversarial lenses and one revision before saving the plan, keeping unresolved material issues visible. |

These are methods inside one skill, not separate packages or commands. Method choice does **not** select a model tier, change permissions, or force delegation; direct planning remains the default. An explicit method request is honored, with risks, unknowns, and limitations recorded rather than hidden by the override. Planning remains planning-only even when hyper is selected.

Use ordinary language after loading the skill, for example:

```text
Use leanflow-plan to plan this change; do not implement.
Use leanflow-plan with the flash method for this bounded change; do not implement.
Use leanflow-plan with the super method for this integration; do not implement.
Use leanflow-plan with the hyper method for this data migration; do not implement.
```

These examples do not define parsed CLI flags or universal slash commands. Explicit orchestration may use a discovered native delegate for planning, but neither the selected method nor a completed plan authorizes implementation.

### Keep workflow artifacts untracked

Before saving generated workflow artifacts, preserve existing `.gitignore` content and establish both `/workflow/` and `/.workflow/` entries. Outside a Git repository there is no index tracking yet, but these entries carry the default forward if Git is initialized later. If privacy cannot be established or required writes are forbidden, disclose the limitation and return the plan in chat instead of saving it; do not lower permissions or invent an alternate persistence path.

Canonical plans remain under `.workflow/plans/`; ignoring `workflow/` as well covers both directory spellings without silently migrating historical artifacts. Both are private working records by default, not intended source-controlled deliverables. The optional Antigravity adapter also adds these ignore rules to its target workspace.

Ignore rules only affect untracked paths. If generated workflow artifacts are already tracked, remove their paths from the index only when authorized, preserving files on disk; do not use a deletion that destroys the working records. Index removal leaves prior commits unchanged, and neither it nor `.gitignore` scrubs secrets from history. Local tools and assistants can still read ignored files, so avoid putting credentials or unnecessary sensitive data in plans.

## Execute

`skills/leanflow-execute/SKILL.md` requires an explicit plan path and user authorization to implement. Direct execution is the default: read the supplied plan, reconcile it against current source and evidence, implement pending steps, and run the checks needed to establish the requested outcome. Use real tool results, not proposed commands or a delegate's unsupported assertion, as verification evidence.

Record `[ ]` pending, `[x]` verified complete, and `[!]` blocked steps in the same plan, with actual verification commands/outcomes inline. Do not claim tests were run when they were not. Tool, network, or permission limitations must remain visible. No execution FSM, ledger, evidence directory, automatic retries, or commits are required by the core.

Material changes to goal, scope, architecture, interface, data, security, or irreversible actions require `REPLAN_REQUIRED`. Execution does not silently redesign the plan. Preserve completed work and stop affected steps instead of resetting state, rolling back unrelated changes, or replaying irreversible work. Ordinary implementation details within the accepted scope need not become artificial replanning gates.

## Explicit orchestration

Selecting `skills/leanflow-orchestrate/SKILL.md` authorizes the composed planning-then-execution flow within the requested scope. It does not expand permission for destructive operations, external actions, installation, or Git publishing.

1. Inspect the host's actual delegation capabilities and allowed worker interfaces. Do not assume named roles, specific models, delegation tools, or asynchronous controls exist.
2. Where native delegation is available and appropriate, hand off bounded planning or implementation work with scope, constraints, the relevant plan, and expected evidence. The coordinating assistant retains acceptance responsibility.
3. If the host has no usable delegation capability, disclose that fact and perform the authorized flow directly. Do not fabricate worker invocations, registered roles, results, or compatibility claims. An invocation failure is not completion evidence; disclose the actual limitation and respect any explicit user requirement for delegation-only work rather than silently overriding it.
4. Wait for real worker completion through supported host mechanisms before dependent handoffs or final acceptance. Review results and evidence; do not return only an invocation receipt.
5. On `REPLAN_REQUIRED`, permit at most one automatic replan inside the original authorization, incorporating decisive new evidence and already completed work. Preserve the prior plan. A revised scope outside that authorization requires the user; a second material invalidation stops.

Review is optional and driven by risk or the request, not a mandatory named-role stage. Explicit orchestration is not required to run a simple task, and a full-flow direct request need not activate delegation.

## Optional adapter workflows and legacy records

The Antigravity adapter includes optional skills under `config/skills/`, all with `leanflow-` invocation names. `leanflow-hyperexecution` forwards to `leanflow-execute`, and `leanflow-to-spec` can produce a reference specification. All planning methods belong to `leanflow-plan`; optional skills do not reintroduce separate planning entrypoints. Host-specific prerequisites do not alter the portable core. Use the actual installed skill instructions and host-supported invocation syntax; unprefixed slash-command spellings in the historical evidence below describe past Antigravity observations only.

New plans are primary, but explicitly supplied legacy `.planning/` and `.ar-wf/` plans remain usable. When resuming, read relevant legacy state, ledger, notes, and evidence; resolve discrepancies against current code before replaying work. Historical `state.json`, `notes.md`, `ledger.jsonl`, and flat/nested evidence files are records, not required new execution state. For a legacy plan missing material scope, verification, or Done When, return `REPLAN_REQUIRED`, preserve the original, and prepare a separate grounded revision within authorization.

The optional `leanflow-workflow-health-check` with `--check` does not require execution directories in a plan-only workspace. Explicit `--fix` conservatively copies legacy trees without clobbering destinations and retains sources, including collisions, for manual reconciliation. It does not delete historical data to produce a clean status. These flags belong to that optional helper, not planning-method selection. Explicit Git/PR skills remain separate; planning and execution do not automatically commit.

## Optional Antigravity adapter: native behavior and safety

This section describes host-specific configuration and historical observations, not portable requirements or guarantees. See the [README adapter section](../README.md#optional-antigravity-full-configuration-adapter) for opt-in installation, privacy controls, and required account telemetry action.

### Discovery and command collisions

The adapter installs global named agents at `~/.gemini/config/agents/<name>/agent.md`. Historical project fixtures used `.agents/agents/<name>/agent.md`. Agent YAML declares `name`, `description`, `tools`, `mainAgent`, `subagent`, `model`, and `commandExecutionPolicy`; Markdown supplies role instructions. Historical native `invoke_subagent` calls inherited the workspace. New sessions discovered installed assets, and `/agents` provided selection/monitoring; subagent-only definitions could be callable even when `agy agents` listed none.

Installed shared skills were observed at `~/.gemini/config/skills`, whereas the [CLI skills documentation](https://antigravity.google/docs/skills.md) listed `~/.gemini/antigravity-cli/skills`. The adapter retains its observed shared layout. This discrepancy is an adapter caveat, not a portable installation recommendation. Confirm discovery in the installed host/version.

Antigravity also has a built-in `/plan`. Historical traces showed native `type: system` expansion before reading the supplied skill and delegating. A skill does not replace native command expansion. Explicitly load `leanflow-plan` rather than assuming `/plan` selects LeanFlow; the namespace does not prove host discovery or routing. A captured native stop hook approved a feedback-requesting implementation artifact and started execution despite planning-only intent. Save planning output as an ordinary workspace file, not an artifact path that implicitly authorizes execution; never lower safety settings to force persistence. A subsequent historical trivial run saved a pending plan without source edits or executor invocation, but that does not verify the current portable rewrite.

### Tool, model, and permission limits

Adapter planner/reviewer declarations omit native edit, command, and delegation tools and use command policy `off`; executor declares edit/command tools and uses `sandbox`. These declarations are not OS containment. A historical probe found ambient MCP tools still available despite narrow declared lists; `mcpServers: []` was not proof of inherited-MCP suppression. Executor shell access can exceed an intended file scope. Native nesting limits are not a portable workflow mechanism.

Historically, `command_status` and `send_command_input` were rejected as custom-agent registry components and were removed from the executor declaration. Main-session tool names do not necessarily work in custom-agent metadata. Neither these names nor `invoke_subagent` is a core dependency.

Documented custom-agent selectors inspected were `inherit`, `flash`, and `pro`; no custom-agent effort key or exact Low/Medium/High selector was verified. These differ from main-session model IDs and `agy --model`/`--effort` controls. Adapter fresh settings select Gemini 3.8 Flash (Medium) and native `request-review`; existing user model and permission choices are preserved. None of those choices is required by the portable core.

### Approval is not containment

The [native hook contract](https://antigravity.google/docs/hooks.md) describes `force_ask` as prompting regardless of cached permissions. Historically a recursive-delete confirmation was auto-approved under `toolPermission: always-proceed`, with that approval recorded in the native log. The hook remains useful guidance, not a hard barrier in that mode. Fresh adapter settings use the documented [native `request-review` default](https://antigravity.google/docs/settings.md). Existing profiles are not rewritten: inspect `/config` and `/hooks`, and require explicit user confirmation for destructive actions. Tool-level safety boundaries are distinct from redundant plan-to-execute approval ceremonies.

Credential masking, destructive Git and recursive-delete confirmation, and workspace permission boundaries still apply. The portable skill text cannot guarantee that the host enforces them. Adapter privacy opt-outs likewise do not establish provider-side retention policy, eliminate authentication/model/update traffic, or prove device-wide no-telemetry operation.

Host references: [subagents](https://antigravity.google/docs/subagents.md), [agents CLI](https://antigravity.google/docs/cli/commands/agents), and [slash commands](https://antigravity.google/docs/slash-commands.md). Earlier transferable workflow principles were compared with [OMP PERSONALITY](https://github.com/rizariaputrawira/omp-docflow/blob/main/config/agent/PERSONALITY.md) and [AGENTS](https://github.com/rizariaputrawira/omp-docflow/blob/main/config/agent/AGENTS.md); those sources do not establish LeanFlow runtime compatibility.

## Verification and evidence limits

File readability, relative links, discovery, native command routing, delegation, instruction-following behavior, and safety enforcement are separate properties; success in one does not prove the others. No comparative effectiveness or universal compatibility result has been established.

### Consolidated planning behavior smoke

A source-loaded `omp v18.13.1` run with `openai-codex/gpt-6.1-sol` read the actual `skills/leanflow-plan/SKILL.md` and a synthetic JavaScript fixture through read-only tools. It returned complete in-chat plans rather than classifications alone:

- A bounded greeting punctuation change selected **flash**, preserving input handling and proposing exact consumer checks.
- An optional availability filter spanning a producer and consumer selected **super**, tracing their contract, copy behavior, and integration verification.
- Tenant isolation with persisted-data migration selected **hyper**, applied all five critique lenses, and marked unspecified identity, ownership policy, and compatibility as blockers rather than inventing them.
- An explicit **super** request for the simple greeting task overrode automatic flash selection without selecting a model or invoking delegation.

The process completed successfully. Tool events showed source reads, not implementation actions; independent SHA-256 and directory checks confirmed the fixture was unchanged and no plan artifacts were written. Proposed implementation tests in these plans were not executed. This is bounded instruction-following evidence under plain-file loading, not proof of native skill discovery, all-host compatibility, model superiority, or OS containment.

### Namespace packaging and adapter checks

- A disposable package/install smoke found **29 unique shipped skill identities**, all `leanflow-` prefixed with matching directory/frontmatter names. The three retired planning packages were absent; core and documentation links resolved. A fresh isolated Bash installation merged the core, optional packages, and helper assets, and its read-only namespace health check passed.
- `node --test tests/privacy-install.test.cjs`: **two passed, one skipped, zero failures**. The passing Bash cases cover settings/auth-field preservation, workflow-ignore behavior, repeat installation, preservation of local skills and helper-only directories, and legacy-skill refusal before destination changes in real and dry-run installs. The PowerShell case was skipped because its runtime was unavailable; no PowerShell behavioral pass is claimed.
- Bash syntax checks for both installer/health scripts and Node syntax checking for the legacy-skill preflight passed.
- The actual Impeccable pin generator ran in an isolated synthetic workspace. It generated `leanflow-audit` and an OpenCode `leanflow-impeccable-audit` bridge; both referenced the namespaced main skill, and no generic `audit` skill was generated. This verifies generated file contracts, not discovery or execution inside those hosts.


### Recorded pre-namespace cutover checks

These observations predate the skill-namespace and consolidated-method migration. They retain their original scope and do not verify the new names, method selection, or installer migration preflight.

- `node --test tests/privacy-install.test.cjs`: one integration test passed with zero skips. It exercises real Bash installs in disposable homes, settings/auth-field preservation, repeat installation, malformed-JSON refusal, dry-run nonmutation, both workflow ignore rules, and preservation of already-tracked destination artifacts.
- `bash -n install.sh scripts/workflow-health-check.sh`: passed. PowerShell runtime validation was not performed; `pwsh` was absent from this environment.
- A Node package check confirmed all four core metadata headers and their relative file links, plus local README/guide links. This is packaging evidence, not host registration.
- A source-loaded `omp v18.13.1` orchestration smoke was requested with only read/write/edit/shell/search tools, without delegation. In a disposable greeting fixture it produced a private completed plan, both ignore rules, and an implementation handling missing/blank names. Independent Node assertions passed for undefined, whitespace-only, and named inputs; Git confirmed both artifact paths ignored, no tracked workflow files, no staged files, and zero commits.
- That model process exceeded its 120-second deadline without returning a final response. The generated fixture and independent checks demonstrate bounded partial execution, not a completed consuming-agent acceptance run or verified native discovery. An earlier Antigravity smoke was canceled when the scope changed; it is not acceptance evidence.
- In this checkout, existing `.workflow/` records were removed from the index with files retained. Git confirmed no workflow paths remain indexed and both directory spellings match root ignore rules. Prior commits are unchanged.

These checks do not establish every host's instruction-following behavior, native discovery, delegation, or safety enforcement. The portable workflow supplies guidance, not runtime enforcement.

### Historical Antigravity migration evidence

The following observations predate the harness-agnostic rewrite and the direct-by-default change. They establish historical adapter behavior only. They do **not** establish current portable behavior, native discovery in another host, or containment.

Isolated CLI fixtures on 2026-10-07 used the then-shipped agents and skills in project-local discovery paths, with Gemini 3.8 Flash Medium for main:

| Scenario | Historical observation |
| --- | --- |
| Planning-only and trivial `/plan` | A native planner returned a pending workspace plan; source stayed unchanged and executor did not run. |
| `/execute <plan>` | A native executor changed code, ran passing behavioral assertions, and updated the supplied checklist; main accepted it. |
| `/orchestrate <task>` | Planner, persisted plan, executor, verification, and main acceptance completed without an intermediate approval prompt or mandatory reviewer. A Git-backed run still reported “No commits yet.” |
| Explicit `/hyperplan` | Planner and reviewer used five lenses; planner revised through native messaging, and main saved the pending plan without implementation. |
| Legacy aliases and artifacts | `/flashplan` stayed planning-only; `/hyperexecution` used the then-current named executor. A historical plan/state conflict was reconciled against source/ledger without replay; private Git history and ledger/state/notes hashes stayed unchanged. |
| Material invalidation | The then-current `/execute` returned `REPLAN_REQUIRED` with a blocked plan. An orchestration fixture with a post-plan payload/schema change caused exactly one replan and an authorization-boundary stop; newer source, consumer, and data hashes were unchanged. |

Historical Bash and Windows PowerShell 5.1 installer migration fixtures passed clean, repeat, dry-run, backup-content, unrelated-agent preservation, and conflicting-flat-definition checks in private homes. Fresh-install checks deployed `request-review`, Medium model, empty trusted workspaces, and matching agent files. The CLI parsed the safer preference and then required authentication; no credentials were copied. Existing configuration/MCP/settings sentinels stayed unchanged. A health-check smoke preserved colliding legacy/destination files and hidden files. Synthetic hook inputs requested confirmation for force-push, hard-reset, recursive-delete, and clean; that checker did not execute those dangerous commands. These earlier installer scenarios are distinct from the Windows privacy-installation limitations recorded in the README.

Some headless attempts stalled before substantive turns while inherited MCP servers connected. They were not passes; neither MCP nor output format was established as the cause. A stale pre-fix fixture and a replan run that timed out before acceptance were rejected as completion evidence. The second-invalidation branch was not exercised because the first revision reached an authorization blocker. Windows Node/npx were absent from the test PATH, so Windows hook execution was not verified. There was no packet capture or exhaustive SDK-egress proof. These limitations remain historical limitations, not evidence for or against the current portable core.
