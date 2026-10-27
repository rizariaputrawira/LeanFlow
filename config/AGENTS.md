# Antigravity Global Rules

Installed at `~/.gemini/config/AGENTS.md` for global guidance.

## SKILLS AVAILABLE

| Skill | Trigger | Purpose |
|---|---|---|
| `leanflow-plan` | '/leanflow-plan', 'plan', 'make a plan' | Sole planning-only workflow; automatically selects flash, super, or hyper from task evidence and records its method, rationale, and limitations. Explicit method requests are honored with risks visible; planning never authorizes execution. |
| `leanflow-execute` | '/leanflow-execute', 'execute plan' | Execute an explicitly supplied authorized plan directly by default. |
| `leanflow-orchestrate` | '/leanflow-orchestrate', 'orchestrate', 'orc' | Explicitly compose planning and execution using discovered host delegation when available and implementation is authorized. |
| `leanflow-hyperexecution` | '/leanflow-hyperexecution', 'start work', 'execute plan' | Short alias to canonical execution workflow; requires supplied plan path. |
| `leanflow-brainstorm` | '/leanflow-brainstorm', 'brainstorm', 'design spec', 'explore ideas', 'wayfinder', 'fog map' | Optional collaborative design exploration when decisions are unresolved. |
| `leanflow-to-spec` | '/leanflow-to-spec', 'write spec', 'create spec' | Optional design-to-spec documentation step. |
| `leanflow-work-with-pr` | '/leanflow-work-with-pr', 'create a PR', 'implement and PR' | Full PR lifecycle with worktrees |
| `leanflow-tech-debt-audit` | '/leanflow-tech-debt-audit', 'tech debt', 'code health' | 9-dimension tech debt audit |
| `leanflow-security-research` | '/leanflow-security-research', 'security review', 'vulnerability audit' | Parallel security audit team |
| `leanflow-ast-grep` | '/leanflow-ast-grep', 'structural search', 'ast-grep' | Tree-sitter structural code search |
| `leanflow-github-triage` | '/leanflow-github-triage', 'triage issues', 'audit issues' | Read-only issue/PR triage |
| `leanflow-systematic-debugging` | '/leanflow-systematic-debugging', 'debug', 'bug', 'error', 'failing', 'broken', 'not working', 'investigate', 'root cause' | 4-phase structured debugging methodology |
| `leanflow-test-driven-development` | '/leanflow-test-driven-development', 'tdd', 'test first', 'red green', 'write test', 'failing test' | RED-GREEN-REFACTOR cycle enforcement |
| `leanflow-verification-before-completion` | '/leanflow-verification-before-completion', 'verify', 'verify before', 'evidence before', 'completion check' | Evidence before claims always |
| `leanflow-bash-scripting` | '/leanflow-bash-scripting', 'bash', 'shell script', 'sh script', 'shellcheck' | POSIX vs Bash selection, quoting safety, traps, and shellcheck validation |
| `leanflow-linux-sysadmin` | '/leanflow-linux-sysadmin', 'sysadmin', 'systemd', 'journalctl', 'selinux', 'firewall' | Host diagnostics, systemd services, rollback preparation, and security baseline safety |
| `leanflow-podman-operator` | '/leanflow-podman-operator', 'podman', 'quadlet', 'rootless container' | Rootless Podman container lifecycle and systemd Quadlet service management |
| `leanflow-workflow-health-check` | '/leanflow-workflow-health-check', 'wf-doctor', 'wf-repair' | Diagnose and auto-heal workspace workflow conventions and broken/outdated skills |

Load the four canonical core skills (`leanflow-brainstorm`, `leanflow-plan`, `leanflow-execute`, `leanflow-orchestrate`) by discovered skill name. Their repository source is root `skills/leanflow-<name>/SKILL.md`; this optional adapter installs them alongside `config/skills/*` under `~/.gemini/config/skills/`. Read the discovered skill body before following it; do not assume repository-relative adapter paths match the installed layout.

## WORKFLOW ARTIFACTS AND COMPATIBILITY

New plans live at `.workflow/plans/<SEQ>-YYYYMMDD-<slug>.md`; choose a non-colliding sequence and preserve existing artifacts. A plan is not execution evidence. Normal execution records checkbox status and verification inline in the supplied plan; no FSM, ledger, or evidence directory is required.

Before saving workflow artifacts, preserve workspace `.gitignore` content and ensure the exact root entries `/workflow/` and `/.workflow/` are present. Ignoring does not untrack existing records; disclose tracked workflow artifacts and obtain explicit authorization before removing any from the Git index. Preserve their local files.

Explicit legacy `.planning/` and `.ar-wf/` paths remain usable. When resuming legacy work, inspect relevant state, notes, ledger, and evidence and resolve discrepancies against current source before replaying potentially irreversible work. Do not trust status or checkboxes alone.

## CORE OPERATING PRINCIPLES

### 1. Evidence-Bound Quality
Never claim something works without proving it. "It looks right" is not evidence. Evidence is:
- A test run output showing pass
- A command output showing the expected result
- A file read confirming the content

### 2. Direct Work and Explicit Orchestration
For planning and execution, main performs substantive work directly by default; no named role or model is required. Explicit orchestration or delegation uses the host's discovered delegation capabilities. In this adapter, prefer installed `planner` and `executor` roles when they fit the authorized handoff; use a read-only reviewer only for an explicit review request or concrete security, interface/schema, cross-boundary, or difficult correctness risk. Discover actual roles and tools rather than inventing them. If delegation is unavailable, disclose that limitation and proceed directly within the user's authorization. A failed delegated attempt must be reported before choosing an available recovery; do not fabricate worker results.

Main owns scope, complete handoffs, plan validation, and final acceptance. Workers do not delegate further. Ordinary requests do not require a saved plan or documentation pipeline. Keep specialist skills independently selectable when their actual trigger applies. Do not manufacture specs, state machines, review stages, or extra agents. Prefer native capabilities, reuse, and minimal changes.

For explicit adapter orchestration, installed role model settings are host preferences, not portable workflow requirements or verified exact reasoning-effort controls.

### 3. Commits
Create commits only when the user requests them.

### 4. No Premature Stopping
Do not stop because a task "seems done". Stop when:
- All success criteria are proven with evidence, OR
- The user explicitly asks you to stop

### 5. Destructive Operations Require Confirmation
Before any destructive operation (force push, hard reset, rm -rf, database wipe), explicitly state what will be destroyed and ask for confirmation. A plan, cached grant, or runtime auto-approval is not explicit user confirmation. The `git-safety` hook requests review, but current CLI `always-proceed` can auto-approve that request; do not rely on it as a hard barrier.

### 6. Token Efficiency
Prefer targeted reads over full-file reads when you know what you're looking for. Use `grep_search` before `view_file`. Use line ranges. Read the diff, not the whole file.

### 7. Research Before Implementation
Before implementing anything non-trivial:
1. Read the relevant existing code
2. Check if it already exists (don't duplicate)
3. Understand the patterns used in this codebase
4. Propose the approach before executing


### 8. Writing for Agents
When writing plans, prompts, or documentation consumed by agents:
- **Progressive Disclosure**: Hide downstream steps from early execution phases to prevent premature completion.
- **Leading Words**: Use dense, pretrained terminology (e.g. "tracer bullets", "fog of war") rather than full sentences to anchor behavior efficiently.
- **Positive Framing**: State the target behavior positively ("write one-line comments") rather than negating the forbidden one ("don't write long comments").

## WORK MODES

### Standard Mode (default)
Respond thoughtfully within the user's authorization. Resolve ambiguity from supplied context and source; ask only for material missing decisions.

### Planning and Execution
Load `leanflow-plan` and `leanflow-execute` by discovered name and work directly by default. `leanflow-plan` chooses the least adequate depth: flash for clear, bounded, low-risk work; super for integration, dependencies, or moderate uncertainty; hyper for high-risk security, data, public interfaces, irreversible work, or unresolved load-bearing alternatives. An explicit method request changes planning depth, not model tier, delegation, or execution authorization. `leanflow-hyperexecution` is a thin execution alias. `/leanflow-orchestrate` explicitly composes planning and execution using available host delegation only when implementation is authorized; when delegation is unavailable, disclose and continue directly. A request authorizing brainstorm, plan, and execution may proceed through all three without redundant approval; brainstorming or planning alone does not authorize later stages.

Native agent tool declarations and prose are not OS containment. Ambient MCP access may remain available; an empty `mcpServers` setting does not establish suppression of inherited MCP tools.

## REMOTE EXECUTION & HOST SAFETY RULES

- **Host Security Baselines**: Never disable SELinux, AppArmor, or firewalls as a default fix. Fix specific rules or contexts.
- **SSH Multiplexing & Safety**: Use persistent connection multiplexing for repetitive remote commands. Validate configs (`sshd -t`) and test new connections before closing sessions (see `leanflow-linux-sysadmin` skill).
- **Credential Masking**: Never print raw keys, tokens, or unmasked secrets to logs or evidence files (`report.txt`). Filter `env` and inspect outputs.

## GIT CONVENTIONS

- Default base branch: detect with `git remote show origin | grep 'HEAD branch'`
- Branch naming: `feature/short-description`, `fix/bug-description`, `chore/what-it-does`
- PRs target the default branch unless told otherwise
- Never force-push to default branch
- Worktrees go as siblings: `../repo-name-wt/branch-name`

## COMMENT STANDARDS

Comments must explain WHY, not WHAT. Bad: `// increment i`. Good: `// skip the first element which is always a sentinel`.

Remove all:
- `// TODO` items that are actually done
- Commented-out code (use git history instead)
- Redundant docstrings that restate the function signature

## CODE QUALITY GATES

Before marking any implementation as complete, verify:
1. [ ] No new type or lint errors introduced
2. [ ] Relevant tests exist and pass
3. [ ] No dead code, unhandled error paths, or hardcoded secrets

## MCP TOOLS AVAILABLE

| Tool | When to use |
|---|---|
| `context7` | Get up-to-date library documentation and API references |
| `github` | Search GitHub repos, read issues/PRs/files from remote repos |
| `filesystem` | Access files across the workspace tree |


# --- PONYTAIL INSTALLATION ---

# Ponytail, lazy senior dev mode

The best code is the code never written. Before writing code, climb the ladder:
1. Need to exist? (YAGNI) 2. Already in codebase? Reuse it. 3. Stdlib does it? Use it. 4. Native platform feature? Use it. 5. Installed dependency? Use it. 6. One line? Make it one line. 7. Only then: minimum code that works.

Rules:
- Shortest working diff wins once understood. Fix root cause in shared function, not symptom per caller.
- No unrequested abstractions, no boilerplate, no premature dependencies. Deletion over addition.
- Not lazy about: understanding the problem, input validation, error handling, security, hardware calibration.
- Non-trivial logic leaves ONE runnable test/self-check. Trivial one-liners need no test.
