# agy Compatibility

## Authored contract

- Native plugin root defaults to `~/.gemini/config/plugins/leanflow`, containing `plugin.json`, seven main skills, and ten model-invokable companions under `skills/leanflow-*/`; see the [skill catalog](../../README.md#skills-and-workflows). Standalone planning and execution are specification-optional; selected orchestration requires a saved `.workflow/specification/` file first, then planning, then execution within permission.
- Optional native `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` plugin agents use `mainAgent: false` and `subagent: true` for delegated-only roles; no installation into the former shared global agent tree.
- Planner/reviewer tools: `read_file`, `search_web`; executor adds `write_file`, `edit_file`, `run_command`. Model is `inherit`.
- No MCP, hooks, global instructions, credentials, model/approval/telemetry settings, workspace settings, or ignore-rule changes.

Authored native plugin metadata is not native registration evidence. A custom target must be discoverable through the actual host's plugin mechanism.

The three role names and procedures remain, while primary-agent eligibility changes for hosts honoring the metadata. Neither the Git workflows nor companions are automatic orchestration stages. Native discovery and behavior of the 17-skill package remain unverified.

## Delegated-only package checks

On Linux/WSL2, the existing installer suite passed (27 tests, zero failures or skips). A separate disposable isolated-home installation's dry-run left the target absent; the installed role bytes matched source, manifest hashes matched, and the explicit eligibility booleans, inherited model and tool declarations were present.

**agy 1.5.0** `plugin validate <target> --strict --json` exited zero and reported 17 skills, three agents, no warnings or errors, and no ignored-field findings. It emitted one informational note about the missing plugin logo. This is plugin parsing, not project or UI discovery, primary-selection enforcement, or worker dispatch.

An isolated interactive launch initially could not open `/dev/tty`; with a terminal it displayed an unsigned-in login prompt. An isolated `agy agents` invocation returned no output, so fixture plugin discovery was not established. No credentials were copied or login performed. The `/agents` primary-selection check, three worker completions, result bytes, parent identity, and coordinator continuity remain unverified; an authenticated isolated runtime and successful plugin discovery are prerequisites.

## Historical five-skill evidence

On **agy 1.4.7**, strict native validation of a disposable installation returned **five skills, three agents, zero hooks/MCP servers/rules, and no findings**. This historical result predates both the spec-first orchestration revision and the Git-skill additions and verifies parser/loader acceptance, not the revised stage sequence, live enablement, model-driven dispatch, or end-to-end execution. See the [central historical five-skill checks](../../COMPATIBILITY.md#historical-five-skill-checks).

## Historical four-skill evidence

Before the canonical `leanflow-to-spec` addition, on **agy 1.4.7**, strict native plugin validation of a disposable installed bundle returned four skills, three agents, zero hooks/MCP servers/rules, and no findings. This remains historical four-skill validation. No model-driven native agent dispatch, live plugin enablement, MCP service, or end-to-end agy execution was exercised.

The older CLI **1.3.1** checks used different shared/global or project-local layouts and older agents. They did not test this plugin package. Historical `/plan` routing could expand the native built-in first; a feedback artifact could start implementation despite planning-only intent. Do not infer that a namespaced skill replaces built-in routing, and do not use an execution-triggering feedback path to persist a planning-only result.

Historical narrow agent tool lists did not suppress ambient MCP access. A safety-hook confirmation was auto-approved under `always-proceed`. Historical telemetry opt-outs did not prove native/account telemetry was disabled or provider retention controlled. These observations and all skips/failures are retained in [legacy configuration](../../docs/LEGACY_CONFIGURATION.md), not presented as current behavior.

## Unsupported guarantees

Plugin registration, correct role metadata, and declared tool policies are separate from instruction following, approval enforcement, inherited-tool suppression, shell containment, or no-telemetry operation. Installing this adapter neither changes account telemetry nor disables old global settings/hooks/MCP entries.

See [setup/migration](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
