# Claude Code Adapter

The adapter copies four canonical LeanFlow skills into Claude Code's documented skill layout, with optional native subagent bindings. It does not install a full configuration kit.

## Install and update

Run from the checkout with Node.js:

```bash
node scripts/install.mjs claude --dry-run
node scripts/install.mjs claude
node scripts/install.mjs claude --with-agents --dry-run
node scripts/install.mjs claude --with-agents
```

The default root is `~/.claude`: core directories go to `skills/`, and opt-in `leanflow-{planner,executor,reviewer}.md` bindings go to `agents/`. For a project-local setup, supply its `.claude` root explicitly:

```bash
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents --dry-run
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents --update --dry-run
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents --update
```

`--target` is the `.claude`-style root, not `skills/`. A custom directory is useful only where the host supports discovery. Follow the installed host's documented reload behavior and verify discovery rather than assuming file copying is registration.

`.leanflow-manifest.json` records schema version, harness, and managed file SHA-256 digests. Changed managed content requires `--update`; local modifications and unowned files need deliberate conflict resolution. Previously managed files omitted from a later install are retained. Omitting `--with-agents` does not uninstall agents. Dry-run writes nothing; per-file atomic writes do not provide a whole-bundle transaction or rollback.

## Binding and permission limits

Native files under [`agents/`](agents/) use Claude Code subagent YAML rather than reusing omp/agy metadata. Model selection inherits the host. The canonical skills own planning/execution procedures; agent prompts bind roles and tools. Tool declarations are not proof of containment or inherited-tool suppression, and cannot grant unavailable tools or approvals.

Delegates perform only assigned work; they do not recursively launch orchestration. During parallel execution they return step IDs, results, checks, and blockers while the coordinator alone writes the shared plan. Planning-only consent remains planning-only.

No MCP, hooks, `CLAUDE.md`/global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore rules are installed. The 25 optional `config/skills/` packages remain legacy source. Inventory older globals and preserve user ownership; do not automatically delete shared directories when migrating. See [legacy migration](../../docs/LEGACY_CONFIGURATION.md#migration-preserves-user-ownership).

## Documentation basis and evidence

The authored layout follows official [skills](https://code.claude.com/docs/en/skills) and [subagents](https://code.claude.com/docs/en/sub-agents) documentation. It is not a claim of native testing: the Claude Code executable was unavailable during this change. See [compatibility](COMPATIBILITY.md) and the [workflow guide](../../docs/PLANNING_GUIDE.md).
