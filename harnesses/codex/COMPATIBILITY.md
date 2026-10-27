# Codex Compatibility

## Authored contract and documentation basis

The adapter selects the official [project skill layout](https://learn.chatgpt.com/docs/build-skills), `.agents/skills/`, beneath a required explicit project target. Optional agents use official [standalone subagent TOML](https://learn.chatgpt.com/docs/agent-configuration/subagents) under `.codex/agents/`, with `name`, `description`, and `developer_instructions`. It does not write `config.toml` registry entries. Model and reasoning effort are omitted to inherit host choices.

Default install is exactly five canonical skill directories: `leanflow-{brainstorm,plan,execute,orchestrate,to-spec}`. Standalone planning and execution are specification-optional; selected orchestration requires a saved `.workflow/specification/` file first, then planning, then execution within permission. `--with-agents` adds the three `leanflow-{planner,executor,reviewer}.toml` files. No global `AGENTS.md`, MCP, hooks, credentials, model/approval/telemetry settings, workspace settings, or ignore-rule changes are installed. An explicit project target is not permission for unrelated project changes.

## Evidence boundary

The Codex executable was unavailable during the earlier adapter checks. **Native parsing, discovery, subagent dispatch, and behavior are unverified.** Current isolated installer cases passed in the shared 27-test suite with the exact five-skill package, opt-in agents, and preservation boundaries. Historical Python standard-library parsing also accepted the unchanged three standalone role files and their documented required fields. Neither file checks nor TOML parsing establish an actual Codex invocation or native schema handling. See the [central current checks](../../COMPATIBILITY.md#current-five-skill-checks).

A historical omp run using an OpenAI model/provider is not a Codex CLI test. Source-loaded skill behavior elsewhere does not establish discovery, dispatch, or spec-first orchestration here. Plain-file reading and native registration are separate modes.

## Limits

Inherited capabilities and role instructions do not enforce file ownership or OS containment. Do not infer that prose-only read-only intent removes ambient native/MCP tools. Correct metadata cannot prove actual instruction loading or completed delegated work. Existing assets require ownership-aware reconciliation; old globals are not automatically removed. See [setup](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
