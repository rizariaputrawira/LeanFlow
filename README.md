# Antigravity CLI Configuration

Portable native agents, skills, safety hooks, settings templates, and optional MCP configuration for Google Antigravity CLI (`agy`).

## Three workflows

```text
/plan <task>           Planning only: planner -> saved plan
/execute <plan-path>   Execute an existing plan: executor -> verification
/orchestrate <task>    Plan, then execute: planner -> executor -> acceptance
```

- **Plan first:** use `/plan` to inspect a proposed approach without changing project code. Execute it later only when you request it.
- **Execute or resume:** use `/execute` with the saved plan path. The executor implements pending steps, verifies them, and updates the same plan.
- **Let it run:** use `/orchestrate` when you want planning followed by implementation. No extra plan-to-execute confirmation is added; genuine safety or scope decisions still require you.

Dedicated custom agents do the substantive work. Main handles routing, handoffs, and final acceptance. New plans live in `.workflow/plans/`; their checkboxes and inline verification are the execution state. Normal work creates no execution FSM or ledger, requires no review stage, and makes no automatic commits, branches, worktrees, pushes, or PRs.

Antigravity also has a built-in `/plan` command. This configuration routes planning-only intent through the supplied `plan` skill and `planner`; it does not replace the native command. See the [planning guide](docs/PLANNING_GUIDE.md) for the verified contract and limitations.

### Typical usage

```text
/plan Add CSV export to the report screen
/execute <saved-plan-path>
```

Or authorize both phases in one request:

```text
/orchestrate Add CSV export to the report screen
```

The plan uses `[ ]` for pending, `[x]` for verified complete, and `[!]` for blocked steps. Verification outcomes stay inline. A material change returns `REPLAN_REQUIRED`; `/orchestrate` allows one automatic replan within the original authorization, then stops if another material invalidation occurs.

## Optional workflows

- `/hyperplan`: explicit adversarial planning, using one planner and one reviewer. Never selected automatically.
- `/brainstorm` and `/to-spec`: design exploration and a reference spec when useful, not prerequisites.
- `/flashplan` and `/superplan`: thin planning-only aliases to `/plan`.
- `/hyperexecution <plan-path>`: thin alias to `/execute`.
- Debugging, Ponytail, UI, security, code-health, system administration, and explicit Git/PR skills remain independently available.

Existing `.workflow/` records and explicitly supplied `.planning/` or `.ar-wf/` plans are retained. Legacy status conflicts must be checked against source and evidence before replaying work.

## Install

Requires Antigravity CLI. Node.js and `npx` are needed for the bundled hooks and optional MCP servers. GitHub MCP authentication uses your own `GITHUB_TOKEN`; no token is supplied.

From a local clone:

```bash
bash install.sh --dry-run
bash install.sh
```

```powershell
.\install.ps1 -DryRun
.\install.ps1
```

Alternatively, inspect the remote script before running it:

```bash
curl -fsSL https://raw.githubusercontent.com/rizariaputrawira/antigravity-cli-config/main/install.sh | bash
```

```powershell
irm https://raw.githubusercontent.com/rizariaputrawira/antigravity-cli-config/main/install.ps1 | iex
```

Both installers deploy agents under `~/.gemini/config/agents/<name>/agent.md`. They back up existing configuration, preserve existing `config.json`, `mcp_config.json`, and CLI `settings.json`, and retain unrelated agent directories. Shipped rules, hooks, skills, and agent definitions are updated. A conflicting flat agent file stops installation without overwriting it. Fresh settings leave trusted workspaces empty, select Gemini 3.8 Flash (Medium), and use native `request-review` tool permissions; existing settings are not changed. Restart the CLI to load updated assets.

## Safety and maintenance

Destructive Git and recursive-delete confirmation, credential masking, and workspace permission boundaries remain applicable. Current CLI `always-proceed` can auto-approve a confirmation raised by the safety hook; existing users should check `/config` and `/hooks`, not assume the hook is a hard barrier. Planner/reviewer omit native edit, command, and delegation tools, but inherited MCP access is not OS containment. Custom agents use supported model tiers, not invented reasoning selectors.

`/workflow-health-check` audits first. Repair requires an explicit request; conservative migration retains source trees rather than deleting possibly conflicting historical data. See the [planning guide](docs/PLANNING_GUIDE.md) for compatibility and validation details.
