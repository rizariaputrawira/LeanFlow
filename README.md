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

Requires Antigravity CLI and Node.js (also used to safely merge privacy settings). `npx` is needed for the optional MCP servers. GitHub MCP authentication uses your own `GITHUB_TOKEN`; no token is supplied.

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

Both installers deploy agents under `~/.gemini/config/agents/<name>/agent.md`. They back up existing configuration, preserve unrelated settings and agent directories, and apply the privacy changes below to fresh and existing installations. Shipped rules, hooks, skills, and agent definitions are updated. A conflicting flat agent file or malformed privacy-target JSON stops installation without overwriting it. Fresh settings leave trusted workspaces empty, select Gemini 3.8 Flash (Medium), and use native `request-review` tool permissions; existing model routing and permissions are unchanged. Restart the CLI to load updated assets.

### Privacy defaults and required account action

Installation automatically applies these verified controls:

| Mechanism | Installed control |
| --- | --- |
| Feedback surveys | `showFeedbackSurvey: false` in CLI settings |
| Context7 OpenTelemetry instrumentation/exporters | `OTEL_SDK_DISABLED=true` in its MCP environment |
| CodeGraph anonymous usage reporting | `CODEGRAPH_TELEMETRY=0` and `DO_NOT_TRACK=1` in its MCP environment |
| Brainstorm companion remote branding/version image | Existing `SUPERPOWERS_DISABLE_TELEMETRY` opt-out enabled by its launcher and defaulted on for direct server launches |

The shared `scripts/apply-privacy.cjs` merges only these settings, including recognized version-qualified or renamed MCP entries. Custom servers, API keys, GitHub token wiring, models, permissions, and workspace settings remain intact. Opt-outs are stored in MCP configuration rather than relying on shell profiles; unrelated applications' environments are not modified. Backups are saved under `~/.gemini.bak.<timestamp>.<unique-suffix>/`.

**Native CLI telemetry requires an account action:** start `agy`, open `/config` (or `/settings`), and set **Enable Telemetry** to **Off**. Check it again after signing in with a different account or upgrading. Installers print this requirement; they do not claim native telemetry is automatically disabled.

The [official settings documentation](https://antigravity.google/docs/settings.md) lists `enableTelemetry`, but inspected CLI **1.3.1** explicitly excludes `EnableTelemetry` from JSON persistence (`json:"-"`) and exposes backend getter/setter methods. No supported telemetry automation flag/subcommand was found. Adding `enableTelemetry: false` to a template would not establish a working opt-out, so this repository does not do so. Native/account state and its default cannot be safely guaranteed by this installer. A sandbox model smoke invocation still logged an attempted `recordTrajectoryAnalytics` request; the all-optional-telemetry-disabled target therefore remains **unverified until the account control is turned off and checked**.

These changes do not block authentication, provider/model requests, updates/downloads, explicit network tools, security checks, or local troubleshooting logs. The native account control does not control provider-side content retention or API project privacy settings. No proxy, firewall, TLS bypass, SDK removal, or model/agent/plugin redesign is introduced. Future `@latest` MCP packages and independently installed plugins or remote MCP services require version-specific reinspection; this is not a device-wide no-telemetry guarantee.

Verification: `node --test tests/privacy-install.test.cjs` exercises real Bash fresh/existing installs, dry-run, preference/auth preservation, telemetry opt-in migration, repeat installation, BOM handling, and malformed JSON rejection. Runtime checks against CLI 1.3.1 confirmed startup/authentication and a normal model response; cached Context7 4.1.2 and CodeGraph 1.6.2 completed MCP initialization with their opt-outs, and the live companion served a screen without the remote image. Windows PowerShell 5.1 parsing was checked; full Windows installation was not exercised (host script execution policy and absent Windows Node.js). No packet capture or exhaustive SDK-egress proof was performed.


## Safety and maintenance

Destructive Git and recursive-delete confirmation, credential masking, and workspace permission boundaries remain applicable. Current CLI `always-proceed` can auto-approve a confirmation raised by the safety hook; existing users should check `/config` and `/hooks`, not assume the hook is a hard barrier. Planner/reviewer omit native edit, command, and delegation tools, but inherited MCP access is not OS containment. Custom agents use supported model tiers, not invented reasoning selectors.

`/workflow-health-check` audits first. Repair requires an explicit request; conservative migration retains source trees rather than deleting possibly conflicting historical data. See the [planning guide](docs/PLANNING_GUIDE.md) for compatibility and validation details.

Bundled Impeccable utilities omit unused upstream reports and helper entry points. Web work retains its manual detector fallback; native projects bypass that HTML/CSS pass. Live editing, font matching, composition selection, and existing hook administration remain available.
