---
name: leanflow-debugging
description: "[Matt+Superpowers] Diagnose difficult bugs, flaky failures, or performance regressions before a root-cause fix."
---

# Diagnose bugs at their causal origin

Treat the user's reported failure as ground truth. Do not rerun merely to confirm their observation. Diagnose with discriminating evidence and distinguish source hypotheses from runtime proof. This skill supplies a procedure, not execution or implementation authority: a planning-only or read-only assignment stays so. A requested investigation does not authorize a fix; a requested fix remains within its approved scope.

## Build the signal

1. Extract the exact symptom, affected consumer path, supplied inputs, environment facts and existing observed evidence. Read relevant constraints, domain terminology and decisions, then trace code and callers before choosing a probe.
2. Define a **red-capable signal**: the precise assertion, output or state distinguishing the reported failure from success at the original boundary. Reuse supplied observations. A new execution is justified only by a missing causal fact, a differentiating experiment or remediation evidence, and only with current authorization—not to confirm the report.
3. Prefer the cheapest authorized real boundary: existing failing test, request/CLI fixture, captured trace or UI interaction. Pin relevant sources, time and randomness when feasible. State unavailable execution or artifacts explicitly. Source-only investigation may return labeled hypotheses; it cannot claim a reproduced loop or successful runtime result.

## Minimize and discriminate

Compare a working case with the failing case without discarding known reports. Minimize inputs, callers/configuration and steps only as needed to isolate cause, varying **one causal element at a time**. Preserve the original scenario for remediation proof; do not replace it with an easier symptom.

State plausible falsifiable hypotheses with predictions, such as: “If this adapter bypasses the library denial, the library follows the contract but this CLI path does not.” Rank by available evidence, not a forced count. Every probe must distinguish predictions. Where available and authorized, use a debugger for state, stacks, breakpoints and stepping; otherwise use targeted source/call tracing or authorized temporary instrumentation. Redact secrets and capture only needed signal.

- For deep invalid-data or call-chain failures, read [root-cause tracing](references/root-cause-tracing.md).
- For asynchronous timing or flaky waits, read [condition-based waiting](references/condition-based-waiting.md).
- When a supported failure motivates a module/interface/seam redesign, read [leanflow-architecture](../leanflow-architecture/SKILL.md). Redesign is a separate authorized choice, not a prerequisite to diagnosis.

Measure reproduction rates only when authorized and needed; no fixed repeat count, stress fleet or retries are implied. Keep human-driven observations user-controlled and request-specific. Do not assume credentials, shell access or a scripted human-interaction runner.

## Performance branch

Define the user-relevant slow operation/workload and available baseline. Use actual authorized timing, profile or query-plan evidence to locate the bottleneck before optimizing. Compare representative equivalent inputs and change one causal element. Confirm the measured work completed with valid outputs/errors before trusting comparisons; use production-relevant settings and include end-to-end impact when a microbenchmark informs a user-facing choice.

Repeat and alternate measurements when needed to distinguish real differences from variation; report run count, observed spread and material environment limits. A one-run estimate is acceptable if clearly labeled and not used to choose between options. No fixed run count or statistical test is required. Source suspicion is not a measured bottleneck; report unmeasured costs honestly and never invent timings or speedups.

## Root correction and evidence

Once the causal explanation is supported, correct the source/invariant **only when implementation is authorized**. Otherwise return the proposed correction and evidence to the authorized owner. Inspect affected callers so the remedy is not a one-path workaround. Preserve unrelated user changes. For a permanent fix, add meaningful regression coverage at the seam exercising the real pattern when within the assignment; ordinary regression work does not automatically require test-first development. If test-first is requested, use the project's existing test-first procedure and retain an observed failing assertion before the authorized correction.

If deliberately forcing a test red by mutating code or a fixture, compare against a pristine basis and verify the intended mutation landed before treating the failure as evidence. Such mutation and execution require their own existing authorization.

For an authorized permanent fix, obtain original consumer-path proof and finding-specific regression evidence, not only a shallow helper test. Execution belongs to the assigned executor/integration owner; workers do not duplicate reserved gates or run checks automatically. Remove temporary diagnostics/artifacts you introduced, update applicable permanent documentation within scope, and report exact changes and observed checks. If the source correction is complete but the original path cannot be exercised, mark that proof unverified and name the precise missing evidence.

Finish with symptom/source basis, hypothesis dispositions, root cause or remaining uncertainty, correction boundary, actual original-path/regression evidence and limitations. Investigation alone needs no new tests or documentation.
