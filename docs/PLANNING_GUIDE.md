# Native Planning and Execution Guide

The workflows are instruction assets for Antigravity's native planner/executor/reviewer subagents. They do not provide a custom runtime engine, FSM, worker pool, model router, or sandbox. The main agent owns task scope, plan acceptance, and final evidence review.

## Plan

The canonical `config/skills/plan/SKILL.md` is planning-only. It passes the complete task packet to the read-only `planner` agent, checks returned Markdown against user authorization and criteria, and persists it at `.workflow/plans/<SEQ>-YYYYMMDD-<slug>.md` without overwriting existing artifacts. The plan contains Goal, Scope, Constraints, Steps, and Done When. A one-step plan is valid. Verification is proposed, not proof of implementation.

Antigravity has a built-in `/plan` command. Runtime traces show native `type: system` expansion followed by reading the supplied skill and invoking `planner`; the skill does not replace that expansion. Save the returned plan as an ordinary workspace file, not a second feedback-requesting native implementation artifact. A captured native stop hook automatically approved such a feedback artifact and started execution despite planning-only intent. The supplied skill now prohibits that feedback path; a subsequent trivial `/plan` run saved its pending plan without editing source or invoking executor. Never lower safety settings to force persistence.

## Execute and orchestrate

`config/skills/execute/SKILL.md` requires the explicit plan path and user authorization. Pending `[ ]`, verified `[x]`, and blocked `[!]` states are recorded in the supplied plan alongside actual verification command/outcome. Material goal, scope, architecture, interface, data, security, or irreversible changes require `REPLAN_REQUIRED`; execution does not replan itself. No FSM, ledger, evidence directory, retries, or commits are created by default.

`/orchestrate <task>` itself authorizes planning followed by execution, subject to actual safety boundaries. Main waits for each native asynchronous worker result before handing off or accepting, rather than returning an invocation receipt. It permits at most one automatic replan after `REPLAN_REQUIRED`, including decisive new evidence and completed work. Preserve the prior plan and do not replay completed work. A revised scope beyond the original authorization requires the user; a second material invalidation stops. Review is optional and risk/request-based. Explicit `/hyperplan` uses a planner draft, one reviewer's five adversarial lenses, at most one planner revision, then persistence and stop.

`flashplan` and `superplan` forward to plan; `hyperexecution` forwards to execute. `brainstorm` and `to-spec` are optional and do not start implementation automatically.

## Native limits and evidence

Agent metadata uses documented `name`, `description`, `tools`, `mainAgent: false`, `subagent: true`, `model: flash`, and role-specific `commandExecutionPolicy`. Planner/reviewer declare only read/search tools and use command policy `off`; executor declares edit/command tools and uses `sandbox`. These settings and prose are not OS containment. A probe found ambient MCP tools remained available to a child despite a narrow declared tool list; `mcpServers: []` is not a promise to suppress inherited MCP. Read-only behavior is therefore guidance over declared native tools, not proof of containment. Executor shell tools can exceed intended file scope.

Global definitions are installed at `~/.gemini/config/agents/<name>/agent.md`; project definitions use `.agents/agents/<name>/agent.md`. YAML frontmatter supplies `name`, `description`, `tools`, `mainAgent`, `subagent`, `model`, and `commandExecutionPolicy`; the Markdown body supplies role instructions. Main invokes them through native `invoke_subagent` in the inherited workspace. New sessions discover installed assets; `/agents` provides native selection/monitoring. Subagent-only definitions can be callable even when the shell `agy agents` listing is empty.

Tool names in the main session are not necessarily valid custom-agent registry components. Runtime construction rejected `command_status` and `send_command_input`; neither is declared in the shipped executor. A failed named-agent invocation must report a blocker, not silently create a transient replacement or move implementation into main. Omitting native delegation tools prevents that direct worker route, but inherited MCP and executor shell access remain instructional boundaries. Native default nesting permits up to ten levels; these workflows do not use it.

Native custom-agent model selectors documented are `inherit`, `flash`, and `pro`; no custom-agent effort key or exact Low/Medium/High selector is verified. Use `flash` by default. A genuinely difficult reasoning need may justify the supported `pro` tier, not a wrapper or file/tool-count threshold. The observed main-session `agy models` list includes Gemini 3.8 Flash Low/Medium/High IDs, and `agy --help` exposes session `--model`/`--effort`; this is distinct from custom-agent frontmatter. Fresh installer settings select Gemini 3.8 Flash (Medium) and native `request-review` tool permissions; existing user choices are preserved.

Installed shared skill metadata was observed at `~/.gemini/config/skills`, whereas the current [CLI skills table](https://antigravity.google/docs/skills.md) lists `~/.gemini/antigravity-cli/skills`. The installer retains the observed shared location rather than moving existing skills on the basis of conflicting documentation.

New plans are primary, but explicit legacy `.planning/` and `.ar-wf/` paths remain usable. When resuming, read relevant legacy state/ledger/notes/evidence and resolve discrepancies against current code before replaying potentially irreversible work. Historical artifacts are not migrated or rewritten by these instructions.

The old `flashplan`, `superplan`, and `hyperexecution` procedures were consolidated into aliases, not retained as competing engines. Historical `state.json`, `notes.md`, `ledger.jsonl`, and both flat/nested evidence naming remain records, not required new execution state. One existing plan has a pending checkbox while its state says completed; reconcile such conflicts with code/evidence before repeating work. For legacy plans missing material scope, verification, or Done When, return `REPLAN_REQUIRED` and preserve the original while preparing a separate grounded revision. Do not blindly reset stale state.

`workflow-health-check --check` does not require execution directories for a plan-only workspace. Explicit `--fix` conservatively copies legacy trees without clobbering destinations and retains source trees, including collisions, for manual reconciliation. It does not delete historical data to achieve a clean status. Automatic commits were removed from planning/execution; explicit Git/PR skills remain separate.

### Approval is not containment

The [native hook contract](https://antigravity.google/docs/hooks.md) describes `force_ask` as prompting regardless of cached permissions. In the installed CLI, a recursive-delete confirmation was instead automatically approved under `toolPermission: always-proceed`; the native log explicitly records that auto-approval. The hook is retained, but is not a hard barrier in that mode. Fresh settings now use the documented [native `request-review` default](https://antigravity.google/docs/settings.md). Existing profiles are not rewritten: inspect `/config` and `/hooks`, and require explicit user confirmation for destructive operations. Tool-level safety prompts are genuine boundaries, not the artificial plan-to-execute approval stage removed from orchestrate.

Sources: [Antigravity subagents](https://antigravity.google/docs/subagents.md), [agents CLI](https://antigravity.google/docs/cli/commands/agents), [slash commands](https://antigravity.google/docs/slash-commands.md), [OMP transferable principles](https://github.com/rizariaputrawira/omp-docflow/blob/main/config/agent/PERSONALITY.md) and [AGENTS](https://github.com/rizariaputrawira/omp-docflow/blob/main/config/agent/AGENTS.md).

## Migration validation

Isolated native CLI fixtures on 2026-10-07 used the shipped agents and skills in project-local discovery paths, with Gemini 3.8 Flash Medium selected for main. Completed default-text runs demonstrated:

| Scenario | Observed result |
|---|---|
| Planning-only and trivial `/plan` | Native planner returned a pending workspace plan; source stayed unchanged and executor did not run. |
| `/execute <plan>` | Native executor changed code, ran passing behavioral assertions, and updated the supplied checklist with evidence. Main accepted the result. |
| `/orchestrate <task>` | Planner, saved plan, executor, verification, and final acceptance completed without an intermediate approval prompt or mandatory reviewer. A Git-backed run still reported “No commits yet” afterward. |
| Explicit `/hyperplan` | Planner and reviewer applied five lenses, planner revised through native messaging, and main saved the pending plan without implementation. |
| Legacy aliases and artifacts | `/flashplan` stayed planning-only; current-source `/hyperexecution` used the named executor and verified a generated plan. A historical plan/state discrepancy was reconciled against source and ledger without replay; ledger/state/notes hashes and private Git history stayed unchanged. |
| Material invalidation | Fresh current-source `/execute` returned native executor `REPLAN_REQUIRED` with a blocked plan. In `/orchestrate`, a real post-plan payload/schema change triggered executor `REPLAN_REQUIRED`, exactly one planner revision, and a terminal authorization-boundary stop. Newer source, consumer, and data hashes stayed unchanged; no rollback or compatibility shim was used. |

Bash and Windows PowerShell 5.1 installers passed clean, repeat, dry-run, backup-content, unrelated-agent preservation, and conflicting-flat-definition checks in private homes. Final fresh-install checks also deployed `request-review`, Medium model, empty trusted workspaces, and matching agent files. The actual CLI parsed that safer preference in a private home, then correctly required authentication; no credentials were copied. Existing configuration/MCP/settings sentinels remained unchanged. A health-check smoke preserved colliding legacy/destination files and hidden files. Synthetic hook inputs returned confirmation requests for force-push, hard-reset, recursive-delete, and clean; those dangerous commands were not executed by that checker.

Some headless attempts stalled before any substantive turn while inherited MCP servers were still connecting. They are not passes, and neither MCP nor output format has been established as the cause. A stale pre-fix fixture and a separate replan run that timed out before main acceptance were rejected as completion evidence; fresh current-source runs reached the terminal outcomes above. The second-invalidation branch was not exercised because the first revision reached a genuine authorization blocker; the workflow still caps automatic replanning at one. Windows Node/npx were absent from the test PATH, so Windows hook execution was not verified. These observations do not establish OS containment or universal approval enforcement.
