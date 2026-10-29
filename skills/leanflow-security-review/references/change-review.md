# Focused change-review procedure

## Establish the change, not a guessed branch

Record supplied diff locator and base/head identities, worktree/untracked inclusion, requested scope and unavailable portions. Read actual diff text and affected source rather than treating filenames as coverage. Inaccessible comparison means the diff review remains incomplete, even if safe surrounding-source inspection continues.

For an explicitly requested proposed-design review, record the supplied design/snapshot and bounded current-source context instead. Identify actor, assets, proposed interfaces, trust assumptions and allocated controls. Evaluate missing/contradictory proposed guarantees as planning risks; do not pretend a proposed control is implemented or invent a change diff. Report which conclusions need implementation or deployment evidence.

Read owning requirements, threat/security decisions and existing secure patterns. Report conflicts between intended behavior and implementation instead of treating code as permission to weaken an invariant. Separate newly introduced, worsened and pre-existing behavior; never attribute pre-existing issues to fictitious changed lines.

## Compare and trace

For each material change or proposed boundary:

1. Name the lower-trust actor, starting capability, input/resource selector, protected principal/asset and expected invariant.
2. Trace input through identity, normalization, authorization, parsing, state transitions and the security-relevant sink. Inspect decisive callers, wrappers, middleware and framework defaults at the applicable version. Label assumptions where only proposed behavior exists.
3. Compare sibling, batch, export/import, queued, retry and error routes to the same effect. A gate's existence is insufficient: establish the principal, tenant, object, operation and timing it actually binds.
4. Read the strongest preventing layer before drafting a candidate. Check default denial, dependency failure, revoked/stale authority, partial failure and recovery only where the interface accepts those paths.
5. Name the supported consequence. Same-principal actions are not automatically privilege gain; a crash is not code execution; missing best practice alone is not vulnerability.
6. Record unresolved deployment, provider, proxy, framework and runtime facts exactly. Invent neither external controls nor their absence, traffic or reproduction results.

## Select relevant attack surfaces

Use actual trust crossings, not a mandatory checklist fleet:

- Trace values through queries, commands, templates, paths/URLs, deserialization and output contexts, including stored data consumed later. Determine whether the final sink's parser/encoding and strongest framework controls prevent the proposed consequence.
- Check identity/session/key lifecycle and object/tenant authorization at the final operation, including reassignment, stale authority, batch and delegated routes.
- Follow sensitive data through disclosure, retention, storage, caches, exports, backups and deletion; inspect whose scope applies to each copy.
- Map irreversible business transitions, replay, concurrency, units/coercion and partial recovery when accepted by the interface.
- Where untrusted model context, retrieved content or tool outputs influence privileged actions, inspect the real authority boundary and downstream enforcement rather than assuming model obedience is a control.
- Where input can consume shared capacity, quota or spend, establish attainable workload, shared impact and actual limiting controls before claiming availability harm.
- Where dependencies, build/signing/update artifacts or plugins cross producer trust, inspect source/artifact identity, integrity and release authority. Mark missing specialist/version evidence rather than claiming coverage from a package label.

Review actual trust use even in Markdown, tests, shell and client code. A language/framework label or comment is not proof of safety. These ordinary inspection cues do not invoke unavailable audit/intake packages or expand the assigned boundary.

## Challenge and report

Apply [evidence and challenge](evidence-and-challenge.md) before dispositioning findings. Keep stable candidate identities, attacker capability, invariant, source/caller trace, prerequisites, strongest controls, bounded impact and missing facts. Reconstruct decisive sources and try to disprove consequences; do not accept an author's excerpt alone.

Report scope/source basis and actual inspection/challenge method, inspected/deferred paths, new/worsened decisions, separate pre-existing concerns, unresolved candidates and root-cause-specific remediation recommendations. Source proof is not an observed exploit. Design risk identification is not implemented-change verification. No automatic code changes, posting, CI action, commit, scanner or runtime check follows from review.
