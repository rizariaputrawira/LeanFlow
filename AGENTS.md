# Repository Guidelines

## Project Overview

LeanFlow distributes five portable, instruction-based skills for coding assistants: brainstorming, specification, planning, execution, and orchestration. It is an installer-and-content repository, not a `src/` application or agent runtime. Hosts supply tools, discovery, delegation, and approval enforcement.

## Architecture & Data Flow

- **Canonical procedures:** `skills/leanflow-*/SKILL.md` and their relative references own workflow behavior. Keep complete skill directories together; resolve references from the containing skill directory.
- **Host bindings:** `harnesses/<host>/agents/` supplies optional planner, executor, and reviewer bindings for omp, agy, Claude Code, and Codex. Bindings load canonical procedures rather than duplicate them. Generic mode has no native agents.
- **Installer pipeline:** `scripts/install.mjs` parses arguments → bundles canonical skill bytes and optional host bindings → validates destinations and the managed-file manifest → previews or writes files. agy also receives generated plugin metadata.
- **Persistent state:** `.leanflow-manifest.json` in the install target records managed paths and SHA-256 hashes. Preflight refuses unsafe paths, symlinks, locally edited/missing managed files, and conflicting unmanaged content. `--update` permits upstream managed-content changes, not overwriting local edits. Omitted managed files remain tracked and are not removed.
- **Write boundary:** replacement is atomic per file, not across the bundle; failures may leave a partial installation. There is no automatic rollback or removal.
- **Workflow boundary:** selected orchestration requires a saved specification before planning; standalone planning/execution do not. Planning does not authorize implementation. Preserve these distinctions when editing skill contracts.

## Key Directories

- `skills/`: shared workflow procedures and references; `skills/SOURCES.md` records provenance.
- `harnesses/`: host-specific bindings, setup guides, and compatibility evidence.
- `scripts/` and `tests/`: Node installer and its CLI/filesystem regression suite.
- `docs/`: active `PLANNING_GUIDE.md` and historical `LEGACY_CONFIGURATION.md`.
- `config/` and `settings/`: legacy configuration examples, not current adapter inputs. In particular, `config/AGENTS.md` is archived content, distinct from these root repository guidelines.

## Development Commands

Run from the checkout root:

```bash
node scripts/install.mjs --help
node --test tests/install.test.mjs
node scripts/install.mjs omp --dry-run
node scripts/install.mjs generic --target /tmp/leanflow-skills --dry-run
```

For an actual installation, choose the intended target and omit `--dry-run`. Codex and generic require explicit `--target DIR`; native adapters accept opt-in `--with-agents`. Consult `harnesses/<host>/README.md` before installation or `--update`. `install.sh` and `install.ps1` only forward arguments to the Node installer.

There is no application/dev server, build step, package script, or configured lint/format command. Do not invent npm tasks.

## Code Conventions & Common Patterns

- JavaScript uses `.mjs` ES modules, `node:` built-ins, two-space indentation, single quotes, semicolons, and camelCase functions/variables. Skill and binding names use `leanflow-<role-or-workflow>`.
- Installer filesystem work is deliberately synchronous. Reuse small validation helpers and the existing parse/bundle/preflight/write separation; no async framework or dependency-injection container is present.
- Validation throws through `fail(message)`; the top-level handler prints `LeanFlow install failed: …` and sets exit code 1. Missing-file handling distinguishes `ENOENT` from other errors. Preserve actionable errors and preflight-before-write behavior.
- State is explicit options, bundles, maps, and the manifest—not an application store. Keep output deterministic through sorted entries and byte-preserving skill copies.
- Change workflow behavior in its canonical skill, then reconcile affected bindings and documentation. Keep the five-skill list, host layouts, tests, and public installation examples consistent when packaging changes.
- Current adapters do not install legacy hooks, MCP servers, global instructions, or model/approval/telemetry settings. Do not turn archived examples into current defaults.

## Important Files

- `scripts/install.mjs`: executable entry point, `coreSkills`, `hosts`, manifest validation, and write safety.
- `tests/install.test.mjs`: observable installer contract and reusable fixture helpers.
- `skills/leanflow-orchestrate/SKILL.md`: composition of specification, planning, and authorized execution.
- `README.md` and `harnesses/<host>/README.md`: public usage and destination semantics.
- `COMPATIBILITY.md` and host-specific compatibility files: evidence scope and host-validation limits.
- `docs/PLANNING_GUIDE.md`: workflow consent, artifact privacy, resumption, and verification.
- `skills/SOURCES.md`: provenance and change history; update when changing documented skill lineage or contracts.

## Runtime/Tooling Preferences

Use Node.js for installation and tests; the code has no external npm dependencies or package-manager setup. No minimum Node version or runtime pin is declared. Compatibility records mention Node.js 24.20.0 as an observed environment, not a requirement. Do not substitute Bun-specific APIs or introduce a package-manager workflow without a task-driven need. Plain-file skill use requires no installer runtime.

## Testing & QA

Use `node --test tests/install.test.mjs` after installer or packaging changes. Tests use `node:test`, `node:assert/strict`, and `spawnSync` with `process.execPath`; temporary targets and isolated `HOME`/`USERPROFILE` prevent writes to real user configuration. Follow the existing fixture helpers and `t.after` cleanup pattern.

Regression checks should assert consumer-visible exit status and filesystem bytes: dry-run nonmutation, host layouts, opt-in agents, update consent, retained files, manifest validation, conflicts, and symlink refusal. Windows skips platform-dependent symlink cases. No coverage tooling or threshold is configured.

For skill/binding edits, check relative references and reconcile the relevant setup, planning, provenance, and compatibility docs. Distinguish package/source checks from actual host discovery and observed behavior; passing installer tests does not prove native dispatch, instruction-following, or containment. Record only exercised evidence and preserve the scope of historical compatibility results.
