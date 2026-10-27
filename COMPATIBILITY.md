# Compatibility and Evidence

LeanFlow separates **portable workflow source**, **host packaging**, **native discovery**, and **observed behavior**. The same canonical Markdown bytes are installed for every target; that does not make native agent formats interchangeable or establish that a host follows the instructions.

## Authored installation targets

| Target | Destination | Optional native agents | Current evidence boundary |
| --- | --- | --- | --- |
| [`omp`](harnesses/omp/README.md) | `~/.omp/agent`, or custom agent root | Three Markdown/YAML definitions in `agents/`; model omitted to inherit | Installed skill loading and one native project reviewer dispatch completed in omp 18.13.1; planner/executor native dispatch and full parallel execution remain unverified. |
| [`agy`](harnesses/agy/README.md) | `~/.gemini/config/plugins/leanflow`, or custom plugin root | Three plugin agent definitions; `model: inherit` | Strict native plugin validation passed in agy 1.4.7: four skills, three agents, no findings. Model-driven dispatch remains unverified. |
| [`claude`](harnesses/claude/README.md) | `~/.claude`, or custom `.claude`-style root | Three native Markdown/YAML subagents; `model: inherit` | Official documented layout; executable unavailable during this change, so no native validation claimed. |
| [`codex`](harnesses/codex/README.md) | Explicit project root; `.agents/skills/` | Three standalone `.codex/agents/*.toml`; model/effort inherited | Official documented layout; executable unavailable during this change, so no native validation claimed. No `config.toml` registry changes. |
| [`generic`](harnesses/generic/README.md) | Required explicit skill root; four directories directly inside | None; `--with-agents` rejected before writes | File installation only; no host discovery, agent dispatch, or runtime compatibility claim. |

Every default installation includes exactly `leanflow-brainstorm`, `leanflow-plan`, `leanflow-execute`, and `leanflow-orchestrate`, plus applicable installer/plugin metadata. Native agents require `--with-agents`; the 25 legacy optional `config/skills/` packages are excluded. Detailed per-host evidence: [omp](harnesses/omp/COMPATIBILITY.md), [agy](harnesses/agy/COMPATIBILITY.md), [Claude Code](harnesses/claude/COMPATIBILITY.md), [Codex](harnesses/codex/COMPATIBILITY.md).

## What each kind of evidence proves

1. **Source/package checks:** files, metadata, relative links, canonical bytes, manifest behavior, and nonmutating dry-run. These cannot establish native loading or instruction following.
2. **Native registration:** the installed host/version discovers the actual skill/agent/plugin. This does not prove invocation routing, permitted tool behavior, or a completed delegated task.
3. **Behavior smoke:** the actual instructions are read and applied to a bounded fixture, with observed outcomes. Planning-only, inline-plan, direct execution, and parallel orchestration need their own relevant observations; a launch receipt is not completion.
4. **Permissions and containment:** native tool declarations or role prompts express intended scope. They are not evidence of inherited-MCP suppression, command isolation, OS containment, or host approval enforcement.

## Current observed checks

Checks used disposable directories on Linux/WSL2 with Node.js 24.20.0. No live host installation, credentials, persistent settings, or external services were changed.

- `node --test tests/install.test.mjs`: **27 passed, zero failures, zero skips**. Actual CLI cases cover the five layouts, four-skill default, opt-in agents, retained managed entries, dry-run nonmutation, consent for managed updates, local/unmanaged conflicts, unsafe manifests, source/destination symlinks, and preservation of unrelated settings/workspace files.
- Real CLI installations exercised all five layouts. Bash wrapper execution, Bash syntax, CLI help, **80 local file/heading links**, and identical canonical skill bytes across the installed layouts passed. PowerShell execution was not performed because its runtime was unavailable.
- `agy plugin validate <disposable-target> --strict --json` on **agy 1.4.7** returned four skills, three agents, zero hooks/MCP servers/rules, and no findings. This is native parsing/loader validation, not a model or server handshake.
- **omp 18.13.1** loaded all four installed skills through native `omp read`; their bodies matched the installed canonical files. The initial direct shell probe failed at URI argument resolution; a child-process probe passed the URI unchanged to the native CLI. No failed probe is counted as a successful read.
- Python's standard-library TOML parser accepted all three Codex role files and their documented required fields, with no model/reasoning override. The Codex and Claude Code executables were absent; syntax/layout and installer checks do not establish their native registration or behavior.
- Three fresh source-loaded **omp 18.13.1 / openai-codex/gpt-6.1-sol** cases completed: direct execution from an exact inline plan while artifact writes were forbidden; a delegated worker returning assigned numeric-sum checks without editing its coordinator-owned plan; and delegation-only refusal with file tools available but no delegation interface. Independent Node checks verified consumer outputs, the shared plan's SHA-256 stayed unchanged, and directory/source checks found no forbidden artifacts or direct implementation in the refusal case.

- An initial native omp reviewer-dispatch probe resolved `leanflow-reviewer` from the project definitions, and worker progress showed two source reads plus the expected negative-price finding. Its parent runner omitted the native wait tool, wrote an unnecessary temporary scope note, and exceeded its 180-second deadline without terminal acceptance. The note was removed. This probe is not counted as completed native workflow acceptance.
- A fresh native omp probe exposed the supported `wait` tool and asynchronous print completion. It resolved the project `leanflow-reviewer`, read the actual canonical review procedure and synthetic source, returned the expected `discount.cjs:2` negative-price finding, and reached terminal completion through native `wait`. The source stayed unchanged and no workspace artifacts were created. This verifies one native reviewer binding/return path, not every role, tool restriction, or parallel execution schedule; the preceding failed runner remains part of the record.

The worker smoke establishes bounded ownership behavior, not every parallel schedule or enforcement against an uncooperative agent. Source-loaded cases are not native registration tests. A copied file, parser pass, historical smoke, or absence of a known failure must not be promoted to an all-host support claim.

## Behavior and privacy boundaries

Canonical skills own procedures; native bindings only map available roles/tools. A delegate must read the actual relevant skill, not recursively run top-level orchestration. During parallel execution the coordinator alone writes the shared plan, integrating worker step IDs, outcomes, verification, and blockers. Sequential direct execution may update the supplied plan. In-chat plans are valid when their exact content is supplied and checked; persistence follows workflow privacy/permission rules, with chat evidence when persistence is unavailable.

Installation does not mutate host-global instructions, MCP settings, credentials, model/approval/telemetry choices, workspace settings, or ignore rules. Codex's explicit project installation writes only its requested skill/agent files and manifest. Local artifact ignores are established by the workflow when authorized, not by adapter setup. No adapter claims telemetry suppression or a confidentiality boundary.

The `.leanflow-manifest.json` preserves old managed entries omitted from later selections; omitting agents is not uninstall. Managed updates require `--update`, and conflicts/local changes require reconciliation. File replacement is atomic per file, not a whole-bundle rollback guarantee. Old global assets are not automatically removed or owned merely because their names match.

## Historical evidence is not current validation

Prior source-loaded omp method-selection smoke, namespace/full-bundle installer checks, pre-namespace partial execution, and Antigravity CLI 1.3.1 observations are preserved with failures, skips, and limitations in [the historical record](docs/LEGACY_CONFIGURATION.md#historical-verification-record). They predate these adapters and must not be cited as current plugin/agent registration or dispatch proof.

Other hosts can use [plain-file loading](README.md#get-started-without-installing) or their documented skill-discovery format. This is source portability, not an unbounded list of natively supported runtimes. For problems, open a [GitHub issue](https://github.com/rizariaputrawira/leanflow/issues) with the host/version, selected target/options, and redacted observed output.
