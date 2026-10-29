# Claude Code Adapter

The adapter copies seven main LeanFlow skills and ten model-invokable companions into Claude Code's documented skill layout. Standalone planning and execution are specification-optional; selected `leanflow-orchestrate` saves a specification with `leanflow-to-spec` in `.workflow/specification/` first, then plans, then executes within permission. Planning-only consent stops after specification and planning. Native subagent bindings are optional. It does not install a full configuration kit.

## Install and update

Run from the checkout with Node.js:

```bash
node scripts/install.mjs claude --dry-run
node scripts/install.mjs claude
node scripts/install.mjs claude --with-agents --dry-run
node scripts/install.mjs claude --with-agents
```

The default root is `~/.claude`: all 17 complete `skills/leanflow-*/` packages in the [main and supporting skill catalog](../../README.md#skills-and-workflows) are installed, and the unchanged three opt-in `leanflow-{planner,executor,reviewer}.md` bindings go to `agents/`. Companions are conditional guidance, not mandatory workflow stages. For a project-local setup, supply its `.claude` root explicitly:

```bash
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents --dry-run
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents --update --dry-run
node scripts/install.mjs claude --target /path/to/project/.claude --with-agents --update
```

`--target` is the `.claude`-style root, not `skills/`. A custom directory is useful only where the host supports discovery. Follow the installed host's documented reload behavior and verify discovery rather than assuming file copying is registration.

`leanflow-commit-message` provides read-only, diff/history-grounded message advice and never commits. `leanflow-pr-work` prepares bounded changes and PR drafts without unrequested branch creation, commits, pushes, or PR publication. Neither is an automatic orchestration stage.

`.leanflow-manifest.json` records schema version, harness, and managed file SHA-256 digests. Changed managed content requires `--update`; local modifications and unowned files need deliberate conflict resolution. Previously managed files omitted from a later install are retained. Omitting `--with-agents` does not uninstall agents. Dry-run writes nothing; per-file atomic writes do not provide a whole-bundle transaction or rollback.

## Binding and permission limits

Native files under [`agents/`](agents/) use Claude Code subagent YAML rather than reusing omp/agy metadata. Model selection inherits the host. The canonical skills own specification, planning, and execution procedures; agent prompts bind roles and tools. Tool declarations are not proof of containment or inherited-tool suppression, and cannot grant unavailable tools or approvals.

Delegates perform only assigned work; they do not recursively launch orchestration. During parallel execution they return step IDs, results, checks, and blockers while the coordinator alone writes the shared plan. Planning-only consent remains planning-only.

No MCP, hooks, `CLAUDE.md`/global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore rules are installed. Of the former 25 optional `config/skills/` packages, `leanflow-to-spec` is retained and promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers are removed. Inventory older globals and preserve user ownership; existing global installs are not automatically deleted. See [legacy migration](../../docs/LEGACY_CONFIGURATION.md#migration-preserves-user-ownership).

## Documentation basis and evidence

The authored layout follows official [skills](https://code.claude.com/docs/en/skills) and [subagents](https://code.claude.com/docs/en/sub-agents) documentation. It is not a claim of native testing: the Claude Code executable was unavailable during the historical four-skill adapter checks. Native validation, discovery, and behavior of the current 17-skill package remain unverified. See [compatibility](COMPATIBILITY.md) and the [workflow guide](../../docs/PLANNING_GUIDE.md).
