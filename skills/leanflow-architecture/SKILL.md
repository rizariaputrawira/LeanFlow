---
name: leanflow-architecture
description: "[Matt Pocock] Design module interfaces or investigate architecture friction, testability, and change locality."
---

# LeanFlow Architecture

Design deep modules: substantial behavior behind a small interface at a clean seam, improving caller leverage and maintainer locality. This companion supplies design and source-survey procedures. It does not authorize implementation, prototypes, test execution, document writes, or approval, and is not a mandatory stage. A read-only or planning-only assignment stays so through every helper and reference.

## Shared vocabulary

A **module** has an interface and implementation, from a function to a tier-spanning slice. An **interface** is everything callers must know: types, invariants, ordering, error modes, configuration, and performance—not merely the type signature. The **implementation** is behavior inside the module. An **adapter** is a concrete implementation of an interface at a seam. A **seam** is where behavior can change without editing callers. **Depth** is capability per unit of interface learned: a deep module hides much behavior behind a small interface; a shallow one exposes nearly as much complexity as it contains. **Leverage** is the capability callers gain from depth. **Locality** concentrates change, bugs, and verification in one place.

Use the **deletion test**: if removing a proposed module makes complexity reappear across callers, it may earn its place; if complexity disappears, it may be pass-through. A seam needs real variation, not a speculative future adapter or a wish to mock. Two independently justified implementations demonstrate variation; one alone does not. Keep necessary dependencies explicit and return results where practical. Hide details when doing so creates coherent depth, not indirection for its own sake.

The interface is the behavior-level test surface; internal seams may support implementation tests without becoming public. Testability is an interface property, not a reason to expose all internals.

## Design or deepen a module

1. **Ground the design.** Read the requested behavior, affected callers, constraints, requirements, decisions, existing interfaces, and representative tests. Separate facts from assumptions. Preserve accepted decisions unless an authorized decision reopens them. When actual domain ambiguity affects the interface, use [domain modeling](../leanflow-domain-modeling/SKILL.md); do not redefine domain terms from architecture preferences.
2. **Locate the friction.** Describe the candidate's current interface, hidden behavior, seam, dependencies, caller coupling, test surface, and change locality. Point to concrete source examples. Apply the deletion test and identify actual variations before recommending indirection.
3. **Choose a proportionate design.** For a concrete deepening cluster, read [deepening](references/deepening.md) to classify dependencies and propose a test strategy. When exploring materially different interface shapes, read [alternative designs](references/design-it-twice.md). Recommend a small interface around coherent behavior and state what callers still must know.
4. **Compare consequences.** Evaluate depth/leverage, locality, seam placement, dependency and adapter strategy, testability, compatibility, migration, and operational cost. Identify affected callers and how they would move to the proposed interface. Recommend one alternative or a defensible hybrid; label unsupported assumptions and unresolved consequential choices.
5. **Return a design, not a cutover.** Give scope and source basis, current versus proposed interface/seam, hidden behavior, dependency strategy, expected leverage/locality, proposed test surface, migration risks, and remaining decisions. Illustrative in-chat signatures or caller sketches are not executed prototypes or validation. Do not implement, run tests, or create experiments automatically. If implementation is later authorized, [planning](../leanflow-plan/SKILL.md) and [execution](../leanflow-execute/SKILL.md) retain their existing responsibilities; this recommendation is not execution consent.

## Survey architecture friction

When asked to survey or improve architecture, inspect the named area. Without one, use accessible change history to locate frequently changed areas, widening the sample only when no hotspot emerges. Read relevant domain language and decisions, representative callers, and tests. Look for observed navigation through shallow modules, duplicated caller policy, leaked dependencies, missing behavior-level test seams, or scattered change. Do not infer architecture from filenames or mistake a comprehensive inventory for useful analysis.

Return prioritized candidates with paths, observed friction, a concrete deepening direction, expected leverage/locality and test consequences, dependency category, confidence, and any actual decision tension. Explain the strongest candidate. Keep an initial survey at candidate level unless detailed design was also requested; a requested design can continue directly through the procedure above without an artificial extra gate.

Report inline by default. When a visual report is requested and writing is permitted, read [HTML report guidance](references/html-report.md); it does not expand destination or privacy authority. Otherwise give the same evidence in chat. Existing LeanFlow specification/plan formats and artifact privacy remain with [specification](../leanflow-to-spec/SKILL.md) and [planning](../leanflow-plan/SKILL.md), not a new architecture-document convention.

Adapted from KitShift's `code-architecture`, merging Matt Pocock's codebase-design and architecture-survey guidance. Retained notices: [Matt Pocock](LICENSE.matt) and [KitShift](LICENSE.kitshift). Exact lineage is recorded in the distribution's `skills/SOURCES.md`.
