# Portable workflow sources

The four core skills were moved and revised from this repository's existing `config/skills/{brainstorm,plan,execute,orchestrate}/SKILL.md` files at revision `fc21d61df750cb409a30b9d9df6645949f70cb32`.

Source repository: https://github.com/rizariaputrawira/LeanFlow

Changes in this cutover: remove core Antigravity command/tool/role requirements; keep direct execution as default except when the user requires delegation; discover optional host delegation; centralize plan format and local artifact privacy; accept exact inline plans without inventing saved artifacts; give the coordinator sole shared-plan write ownership during delegated work; preserve authorization, verification, and historical-record boundaries.

The canonical packages are `leanflow-brainstorm`, `leanflow-plan`, `leanflow-execute`, and `leanflow-orchestrate`. Existing optional packages under `config/skills` remain legacy source, separate from the four-skill core deployment. Native role identities are `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer`; roles bind host capabilities to the canonical procedures rather than maintain duplicate workflows.

Planning consolidation absorbs the former `flashplan`, `superplan`, and `hyperplan` entrypoints into `leanflow-plan`. The former flash/super aliases had no distinct implementation; the consolidated skill now defines evidence-based flash/super/hyper methods. Hyper retains the former five critique perspectives and bounded revision, without mandatory workers. Retired planning packages are removed, not retained as aliases.

This records the immediate source and changes, not an independently established upstream license lineage. No new license grant is asserted here. Existing optional adapter assets and their source notices remain separate; the portable core does not require the bundled visual companion or other adapter utilities.

## Native binding sources and limits

The shared-core/native-binding organization and omp/agy frontmatter conventions were informed by inspection of the local sibling KitShift checkout, specifically `harnesses/omp/agents/kitshift-reviewer.md` and `harnesses/agy/agents/kitshift-reviewer.md` (relative to that checkout). The LeanFlow binding prompts were authored here against LeanFlow's canonical procedures; no KitShift workflow implementation or reviewer methodology was copied.

Claude Code Markdown frontmatter follows the published [subagent configuration documentation](https://code.claude.com/docs/en/sub-agents). Codex standalone TOML fields and the supported `features.shell_tool` switch follow its published [subagent configuration documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents). The role definitions do not prescribe provider model tiers: omp omits a model override; agy and Claude Code request inheritance; Codex omits model and reasoning overrides.

These are source/schema references, not claims of installed discovery, successful native parsing, tool-enabled agent behavior, or OS containment. In particular, Codex planner/reviewer shell disabling does not remove every inherited native or MCP write capability. Intended read-only behavior and assignment ownership still depend on the consuming agent and actual host permissions. No model calls or live host installation are established by this provenance record.
