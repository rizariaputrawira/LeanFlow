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

`--target` is the **skill root itself**: the four `leanflow-{brainstorm,plan,execute,orchestrate}/` directories go directly inside it, not under another `skills/` child. All four use the same canonical bytes as the native adapters. `--with-agents` is unsupported and rejected before writes. No default destination is guessed.

`.leanflow-manifest.json` records schema version, harness, and installed file SHA-256 digests. Changed managed bytes require `--update`; local changes and unowned conflicts require deliberate resolution. Previously managed entries omitted from an install remain recorded and installed; this is not a removal tool. Dry-run writes nothing. Individual files are replaced atomically, but no whole-bundle rollback is promised.

## Limits and migration

The installer does not establish whether the host understands `SKILL.md`, relative references, discovery, invocation, or the instructions. Verify those separately. Plain-file loading remains possible with a file-capable assistant even where native registration is unavailable; see the [quickstart](../../README.md#get-started-without-installing).

No agents, plugins, MCP services, hooks, host-global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore rules are installed. The 25 `config/skills/` legacy packages are excluded. Skills do not grant permissions or create containment.

Inventory existing assets and inspect ownership before replacing names. The installer does not delete old global configurations; never remove shared directories automatically. See [migration](../../docs/LEGACY_CONFIGURATION.md#migration-preserves-user-ownership), [compatibility evidence](../../COMPATIBILITY.md), and the [workflow guide](../../docs/PLANNING_GUIDE.md).
