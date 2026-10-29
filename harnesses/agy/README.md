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

The default target is `~/.gemini/config/plugins/leanflow`. It receives native `plugin.json` and all 17 complete `skills/leanflow-*/` packages listed in the [main and supporting skill catalog](../../README.md#skills-and-workflows); `--with-agents` also copies the unchanged three native files from [`agents/`](agents/) into the plugin's `agents/` directory. This is not the old global `~/.gemini/config/agents/` installation.

`leanflow-commit-message` provides read-only, diff/history-grounded message advice and never commits. `leanflow-pr-work` prepares bounded changes and PR drafts without unrequested branch creation, commits, pushes, or PR publication. Neither Git skill nor any companion is an automatic orchestration stage. Native validation, discovery, and behavior of the 17-skill package remain unverified; earlier observations retain their original scope.

For a custom plugin directory and update:

```bash
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents --dry-run
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents --update --dry-run
node scripts/install.mjs agy --target /path/to/plugins/leanflow --with-agents --update
```

`--target` is the plugin root. A custom directory must be discoverable through agy's supported plugin mechanism; copying files alone does not activate an arbitrary location. Follow your installed version's plugin reload/discovery procedure, check native registration, and explicitly load LeanFlow rather than assuming a built-in `/plan` routes to it.

The `.leanflow-manifest.json` records schema version, harness, and installed file SHA-256 digests. Changed managed bytes require `--update`; local modifications/unowned conflicts require explicit reconciliation. Omitted old managed files remain recorded and installed; dropping `--with-agents` does not remove previously installed agents. Dry-run writes nothing. Per-file atomic replacement is not a whole-plugin transaction or rollback promise.

## Native binding boundaries

Planner/reviewer declare `read_file` and `search_web`. Executor additionally declares `write_file`, `edit_file`, and `run_command`. Native model selection is `inherit`; no host model setting is changed. Role tool declarations do not demonstrate inherited-tool suppression, command containment, or an OS sandbox.

Bindings refer to loaded canonical skills. Delegated execution is assignment-only, not a recursive workflow invocation. Parallel workers return assigned step IDs, results, verification, and blockers; only the coordinator writes the shared plan. Optional roles do not make delegation or reviewer stages mandatory.

## Scope and migration

The adapter does not deploy old `config/` settings, hooks, rules, MCP entries, or host-global instructions. Of the former 25 optional skill packages, `leanflow-to-spec` is retained and promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers are removed. It does not change credentials, model/approval/telemetry settings, or workspace privacy rules. `install.sh` and `install.ps1` now forward to the Node adapter CLI, not a full-configuration installer.

Existing global skills/agents, hooks, and MCP entries are not uninstalled. Inventory and back up assets you own, preview the plugin install, and resolve collisions deliberately; never automatically remove shared global directories. The new plugin manifest does not establish ownership of old globals. See [migration and historical telemetry warnings](../../docs/LEGACY_CONFIGURATION.md). Current installation does not apply historical telemetry opt-outs or account settings.

See [compatibility](COMPATIBILITY.md) for the distinction between authored plugin packaging, native registration, behavior, and historical observations. Planning-only requests must not be sent through native feedback routes that start implementation.
