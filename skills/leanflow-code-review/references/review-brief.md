# Source-inspecting review brief

Load for a task-scoped or completed-change review, including an authorized reviewer dispatch. This consolidates requirements and quality inspection while retaining independent verdicts. It creates neither a runtime role nor execution authority. Dispatch and independence use the existing [orchestration delegated-review contract](../../leanflow-orchestrate/references/delegation.md#delegated-review), without initiating orchestration stages for a standalone review.

## Inputs the coordinator supplies

Use the actual available task interface and role schema. Give the reviewer:

1. **Objective and scope:** capability/change, exact base/head or supplied diff/snapshot, requested WIP/untracked inclusion, paths and exclusions.
2. **Requirements:** originating spec/issue/brief locators and binding constraints; identify unavailable owners.
3. **Standards:** applicable guidance locators and affected interface/invariant owners.
4. **Claims/evidence:** implementer's report and accessible actual evidence, labeled as claims until independently inspected.
5. **Permissions and result:** read-only source inspection, permitted tools/paths, no execution, writes, target/network fetching, credential access or delegation; exact assigned output contract and completion criteria.

Do not substitute a diff-only role for decisive source/caller inspection. A schema alone is not permission. For a direct review, apply the same input checks yourself.

When independence is requested or required, use a fresh permitted reviewer rather than asking the implementer to certify its own work. Supply original requirements and inspectable evidence, not instructions to reach a desired verdict. Resolve missing facts with source evidence, not pressure to approve. A material revision needs review of the affected boundary on its current basis; no one-shot runtime policy is implied. If required independent review is unavailable, disclose that limit rather than representing self-review as independent.

## Ordered inspection

1. Pin the comparison and inventory every requested changed path, including WIP. Check each required change rather than merely judging the overall diff tidy.
2. Read brief/spec and standards. Treat author reports and rationales as assertions; reconstruct behavior and requirements relationships from source.
3. Inspect changed functions and relevant controls/callers. State a concrete reason for wider inspection: lock order, shared state, producer/consumer contract or denial gate, for example. Avoid unrelated crawling without forbidding unchanged decisive code.
4. On the **Spec** axis inspect missing, extra and misunderstood behavior criterion by criterion. Missing facts remain unknown; missing spec never earns a pass.
5. On **Standards/correctness**, inspect failure paths, type/state/lifecycle correctness, enforcement, meaningful test oracles and integration. Large files, repetition or preferences are not defects without a consequence or project rule.
6. Read accessible check evidence at its real locator. Incomplete/illegible evidence is a gap; author summaries alone are not passed checks. Do not regenerate evidence by executing tests. Tell the coordinator the decisive missing fact/check.

## Result

Report each axis independently as source-covered pass/issues/unknown. Each finding includes exact inspected location, trigger, wrong consequence, applicable requirement/rule and grounded remedy. Calibrate severity to impact. Include evidenced strengths, exclusions/gaps and relevant actual check outcomes. Distinguish source-correct implementation from observed acceptance proof.

A plan-mandated defect remains a correctness finding, labeled as a plan conflict for its owner. Reviewers cannot change scope, weaken security constraints or approve deviations. Set-aside behavior remains an explicit exclusion with a reason, not silently discarded acceptance.
