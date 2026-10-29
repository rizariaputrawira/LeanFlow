---
name: leanflow-domain-modeling
description: "[Matt Pocock] Resolve ambiguous domain terms, relationships, ownership, or consequential domain decisions."
---

# LeanFlow Domain Modeling

Actively sharpen the domain language and relationships while designing. Merely reading a glossary for vocabulary does not require modeling. This companion does not authorize code changes, architecture work, new documents, or a mandatory documentation system. The current request and LeanFlow's specification, planning, and privacy owners remain authoritative.

## Inspect and challenge

1. **Find the existing owners.** Follow supplied context and repository conventions to the relevant glossary/domain map, requirements, decisions, code, and callers. Reuse their actual owners and locations; do not introduce a documentation manifest, tracker, parallel glossary, or migration convention. When a requirement comes from a LeanFlow specification or plan, inspect that exact artifact rather than replacing its meaning with an implementation guess.
2. **Name the conflict.** Identify overloaded terms and competing meanings. State the precise ambiguity: for example, whether “account” means an identity, a tenant, or a billing relationship. Compare user intent, canonical language, and implementation. A matching label or primitive type does not prove two concepts are the same.
3. **Stress-test relationships.** Use concrete counterexamples that distinguish definitions, cardinality, ownership, lifecycle, and invariants. Can a user belong to two tenants? Can an order be partly cancelled after shipment? Who owns a retained record after deletion? Treat these as questions that reveal the model, not new business requirements.
4. **Check decisive behavior.** Trace material answers to actual sources. If code contradicts approved intent, report the discrepancy; buggy code does not redefine the approved model. For conflicting authoritative sources, identify the current decision owner and the unresolved choice rather than silently selecting the last-read file.
5. **Propose precise language.** Offer canonical wording, relationships, important distinctions, and a recommendation with its decision basis. Ask only for consequential choices evidence cannot settle. Each settled concept must distinguish the counterexamples discussed; unresolved concepts remain explicitly unresolved.
6. **Use the appropriate next owner only when needed.** When settled domain language informs a requested module/interface design, read [architecture](../leanflow-architecture/SKILL.md); it owns architecture vocabulary, not domain definitions. A changed approved requirement belongs with [specification](../leanflow-to-spec/SKILL.md), and a changed implementation plan belongs with [planning](../leanflow-plan/SKILL.md). Loading a companion neither reopens a settled decision nor authorizes its implementation.

## Record only settled, authorized changes

When the current assignment permits documentation mutation and terms have settled, read [glossary format](references/glossary-format.md) and update the existing owner. Create a glossary only when a real settled term lacks a sufficient owner and its destination is authorized. Keep domain language distinct from requirements, implementation diaries, and open questions.

Offer an ADR only for a genuinely consequential choice: hard to reverse, surprising without context, or contested with a meaningful trade-off. A trivial reversible name does not need one. When recording is authorized, read [ADR format](references/adr-format.md) and follow the project's existing location, sequence, and lifecycle. Do not mark a proposal accepted from a filename, number, or your own assertion.

Read-only or planning-only work returns proposed wording and conflicts without creating files. LeanFlow planning's allowed artifact/privacy writes are not extended by this companion. Do not save a glossary or ADR as an alternate route around those limits, or copy private workflow content into tracked documentation without authorization.

Finish with the resolved definitions/relationships, source basis and decision status, actual authorized changes or in-chat proposals, implementation mismatches, and remaining conflicts. Modeling is not approval or execution consent.

Adapted from KitShift's `docs-domain-modeling` and its Matt Pocock sources. Retained notices: [Matt Pocock](LICENSE.matt) and [KitShift](LICENSE.kitshift). Exact lineage is recorded in the distribution's `skills/SOURCES.md`.
