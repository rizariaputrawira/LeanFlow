# Claude Code Compatibility

## Authored contract and documentation basis

The adapter uses the official [skills layout](https://code.claude.com/docs/en/skills): personal `~/.claude/skills` or a supplied project `.claude` root. Optional agents use official [subagent Markdown/YAML](https://code.claude.com/docs/en/sub-agents) in `agents/`, with native names/descriptions/tools and `model: inherit`. Canonical skill bytes are shared with other targets; native binding bytes/formats are host-specific.

Default install is five skills: `leanflow-{brainstorm,plan,execute,orchestrate,to-spec}`. Standalone planning and execution are specification-optional; selected orchestration requires a saved `.workflow/specification/` file first, then planning, then execution within permission. `--with-agents` adds the three `leanflow-{planner,executor,reviewer}` files. No `CLAUDE.md`, MCP, hook, credential, model/approval/telemetry, workspace setting, or ignore-rule change is installed.

## Evidence boundary

The Claude Code executable was unavailable during the earlier adapter checks. **Native parsing, discovery, agent dispatch, and behavior are unverified.** Current real isolated installer cases passed in the shared 27-test suite with the exact five-skill package, opt-in agents, and preservation boundaries. These file-installation checks and official documentation are not a claim that Claude Code itself was exercised. See the [central current checks](../../COMPATIBILITY.md#current-five-skill-checks).

No historical Antigravity or source-loaded omp result is transferred to Claude Code. Actual canonical instruction loading, spec-first orchestration, planning-only behavior, direct execution, and coordinated parallel work need their own observations.

## Limits

Role tools and `model: inherit` are not sandbox/containment guarantees or a grant of permissions. A custom target does not become discoverable merely because files exist. Existing same-name assets must be reconciled by ownership, and old globals are not automatically removed. See [setup](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
