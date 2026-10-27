# omp Compatibility

## Authored contract

- Five canonical skill directories under `<target>/skills/`: `leanflow-{brainstorm,plan,execute,orchestrate,to-spec}`; default target `~/.omp/agent`. Standalone planning and execution are specification-optional; selected orchestration requires a saved `.workflow/specification/` file first, then planning, then execution within permission.
- Opt-in native Markdown/YAML `leanflow-planner`, `leanflow-executor`, and `leanflow-reviewer` files under `<target>/agents/`.
- Planner/reviewer tools: `read`, `grep`, `glob`, `web_search`; executor adds `edit`, `write`, `bash`.
- No model field, so host selection is inherited. No global instructions, MCP, approvals, telemetry, workspace settings, or ignore-rule mutation.

These are authored package/binding properties, not proof that every installed omp version parses, discovers, dispatches, or restricts them.

## Current five-skill evidence

In **omp 18.13.1**, native reads from a disposable installed skill root returned all five canonical instruction bodies before the spec-first revision. Separate standalone specification/path smokes preserved source and historical artifacts. Fresh direct source-loaded orchestration checks then observed specification → plan → implementation, planning-only stopping after the plan, and required-specification persistence failure stopping before planning or implementation. Independent assertions checked consumer results, plan state, and filesystem effects. These are bounded loading/instruction-following observations, not revised delegated-role or containment evidence. See the [central current checks](../../COMPATIBILITY.md#current-five-skill-checks) for scope and limits.

## Historical four-skill evidence

These observations predate the canonical `leanflow-to-spec` addition. In **omp 18.13.1**, native `omp read` loaded all four then-installed skills from a disposable installed agent directory with matching canonical bodies. Fresh source-loaded inline-plan, delegated-worker ownership, and delegation-only refusal cases completed with independent fixture checks. A separate native project `leanflow-reviewer` invocation read the canonical review procedure and synthetic source, returned the expected negative-price finding, and completed through native `wait` without source changes. The initial runner without `wait` timed out and is retained as a failed probe in central evidence. Native planner/executor dispatch and full parallel integration remain unverified.

The historical source-loaded `omp v18.13.1` planning smoke read canonical instructions and selected flash/super/hyper appropriately in bounded cases; it did not test native skill discovery or these agent files. A separate historical direct orchestration fixture produced useful effects but timed out before a final response; it was partial execution, not completed acceptance. See [historical evidence](../../docs/LEGACY_CONFIGURATION.md#historical-verification-record).

## Unsupported guarantees

Role metadata does not guarantee inherited-tool/MCP suppression, shell containment, permission enforcement, collision-free coexistence, or correct model behavior. Native registration does not prove that the actual canonical skill body was read. An unavailable delegation interface must be disclosed, and delegation-only consent cannot silently become direct work.

See [setup](README.md), [workflow semantics](../../docs/PLANNING_GUIDE.md), and the [cross-host evidence model](../../COMPATIBILITY.md).
