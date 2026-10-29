# Codex Compatibility

## Authored contract and documentation basis

The adapter selects the official [project skill layout](https://learn.chatgpt.com/docs/build-skills), `.agents/skills/`, beneath a required explicit project target. Optional agents use official [standalone subagent TOML](https://learn.chatgpt.com/docs/agent-configuration/subagents) under `.codex/agents/`, with `name`, `description`, and `developer_instructions`. It does not write `config.toml` registry entries. Model and reasoning effort are omitted to inherit host choices.

Default install contains seven main skills and ten model-invokable companions listed in the [skill catalog](../../README.md#skills-and-workflows). Standalone planning and execution are specification-optional; selected orchestration requires a saved `.workflow/specification/` file first, then planning, then execution within permission. `--with-agents` adds the unchanged three `leanflow-{planner,executor,reviewer}.toml` files. Neither the Git workflows nor companions are automatic orchestration stages. No global `AGENTS.md`, MCP, hooks, credentials, model/approval/telemetry settings, workspace settings, or ignore-rule changes are installed. An explicit project target is not permission for unrelated project changes.

## Evidence boundary

The Codex executable was unavailable during the earlier adapter checks. **Native parsing, discovery, subagent dispatch, and behavior of the current 17-skill package are unverified.** Historical isolated installer cases passed in the shared 27-test suite with the exact five-skill package, opt-in agents, and preservation boundaries. These checks predate the Git-skill and companion additions. Historical Python standard-library parsing also accepted the unchanged three standalone role files and their documented required fields. Neither file checks nor TOML parsing establish an actual Codex invocation or native schema handling. See the [central historical five-skill checks](../../COMPATIBILITY.md#historical-five-skill-checks).

A historical omp run using an OpenAI model/provider is not a Codex CLI test. Source-loaded skill behavior elsewhere does not establish discovery, dispatch, or spec-first orchestration here. Plain-file reading and native registration are separate modes.

## Limits

Inherited capabilities and role instructions do not enforce file ownership or OS containment. Do not infer that prose-only read-only intent removes ambient native/MCP tools. Correct metadata cannot prove actual instruction loading or completed delegated work. Existing assets require ownership-aware reconciliation; old globals are not automatically removed. See [setup](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
