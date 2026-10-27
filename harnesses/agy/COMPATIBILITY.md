# agy Compatibility

## Authored contract

- Native plugin root defaults to `~/.gemini/config/plugins/leanflow`, containing `plugin.json` and four canonical skill directories.
- Optional native `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` plugin agents; no installation into the former shared global agent tree.
- Planner/reviewer tools: `read_file`, `search_web`; executor adds `write_file`, `edit_file`, `run_command`. Model is `inherit`.
- No MCP, hooks, global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore-rule changes.

Authored native plugin metadata is not native registration evidence. A custom target must be discoverable through the actual host's plugin mechanism.

## Current evidence

On **agy 1.4.7**, strict native plugin validation of a disposable installed bundle returned four skills, three agents, zero hooks/MCP servers/rules, and no findings. No model-driven native agent dispatch, live plugin enablement, MCP service, or end-to-end agy execution was exercised. The central compatibility evidence records the separate installer checks.

The older CLI **1.3.1** checks used different shared/global or project-local layouts and older agents. They did not test this plugin package. Historical `/plan` routing could expand the native built-in first; a feedback artifact could start implementation despite planning-only intent. Do not infer that a namespaced skill replaces built-in routing, and do not use an execution-triggering feedback path to persist a planning-only result.

Historical narrow agent tool lists did not suppress ambient MCP access. A safety-hook confirmation was auto-approved under `always-proceed`. Historical telemetry opt-outs did not prove native/account telemetry was disabled or provider retention controlled. These observations and all skips/failures are retained in [legacy configuration](../../docs/LEGACY_CONFIGURATION.md), not presented as current behavior.

## Unsupported guarantees

Plugin registration, correct role metadata, and declared tool policies are separate from instruction following, approval enforcement, inherited-tool suppression, shell containment, or no-telemetry operation. Installing this adapter neither changes account telemetry nor disables old global settings/hooks/MCP entries.

See [setup/migration](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
