# agy Compatibility

## Authored contract

- Native plugin root defaults to `~/.gemini/config/plugins/leanflow`, containing `plugin.json` and seven canonical skill directories: `leanflow-{brainstorm,plan,execute,orchestrate,to-spec,commit-message,pr-work}`. Standalone planning and execution are specification-optional; selected orchestration requires a saved `.workflow/specification/` file first, then planning, then execution within permission.
- Optional native `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` plugin agents; no installation into the former shared global agent tree.
- Planner/reviewer tools: `read_file`, `search_web`; executor adds `write_file`, `edit_file`, `run_command`. Model is `inherit`.
- No MCP, hooks, global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore-rule changes.

Authored native plugin metadata is not native registration evidence. A custom target must be discoverable through the actual host's plugin mechanism.

The three native roles are unchanged. The two new Git skills are not automatic orchestration stages. Native validation of the seven-skill package and discovery/behavior of `leanflow-commit-message` and `leanflow-pr-work` remain unverified; the observations below apply only to earlier revisions.

## Historical five-skill evidence

On **agy 1.4.7**, strict native validation of a disposable installation returned **five skills, three agents, zero hooks/MCP servers/rules, and no findings**. This historical result predates both the spec-first orchestration revision and the Git-skill additions and verifies parser/loader acceptance, not the revised stage sequence, live enablement, model-driven dispatch, or end-to-end execution. See the [central historical five-skill checks](../../COMPATIBILITY.md#historical-five-skill-checks).

## Historical four-skill evidence

Before the canonical `leanflow-to-spec` addition, on **agy 1.4.7**, strict native plugin validation of a disposable installed bundle returned four skills, three agents, zero hooks/MCP servers/rules, and no findings. This remains historical four-skill validation. No model-driven native agent dispatch, live plugin enablement, MCP service, or end-to-end agy execution was exercised.

The older CLI **1.3.1** checks used different shared/global or project-local layouts and older agents. They did not test this plugin package. Historical `/plan` routing could expand the native built-in first; a feedback artifact could start implementation despite planning-only intent. Do not infer that a namespaced skill replaces built-in routing, and do not use an execution-triggering feedback path to persist a planning-only result.

Historical narrow agent tool lists did not suppress ambient MCP access. A safety-hook confirmation was auto-approved under `always-proceed`. Historical telemetry opt-outs did not prove native/account telemetry was disabled or provider retention controlled. These observations and all skips/failures are retained in [legacy configuration](../../docs/LEGACY_CONFIGURATION.md), not presented as current behavior.

## Unsupported guarantees

Plugin registration, correct role metadata, and declared tool policies are separate from instruction following, approval enforcement, inherited-tool suppression, shell containment, or no-telemetry operation. Installing this adapter neither changes account telemetry nor disables old global settings/hooks/MCP entries.

See [setup/migration](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
