# LeanFlow

Plan first. Execute simply. Orchestrate when needed.

LeanFlow is a portable set of instruction-based workflows for coding assistants. Its canonical core is four sibling skills under [`skills/`](skills/): **leanflow-brainstorm**, **leanflow-plan**, **leanflow-execute**, and **leanflow-orchestrate**. It does not require Antigravity (`agy`), named agent roles, a particular model, or a particular delegation tool.

LeanFlow is not a model gateway, agent runtime, sandbox, or permission system. The host supplies models, tools, discovery, delegation, and approval enforcement. Loading a skill does not install software, change model routing or permissions, or authorize commits.

## Simple workflow

```text
leanflow-brainstorm <idea>    Explore unresolved choices; no implementation
leanflow-plan <task>          Automatically choose planning depth and save a plan; no implementation
leanflow-execute <plan-path>  Implement and verify an explicitly supplied plan
leanflow-orchestrate <task>   Explicitly compose planning and execution with native delegation when available
```

These are skill names and conceptual requests, not universally available slash commands. Use your host's documented skill-loading mechanism, or load the actual files as described below.

- **Think first when useful:** brainstorm unresolved decisions; skip it when the task is clear. Brainstorming alone does not authorize implementation.
- **Plan directly:** `leanflow-plan` researches and writes the plan, automatically choosing the least depth adequate for the task: **flash** for clear, bounded, low-risk work; **super** for integration, dependencies, or moderate uncertainty; **hyper** for high-risk work or load-bearing unresolved alternatives. Hyper uses five adversarial lenses and one revision. Method choice does not select a model or require delegation. An explicit plain-language method request is honored with risks and unknowns visible.
- **Execute or resume directly:** provide the saved plan path and authorize implementation. The current assistant implements pending steps, runs appropriate checks, and updates the same plan with actual evidence.
- **Authorize the full flow:** “Brainstorm, plan, then implement this task” can authorize the relevant stages together. No redundant approval ceremony is added; unresolved material decisions and genuine safety boundaries still require you.
- **Delegate explicitly:** select `leanflow-orchestrate` when you want the composed flow to use the host's available native delegation. Discover real capabilities; do not invent planner/executor roles or assume a tool exists. If delegation is unavailable, disclose that limitation and continue directly within the original authorization.

For example, after loading the appropriate skills:

```text
Use leanflow-plan to plan adding CSV export to the report screen. Do not implement it yet.
Use leanflow-execute with the saved plan at <plan-path>.
```

There is one public planning entrypoint, not separate method skills. For an explicit override, say “Use leanflow-plan with the super method for this task; do not implement.” These are ordinary requests, not parsed CLI flags. Every plan records its **Method**, selection rationale, and limitations; planning alone never authorizes execution.

Or explicitly request the composed workflow:

```text
Use leanflow-orchestrate to plan and implement CSV export to the report screen.
```

Plans live in `.workflow/plans/`. Checkboxes and inline verification are execution state: `[ ]` pending, `[x]` verified complete, `[!]` blocked. A material invalidation returns `REPLAN_REQUIRED`; orchestration permits at most one automatic replan within the original authorization. Normal work needs no execution FSM, ledger, or mandatory reviewer, and creates no automatic commits, branches, worktrees, pushes, or PRs. See the [planning guide](docs/PLANNING_GUIDE.md).

### Private workflow artifacts by default

Both root `workflow/` and `.workflow/` directories are ignored by Git by default. Canonical plan paths remain `.workflow/plans/`; `workflow/` is also excluded to cover the user-facing spelling without silently migrating existing records. Before saving new workflow artifacts, the core instructions preserve existing `.gitignore` content and establish `/workflow/` and `/.workflow/` entries, including outside Git so that the default carries forward on initialization. If privacy cannot be established or required writes are forbidden, return the plan in chat with the limitation instead of saving it.

Ignoring a path does **not** untrack files already in the Git index. Existing tracked generated records need an explicit index-only removal that preserves working files; historical commits are unchanged. Neither ignores nor index removal scrub secrets from history. Ignored files are still readable by local tools and may still be included in assistant context; this is not encryption or a confidentiality boundary.

## Use the portable core

### Manual host installation

1. Consult your host's documentation for its supported skill format, skill root, discovery/reload procedure, and invocation syntax. No universal installation path or slash-command support is assumed.
2. Copy each complete `skills/leanflow-<name>/` directory into that documented skill root. Keep `leanflow-brainstorm`, `leanflow-plan`, `leanflow-execute`, and `leanflow-orchestrate` as siblings so their relative links resolve. Do not copy only the individual Markdown files.
3. Check for existing skills or native commands with the same names before replacing anything. Resolve conflicts according to the host's documentation; namespacing does not establish collision-free coexistence.
4. Load the desired skill through the host's documented mechanism. Verify discovery and behavior in that host before relying on it.

The portable core does not need `config/`, the bundled named agents, MCP services, Node.js, or either installation script. A host may impose its own prerequisites and limitations.

### Plain-file loading

When registration is unavailable, a file-capable assistant can read the actual `skills/leanflow-<name>/SKILL.md` and use its instructions within existing permissions. Supply its containing directory as the base directory for relative links. For example: “Read `skills/leanflow-plan/SKILL.md`, resolve relative references from `skills/leanflow-plan/`, and use it to plan this task without implementing.” Keep all four siblings accessible.

This is instruction loading, not runtime registration: it does not create slash commands, make skills discoverable, add tools, or prove compatibility with a host. A pasted skill name without the file contents is not evidence that the skill was loaded.

### Updating older installations

The `leanflow-` prefix applies to **every shipped user-invoked skill**, including optional adapter skills, not just the four core skills. The former `flashplan`, `superplan`, and `hyperplan` packages are retired; their methods now belong to `leanflow-plan`, with no compatibility aliases. If installer preflight flags old generic skill packages, explicitly archive or otherwise resolve the flagged packages after checking their ownership before retrying. Do not delete another project's or another user's skills, and do not assume a name match proves ownership. Updating this checkout does not automatically install or alter any live host configuration.

## Optional Antigravity full-configuration adapter

`install.sh`, `install.ps1`, and `config/` are an **optional Antigravity-specific configuration adapter**, not generic LeanFlow installers. Choose this only if you want its broader Antigravity rules, hooks, settings, named agents, MCP configuration, and optional skills. Its host-specific policies are not portable-core requirements.

The adapter merges the canonical four skills with the optional skills from `config/skills/` into its installed skills directory. Optional workflows include `leanflow-to-spec`, the execution alias `leanflow-hyperexecution`, debugging, UI, security, system administration, and explicit Git/PR helpers; all shipped invocation names use the `leanflow-` prefix. Planning depth remains owned by `leanflow-plan`. Individual optional dependencies and invocation support remain host-specific.

Requires Antigravity CLI and Node.js for privacy merging and bundled hooks. `npx` is needed for the configured optional MCP servers. GitHub MCP authentication uses your own `GITHUB_TOKEN`; no token is supplied. Inspect the scripts and configuration before explicitly running them from a local clone:

```bash
bash install.sh --dry-run
bash install.sh
```

```powershell
.\install.ps1 -DryRun
.\install.ps1
```

The adapter backs up existing configuration, preserves unrelated settings and agent directories, and updates shipped rules, hooks, skills, and agent definitions. Agents are installed at `~/.gemini/config/agents/<name>/agent.md`. A conflicting flat agent file or malformed privacy-target JSON stops installation without overwriting it. Fresh settings leave trusted workspaces empty, select Gemini 3.8 Flash (Medium), and use native `request-review` tool permissions; existing model routing and permissions are unchanged. The adapter adds both workflow ignore rules to its target workspace; this alone does not untrack existing files. Restart the CLI to load updated assets. The guide records discovery-path and native-command caveats.

### Adapter privacy defaults and required account action

The adapter applies these controls; copying the portable core alone does not change privacy settings:

| Mechanism | Adapter control |
| --- | --- |
| Feedback surveys | `showFeedbackSurvey: false` in CLI settings |
| Context7 OpenTelemetry instrumentation/exporters | `OTEL_SDK_DISABLED=true` in its MCP environment |
| CodeGraph anonymous usage reporting | `CODEGRAPH_TELEMETRY=0` and `DO_NOT_TRACK=1` in its MCP environment |
| Brainstorm companion remote branding/version image | Existing `SUPERPOWERS_DISABLE_TELEMETRY` opt-out enabled by its launcher and defaulted on for direct server launches |

`scripts/apply-privacy.cjs` merges only these settings, including recognized version-qualified or renamed MCP entries. Custom servers, API keys, GitHub token wiring, models, permissions, and workspace settings remain intact. Opt-outs are stored in MCP configuration rather than relying on shell profiles; unrelated applications' environments are not modified. Backups use `~/.gemini.bak.<timestamp>.<unique-suffix>/`.

**Native CLI telemetry requires an account action:** start `agy`, open `/config` (or `/settings`), and set **Enable Telemetry** to **Off**. Recheck after changing accounts or upgrading. The adapter prints this requirement; it does not claim native telemetry is automatically disabled.

The [official settings documentation](https://antigravity.google/docs/settings.md) lists `enableTelemetry`, but historical inspection of CLI **1.3.1** found `EnableTelemetry` excluded from JSON persistence (`json:"-"`) with backend getter/setter methods. No supported telemetry automation flag/subcommand was found. A sandbox model invocation still logged an attempted `recordTrajectoryAnalytics` request. Adding a template key would not establish a working opt-out; native/account state and its default cannot be guaranteed by these scripts. The all-optional-telemetry-disabled target remains unverified until the account control is turned off and checked.

These controls do not block authentication, provider/model requests, updates/downloads, explicit network tools, security checks, or local troubleshooting logs. Native account telemetry settings do not control provider-side content retention or API project privacy. No proxy, firewall, TLS bypass, or SDK removal is introduced. Future `@latest` MCP packages and independently installed plugins or remote MCP services need version-specific reinspection; this is not a device-wide no-telemetry guarantee.

### Adapter safety and historical evidence

Destructive Git and recursive-delete confirmation, credential masking, and workspace permission boundaries remain applicable. Historically, CLI `always-proceed` auto-approved a confirmation raised by the safety hook; inspect `/config` and `/hooks` rather than treating hooks as a hard barrier. Narrow planner/reviewer tool declarations did not prevent inherited MCP access and are not OS containment. These are Antigravity observations, not portable safety guarantees.

Prior adapter verification included `node --test tests/privacy-install.test.cjs` cases for real Bash fresh/existing installs, dry-run, preference/auth preservation, telemetry opt-in migration, repeat installation, BOM handling, and malformed JSON rejection. Historical CLI 1.3.1 checks observed startup/authentication and a model response; Context7 4.1.2 and CodeGraph 1.6.2 initialized with opt-outs, and the live companion served a screen without the remote image. Windows PowerShell 5.1 parsing was checked; full Windows privacy installation was not exercised in that check because of execution policy and absent Windows Node.js. No packet capture or exhaustive SDK-egress proof was performed.

These are **historical adapter results**, not tests of the current portable rewrite or proof of cross-host compatibility. The [guide](docs/PLANNING_GUIDE.md#verification-and-evidence-limits) separates the successful source-loaded method-selection smoke and namespace/install checks from earlier pre-namespace and historical adapter observations. Native discovery and behavior across every host remain unverified.

The optional `leanflow-workflow-health-check` audits first; repair requires an explicit request and retains legacy source trees for reconciliation. Bundled Impeccable utilities omit unused upstream reports and helper entry points; web work retains its manual detector fallback, and native projects bypass that HTML/CSS pass. These adapter helpers are not required for the four-skill flow.

## Relationship to KitShift

[KitShift's README](https://github.com/rizariaputrawira/kitshift) describes a personal coding-agent configuration kit for `omp`/`agy`, not a runtime. LeanFlow's portable core instead packages a small planning/execution workflow without requiring either harness. The optional Antigravity adapter remains a broader configuration bundle, not the universal entrypoint. This distinction is about scope, not demonstrated effectiveness or universal compatibility. Namespaced skill identities reduce generic-name overlap, but installed names and configuration targets may still collide; no claim of safe simultaneous installation is made without inspecting the actual host setup.

Immediate workflow provenance and the limits of recorded license lineage are documented in [`skills/SOURCES.md`](skills/SOURCES.md).
