---
name: leanflow-code-review
description: "[Matt+Superpowers] Review PR, branch, working-tree, or correction changes for correctness, standards, and specification fidelity."
---

# Code review

Default to read-only source review. A review request does not authorize fixes, checkout/index changes, command or test execution, publishing or approval. Judge actual consequences against inspected sources, not heuristic smells or implementer confidence. Review remains within the current assignment; a helper cannot widen planning-only or read-only authority.

## Establish the exact review basis

1. Determine the requested comparison from explicit input, supplied PR metadata and accessible branch context. Resolve meaningful base/head or merge-base semantics; do not silently substitute a familiar range. For WIP, include requested staged, unstaged and untracked content, not merely committed `HEAD`. State included/excluded paths and snapshot basis. Empty scope means no changes; unavailable comparison content is a gap, not an invented diff. Use supplied comparison evidence or permitted read-only inspection interfaces; this source-only contract does not itself permit running commands to generate a diff.
2. Find originating requirements, specification or current authorized brief and applicable repository standards. Reuse existing owners and supplied context; no issue-tracker setup is required. Missing specification remains **Spec unknown**, never Spec pass. Ask only for an unavailable material basis after using accessible evidence; Standards/correctness may proceed independently.
3. Read changed behavior with surrounding implementation, enforcement and real callers sufficient to judge it. Trace producer/consumer contracts, error paths, data ownership and relevant tests. Diff context is a starting point, not a ban on reading decisive unchanged code. Record material coverage limits rather than claiming whole-repository review.

## Two independent verdicts

- **Standards/correctness:** Compare actual behavior with documented project rules and language/runtime contracts. Inspect errors, state/lifecycle, resource ownership, relevant security/performance risks and consumer-visible test quality. A finding names a plausible triggering path, wrong result/consequence, exact source location and minimal actionable remedy. Project conventions win over taste; no standalone smell or speculative abstraction demand is a defect.
- **Spec:** Map each material requested criterion to implementation and evidence. Identify missing, partial, misunderstood or extra behavior. Cite the actual requirement and decisive implementation/caller evidence. Scope changes and spec contradictions are decisions for the current owner, not reviewer authority. A requirement needing inaccessible runtime proof is unknown, not fulfilled merely because code exists.

Keep verdicts separate so one pass cannot mask the other's failure. Use pass/issues/unknown within stated source coverage; observed behavior evidence has its own actual status. Label unrelated pre-existing defects separately. A plausible correctness defect outside explicit spec wording can be a correctness finding, not an invented Spec requirement.

When module-depth or architecture judgment is requested, read [leanflow-architecture](../leanflow-architecture/SKILL.md) for shared vocabulary; do not turn review into speculative redesign.

For task/merge review or a source-inspecting review worker, read [review brief](references/review-brief.md). When independent review is requested or justified by concrete risk, the coordinator uses the existing [orchestration delegated-review contract](../leanflow-orchestrate/references/delegation.md#delegated-review) and actual available host interfaces. This pointer supplies the review assignment contract; it does not start orchestration, require its stages, invent a reviewer role, or authorize workers to delegate. A diff-only reviewer is not independent source inspection for claims requiring surrounding controls. No mandatory fleet, model tier or reviewer gate is imposed.

## Correction review

When previous findings and a fix are supplied, read [fix review](references/fix-review.md). Account for every prior finding as **addressed**, **not-addressed**, or **needs-evidence**; inspect new defects and distinguish current source correction from exercised remediation proof.

## Report

State scope/basis and reviewed sources; give separate Standards/correctness and Spec verdicts, evidence-backed findings with consequence and severity under the current reporting contract, relevant strengths, coverage gaps/exclusions and actual observed check evidence. Use the assigned output contract when dispatched rather than forcing a new schema. Never claim checks passed from a recommendation, incomplete report or author's assertion. Recommend decisive checks to the authorized verifier instead of running them automatically. A source review cannot certify runtime acceptance or approve scope deviations.
