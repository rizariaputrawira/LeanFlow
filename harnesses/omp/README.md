# omp Adapter

This adapter installs five shared LeanFlow skills into omp's skill layout. Standalone planning and execution are specification-optional; selected `leanflow-orchestrate` saves a specification with `leanflow-to-spec` in `.workflow/specification/` first, then plans, then executes within permission. Planning-only consent stops after specification and planning. Optional native bindings use omp metadata and tool names; canonical procedures remain in the skills, not duplicated in role prompts.

## Install and update

Run from the checkout with Node.js:

```bash
node scripts/install.mjs omp --dry-run
node scripts/install.mjs omp
node scripts/install.mjs omp --with-agents --dry-run
node scripts/install.mjs omp --with-agents
```

The default target is `~/.omp/agent`. It receives `skills/leanflow-{brainstorm,plan,execute,orchestrate,to-spec}/`; `--with-agents` also copies the three files from [`agents/`](agents/) to `agents/leanflow-{planner,executor,reviewer}.md`.

For an isolated/custom agent root and later update:

```bash
node scripts/install.mjs omp --target /path/to/agent-root --with-agents --dry-run
node scripts/install.mjs omp --target /path/to/agent-root --with-agents
node scripts/install.mjs omp --target /path/to/agent-root --with-agents --update --dry-run
node scripts/install.mjs omp --target /path/to/agent-root --with-agents --update
```

`--target` names the agent root, not its `skills/` child. A custom path must be discoverable through the host's own supported setup; copying there does not activate it automatically. Follow the installed omp version's reload/discovery procedure and verify the actual skills and optional agents are available.

The installer records `.leanflow-manifest.json` with schema version, harness, and file SHA-256 digests. Changed installer-managed content requires `--update`; local modifications and unowned conflicts must be resolved deliberately rather than overwritten as user configuration. Omitted old managed files remain recorded and installed. Omitting `--with-agents` is not uninstall. Dry-run writes nothing; individual file replacement is atomic, but there is no whole-bundle transaction or rollback.

## Native binding boundaries

Planner/reviewer declare `read`, `grep`, `glob`, and `web_search`. Executor additionally declares `edit`, `write`, and `bash`. Model selection is omitted to inherit the host. Declarations do not prove tool availability, inherited-tool suppression, filesystem isolation, or OS containment.

Use loaded canonical skills for procedures. Delegates handle only assigned scope; they do not recursively orchestrate. Parallel workers return assigned step IDs, results, checks, and blockers; the coordinator alone updates the shared plan. Installing agents neither activates delegation automatically nor makes review mandatory.

If you customize the main session's tool allowlist, retain a supported task-completion mechanism. In the historical four-skill omp 18.13.1 print-mode checks, `task` plus native `wait` and asynchronous completion reached terminal reviewer acceptance; a runner omitting `wait` timed out. This is runner configuration, not five-skill native-loading validation or a reason to weaken approval settings, poll jobs, or treat a launch receipt as completion.

## Scope and migration

No MCP servers, hooks, global `AGENTS`/personality instructions, model/approval/telemetry settings, credentials, or workspace privacy rules are installed. Of the former 25 optional `config/skills/` packages, `leanflow-to-spec` is retained and promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers are removed. `install.sh` and `install.ps1` only forward to the Node adapter CLI, with an explicit host argument.

For an old full-configuration setup, inventory and back up your own assets, preview this install, and resolve conflicts by ownership. The installer does not remove old shared globals or disable old hooks/MCP entries. Never delete a shared directory just because a previous LeanFlow version used it. See [legacy migration](../../docs/LEGACY_CONFIGURATION.md#migration-preserves-user-ownership).

Read [compatibility and evidence limits](COMPATIBILITY.md) and the [workflow guide](../../docs/PLANNING_GUIDE.md) before relying on native behavior.
