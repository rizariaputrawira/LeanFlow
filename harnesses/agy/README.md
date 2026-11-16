# agy Adapter

This adapter packages seven main LeanFlow skills and ten model-invokable companions as a native agy plugin. Standalone planning and execution are specification-optional; selected `leanflow-orchestrate` saves a specification with `leanflow-to-spec` in `.workflow/specification/` first, then plans, then executes within permission. Planning-only consent stops after specification and planning. Optional agy agent bindings use host-native metadata and tool names; the shared skills remain the procedure owners.

## Install and update

Run from the checkout with Node.js:

```bash
node scripts/install.mjs agy --dry-run
node scripts/install.mjs agy
node scripts/install.mjs agy --with-agents --dry-run
node scripts/install.mjs agy --with-agents
```

The default target is `~/.gemini/config/plugins/leanflow`. It receives native `plugin.json` (`name: "leanflow"`, `displayName: "LeanFlow"`, `version: "0.1.0"`, and `description`) plus all 17 complete `skills/leanflow-*/` packages listed in the [main and supporting skill catalog](../../README.md#skills-and-workflows); `--with-agents` also copies the three native files from [`agents/`](agents/) into the plugin's `agents/` directory. This is not the old global `~/.gemini/config/agents/` installation.

`leanflow-commit-message` provides read-only, diff/history-grounded message advice and never commits. `leanflow-pr-work` prepares bounded changes and PR drafts without unrequested branch creation, commits, pushes, or PR publication. Neither Git skill nor any companion is an automatic orchestration stage. Strict native validation accepted the 17-skill package on agy 1.5.9; discovery, primary-selection enforcement, dispatch, and coordinator continuity remain unverified. Earlier observations retain their original scope.

For a custom plugin directory and update:

```bash
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents --dry-run
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents --update --dry-run
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents --update
```

`--target` is the plugin root. A custom directory must be discoverable through agy's supported plugin mechanism; copying files alone does not activate an arbitrary location. For project-scoped skills without a plugin or native agents, you can install directly into a repository's workspace discovery path:

```bash
node scripts/install.mjs generic --target /path/to/project/.agents/skills --dry-run
node scripts/install.mjs generic --target /path/to/project/.agents/skills
```

`.leanflow-manifest.json` records schema version, harness, and installed file SHA-256 digests. Changed managed bytes require `--update`; local modifications/unowned conflicts require explicit reconciliation. Omitted old managed files remain recorded and installed; dropping `--with-agents` does not remove previously installed agents. Dry-run writes nothing. Per-file atomic replacement is not a whole-plugin transaction or rollback promise.

### Verify and manage in agy

After installing into `~/.gemini/config/plugins/leanflow` (or a custom plugin directory), check native parsing, registration, and lifecycle state with `agy`:

```bash
agy plugin validate ~/.gemini/config/plugins/leanflow --strict --json
agy plugin list --json
agy agent
agy plugin enable leanflow
agy plugin disable leanflow
```

`agy plugin validate ... --strict --json` checks manifest structure, skills, and agents statically (expect 17 skills, 3 agents when `--with-agents` is used, zero errors/warnings, and one informational note because no plugin logo is bundled). In a live session, agy exposes enabled plugin skills in `<skills>` (with their `SKILL.md` paths for `read_file`) and registers `/leanflow-<name>` slash commands. Built-in `/plan` still invokes agy's native Plan Mode rather than `leanflow-plan`; load `leanflow-plan` explicitly (or invoke `/leanflow-plan`) when you want LeanFlow's planning procedure.

## Native Plan Mode interaction

In agy, native Plan Mode refuses workspace file writes (`write_file` and `edit_file`) during the planning turn, and calling `exit_plan_mode` (or setting `RequestFeedback: true` on an artifact) transitions directly into an execution turn:

- **Planning-only requests** (`leanflow-plan`, `leanflow-brainstorm`, standalone `leanflow-to-spec`, or planning-only `leanflow-orchestrate`): if native Plan Mode blocks writing `.gitignore`, `.workflow/specification/`, or `.workflow/plans/`, return the complete grounded draft in chat with the write-boundary notice (and for `leanflow-orchestrate`, stop dependent planning/implementation on the required-specification persistence blocker). Do **not** call `exit_plan_mode` or emit `RequestFeedback: true` artifacts, because either can start implementation.
- **Authorized end-to-end work started in Plan Mode:** complete read-only research and planning in the planning turn, then hand off via `exit_plan_mode` so the execution turn establishes `/.workflow/` and `/workflow/` in `.gitignore` and writes `.workflow/specification/` and `.workflow/plans/` before editing source files.

## Native binding boundaries and delegation

Planner/reviewer declare `read_file` and `search_web`. Executor additionally declares `write_file`, `edit_file`, and `run_command`. Native model selection is `inherit`; no host model setting is changed. Role tool declarations do not demonstrate inherited-tool suppression, command containment, or an OS sandbox.

Bindings refer to loaded canonical skills via `read_file`. Because subagents run in whatever workspace is active—often outside the LeanFlow source checkout—the coordinator's `invoke_subagent` assignment packet should include the exact `SKILL.md` path from the active `<skills>` catalog (or the local `skills/leanflow-*/SKILL.md` path in a source checkout) so workers can read the canonical procedure and resolve relative references from its directory:

- `leanflow-planner` handles read-only planning (`leanflow-plan`) and, when assigned by orchestration, read-only specification drafting (`leanflow-to-spec`).
- `leanflow-executor` loads `leanflow-execute` and `references/delegation.md`, implements bounded assigned steps, and returns observed verification evidence without editing the shared plan.
- `leanflow-reviewer` loads `leanflow-orchestrate/references/delegation.md` (**Delegated review**) and `leanflow-code-review/SKILL.md` (plus applicable review companions) rather than running top-level orchestration.

In agy, `invoke_subagent` notifies the parent coordinator automatically via reactive wakeup when a worker completes or needs guidance—end the coordinator turn to wait rather than polling, and use `send_message` with the returned `conversationId` to continue an existing worker's work. Delegated execution is assignment-only, not a recursive workflow invocation. Parallel workers return assigned step IDs, results, verification, and blockers; only the coordinator writes the shared plan. Optional roles do not make delegation or reviewer stages mandatory.

### Session continuity

The optional `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` roles are delegated-only: `mainAgent: false` and `subagent: true`. Keep the default/current primary agent as coordinator and load the canonical `leanflow-orchestrate`, `leanflow-plan`, or `leanflow-execute` procedure as applicable instead of switching primary roles between stages. For example:

> Use leanflow-orchestrate for this task. Keep the current agent as coordinator and use LeanFlow roles only as delegated workers.

The example does not expand authorization or replace loading the canonical procedures. The [agent schema](https://antigravity.google/docs/subagents.md) documents delegated-only metadata; the [agent command reference](https://antigravity.google/docs/cli/commands/agents/#common-mistakes) says switching the primary agent forks the conversation. Native delegation intentionally creates separate worker conversations: this preserves the parent coordinator, not a single conversation for all workers. Enforcement depends on the installed host version.

Existing managed bindings need an explicit update and native reload. Use the explicit-target update preview and command above, including `--with-agents --update`; reconcile local modifications first. Omitting `--with-agents` does not uninstall old roles.

## Scope, coexistence, and migration

The adapter does not deploy old `config/` settings, hooks, rules, MCP entries, or host-global instructions. Of the former 25 optional skill packages, `leanflow-to-spec` is retained and promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers are removed. It does not change credentials, model/approval/telemetry settings, or workspace privacy rules. `install.sh` and `install.ps1` now forward to the Node adapter CLI, not a full-configuration installer.

- **Legacy `~/.gemini/config/` conflicts:** if an earlier `oh-my-antigravity` setup left `~/.gemini/config/AGENTS.md` or `~/.gemini/config/hooks.json` in place, those global rules and hooks can still inject retired commands (`flashplan`, `superplan`, `hyperplan`, `hyperexecution`), obsolete paths (`.workflow/specs/`, `state.json`, `ledger.jsonl`), or automatic-commit instructions that conflict with current LeanFlow. Inspect those files first and archive or remove only assets you own if you want clean LeanFlow behavior.
- **Coexisting plugins (such as `kitshift`):** when another skill/agent plugin is also enabled in `~/.gemini/config/plugins/`, naming `leanflow-*` explicitly in prompts or assignment packets selects LeanFlow's procedures and roles without disabling the other plugin.

Existing global skills/agents, hooks, and MCP entries are not uninstalled. Inventory and back up assets you own, preview the plugin install, and resolve collisions deliberately; never automatically remove shared global directories. The new plugin manifest does not establish ownership of old globals. See [migration and historical telemetry warnings](../../docs/LEGACY_CONFIGURATION.md). Current installation does not apply historical telemetry opt-outs or account settings.

See [compatibility](COMPATIBILITY.md) for the distinction between authored plugin packaging, native registration, behavior, and historical observations. Planning-only requests must not be sent through native feedback routes that start implementation.
