# Legacy Configuration and Historical Evidence

This is a **historical reference**, not current installation guidance. The old Antigravity full-configuration installer has been replaced by the narrow [host adapters](../README.md#install-a-host-adapter). `install.sh` and `install.ps1` now enter the Node adapter installer; they do not reapply the historical configuration described below.

The 25 optional packages in `config/skills/` remain source for deliberate, separate use. They are not installed by the core adapters. Historical references to settings, hooks, agents, MCP servers, helper scripts, or backup paths describe the old bundle; they do not imply those assets are deployed or maintained by a current installation.

## Migration preserves user ownership

Updating this checkout does not change a live host. Before migrating an old installation:

1. Inventory the existing global skills, agents, hooks, MCP entries, settings, and any backups. Inspect contents and ownership; a generic filename or matching name is not proof that LeanFlow owns it.
2. Preview the chosen new adapter, preferably using an isolated custom target first. Read its manifest/update rules and confirm the host's documented discovery mechanism.
3. Resolve conflicting names deliberately. Archive, move, or remove only assets you own and explicitly choose to retire; do not automatically delete shared global directories, unrelated skills, or another project's agents.
4. Review any old settings, hooks, and MCP services separately in the host. The new adapter neither deploys nor disables them. Restart/reload according to the host and verify actual discovery and behavior.

The new manifest records installed files, not ownership of the whole target. Omitted old managed files remain tracked; omitting `--with-agents` does not uninstall agents. There is no whole-bundle rollback or automatic old-configuration cleanup. Never restore an entire old backup over newer user-owned configuration without reviewing the differences.

The former `flashplan`, `superplan`, and `hyperplan` packages are retired without compatibility aliases. Their planning methods belong to `leanflow-plan`. Optional `leanflow-hyperexecution` is a legacy execution alias, not a fifth core workflow. All shipped user-invoked skill identities use `leanflow-`; namespace migration does not authorize replacing unrelated assets.

## What the former bundle changed

The previous Antigravity-specific adapter merged four core skills with the optional `config/skills/` packages and deployed broader rules, hooks, settings, agents, and MCP configuration. Optional workflows included reference specifications, debugging, UI, security, administration, and explicit Git/PR helpers. None is a prerequisite for the four-skill core.

Historical prerequisites included Antigravity CLI, Node.js for privacy merging/hooks, and `npx` for configured MCP packages. GitHub MCP used the user's own `GITHUB_TOKEN`; no token was supplied. Old global agents were installed at `~/.gemini/config/agents/<name>/agent.md`; historical project fixtures used `.agents/agents/<name>/agent.md`.

The old adapter backed up configuration under `~/.gemini.bak.<timestamp>.<unique-suffix>/`, preserved unrelated settings and agent directories, and stopped on conflicting flat agent files or malformed privacy-target JSON. Fresh settings selected Gemini 3.8 Flash (Medium), native `request-review`, and empty trusted workspaces; existing model routing and permissions were preserved. It also merged workspace workflow-ignore rules. **The current adapters do none of these settings/workspace operations.**

The optional workflow-health helper historically audited first and required explicit repair. Plan-only workspaces did not need execution directories. Its `--fix` copied legacy trees conservatively without clobbering destinations and retained sources, including collisions, for reconciliation; these flags were helper-specific, not planning-method options. Bundled Impeccable utilities omitted unused upstream reports/helper entrypoints, retained a manual web detector fallback, and bypassed the HTML/CSS pass for native projects.

## Telemetry: historical controls and remaining account action

The old bundle applied the following controls. Copying core skills or installing a current adapter does **not** apply them:

| Mechanism | Historical control |
| --- | --- |
| Feedback surveys | `showFeedbackSurvey: false` in CLI settings |
| Context7 OpenTelemetry instrumentation/exporters | `OTEL_SDK_DISABLED=true` in its MCP environment |
| CodeGraph anonymous usage reporting | `CODEGRAPH_TELEMETRY=0` and `DO_NOT_TRACK=1` in its MCP environment |
| Brainstorm companion remote branding/version image | `SUPERPOWERS_DISABLE_TELEMETRY` enabled by its launcher and defaulted on for direct server launches |

The former privacy merger targeted only these controls, including recognized version-qualified/renamed MCP entries. Custom servers, API keys, GitHub token wiring, model, permission, and workspace settings remained intact. MCP opt-outs lived in MCP configuration, not shell profiles; unrelated applications' environments were not modified. This is a historical mechanism description, not an instruction to run an obsolete helper.

**Native CLI telemetry required an account action:** start `agy`, open `/config` (or `/settings`), and set **Enable Telemetry** to **Off**. Recheck after account changes or upgrades and consult current host documentation; no current adapter automates this setting.

The [official settings documentation](https://antigravity.google/docs/settings.md) listed `enableTelemetry`, but historical inspection of CLI **1.3.1** found `EnableTelemetry` excluded from JSON persistence (`json:"-"`) with backend getter/setter methods. No supported telemetry automation flag/subcommand was found. A sandbox model invocation still logged an attempted `recordTrajectoryAnalytics` request. Adding a template key would not establish a working opt-out; native/account state and its default were not guaranteed by the scripts. The all-optional-telemetry-disabled target remained unverified until the account control was disabled and checked.

These controls did not block authentication, provider/model requests, downloads/updates, explicit network tools, security checks, or local troubleshooting logs. Native account telemetry controls do not establish provider-side retention or API project privacy. No proxy, firewall, TLS bypass, or SDK removal was introduced. Future `@latest` packages, independently installed plugins, and remote MCP services need version-specific reinspection. There was no device-wide no-telemetry guarantee, packet capture, or exhaustive SDK-egress proof.

## Historical native behavior and safety warnings

### Discovery and command collisions

Historical agent YAML declared `name`, `description`, `tools`, `mainAgent`, `subagent`, `model`, and `commandExecutionPolicy`; Markdown supplied role instructions. `invoke_subagent` inherited the workspace. New sessions discovered installed assets and `/agents` offered selection/monitoring; subagent-only definitions could be callable even when `agy agents` listed none.

Installed shared skills were observed at `~/.gemini/config/skills`, whereas the [skills documentation](https://antigravity.google/docs/skills.md) listed `~/.gemini/antigravity-cli/skills`. This historical discrepancy does not validate either path for current plugin discovery.

Antigravity's built-in `/plan` expanded natively before the supplied skill was read and delegated. A skill does not replace built-in command routing: explicitly load `leanflow-plan` rather than assuming `/plan` selects LeanFlow. A captured stop hook approved a feedback-requesting implementation artifact and started execution despite planning-only intent. Save planning output as an ordinary workspace file, not an artifact route that implicitly starts execution; never lower safety settings to force persistence. A subsequent trivial historical run saved a pending plan without source edits or executor invocation; it did not verify the later portable rewrite.

### Tool, model, and approval limits

Old planner/reviewer definitions omitted native edit, command, and delegation tools and used command policy `off`; executor declared edit/command tools and `sandbox`. **These were not OS containment.** A probe found ambient MCP tools still available despite narrow tool lists; `mcpServers: []` did not prove inherited-MCP suppression. Shell access can exceed an intended file scope. Native nesting limits are not a portable workflow mechanism.

`command_status` and `send_command_input` were rejected as custom-agent registry components and removed from old executor declarations. Main-session tool names need not be valid custom-agent metadata; neither those names nor `invoke_subagent` is a core dependency.

Inspected custom-agent model selectors were `inherit`, `flash`, and `pro`; no custom-agent effort key or exact Low/Medium/High selector was verified. Main-session model IDs and `agy --model`/`--effort` controls are separate. Old fresh defaults were not portable-core requirements; new adapters do not change host model or approval choices.

The [hook contract](https://antigravity.google/docs/hooks.md) described `force_ask` as prompting despite cached permissions. A historical recursive-delete confirmation was auto-approved under `toolPermission: always-proceed`, recorded in the native log. Hooks were useful guidance, not hard barriers in that mode. Inspect `/config` and `/hooks`; require actual authorization for destructive Git and recursive-delete operations, preserve credential masking, and respect workspace boundaries. These safety boundaries differ from redundant plan-to-execute approval ceremonies. Portable prose cannot guarantee host enforcement.

Host references: [subagents](https://antigravity.google/docs/subagents.md), [agents CLI](https://antigravity.google/docs/cli/commands/agents), and [slash commands](https://antigravity.google/docs/slash-commands.md). Earlier transferable principles were compared with [OMP PERSONALITY](https://github.com/rizariaputrawira/omp-docflow/blob/main/config/agent/PERSONALITY.md) and [AGENTS](https://github.com/rizariaputrawira/omp-docflow/blob/main/config/agent/AGENTS.md); these do not establish LeanFlow compatibility.

## Historical verification record

All results below predate the new multi-host adapters. They are retained as bounded observations, not current test results, native registration proof, comparative effectiveness evidence, or containment guarantees. Current evidence belongs in [`COMPATIBILITY.md`](../COMPATIBILITY.md).

### Consolidated planning behavior smoke

A source-loaded `omp v18.13.1` run with `openai-codex/gpt-6.1-sol` read `skills/leanflow-plan/SKILL.md` and a synthetic JavaScript fixture through read-only tools. It returned complete in-chat plans:

- A bounded greeting punctuation change selected **flash**, preserved input handling, and proposed exact consumer checks.
- An availability filter across producer/consumer selected **super**, tracing contract, copy behavior, and integration checks.
- Tenant isolation with persisted-data migration selected **hyper**, applied all five critique lenses, and retained unspecified identity, ownership, and compatibility as blockers.
- An explicit **super** request overrode automatic flash for the greeting task without choosing a model or delegating.

The process completed. Tool events showed source reads, not implementation actions; independent SHA-256/directory checks found the fixture unchanged and no plan artifacts written. Proposed implementation tests were not run. This was bounded plain-file instruction-following evidence, not native discovery, all-host compatibility, model superiority, or containment.

### Namespace packaging and old adapter checks

- A disposable smoke found **29 unique shipped skill identities**, all `leanflow-` prefixed with matching directory/frontmatter names. The three retired planning packages were absent and core/documentation links resolved. An isolated Bash install merged core, optional packages, and helpers; its read-only namespace health check passed. This was the old full-bundle scope, not today's four-skill default.
- `node --test tests/privacy-install.test.cjs`: **two passed, one skipped, zero failures**. Bash cases covered settings/auth preservation, workflow ignores, repeat install, local-skill/helper-only preservation, and legacy-skill refusal before destination changes in real/dry-run installs. PowerShell was unavailable; no behavioral pass was claimed.
- Bash syntax checks for both installer/health scripts and Node syntax checking for legacy-skill preflight passed.
- The actual Impeccable pin generator in an isolated synthetic workspace produced `leanflow-audit` and an OpenCode `leanflow-impeccable-audit` bridge, both referencing the namespaced main skill; no generic `audit` was generated. This verified file contracts, not host discovery or execution.

### Recorded pre-namespace cutover checks

These predated namespace consolidation and do not verify the current names, method selection, or adapters:

- `node --test tests/privacy-install.test.cjs`: one integration test passed, zero skips. Disposable Bash homes exercised auth/settings preservation, repeat installation, malformed-JSON refusal, nonmutating dry-run, both ignore rules, and already-tracked destination preservation.
- `bash -n install.sh scripts/workflow-health-check.sh`: passed; `pwsh` was absent, so PowerShell runtime validation was not performed.
- A Node package check confirmed four core metadata headers/relative links and local README/guide links: packaging, not registration.
- A source-loaded `omp v18.13.1` orchestration smoke had read/write/edit/shell/search but no delegation. A disposable greeting fixture produced a private completed plan, both ignore rules, and missing/blank-name handling. Independent Node assertions passed for undefined, whitespace-only, and named inputs; Git found both paths ignored, no tracked workflow records, no staged files, and zero commits.
- That model process exceeded 120 seconds without a final response: bounded partial execution, not completed consuming-agent acceptance or native discovery. An earlier Antigravity smoke was canceled on scope change, not accepted as evidence.
- Existing `.workflow/` records in the checkout were removed from the index while preserving files; Git found no indexed workflow paths and both spellings matched root ignores. Historical commits were unchanged.

### Earlier Antigravity migration fixtures

Isolated CLI fixtures on **2026-10-07** used then-shipped agents/skills in project-local discovery paths, with Gemini 3.8 Flash Medium for main. Old slash spellings below are historical, not current invocation instructions.

| Scenario | Historical observation |
| --- | --- |
| Planning-only and trivial `/plan` | Planner returned a pending workspace plan; source unchanged, executor not invoked. |
| `/execute <plan>` | Executor changed code, ran passing behavioral assertions, updated supplied checklist; main accepted. |
| `/orchestrate <task>` | Planner → saved plan → executor → verification → main acceptance completed without intermediate approval or mandatory reviewer. Git-backed run still said “No commits yet.” |
| Explicit `/hyperplan` | Planner/reviewer used five lenses; planner revised through native messaging; main saved a pending plan without implementation. |
| Legacy aliases/artifacts | `/flashplan` stayed planning-only; `/hyperexecution` used the old named executor. Plan/state conflict reconciled against source/ledger without replay; private history and ledger/state/notes hashes stayed unchanged. |
| Material invalidation | Old `/execute` returned `REPLAN_REQUIRED` with blocked plan. A post-plan payload/schema change caused exactly one replan and an authorization stop; newer source/consumer/data hashes stayed unchanged. |

Historical Bash and Windows PowerShell 5.1 migration fixtures passed clean, repeat, dry-run, backup-content, unrelated-agent preservation, and conflicting-flat-definition checks in private homes. Fresh fixtures deployed `request-review`, Medium model, empty trusted workspaces, and matching agents. The CLI parsed the safer preference then required authentication; no credentials were copied. Existing configuration/MCP/settings sentinels stayed unchanged. A health smoke preserved colliding legacy/destination and hidden files. Synthetic hooks requested confirmation for force-push, hard-reset, recursive-delete, and clean, without executing those dangerous commands.

Separate historical privacy checks covered real Bash fresh/existing installs, preference/auth preservation, telemetry opt-in migration, repeats, BOM handling, malformed-JSON rejection, and dry-run. CLI **1.3.1** startup/authentication and a model response were observed; Context7 **4.1.2** and CodeGraph **1.6.2** initialized with opt-outs; the live companion served a screen without the remote image. Windows PowerShell 5.1 parsing was checked, but full Windows privacy installation was not exercised in that check due to execution policy and absent Windows Node.js. These are distinct from the earlier Windows migration fixtures.

Some headless attempts stalled before substantive turns while inherited MCP servers connected; neither MCP nor output format was established as the cause, and those were not passes. A stale pre-fix fixture and a replan run that timed out before acceptance were rejected. A second-invalidation branch was not exercised because the first revision reached an authorization blocker. Windows Node/npx were absent from the test PATH, so Windows hook execution was not verified. No packet capture or exhaustive SDK-egress proof was performed. These remain historical limitations, not evidence for or against current adapters.
