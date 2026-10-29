# Generic Skill Installation

Use this mode when your host accepts the complete LeanFlow skill directories but has no authored native adapter. It copies files; it does not claim native runtime support, register commands, or provide agent bindings.

## Explicit target required

Consult your host's documentation for its actual skill root and discovery format. Run from the checkout with Node.js:

```bash
node scripts/install.mjs generic --target /path/to/host/skills --dry-run
node scripts/install.mjs generic --target /path/to/host/skills
node scripts/install.mjs generic --target /path/to/host/skills --update --dry-run
node scripts/install.mjs generic --target /path/to/host/skills --update
```

`--target` is the **skill root itself**: all 17 complete `leanflow-*/` packages in the [main and supporting skill catalog](../../README.md#skills-and-workflows) go directly inside it, not under another `skills/` child. They use the same canonical bytes as the native adapters. Standalone planning and execution are specification-optional; selected `leanflow-orchestrate` saves a specification with `leanflow-to-spec` in `.workflow/specification/` first, then plans, then executes within permission. Planning-only consent stops after specification and planning. `--with-agents` is unsupported and rejected before writes. No default destination is guessed.

`leanflow-commit-message` provides read-only, diff/history-grounded message advice and never commits. `leanflow-pr-work` prepares bounded changes and PR drafts without unrequested branch creation, commits, pushes, or PR publication. Neither Git skill nor any companion is an automatic orchestration stage. Generic copying does not provide native validation, discovery, or behavior evidence for the 17-skill package.

`.leanflow-manifest.json` records schema version, harness, and installed file SHA-256 digests. Changed managed bytes require `--update`; local changes and unowned conflicts require deliberate resolution. Previously managed entries omitted from an install remain recorded and installed; this is not a removal tool. Dry-run writes nothing. Individual files are replaced atomically, but no whole-bundle rollback is promised.

## Limits and migration

The installer does not establish whether the host understands `SKILL.md`, relative references, discovery, invocation, or the instructions. Verify those separately. Plain-file loading remains possible with a file-capable assistant even where native registration is unavailable; see the [quickstart](../../README.md#use-without-installing).

No agents, plugins, MCP services, hooks, host-global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore rules are installed. Of the former 25 optional `config/skills/` packages, `leanflow-to-spec` is retained and promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers are removed. Skills do not grant permissions or create containment.

Inventory existing assets and inspect ownership before replacing names. The installer does not delete old global configurations; never remove shared directories automatically. See [migration](../../docs/LEGACY_CONFIGURATION.md#migration-preserves-user-ownership), [compatibility evidence](../../COMPATIBILITY.md), and the [workflow guide](../../docs/PLANNING_GUIDE.md).
