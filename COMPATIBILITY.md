# Compatibility and Evidence

LeanFlow separates **portable workflow source**, **host packaging**, **native discovery**, and **observed behavior**. The same canonical Markdown bytes are installed for every target; that does not make native agent formats interchangeable or establish that a host follows the instructions.

## Authored installation targets

| Target | Destination | Optional native agents | Current evidence boundary |
| --- | --- | --- | --- |
| [`omp`](harnesses/omp/README.md) | `~/.omp/agent`, or custom agent root | Three Markdown/YAML definitions in `agents/`; model omitted to inherit | Historical five-skill native selection and conditional-loading cases observed in omp 18.13.1; see the lean-guidance checks below. The seven-skill package and new Git-skill discovery/behavior are not native-validated. Native reviewer dispatch has separate historical four-skill evidence; planner/executor binding dispatch and full parallel execution remain unverified. |
| [`agy`](harnesses/agy/README.md) | `~/.gemini/config/plugins/leanflow`, or custom plugin root | Three plugin agent definitions; `model: inherit` | Earlier five-skill plugin passed strict native validation in agy 1.4.7 with three agents and no findings. Lean-guidance package-byte checks are historical; neither the seven-skill package nor new Git-skill discovery/behavior has native validation. |
| [`claude`](harnesses/claude/README.md) | `~/.claude`, or custom `.claude`-style root | Three native Markdown/YAML subagents; `model: inherit` | Official documented layout; executable unavailable during the historical adapter checks, so no native validation claimed. |
| [`codex`](harnesses/codex/README.md) | Explicit project root; `.agents/skills/` | Three standalone `.codex/agents/*.toml`; model/effort inherited | Official documented layout; executable unavailable during the historical adapter checks, so no native validation claimed. No `config.toml` registry changes. |
| [`generic`](harnesses/generic/README.md) | Required explicit skill root; seven directories directly inside | None; `--with-agents` rejected before writes | File installation only; no host discovery, agent dispatch, or runtime compatibility claim. |

Every default installation includes exactly `leanflow-brainstorm`, `leanflow-plan`, `leanflow-execute`, `leanflow-orchestrate`, `leanflow-to-spec`, `leanflow-commit-message`, and `leanflow-pr-work`, plus applicable installer/plugin metadata. These are seven distributed skills, not seven mandatory stages. Specification is optional for standalone planning and execution; selected orchestration requires a saved specification first, then planning, then execution within permission. Native agents require `--with-agents` and remain the same three roles. Of the former 25 optional `config/skills/` packages, `leanflow-to-spec` is promoted to canonical `skills/`; the other 24 and the exclusive migration/health helpers have been removed. Existing global installs remain user-owned and are not automatically deleted. Detailed per-host evidence: [omp](harnesses/omp/COMPATIBILITY.md), [agy](harnesses/agy/COMPATIBILITY.md), [Claude Code](harnesses/claude/COMPATIBILITY.md), [Codex](harnesses/codex/COMPATIBILITY.md).

`leanflow-commit-message` provides read-only advice grounded in the diff and history; it never commits. `leanflow-pr-work` prepares bounded changes and PR drafts by default, without unrequested branch creation, commits, pushes, or PR publication. Neither addition becomes an automatic orchestration stage or changes specification-first consent. **Native validation of the seven-skill package and native discovery/behavior of the two new Git skills remain unverified.** The five-skill and four-skill records below preserve their original counts and results; they are historical evidence for those revisions, not validation of the expanded package.

## What each kind of evidence proves

1. **Source/package checks:** files, metadata, relative links, canonical bytes, manifest behavior, and nonmutating dry-run. These cannot establish native loading or instruction following.
2. **Native registration:** the installed host/version discovers the actual skill/agent/plugin. This does not prove invocation routing, permitted tool behavior, or a completed delegated task.
3. **Behavior smoke:** the actual instructions are read and applied to a bounded fixture, with observed outcomes. Planning-only, inline-plan, direct execution, and parallel orchestration need their own relevant observations; a launch receipt is not completion.
4. **Permissions and containment:** native tool declarations or role prompts express intended scope. They are not evidence of inherited-MCP suppression, command isolation, OS containment, or host approval enforcement.

## Verification-readiness and delivery-handoff checks — 2026-10-27

The revised planning, execution, orchestration, and PR guidance adds pre-implementation verification readiness and separates implementation verification from shipping approval. Seven packages and the three optional bindings are unchanged. The earlier observations below predate these procedure changes and retain their original scope.

Three fresh **omp 18.13.1 / openai-codex gpt-6.1-sol** print-mode processes read copied candidate skill sources in a disposable fixture. Assistant message metadata identified `gpt-6.1-sol`; context, rule, extension, and skill discovery were disabled. Execution exposed reading/editing/writing/shell tools; PR drafting and planning exposed reading only. The controller inspected tool records and full outputs, then independently imported the resulting module to check all five supplied acceptance cases.

| Exercised source-loaded path | Observed result |
| --- | --- |
| Exact inline-plan execution | Read execution and simplicity guidance, ran `node baseline.mjs` successfully before editing, changed only the clamping module, passed ten boundary/in-range assertions and the post-change baseline, and reported local verification without CI, independent review, human acceptance, or Git actions. |
| PR draft with stale delivery evidence | Read PR and completion guidance; preserved the requested Summary/Verification/Limits format; distinguished supplied synthetic claims from observed facts; identified older-head CI/review, the uncommitted and untested fix, open feedback, pending target-environment check, and pending human decision. Did not claim readiness or attempt commands/writes/external actions. |
| Planning-only readiness | Read planning, template, execution readiness, simplicity, and writing guidance. Inspected the importing consumer and proposed baseline and boundary checks before any implementation, explicitly leaving commands unrun and runtime readiness unverified; used reading only. |

The execution actor also attempted `git status --short` in the non-Git fixture; it failed with no repository present. The actor disclosed the unavailable Git check and continued to successful baseline, implementation, and consumer verification. This was not a zero-tool-error run.

`node --test tests/install.test.mjs` passed **27 tests, zero failures, zero skips**. Local-link validation across 35 active Markdown files resolved **193 local links**, including **44 heading fragments**. No permanent behavior tests or new tooling framework were added.

These are candidate-only bounded observations, not a baseline comparison or measured improvement. They do not establish native discovery/role dispatch, Git-skill selection, live CI or review integration, publication/merge behavior, unavailable/failing-baseline recovery, parallel readiness ownership, other-host behavior, or OS isolation. No live installation, host-setting change, commit, push, or PR publication was performed.

## Seven-skill Git adoption package checks — 2026-10-27

The `leanflow-commit-message` and `leanflow-pr-work` additions adapt the pinned KitShift sources and notices recorded in [`skills/SOURCES.md`](skills/SOURCES.md#commit-message-and-pr-adoption--2026-10-27). The default inventory is seven skills; the existing workflow stages and three optional native roles are unchanged.

- `node --test tests/install.test.mjs`: **27 passed, zero failures, zero skips**, including exact seven-skill default layouts, update/conflict protection, retained files, and nonmutating previews.
- Actual disposable previews and installations exercised all five targets, with agents opted in for native adapters. Each contained exactly seven skill directories and **22 byte-matching canonical files**, including references and nine notice files; manifest hashes matched and the isolated home stayed untouched.
- All seven entrypoints passed name/description checks. Across canonical guidance, provenance, active documentation, and host guides/bindings, **181 local links**, including **33 heading fragments**, resolved. Three retained KitShift/Matt notice copies matched their local immediate sources byte-for-byte; the HumanLayer notice was retained from the inspected pinned primary license.
- The initial throwaway smoke incorrectly counted the generic adapter's root manifest as a skill; correcting directory selection exposed two stale quickstart anchors, which were repaired. The completed smoke passed and its temporary targets were removed. These were smoke/checker and documentation issues, not installer failures.

These are package/source and real installer checks on Linux/WSL2 with Node.js 24.20.0, not a model-driven behavioral assessment. Native discovery/loading or instruction following for the new Git skills, PR publication, and actual Git mutations were not exercised. No live host configuration or installation changed. Historical native observations below retain their original five-/four-skill scope.

## Historical five-skill lean-guidance adoption checks — 2026-10-27

Before the Git-skill additions, disposable installations and fresh **omp 18.13.1 / openai-codex/gpt-6.1-sol** print-mode processes exercised the five-skill lean-guidance revision. Native discovery used a temporary `skills.customDirectories` overlay pointing at the copied five-skill tree, with other skill roots disabled and `leanflow-*` filtering. Context/rule/extension discovery was disabled. A generic runner instruction required reading relevant available skills; the selection requests below did not name a skill. Read-only cases exposed reading/search tools; implementation cases also exposed editing/writing/shell tools. No delegation interface was exposed.

| Exercised path | Observed result |
| --- | --- |
| Plan-only request | Selected `leanflow-plan`, read the plan template, simplicity, and writing references, and returned a complete flash plan with no writes or commands. |
| Standalone specification request | Selected `leanflow-to-spec`, read its template and writing reference, preserved the settled entrypoint, nonmutation requirement, exclusion, and unresolved non-finite-input question; no planning or implementation. |
| Unresolved-design discussion | Selected `leanflow-brainstorm` and the writing reference, compared rejection versus propagation of non-finite numbers, and kept its recommendation provisional; no implementation or artifacts. |
| English and Indonesian specifications | Both selected to-spec and loaded the writing reference. Outputs preserved `POST /api/import`, `8 MB`, the supplied statistical/noncausal caveats, and the undecided retry policy. The Indonesian output used Indonesian prose without translating the API identifier or strengthening the evidence. |
| Exact inline-plan execution | Selected `leanflow-execute` and the simplicity reference. Independent Node checks verified `[2,5] -> 7`, `[] -> 0`, `[3,-5] -> -2`, and unchanged inputs; no artifact or ignore-rule writes. |
| Required specification save forbidden | Selected orchestration and to-spec, returned an unsaved draft and the precise persistence/privacy blocker, and did not load the plan template or execution stage, change source, or create files. |
| Generic implementation request | Implemented the bounded function directly and passed independent consumer checks without loading orchestration or to-spec or creating workflow artifacts. |
| Full specification-first workflow | Saved a specification, read that exact file, saved a plan, then implemented and verified the function. Tool records showed that order; the final plan contained completed steps and observed evidence. Both privacy ignores were present. |
| Assigned worker and source reviewer | The worker loaded execution plus its extracted worker reference, passed assigned checks, and preserved the coordinator-owned plan byte-for-byte. The reviewer loaded orchestration plus its review reference, cited the constant-zero defect, and used reading only. These assignments explicitly supplied source paths; they are not native role-dispatch tests. |
| Planning-only orchestration | Saved a private specification and plan, left `sum.mjs` byte-identical, did not load execution, and ran no commands or implementation checks. |
| Delegation-only execution without an interface | Reported the unavailable/forbidden delegation blocker; did not implement directly, run checks, or create artifacts despite having editing tools. |

The controller inspected native read results, tool records, outputs, and filesystem bytes independently of actor completion claims. Assistant message metadata identified `openai-codex/gpt-6.1-sol`. These are bounded candidate observations, not a measured baseline improvement, selection-accuracy rate, token/cost saving, default-configuration guarantee, or OS-isolation claim. The initial behavior snapshots preceded the later attribution-only footer/notice additions; workflow procedures and the shared bilingual reference were unchanged by those additions. Actual host binding dispatch, delegated specification drafting, supplied-plan conflicts, parallel schedules, and other hosts' model selection remain unverified by this assessment.

Final package checks installed all five targets into disposable directories, retaining exactly five skill packages and byte-matching all **16 canonical skill files**, including references and five notice files. Manifest hashes matched; the isolated home remained untouched. Retained notices matched the inspected KitShift notices byte-for-byte. The repository source record separately identifies the official Matt Pocock and Superpowers procedures/notices read for the confirmed to-spec and brainstorming lineage; inspected source revisions are not asserted as original LeanFlow import pins.

The final `node --test tests/install.test.mjs` run passed **27 tests, zero failures, zero skips**. Independent trace assertions covered **13 completed behavior cases**, confirmed successful source reads and the actual model identity, checked specification/read/plan/implementation order, and found no tool errors. These counts describe the exercised fixtures, not a statistical reliability estimate.

Final local-link validation resolved **136 file/heading references** across the canonical skills, active documentation, and host guides/bindings with no missing targets.

## Historical five-skill checks

Checks used disposable targets and fixtures on Linux/WSL2 with Node.js 24.20.0; no live host configuration or installed skills were changed. These historical five-skill package/native-loader results predate both the spec-first orchestration revision and the Git-skill additions and do not establish either revision's new behavior.

- `node --test tests/install.test.mjs`: **27 passed, zero failures, zero skips**, with the exact five-skill default and existing update/conflict/preservation checks.
- Actual installations for all five targets contained exactly the requested five package directories and byte-matching canonical skill files. CLI help reported five skills. **98 local link destinations** existed; heading anchors were not rechecked.
- **omp 18.13.1** native skill reads from the disposable installation returned the complete canonical instruction bodies for all five names, including `leanflow-to-spec`.
- **agy 1.4.7** strict native plugin validation returned **five skills, three agents, zero hooks/MCP servers/rules, and no findings**. This is parser/loader validation, not model-driven dispatch.
- Before the specification-folder rename, a source-loaded to-spec run read the actual canonical skill and supplied synthetic design. It preserved the settled CSV decision, filtered-task requirement, nonmutation constraint, unresolved archive question, and PDF exclusion. Independent checks found one private `.workflow/specs/` artifact, both ignore rules, unchanged source, and no planning or implementation artifacts. That outcome is preserved at its original path, not relabeled as a `.workflow/specification/` result.
- A later source-loaded path smoke read the latest `leanflow-to-spec` body and created `.workflow/specification/` with one source-grounded specification. Parent-observed checks found the historical `.workflow/specs/` file preserved byte-for-byte, the supplied design and user ignore rules preserved, both privacy ignores added, and no planning or implementation. This checks the renamed destination and bounded standalone specification behavior, not spec-first orchestration.

These checks do not establish spec-first orchestration, Claude Code or Codex native behavior, all role-dispatch paths, or containment. Parser/loader acceptance and previous skill reads do not prove the revised orchestration sequence.

## Historical five-skill specification-first orchestration checks

Before the Git-skill additions, fresh source-loaded runs used the revised five-skill canonical procedures in **omp 18.13.1 / openai-codex/gpt-6.1-sol**, with direct work permitted and delegation unavailable:

- Full orchestration: filesystem observations recorded specification creation, then plan creation, then implementation. Independent assertions verified `[2,5] -> 7`, `[] -> 0`, and `[3,-5] -> -2`; the exact saved plan identified its specification and recorded completed work.
- Planning-only orchestration: observations recorded specification then plan, with pending steps and byte-unchanged implementation source.
- Artifact writes forbidden: the actor reported the required-specification persistence blocker, returned only a permitted specification draft, and stopped before planning or implementation. Independent checks found unchanged source and no generated files.
- All artifact-writing cases used `.workflow/specification/` and `.workflow/plans/`, established both privacy ignore rules, and created no separate execution state.
- The installer suite passed again: **27 passed, zero failures, zero skips**. **105 local file/heading links** resolved across canonical skills and current documentation.

These bounded checks do not establish revised delegated-specification behavior, the supplied-plan conflict path, native behavior in every harness, or containment.

## Historical four-skill adapter checks

The following checks predate the addition of canonical `leanflow-to-spec`. Their counts, failures, and limits describe the earlier four-skill version, not validation of either the later five-skill revision or the current seven-skill package. Checks used disposable directories on Linux/WSL2 with Node.js 24.20.0. No live host installation, credentials, persistent settings, or external services were changed.

- `node --test tests/install.test.mjs`: **27 passed, zero failures, zero skips**. Actual CLI cases cover the five layouts, four-skill default, opt-in agents, retained managed entries, dry-run nonmutation, consent for managed updates, local/unmanaged conflicts, unsafe manifests, source/destination symlinks, and preservation of unrelated settings/workspace files.
- Real CLI installations exercised all five layouts. Bash wrapper execution, Bash syntax, CLI help, **80 local file/heading links**, and identical canonical skill bytes across the installed layouts passed. PowerShell execution was not performed because its runtime was unavailable.
- `agy plugin validate <disposable-target> --strict --json` on **agy 1.4.7** returned four skills, three agents, zero hooks/MCP servers/rules, and no findings. This is native parsing/loader validation, not a model or server handshake.
- **omp 18.13.1** loaded all four installed skills through native `omp read`; their bodies matched the installed canonical files. The initial direct shell probe failed at URI argument resolution; a child-process probe passed the URI unchanged to the native CLI. No failed probe is counted as a successful read.
- Python's standard-library TOML parser accepted all three Codex role files and their documented required fields, with no model/reasoning override. The Codex and Claude Code executables were absent; syntax/layout and installer checks do not establish their native registration or behavior.
- Three fresh source-loaded **omp 18.13.1 / openai-codex/gpt-6.1-sol** cases completed: direct execution from an exact inline plan while artifact writes were forbidden; a delegated worker returning assigned numeric-sum checks without editing its coordinator-owned plan; and delegation-only refusal with file tools available but no delegation interface. Independent Node checks verified consumer outputs, the shared plan's SHA-256 stayed unchanged, and directory/source checks found no forbidden artifacts or direct implementation in the refusal case.

- An initial native omp reviewer-dispatch probe resolved `leanflow-reviewer` from the project definitions, and worker progress showed two source reads plus the expected negative-price finding. Its parent runner omitted the native wait tool, wrote an unnecessary temporary scope note, and exceeded its 180-second deadline without terminal acceptance. The note was removed. This probe is not counted as completed native workflow acceptance.
- A fresh native omp probe exposed the supported `wait` tool and asynchronous print completion. It resolved the project `leanflow-reviewer`, read the actual canonical review procedure and synthetic source, returned the expected `discount.cjs:2` negative-price finding, and reached terminal completion through native `wait`. The source stayed unchanged and no workspace artifacts were created. This verifies one native reviewer binding/return path, not every role, tool restriction, or parallel execution schedule; the preceding failed runner remains part of the record.

The worker smoke establishes bounded ownership behavior, not every parallel schedule or enforcement against an uncooperative agent. Source-loaded cases are not native registration tests. A copied file, parser pass, historical smoke, or absence of a known failure must not be promoted to an all-host support claim.

### Historical legacy-source retirement checks

After removing the legacy package tree and its exclusive helpers, before promoting `leanflow-to-spec`:

- The installer suite passed again: **27 passed, zero failures, zero skips**.
- Fresh disposable installations for all five targets contained exactly four complete, byte-matching canonical skill packages without the removed source tree or helpers. **90 local link destinations** existed; this check did not revalidate heading anchors.
- Fresh source-loaded planning and execution runs read the actual canonical skill files. Planning created one pending `.workflow/plans/` artifact and both root privacy ignore rules without implementation. Explicitly authorized execution then satisfied independent omitted/blank/named greeting assertions and marked the same plan complete. Directory checks found no legacy artifact folders or separate execution state.

These are bounded source-loaded workflow checks of the pre-addition four-skill version, not five-skill validation or additional native registration or containment evidence.

## Behavior and privacy boundaries

Canonical skills own procedures; native bindings only map available roles/tools. Selected orchestration saves a source-grounded `.workflow/specification/` file first, then plans, then executes within permission; planning-only consent stops after specification and planning. If required specification persistence or privacy setup is unavailable, return a permitted draft and blocker and stop dependent planning/implementation. A specification alone never authorizes later stages. Standalone planning remains specification-optional. An exact supplied plan is validated against the specification and current evidence during orchestration, not silently replaced. A delegate must read the actual relevant skill, not recursively run top-level orchestration. During parallel execution the coordinator alone writes the shared plan, integrating worker step IDs, outcomes, verification, and blockers. Sequential direct execution may update the supplied plan. In-chat plans are valid when their exact content is supplied and checked; chat evidence can replace unavailable plan persistence, but not orchestration's required specification file.

Installation does not mutate host-global instructions, MCP settings, credentials, model/approval/telemetry choices, workspace settings, or ignore rules. Codex's explicit project installation writes only its requested skill/agent files and manifest. Local artifact ignores are established by the workflow when authorized, not by adapter setup. No adapter claims telemetry suppression or a confidentiality boundary.

The `.leanflow-manifest.json` preserves old managed entries omitted from later selections; omitting agents is not uninstall. Managed updates require `--update`, and conflicts/local changes require reconciliation. File replacement is atomic per file, not a whole-bundle rollback guarantee. Old global assets are not automatically removed or owned merely because their names match.

## Historical evidence is not current validation

Prior source-loaded omp method-selection smoke, namespace/full-bundle installer checks, pre-namespace partial execution, and Antigravity CLI 1.3.1 observations are preserved with failures, skips, and limitations in [the historical record](docs/LEGACY_CONFIGURATION.md#historical-verification-record). They predate these adapters and must not be cited as current plugin/agent registration or dispatch proof.

Other hosts can use [plain-file loading](README.md#use-without-installing) or their documented skill-discovery format. This is source portability, not an unbounded list of natively supported runtimes. For problems, open a [GitHub issue](https://github.com/rizariaputrawira/leanflow/issues) with the host/version, selected target/options, and redacted observed output.
