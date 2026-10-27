# Codex Adapter

This project-targeted adapter installs seven canonical LeanFlow skills. Standalone planning and execution are specification-optional; selected `leanflow-orchestrate` saves a specification with `leanflow-to-spec` in `.workflow/specification/` first, then plans, then executes within permission. Planning-only consent stops after specification and planning. Native Codex subagent TOML definitions are optional. It does not modify a user-wide Codex configuration.

## Install and update

Run from the checkout with Node.js and an explicit project root:

```bash
node scripts/install.mjs codex --target /path/to/project --dry-run
node scripts/install.mjs codex --target /path/to/project
node scripts/install.mjs codex --target /path/to/project --with-agents --dry-run
node scripts/install.mjs codex --target /path/to/project --with-agents
node scripts/install.mjs codex --target /path/to/project --with-agents --update --dry-run
node scripts/install.mjs codex --target /path/to/project --with-agents --update
```

There is no implicit target. `--target` is the **project root**, not `.agents/skills/` or `.codex/`. The seven complete skills go to `.agents/skills/leanflow-{brainstorm,plan,execute,orchestrate,to-spec,commit-message,pr-work}/`; `--with-agents` adds the unchanged three `.codex/agents/leanflow-{planner,executor,reviewer}.toml` files. The installer does not edit `config.toml` or register an agent table there. Follow the installed Codex version's native discovery/reload behavior and verify it independently.

`leanflow-commit-message` provides read-only, diff/history-grounded message advice and never commits. `leanflow-pr-work` prepares bounded changes and PR drafts without unrequested branch creation, commits, pushes, or PR publication. Neither is an automatic orchestration stage.

The target-root `.leanflow-manifest.json` records schema version, harness, and file SHA-256 digests. Changed managed content requires `--update`; local modifications and unowned conflicts need explicit reconciliation. Old managed entries omitted from a later install remain retained. Omitting `--with-agents` does not uninstall agents. Dry-run is nonmutating; individual atomic writes do not promise whole-bundle rollback.

## Native roles and limits

The files under [`agents/`](agents/) use standalone TOML with `name`, `description`, and `developer_instructions`. Model and reasoning-effort settings are omitted to inherit the host; no new model policy is imposed. This is a different binding format from omp/agy/Claude Code, not evidence that those metadata files are interchangeable.

The shared skills own the procedures. Delegates perform assignment-only work without recursive orchestration; parallel workers return assigned step IDs, results, checks, and blockers, while the coordinator alone updates the shared plan. Role instructions are not enforced filesystem isolation or a permission boundary.

No MCP servers, hooks, global `AGENTS.md`, credentials, model/approval/telemetry settings, workspace settings, or ignore rules are changed. Only the requested install files/manifest are written under the explicit target. Of the former 25 optional `config/skills/` packages, `leanflow-to-spec` is retained and promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers are removed. Inspect ownership before migrating existing skills or agents; existing global installs are not automatically deleted. See [legacy migration](../../docs/LEGACY_CONFIGURATION.md#migration-preserves-user-ownership).

## Documentation basis and evidence

Official documentation describes [skill locations](https://learn.chatgpt.com/docs/build-skills), including project `.agents/skills/` and user `~/.agents/skills/`, and [standalone subagent definitions](https://learn.chatgpt.com/docs/agent-configuration/subagents). This adapter deliberately selects the project layout. Personal skills may instead use the generic installer against the documented skill root, without native agent installation.

Authored packaging is not native validation: no Codex executable was available during the historical four-skill adapter checks. Neither the historical five-skill revision nor the seven-skill package has native validation here; discovery and behavior of the two new Git skills remain unverified. See [compatibility](COMPATIBILITY.md) and the [workflow guide](../../docs/PLANNING_GUIDE.md).
